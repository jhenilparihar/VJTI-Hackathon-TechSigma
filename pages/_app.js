import "@/styles/globals.css";
import Layout from "@/components/Layout";

import React from "react";
import { BlockChainContextProvider } from "@/store/blockchain-context";

class App extends React.Component {
  render() {
    return (
      <BlockChainContextProvider>
        <Layout>
          <this.props.Component {...this.props.pageProps} />
        </Layout>
      </BlockChainContextProvider>
    );
  }
}

export default App;
