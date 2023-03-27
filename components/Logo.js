import React from "react";
// Next Components
import Link from "next/link";

const Logo = ({ size = "3xl" }) => {
  return (
    <Link href="/">
      <div className={`pointer-events-none icon-font font-bold text-${size}`}>
        <span className="text-red-400">#</span>
        <span className="text-blue-400">GameJunction</span>
      </div>
    </Link>
  );
};

export default Logo;
