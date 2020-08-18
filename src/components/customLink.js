import React from "react";
import { Link } from "./materialUiComponents";

const CustomLink = ({ children, onClick }) => {
  return (
    <Link
      style={{ display: "block" }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      href="#"
    >
      {children}
    </Link>
  );
};

export default CustomLink;
