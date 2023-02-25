import { useRouter } from "next/router";
import BlockChainContext from "@/store/blockchain-context";
import { useContext } from "react";
const Filter = () => {
    const router=useRouter()
    const ctx=useContext(BlockChainContext)
  return (
    <div className="mx-[5%] flex items-center justify-between">
      <button className="flex items-baseline border-[2px] border-tertiarygrey-150 py-[6px] px-5 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          height={10}
          width={10}
          fill="#FFFFFF"
        >
          <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
        </svg>
        <p className="mx-3 ">Filter</p>
      </button>
      <div className=" flex justify-between w-[30%] font-medium font-display">
        <button className=" border-2 border-red-600 rounded-full px-7 py-1" onClick={()=>router.push(`/activity/${ctx.accountAddress}`)}>
            Activity
        </button>
        <button className="bg-gradient-to-r from-red-200 to-red-600 font-semibold px-6 py-1 rounded-full">
            Create NFT's
        </button>
        <button className="flex items-center px-4 py-1 border-2 rounded-full border-tertiarygrey-150">
            <p className="mx-3 text-tertiarygrey-150">Sort By</p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={10} height={10} fill="#fff"><path d="M169.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 274.7 54.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
        </button>
      </div>
    </div>
  );
};
export default Filter;
