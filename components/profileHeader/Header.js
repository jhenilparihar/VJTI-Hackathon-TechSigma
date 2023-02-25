import BlockChainContext from "@/store/blockchain-context"
import { useContext } from "react"
const Header=(props)=>{
    const ctx=useContext(BlockChainContext)
  
    
     console.log(props.accountAddress)
    
    return(
        <div>
            <div>
                <img src={ctx.allUserProfile[props.accountAddress]?.bannerHash}  className="w-full h-[450px] "></img>
            </div>
            <img src={ctx.allUserProfile[props.accountAddress]?.imageHash} className=" border-2 rounded-full border-white h-[160px] w-[160px] absolute top-[350px] left-[50px]"></img>
            
        </div>
        
    )
    
}
export default Header