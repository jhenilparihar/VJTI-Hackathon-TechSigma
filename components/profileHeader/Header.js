import BlockChainContext from "@/store/blockchain-context"
import { useContext } from "react"
const Header=()=>{
    const ctx=useContext(BlockChainContext)
  
    console.log(ctx.allUserProfile[ctx.accountAddress][0])
    //console.log(obj)
    
    return(
        <div>
            <div>
                <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"  className="w-full h-[450px] "></img>
            </div>
            <img src="" className=" border-2 rounded-full border-white h-[160px] w-[160px] absolute top-[350px] left-[50px]"></img>
            
        </div>
        
    )
}
export default Header