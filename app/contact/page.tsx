"use client";
import NavBar from "../../client/components/NavBar";
import Footer from "../../client/components/Footer";
import MainContactForm from "../../client/components/MainContactForm";
const Index = () => {
  return <div className="min-h-screen bg-gradient-to-br from-warm-white via-white to-cream">
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Floating Background Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 left-20 w-40 h-40 bg-gradient-to-br from-beige to-baby-pink rounded-full opacity-30 animate-float"></div>
          <div className="absolute top-20 right-32 w-32 h-32 bg-gradient-to-br from-baby-pink to-soft-pink rounded-full opacity-30 animate-float" style={{
          animationDelay: '1s'
        }}></div>
          <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-baby-pink rounded-2xl opacity-20 animate-float" style={{
          animationDelay: '2s'
        }}></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16 animate-fade-in">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-baby-pink/20 text-pink-700 rounded-full text-sm font-medium">Your Memories. Close to Your Heart.</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Get in Touch
              <br />
              <span className="text-orange-200">
                With Us
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-16 leading-relaxed">Have any questions? Our team will get back to you within 24 hours with any questions about our NFC-powered jewelry.</p>
          </div>
          
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Side - Contact Information */}
            <div className="animate-fade-in text-left">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Us</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-beige to-baby-pink rounded-xl flex items-center justify-center shadow-md">
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Email us at</p>
                        <p className="text-lg font-medium text-gray-900">info@sambandha.com</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-baby-pink to-soft-pink rounded-xl flex items-center justify-center shadow-md">
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Call us at</p>
                        <p className="text-lg font-medium text-gray-900">+977 9843742684</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">About Sambandha</h4>
                  <p className="text-gray-600 leading-relaxed">
                    NFC-powered jewelry that stores your precious memories. A simple tap on your phone unlocks 
                    a private digital space where you can store and relive your most cherished moments.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Side - Contact Form */}
            <div className="animate-fade-in" style={{
            animationDelay: '0.2s'
          }}>
              <MainContactForm />
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>;
};
export default Index;