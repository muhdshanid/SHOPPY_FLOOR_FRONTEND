import React from "react";

const Spinner = () => {
  return (
    <div className={`inline-block w-[60px] h-[60px] rounded-full border-[5px] border-t-black/20
    animate-spin border-r-black/20`}></div>
  );
};

export default Spinner;