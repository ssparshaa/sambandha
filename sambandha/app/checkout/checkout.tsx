"use client";
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { countryCodes } from "config/countryCode";
import api from "config/api";
import NavBar from "client/components/NavBar";

const Checkout: NextPage = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("sambandha-cart");

    if (data) {
      const parsed = JSON.parse(data);
      setData(parsed);
    } else {
      router.push("/");
    }
  }, []);

  // State for custom dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+977");

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Handle option selection
  const handleCountryCodeSelect = (code) => {
    setSelectedCountryCode(code);
    setIsDropdownOpen(false);
  };

  const handleCheckout = async () => {
    if (!userName || !phoneNumber || !address) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const payload = {
      userName,
      userPhone: phoneNumber,
      userAddress: address,
      products: data?.items,
    };

    try {
      const response = await api.post("/order", payload);
      localStorage.removeItem("sambandha-cart");
      if (response.data.success) {
        const orderSummary = data?.items
          .map(
            (item, index) =>
              `*Item ${index + 1}:* ${item.name}\n*Quantity:* ${
                item.quantity
              }\n*Price:* Rs ${item.quantity * item.price}\n\n`,
          )
          .join("");

        let message =
          `*Order Summary*\n\n${orderSummary}` +
          `*Total Price:* Rs ${data?.totalPrice}\n\n` +
          `*Customer Details*\n` +
          `*Name:* ${userName}\n` +
          `*Phone:* ${phoneNumber}\n`;
        if (address) {
          message += `*Address:* ${address}\n`;
        }

        const whatsappUrl = `https://wa.me/9843742684?text=${encodeURIComponent(
          message,
        )}`;
        window.location.href = whatsappUrl;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error creating order; ", error);
      toast.error("Failed to make order. please try again");
    }
  };

  return (
    <>
      <NavBar />
      <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center py-[60px] px-8 box-border text-left text-mini1 text-black font-poppins">
        <div className="max-w-lg w-full flex flex-col items-center gap-4">
          <div className="w-full text-xl font-bold text-gray-700">Checkout</div>

          {/* Customer Section */}
          <div className="w-full border border-gray-300 p-4 rounded-md text-sm">
            <div className="font-semibold mb-2">Customer*</div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-3">
                <label className="block mb-1">Name</label>
                <input
                  className="w-full border border-gray-300 bg-white text-black p-2 rounded-md"
                  type="text"
                  placeholder="Your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block mb-1">WhatsApp Number</label>
                <div className="flex gap-2">
                  <div className="self-stretch flex flex-row items-start justify-start gap-2.5">
                    <select
                      className="bg-white text-black text-base1 w-24 max-w-md border border-gray-300 p-2 rounded-md sm:text-base"
                      value={selectedCountryCode}
                      onChange={(e) => setSelectedCountryCode(e.target.value)}
                    >
                      {countryCodes.map(({ name, code, dial_code }) => (
                        <option key={code} value={dial_code}>
                          {name} ({dial_code})
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    className="w-full max-w-md border border-gray-300 bg-white text-black p-2 rounded-md text-sm sm:text-base"
                    type="number"
                    min={10}
                    max={10}
                    pattern="[0-9]*"
                    placeholder="Enter your WhatsApp number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Items Section */}
          <div className="w-full border border-gray-300 p-4 rounded-md text-sm">
            <div className="font-semibold mb-2">Items</div>
            {data?.items?.length > 0 ? (
              data?.items?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 border-b border-gray-300 py-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div>Quantity: {item.quantity}</div>
                    <div>Per price: {item.price}</div>
                    <div>Total Price: Rs {item.price * item.quantity}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center">
                No items in your cart.
              </div>
            )}
          </div>

          {/* Delivery Address */}
          <div className="w-full border border-gray-300 p-4 rounded-md text-sm">
            <div className="font-semibold mb-2">Delivery</div>

            <div className="self-stretch rounded-6xs flex flex-col items-center justify-end py-[15px] px-2.5 gap-[13px] z-[1]">
              <div className="self-stretch flex flex-col items-start justify-start gap-[9px] sm1:self-stretch sm1:w-auto">
                <div className="self-stretch relative tracking-[0.01em] font-semibold lg:self-stretch lg:w-auto sm1:self-stretch sm1:w-auto">
                  Enter Address
                </div>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Type your address here"
                  className="border-gray-300  p-2 border-[1px] border-solid bg-[transparent] [outline:none] self-stretch rounded-6xs box-border h-[40px]"
                />
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="w-full border border-gray-300 p-4 rounded-md text-sm">
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <div className="w-full text-left font-semibold tracking-wide">
                Order Summary
              </div>
              {data?.items.length > 0 ? (
                data?.items.map((item, index) => (
                  <div
                    key={index}
                    className="w-full border-gray-600 border-b border-dashed flex flex-row items-start justify-between py-2"
                  >
                    <div className="text-left flex-1">
                      {item.name} ({item.quantity})
                    </div>
                    <div className="text-right flex-1">
                      Rs {item.price * item.quantity}
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full text-center">No Products here</div>
              )}
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="cursor-pointer border-[#000] border-solid border-[1px] py-[10px] px-[3px] bg-[transparent] self-stretch rounded-[7px] box-border h-auto flex flex-row items-center justify-center max-w-full [object-fit:contains] lg:rounded-[15px] lg:pl-[0px] lg:pr-[0px] lg:box-border sm:h-auto"
          >
            <b className="flex-1 relative text-[13px] tracking-[0.01em] font-[Jost] text-[#000] text-center lg:flex-1 sm:text-[13px] sm:self-stretch sm:h-auto mq350small:flex-1">
              Place Order
            </b>
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
