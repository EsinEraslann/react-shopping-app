import React from "react";
import { FaTrash } from "react-icons/fa";

const IconButton = (props) => {
  const { handleClick } = props;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleClick(); 
      }}
    >
      <FaTrash />
    </button>
  );
};

export default IconButton;