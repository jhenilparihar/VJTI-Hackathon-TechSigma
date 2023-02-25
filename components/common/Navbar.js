import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import BlockChainContext from "@/store/blockchain-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";

function Navbar(props) {
  const ctx = useContext(BlockChainContext);

  const [isScroll, setIsScroll] = useState(false);
  const [currentTab, setCurrentTab] = useState("explore");
  const [showButton, setShowButton] = useState(true);
  const [showWallet, setShowWallet] = useState(false);

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

  useEffect(() => {
    setShowButton(
      typeof window != "undefined" && !localStorage.getItem("isReload")
    );
    console.log(localStorage.getItem("isReload"));
  }, []);

  return (
    <div
      className={`w-full fixed left-0 top-0 z-50 flex font-title text-white px-16 space-x-14 bg-black bg-opacity-0 transition-all duration-250 ${
        isScroll && "bg-opacity-80"
      }`}
    >
      <h2 className="text-xl font-bold py-6 text-tertiaryred-400">
        CRYTPONAUT
      </h2>
      <div className="flex justify-between items-center w-full">
        <div className="flex space-x-6 font-display">
          <div
            onClick={() => {
              tabClickHandler("explore");
            }}
            className={`cursor-pointer py-6 px-2 ${
              currentTab === "explore" && "text-tertiaryred-50 font-medium"
            }`}
          >
            Explore
          </div>
          {ctx?.accountAddress && (
            <div
              onClick={() => {
                tabClickHandler("create");
              }}
              className={`cursor-pointer py-6 px-2 ${
                currentTab === "create" && " text-tertiaryred-50"
              }`}
            >
              Create
            </div>
          )}
          <div
            onClick={() => {
              tabClickHandler("feed");
            }}
            className={`cursor-pointer py-6 px-2 ${
              currentTab === "feed" && " text-tertiaryred-50"
            }`}
          >
            Feed
          </div>
          {ctx?.accountAddress && (
            <div
              onClick={() => {
                tabClickHandler(`profile/${ctx.accountAddress}`);
              }}
              className={`cursor-pointer py-6 px-2 ${
                currentTab === "new" && " text-tertiaryred-50"
              }`}
            >
              Profile
            </div>
          )}
        </div>
        {showButton && !ctx?.accountAddress && (
          <button
            type="button"
            onClick={() => {
              setShowButton(false);
              localStorage.setItem("isReload", true);
              ctx?.connectToMetamask();
            }}
            className="rounded-md px-4 py-2 my-5 bg-tertiaryred-50 hover:bg-tertiaryred-500"
          >
            Connect To Metamask
          </button>
        )}
        {ctx?.accountAddress && (
          <div className="relative">
            <button
              className="text-tertiaryred-50 text-xl hover:rounded-full px-4 py-3 hover:bg-tertiarygrey-500"
              type="button"
              onClick={() => {
                setShowWallet(true);
              }}
            >
              <FontAwesomeIcon icon={faWallet} />
            </button>
            {showWallet && (
              <div className="absolute bg-tertiarygrey-670 rounded-lg">
                <div>{ctx?.accountAddress}</div>
                <div className="text-lg font-medium">{ctx?.accountBalance}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
