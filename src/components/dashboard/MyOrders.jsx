import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/axios";
import Container from "../Container";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(
    orders.map((item) => item.products.map((item) => item.product.images[0]))
  );

  const fetchMyOrders = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await api.get("/order/user-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data?.success) {
        setOrders(data.payload);
      }
    } catch (error) {
      console.error(error);
      toast.error("অর্ডার লিস্ট লোড করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-xl">লোড হচ্ছে...</div>;
  }

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <Container>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
          Your Orders ({orders.length})
        </h2>

        {orders.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-lg shadow">
            <p className="text-gray-500 text-lg">
              আপনি এখনো কোনো অর্ডার করেননি।
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="bg-gray-100 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Order ID
                    </p>
                    <p className="text-sm font-mono text-indigo-600">
                      {order._id}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Date
                    </p>
                    <p className="text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Payment method
                    </p>
                    <p className="text-sm">{order.payment?.method || "COD"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Status
                    </p>
                    <span
                      className={`px-4 pb-1 rounded-full text-xs font-bold ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="divide-y divide-gray-100">
                    {order.products.map((item, i) => {
                      const productInfo = item.product;
                      const productImage =
                        productInfo?.images && productInfo.images.length > 0
                          ? productInfo.images[0]
                          : "https://via.placeholder.com/150";

                      return (
                        <div key={i} className="py-4 flex items-center gap-4">
                          <img
                            src={productImage}
                            alt={productInfo?.title}
                            className="w-16 h-16 object-cover rounded-md border"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 line-clamp-1">
                              {productInfo?.title || "Product Name Not Found"}
                            </h4>
                            <p className="text-sm text-gray-500">
                              Quantity: {item.quantity} | ট-{productInfo?.price}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-700">
                              ট-{(productInfo?.price || 0) * item.quantity}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t flex justify-between items-center">
                  <p className="text-gray-600 line-clamp-1">
                    Address:{" "}
                    <span className="text-gray-800">
                      {order.address}, {order.city}
                    </span>
                  </p>
                  <p className="text-xl font-bold text-indigo-950">
                    Total: ট-{order.totalAmount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default MyOrders;