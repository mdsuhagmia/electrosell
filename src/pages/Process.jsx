import React, { useState } from "react";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { allDeleteCart } from "../components/slice/productSlice";
import { useAuth } from "../context/AuthContext";

const Process = () => {
  let { items } = useSelector((state) => state.product);

  // ক্যালকুলেশন
  let { totalPrice, totalQunatity } = items.reduce(
    (acc, current) => {
      acc.totalPrice += current?.productId?.discountPrice * current.qun;
      acc.totalQunatity += current.qun;
      return acc;
    },
    { totalPrice: 0, totalQunatity: 0 }
  );

  let navigate = useNavigate();

  // স্টেট ম্যানেজমেন্ট
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    division: "",
    city: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  // ইনপুট হ্যান্ডলার
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const {user} = useAuth();

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // ভ্যালিডেশন
    if (!formData.fullName || !formData.phone || !formData.division || !formData.city || !formData.address) {
      toast.error("All shipping fields are required");
      return;
    }

    try {
      setLoading(true);

      const orderPayload = {
        cart: items.map((item) => ({
          product: item.productId._id,
          quantity: item.qun,
        })),
        fullName: formData.fullName,
        phone: formData.phone,
        division: formData.division,
        city: formData.city,
        address: formData.address,
        totalAmount: totalPrice,
      };

      await api.post("/order/createorder", orderPayload, );

      toast.success("🎉 Your Order is Complete", {
        position: "top-center",
        autoClose: 4000,
      });

      dispatch(allDeleteCart(user._id))
      navigate("/ordercomplete");
      window.scrollTo({ top: 0 });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <form className="space-y-5" onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold text-indigo-950 mb-6"> Billing & Shipping </h2>
              
              <div className="pb-2">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  type="text"
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pb-2">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="01xxxxxxxxx"
                  type="text"
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pb-2">
                <label className="block text-sm font-medium text-gray-700">Division</label>
                <input
                  required
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  placeholder="e.g. Dhaka"
                  type="text"
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pb-2">
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City or District"
                  type="text"
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
                <textarea
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Road, House No, Area, Landmark"
                  rows="3"
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold text-indigo-950 mb-6"> Order Summary </h2>
              <table className="w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 border-b">Item</th>
                    <th className="text-right px-4 py-3 border-b">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 border-b text-gray-700">Subtotal</td>
                    <td className="px-4 py-3 border-b text-right text-gray-800 font-semibold">
                      ৳{totalPrice.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border-b text-gray-700">Quantity</td>
                    <td className="px-4 py-3 border-b text-right text-gray-800 font-semibold">{totalQunatity}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border-b text-indigo-950 font-bold">Total</td>
                    <td className="px-4 py-3 border-b text-right text-indigo-950 font-bold">
                      ৳{totalPrice.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Method</h3>
                <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Cash on Delivery</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-8 w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-500 transition hover:scale-102 duration-500 ease-in-out cursor-pointer"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </form>
      </Container>
    </section>
  );
};

export default Process;