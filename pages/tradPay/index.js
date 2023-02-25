import { useEffect } from "react";
import axios from "axios";

function Index() {
    const makePayment = async () => {
        const result = await axios.post(
          `https://vjtihackathon.pythonanywhere.com/login/trad-details/`,
          {
            bid_price: localStorage.getItem("tradPrice"),
            accountAddress: localStorage.getItem("tradAccount"),
            TokenId: localStorage.getItem("tradToken"),
          }
        );
        console.log("hey", localStorage.getItem("tradPrice"))

      };
    useEffect(() => {
        makePayment();
    }, [])
}

export default Index;