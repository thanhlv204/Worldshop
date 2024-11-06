import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
  Switch,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductAdd = () => {
  const nav = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate, isPending } = useMutation({
    mutationFn: async (product) => {
      return await axios.post(`http://localhost:3000/products`, product);
    },
    onSuccess: () => {
      //reset form
      form.resetFields();
      messageApi.open({
        type: "success",
        content: "Thêm sản phẩm thành công!",
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      setTimeout(() => {
        nav("/admin/products");
      }, 2000);
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: "Thêm sản phẩm không thành công: " + error.message,
      });
    },
  });
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onHandleChange = (in4) => {
    // console.log("in4", in4);
    if (in4.file.status === "done") {
      setImageUrl(in4.file.response.secure_url);
    }
  };

  const onFinish = (values) => {
    if (!imageUrl) return;
    mutate({ ...values, imageUrl });
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
          label="Tên sản phẩm"
          name="name"
          rules={[
            { required: true, message: "Đây là trường bắt buộc" },
            { min: 3, message: "Không được nhập ít hơn 3 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Giá sản phẩm"
          name="price"
          rules={[
            {
              required: true,
              message: "Đây là trường bắt buộc",
            },
            {
              type: "number",
              min: 0,
              message: "Không được để số âm",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          multiple={true}
        >
          <Upload
            action="https://api.cloudinary.com/v1_1/dp0sdchpp/image/upload"
            listType="picture-card"
            data={{
              upload_preset: "Fa24-frame2",
            }}
            onChange={onHandleChange}
          >
            <button
              style={{
                border: 0,
                background: "none",
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </Upload>
        </Form.Item>

        <Form.Item label="Tình trạng" name="available" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item label="Loại hàng" name="type">
          <Radio.Group>
            <Radio value="type1">Hàng cũ</Radio>
            <Radio value="type2">Hàng mới</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Danh mục" name="category">
          <Select placeholder="Chọn danh mục">
            <Select.Option value="Áo "></Select.Option>
            <Select.Option value="Quần"></Select.Option>
            <Select.Option value="Phụ kiện"></Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Mô tả sản phẩm" name="description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductAdd;
