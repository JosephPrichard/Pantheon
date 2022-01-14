import { InjectRepository } from "@mikro-orm/nestjs";
import { AbstractSqlConnection, Knex } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { EntityRepository, MikroORM, QueryOrder } from "mikro-orm";
import { AppLogger } from "src/loggers/applogger";
import { countPages, pageOffset, PER_PAGE } from "src/utils/paginator";
import { sql } from "src/utils/sql";
import { ForumEntity } from "../forum/forum.entity";
import { UserEntity } from "../user/user.entity";
import { PostSearchRow, SearchFilter, SearchPostFilter } from "./search.dto";

@Injectable()
export class SearchService {

    private readonly logger = new AppLogger(SearchService.name);
    private readonly knex: Knex;

    constructor(
        orm: MikroORM,

        @InjectRepository(ForumEntity) 
        private readonly forumRepository: EntityRepository<ForumEntity>,

        @InjectRepository(UserEntity) 
        private readonly userRepository: EntityRepository<UserEntity>
    ) {
        const conn = orm.em.getConnection() as AbstractSqlConnection;
        this.knex = conn.getKnex();
    }

    cleanSearchText(searchText: string) {
        // remove all special characters
        let newSearchText = searchText.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");

        // transform newlines, tabs, and multiple spaces into single spaces
        newSearchText = newSearchText.replace(/\s\s+/g, " ");

        // trim searchText
        newSearchText = newSearchText.trim();

        // transform the string into an OR chain
        newSearchText = newSearchText.replace(/\s/g, " | ");

        this.logger.log(`Transformed ' ${searchText} ' into ' ${newSearchText} '`);

        return newSearchText;
    }

    async searchPosts(search: SearchPostFilter) {
        const searchText = this.cleanSearchText(search.text);

        const results: PostSearchRow[] = await this.knex
            .select(this.knex.raw(sql`
                p.id as "id", 
                p.poster_id as "posterId", 
                p.forum_id as "forumId", 
                p.title as "title", 
                p.votes as "votes", 
                p.comments as "comments", 
                p.content as "content", 
                p.images as "images", 
                p.link as "link",
                p.created_at as "createdAt",
                COUNT(*) OVER() as "count",
                (SELECT u.name FROM users u WHERE u.id = p.poster_id) as "posterName",
                ts_headline('english', p.title, query, 'StartSel=<mark>, StopSel=</mark>') AS "titleHeadline",
                ts_headline('english', p.content, query, 'StartSel=<mark>, StopSel=</mark>') AS "contentHeadline",
                ts_rank_cd(content_document, query) + ts_rank_cd(title_document, query) AS "searchRank"
            `))
            .from(this.knex.raw(sql`
                posts p, 
                to_tsquery(?) query
            `, [searchText]))
            .whereRaw(sql`(
                (query @@ p.content_document) 
                    OR 
                (query @@ p.title_document)
            )`)
            .andWhere((builder) => {
                if (search.forum) {
                    builder.andWhereRaw(sql`
                        p.forum_id = ?
                    `, [search.forum]);
                }
                if (search.poster) {
                    builder.andWhereRaw(sql`
                        p.poster_id = ?
                    `, [search.poster]);
                }
                if (search.date) {
                    builder.andWhereRaw(sql`
                        p.created_at > ?
                    `, [search.date.toISOString()])
                }
            })
            .orderByRaw(sql`
                "searchRank" DESC
            `)
            .limit(PER_PAGE)
            .offset(pageOffset(search.page));

        return { 
            search: results,
            pageCount: results[0] ? countPages(results[0].count) : 0
        } ;
    }

    async searchUsers(search: SearchFilter) {
        const [users, count] = await this.userRepository.findAndCount(
            { name: { $ilike: `%${search.text}%` } },
            [],
            { karma: QueryOrder.DESC },
            PER_PAGE,
            pageOffset(search.page)
        );

        return { 
            users, 
            pageCount: countPages(count)
        };
    }

    async searchForums(search: SearchFilter) {
        const [forums, count] = await this.forumRepository.findAndCount(
            { id: { $ilike: `%${search.text}%` } },
            [],
            { subscriptions: QueryOrder.DESC },
            PER_PAGE,
            pageOffset(search.page)
        );

        return { 
            forums, 
            pageCount: countPages(count)
        };
    }

}