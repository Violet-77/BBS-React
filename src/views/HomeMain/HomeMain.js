import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { getPosts, getAllPosts } from "../../api/api";
import ContentItem from "./ContentItem";

import "./HomeMain.scss";

export default function HomeMain() {
  const [categoryId, setCategoryId] = useState(0);
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  const history = useHistory();

  const classifyData = [
    { name: "全部", categoryId: "0", path: "/" },
    { name: "分享", categoryId: "1", path: "/share" },
    { name: "讨论", categoryId: "2", path: "/discuss" },
    { name: "吐槽", categoryId: "3", path: "/complain" },
    { name: "夸夸", categoryId: "4", path: "/compliment" },
  ];

  const itemClick = (index, path) => {
    setCategoryId(index);
    history.push(path);
  };
  const classifyItem = classifyData.map((item, index) => (
    <div
      className={
        item.path == history.location.pathname ? "active-item" : "item"
      }
      key={item.categoryId}
      onClick={() => itemClick(index, item.path)}
    >
      {item.name}
    </div>
  ));

  useEffect(() => {
    let classifyTag = {
      "/": 0,
      "/share": 1,
      "/discuss": 2,
      "/complain": 3,
      "/compliment": 4,
    };
    let id = history.location.pathname;
    console.log(history.location.pathname);
    setCategoryId(classifyTag[id]);

    getPosts(categoryId).then((res) => {
      setPosts(res.data);
    });
    getAllPosts().then((res) => {
      setAllPosts(res.data);
    });
  }, [categoryId, history.location.pathname]);

  return (
    <div className="home-main">
      <div className="main-container">
        <div className="classify">{classifyItem}</div>
        <div className="main-content">
          {history.location.pathname === "/" ? (
            <ContentContainer posts={allPosts} />
          ) : (
            <ContentContainer posts={posts} />
          )}
        </div>
      </div>
    </div>
  );
}

function ContentContainer(props) {
  //   console.log(props);
  return (
    <div className="posts">
      {props.posts.length > 0
        ? props.posts.map((post) => (
            <ContentItem post={post} key={post.postId} />
          ))
        : null}
    </div>
  );
}
