import React from "react";
import {Avatar, List, Space, Tag, Tooltip} from "antd";
import {DislikeOutlined, LikeOutlined, MessageOutlined, MinusCircleOutlined, StarOutlined} from "@ant-design/icons";

export const PostListItem = (props) => {
    const post = props.post;
    return (
        <List.Item
            key={post.title}
            actions={getActionItems(post)}
            extra={getExtra(post)}>
            <List.Item.Meta avatar={getAvatar(post)} title={getTitle(post)} description={getDescription(post)}/>
            {post.description}
        </List.Item>
    );
}

const getAvatar = (post) => {
    return post.thumbnail ? <Avatar src={post.thumbnail}/> : '';
}

const getExtra = (post) => {
    return post.image ? <img width={272} alt={post.title} src={post.image}/> : '';
}

const getTitle = (post) => {
    return <a target='_blank' rel='noreferrer' href={post.link}>{post.title}</a>;
}

const getDescription = (post) => {
    const tags = post.tags.slice(0, 5).map(tag => <Tag icon={<MinusCircleOutlined/>} color="default">{tag}</Tag>);
    const moreText = post.tags.length > 5 ? `+${(post.tags.length - tags.length)} more` : '';
    return (
        <div>
            <span>{`${post.author} | ${post.date}`}</span><span> {tags} {moreText}</span>
        </div>
    );
}

const getActionItems = (post) => {
    const actionItems = [];
    const IconText = ({tooltipText, icon, text}) => (
        <Tooltip title={tooltipText}><Space>{React.createElement(icon)}{text}</Space></Tooltip>
    );
    const metaData = post.metadata;
    if (metaData.hasOwnProperty('comments')) {
        actionItems.push(<IconText tooltipText='Comments' icon={MessageOutlined} text={metaData.comments}
                                   key="list-vertical-message-count"/>);
    }
    if (metaData.hasOwnProperty('upvotes')) {
        actionItems.push(<IconText tooltipText='Up Votes' icon={LikeOutlined} text={metaData.upvotes}
                                   key="list-vertical-upvotes"/>);
    }
    if (metaData.hasOwnProperty('downvotes')) {
        actionItems.push(<IconText tooltipText='Down Votes' icon={DislikeOutlined} text={metaData.downvotes}
                                   key="list-vertical-downvotes"/>);
    }
    if (metaData.hasOwnProperty('score')) {
        actionItems.push(<IconText tooltipText='Score' icon={StarOutlined} text={metaData.score}
                                   key="list-vertical-score"/>);
    }
    return actionItems;
}
