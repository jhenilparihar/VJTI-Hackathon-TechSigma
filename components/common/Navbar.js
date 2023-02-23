import { useState, useEffect } from "react";

function Navbar(props) {
  const [isScroll, setIsScroll] = useState(false);

  const SCROLL_THRESHOLD = 256;

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > SCROLL_THRESHOLD && !isScroll) {
        setIsScroll(true);
      } else if (window.scrollY < SCROLL_THRESHOLD && isScroll) {
        setIsScroll(false);
      }
    });
  }, [isScroll]);

  return (
    <div
      className={`w-full fixed left-0 top-0 z-50 flex font-title text-white px-16 py-6 space-x-14 bg-black bg-opacity-0 transition-all duration-250 ${
        isScroll && "bg-opacity-80"
      }`}
    >
      <h2 className="text-xl font-bold text-tertiaryred-400">CRYTPONAUT</h2>
      <div className="flex space-x-6">
        <div>Home</div>
        <div>Trending</div>
        <div>Recently Added</div>
      </div>
    </div>
  );
}

export default Navbar;
