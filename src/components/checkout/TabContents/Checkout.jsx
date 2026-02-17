import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  CheckCircle,
  Tag,
  Edit,
  ChevronDown,
  SquarePen,
  ShoppingBagIcon,
  Van,
  ShieldCheck,
} from "lucide-react";

// ─── Helper: format price ─────────────────────────────────────────────────────
const formatPrice = (num) => `$${num.toFixed(2)}`;

// ─── Reusable Input with error (reduced height) ──────────────────────────────
const Input = ({
  label,
  error,
  required,
  className = "",
  icon: Icon,
  ...props
}) => (
  <div className="mb-4">
    {label && (
      <label className="block text-xs font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
    )}
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      )}
      <input
        className={`w-full border ${error ? "border-red-300 bg-red-50" : "border-gray-200"} 
          rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition 
          ${Icon ? "pl-10" : ""} ${className}`}
        {...props}
      />
    </div>
    {error && <p className="text-xs text-red-600 mt-1.5">{error}</p>}
  </div>
);

const Select = ({
  label,
  error,
  required,
  options,
  className = "",
  ...props
}) => (
  <div className="mb-4">
    {label && (
      <label className="block text-xs font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
    )}
    <div className="relative">
      <select
        className={`w-full border ${error ? "border-red-300 bg-red-50" : "border-gray-200"} 
          rounded-lg px-4 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${className}`}
        {...props}>
        <option value="">Select…</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
    {error && <p className="text-xs text-red-600 mt-1.5">{error}</p>}
  </div>
);

// ─── Section Header with 1/5 blue bottom border ────────────────────────────
const SectionHeader = ({ title }) => (
  <div className="relative border-b-2 border-gray-100 mb-6 pb-3">
    <h3 className="text-lg font-medium text-gray-700">{title}</h3>
    <div className="absolute bottom-0 left-0 w-1/5 h-0.5 bg-blue-600"></div>
  </div>
);

