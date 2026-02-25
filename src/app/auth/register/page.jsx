"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const UserRegistrationPage = ({ onNavigateToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const passwordValue = watch("password");

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1600));
      console.log("Register payload:", { ...data, password: "***" });
      setSuccess(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            You&apos;re all set!
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Your account has been created. Check your inbox for a confirmation
            email.
          </p>
          <button
            type="button"
            onClick={onNavigateToLogin}
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center p-4 font-sans">
      <div
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row"
        style={{ minHeight: 580 }}>
        {/* ── Left Panel ── */}
        <div
          className="lg:w-5/12 relative flex flex-col justify-between p-10 overflow-hidden"
          style={{ background: "#1d4ed8" }}>
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5" />
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-white/10 -translate-x-1/3 translate-y-1/3" />

          {/* Illustration */}
          <div className="relative z-10 flex-1 flex items-center justify-center">
            <svg
              viewBox="0 0 320 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-xs drop-shadow-xl">
              {/* Clipboard */}
              <rect
                x="70"
                y="30"
                width="180"
                height="210"
                rx="12"
                fill="#fff"
                fillOpacity=".15"
              />
              <rect
                x="82"
                y="50"
                width="156"
                height="178"
                rx="8"
                fill="#fff"
                fillOpacity=".1"
              />
              {/* Clip at top */}
              <rect
                x="130"
                y="22"
                width="60"
                height="22"
                rx="8"
                fill="#fff"
                fillOpacity=".3"
              />
              {/* Form rows */}
              {[70, 95, 120, 145, 170].map((y, i) => (
                <g key={i}>
                  <rect
                    x="94"
                    y={y + 4}
                    width="40"
                    height="5"
                    rx="2.5"
                    fill="#93c5fd"
                    fillOpacity=".8"
                  />
                  <rect
                    x="94"
                    y={y + 14}
                    width={100 + (i % 3) * 20}
                    height="8"
                    rx="4"
                    fill="#fff"
                    fillOpacity=".25"
                  />
                </g>
              ))}
              {/* CTA button */}
              <rect
                x="94"
                y="208"
                width="132"
                height="14"
                rx="7"
                fill="#2563eb"
              />
              <rect
                x="124"
                y="211"
                width="72"
                height="8"
                rx="4"
                fill="#fff"
                fillOpacity=".7"
              />
              {/* Star badges */}
              {[
                [260, 60],
                [56, 140],
                [270, 180],
              ].map(([cx, cy], i) => (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={i === 0 ? 14 : 10}
                  fill="#1e40af"
                />
              ))}
              <path
                d="M260 53l1.5 4.5H266l-3.5 2.5 1.5 4.5L260 62l-4 2.5 1.5-4.5L254 57.5h4.5z"
                fill="#fbbf24"
              />
              <path
                d="M56 134l1 3h3l-2.5 1.8 1 3L56 140l-2.5 1.8 1-3L52 137h3z"
                fill="#fbbf24"
              />
              <path
                d="M270 174l1 3h3l-2.5 1.8 1 3L270 180l-2.5 1.8 1-3L266 177h3z"
                fill="#fbbf24"
              />
            </svg>
          </div>

          {/* Text */}
          <div className="relative z-10 text-white">
            <h1 className="text-3xl font-extrabold leading-tight mb-2 tracking-tight">
              Create your
              <br />
              free account
            </h1>
            <p className="text-blue-200 text-sm leading-relaxed">
              Join thousands of users. Set up in seconds — no credit card
              required.
            </p>
            <div className="mt-5 flex gap-4">
              {["Free forever", "Secure", "No spam"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-white/15 text-blue-100">
                  ✓ {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="lg:w-7/12 flex items-center justify-center p-8 lg:p-12 overflow-y-auto">
          <div className="w-full max-w-sm">
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-1">
              Get started
            </p>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Create account
            </h2>
            <p className="text-sm text-gray-500 mb-8">
              Already have one?{" "}
              <button
                type="button"
                onClick={onNavigateToLogin}
                className="text-blue-600 font-medium hover:underline focus:outline-none">
                Sign in
              </button>
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
              noValidate>
              {/* Name row */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    id: "firstName",
                    label: "First name",
                    placeholder: "Jane",
                    rules: { required: "Required" },
                  },
                  {
                    id: "lastName",
                    label: "Last name",
                    placeholder: "Doe",
                    rules: { required: "Required" },
                  },
                ].map(({ id, label, placeholder, rules }) => (
                  <div key={id}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {label}
                    </label>
                    <input
                      type="text"
                      placeholder={placeholder}
                      autoComplete={
                        id === "firstName" ? "given-name" : "family-name"
                      }
                      {...register(id, rules)}
                      className={`w-full h-10 px-3 rounded-xl border text-sm bg-gray-50 focus:bg-white focus:outline-none transition-colors ${
                        errors[id]
                          ? "border-red-400"
                          : "border-gray-200 focus:border-blue-600"
                      }`}
                    />
                    {errors[id] && (
                      <p className="mt-0.5 text-xs text-red-500">
                        {errors[id].message}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                    className={`w-full h-11 pl-10 pr-4 rounded-xl border text-sm bg-gray-50 focus:bg-white focus:outline-none transition-colors ${
                      errors.email
                        ? "border-red-400"
                        : "border-gray-200 focus:border-blue-600"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    autoComplete="new-password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 8, message: "Minimum 8 characters" },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                        message: "Must include uppercase, lowercase & number",
                      },
                    })}
                    className={`w-full h-11 pl-10 pr-10 rounded-xl border text-sm bg-gray-50 focus:bg-white focus:outline-none transition-colors ${
                      errors.password
                        ? "border-red-400"
                        : "border-gray-200 focus:border-blue-600"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none">
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}

                {/* Strength bar */}
                {passwordValue && (
                  <div className="mt-2 flex gap-1">
                    {[8, 12, 16].map((threshold, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          passwordValue.length >= threshold
                            ? i === 0
                              ? "bg-red-400"
                              : i === 1
                                ? "bg-yellow-400"
                                : "bg-green-400"
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">
                      {passwordValue.length < 8
                        ? "Too short"
                        : passwordValue.length < 12
                          ? "Weak"
                          : passwordValue.length < 16
                            ? "Fair"
                            : "Strong"}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Confirm password
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </span>
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-enter password"
                    autoComplete="new-password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (v) =>
                        v === passwordValue || "Passwords do not match",
                    })}
                    className={`w-full h-11 pl-10 pr-10 rounded-xl border text-sm bg-gray-50 focus:bg-white focus:outline-none transition-colors ${
                      errors.confirmPassword
                        ? "border-red-400"
                        : "border-gray-200 focus:border-blue-600"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((p) => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none">
                    {showConfirm ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2">
                <input
                  id="terms"
                  type="checkbox"
                  {...register("terms", {
                    required: "You must agree to the terms",
                  })}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600 select-none">
                  I agree to the{" "}
                  <button
                    type="button"
                    className="text-blue-600 hover:underline focus:outline-none">
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="text-blue-600 hover:underline focus:outline-none">
                    Privacy Policy
                  </button>
                </label>
              </div>
              {errors.terms && (
                <p className="-mt-2 text-xs text-red-500">
                  {errors.terms.message}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors">
                {isLoading ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Creating account…
                  </>
                ) : (
                  <>
                    Create account
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationPage;
