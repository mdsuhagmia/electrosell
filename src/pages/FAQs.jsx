import React from 'react';
import Container from '../components/Container';

const FAQs = () => {
  return (
    <section className='py-6 sm:py-8 md:py-10 lg:py-12 bg-gray-50'>
      <Container>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-2xl sm:text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-4 sm:mb-8'>
            Frequently Asked Questions
          </h1>
          <div>
            <h2 className='text-xl sm:text-2xl font-extrabold underline text-center pb-4 sm:pb-2'>অর্ডার ও ডেলিভারিঃ</h2>
            <div className='px-4 py-2 sm:py-6 shadow-md mb-8 hover:shadow-xl group'>
              <h2 className='text-[16px] sm:text-2xl font-semibold font-jose pb-2 group-hover:text-rose-600'>ডেলিভারি হতে কত সময় লাগবে?</h2>
              <p className='text-[14px] sm:text-lg font-medium font-lat'>সাধারণত ঢাকা সিটির ভেতরে ১-২ কার্যদিবস এবং ঢাকার বাইরে ৩-৪ কার্যদিবস সময় লাগে।</p>
            </div>
            <div className='px-4 py-2 sm:py-6 shadow-md mb-8 hover:shadow-xl group'>
              <h2 className='text-[16px] sm:text-2xl font-semibold font-jose pb-2 group-hover:text-rose-600'>অর্ডার নিশ্চিতকরণ (Confirmation) কখন পাবো?</h2>
              <p className='text-[14px] sm:text-lg font-medium font-lat'>অর্ডার দেওয়ার সাথে সাথেই আপনি ইমেইল বা SMS এর মাধ্যমে নিশ্চিতকরণ পাবেন।</p>
            </div>
            <div className='px-4 py-2 sm:py-6 shadow-md mb-8 hover:shadow-xl group'>
              <h2 className='text-[16px] sm:text-2xl font-semibold font-jose pb-2 group-hover:text-rose-600'>আপনারা কি সরকারি ছুটির দিনে ডেলিভারি দেন?</h2>
              <p className='text-[14px] sm:text-lg font-medium font-lat'>হ্যাঁ, সরকারি ছুটির দিনেও আমরা ডেলিভারি করি। তবে ছুটির দিনগুলিতে অর্ডারের প্রসেসিং বা ডেলিভারি সময় সামান্য বাড়তে পারে। অর্ডার করার আগে কাস্টমার সাপোর্টের মাধ্যমে নিশ্চিত হওয়া ভালো।</p>
            </div>
            <div className='px-4 py-2 sm:py-6 shadow-md mb-8 hover:shadow-xl group'>
              <h2 className='text-[16px] sm:text-2xl font-semibold font-jose pb-2 group-hover:text-rose-600'>আমার অর্ডার কিভাবে ট্র্যাক করব?</h2>
              <p className='text-[14px] sm:text-lg font-medium font-lat'>অর্ডার শিপ করার পর আপনাকে ট্র্যাকিং নম্বর SMS/ইমেইলে পাঠানো হবে। আমাদের ওয়েবসাইটেও ট্র্যাকিং পেজ আছে।</p>
            </div>
          </div>
          <div>
            <h2 className='text-xl sm:text-2xl font-extrabold pb-4 underline text-center'>পেমেন্ট ও রিফান্ডঃ</h2>
            <div className='px-4 py-2 sm:py-6 shadow-md mb-8 hover:shadow-xl group'>
              <h2 className='text-[16px] sm:text-2xl font-semibold font-jose pb-2 group-hover:text-rose-600'>আপনারা কি কি পেমেন্ট পদ্ধতি গ্রহণ করেন?</h2>
              <p className='text-[14px] sm:text-lg font-medium font-lat'>আমরা ক্রেডিট/ডেবিট কার্ড, মোবাইল ব্যাংকিং (বিকাশ, নগদ), এবং ক্যাশ অন ডেলিভারি (COD) গ্রহণ করি।</p>
            </div>
            <div className='px-4 py-2 sm:py-6 shadow-md mb-8 hover:shadow-xl group'>
              <h2 className='text-[16px] sm:text-2xl font-semibold font-jose pb-2 group-hover:text-rose-600'>অর্ডার নিশ্চিতকরণ (Confirmation) কখন পাবো?</h2>
              <p className='text-[14px] sm:text-lg font-medium font-lat'>রিটার্ন প্রক্রিয়া শেষ হওয়ার পর ৫-৭ কার্যদিবসের মধ্যে আপনার রিফান্ড প্রক্রিয়া সম্পন্ন হবে।</p>
            </div>
            <div className='px-4 py-2 sm:py-6 shadow-md mb-8 hover:shadow-xl group'>
              <h2 className='text-[16px] sm:text-2xl font-semibold font-jose pb-2 group-hover:text-rose-600'>আমার কুপন কোড কিভাবে ব্যবহার করব?</h2>
              <p className='text-[14px] sm:text-lg font-medium font-lat'>চেকআউট পেজে 'কুপন কোড যোগ করুন' বক্সে আপনার কোডটি লিখুন এবং Apply চাপুন।</p>
            </div>
          </div>
          <div>
            <h2 className='text-xl sm:text-2xl font-extrabold pb-4 underline text-center'>রিটার্ন ও এক্সচেঞ্জঃ</h2>
            <div className='px-4 py-2 sm:py-6 shadow-md mb-8 hover:shadow-xl group'>
              <h2 className='text-[16px] sm:text-2xl font-semibold font-jose pb-2 group-hover:text-rose-600'>আপনাদের রিটার্ন পলিসি কি?</h2>
              <p className='text-[14px] sm:text-lg font-medium font-lat'>ডেলিভারির ৭ দিনের মধ্যে অব্যবহৃত পণ্য ফেরত বা এক্সচেঞ্জ করা যেতে পারে। বিস্তারিত জানার জন্য আমাদের রিটার্ন পলিসি পেজ দেখুন।</p>
            </div>
            <div className='px-4 py-2 sm:py-6 shadow-md mb-8 hover:shadow-xl group'>
              <h2 className='text-[16px] sm:text-2xl font-semibold font-jose pb-2 group-hover:text-rose-600'>ফেরত দেওয়া পণ্যের জন্য কি কোনো চার্জ কাটা হয়?</h2>
              <p className='text-[14px] sm:text-lg font-medium font-lat'>পণ্যে কোনো ত্রুটি না থাকলে, রিটার্ন শিপিং চার্জ প্রযোজ্য হতে পারে।</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FAQs;