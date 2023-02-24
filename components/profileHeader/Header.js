import BlockChainContext from "@/store/blockchain-context"
import { useContext } from "react"
const Header=()=>{
    const ctx=useContext(BlockChainContext)
  
    
    //console.log(obj)
    if(ctx.allUserProfile[ctx.accountAddress])
    {
    return(
        <div>
            <div>
                <img src={ctx.allUserProfile[ctx.accountAddress]['bannerHash']}  className="w-full h-[450px] "></img>
            </div>
            <img src={ctx.allUserProfile[ctx.accountAddress]['imageHash']} className=" border-2 rounded-full border-white h-[160px] w-[160px] absolute top-[350px] left-[50px]"></img>
            
        </div>
        
    )
    }
}
export default Header