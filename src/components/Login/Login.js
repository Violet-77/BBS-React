import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../api/api";

import { Form, Input, Button, Checkbox, notification, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.scss";

const layout = {
  wrapperCol: {
    span: 30,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 10,
  },
};

export default function Login() {
  const isLogin = useSelector((state) => state.user.isLogin);

  const [form] = Form.useForm(); // AD文档
  const history = useHistory();
  const dispatch = useDispatch();

  const onFinish = (value) => {
    if (!isLogin) {
      let name = form.getFieldValue().username;
      let password = form.getFieldValue().password;
      login(name, password).then((res) => {
        if (res.data.code === 0) {
          message.success({
            content: "登录成功，即将返回首页！",
            duration: 2,
          });
          dispatch({ type: "set-isLogin", payload: true });
          dispatch({ type: "set-loginUser", payload: res.data.user });
          form.resetFields();
          history.push("/");
        } else if (res.data.code === -1) {
          message.error({
            content: "密码错误,请重新登录！",
            duration: 2,
          });
        } else {
          message.error({
            content: "登录失败，该用户尚未注册！",
            duration: 2,
          });
        }
      });
    } else {
      message.error({
        content: "该用户已登录，请勿重复登录！",
        duration: 2,
      });
    }
    // console.log(value);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  return (
    <div className="login">
      <div className="container">
        <div className="caption">登录</div>
        <Form
          {...layout}
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>

            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
