import recommendations2 from "../../public/images/recommendations2.png";
import explore from "../../public/images/explore.png";
import bidding from "../../public/images/bidding.png";

function Section2(props) {
  return (
    <div className="py-10 px-16 flex space-x-10 justify-center">
      <div className="h-[575px] rounded-xl bg-tertiarygrey-680 w-[27%] px-8 pt-12 pb-10 flex flex-col justify-between hover:scale-105 cursor-pointer">
        <div className="h-[60%] w-full ">
          <img
            src={recommendations2?.src}
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div className="space-y-4">
          <h2 className="font-title text-2xl font-medium text-tertiaryred-50">
            Get recommendations
          </h2>
          <div>
            A recommendation system where the buyer will get suggestions of NFT
            on which its interest matches and related NFT which buyer bought
            previously
          </div>
        </div>
      </div>
      <div className="h-[575px] rounded-xl bg-tertiarygrey-680 w-[27%] px-8 pt-12 pb-10 flex flex-col justify-between hover:scale-105 cursor-pointer">
        <div className="space-y-4">
          <h2 className="font-title text-2xl font-medium text-tertiaryred-50">
            Dive into the world of NFTs
          </h2>
          <div>Explore creators, best prices, rare tokens</div>
        </div>
        <div className="h-[60%] w-full ">
          <img
            src={explore?.src}
            className="object-cover object-center w-full h-full"
          />
        </div>
      </div>
      <div className="h-[575px] rounded-xl bg-tertiarygrey-680 w-[27%] px-8 pt-12 pb-10 flex flex-col justify-between hover:scale-105 cursor-pointer">
        <div className="h-[60%] w-full ">
          <img
            src={bidding?.src}
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div className="space-y-4">
          <h2 className="font-title text-2xl font-medium text-tertiaryred-50">
            Bidding on NFTs
          </h2>
          <div>
            A particular user can bid price on NFT where the creator will get
            idea of best price NFT and best buyer for NFT
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section2;
