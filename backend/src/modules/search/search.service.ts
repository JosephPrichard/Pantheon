/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { EntityManager, EntityRepository, MikroORM } from "mikro-orm";
import { AppLogger } from "src/loggers/applogger";
import { sql } from "src/utils/sql.utils";
import { ForumEntity } from "../forum/forum.entity";
import { UserEntity } from "../user/user.entity";
import { PostSearchRow, SearchedPostDto, SearchFilterDto } from "./search.dto";
import { PER_PAGE, PER_SEARCH_PAGE } from "../../global";

@Injectable()
export class SearchService {

    private readonly logger = new AppLogger(SearchService.name);
    private readonly em: EntityManager;

    constructor(
        orm: MikroORM,

        @InjectRepository(ForumEntity) 
        private readonly forumRepository: EntityRepository<ForumEntity>,

        @InjectRepository(UserEntity) 
        private readonly userRepository: EntityRepository<UserEntity>
    ) {
        this.em = orm.em;
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

    async searchPosts(search: SearchFilterDto) {
        const searchText = this.cleanSearchText(search.text);

        const params = [];

        // construct the dynamic parts of the query and the query parameters
        params.push(searchText);
        let condition = "";
        if (search.forum) {
            condition += sql`AND p.forum_id = ?`;
            params.push(search.forum);
        }
        if (search.poster) {
            condition += sql`AND p.poster_id = ?`;
            params.push(search.poster);
        }
        params.push(PER_SEARCH_PAGE);

        // construct a raw search query to send to database
        const query = sql`
            SELECT
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
            FROM
                posts p, 
                to_tsquery(?) query
            WHERE
                ((query @@ p.content_document) OR (query @@ p.title_document)) 
                ${condition}
            ORDER BY
                "searchRank" DESC
             LIMIT
                ?
        `;

        // send the query with params to retrieve result and perform cast
        const results = await this.em.getConnection().execute(query, params) as PostSearchRow[];

        // map each result from result set to a mapped searched post dto
        const posts = this.mapResultsToPosts(results);

        return { posts } ;
    }

    mapResultsToPosts(results: PostSearchRow[]) {
        const posts: SearchedPostDto[] = [];

        for (const result of results) {
            posts.push({
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

        return posts;
    }

}