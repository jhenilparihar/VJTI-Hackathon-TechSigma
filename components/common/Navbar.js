import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function Navbar(props) {
  const [isScroll, setIsScroll] = useState(false);
  const [currentTab, setCurrentTab] = useState("explore");

  const router = useRouter();

  const SCROLL_THRESHOLD = 150;

  const tabClickHandler = (tab) => {
    router.push(`/${tab}`);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > SCROLL_THRESHOLD && !isScroll) {
        setIsScroll(true);
      } else if (window.scrollY < SCROLL_THRESHOLD && isScroll) {
        setIsScroll(false);
      }
    });
  }, [isScroll]);

  useEffect(() => {
    const path = router?.pathname?.slice(1);
    setCurrentTab(path);
  }, [router?.pathname]);

  return (
    <div
      className={`w-full fixed left-0 top-0 z-50 flex font-title text-white px-16 space-x-14 bg-black bg-opacity-0 transition-all duration-250 ${
        isScroll && "bg-opacity-80"
      }`}
    >
      <h2 className="text-xl font-bold py-6 text-tertiaryred-400">CRYTPONAUT</h2>
      <div className="flex space-x-6 font-display">
        <div
          onClick={() => {
            tabClickHandler("explore");
          }}
          className={`cursor-pointer py-6 px-2 ${
            currentTab === "explore" &&
            "text-tertiaryred-50 font-medium"
          }`}
        >
          Explore
        </div>
        <div
          onClick={() => {
            tabClickHandler("create");
          }}
          className={`cursor-pointer py-6 px-2 ${
            currentTab === "create" &&
            " text-tertiaryred-50"
          }`}
        >
          Create
        </div>
        <div
          // onClick={() => {
          //   tabClickHandler("create");
          // }}
          className={`cursor-pointer py-6 px-2 ${
            currentTab === "new" &&
            " text-tertiaryred-50"
          }`}
        >
          Recently Added
        </div>
        <div
           onClick={() => {
            tabClickHandler("profile");
          }}
          className={`cursor-pointer py-6 px-2 ${
            currentTab === "new" &&
            " text-tertiaryred-50"
          }`}
        >
          Profile
        </div>
      </div>
    </div>
  );
}

export default Navbar;
