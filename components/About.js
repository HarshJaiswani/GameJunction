import React from "react";

const About = () => {
  return (
    <div className="w-full min-h-[50vh] my-24 flex items-center">
      <div className="w-1/2 flex items-center justify-center">
        <div className="border rounded-2xl shadow-xl bg-gray-200 w-[80%] h-[40vh]"></div>
      </div>
      <div className="p-4 w-1/2 pr-12">
        <h2 className="text-3xl font-semibold font-sans my-4 text-gray-600">
          Our Story
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
          reprehenderit alias perferendis accusantium officiis doloribus,
          reiciendis nesciunt possimus. Suscipit enim quaerat unde, ut
          distinctio at. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Perspiciatis fuga ipsa provident optio dignissimos veniam
          exercitationem consequuntur suscipit soluta, debitis quasi. Minima
          corporis nesciunt pariatur.
        </p>
      </div>
    </div>
  );
};

export default About;
