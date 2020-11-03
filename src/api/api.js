import axios from "axios";

// 对axios进行封装，以适应不同URL和Method
function request(config) {
  const instance = axios.create({
    baseURL: "",
    withCredentials: true,
  });
  return instance(config);
}

//页面刷新时，通过cookie判断用户是否登录
export function userIsLogined() {
  return request({
    url: "/isLogined",
    method: "get",
  });
}

//退出
export function signOut() {
  return request({
    url: "/signout",
  });
}

// 登录
export function login(name, password) {
  return request({
    url: "/login",
    method: "post",
    data: {
      name,
      password,
    },
  });
}

// 注册
export function register(data) {
  return request({
    url: "/register",
    method: "post",
    data,
  });
}

//显示所有帖子
export function getAllPosts() {
  return request({
    url:'/posts',
    method:'get'
  })
}

//显示分类下所有帖子
export function getPosts(categoryId) {
  return request({
    url: `/posts/${categoryId}`,
  });
}

//用户发帖
export function addPosts(userId, title, content, value) {
  return request({
    url: `/posts/${value}`,
    method: "post",
    data: {
      userId,
      title,
      content,
    },
  });
}

// 获取用户信息
export function getProfile(userId) {
  return request({
    url: "/profile",
    method: "post",
    data: {
      userId,
    },
  });
}

// 获得帖子详情
export function postDetail(postId) {
  return request({
    url: "/postDetail",
    method: "get",
    params: {
      postId,
    },
  });
}

// 获得某个帖子所有其他回复
export function getComment(postId) {
  return request({
    url: `/comments/${postId}`,
  });
}

// 回复帖子

export function addComment(postId, content, time, userId) {
  return request({
    url: `/comments/${postId}`,
    method: "post",
    data: {
      postId,
      content,
      time,
      userId,
    },
  });
}
