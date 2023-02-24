import BiddingRoom from "./BiddingRoom";
const Bidder = () => {
  return (
    <div className="flex w-full h-full">
      <div className="bg-[#232323] w-[40%] my-20 px-5 py-5 h-[90%] mx-[5%] rounded-md flex flex-col ">
        <div className="flex justify-center">
          <img
            className="my-3 h-[90%] w-[90%]"
            src="https://wallpaperaccess.com/full/249921.jpg"
          ></img>
        </div>

        <div className="px-5">
          <div className="flex justify-between items-center">
            <p className="text-white text-xl font-semibold font-Heading">
              The Lightning House
            </p>
            <img
              className="h-[30px] w-[30px] rounded-full border-2 border-tertiarywhite-100"
              src="https://itp.live/cloud/2021/12/14/SH2a0coo-nftmonkey_2.png"
            ></img>
          </div>

          <div className="mt-4 justify-between flex">
            <p className="text-tertiarygrey-150 mt-2  text-sm">Base Price</p>
            <p className="text-tertiarygrey-150 mt-2  text-sm">
              Current Highest Bid
            </p>
          </div>
          <div className="mt-1 justify-between flex font-medium">
            <p className="text-white mt-2  text-lg">5.55 WRX</p>
            <p className="text-white mt-2  text-lg">7.76 WRX</p>
          </div>
          <form className=" flex flex-col">
            <label className="mt-2 text-tertiaryred-50 text-sm ">
              Place your bid<span className="text-white mx-1">*</span>
            </label>
            <input
              className="my-3 py-1 px-1  bg-[#232323] border-b-2 border-tertiaryred-50 focus:outline-none"
              type="number"
            ></input>
            <button
              type="submit"
              className="bg-gradient-to-r from-red-500 to-red-800 py-1 rounded-md text-tertiarywhite-50 font-medium w-[35%] my-5"
            >
              PLACE BID
            </button>
          </form>
        </div>
      </div>
      <div className="bg-[#232323] w-[60%] my-20 px-5 py-5 mx-[5%] rounded-md ">
        <div className="flex justify-between items-baseline px-5">
          <p className="my-2 font-semibold text-center text-2xl">Bidders</p>
          <div className="flex items-center ">
            <p className="text-tertiaryRed mx-2">Ends in: 6.05 mins</p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="#6b6b6b"
              width={20}
              height={20}
            >
              <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
            </svg>
          </div>
        </div>
        <BiddingRoom></BiddingRoom>
      </div>
    </div>
  );
};
export default Bidder;
