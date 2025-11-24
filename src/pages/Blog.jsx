import React from 'react';
import { FiSearch, FiArrowRight, FiMail } from 'react-icons/fi';

const blogPosts = [
    { id: 1, title: "শীতের জন্য সেরা ৫টি জ্যাকেট", excerpt: "শীতকালে ফ্যাশনেবল থাকার জন্য সেরা জ্যাকেটগুলোর রিভিউ...", date: "নভেম্বর ১৯, ২০২৫", category: "ফ্যাশন", image: "https://via.placeholder.com/400x250?text=Jacket+Review" },
    { id: 2, title: "স্মার্টওয়াচ কেন আপনার প্রয়োজন?", excerpt: "ফিটনেস ট্র্যাকিং এবং দৈনন্দিন সুবিধার জন্য সেরা স্মার্টওয়াচ...", date: "নভেম্বর ১৫, ২০২৫", category: "টেক রিভিউ", image: "https://via.placeholder.com/400x250?text=Smartwatch" },
    { id: 3, title: "নতুন জুতো কেনার আগে যা জানা দরকার", excerpt: "জুতার সঠিক মাপ এবং স্টাইল নির্বাচনের সহজ গাইড...", date: "নভেম্বর ১০, ২০২৫", category: "ফ্যাশন", image: "https://via.placeholder.com/400x250?text=Shoes+Guide" },
    { id: 4, title: "হোম ডেকোরেশন: ৫টি সহজ টিপস", excerpt: "কম খরচে ঘর সাজানোর জন্য কিছু কার্যকরী টিপস...", date: "নভেম্বর ৫, ২০২৫", category: "লাইফস্টাইল", image: "https://via.placeholder.com/400x250?text=Home+Decor" },
];

const categories = [
    { name: "ফ্যাশন", count: 12 },
    { name: "টেক রিভিউ", count: 8 },
    { name: "লাইফস্টাইল", count: 15 },
    { name: "হেলথ অ্যান্ড বিউটি", count: 5 },
];

const popularTags = ["ডিসকাউন্ট", "গিফট আইডিয়া", "অনলাইন শপিং", "নতুন কালেকশন"];

const BlogPostCard = ({ post }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-52 object-cover" />
        <div className="p-5">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">{post.category}</span>
            <h3 className="text-2xl font-bold text-gray-900 mt-2 hover:text-blue-600 transition-colors cursor-pointer line-clamp-2">
                {post.title}
            </h3>
            <p className="text-gray-600 mt-3 line-clamp-3">{post.excerpt}</p>
            <div className="flex justify-between items-center mt-4 border-t pt-4">
                <p className="text-sm text-gray-500">{post.date}</p>
                <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
                    পড়ুন <FiArrowRight className="ml-1" />
                </button>
            </div>
        </div>
    </div>
);

const Blog = () => {
    const featuredPost = blogPosts[0];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-10">
          আমাদের ই-কমার্স ব্লগ
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-8/12">
            <div className="mb-10 bg-white shadow-xl rounded-xl overflow-hidden">
              <div className="md:flex">
                <img src={featuredPost.image} alt={featuredPost.title} className="w-full md:w-1/2 h-72 object-cover" />
                <div className="p-6 md:p-8">
                  <span className="text-base font-semibold text-red-500 uppercase tracking-wider">ফিচার্ড</span>
                  <h2 className="text-3xl font-bold text-gray-900 mt-2 hover:text-blue-600 cursor-pointer">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mt-4">{featuredPost.excerpt}</p>
                  <button className="mt-6 flex items-center text-blue-600 font-bold hover:text-blue-800">
                    সম্পূর্ণ পড়ুন <FiArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.slice(1).map(post => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                আরও দেখুন (Load More)
              </button>
            </div>
          </div>
          <div className="lg:w-4/12 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">ব্লগ সার্চ করুন</h3>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <input
                  type="text"
                  placeholder="কী খুঁজছেন..."
                  className="w-full p-3 focus:outline-none"
                />
                <button className="bg-blue-600 text-white p-3 hover:bg-blue-700 transition-colors">
                  <FiSearch className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">বিষয়বস্তু</h3>
              <ul className="space-y-2">
                {categories.map(cat => (
                  <li key={cat.name} className="flex justify-between items-center text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                    <span>{cat.name}</span>
                    <span className="bg-gray-100 text-sm px-2 py-0.5 rounded-full">{cat.count}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-100 p-6 rounded-xl shadow-lg text-center">
              <FiMail className="w-8 h-8 mx-auto text-blue-600 mb-3" />
              <h3 className="text-xl font-bold text-blue-800 mb-2">নিউজলেটারে যোগ দিন</h3>
              <p className="text-blue-700 mb-4 text-sm">নতুন অফার ও টিপস সরাসরি ইনবক্সে পান।</p>
              <input
                type="email"
                placeholder="আপনার ইমেইল"
                className="w-full p-3 border-none rounded-lg focus:ring-2 focus:ring-blue-500 mb-3"
              />
              <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                সাবস্ক্রাইব করুন
              </button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">জনপ্রিয় ট্যাগসমূহ</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-full hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;