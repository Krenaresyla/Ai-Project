// import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white shadow-md mt-8 py-4">
      <div className="container mx-auto text-center text-gray-600">
        &copy; {new Date().getFullYear()} GenAI Tutor. All rights reserved.
      </div>
    </footer>
  );
}