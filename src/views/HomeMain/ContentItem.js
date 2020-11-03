import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { getProfile, getComment } from "../../api/api";
import { parseTime } from "../../asset/Utils";

export default function ContentItem({ post }) {
  //console.log(props);

  const [userInfo, setUserInfo] = useState([]);
  const [commentCount, setCommentCount] = useState([]);

  const history = useHistory();

  const PostDetail = () => {
    history.push(`/postDetail/${post.postId}`);
  };

  useEffect(() => {
    getProfile(post.userId).then((res) => {
      setUserInfo(res.data);
    });
  }, [post.userId]);

  useEffect(() => {
    getComment(post.postId).then((res) => {
      setCommentCount(res.data);
    });
  }, [post.postId]);

  const tagData = ["", "分享", "讨论", "吐槽", "夸夸"];

  return (
    <div className="content-item">
      <div className="avatar">
        <img
          src={"http://localhost:3001/uploads/" + userInfo.avator}
          alt="帖子头像"
        />
      </div>
      <div className="content-wrap">
        <div className="title" onClick={PostDetail}>
          {post.title}
        </div>
        <div className="details">
          <span className="content-classify">{tagData[post.category]}</span>{" "}
          &nbsp;•&nbsp;
          <span className="name">{userInfo.name}</span> &nbsp;•&nbsp;
          <span className="time">{parseTime(post.time)}</span>
        </div>
      </div>
      {commentCount.length > 0 ? (
        <div className="counts" onClick={PostDetail}>{commentCount.length}</div>
      ) : null}
    </div>
  );
}
