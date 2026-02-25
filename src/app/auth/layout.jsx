import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center p-4">
      {children}
    </div>
  );
};

export default AuthLayout;
