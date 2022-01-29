import type { GetServerSideProps, NextPage } from "next";
import Banner from "../../src/components/Banner/Banner";
import React from "react";
import Body from "../../src/components/Util/Layout/Body/Body";
import { SortType, sortTypes, TimeType, timeTypes } from "../../src/global";
import axios from "axios";
import { UserEntity } from "../../src/client/models/user";
import { configNoCreds } from "../../src/client/config";
import { PageProps } from "../../src/utils/next/PageProps";
import ErrorPage from "../../src/components/Error/ErrorPage";
import DoubleColumn from "../../src/components/Util/Layout/DoubleColumn/DoubleColumn";
import UserPanel from "../../src/components/User/UserPanel";
import UserFeed from "../../src/components/Feed/PostFeed/UserFeed.tsx/UserFeed";

interface Props {
    user: UserEntity;
    sort: SortType;
    time: TimeType;
    page: number;
}

const UserPage: NextPage<PageProps<Props>> = ({ componentProps }: PageProps<Props>) => (
    <>
        {componentProps ? 
            <>
                <Banner username={componentProps.user.name}/>
                <UserFeed
                    user={componentProps.user}
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

interface UserRes {
    user: UserEntity;
}

async function fetchUserByName(name: string) {
    return await axios.get<UserRes>(`/api/users?name=${name}`, configNoCreds);
}

export const getServerSideProps: GetServerSideProps<PageProps<Props>> = async ({ query }) => {
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

    const name = slugs[0];
    if (!name) {
        return {
            props: {}
        };
    }
    
    try {
        const res = await fetchUserByName(name);
        const user = res.data.user;
        return {
            props: {
                componentProps: {
                    user,
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

export default UserPage;
