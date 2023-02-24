import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";

function Carousel(props) {
  const [itemSet, setItemSet] = useState(0);

  const carouselRef = useRef();

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

  const recs = props?.items?.map((item, index) => {
    console.log(item)
    return (
      <div
        key={index}
        className="rounded-lg h-[325px] w-[225px] flex-shrink-0 transform transition duration-500 hover:scale-125"
      >
        <img src={item?.tokenImage} className="h-full w-full object-cover rounded-lg" />
      </div>
    );
  });
  return (
    <div className={`flex items-center space-x-4 text-white text-[50px] relative overflow-hidden ${props?.className}`}>
      <button
        type="button"
        onClick={getPrevitemsHandler}
        className="absolute z-10 left-4"
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <div
        className="flex space-x-[26px] py-10 w-full transition duration-500 ease-in-out"
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
