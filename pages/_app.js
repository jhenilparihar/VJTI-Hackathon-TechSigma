import "@/styles/globals.css";
import Layout from "@/components/Layout";

import React from "react";
import { BlockChainContextProvider } from "@/store/blockchain-context";

function App ({Component, pageProps}){
    return (
      <BlockChainContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
     </BlockChainContextProvider>
    );
  }


export default App;
