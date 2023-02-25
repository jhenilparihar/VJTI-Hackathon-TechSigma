import AuctionHeader from "@/components/auction/AuctionHeader";
import Bidder from "@/components/auction/Bidder";
import { useRouter } from "next/router";
import { useState,useEffect} from "react";
import axios from "axios";
const Bidding = () => {
  const router=useRouter()
 
  const [id,setId]=useState({})
  const [token,setToken]=useState(router.query.slug)
   let fetchTokenId=async()=>{

    //console.log(router.query.slug)
     const result=await axios.get(`https://vjtihackathon.pythonanywhere.com/login/contentdetail/${token}`)
     setId(result.data)
   


   }
   useEffect(()=>{
    
    
    fetchTokenId()
   },[])
   useEffect(()=>{
    console.log(id)
   },[id])
  return (
    <>
      <AuctionHeader></AuctionHeader>
      <Bidder data={id}></Bidder>
    </>
  );
};
export default Bidding;
