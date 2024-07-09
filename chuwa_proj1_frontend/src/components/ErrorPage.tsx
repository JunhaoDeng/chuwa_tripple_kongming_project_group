import React from "react";
import "../styles/ErrorPage.css";
import { Button, Result } from "antd";
// import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    // navigate to home page
    navigate("/products");
  };
  return (
    <div className="error-page-container">
      <div className="error-card">
        <Result
          title="Oops, something went wrong!"
          extra={
            <Button type="primary" key="console" onClick={handleClick}>
              Go Home
            </Button>
          }
        />
      </div>
    </div>
  );
}
