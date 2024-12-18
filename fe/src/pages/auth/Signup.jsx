import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const nav = useNavigate();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      return await axios.post(`http://localhost:8080/api/auth/sign-up`, data);
    },
    onSuccess: () => {
      //reset form
      form.resetFields();
      messageApi.open({
        type: "success",
        content: "Đăng ký thành công!",
      });
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      setTimeout(() => {
        nav("/login");
      }, 2000);
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: "Đăng ký không thành công: " + error.message,
      });
    },
  });

  const onFinish = (values) => {
    mutate({ ...values });
  };
  return (
    <div>
      {contextHolder}
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        disabled={isPending}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Incorrect email format",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              type: "string",
              min: 8,
              message: "Password not less than 8 characters!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            ({ getFieldValue }) => {
              return {
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Passwords do not match. Please try again")
                  );
                },
              };
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
