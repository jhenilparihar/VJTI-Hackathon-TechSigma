import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import BlockChainContext from "@/store/blockchain-context";
import Payment from "@/Payment/Payment";

function TraditionalPayment() {
  const router = useRouter();
  const tokenId = router.query.slug;

  const [price, setPrice] = useState(0);
  const blockChainCtx = useContext(BlockChainContext);

  useEffect(() => {
    console.log(blockChainCtx.NFTs[parseInt(tokenId) - 1]);
    setPrice(
      parseInt(
        window?.web3?.utils?.fromWei(
          blockChainCtx.NFTs[parseInt(tokenId) - 1].price + ""
        )
      ) * 1600
    );
    localStorage.setItem("tradPrice", price);
    localStorage.setItem("tradeToken", tokenId);
    localStorage.setItem("tradAccount", blockChainCtx?.accountAddress);
  }, [blockChainCtx.NFTs]);
  return (
    <>
      {price && (
        <Payment
          amount={price}
          tokenId={tokenId}
          accountAddress={blockChainCtx?.accountAddress}
        ></Payment>
      )}
    </>
  );
}

export default TraditionalPayment;
