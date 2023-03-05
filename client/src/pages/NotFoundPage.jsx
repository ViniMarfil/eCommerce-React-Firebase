import React, { useEffect } from "react";

function NotFoundPage() {
  //Force scroll to top on render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center pb-12">
      <h1 className="text-[404px]">404</h1>
      <div className="text-lg">
        🎉Congratulations! You found the{" "}
        <span className="font-semibold">not found page</span> !🎉
      </div>
    </div>
  );
}

export default NotFoundPage;
