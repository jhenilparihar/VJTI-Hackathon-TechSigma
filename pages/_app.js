import "@/styles/globals.css";
import Layout from "@/components/Layout";
import Web3 from "web3";
import Marketplace from "../abis/Marketplace.json";
import axios from "axios";
import React from "react";
import { BlockChainContextProvider } from "@/store/blockchain-context";
import Loading from "@/components/Loading/Loading";
import ConnectToMetamask from "@/components/ConnectMetamask/ConnectToMetamask";
import ContractNotDeployed from "@/components/ContractNotDeployed/ContractNotDeployed";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountAddress: "",
      accountBalance: "",
      NFTContract: null,
      NFTCount: 0,
      NFTs: [],
      loading: true,
      metamaskConnected: false,
      contractDetected: false,
      totalTokensMinted: 0,
      totalTokensOwnedByAccount: 0,
      nameIsUsed: false,
      imageIsUsed: false,
      imageHash: "",
      lastMintTime: null,
      currentProfile: "",
      allUserProfile: {},
    };
  }

  componentWillMount = async () => {
    await this.loadWeb3();
    await this.loadBlockchainData();
    await this.setMetaData();
  };


  loadWeb3 = async () => {
    if (window?.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else if (window?.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window?.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      this.setState({ metamaskConnected: false });
    } else {
      this.setState({ metamaskConnected: true });
      this.setState({ loading: true });
      this.setState({ accountAddress: accounts[0] });
      let accountBalance = await web3.eth.getBalance(accounts[0]);
      accountBalance = web3.utils.fromWei(accountBalance, "Ether");
      this.setState({ accountBalance });
      this.setState({ loading: false });
      const networkId = await web3.eth.net.getId();
      const networkData = Marketplace.networks[networkId];
      if (networkData) {
        this.setState({ loading: true });
        const NFTContract = new web3.eth.Contract(
          Marketplace.abi,
          networkData.address
        );
        console.log(NFTContract)
        this.setState({ NFTContract });
        this.setState({ contractDetected: true });

        const isProfileSet = await NFTContract.methods
          .isProfileSet(this.state.accountAddress)
          .call();

        if (!isProfileSet) {
          var months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          var currentTime = new Date();
          // returns the month (from 0 to 11)
          var month = months[currentTime.getMonth()];

          // returns the day of the month (from 1 to 31)
          var day = currentTime.getDate();

          // returns the year (four digits)
          var year = currentTime.getFullYear();
          const overAllDate = month + " " + day + " " + year;
          await this.uploadProfile(
            "https://ipfs.infura.io/ipfs/QmeAcsFZfRd719RHMivPUitJpXzH54k8d3CXpmvmLZnF7A",
            "https://bafybeih5pgcobf6hpgf2pexmkhfsk55zr4dywrazgybk7u2fp6w4webkxu.ipfs.infura-ipfs.io/",
            "Unnamed",
            "No description",
            "abc@gmail.com",
            overAllDate
          );
        }

        const NFTCount = await NFTContract.methods.NFTCounter().call();
        this.setState({ NFTCount });
        for (var i = 1; i <= NFTCount; i++) {
          const nft = await NFTContract.methods.allNFTs(i).call();
          this.setState({
            NFTs: [...this.state.NFTs, nft],
          });
        }
        let totalTokensMinted = await NFTContract.methods
          .getNumberOfTokensMinted()
          .call();

        const cp = await NFTContract.methods
          .allProfiles(this.state.accountAddress)
          .call();

        this.setState({ currentProfile: cp });

        const ProfileCounter = await NFTContract.methods.UserCounter().call();

        for (
          var profile_counter = 1;
          profile_counter <= ProfileCounter;
          profile_counter++
        ) {
          const address = await NFTContract.methods
            .allAddress(profile_counter)
            .call();
          const profile = await NFTContract.methods.allProfiles(address).call();

          this.state.allUserProfile[address] = profile;
        }

        totalTokensMinted = parseInt(totalTokensMinted);
        this.setState({ totalTokensMinted });
        this.setState({ loading: false });
      } else {
        this.setState({ contractDetected: false });
      }
    }
  };

  uploadProfile = async (
    bannerHash,
    imageHash,
    name,
    description,
    email,
    date
  ) => {
    this.state.NFTContract.methods
      .addUserProfile(
        bannerHash,
        imageHash,
        name,
        description,
        this.state.accountAddress,
        email,
        date
      )
      .send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        localStorage.setItem(this.state.accountAddress, new Date().getTime());
        this.setState({ loading: false });
        window.location.reload();
      });
  };

  getProfileDetails = async (address) => {
    const cp = await this.state.NFTContract.methods.allProfiles(address).call();

    return cp;
  };

  connectToMetamask = async () => {
    await window.ethereum.enable();
    this.setState({ metamaskConnected: true });
    window.location.reload();
  };

  setMetaData = async () => {
    if (this.state.NFTs.length !== 0) {
      this.state.NFTs.map(async (nft) => {
        const result = await fetch(nft.tokenURI);
        const metaData = await result.json();
        this.setState({
          NFTs: this.state.NFTs.map((nft) =>
            parseInt(nft.tokenId) === Number(metaData.tokenId)
              ? {
                  ...nft,
                  metaData,
                }
              : nft
          ),
        });
      });
    }
  };

  render() {
    return (
      <>
        {!this.state.metamaskConnected ? (
          <ConnectToMetamask connectToMetamask={this.connectToMetamask} />
        ) : !this.state.contractDetected ? (
          <ContractNotDeployed />
        ) : this.state.loading ? (
          <Loading />
        ) : (
          <>
            <BlockChainContextProvider>
              <Layout>
                <this.props.Component {...this.props.pageProps} />
              </Layout>
           </BlockChainContextProvider>
          </>
        )}
      </>
    );
  }
}

export default App;
