import React from "react";
import { useSelector } from "react-redux";

import { Button } from "antd";
import "./HomeInfo.scss";
import { register } from "../../api/api";
import { useHistory } from "react-router-dom";

export default function HomeInfo() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const loginUser = useSelector((state) => state.user.loginUser);

  const history = useHistory();

  const register = () => {
    history.push("/register");
  };

  const login = () => {
    history.push("/login");
  };

  const createpost = () => {
    history.push("/createpost");
  };

  return (
    <div className="home-info">
      <div className="container">
        {isLogin ? (
          <div>
            <div className="message">
              <strong>这里是BBS-React</strong>
            </div>

            <div className="login-info">
              <div className="welcome">
                <span>欢迎， {loginUser.name}</span>
                <div className="sep"></div>
                <Button type="primary" onClick={createpost}>
                  去发帖吧
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="message">
              <span>这里是BBS-React</span>
            </div>
            <div className="unlogin-info">
              <Button type="primary" onClick={register}>
                现在注册
              </Button>
              <div className="sep"></div>
              <div className="unlogin">
                <span>已注册的用户请</span>
                <Button type="link" onClick={login}>
                  登录
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
