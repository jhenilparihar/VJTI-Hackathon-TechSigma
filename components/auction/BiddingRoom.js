import { useEffect } from "react"
import Auctioneer from "./Auctioneer"
const BiddingRoom=(props)=>{
    
   
   /* const bidders=[
        {
            name:"@yash123",
            profile_img:"https://www.disruptivegate.com/wp-content/uploads/2022/04/Z_9cHk8G_400x400.jpg",
            bid_price:"7.75 WRX"
        },
        {
            name:"@jhenil123",
            profile_img:"https://i.pinimg.com/736x/be/a3/80/bea380586967bf4de5fd1639a257354a.jpg",
            bid_price:"6.75 WRX"
        },
        {
            name:"@param123",
            profile_img:"https://i.seadn.io/gae/TDT7gFhSaCkqH4HboVGNm2HYhlO9ma4QYs5N4ESqouce4QddEz-Uy07gmxZKIQaHvqFGg5nJNYCMBsuifpH4FpB2KEehYjzaifFybVc?auto=format&w=1000",
            bid_price:"5.75 WRX"
        },
        {
            name:"@jay123",
            profile_img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlm1kMoT7FbEW5oO5Yn_tTTkqPQF7gGrrDUMVd2aPR-oYrGa8RPXIWl9JPrCekxFG3NKE&usqp=CAU",
            bid_price:"5.55 WRX"
        },
        {
            name:"@paras123",
            profile_img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjtozSbS_wcrlQWDWxMyEgcBLo3UppbWCbWwIu84jeXXCe2bgePN9k_6Jbm-wbYqGOinI&usqp=CAU",
            bid_price:"5.45 WRX"
        },
        {
            name:"@22aditya",
            profile_img:"https://www.arweave.net/14WaOuPFzuy0T0ecktIgvdc_ccFdArkN1TC2WAzzyd8?ext=PNG",
            bid_price:"7.75 WRX"
        },
       
    ]*/
    return(
        <div className="flex flex-wrap justify-evenly">
            {props.bidders.map((bid)=><Auctioneer {...bid}></Auctioneer>)}

        </div>
    )
}
export default BiddingRoom