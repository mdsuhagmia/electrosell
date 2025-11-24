import React, { useState } from "react";
import { FiTruck, FiCreditCard, FiPhone, FiMapPin } from "react-icons/fi";
import { AiOutlineCheckCircle, AiOutlineClockCircle } from "react-icons/ai";
import { BsBoxSeam, BsFillChatDotsFill } from "react-icons/bs";

export default function ShippingDelivery() {
  const [tracking, setTracking] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);
  const [selectedZone, setSelectedZone] = useState("inside_city");

  const shippingRates = {
    inside_city: { label: "শহরের ভিতরে", estimate: "১-২ কার্যদিবস", cost: 30 },
    within_country: { label: "দেশের ভিতরে", estimate: "৩-৭ কার্যদিবস", cost: 70 },
    international: { label: "আন্তর্জাতিক", estimate: "৭-২১ কার্যদিবস", cost: 300 },
  };

  const courierPartners = [
    { name: "SA Paribahan", website: "#" },
    { name: "Sundarban Courier", website: "#" },
    { name: "Pathao Courier", website: "#" },
    { name: "DHL", website: "#" },
  ];

  const faqs = [
    {
      q: "ডেলিভারি সময় কত দিন?",
      a: "শহরের ভিতরে: ১-২ কার্যদিবস; দেশের ভিতরে: ৩-৭ কার্যদিবস; আন্তর্জাতিক: ৭-২১ কার্যদিবস।",
    },
    {
      q: "COD (Cash on Delivery) আছে কি?",
      a: "হ্যাঁ, নগদে ডেলিভারি (COD) ৩০,০০০ টাকা পর্যন্ত অর্ডারের জন্য পাওয়া যায়। COD ফি ৫০ টাকা প্রযোজ্য হতে পারে।",
    },
    {
      q: "অর্ডার কখন প্রসেস হয়?",
      a: "অর্ডার কনফার্মেশন এবং প্যাকিং সাধারণত ১২-৪৮ ঘন্টার মধ্যে সম্পন্ন হয়। সন্ধ্যা ৫টার পর অর্ডার করা হলে পরবর্তী কার্যদিবসে প্রসেস হয়।",
    },
    {
      q: "রিটার্ন ও এক্সচেঞ্জের ডেলিভারি সময়",
      a: "রিটার্ন/এক্সচেঞ্জ পিকআপ: ২-৫ কার্যদিবস; রিপ্লেসমেন্ট ডেলিভারি: অনুমোদনের ৩-৭ কার্যদিবসের মধ্যে।",
    },
  ];

  function estimateForZone(zone, subtotal = 0) {
    const base = shippingRates[zone];
    let cost = base.cost;
    if (zone === "within_country" && subtotal >= 3000) cost = 0;
    return { ...base, cost };
  }

  function handleTrack() {
    if (!tracking) return setTrackingResult({ status: "error", text: "ট্র্যাকিং নম্বর খালি আছে।" });
    const lastChar = tracking.trim().slice(-1);
    if (!lastChar) return setTrackingResult(null);
    const step = parseInt(lastChar, 36) % 4;
    const steps = [
      { title: "অর্ডার গ্রহণ করা হয়েছে", desc: "আপনার অর্ডার গ্রহণ করা হয়েছে এবং শীঘ্রই প্যাক করা হবে।" },
      { title: "প্যাক করা হয়েছে", desc: "আপনার পণ্য প্যাক করা হয়েছে এবং কুরিয়ারের কাছে হস্তান্তরিত হয়েছে।" },
      { title: "প্রেরণে আছে", desc: "আপনার পণ্য গন্তব্য শহরের দিকে যাচ্ছে।" },
      { title: "ডেলিভারির জন্য রাস্তায়", desc: "কুরিয়ার আজ ডেলিভারি করার চেষ্টা করবে।" },
    ];
    setTrackingResult({ status: "ok", data: steps[step] });
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">শিপিং ও ডেলিভারি</h1>
        <p className="text-sm text-slate-600">সকল তথ্য এখানে রয়েছে — ডেলিভারি সময়, চার্জ, ট্র্যাকিং এবং নীতি।</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {Object.entries(shippingRates).map(([key, info]) => (
          <article key={key} className="p-4 rounded-lg border bg-white shadow-sm">
            <div className="flex items-start gap-3">
              <FiTruck className="text-2xl" />
              <div>
                <h3 className="font-medium">{info.label}</h3>
                <p className="text-sm text-slate-600">সময়কাল: {info.estimate}</p>
                <p className="text-sm mt-2">মূল্য শুরু: ৳{info.cost}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">শিপিং হিসাবকারী</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <label className="col-span-2">
              <span className="block text-sm text-slate-700 mb-1">ডেলিভারি এলাকা</span>
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="inside_city">শহরের ভিতরে</option>
                <option value="within_country">দেশের ভিতরে</option>
                <option value="international">আন্তর্জাতিক</option>
              </select>
            </label>

            <label>
              <span className="block text-sm text-slate-700 mb-1">অর্ডারের মোট (৳)</span>
              <input id="subtotal" type="number" defaultValue={0} className="w-full border rounded px-3 py-2" />
            </label>
          </div>

          <div className="mb-6">
            <p className="text-sm text-slate-700">
              আনুমানিক সময়: <span className="font-medium">{estimateForZone(selectedZone, 0).estimate}</span> — খরচ: <span className="font-semibold">৳{estimateForZone(selectedZone, 0).cost}</span>
            </p>
            <p className="text-xs text-slate-500 mt-2">* দেশের ভিতরে অর্ডার ৩০০০ টাকার বেশি হলে ফ্রি শিপিং।</p>
          </div>

          <hr className="my-4" />

          <h3 className="text-lg font-medium mb-3">আপনার অর্ডার ট্র্যাক করুন</h3>
          <div className="flex gap-2">
            <input
              aria-label="Tracking number"
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              placeholder="ট্র্যাকিং নম্বর লিখুন"
              className="flex-1 border rounded px-3 py-2"
            />
            <button onClick={handleTrack} className="px-4 py-2 rounded bg-sky-600 text-white">
              ট্র্যাক
            </button>
          </div>

          {trackingResult && (
            <div className={`mt-4 p-3 rounded ${trackingResult.status === 'error' ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
              {trackingResult.status === 'error' ? (
                <p className="text-sm text-red-700">{trackingResult.text}</p>
              ) : (
                <div className="flex items-start gap-3">
                  <AiOutlineClockCircle className="text-2xl mt-1" />
                  <div>
                    <p className="font-medium">{trackingResult.data.title}</p>
                    <p className="text-sm text-slate-700">{trackingResult.data.desc}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          <hr className="my-6" />

          <h3 className="text-lg font-medium mb-3">কুরিয়ার পার্টনার</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {courierPartners.map((c) => (
              <li key={c.name} className="flex items-center justify-between border rounded p-2">
                <div className="flex items-center gap-3">
                  <BsBoxSeam />
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-xs text-slate-500">বিশ্বস্ত ডেলিভারি পার্টনার</p>
                  </div>
                </div>
                <a href={c.website} className="text-sm underline">ভিজিট করুন</a>
              </li>
            ))}
          </ul>
        </div>

        <aside className="bg-white rounded-lg p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">দ্রুত নীতি</h3>
            <ul className="text-sm space-y-2 text-slate-700">
              <li className="flex items-start gap-2"><AiOutlineCheckCircle className="mt-1" /> অর্ডার ২৪-৪৮ ঘন্টার মধ্যে প্রসেস হয়।</li>
              <li className="flex items-start gap-2"><FiCreditCard className="mt-1" /> COD ও প্রিপেইড পাওয়া যায় (শর্ত প্রযোজ্য)।</li>
              <li className="flex items-start gap-2"><FiMapPin className="mt-1" /> দেশের অধিকাংশ শহরে ডেলিভারি।</li>
              <li className="flex items-start gap-2"><FiPhone className="mt-1" /> জরুরি ডেলিভারি সমস্যার জন্য ২৪/৭ সাপোর্ট।</li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-3">প্রায়শই জিজ্ঞাসিত প্রশ্ন (FAQ)</h4>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <details key={i} className="border rounded p-3">
                  <summary className="font-medium">{f.q}</summary>
                  <p className="text-sm text-slate-700 mt-2">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <footer className="mt-8 text-sm text-slate-600">
        <p className="mb-2">সাহায্যের প্রয়োজন? আমাদের ডেলিভারি টিমের সাথে যোগাযোগ করুন:</p>
        <div className="flex flex-wrap gap-4 items-center">
          <a className="flex items-center gap-2" href="tel:+8801731378743"><FiPhone /> 0173-1378743</a>
          <a className="flex items-center gap-2" href="mailto:mdshohagmia53200@gmail.com"><BsFillChatDotsFill /> সাপোর্ট</a>
        </div>
      </footer>
      <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          শিপিং ও ডেলিভারি
        </h1>

        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">১. ডেলিভারি সময়</h2>
          <p className="text-gray-600 mb-2">আমাদের লক্ষ্য আপনার অর্ডার দ্রুত এবং নিরাপদে পৌঁছে দেওয়া। সাধারণত:</p>
          <ul className="list-disc list-inside text-gray-600 mb-2">
            <li>সিটি এলাকায়: ১-৩ কার্যদিবসের মধ্যে।</li>
            <li>উপজেলা ও গ্রামীণ এলাকায়: ৩-৭ কার্যদিবসের মধ্যে।</li>
          </ul>
          <p className="text-gray-500 italic text-sm">বিশেষ ছুটি বা উৎসবের সময় ডেলিভারি কিছুটা বিলম্বিত হতে পারে।</p>
        </div>

        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">২. ডেলিভারি চার্জ</h2>
          <p className="text-gray-600 mb-2">আমরা স্বচ্ছ ও নির্দিষ্ট চার্জ নীতি অনুসরণ করি:</p>
          <ul className="list-disc list-inside text-gray-600 mb-2">
            <li>নগরী এলাকা: ফ্রি ডেলিভারি ৫০০ টাকা অর্ডারের উপরে।</li>
            <li>অন্য এলাকা: ৫০–১৫০ টাকা ভেরিয়েশন ডেলিভারি চার্জ।</li>
          </ul>
          <p className="text-gray-500 italic text-sm">চূড়ান্ত চার্জ অর্ডারের সময় কনফার্ম করা হবে।</p>
        </div>

        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">৩. ট্র্যাকিং সুবিধা</h2>
          <p className="text-gray-600 mb-2">আপনি আপনার অর্ডারের অবস্থান সবসময় ট্র্যাক করতে পারবেন:</p>
          <ul className="list-disc list-inside text-gray-600 mb-2">
            <li>অর্ডার প্লেস করার সাথে সাথে ট্র্যাকিং নম্বর প্রদান করা হয়।</li>
            <li>ট্র্যাকিং লিঙ্ক ব্যবহার করে রিয়েল-টাইমে ডেলিভারি স্ট্যাটাস জানতে পারবেন।</li>
          </ul>
        </div>

        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">৪. নীতি ও শর্তাবলী</h2>
          <ul className="list-disc list-inside text-gray-600 mb-2">
            <li>সরকারি ছুটির দিনেও আমরা ডেলিভারি করি। তবে বিশেষ ছুটি বা উৎসবে সময় কিছুটা বাড়তে পারে।</li>
            <li>অর্ডার প্রক্রিয়াকরণ শুরু হওয়ার পর ডেলিভারি পরিবর্তন বা বাতিল করা কঠিন।</li>
            <li>পণ্য ক্ষতিগ্রস্ত বা ভুল আসলে কাস্টমার কেয়ারের সাথে যোগাযোগ করুন।</li>
          </ul>
        </div>

        <div className="text-center mt-8 p-6 bg-blue-50 rounded-lg">
          <p className="text-blue-700 font-medium">
            সকল তথ্য এখানে রয়েছে — ডেলিভারি সময়, চার্জ, ট্র্যাকিং এবং নীতি।
          </p>
        </div>
      </div>
    </section>
    </div>
    
  );
}
