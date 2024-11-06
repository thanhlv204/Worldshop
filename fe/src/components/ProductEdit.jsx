import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
  Skeleton,
  Switch,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductEdit = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [defaultFileList, setDefaultFileList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const { data, isLoading } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/products/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (data?.imageUrl) {
      setImageUrl(data.imageUrl);
      setDefaultFileList({
        uid: "-1",
        name: "image",
        status: "done",
        url: data.imageUrl,
      });
    }
  }, [data]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (product) => {
      return await axios.put(`http://localhost:3000/products/${id}`, product);
    },
    onSuccess: () => {
      //reset form
      messageApi.open({
        type: "success",
        content: "Cập nhật sản phẩm thành công!",
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      setTimeout(() => {
        nav("/admin/products");
      }, 2000);
      queryClient.invalidateQueries({
        queryKey: ["products", id],
      });
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: "Cập nhật sản phẩm không thành công: " + error.message,
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
    const imageSave = imageUrl.length > 0 ? imageUrl : defaultFileList;
    // console.log(imageUrl);
    mutate({ ...values, imageUrl: imageSave });
  };

  if (isLoading) return <Skeleton active />;
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
        initialValues={data}
        disabled={isPending}
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: "Đây là trường bắt buộc" }]}
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
            defaultFileList={defaultFileList}
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
          <Select>
            <Select.Option value="idCategory1">Danh mục 1</Select.Option>
            <Select.Option value="idCategory2">Danh mục 2</Select.Option>
            <Select.Option value="idCategory3">Danh mục 3</Select.Option>
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

export default ProductEdit;
