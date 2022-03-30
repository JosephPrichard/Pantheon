/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { GetServerSideProps } from "next";
import { SortType, TimeType, timeTypes } from "../../global";
import { PageProps } from "./PageProps";
import { sortTypes } from "../../global";

export interface PostFeedProps {
    sort: SortType;
    time: TimeType;
    page: number;
}

export const getServerSidePropsWithSlug: GetServerSideProps<PageProps<PostFeedProps>> = async (ctx) => {
    const query = ctx.query;

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

    let sortslug = query.slug as string | undefined;

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

    return {
        props: {
            componentProps: {
                sort,
                time,
                page
            }
        }
    };
};

export const getServerSidePropsNoSlug: GetServerSideProps = async (ctx) => {
    const query = ctx.query;

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

    let timequery = query.t as string | undefined;

    let time: TimeType;
    if (!timequery) {
        time = "day";
    } else if(timeTypes.includes(timequery)) {
        time = timequery as TimeType;
    } else {
        return {
            props: {}
        };
    }

    return {
        props: {
            componentProps: {
                sort: "hot",
                time,
                page
            }
        }
    };
};