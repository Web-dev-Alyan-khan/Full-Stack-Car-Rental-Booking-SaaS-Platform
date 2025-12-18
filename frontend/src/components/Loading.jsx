import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
