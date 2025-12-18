import React from 'react';

const Title = ({ title, subTitle, align = "center" }) => {
  return (
    <div
      className={`flex flex-col gap-2 
      ${align === "left" ? "items-start text-left" : "items-center text-center"}`}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
        {title}
      </h1>

      {subTitle && (
        <p className="text-gray-600 text-base md:text-lg max-w-xl">
          {subTitle}
        </p>
      )}
    </div>
  );
};

export default Title;
