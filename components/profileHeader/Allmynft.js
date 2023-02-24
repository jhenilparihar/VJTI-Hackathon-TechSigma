import Mynft from "./Mynft"
import GenericModal from "../common/GenericModal"
import { useState } from "react"
import Nftdet from "./NFTDetails/Nftdet"
const Allmynft=()=>{
    const openModal=(nft)=>{
     setNft(nft)
     setShowModal(true)
    }
    const closeModal=()=>{
        setShowModal(false)
    }
    const [showModal,setShowModal]=useState(false)
    const [Nft,setNft]=useState()
    const nft=[
        {
            img:'https://m.media-amazon.com/images/M/MV5BOWY4MmFiY2QtMzE1YS00NTg1LWIwOTQtYTI4ZGUzNWIxNTVmXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg',
            title:'The Gray Man',
            owner:[{
                name:'@yash123',
                img:'https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg'
            }],
            price:'5.55 WRX',
            des:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut'
        },
        {
            img:'https://m.media-amazon.com/images/M/MV5BOWY4MmFiY2QtMzE1YS00NTg1LWIwOTQtYTI4ZGUzNWIxNTVmXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg',
            title:'The Gray Man',
            owner:[{
                name:'@yash123',
                img:'https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg'
            }],
            price:'5.55 WRX',
            des:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut'
        },
        {
            img:'https://m.media-amazon.com/images/M/MV5BOWY4MmFiY2QtMzE1YS00NTg1LWIwOTQtYTI4ZGUzNWIxNTVmXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg',
            title:'The Gray Man',
            owner:[{
                name:'@yash123',
                img:'https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg'
            }],
            price:'5.55 WRX',
            des:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut'
        },
        {
            img:'https://m.media-amazon.com/images/M/MV5BOWY4MmFiY2QtMzE1YS00NTg1LWIwOTQtYTI4ZGUzNWIxNTVmXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg',
            title:'The Gray Man',
            owner:[{
                name:'@yash123',
                img:'https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg'
            },
            {
                name:'@jhenil123',
                img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzL71BZ0cKVejQQbeAa9SeeqopNLH8J3fRogCSGILCRb7JED4PwuGqZt-NaXJbvzuEqv4&usqp=CAU'
            },
            {
                name:'@param212',
                img:'https://www.thismorningonchain.com/content/images/size/w600/2022/06/Bored-Ape-Yacht-Club-Discord-Hacked--Millions-Stolen-from-Members.png'
            }
        ],
            price:'5.55 WRX',
            des:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut'
        }
    ]
    return(
        <>
        {showModal && <GenericModal className="w-[60%] h-[72%]" closeModal={closeModal} posText="Sell" negText="Cancel" posHandler={closeModal} negHandler={closeModal}>
            <Nftdet {...Nft}></Nftdet>
            </GenericModal>}
         <div className={showModal?"mt-10 mx-[5%] flex flex-wrap  justify-between h-[0px] overflow-hidden":"mt-10 mx-[5%] flex flex-wrap  justify-between"}>
            {nft.map((nft)=><Mynft {...nft}  openModal={openModal}></Mynft>)}


        </div>
        </>
       
    )
}
export default Allmynft