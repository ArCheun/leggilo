import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {List, message} from "antd";
import {postListLoadingStatusSelector, selectAllPosts} from "./postsSlice";
import LoadingStatus from "../../util/loadingStatus";
import {PostListItem} from "./PostListItem";

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
            itemLayout="vertical"
            size="large"
            loading={loadingStatus === LoadingStatus.loading}
            dataSource={posts}
            pagination={posts.length > 10 ? {pageSize: 10} : null}
            renderItem={post => (<PostListItem post={post}/>)}
        />
    );
};
