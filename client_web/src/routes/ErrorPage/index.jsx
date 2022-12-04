import React from "react";

const ErrorPage = () => {
  return (
    <div className="error-container">
      <img className="error-area-icon" src="/logo.svg" alt="AREA Logo" />
      <span className="error-area-text">404 error</span>
      <span className="error-area-text">This page doesn't exist</span>
    </div>
  );
};

export default ErrorPage;
