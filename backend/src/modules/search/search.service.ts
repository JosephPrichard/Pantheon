/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { InjectRepository } from "@mikro-orm/nestjs";
import { AbstractSqlConnection, Knex } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { EntityRepository, MikroORM } from "mikro-orm";
import { AppLogger } from "src/loggers/applogger";
import { sql } from "src/utils/sql.util";
import { ForumEntity } from "../forum/forum.entity";
import { UserEntity } from "../user/user.entity";
import { PostSearchRow, SearchedPost, SearchPostFilter } from "./search.dto";
import { PER_SEARCH_PAGE } from "../../global";

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
                (ts_rank_cd(content_document, query) + ts_rank_cd(title_document, query)) AS "searchRank"
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
            })
            .orderByRaw(sql`
                "searchRank" DESC
            `)
            .limit(PER_SEARCH_PAGE);

        const mappedPosts: SearchedPost[] = [];
        for (const result of results) {
            mappedPosts.push({
                id: Number(result.id),
                poster: {
                    id: Number(result.posterId),
                    name: result.posterName
                },
                forum: {
                    id: result.forumId
                },
                title: result.title,
                votes: Number(result.votes),
                comments: Number(result.comments),
                content: result.content,
                link: result.link,
                images: result.images,
                createdAt: result.createdAt,

                searchRank: Number(result.searchRank)
            });
        }

        return { 
            posts: mappedPosts
        } ;
    }

}