import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Image,
  message,
  Popconfirm,
  Skeleton,
  Space,
  Table,
} from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ProductlistAdmin = () => {
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/products`);
      return res.data.map((product, index) => ({
        key: product.id,
        ...product,
        customId: index + 1,
      }));
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (id) => {
      return await axios.delete(`http://localhost:3000/products/${id}`);
    },
    onSuccess: () => {
      messageApi.success("Xóa sản phẩm thành công");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (error) => {
      messageApi.error("Xóa sản phẩm không thành công", error.message);
    },
  });

  const onHandleRemove = (id) => {
    mutate(id);
  };

  const handleClick = () => {
    nav("/admin/products/add");
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "customId",
      key: "customId",
    },
    {
      title: "Ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (_, item) => {
        // console.log(item);
        return (
          <Space>
            {item?.imageUrl?.length > 0 && (
              <Image
                key={item.imageUrl} // lấy ảnh đầu tiên
                src={item.imageUrl}
                width={70}
                className="rounded border"
              />
            )}
          </Space>
        );
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Tình trạng",
      dataIndex: "available",
      key: "available",
      render: (_, item) => {
        return <span>{item.available ? "Còn hàng" : "Hết hàng"}</span>;
      },
    },
    {
      title: "Loại hàng",
      key: "type",
      dataIndex: "type",
      render: (type) => {
        return <span>{type === "type1" ? "Hàng cũ" : "Hàng mới"}</span>;
      },
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      key: "action",
      render: (_, item) => (
        <div className="w-20">
          <Space width="150">
            <Popconfirm
              title="Xóa sản phẩm"
              description="Bạn có chắc chắn muốn xóa sản phẩm này không?"
              onConfirm={() => onHandleRemove(item.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button variant="solid" color="danger">
                Xóa
              </Button>
            </Popconfirm>
            <Link to={`/admin/products/edit/${item.id}`}>
              <Button
                variant="solid"
                style={{ backgroundColor: "#faad14", color: "white" }}
              >
                Cập nhật
              </Button>
            </Link>
          </Space>
        </div>
      ),
    },
  ];
  return (
    <>
      {contextHolder}
      <h1 className="text-3xl mb-5">Quản lý sản phẩm</h1>
      <Button
        variant="solid"
        color="primary"
        onClick={handleClick}
        className="mb-3"
      >
        Thêm sản phẩm mới
      </Button>
      <Skeleton active loading={isLoading}>
        <Table columns={columns} dataSource={data}></Table>
      </Skeleton>
    </>
  );
};

export default ProductlistAdmin;
