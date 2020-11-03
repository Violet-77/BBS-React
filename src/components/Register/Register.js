import React, { useState } from "react";
import { register } from "../../api/api";
import { useHistory } from "react-router-dom";

import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./Register.scss";

const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 11,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 13,
    span: 16,
  },
};

export default function Register() {
  const [form] = Form.useForm();
  const history = useHistory();

  const [avatar, setAvatar] = useState({});

  const onFinish = (values) => {
    let name = form.getFieldValue().name;
    let password = form.getFieldValue().password;
    let email = form.getFieldValue().email;

    let formData = new FormData(); // 创建表单格式数据，可以异步上传二进制文件
    formData.append("name", name);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("avator", avatar, avatar.name);

    register(formData).then((res) => {
      if (res.data.code === 0) {
        message.success("注册成功！请登录...");
        form.resetFields();
        history.push("/login");
      } else if (res.data.code === -1) {
        message.error("注册失败，该用户已被注册！");
      } else {
        message.error("发生错误，请重试！");
      }
    });
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const normFile = (e) => {
    // console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }
    setAvatar(e.file);
    return e && e.fileList;
  };

  const handleBeforeUpload = (file, fileList) => {
    return false;
  };

  return (
    <div className="register">
      <div className="container">
        <div className="caption">注册</div>
        <Form
          {...layout}
          form={form}
          name="basic"
          className="register-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="用户名"
            name="name"
            rules={[
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: "P请输入密码!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              {
                required: true,
                message: "请输入邮箱!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="upload"
            label="头像"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              name="avator"
              listType="picture"
              beforeUpload={handleBeforeUpload}
              rules={[
                {
                  required: true,
                  message: "请上传头像!",
                },
              ]}
            >
              <Button icon={<UploadOutlined />}>上传头像</Button>
            </Upload>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" className="button">
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
