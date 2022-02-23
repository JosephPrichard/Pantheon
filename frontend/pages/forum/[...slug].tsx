import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { configNoCreds } from "../../src/client/config";
import { ForumEntity } from "../../src/client/models/forum";
import Banner from "../../src/components/Banner/Banner";
import ErrorPage from "../../src/components/ErrorPage/ErrorPage";
import ForumFeed from "../../src/components/Feed/PostFeed/ForumFeed/ForumFeed";
import { SortType, sortTypes, TimeType, timeTypes } from "../../src/global";
import { PageProps } from "../../src/utils/next/PageProps";

interface Props {
    forum: ForumEntity;
    sort: SortType;
    time: TimeType;
    page: number;
}

const ForumPage: NextPage<PageProps<Props>> = ({ componentProps }: PageProps<Props>) => (
    <>
        {componentProps ?
            <>
                <Banner
                    title={componentProps.forum.id}
                    href={`/forum/${componentProps.forum.id}`}
                />
                <ForumFeed 
                    forum={componentProps.forum}
                    sort={componentProps.sort} 
                    time={componentProps.time}
                    page={componentProps.page}
                />
            </>
            :
            <ErrorPage/>
        }
    </>
);

interface ForumRes {
    forum: ForumEntity;
}

async function fetchForumById(id: string) {
    return await axios.get<ForumRes>(`/api/forums/${id}`, configNoCreds);
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const slugs = query.slug as string[];

    const pageStr = query.p as string | undefined;
    let page = Number(pageStr);
    if (!page) {
        page = 1;
    }
    if (isNaN(page) || page <= 0) {
        return {
            props: {}
        };
    }

    let sortslug = slugs[1] as string | undefined;

    let sort: SortType;
    if (!sortslug) {
        sort = "hot";
    } else if(sortTypes.includes(sortslug)) {
        sort = sortslug as SortType;
    } else {
        return {
            props: {}
        };
    }

    let timequery = query.t as string | undefined;

    let time: TimeType;
    if (!timequery) {
        time = "alltime";
    } else if(timeTypes.includes(timequery)) {
        time = timequery as TimeType;
    } else {
        return {
            props: {}
        };
    }

    const forumId = slugs[0];
    if (!forumId) {
        return {
            props: {}
        };
    }
    
    try {
        const res = await fetchForumById(forumId);
        const forum = res.data.forum;
        return {
            props: {
                componentProps: {
                    forum,
                    sort,
                    time,
                    page
                }
            }
        };
    } catch(err) {
        return {
            props: {}
        };
    }
};

export default ForumPage;