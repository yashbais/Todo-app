import React from "react";

const CustomButton = ({ label, onClick, type, disabled }) => {
  const buttonStyle =
    type === "delete"
      ? "bg-red-500 hover:bg-red-600"
      : "bg-blue-500 hover:bg-blue-600";

  const disabledStyle = "bg-gray-300 text-gray-500 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      className={`${buttonStyle} ${
        disabled ? disabledStyle : ""
      } text-white px-4 py-2 rounded-lg transition duration-300`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default CustomButton;
