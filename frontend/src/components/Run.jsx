import React from "react";

const Run = () => {
    const handleRun=() => {
        
    }
  return (
    <div>
      <button className="border hover:bg-green-400 hover:text-black hover:cursor-pointer text-white font-bold px-6 py-1 rounded-xl mx-3 mb-3 bg-green-600" onClick={handleRun}>
        Run
      </button>
    </div>
  );
};

export default Run;
