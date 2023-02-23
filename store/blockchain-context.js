import React, { useEffect, useContext, useState } from "react";
import Web3 from "web3";
import Marketplace from "../abis/Marketplace.json";

const blockChainObj = {
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

const BlockChainContext = React.createContext(blockChainObj);

export default BlockChainContext;

export const BlockChainContextProvider = (props) => {
  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState(0);
  const [NFTContract, setNFTContract] = useState("");
  const [NFTCount, setNFTCount] = useState(0);
  const [NFTs, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metamaskConnected, setMetaMaskConnected] = useState(false);
  const [contractDetected, setContractDetected] = useState(false);
  const [totalMinted, setTotalMinted] = useState(0);
  const [totalTokensOwnedByAccount, setTotalTokensOwnedByAccount] = useState(0);
  const [nameIsUsed, setNameIsUsed] = useState(false);
  const [imageIsUsed, setImageIsUsed] = useState(false);
  const [imageHash, setImageHash] = useState("");
  const [lastMintTime, setLastMintTime] = useState(null);
  const [currentProfile, setCurrentProfile] = useState("");
  const [allUserProfile, setAllUserProfile] = useState({});

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      setMetaMaskConnected(false);
    } else {
      setMetaMaskConnected(true);
      setLoading(true);
      setAccountAddress(accounts[0]);
      console.log(accounts[0]);
      let accountBalance = await web3.eth.getBalance(accounts[0]);
      accountBalance = web3.utils.fromWei(accountBalance, "Ether");
      setAccountBalance(accountBalance);
      setLoading(false);
      const networkId = await web3.eth.net.getId();
      const networkData = Marketplace.networks[networkId];
      if (networkData) {
        setLoading(true);
        const NFTContract = new web3.eth.Contract(
          Marketplace.abi,
          networkData.address
        );
        setNFTContract(NFTContract);
        setContractDetected(true);

        const isProfileSet = await NFTContract.methods
          .isProfileSet(accounts[0])
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
          await uploadProfile(
            "https://ipfs.infura.io/ipfs/QmeAcsFZfRd719RHMivPUitJpXzH54k8d3CXpmvmLZnF7A",
            "https://bafybeih5pgcobf6hpgf2pexmkhfsk55zr4dywrazgybk7u2fp6w4webkxu.ipfs.infura-ipfs.io/",
            "Unnamed",
            "No description",
            "abc@gmail.com",
            overAllDate
          );
        }

        const NFTCount = await NFTContract.methods.NFTCounter().call();
        setNFTCount(NFTCount);
        for (var i = 1; i <= NFTCount; i++) {
          const nft = await NFTContract.methods.allNFTs(i).call();
          setNFTs((prevState) => {
            const newState = [...prevState, nft];
            return newState;
          });
        }
        let totalTokensMinted = await NFTContract.methods
          .getNumberOfTokensMinted()
          .call();

        const cp = await NFTContract.methods.allProfiles(accounts[0]).call();

        setCurrentProfile(cp);

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

          allUserProfile[address] = profile;
        }
        console.log(totalTokensMinted);
        totalTokensMinted = parseInt(totalTokensMinted)
        setTotalMinted(totalTokensMinted);
        setLoading(false);
      } else {
        setContractDetected(contractDetected);
      }
    }
  };
  const getProfileDetails = async (address) => {
    const cp = await NFTContract.methods.allProfiles(address).call();

    return cp;
  };

  const connectToMetamask = async () => {
    await window.ethereum.enable();
    setMetaMaskConnected(true);
    window.location.reload();
  };

  const uploadProfile = async (
    bannerHash,
    imageHash,
    name,
    description,
    email,
    date
  ) => {
    NFTContract?.methods
      ?.addUserProfile(
        bannerHash,
        imageHash,
        name,
        description,
        accountAddress,
        email,
        date
      )
      .send({ from: accountAddress })
      .on("confirmation", () => {
        localStorage.setItem(accountAddress, new Date().getTime());
        setLoading(false);
        window.location.reload();
      });
  };

  const setMetaData = async () => {
    if (NFTs.length !== 0) {
      NFTs.map(async (nft) => {
        const result = await fetch(nft.tokenURI);
        const metaData = await result.json();

        setNFTs((prevState) => {
          return prevState.map((nft) =>
            nft.tokenId.toNumber() === Number(metaData.tokenId)
              ? {
                  ...nft,
                  metaData,
                }
              : nft
          );
        });
      });
    }
  };

  const blockChainCtx = {
    accountAddress: accountAddress,
    accountBalance: accountBalance,
    NFTContract: NFTContract,
    NFTCount: NFTCount,
    NFTs: NFTs,
    loading: loading,
    metamaskConnected: metamaskConnected,
    contractDetected: contractDetected,
    totalTokensMinted: totalMinted,
    totalTokensOwnedByAccount: totalTokensOwnedByAccount,
    nameIsUsed: nameIsUsed,
    imageIsUsed: imageIsUsed,
    imageHash: imageHash,
    lastMintTime: lastMintTime,
    currentProfile: currentProfile,
    allUserProfile: allUserProfile,
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
    setMetaData();
  }, []);

  return (
    <BlockChainContext.Provider value={blockChainCtx}>
      {props?.children}
    </BlockChainContext.Provider>
  );
};