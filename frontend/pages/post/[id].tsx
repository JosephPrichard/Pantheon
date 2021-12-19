import { GetServerSideProps, NextPage } from "next";
import React from "react";
import Banner from "../../components/Banner/Banner";
import FullPost from "../../components/Comment/PostPanel/PostPanel";
import Body from "../../components/Util/Layout/Body/Body";
import PostService from "../../model/services/post.service";

interface Props {
    serializedPost: string;
}

const PostPage: NextPage<Props> = ({ serializedPost }: Props) => (
    <>
        <Banner />
        <Body width={"50%"} minWidth={700}>
            <FullPost post={JSON.parse(serializedPost)}/>
        </Body>
    </>
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const id = query.id as string | undefined;

    if (!id) {
        return {
            redirect: {
                destination: "/404"
            },
            props: {}
        };
    }

    const post = await PostService.findById(id);

    if (!post) {
        return {
            redirect: {
                destination: "/404"
            },
            props: {}
        };
    }

    return {
        props: {
            serializedPost: JSON.stringify(post)
        }
    };
}

export default PostPage;