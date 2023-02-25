import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useContext } from "react";
import BlockChainContext from "@/store/blockchain-context";

function Carousel(props) {
  const [itemSet, setItemSet] = useState(0);

  const carouselRef = useRef();

  const blockChainCtx = useContext(BlockChainContext);

  let translateWidth = itemSet * (carouselRef.current?.clientWidth - 225);

  const getPrevitemsHandler = () => {
    setItemSet((prevState) => {
      if (prevState > 0) {
        return prevState - 1;
      }
      return 0;
    });
  };

  const getNextitemsHandler = () => {
    setItemSet((prevState) => {
      if (prevState < Math.ceil(props?.items?.length / 6) - 1) {
        return prevState + 1;
      }
      return prevState;
    });
  };

  const recs = props?.items.map((item, index) => {
    let userImage = "";
    if (item?.tokenId) {
      userImage = blockChainCtx?.allUserProfile[item?.currentOwner]?.imageHash;
    }
    return (
      <div
        key={index}
        onClick={()=>props?.onCardClick(item?.tokenURI,item?.tokenName)}
        className="rounded-lg h-[400px] w-[270px] flex-shrink-0 transform transition duration-500 hover:scale-110 cursor-pointer"
      >
        <img
          src={item?.tokenImage || item}
          className="h-[90%] w-full object-cover rounded-lg"
        />
        <div className="text-xl font-bold font-Heading  border-b-2 pb-3 border-tertiarygrey-150 flex justify-between items-center px-4">
          <p className="py-2">{item?.tokenName}</p>
          <img
            src={userImage||"https://i.seadn.io/gae/TDT7gFhSaCkqH4HboVGNm2HYhlO9ma4QYs5N4ESqouce4QddEz-Uy07gmxZKIQaHvqFGg5nJNYCMBsuifpH4FpB2KEehYjzaifFybVc?auto=format&w=1000"}
            className="w-[25px] h-[25px] rounded-full border-2 border-red-600 "
          ></img>
        </div>
        <div className="text-xs flex justify-between my-2 pb-4 font-Heading mt-4 px-4 rounded-bl-lg rounded-br-lg">
          <p className="text-tertiarygrey-150">Price</p>
          <p>
            <span className="font-bold mx-1">
              {(item?.price &&
                window?.web3?.utils?.fromWei(item?.price + "")) ||
                "*"}
            </span>
            <span className="text-tertiarygrey-150">(7.05 USD)</span>
          </p>
        </div>
      </div>
    );
  });
  return (
    <div
      className={`flex items-center space-x-4 text-white text-[50px] relative overflow-hidden ${props?.className}`}
    >
      <button
        type="button"
        onClick={getPrevitemsHandler}
        className="absolute z-10 left-4"
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <div
        className="flex space-x-[26px] pt-[75px] pb-[75px] w-full transition duration-500 ease-in-out"
        style={{
          transform: `translateX(${-translateWidth}px)`,
        }}
        ref={carouselRef}
      >
        {recs}
      </div>
      <button
        type="button"
        onClick={getNextitemsHandler}
        className="absolute z-10 right-4"
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
}

export default Carousel;
