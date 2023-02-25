import GenericModal from "@/components/common/GenericModal";
import { useContext, useState } from "react";
import Owner from "./Owner";
import OwnerList from "./OwnerList";
import PriceChart from "./PriceChart";
import TimePickers from "@/components/common/Timepicker";
import BidForm from "../Bidding/BidForm";
import Link from "next/link";
import BlockChainContext from "@/store/blockchain-context";

const Nftdet = (props) => {
  let tab = props.buy
    ? {
        owner: false,
        price: true,
        bid: false,
      }
    : {
        owner: true,
        price: false,
        bid: false,
      };
  const [currentTab, setTab] = useState(tab);
  const ctx = useContext(BlockChainContext);
  const [bid, setBidding] = useState(false);
  const [price, setPrice] = useState(false);
  const data = {
    labels: ["Jan", "Feb", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "NFT Price Over Months in 2022",
        data: [3.33, 5.4, 6, 6.2, 5.8, 6.7, 7.1],
        fill: false,
        borderColor: "#ff1818",
      },
    ],
  };
  const [newPrice, setNewPrice] = useState(
    props?.price && window?.web3?.utils?.fromWei(props?.price + "")
  );
  const changePriceHandler = (e) => {
    e.preventDefault();
    //console.log(typeof(e.target.value+""),e.target.value)
    ctx.changeTokenPrice(parseInt(props.tokenId), newPrice);
  };
  return (
    <div className="flex px-4 py-2 justify-center items-center ">
      <div>
        <img src={props?.tokenImage} className="w-[90%] h-[90%]"></img>
        {props.forSale && props.currentOwner != ctx.accountAddress && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff" width={20} height={20}>
            <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
          </svg>
        )}
      </div>

      <div className="w-[60%] flex flex-col px-1 py-2 ">
        <h1 className="  text-2xl font-medium font-Heading w-full">
          {props?.tokenName}
        </h1>
        <p className=" text-sm  text-tertiarygrey-450 py-2 border-b-2 border-tertiarygrey-150">
          {props?.tokenDesc?.replaceAll("\<.*?\>", "")}
        </p>

        {!bid && (
          <div>
            <div className="flex space-x-4 my-5">
              <Owner
                img={ctx.allUserProfile[props.currentOwner]?.imageHash}
                deg="Owner"
                name={ctx.allUserProfile[props.currentOwner]?.name}
              ></Owner>
              <Owner
                img={ctx.allUserProfile[props.mintedBy]?.imageHash}
                deg="Creator"
                name={ctx.allUserProfile[props.mintedBy]?.name}
              ></Owner>
            </div>
            {
              <div>
                <p className="text-tertiarygrey-50 text-sm font-medium ">
                  Price
                </p>
                <p className="font-medium text-lg my-2 flex items-center">
                  <span>
                    {props?.price &&
                      window?.web3?.utils?.fromWei(props?.price + "")}{" "}
                    ETH
                  </span>
                  <span className="text-tertiarygrey-50 font-display text-xs mx-1">
                    (7.05 USD)
                  </span>
                  <div className="ml-[50%]">
                    <Link
                      href={`/nft/details/${props.id}`}
                      className="text-tertiarywhite-100 text-xs hover:text-tertiaryred-50 transition-all"
                    >
                      See More...
                    </Link>
                  </div>
                </p>
                {!price && !props.buy && (
                  <button
                    className="bg-tertiaryred-150 my-2 text-sm py-1 px-3 rounded-sm font-medium"
                    onClick={() => setPrice(true)}
                  >
                    Change Price
                  </button>
                )}

                {price && !props.buy && (
                  <form
                    className="flex space-x-3 items-center"
                    onSubmit={changePriceHandler}
                  >
                    <input
                      className="py-1 border-b-2 border-tertiaryred-50 bg-[#232323] focus:outline-none w-[70%]"
                      type={"number"}
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                    ></input>
                    <button
                      type="submit"
                      className="bg-white py-1 px-2 rounded-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width={20}
                        height={20}
                      >
                        <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                      </svg>
                    </button>
                  </form>
                )}
              </div>
            }
            {
              <div>
                <nav className="text-sm flex space-x-10 w-[100%] py-0  my-2 border-b-[2px] border-tertiarygrey-150 cursor-pointer">
                  {!props.buy && (
                    <span
                      className={
                        currentTab.owner
                          ? "border-b-4 py-2 border-tertiaryred-50"
                          : "py-2"
                      }
                      onClick={() => {
                        setTab({ price: false, bid: false, owner: true });
                      }}
                    >
                      Owners
                    </span>
                  )}
                  {
                    <span
                      className={
                        currentTab.price
                          ? "border-b-4 py-2 border-tertiaryred-50"
                          : "py-2"
                      }
                      onClick={() => {
                        setTab({ bid: false, owner: false, price: true });
                      }}
                    >
                      Price History
                    </span>
                  }
                  {!props.buy && (
                    <span
                      className={
                        currentTab.bid
                          ? "border-b-4 py-2 border-tertiaryred-50"
                          : "py-2"
                      }
                      onClick={() => {
                        setTab({ price: false, bid: true, owner: false });
                      }}
                    >
                      Bidding Status
                    </span>
                  )}
                </nav>
                {currentTab.owner && (
                  <>
                    <Owner
                      img={ctx.allUserProfile[props.currentOwner]?.imageHash}
                      deg="Owner"
                      name={ctx.allUserProfile[props.currentOwner]?.name}
                    ></Owner>
                    <Owner
                      img={ctx.allUserProfile[props.mintedBy]?.imageHash}
                      deg="Creator"
                      name={ctx.allUserProfile[props.mintedBy]?.name}
                    ></Owner>
                  </>
                )}
                {currentTab.price && <PriceChart data={data}></PriceChart>}
                {currentTab.bid && !props.buy && (
                  <>
                    <div className="flex space-x-2 items-center justify-center pt-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                        width={30}
                        height={30}
                        fill="#fff"
                      >
                        <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                        width={30}
                        height={30}
                        fill="#fff"
                      >
                        <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                        width={30}
                        height={30}
                        fill="#fff"
                      >
                        <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
                      </svg>
                    </div>
                    <div className="flex justify-center mt-5 font-bold ">
                      <button
                        className="text-sm rounded-md  bg-gradient-to-l justify-center from-rose-400 via-fuchsia-500 to-indigo-500 px-2  py-3 w-[40%] flex items-center"
                        onClick={() => setBidding(true)}
                      >
                        <p className="text-center mx-2  ">Schecule bidding </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          fill="#fff"
                          width={20}
                          height={20}
                        >
                          <path d="M318.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-120 120c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l4-4L325.4 293.4l-4 4c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l120-120c12.5-12.5 12.5-32.8 0-45.3l-16-16c-12.5-12.5-32.8-12.5-45.3 0l-4 4L330.6 74.6l4-4c12.5-12.5 12.5-32.8 0-45.3l-16-16zm-152 288c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l48 48c12.5 12.5 32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-1.4-1.4L272 285.3 226.7 240 168 298.7l-1.4-1.4z" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
            }
          </div>
        )}
        {bid && (
          <BidForm
            baseprice={parseInt(
              props?.price && window?.web3?.utils?.fromWei(props?.price + "")
            )}
            {...props}
            close={() => setBidding(false)}
          ></BidForm>
        )}
      </div>
    </div>
  );
};
export default Nftdet;
