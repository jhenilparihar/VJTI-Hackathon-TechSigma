import Mynft from "./Mynft"
import GenericModal from "../common/GenericModal"
import { useContext, useState } from "react"
import Nftdet from "./NFTDetails/Nftdet"
import BlockChainContext from "@/store/blockchain-context"
const Allmynft=(props)=>{
    const openModal=(nft)=>{
     setNft(nft)
     setShowModal(true)
    }
    const ctx=useContext(BlockChainContext)
    const closeModal=()=>{
        setShowModal(false)
    }
    const [showModal,setShowModal]=useState(false)
    const [Nft,setNft]=useState()

    let nft=ctx.NFTs.filter((nft)=>nft.currentOwner==props.accountAddress)

    console.log(nft,ctx.NFTs)
    const sellNFT=()=>{
        ctx.toggleForSale(parseInt(Nft.tokenId))
        closeModal()
    }
    
    return(
        <>
        {showModal && <GenericModal className="w-[60%] h-[72%]" closeModal={closeModal} posText={Nft?.forSale?"UnSell":"Sell"} negText="Cancel" posHandler={sellNFT} negHandler={closeModal}>
            <Nftdet {...Nft}></Nftdet>
            </GenericModal>}
         <div className={showModal?"mt-10 mx-[4%] flex flex-wrap  space-x-10 w-full h-[0px] overflow-hidden":"mt-10 mx-[5%] flex flex-wrap  "}>
            {nft.map((nft)=><Mynft {...nft}  openModal={openModal}></Mynft>)}


        </div>
        </>
       
    )
}
export default Allmynft