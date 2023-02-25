import { useEffect, useState, useContext } from "react";
import BlockChainContext from "@/store/blockchain-context";

function Index() {
  const [tokenData, setTokenData] = useState([]);

  const blockChainCtx = useContext(BlockChainContext);

  const fetchTokenData = async () => {
    
    // set
  };

  useEffect(() => {}, []);

  const approvePaymentHandler = async (tokenId) => {
    const price = blockChainCtx?.NFTs[parseInt(tokenId) - 1].price;
    await blockChainCtx?.buyNFT2(parseInt(tokenId), price);
  };

  const tokens = tokenData?.map((token) => {
    return (
      <div>
        <div>{token?.tokenName}</div>
        <div>{token?.price}</div>
        <div>{token?.accountAddress}</div>
        <button onClick={approvePaymentHandler}>Approve</button>
      </div>
    );
  });
  return (
    <>
      {blockChainCtx?.accountAddress ===
        "0x97e6506fa6DF4D6a246d9970F75Ed3568927Ad6F" && (
        <div>
          <h1>Hhoi</h1>
          {tokens}
        </div>
      )}
    </>
  );
}

export default Index;