// ─── Phone Verification (step 1) ─────────────────────────────────────────────
const PhoneVerification = ({ onVerified, phoneNumber, setPhoneNumber }) => {
  const [step, setStep] = useState("input"); // 'input' | 'otp' | 'verified'
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  // Auto-focus first OTP input when entering OTP step
  useEffect(() => {
    if (step === "otp") {
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [step]);

  // Auto-verify when all 4 digits are entered
  useEffect(() => {
    if (step === "otp" && otp.every((d) => d !== "")) {
      handleVerifyOtp();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  const handleSendOtp = () => {
    const digitsOnly = phoneNumber.replace(/\D/g, "");
    const bdRegex = /^01[3-9]\d{8}$/;

    if (!bdRegex.test(digitsOnly)) {
      setError(
        "Please enter a valid Bangladeshi phone number (e.g., 01XXXXXXXXX)",
      );
      return;
    }

    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 800);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    if (error) setError("");
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Submit on Enter if all fields are filled
    if (e.key === "Enter" && otp.every((d) => d !== "")) {
      handleVerifyOtp();
    }
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join("");
    // Demo: accept "1234" – replace with real verification
    if (enteredOtp === "1234") {
      setStep("verified");
      onVerified(phoneNumber);
    } else {
      setError("Invalid OTP. Please try again.");
      setOtp(["", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  if (step === "verified") {
    return (
      <div className="bg-white border border-gray-100 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Phone Verified</h3>
              <p className="text-sm text-gray-500">{phoneNumber}</p>
            </div>
          </div>
          <button
            onClick={() => setStep("input")}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
            <Edit className="w-3 h-3" /> Change Number
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-lg p-6 mb-6">
      <SectionHeader title="Phone Verification" />

      {step === "input" && (
        <div>
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <Input
                label="Phone Number"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="01XXXXXXXXX"
                error={error}
                disabled={loading}
                className="h-10 sm:h-auto"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-xs font-medium text-gray-700 mb-1.5 invisible sm:block">
                &nbsp;
              </label>
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-50 text-sm h-10 sm:h-auto">
                {loading ? (
                  "…"
                ) : (
                  <span className="flex items-center lg:mx-6 justify-center gap-2">
                    <ShieldCheck className="hidden sm:block" />
                    Verify
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {step === "otp" && (
        <div className="flex flex-col items-center px-4 py-2">
          <p className="text-sm text-gray-600 mb-4 text-center">
            Enter the 4‑digit code sent to{" "}
            <span className="font-medium">{phoneNumber}</span>
          </p>

          <div className="flex gap-3 justify-center mb-4">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-bold border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:ring-0 outline-none transition bg-transparent"
              />
            ))}
          </div>

          {error && (
            <p className="text-sm text-red-600 mb-4 text-center">{error}</p>
          )}

          <div className="flex justify-center gap-4 w-full">
            <button
              onClick={() => setStep("input")}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-blue-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-blue-200">
              <SquarePen size={18} /> Change number
            </button>
            <button
              onClick={() => setOtp(["", "", "", ""])}
              className="px-5 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700 hover:underline transition">
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
// ─── Billing Details (step 2) – using react‑hook‑form with validation ────────
const BillingDetails = ({ register, errors }) => {
  const countries = [
    "United States",
    "Bangladesh",
    "United Kingdom",
    "India",
    "Australia",
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-lg p-6 mb-6">
      <SectionHeader title="Billing Details" />

      <div className="grid grid-cols-1 gap-4">
        <Input
          label="Full Name"
          required
          error={errors.firstName?.message}
          {...register("firstName", { required: "Full name is required" })}
        />
      </div>

      <Input
        label="Email Address"
        type="email"
        error={errors.email?.message}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email address",
          },
        })}
      />

      <Input
        label="Street Address"
        required
        error={errors.address?.message}
        {...register("address", { required: "Street address is required" })}
      />

      <Input
        label="Level / Apartment"
        required
        error={errors.level?.message}
        {...register("level", { required: "Level / Apartment is required" })}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="City"
          required
          error={errors.city?.message}
          {...register("city", { required: "City is required" })}
        />
        <Input
          label="State / Province"
          required
          error={errors.state?.message}
          {...register("state", { required: "State is required" })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="ZIP / Postal Code"
          required
          error={errors.zip?.message}
          {...register("zip", { required: "ZIP code is required" })}
        />
        <Select
          label="Country"
          required
          error={errors.country?.message}
          options={countries}
          {...register("country", { required: "Country is required" })}
        />
      </div>

      <Input
        label="Description Notes (optional)"
        placeholder="Delivery instructions, etc."
        {...register("notes")}
      />
    </div>
  );
};

// ─── Payment Methods  ────────────────────────────
const PaymentMethods = ({ selected, onChange }) => {
  const methods = [
    {
      id: "card",
      name: "Credit / Debit Card",
      desc: "Pay with Visa, Mastercard, Amex",
    },
    { id: "paypal", name: "PayPal", desc: "Pay with your PayPal account" },
    {
      id: "bank",
      name: "Bank Transfer",
      desc: "Direct transfer from your bank",
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      desc: "Pay when you receive the order",
    },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-lg p-6 mb-6">
      <SectionHeader title="Payment Method" />

      <div className="space-y-2">
        {methods.map((method) => (
          <label
            key={method.id}
            className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer transition ${
              selected === method.id ? "bg-gray-50" : "hover:bg-gray-50/50"
            }`}>
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={selected === method.id}
              onChange={(e) => onChange(e.target.value)}
              className="mt-1 w-4 h-4 text-blue-600 accent-blue-600"
            />
            <div>
              <div className="font-medium text-gray-600">{method.name}</div>
              <div className="text-xs text-gray-500 mt-0.5">{method.desc}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

// ─── Delivery Options  ───────────────────────────
const DeliveryOptions = ({ selected, onChange }) => {
  const options = [
    {
      id: "standard",
      name: "Standard Delivery",
      desc: "5–7 business days",
      price: 0,
    },
    {
      id: "express",
      name: "Express Delivery",
      desc: "2–3 business days",
      price: 9.99,
    },
    {
      id: "sameDay",
      name: "Same‑Day Delivery",
      desc: "Order before 12 PM",
      price: 19.99,
    },
    { id: "pickup", name: "Store Pickup", desc: "Ready in 2 hours", price: 0 },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-lg p-6 mb-6">
      <SectionHeader title="Delivery Method" />

      <div className="space-y-2">
        {options.map((opt) => (
          <label
            key={opt.id}
            className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition ${
              selected === opt.id ? "bg-gray-50" : "hover:bg-gray-50/50"
            }`}>
            <div className="flex items-start gap-4">
              <input
                type="radio"
                name="delivery"
                value={opt.id}
                checked={selected === opt.id}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 w-4 h-4 text-blue-600 accent-blue-600"
              />
              <div>
                <div className="font-medium text-gray-600">{opt.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{opt.desc}</div>
              </div>
            </div>
            <span
              className={`font-bold ${opt.price === 0 ? "text-green-600" : "text-gray-600"}`}>
              {opt.price === 0 ? "Free" : formatPrice(opt.price)}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

// ─── Order Summary  ────────────────────────
const OrderSummary = ({
  product,
  subtotal,
  shippingCost,
  total,
  termsAccepted,
  onTermsChange,
}) => (
  <div className="bg-white border border-gray-100 rounded-lg p-6 sticky top-4 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
        <ShoppingBagIcon className="w-5 h-5 text-white" />
      </div>
      <h2 className="text-xl font-medium text-gray-700">Order Summary</h2>
    </div>

    {/* Product line */}
    <div className="flex gap-3 mb-5 pb-5 border-b border-gray-100">
      <div className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center shrink-0 relative">
        <img
          src="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=64&h=64&fit=crop&q=80"
          alt={product.name}
          className="w-full h-full object-cover rounded"
        />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {product.quantity}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-600 leading-tight">
          {product.name}
        </div>
        <div className="text-xs text-gray-400 mt-1">{product.variant}</div>
      </div>
      <div className="text-sm font-bold text-blue-600 whitespace-nowrap">
        {formatPrice(product.price)}
      </div>
    </div>

    {/* Coupon */}
    <div className="mb-5">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Enter coupon code"
            className="w-full border border-gray-200 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
        </div>
        <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
          Apply
        </button>
      </div>
    </div>

    {/* Totals */}
    <div className="space-y-2 border-t border-gray-100 pt-3">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Shipping</span>
        <span>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
      </div>
      <div className="flex justify-between text-base font-bold text-gray-600 border-t border-gray-200 pt-3 mt-1">
        <span>Total</span>
        <span className="text-xl text-blue-600">{formatPrice(total)}</span>
      </div>
    </div>

    {/* Terms checkbox */}
    <div className="mt-4 flex items-center justify-center gap-2">
      <input
        type="checkbox"
        id="terms"
        checked={termsAccepted}
        onChange={(e) => onTermsChange(e.target.checked)}
        className="w-4 h-4 text-blue-600 accent-blue-600 rounded"
      />
      <label htmlFor="terms" className="text-xs text-gray-500">
        I agree to the{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Terms & Conditions
        </a>
      </label>
    </div>

    {/* Place Order Button */}
    <button
      type="submit"
      className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition flex items-center justify-center gap-2">
      <Van className="w-5 h-5" /> Place Order
    </button>
  </div>
);

// ─── Main Checkout Component ─────────────────────────────────────────────────
const Checkout = () => {
  // Product data
  const [product] = useState({
    name: "MSI Gaming Core i7 8Th Gen 15.6-inch Gaming Fhd Thin an...",
    variant: "Storage: 512GB",
    price: 760.0,
    quantity: 1,
  });

  // Form state (react‑hook‑form)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      email: "",
      address: "",
      level: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      notes: "",
    },
  });

  // Other state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handlePhoneVerified = (number) => {
    setPhoneVerified(true);
  };

  const onSubmit = (data) => {
    if (!phoneVerified) {
      alert("Please verify your phone number first.");
      return;
    }

    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (!termsAccepted) {
      alert("You must agree to the Terms & Conditions.");
      return;
    }

    const orderData = {
      phone: phoneNumber,
      billing: data,
      payment: paymentMethod,
      delivery: deliveryMethod,
      product,
    };
    console.log("Order submitted:", orderData);
    alert("Order placed! (check console)");
  };

  const getShippingCost = () => {
    switch (deliveryMethod) {
      case "express":
        return 9.99;
      case "sameDay":
        return 19.99;
      default:
        return 0;
    }
  };
  const shippingCost = getShippingCost();
  const subtotal = product.price * product.quantity;
  const total = subtotal + shippingCost;

  return (
    <div className="bg-white text-gray-500 text-sm min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-7xl mx-auto px-4 py-8 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column – forms */}
          <div className="flex-1 min-w-0">
            {!phoneVerified && ( // Hide phone verification after successful verification
              <PhoneVerification
                onVerified={handlePhoneVerified}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
              />
            )}
            <BillingDetails register={register} errors={errors} />
            <PaymentMethods
              selected={paymentMethod}
              onChange={setPaymentMethod}
            />
            <DeliveryOptions
              selected={deliveryMethod}
              onChange={setDeliveryMethod}
            />
          </div>

          {/* Right column – order summary */}
          <aside className="w-full lg:w-96 shrink-0">
            <OrderSummary
              product={product}
              subtotal={subtotal}
              shippingCost={shippingCost}
              total={total}
              termsAccepted={termsAccepted}
              onTermsChange={setTermsAccepted}
            />
          </aside>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
