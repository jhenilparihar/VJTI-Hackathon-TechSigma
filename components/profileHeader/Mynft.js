import { useContext } from "react";
import BlockChainContext from "@/store/blockchain-context";

const Mynft = (props) => {
    const ctx=useContext(BlockChainContext)
   // console.log(ctx.allUserProfile[ctx.NFTs])
const handlenft=()=>{
    props.openModal(props)
}
  return (
    <div className="w-[21%] rounded-md  transform transition duration-500 hover:scale-110 cursor-pointer" onClick={handlenft}>
      <img src={props.img} className="h-[400px] w-[100%] rounded-b-md"></img>
      <div className="bg-[#232323] px-3 pt-2 rounded-b-md ">
        <div className="text-xl font-bold font-Heading  border-b-2 pb-3 border-tertiarygrey-150 flex justify-between items-center">
          <p className="py-2">{props.title}</p>
          <img src={props.owner[0].img} className="w-[30px] h-[30px] rounded-full border-2 border-red-600 "></img>
        </div>
        <div className="text-xs flex justify-between my-2 pb-4 font-Heading mt-4">
          <p className="text-tertiarygrey-150">Price</p>
          <p>
            <span className="font-bold mx-1 text-base ">{props.price}</span>
            <span className="text-tertiarygrey-150">(7.05 USD)</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Mynft;
