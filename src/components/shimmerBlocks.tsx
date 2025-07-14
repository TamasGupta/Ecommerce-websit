import React from "react";
import classNames from "classnames";

interface ShimmerBlockProps {
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
}

const ShimmerBlock: React.FC<ShimmerBlockProps> = ({
  width = "w-full",
  height = "h-4",
  rounded = "rounded-md",
  className = "",
}) => {
  return (
    <div
      className={classNames(
        "animate-pulse bg-gray-200 dark:bg-gray-300",
        width,
        height,
        rounded,
        className
      )}
    />
  );
};

export default ShimmerBlock;
