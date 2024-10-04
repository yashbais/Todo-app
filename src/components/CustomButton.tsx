import React from "react";

interface CustomButtonProps {
  label: string;
  onClick: () => void;
  type: "delete" | "add" | "clear" | "default";
  disabled?: boolean; 
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  type,
  disabled = false, 
}) => {
  const buttonStyle =
    type === "delete"
      ? "bg-red-500 hover:bg-red-600"
      : "bg-blue-500 hover:bg-blue-600";

  const disabledStyle = "bg-gray-300 text-gray-500 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      className={`${buttonStyle} ${disabled ? disabledStyle : ""} text-white px-4 py-2 rounded-lg transition duration-300`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default CustomButton;
