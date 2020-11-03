import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { postDetail, getProfile, getComment, addComment } from "../../api/api";
import { message, Button, Breadcrumb } from "antd";

import { parseTime } from "../../asset/Utils";
import "./PostDetail.scss";

export default function PostDetail() {
  const { postId } = useParams(); //useParams returns an object of key/value pairs of URL parameters
  const [userId, setUserId] = useState(0);
  const [userInfo, setUserInfo] = useState([]);
  const [postInfo, setPostInfo] = useState([]);
  const [commentInfo, setCommentInfo] = useState([]);
  const [contentInfo, setContentInfo] = useState([]);

  const tagData = ["", "分享", "讨论", "吐槽", "夸夸"];
  const tagPath = ["/", "share", "discuss", "complain", "compliment"];

  // 获取帖子信息
  useEffect(() => {
    postDetail(postId).then((res) => {
      let data = res.data;
      setPostInfo(data);
      setUserId(data.userId);
      setContentInfo(data.content);
    });
  }, []);

  // 获取用户信息（姓名、注册时间、头像、邮箱）
  useEffect(() => {
    getProfile(userId).then((res) => {
      setUserInfo(res.data);
      console.log("用户信息: " + res.data);
    });
  }, [userId]);

  // 获取评论信息
  useEffect(() => {
    getComment(postId).then((res) => {
      setCommentInfo(res.data);
    });
  }, [postId]);

  return (
    <div className="post-detail">
      <div className="header">
        <Breadcrumb>
          <Breadcrumb.Item href="/">首页</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href={"/" + tagPath[postInfo.category]}>
              {tagData[postInfo.category]}
            </a>
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className="title">{postInfo.title}</div>
        <div className="message">
          <span className="name">{userInfo.name}</span>&nbsp;•&nbsp;
          <span className="time">{parseTime(postInfo.time)}</span>
        </div>
        <img
          src={"http://localhost:3001/uploads/" + userInfo.avator}
          alt="发帖头像"
          className="avatar"
        />
      </div>

      <div className="header-main">{contentInfo}</div>

      <div className="comments">
        <div className="comments-top">
          <span>{commentInfo.length} 条回复</span>
        </div>
        <div className="comments-main">
          {commentInfo.map((comment) => (
            <ContentItem key={comment.time} comment={comment} />
          ))}
        </div>
      </div>
      <div className="add-comment">
        <AddComment commentInfo={commentInfo} setCommentInfo={setCommentInfo} />
      </div>
    </div>
  );
}

function ContentItem({ comment }) {
  const [commentUserInfo, setCommentUserInfo] = useState([]);

  useEffect(() => {
    getProfile(comment.userId).then((res) => {
      setCommentUserInfo(res.data);
    });
  }, [comment.userId]);

  // console.log(process.env.REACT_APP_AVATAR_BASEURL)

  return (
    <div className="content-item">
      <div className="content-img">
        <img
          src={"http://localhost:3001/uploads/" + commentUserInfo.avator}
          alt="评论头像"
        />
      </div>
      <div className="content-main">
        <div className="item-head">
          <span className="name">{commentUserInfo.name}</span> &nbsp; &nbsp;
          <span className="time">{parseTime(comment.time)}</span>
        </div>
        <div className="item-body">
          <span className="comment">{comment.content}</span>
        </div>
      </div>
    </div>
  );
}

function AddComment({ commentInfo, setCommentInfo }) {
  const isLogin = useSelector((state) => state.user.isLogin);
  const loginUser = useSelector((state) => state.user.loginUser);

  const textareaRef = useRef();
  const { postId } = useParams();

  const onReply = () => {
    if (isLogin) {
      let content = textareaRef.current.value;
      if (content) {
        addComment(
          postId,
          content,
          new Date().toString(),
          loginUser.userId
        ).then((res) => {
          if (res.data.code === 0) {
            let data = {
              commentId: 52,
              content: textareaRef.current.value,
              postId: postId,
              time: new Date().toString(),
              userId: loginUser.userId,
            };
            let newInfo = [...commentInfo];

            newInfo.unshift(data);
            setCommentInfo(newInfo);
            textareaRef.current.value = null;
            message.success("回复成功！");
          }
        });
      } else {
        message.error("回复内容不能为空！");
      }
    } else {
      message.error("用户未登录，不能回复！");
    }
  };

  return (
    <div className="add-commemt">
      <div className="add-head">
        <span>增加一条新回复</span>
      </div>
      <div className="add-body">
        <div className="add-main">
          <textarea ref={textareaRef} />
        </div>
        <div className="add-button">
          <Button type="primary" onClick={onReply}>
            回复
          </Button>
        </div>
      </div>
    </div>
  );
}
