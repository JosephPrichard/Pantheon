import type { GetServerSideProps, NextPage } from "next";
import User, { UserData } from "../../components/User/User";
import Banner from "../../components/Banner/Banner";
import React from "react";
import UserService from "../../model/services/user.service";
import Body from "../../components/Util/Layout/Body/Body";
import { SortType, TimeType } from "../../model/global";

interface Props {
    userData: UserData;
    sort: SortType;
    time: TimeType;
    page: number;
}

const UserPage: NextPage<Props> = ({ userData, sort, time, page }: Props) => (
    <>
        <Banner />
        <Body width={"70%"} minWidth={1100}>
            <User 
                userData={userData}
                sort={sort}
                time={time}
                page={page}
            />
        </Body>
    </>
);


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const slugs = query.slug as string[];

    const pageStr = query.p as string | undefined;
    let page = Number(pageStr);
    if (!page) {
        page = 1;
    }
    if (isNaN(page) || page <= 0) {
        return {
            redirect: {
                destination: "/404"
            },
            props: {}
        };
    }

    let sort = slugs[1];
    if (!sort) {
        sort = "new";
    }

    let time = query.t as string | undefined;
    if (!time) {
        time = "day";
    }

    const name = slugs[0];
    if (!name) {
        return {
            redirect: {
                destination: "/404"
            },
            props: {}
        };
    }

    const user = await UserService.findUserByName(name);

    if (!user) {
        return {
            redirect: {
                destination: "/404"
            },
            props: {}
        };
    }

    return {
        props: {
            userData: {
                name: user.name,
                userId: user.id,
                description: user.description,
                joined: user.createdAt.toLocaleDateString()
            },
            sort,
            time,
            page
        }
    };
};

export default UserPage;
