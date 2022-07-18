/*
 * Copyright (c) Joseph Prichard 2022.
 */

import React, { useCallback, useEffect, useMemo, useState } from "react";
import DoubleColumn from "../../Util/Layout/DoubleColumn/DoubleColumn";
import { Button, Card, Space } from "@mantine/core";
import styles from "./ActivityFeed.module.css";
import { useFetch } from "../../../client/hooks/fetch";
import { ActivityRes, buildFetchActivityFeedUrl, fetchActivities } from "../../../client/api/feed";
import UserPanel from "../../User/UserPanel/UserPanel";
import { UserEntity } from "../../../client/models/user";
import ActivityPreviewList from "../../Activity/ActivityPreviewList/ActivityPreviewList";
import { createPostVoteMap, PostVoteContext, CommentVoteContext, createCommentVoteMap } from "../../Vote/Vote.context";
import { ActivityEntity } from "../../../client/models/activity";
import LoadingButton from "../../Util/Widget/LoadingButton/LoadingButton";
import { findActivityCursor } from "../../../utils/cursor";

interface Props {
    user: UserEntity;
}



const ActivityFeed = ({ user }: Props) => {

    const { data } = useFetch<ActivityRes>(buildFetchActivityFeedUrl(user.id));

    const [activities, setActivities] = useState<ActivityEntity[]>();
    const [showLoadMore, setShowLoadMore] = useState<boolean>();

    const postMap = useMemo(() => createPostVoteMap(data?.postVotes), [data?.postVotes]);
    const commentMap = useMemo(() => createCommentVoteMap(data?.commentVotes), [data?.commentVotes]);

    console.log(data?.postVotes, postMap);

    useEffect(() => {
        setActivities(data?.activities);
        setShowLoadMore(data?.nextPage);
    }, [data]);

    const loadMore = useCallback(() => {
        if (activities) {
            // find the last occurring comment for cursor
            const postCursor = findActivityCursor(activities, true);
            // find the last occurring post for cursor
            const commentCursor = findActivityCursor(activities, false);
            // fetch the new activities, add them to the old activities, and check if we can load more
            fetchActivities(user.id, postCursor, commentCursor)
                .then((r) => {
                    const newActivities = activities.map(activity => activity);
                    newActivities.push(...r.data.activities);
                    setActivities(newActivities);
                    setShowLoadMore(r.data.nextPage);
                });
        }
    }, [activities]);

    return (
        <CommentVoteContext.Provider value={{ votes: commentMap }}>
            <PostVoteContext.Provider value={{ votes: postMap }}>
                <DoubleColumn
                    column1={
                        <Card className={styles.ActivityFeed}>
                            <Space h={10}/>
                            <ActivityPreviewList activities={activities}/>
                        </Card>
                    }
                    column2={<UserPanel user={user}/>}
                />
                <div>
                    {!showLoadMore ||
                        <LoadingButton loadMore={loadMore}/>
                    }
                </div>
            </PostVoteContext.Provider>
        </CommentVoteContext.Provider>
    );
}

export default ActivityFeed;