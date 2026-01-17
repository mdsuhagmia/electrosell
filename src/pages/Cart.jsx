import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../components/Container";
import { BsFillCartXFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { CiZoomIn } from "react-icons/ci";
import { RiCloseLargeFill } from "react-icons/ri";
import { ApiData } from "../components/ContextApi";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import {
  addToCart,
  allDeleteCart,
  decrement,
  fetchProducts,
  increment,
  itemDelete,
} from "../components/slice/productSlice";
import toast from "react-hot-toast";

const Cart = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const { items, status } = useSelector((state) => state.product);

  useEffect(() => {
    if (user && user._id) {
      dispatch(fetchProducts(user._id));
    }
  }, [dispatch, user]);

  const handleDeleteCart = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to permanently remove this item? This action cannot be undone.!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(itemDelete(item._id));
        Swal.fire({
          title: "Deleted successfully!",
          text: "Item successfully removed from your Wishlist..",
          icon: "success",
        });
      }
    });
  };

  const handleClearCart = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to permanently remove this item? This action cannot be undone.!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(allDeleteCart(item.userId));
        Swal.fire({
          title: "Deleted successfully!",
          text: "Item successfully removed from your Wishlist..",
          icon: "success",
        });
      }
    });
  };
  
  const handleCartAdd = (item) => {
    if (user && user._id) {
      const cartData = {
        userId: user._id,
        productId: item._id,
        qun: 1,
      };
      dispatch(addToCart(cartData))
        .unwrap()
        .then(() => toast.success("Product added to cart successfully!"))
        .catch((err) => toast.error("Failed to add: " + err.message));
    } else {
      toast.error("Please login first!");
    }
  };

  let { totalPrice, totalQuantity } = items.reduce(
    (item, index) => {
      item.totalPrice += index?.productId?.discountPrice * index.qun;
      item.totalQuantity += index.qun;
      return item;
    },
    { totalPrice: 0, totalQuantity: 0 }
  );

  let { products } = useContext(ApiData);

  let [suggested, setSuggested] = useState([]);
  useEffect(() => {
    let randomProduct = [...products].sort(() => 0.5 - Math.random());
    let selected = randomProduct.slice(0, 8);
    setSuggested(selected);
  }, [products]);

  let [zoomIn, setZoomIn] = useState(false);
  let handleZoomIn = (item) => {
    setZoomIn(item.images?.[0]);
  };

  let zoomRef = useRef();
  useEffect(() => {
    let handleClickOutsite = (e) => {
      if (zoomIn && !zoomRef.current.contains(e.target)) {
        setZoomIn(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsite);
    return () => document.removeEventListener("mousedown", handleClickOutsite);
  }, [zoomIn]);

  if (status === "loading")
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex items-center gap-x-4">
          <div className="h-8 w-8 rounded-full border-6 border-gray-200 border-t-blue-500 animate-spin"></div>
          <p className="text-blue-500 text-4xl font-bold font-sans">
            Loading...
          </p>
        </div>
      </div>
    );
  if (status === "faild")
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-blue-500 text-4xl font-bold font-sans">
          Faild to load products. please try again.
        </p>
      </div>
    );

  return (
    <section className="pb-16">
      <Container>
        <div className="relative">
          {items.length > 0 && (
            <div className="py-8 sm:py-16 flex items-center justify-start lg:justify-center gap-x-2">
              <FaCartPlus className="text-xl sm:text-4xl text-violet-950" />
              <h2 className="text-center text-[16px] sm:text-3xl font-jose font-extrabold text-violet-950">
                Your Shopping Cart ({items.length})
              </h2>
            </div>
          )}
          {items.length > 0 ? (
            <div>
              <div className="hidden md:block">
                <div className="overflow-x-auto rounded-lg shadow-md">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                      <tr className="text-left text-indigo-950 font-bold text-lg">
                        <th className="px-6 py-4">Product</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Remove</th>
                        <th className="px-6 py-4">Total</th>
                        <th className="px-6 py-4">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr
                          key={item._id}
                          className="border-t-2 border-[#0000001d] hover:bg-gray-50 transition"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <img
                                src={item?.productId?.images?.[0]}
                                alt={item?.productId?.title}
                                className="h-20 w-20 object-contain"
                              />
                              <div>
                                <span className="font-semibold font-jose text-indigo-950 text-[14px] lg:text-[16px]">
                                  {item?.productId?.title}
                                </span>
                                <span className="font-medium font-lat text-gray-600 text-[12px] lg:text-[16px]">
                                  {item?.productId?.category?.name}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-semibold">
                            ট {item?.productId?.discountPrice}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleDeleteCart(item)}
                              className="text-red-500 hover:text-red-400 font-semibold cursor-pointer"
                            >
                              Remove
                            </button>
                          </td>
                          <td className="px-6 whitespace-nowrap py-4 font-semibold text-gray-800">
                            ট {(item?.productId?.discountPrice * item.qun).toFixed(2)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => dispatch(decrement(item._id))}
                                className={`px-2 py-1 bg-gray-200 rounded   ${
                                  item.qun <= 1
                                    ? "opacity-50 cursor-not-allowed"
                                    : "opacity-100 hover:bg-gray-300 cursor-pointer"
                                }`}
                              >
                                -
                              </button>
                              <span className="font-medium">{item.qun}</span>
                              <button
                                onClick={() => dispatch(increment(item._id))}
                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td>
                            <div
                              className="absolute top-8 sm:top-16 right-0"
                              onClick={() => handleClearCart(item)}
                            >
                              <h2 className="text-end text-[10px] sm:text-[18px] font-jose font-bold text-white bg-red-500 px-2 sm:px-4 py-1 sm:py-2 rounded-[5px] inline-block cursor-pointer hover:bg-red-400">
                                Delete All
                              </h2>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <table className="w-full max-w-xl ml-auto mt-10 border border-gray-300 rounded-lg shadow-md bg-white">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left px-6 py-4 text-indigo-950 font-bold text-lg border-b border-gray-300">
                        Summary
                      </th>
                      <th className="text-right px-6 py-4 text-indigo-950 font-bold text-lg border-b border-gray-300">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-6 py-4 text-gray-700 font-medium border-b border-gray-200">
                        Subtotal
                      </td>
                      <td className="px-6 py-4 text-right text-gray-800 font-semibold border-b border-gray-200">
                        ${totalPrice.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-gray-700 font-medium border-b border-gray-200">
                        Total Quantity
                      </td>
                      <td className="px-6 py-4 text-right text-gray-800 font-semibold border-b border-gray-200">
                        {totalQuantity}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-gray-700 font-medium border-b border-gray-200">
                        Shipping
                      </td>
                      <td className="px-6 py-4 text-right text-gray-800 font-semibold border-b border-gray-200">
                        ট 00
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-indigo-950 font-bold border-b border-gray-300">
                        Total
                      </td>
                      <td className="px-6 py-4 text-right text-indigo-950 font-bold border-b border-gray-300">
                        ${totalPrice.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="px-6 py-4 text-center">
                        <Link
                          to={"/process"}
                          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-500 font-semibold inline-block hover:scale-102 transition duration-500 ease-in-out"
                        >
                          Process to Checkout
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="md:hidden">
                <div className="overflow-x-auto rounded-lg shadow-md">
                  <table className="min-w-full bg-white border-t-3 border-blue-500">
                    <tbody>
                      {items.map((item) => (
                        <tr
                          key={item._id}
                          className="border-t-2 border-[#0000001d] hover:bg-gray-50 transition"
                        >
                          <td className="px-6 py-4 ">
                            <div className="flex items-center gap-4">
                              <img
                                src={item?.productId?.images?.[0]}
                                alt={item.title}
                                className="h-20 w-20 object-contain"
                              />
                              <div>
                                <span className="font-semibold font-jose text-indigo-950">
                                  {item?.productId?.title}
                                </span>
                                <span className="font-medium font-lat text-gray-600">
                                  {item.productId?.category?.name}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className=" px-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-gray-700 font-semibold">
                                  ট{item?.productId?.price}
                                </span>
                              </div>
                              <div>
                                <button
                                  onClick={() => handleDeleteCart(item)}
                                  className="text-red-500 hover:text-red-400 font-semibold cursor-pointer"
                                >
                                  Remove
                                </button>
                              </div>
                              <div className="font-semibold text-gray-800">
                                $
                                {(item?.productId?.price * item.qun).toFixed(2)}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                Qunatitu:
                                <button
                                  onClick={() => dispatch(decrement(item._id))}
                                  className={`px-2 py-1 bg-gray-200 rounded   ${
                                    item.qun <= 1
                                      ? "opacity-50 cursor-not-allowed"
                                      : "opacity-100 hover:bg-gray-300 cursor-pointer"
                                  }`}
                                >
                                  -
                                </button>
                                <span className="font-medium">{item.qun}</span>
                                <button
                                  onClick={() => dispatch(increment(item._id))}
                                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div
                              className="absolute top-8 sm:top-16 right-0"
                              onClick={() => handleClearCart(item)}
                            >
                              <h2 className="text-end text-[12px] sm:text-[18px] font-jose font-bold text-white bg-red-500 px-2 sm:px-4 py-1 sm:py-2 rounded-[5px] inline-block cursor-pointer hover:bg-red-400">
                                Delete All
                              </h2>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <table className="w-full max-w-xl ml-auto mt-10 border border-gray-300 rounded-lg shadow-md bg-white">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left px-6 py-4 text-indigo-950 font-bold text-lg border-b border-gray-300">
                        Summary
                      </th>
                      <th className="text-right px-6 py-4 text-indigo-950 font-bold text-lg border-b border-gray-300">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-6 py-4 text-gray-700 font-medium border-b border-gray-200">
                        Subtotal
                      </td>
                      <td className="px-6 py-4 text-right text-gray-800 font-semibold border-b border-gray-200">
                        ${totalPrice.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-gray-700 font-medium border-b border-gray-200">
                        Total Quantity
                      </td>
                      <td className="px-6 py-4 text-right text-gray-800 font-semibold border-b border-gray-200">
                        {totalQuantity}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-gray-700 font-medium border-b border-gray-200">
                        Shipping
                      </td>
                      <td className="px-6 py-4 text-right text-gray-800 font-semibold border-b border-gray-200">
                        ট 00
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-indigo-950 font-bold border-b border-gray-300">
                        Total
                      </td>
                      <td className="px-6 py-4 text-right text-indigo-950 font-bold border-b border-gray-300">
                        ${totalPrice.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="px-6 py-4 text-center">
                        <Link
                          to={"/process"}
                          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-500 font-semibold inline-block hover:scale-102 transition duration-500 ease-in-out"
                        >
                          Process to Checkout
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="pt-12">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 pb-6">
                  <h2 className="text-2xl sm:text-4xl font-bold font-jose text-indigo-950">
                    Your cart is Empty
                  </h2>
                  <BsFillCartXFill className="text-2xl sm:text-3xl text-indigo-950" />
                </div>
                <Link
                  to="/products"
                  className="bg-indigo-950 text-white px-8 py-3 rounded font-semibold hover:bg-indigo-800 text-md transition"
                >
                  Continue Shopping
                </Link>
              </div>
              <div>
                <h2 className="text-green-500 text-[25px] font-semibold font-jose pb-2 pt-8">
                  Just for you
                </h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4">
                {suggested.map((item) => (
                  <div className="mb-4 shadow">
                    <div className="relative group overflow-x-hidden">
                      <Link to={`/products/${item.slug}`}>
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className=" bg-gray-300 py-6 object-contain w-full h-40 sm:h-60 px-4 md:px-14"
                        />
                      </Link>
                      <div className="absolute top-4 -left-14 group-hover:left-2 opacity-0 group-hover:opacity-100 py-2 transition-all duration-500 ease-in-out">
                        <div
                          className="pb-4"
                          onClick={() => handleCartAdd(item)}
                        >
                          <div className="cursor-pointer text-[#767676] text-[20px] font-dms font-medium hover:text-[#ee00ff] pl-1">
                            <FaCartPlus />
                          </div>
                        </div>
                        <div className="pb-4">
                          <div className="cursor-pointer text-[#767676] text-[20px] font-dms font-medium hover:text-[#ee00ff] pl-1">
                            {/* <FaHeart onClick={() => handleWish(item)} /> */}
                          </div>
                        </div>
                        <div className="pb-4">
                          <div
                            onClick={() => handleZoomIn(item)}
                            className="cursor-pointer text-[#767676] text-[16px] font-dms font-medium hover:text-[#ee00ff]"
                          >
                            <CiZoomIn className="text-3xl" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="py-4 px-3">
                      <Link to={`/products/${item.slug}`}>
                        <h2 className="text-[14px] font-bold font-jose text-violet-950 hover:underline line-clamp-2">
                          {item.title}
                        </h2>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {zoomIn && (
          <div
            ref={zoomRef}
            className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[99999] bg-gray-100 px-20 rounded-2xl shadow-2xl border border-[#0000004b]"
          >
            <div className="relative">
              <img
                src={zoomIn}
                className="max-w-7xl max-h-[calc(100vh-60px)] py-6"
                alt=""
              />
              <div className="absolute top-4 -right-16">
                <RiCloseLargeFill
                  onClick={() => setZoomIn(false)}
                  className="text-5xl bg-red-500 text-white p-2 rounded-full cursor-pointer hover:bg-red-700 duration-300 font-extrabold"
                />
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Cart;