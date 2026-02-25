"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";

const UserLoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError("");
    try {
      await new Promise((res) => setTimeout(res, 1500));
      console.log("Login payload:", data);
      router.push("/en/account");
    } catch {
      setServerError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const onNavigateToRegister = () => {
    router.push("/auth/register");
  };

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl border-2 border-gray-100 shadow-sm overflow-hidden flex flex-col lg:flex-row">
        {/* Left Panel – Branding & Welcome */}
        <div
          className="lg:w-1/2 relative flex flex-col justify-between p-12 lg:p-16 overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #1e3a8a 0%, #1d4ed8 100%)",
          }}>
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/5" />
          <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-white/10 translate-x-1/4 translate-y-1/4" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 text-white">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Welcome to
              <br />
              <span className="text-blue-200">Ragory Store</span>
            </h1>
            <p className="text-xl font-light text-blue-100 mb-6">
              Sign in to your account
            </p>
            <div className="w-20 h-1 bg-blue-300 rounded-full mb-8" />
            <p className="text-blue-200 text-base leading-relaxed max-w-md">
              Access your personalised dashboard, track your activity, and
              manage everything in one place.
            </p>
          </div>

          <div className="relative z-10 mt-auto pt-12 text-sm text-blue-300 font-light">
            © 2025 Ragory. All rights reserved.
          </div>
        </div>

        {/* Right Panel – Login Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-white">
          <div className="w-full max-w-sm">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back
              </h2>
              <p className="text-gray-500 text-sm">
                Please enter your details to sign in.
              </p>
            </div>

            {serverError && (
              <div className="mb-6 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                {serverError}
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                    <Mail size={18} />
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
                    className={`w-full h-12 pl-11 pr-4 rounded-lg border text-sm bg-gray-50 focus:bg-white focus:outline-none transition-all ${
                      errors.email
                        ? "border-red-400 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    }`}
                  />
                </div>
                {/* Fixed-height container for error message */}
                <div className="min-h-6 mt-1">
                  {errors.email && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-red-500" />
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors focus:outline-none">
                    Forgot password?
                  </button>
                </div>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                    <Lock size={18} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Minimum 6 characters" },
                    })}
                    className={`w-full h-12 pl-11 pr-12 rounded-lg border text-sm bg-gray-50 focus:bg-white focus:outline-none transition-all ${
                      errors.password
                        ? "border-red-400 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none">
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
                {/* Fixed-height container for error message */}
                <div className="min-h-6 mt-1">
                  {errors.password && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-red-500" />
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:hover:bg-blue-600 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98]">
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Registration link */}
            <p className="text-sm text-gray-500 mt-8 text-center">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={onNavigateToRegister}
                className="text-blue-600 font-semibold hover:text-blue-800 hover:underline transition-colors focus:outline-none">
                Create one
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;
