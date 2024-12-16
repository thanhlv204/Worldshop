/* eslint-disable no-unused-vars */
import { Skeleton } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PageShop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Hiển thị không thành công! :", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  if (loading) return <Skeleton active />;
  return (
    <div>
      <div
        id="carouselExampleInterval"
        className="carousel slide mt-3"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval={3000}>
            <img
              src="https://picsum.photos/id/425/1440/600.jpg"
              className="d-block w-100"
              alt="First slide"
            />
          </div>
          <div className="carousel-item" data-bs-interval={1000}>
            <img
              src="https://picsum.photos/id/235/1440/600.jpg"
              className="d-block w-100"
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://picsum.photos/id/100/1440/600.jpg"
              className="d-block w-100"
              alt="Third slide"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container mx-auto mt-5">
        <h2 className="text-xl font-semibold mb-4">
          <Link to="/" className="text-[25px] hover:underline">
            Trang chủ
          </Link>
          » <span className="text-gray-500">Sản phẩm</span>
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow rounded-lg p-4">
              <Link to=":id" className=" ">
                <img
                  className="w-full h-72 object-cover rounded"
                  src={product.imageUrl}
                  alt={product.name}
                />
                <h3 className="mt-4 text-lg font-semibold hover:underline hover:text-red-500">
                  {product.name}
                </h3>
              </Link>

              <p className="mt-2 text-green-600 text-xl font-bold">
                {product.price}₫
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageShop;
