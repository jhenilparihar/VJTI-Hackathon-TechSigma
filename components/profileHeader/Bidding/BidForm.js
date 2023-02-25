import TimePickers from "@/components/common/Timepicker";
import moment from "moment";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import BlockChainContext from "@/store/blockchain-context";
import axios from "axios";
const BidForm = (props) => {
  const [startTime, setStartTime] = useState(moment().format("hh:mm:ss a"));
  const [endTime, setEndTime] = useState(moment().format("hh:mm:ss a"));
  const [basePrice,setBasePrice]=useState(props.baseprice)
   const router=useRouter();
   const ctx=useContext(BlockChainContext)
   
   const StartBidding=async(e)=>{
    console.log(props)
    e.preventDefault()
    const data=new FormData()
    data.append("start_date",startTime)
    data.append("end_date",endTime)
    data.append("base_price",props.baseprice)
    data.append("age",props.tokenName)
    data.append("name",props.name)
    ctx.toggleForSale(props.tokenId)
     await axios.post(`https://vjtihackathon.pythonanywhere.com/login/bid-start/`,data).then(()=>{
     
      router.push(`/nft/bidding/${props.tokenName}`)
    })
   
  }
    

  
  return (
    <>
      <div className="flex justify-between">
        <button className="bg-gradient-to-r from-red-500 to-red-800 text-white font-semibold my-2  rounded-md w-[35%] justify-center py-2 text-center flex items-center" onClick={StartBidding}>
          LIVE AUCTION
          <span className="mx-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              fill="#fff"
              width={20}
              height={20}
            >
              <path d="M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z" />
            </svg>
          </span>
        </button>
        <button className="bg-white text-black rounded-md my-2  w-[20%] flex justify-center items-center font-semibold" onClick={props.close}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={20} height={20} className="" >
            <path d="M32.5 224H24c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L82.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L169 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H32.5z" />
          </svg>
        </button>
      </div>

      <form className="flex flex-col mb-10">
        <label className="text-sm my-2 text-tertiaryred-50">
          Auction Start time<span className=" mx-1 text-xs text-tertiarywhite-100">*</span>
        </label>
        <div className="border-b-2 border-tertiaryred-50">
          <TimePickers
            timeHandler={(startTime) =>
              setStartTime(moment(startTime).format("HH:MM"))
            }
          ></TimePickers>
        </div>

        <label className="text-sm my-2 text-tertiaryred-50">
          Auction End time<span className=" mx-1 text-xs text-tertiarywhite-100">*</span>
        </label>
        <div className="border-b-2 border-tertiaryred-50">
          <TimePickers
            timeHandler={(endTime) =>
              setEndTime(moment(endTime).format("HH:MM"))
            }
          ></TimePickers>
        </div>

        <label className="text-sm my-2 text-tertiaryred-50">
          Base Price for NFT <span className="text-xs text-tertiarywhite-100">*</span>
        </label>
        <input
          type="number"
          defaultValue={props.baseprice}
          value={basePrice}
          onChange={(e)=>setBasePrice(e.target.value)}
          className="py-2 rounded-sm bg-[#232323]  focus:outline-none border-b-2 border-tertiaryred-50 px-2"
        ></input>
      </form>
    </>
  );
};
export default BidForm;
