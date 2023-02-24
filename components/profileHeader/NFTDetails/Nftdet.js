import GenericModal from "@/components/common/GenericModal";
import { useState } from "react";
import Owner from "./Owner";
import OwnerList from "./OwnerList";
import PriceChart from "./PriceChart";
import TimePickers from "@/components/common/Timepicker";
import BidForm from "../Bidding/BidForm";
import Link from "next/link";

const Nftdet = (props) => {
  const [currentTab, setTab] = useState({
    owner: true,
    price: false,
    bid: false,
  });
  const [bid,setBidding]=useState(false)
  

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

  return (
    <div className="flex px-4 py-2 items-center">
      <img src={props.img} className="w-[38%] h-[40%]"></img>
      <div className="w-[62%] flex flex-col px-5 py-2 ">
        <h1 className="  text-2xl font-medium font-Heading w-full">
          {props.title}
        </h1>
        <p className=" text-sm  text-tertiarygrey-450 py-2 border-b-2 border-tertiarygrey-150">
          {props.des}
        </p>
        {!bid && <div>
          <div className="flex space-x-4 my-5">
            <Owner
              img={props.owner[0].img}
              deg="Owner"
              name={props.owner[0].name}
            ></Owner>
            <Owner
              img={"https://niftykit.com/wp-content/uploads/2021/08/bayc.jpg"}
              deg="Creator"
              name="@par222"
            ></Owner>
          </div>
          {<div>
            <p className="text-tertiarygrey-50 text-sm font-medium ">Price</p>
            <p className="font-medium text-lg my-2 flex items-center">
              <span>{props.price}{" "}</span>
              <span className="text-tertiarygrey-50 font-display text-xs mx-1">
                (7.05 USD)
              </span>
              <div className="ml-[50%]">
               <Link href={`/nft/details/${props.id}`}  className="text-tertiarywhite-100 text-xs hover:text-tertiaryred-50 transition-all">See More...</Link>
            </div>
            </p>
           
          </div>
          }
          <div>
            <nav className="text-sm flex space-x-10 w-[100%] py-0  my-2 border-b-[2px] border-tertiarygrey-150 cursor-pointer">
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
            </nav>
            {currentTab.owner && <OwnerList owners={props.owner}></OwnerList>}
            {currentTab.price && <PriceChart data={data}></PriceChart>}
            {currentTab.bid && (
                <>
              <div className="flex space-x-2 items-center justify-center pt-6">
              
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width={30} height={30} fill="#fff">
                  <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width={30} height={30} fill="#fff">
                  <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width={30} height={30} fill="#fff">
                  <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
                </svg>
                
              </div>
              <div className="flex justify-center mt-5 font-bold ">
              <button className="text-sm rounded-md  bg-gradient-to-l justify-center from-rose-400 via-fuchsia-500 to-indigo-500 px-2 py-3 w-[40%] flex items-center" onClick={()=>setBidding(true)}><p className="text-center mx-2">Schecule bidding </p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff" width={20} height={20}><path d="M318.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-120 120c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l4-4L325.4 293.4l-4 4c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l120-120c12.5-12.5 12.5-32.8 0-45.3l-16-16c-12.5-12.5-32.8-12.5-45.3 0l-4 4L330.6 74.6l4-4c12.5-12.5 12.5-32.8 0-45.3l-16-16zm-152 288c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l48 48c12.5 12.5 32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-1.4-1.4L272 285.3 226.7 240 168 298.7l-1.4-1.4z"/></svg></button>
              </div>
            
               </>
            )}
          </div>
         
        </div>}
        {bid && <BidForm price={parseFloat(props.price.split(' ')[0])} close={()=>setBidding(false)}></BidForm>}
      </div>
    </div>
  );
};
export default Nftdet;
