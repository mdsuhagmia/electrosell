import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "./Container";
import { FaCartPlus, FaHeart, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { CiHeart, CiStar, CiZoomIn } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { RiCloseLargeFill } from "react-icons/ri";
import api from "../api/axios";
import { addToCart, addToWishlist } from "./slice/productSlice";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { BsThreeDots } from "react-icons/bs";
import Swal from "sweetalert2";

const ProductDetails = () => {
  let { slug } = useParams();

  let [singleProduct, setSingleProduct] = useState({});
  let getProductId = () => {
    api.get(`/products/${slug}`).then((response) => {
      setSingleProduct(response.data.payload);
    });
  };
  useEffect(() => {
    getProductId();
  }, [slug]);

  const [activeImage, setActiveImage] = useState("");
  useEffect(() => {
    if (singleProduct?.images?.length > 0) {
      setActiveImage(singleProduct.images[0]);
    }
  }, [singleProduct]);

  let [relatedProducts, setRelatedProducts] = useState([]);
  let getRelatedProducts = () => {
    if (singleProduct?.category?._id) {
      api
        .get(`/products/category/${singleProduct.category._id}`)
        .then((res) => {
          let filtered = res.data.payload.filter(
            (item) => item.slug !== singleProduct.slug,
          );
          setRelatedProducts(filtered);
        });
    }
  };
  useEffect(() => {
    getRelatedProducts();
  }, [slug]);

  let clientRatting = Array.from({ length: 5 }, (_, index) => {
    let number = index + 0.5;
    return singleProduct?.averageRating > index + 1 ? (
      <FaStar className="text-[gold]" />
    ) : singleProduct?.averageRating > number ? (
      <FaStarHalfAlt className="text-[gold]" />
    ) : (
      <CiStar />
    );
  });

  let dispatch = useDispatch();
  let navigate = useNavigate();

  let wishlist = useSelector((state) => state.product.wishItems);

  const handleWish = (item) => {
    if (!user?._id) {
      return toast.error("Please login first!");
    }
    const alreadyExist = wishlist.find(
      (wishItem) => wishItem.productId === item._id,
    );

    if (alreadyExist) {
      return toast.warning("Already in Wishlist!");
    }
    const wishData = {
      userId: user._id,
      productId: item._id,
    };
    dispatch(addToWishlist(wishData))
      .unwrap()
      .then(() => toast.success("Added to Wishlist"))
      .catch((err) => toast.error(err?.message || "Failed to add"));
  };

  let [zoomIn, setZoomIn] = useState(false);
  const handleZoomIn = (item) => {
    if (item && item.images && item.images.length > 0) {
      setZoomIn(item.images[0]);
    } else {
      toast.error("No image available to zoom!");
    }
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

  const { user } = useAuth();

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
      setTimeout(() => {
        navigate("/cart");
      }, 1000);
    } else {
      toast.error("Please login first!");
    }
  };

  const [reviews, setReviews] = useState([]);

  const fetchReview = async () => {
    try {
      if (!singleProduct?._id) return;
      const res = await api.get(`/reviews/${singleProduct._id}`);
      if (res.data && res.data.payload) {
        setReviews(res.data.payload.reviews);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReview();
  }, [singleProduct]);

  let [filter, setFilter] = useState([]);

  useEffect(() => {
    if (reviews.length > 0) {
      setFilter(reviews.slice(0, 10));
    }
  }, [reviews]);

  let [showAll, setShowAll] = useState(true);
  let handleShowAll = () => {
    setFilter(reviews);
    setShowAll(false);
  };

  let handleShowLess = () => {
    setFilter(reviews.slice(0, 10));
    setShowAll(true);
  };

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      return toast.error("Please login to give a review!");
    }

    if (!comment) {
      return toast.error("Please write a comment!");
    }

    try {
      setLoading(true);
      const reviewData = {
        productId: singleProduct._id,
        rating: Number(rating),
        comment: comment,
      };

      const res = await api.post(`/reviews/create`, reviewData);

      if (res.status === 201) {
        toast.success("Review submitted successfully!");
        setComment("");
        setReviews([res.data.payload.review, ...reviews]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const [activeMenu, setActiveMenu] = useState(null);
  useEffect(() => {
    const closeMenu = () => setActiveMenu(null);
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  const [isEditing, setIsEditing] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState("");

  const handleDeleteReview = async (reviewId) => {
    try {
      const res = await api.delete(`/reviews/${reviewId}`);
      if (res.status === 200) {
        toast.success("Review deleted successfully!");
        setReviews(reviews.filter((r) => r._id !== reviewId));
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete review");
    }
  };

  const handleUpdateSubmit = async (reviewId) => {
    try {
      const updateData = {
        rating: Number(editRating),
        comment: editComment,
      };
      const res = await api.put(`/reviews/${reviewId}`, updateData);

      if (res.status === 200) {
        toast.success("Review updated!");
        setReviews(
          reviews.map((r) =>
            r._id === reviewId
              ? { ...r, rating: editRating, comment: editComment }
              : r,
          ),
        );
        setIsEditing(null);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed!");
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <div className="">
              <img
                src={activeImage || singleProduct.images?.[0]}
                alt={singleProduct.title}
                className="w-full mx-auto bg-gray-300 py-8 px-16 rounded-2xl transition-all duration-300"
              />
              <div className="flex gap-4 mt-4">
                {singleProduct.images?.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                      activeImage === img
                        ? "border-orange-500 shadow-md"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`thumb-${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="">
              <h2 className="text-[20px] sm:text-[36px] md:text-[25px] lg:text-[26px] pt-4 md:pt-0 text-indigo-900 font-bold font-jose pb-2">
                {singleProduct.title}
              </h2>
              <div className="pb-8">
                <div className="flex gap-4 items-center pb-4">
                  <div className="flex">{clientRatting}</div>
                  <div className="">
                    <p className="text-[#767676] text-[16px]">
                      ({singleProduct?.reviews?.length}) Review
                    </p>
                  </div>
                </div>
                <div className="">
                  <div className="flex gap-x-6 items-center pb-4">
                    <p className="text-[#262626] font-jose font-bold text-[18px]">
                      Price : ট{singleProduct.discountPrice}
                    </p>
                    <p className="text-[#d32530] font-bold font-jose line-through">
                      ট{singleProduct.price}
                    </p>
                  </div>
                  <p className="text-[#262626] font-dms font-normal text-[15px]">
                    {singleProduct.description}
                  </p>
                  <p className="text-[#262626] font-jose font-bold text-[18px] pt-2">
                    Sold : {singleProduct.sold}
                  </p>
                  <p className="text-[#262626] font-jose font-bold text-[18px] pt-2">
                    Category : {singleProduct.category?.name}
                  </p>
                  <p className="text-[#262626] font-jose font-bold text-[18px] pt-2">
                    Brand : {singleProduct.brand}
                  </p>
                  <div className="flex gap-x-2 sm:gap-x-6 md:gap-x-2 lg:gap-x-6 pt-6">
                    <div className="">
                      <div
                        onClick={() => handleCartAdd(singleProduct)}
                        className="flex justify-between items-center cursor-pointer gap-x-4 transition-all duration-300 ease-in-out bg-orange-600 hover:bg-orange-500 px-4 sm:px-6 md:px-4 lg:px-6 py-2 rounded-[5px] text-white"
                      >
                        <p className="text-[14px] sm:text-[16px] font-medium font-josefin">
                          Add To cart
                        </p>
                        <FaCartPlus className="" />
                      </div>
                    </div>
                    <div className="">
                      <div
                        onClick={() => handleWish(singleProduct)}
                        className="flex justify-between items-center cursor-pointer gap-x-4 transition-all duration-300 ease-in-out bg-blue-700 hover:bg-blue-800 px-4 sm:px-6 md:px-4 lg:px-6 py-2 rounded-[5px] text-white"
                      >
                        <p className="text-[14px] sm:text-[16px] font-medium font-josefin">
                          Add To Wishlist
                        </p>
                        <CiHeart className="text-[22px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {relatedProducts.length > 0 ? (
            <div>
              <h2 className="text-xl font-bold font-jose text-orange-700 pt-12 pb-6">
                Related proudcts
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4">
                {relatedProducts.map((item) => (
                  <div className="mb-4 shadow">
                    <div className="relative group overflow-x-hidden">
                      <Link to={`/products/${item.id}`}>
                        <img
                          src={item.images[1]}
                          alt={item.title}
                          className=" bg-gray-300 py-6 object-contain w-full h-52 px-4"
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
                      <p className="text-[14px] font-bold font-jose text-violet-950 hover:underline pt-2">
                        {item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
          {reviews.length > 0 && (
            <div className="pt-12">
              <h2 className="text-2xl pb-8 font-bold font-sans text-emerald-600">
                Customer Reviews
              </h2>
              <div>
                {filter.map((item) => (
                  <div
                    key={item._id}
                    className="border-b pb-4 mb-4 pl-6 transition-all"
                  >
                    {isEditing === item._id ? (
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <select
                          value={editRating}
                          onChange={(e) => setEditRating(e.target.value)}
                          className="mb-2 p-1 border rounded"
                        >
                          {[5, 4, 3, 2, 1].map((num) => (
                            <option key={num} value={num}>
                              {num} Stars
                            </option>
                          ))}
                        </select>
                        <textarea
                          className="w-full p-2 border rounded shadow-sm focus:ring-1 focus:ring-blue-400 outline-none"
                          value={editComment}
                          onChange={(e) => setEditComment(e.target.value)}
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleUpdateSubmit(item._id)}
                            className="bg-green-600 text-white px-4 py-1 rounded text-sm font-semibold hover:bg-green-700 cursor-pointer"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setIsEditing(null)}
                            className="bg-gray-500 text-white px-4 py-1 rounded text-sm font-semibold hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-6">
                          <img
                            src={item.userId?.image}
                            className="h-12 w-12 rounded-full border border-[#13bfea]"
                            alt="user"
                          />
                          <div>
                            <h4 className="font-semibold text-indigo-900 pb-1">
                              {item.userId?.name}
                            </h4>
                            <div className="flex text-yellow-500 text-sm">
                              {[...Array(item.rating)].map((_, i) => (
                                <FaStar key={i} />
                              ))}
                            </div>
                            <p className="text-gray-600 mt-1 italic">
                              "{item.comment}"
                            </p>
                          </div>
                        </div>

                        {user?._id === item?.userId?._id && (
                          <div className="relative">
                            <BsThreeDots
                              className="text-2xl cursor-pointer hover:text-red-500"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenu(
                                  activeMenu === item._id ? null : item._id,
                                );
                              }}
                            />
                            {activeMenu === item._id && (
                              <div className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-xl z-50">
                                <button
                                  onClick={() => {
                                    setIsEditing(item._id);
                                    setEditRating(item.rating);
                                    setEditComment(item.comment);
                                    setActiveMenu(null);
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm hover:bg-indigo-50 flex items-center cursor-pointer rounded-t-md gap-2"
                                >
                                  Update Review
                                </button>
                                <button
                                  onClick={() => {
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
                                        handleDeleteReview(item._id);
                                        Swal.fire({
                                          title: "Deleted successfully!",
                                          text: "Item successfully removed from your Wishlist..",
                                          icon: "success",
                                        });
                                      }
                                    });
                                    setActiveMenu(null);
                                  }}
                                  className="w-full cursor-pointer text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-md flex items-center gap-2"
                                >
                                  Delete Review
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                <div>
                  {reviews.length > 10 && (
                    <div className="pt-4">
                      {showAll ? (
                        <button
                          onClick={handleShowAll}
                          className="text-white bg-blue-500 px-8 py-2 rounded-[5px] text-[18px] font-bold font-josefin inline cursor-pointer hover:bg-blue-400"
                        >
                          Show All
                        </button>
                      ) : (
                        <button
                          onClick={handleShowLess}
                          className="text-white bg-blue-500 px-8 py-2 rounded-[5px] text-[18px] font-bold font-josefin inline cursor-pointer hover:bg-blue-400"
                        >
                          Show Less
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="bg-white p-6 mt-12 rounded-xl shadow-sm mb-10 border">
            <h3 className="text-xl font-bold mb-4 text-indigo-900">
              Write a Review
            </h3>
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Rating:</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="border p-2 rounded-md w-32 outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Good</option>
                  <option value="3">3 - Average</option>
                  <option value="2">2 - Poor</option>
                  <option value="1">1 - Terrible</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Comment:</label>
                <textarea
                  rows="4"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Share your experience with this product..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`bg-indigo-600 text-white px-8 py-2 rounded-md font-bold hover:bg-indigo-700 cursor-pointer transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
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

export default ProductDetails;