import CurrentBanner from "./CurrentBanner";
import { useContext, useEffect, useState } from "react";
import Carousel from "../common/Carousel";
import TrendingNow from "./TrendingNow";
import BlockChainContext from "@/store/blockchain-context";
import GenericModal from "../common/GenericModal";
import Nftdet from "../profileHeader/NFTDetails/Nftdet";
import axios from "axios";
import { useRouter } from "next/router";

const recommendations = [
  "https://www.indiewire.com/wp-content/uploads/2017/09/imperial-dreams-2014.jpg?w=426",
  "https://www.indiewire.com/wp-content/uploads/2017/09/crouching-tiger-hidden-dragon-sword-of-destiny-2016.jpg?w=675",
  "https://flxt.tmsimg.com/assets/p9691630_b_v8_ag.jpg",
  "https://cdn.cinematerial.com/p/297x/jwqwceyo/american-factory-movie-poster-md.jpg?v=1565930430",
  "https://static.theprint.in/wp-content/uploads/2022/05/posterrrstranger2022052703092620220527033302.jpg",
  "https://m.media-amazon.com/images/M/MV5BOWY4MmFiY2QtMzE1YS00NTg1LWIwOTQtYTI4ZGUzNWIxNTVmXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
  "https://hips.hearstapps.com/esq.h-cdn.co/assets/17/06/1486417029-girlfriends-day-keyart.jpg?resize=980:*",
];

function Home(props) {
  const blockChainCtx = useContext(BlockChainContext);
  const [currentTokenURI, setCurrentTokenURI] = useState("");
  const [NFT, setNFT] = useState({});
  const [NFTs, setNFTs] = useState([]);
  const [live, setLive] = useState([]);
  const router = useRouter();

  const fetchNFTs = async () => {
    try {
      const result = await axios.get(
        "https://vjtihackathon.pythonanywhere.com/login/createcontent/"
      );

      setNFTs(result?.data);
    } catch (error) {}
  };
  const fetchLive = async () => {
    try {
      const result = await axios.get(
        "https://vjtihackathon.pythonanywhere.com/login/live-bid/"
      );

      setLive(result?.data);
    } catch (error) {}
  };

  const NFTClickHandler = (tokenURI, name) => {
    setCurrentTokenURI(tokenURI);
  };

  const liveHandler = (token, name) => {
    router.push(`/nft/bidding/${name}`);
  };

  const closeModalHandler = () => {
    setCurrentTokenURI("");
    setNFT();
  };

  const buyNFTHandler = () => {
    console.log(typeof NFT.tokenId, NFT.tokenId, typeof NFT.price, NFT.price);
    blockChainCtx.buyNFT(parseInt(NFT.tokenId), NFT.price);
  };
  useEffect(() => {
    if (currentTokenURI) {
      setNFT(
        NFTs.filter((n) => {
          return n.tokenURI == currentTokenURI;
        })[0]
      );
    }
  }, [currentTokenURI]);

  useEffect(() => {
    if (typeof window != "undefined" && localStorage.getItem("isReload")) {
      setNFTs([...blockChainCtx.NFTs]);
    } else {
      fetchNFTs();
    }
  }, [blockChainCtx.NFTs]);

  useEffect(() => {
    fetchLive();
  }, []);

  /*const enterBidding=async()=>{

     const formData=

    try {
      const result = await axios.post(
        "https://vjtihackathon.pythonanywhere.com/login/bid-details/"
      );

      setLive(result?.data);
    } catch (error) {}



  }*/

  return (
    <>
      <div className="pb-10">
        <CurrentBanner />
        <div className="px-14">
          <Carousel items={NFTs} className="" onCardClick={NFTClickHandler} />
        </div>
        <TrendingNow items={recommendations} />
        <div className="py-3 px-4 text-center font-bold text-lg border-b-2 border-tertiaryred-50   text-tertiarywhite-50  mx-[4%] w-[10%]">
          Live Now
        </div>
        <div className="px-16">
          <Carousel items={live} onCardClick={liveHandler} />
        </div>
      </div>

      {NFT && Object.keys(NFT)?.length > 0 && (
        <GenericModal
          className="w-[60%] h-[30%%]"
          closeModal={closeModalHandler}
          posText={NFT.forSale ? "Buy" : "Ok"}
          negText="Cancel"
          disable={NFT.currentOwner == blockChainCtx.accountAddress}
          posHandler={NFT.forSale ? buyNFTHandler : closeModalHandler}
          negHandler={closeModalHandler}
        >
          <Nftdet {...NFT} buy={true}></Nftdet>
        </GenericModal>
      )}
    </>
  );
}

export default Home;
