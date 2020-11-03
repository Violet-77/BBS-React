import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userIsLogined, signOut } from "../../api/api";

import { message } from "antd";
import "./Header.scss";

export default function Header() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const loginUser = useSelector((state) => state.user.loginUser);

  const dispatch = useDispatch();
  const history = useHistory();

  // 页面加载后，判断一次是否有cookie来设置登录状态
  useEffect(() => {
    userIsLogined().then((res) => {
      if (res.data.code === 0) {
        dispatch({ type: "set-isLogin", payload: true });
        dispatch({ type: "set-loginUser", payload: res.data.user });
      }
    });
  }, []);

  const quit = () => {
    signOut().then((res) => {
      if (res.data.code === 0) {
        message.success({
          content: "退出成功，欢迎下次登录！",
          duration: 2,
        });
        dispatch({ type: "set-isLogin", payload: false });
        dispatch({ type: "set-loginUser", payload: {} });
      } else {
        message.error({
          content: "退出失败，请重试！",
          duration: 2,
        });
      }
    });
  };

  const goToHome = () => {
    history.push("/");
  };
  const login = () => {
    history.push("/login");
  };
  const register = () => {
    history.push("/register");
  };

  return (
    <div className="header">
      <div className="header-container">
        <div className="logo">
          <a href="/" title="BBS">
            <span>BBS</span>
          </a>
        </div>
        <div className="info">
          {isLogin ? (
            <div className="logined info-contain">
              <div className="sign-out first" onClick={quit}>
                退出
              </div>
              <div className="username">{loginUser.name}</div>
              <div className="home" onClick={goToHome}>
                首页
              </div>
            </div>
          ) : (
            <div className="no-logined info-contain">
              <div onClick={login} className="first">
                登录
              </div>
              <div onClick={register}>注册</div>
              <div className="home" onClick={goToHome}>
                首页
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
