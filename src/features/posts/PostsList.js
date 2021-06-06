import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {List, message} from "antd";
import {postListLoadingStatusSelector, selectAllPosts} from "./postsSlice";
import LoadingStatus from "../../util/loadingStatus";

export const PostsList = () => {

    const posts = useSelector(selectAllPosts);
    const loadingStatus = useSelector(postListLoadingStatusSelector);

    useEffect(() => {
        if (loadingStatus === LoadingStatus.error) {
            message.error('Something went wrong trying to load the posts.');
        }
    }, [loadingStatus]);

    return (
        <List
            itemLayout="horizontal"
            dataSource={posts}
            loading={loadingStatus === LoadingStatus.loading}
            renderItem={post => (
                <List.Item>
                    <List.Item.Meta title={<a href={post.url}>{post.title}</a>} description={post.content}/>
                </List.Item>
            )}
        />
    );
}
