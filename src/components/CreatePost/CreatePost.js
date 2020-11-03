import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addPosts } from "../../api/api";

import { Form, Input, Button, Select, message } from "antd";
import "./CreatePost.scss";

const layout = {
  wrapperCol: { span: 18 },
};

export default function CreatePost() {
  const { Option } = Select;
  const [form] = Form.useForm();
  const history = useHistory();

  const isLogin = useSelector((state) => state.user.isLogin);
  const loginUser = useSelector((state) => state.user.loginUser);

  const onFinish = (values) => {
    let title = form.getFieldValue().title;
    let category = form.getFieldValue().category;
    let content = form.getFieldValue().content;

    addPosts(loginUser.userId, title, content, category).then((res) => {
      if (isLogin) {
        if (res.data.code === 0) {
          message.success("发帖成功！");
          form.resetFields();
          history.push("/");
        } else {
          message.error("发帖失败，请重试！");
        }
      } else {
        message.error("未登录无法发帖！");
      }
    });

    console.log(values);
  };

  return (
    <div className="create-post">
      <div className="create-container">
        <div className="caption">发布新帖子</div>
        <Form
          {...layout}
          form={form}
          name="create-form"
          className="create-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="title"
            label="标题"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="category"
            label="分类"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="请选择帖子分类"
              allowClear
              className="select-category"
            >
              <Option value="1">分享</Option>
              <Option value="2">讨论</Option>
              <Option value="3">吐槽</Option>
              <Option value="4">夸夸</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="content"
            label="内容"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="button">
              发布
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
