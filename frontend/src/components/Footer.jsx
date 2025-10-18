import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-primary text-white py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex justify-center">
        <p className="text-sm md:text-base text-center">
          © {new Date().getFullYear()} Book Management System. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
