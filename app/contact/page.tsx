"use client";
import NavBar from "../../client/components/NavBar";
import Footer from "../../client/components/Footer";
import MainContactForm from "../../client/components/MainContactForm";
import { useState } from "react";

const faqs = [
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, you can try us for free for 30 days. We'll also provide a free 30-minute onboarding call to get you started.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Absolutely! You can upgrade, downgrade, or cancel your plan anytime.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "You can cancel your subscription anytime. Your plan will remain active until the end of your billing cycle.",
  },
];

const Index = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <NavBar />

      {/* Hero */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Contact our friendly team
        </h1>
        <p className="text-lg text-gray-600">Let us know how we can help.</p>
      </div>

      {/* Contact Options */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {/* Sales */}
        <div className="p-6 rounded-2xl bg-white border shadow hover:shadow-md transition">
          <p className="font-semibold text-gray-900 mb-2">Chat to sales</p>
          <p className="text-sm text-gray-600 mb-4">
            Speak to our friendly team.
          </p>
          <a
            href="mailto:info@sambandha.com"
            className="text-gray-800 font-medium hover:underline"
          >
            info@sambandha.com
          </a>
        </div>

        {/* Support */}
        <div className="p-6 rounded-2xl bg-white border shadow hover:shadow-md transition">
          <p className="font-semibold text-gray-900 mb-2">Chat to support</p>
          <p className="text-sm text-gray-600 mb-4">We’re here to help.</p>
          <a
            href="mailto:support@sambandha.com"
            className="text-gray-800 font-medium hover:underline"
          >
            support@sambandha.com
          </a>
        </div>

        {/* Visit */}
        <div className="p-6 rounded-2xl bg-white border shadow hover:shadow-md transition">
          <p className="font-semibold text-gray-900 mb-2">Visit us</p>
          <p className="text-sm text-gray-600 mb-4">
            Come say hello at our office HQ.
          </p>
          <a
            href="https://goo.gl/maps"
            className="text-gray-800 font-medium hover:underline"
          >
            View on Google Maps
          </a>
        </div>

        {/* Call */}
        <div className="p-6 rounded-2xl bg-white border shadow hover:shadow-md transition">
          <p className="font-semibold text-gray-900 mb-2">Call us</p>
          <p className="text-sm text-gray-600 mb-4">Mon–Fri from 8am to 5pm.</p>
          <a
            href="tel:+9779843742684"
            className="text-gray-800 font-medium hover:underline"
          >
            +977 9843742684
          </a>
        </div>
      </div>

      {/* FAQ + Contact Form Side by Side */}
      <div className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* FAQ Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border rounded-xl p-4 bg-white shadow-sm cursor-pointer hover:shadow-md transition"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-900">{faq.question}</p>
                  <span className="text-xl text-gray-500">
                    {openIndex === i ? "−" : "+"}
                  </span>
                </div>
                {openIndex === i && (
                  <p className="mt-3 text-gray-600 text-sm">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Send us a message
          </h2>
          <MainContactForm />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
