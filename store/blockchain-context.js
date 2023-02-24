import React, { useEffect, useContext, useState } from "react";
import Web3 from "web3";
import Marketplace from "../abis/Marketplace.json";
import axios from "axios";

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

  console.log(NFTs);

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
    // if(!metamaskConnected) {
    //   await connectToMetamask();
    // }
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      setMetaMaskConnected(false);
    } else {
      localStorage.setItem("metaMaskConnected", true);
      localStorage.setItem("accountAddress", accounts[0]);
      setMetaMaskConnected(true);
      setLoading(true);
      setAccountAddress(accounts[0]);
      let accountBalance = await web3.eth.getBalance(accounts[0]);
      accountBalance = web3.utils.fromWei(accountBalance, "Ether");
      setAccountBalance(accountBalance);
      setLoading(false);
      localStorage.setItem("accountBalance", accountBalance);
      localStorage.setItem("loading", false);
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
        localStorage.setItem("NFTContract", NFTContract);
        localStorage.setItem("contractDetected", contractDetected);

        const isProfileSet = await NFTContract?.methods
          ?.isProfileSet(accounts[0])
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

        const NFTCount = await NFTContract?.methods?.NFTCounter().call();
        setNFTCount(NFTCount);
        localStorage.setItem("NFTCount", NFTCount);
        for (var i = 1; i <= NFTCount; i++) {
          const nft = await NFTContract?.methods?.allNFTs(i).call();
          setNFTs((prevState) => {
            let flag = false;
            for (let i of prevState) {
              if (i?.tokenId === nft?.tokenId) {
                flag = true;
                break;
              }
            }
            if (!flag) {
              const newState = [...prevState, nft];
              return newState;
            }
            return prevState;
          });
        }
        let totalTokensMinted = await NFTContract?.methods
          ?.getNumberOfTokensMinted()
          .call();

        const cp = await NFTContract?.methods?.allProfiles(accounts[0]).call();

        setCurrentProfile(cp);
        localStorage.setItem("currentProfile", cp);

        const ProfileCounter = await NFTContract?.methods?.UserCounter().call();

        for (
          var profile_counter = 1;
          profile_counter <= ProfileCounter;
          profile_counter++
        ) {
          const address = await NFTContract?.methods
            ?.allAddress(profile_counter)
            .call();
          const profile = await NFTContract?.methods
            ?.allProfiles(address)
            .call();

          allUserProfile[address] = profile;
        }
        totalTokensMinted = parseInt(totalTokensMinted);
        setTotalMinted(totalTokensMinted);
        localStorage.setItem("totalTokensMinted", totalTokensMinted);
        setLoading(false);
      } else {
        setContractDetected(contractDetected);
        localStorage.setItem("contractDetected", contractDetected);
      }
    }
  };

  const getProfileDetails = async (address) => {
    const cp = await NFTContract?.methods?.allProfiles(address).call();

    return cp;
  };

  const connectToMetamask = async () => {
    await window.ethereum.enable();
    setMetaMaskConnected(true);
    // window.location.reload();
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
          return prevState.map((nft) => {
            return parseInt(nft.tokenId) === Number(metaData.tokenId)
              ? {
                  ...nft,
                  metaData,
                }
              : nft;
          });
        });
      });
    }
  };

  // new ipfs//

  const uploadFileToIPFS = async (fileBlob) => {
    const apiKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE5NzkzNUM4NUQxODZmNEJCN2NlN2U1RjhGYjY4NWQ4NUJlY0ZkREEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NjE5OTY3NzU0MywibmFtZSI6ImhhcnNoQDIzMDQifQ.gEWeVVohValCGdXRyGorzcYkc0umfpjcJOsPJxDMkQU";

    var config = {
      method: "post",
      url: "https://api.nft.storage/upload",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "image/jpeg",
      },
      data: fileBlob,
    };

    const fileUploadResponse = await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return error;
      });

    return fileUploadResponse;
  };

  //end//

  const mintMyNFT = async (fileUrl, name, tokenPrice, description) => {
    console.log("mint", fileUrl, name, tokenPrice, description);
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
    const overAllDate = month + " " + day + ", " + year;
    var time =
      currentTime.getHours() +
      ":" +
      currentTime.getMinutes() +
      ":" +
      currentTime.getSeconds();
    var dateTime = overAllDate + " at " + time;
    setLoading(true);

    const nameIsUsed = await NFTContract?.methods?.tokenNameExists(name).call();

    const imageIsUsed = await NFTContract?.methods
      ?.tokenImageExists(fileUrl)
      .call();

    console.log("image", imageIsUsed);
    console.log("name", nameIsUsed);

    if (!nameIsUsed && !imageIsUsed) {
      let previousTokenId;
      previousTokenId = await NFTContract?.methods?.NFTCounter().call();
      previousTokenId = parseInt(previousTokenId);
      const tokenId = previousTokenId + 1;
      const tokenObject = {
        tokenName: "DeepSpace",
        tokenSymbol: "DS",
        tokenId: `${tokenId}`,
        name: name,
        imageUrl: fileUrl,
        description: description,
      };
      const metadataUploadResponse = await uploadFileToIPFS(
        JSON.stringify(tokenObject)
      );
      // const cid = await ipfs.add(JSON.stringify(tokenObject));
      let tokenURI = `https://alchemy.mypinata.cloud/ipfs/${metadataUploadResponse.value.cid}`;
      const price = window.web3.utils.toWei(tokenPrice.toString(), "ether");

      NFTContract?.methods
        ?.mintNFT(name, tokenURI, price, fileUrl, dateTime)
        .send({ from: accountAddress })
        .on("confirmation", () => {
          localStorage.setItem(accountAddress, new Date().getTime());
          setLoading(false);
          window.location.reload();
        });
    } else {
      if (nameIsUsed) {
        setNameIsUsed(true);
        setLoading(false);
      } else if (imageIsUsed) {
        setImageIsUsed(true);
        setLoading(false);
      }
    }
  };

  const toggleForSale = (tokenId) => {
    setLoading(true);
    NFTContract?.methods
      ?.toggleForSale(tokenId)
      .send({ from: accountAddress })
      .on("confirmation", () => {
        setLoading(false);
        window.location.reload();
      });
  };

  const changeTokenPrice = (tokenId, newPrice) => {
    setLoading(true);
    const newTokenPrice = window.web3.utils.toWei(newPrice, "Ether");
    NFTContract?.methods
      ?.changeTokenPrice(tokenId, newTokenPrice)
      .send({ from: accountAddress })
      .on("confirmation", () => {
        setLoading(false);
        window.location.reload();
      });
  };

  const buyNFT = (tokenId, price) => {
    setLoading(true);
    NFTContract?.methods
      ?.buyToken(tokenId)
      .send({ from: accountAddress, value: price })
      .on("confirmation", () => {
        setLoading(false);
        window.location.reload();
      });
  };

  // const connectToMetamaskHandler = async () => {
  //   await connectToMetamask();
  //   await loadWeb3();
  //   await loadBlockchainData();
  //   await setMetaData();
  // };

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
    mintMyNFT: mintMyNFT,
    uploadFileToIPFS: uploadFileToIPFS,
  };

  // useEffect(() => {
  //   // const isReload = localStorage?.getItem("isReload");
  //   // if(isReload == undefined) {
  //     // localStorage?.setItem("isReload", true);

  //   // else if(isReload) {
  //   //   localStorage?.setItem("isReload", false);
  //   //   return;
  //   // }
  // }, []);

  useEffect(() => {
    const getData = async () => {
      await loadWeb3();
      await loadBlockchainData();
    };

    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      await setMetaData();
    };

    getData();
  }, [NFTs?.length]);

  return (
    <BlockChainContext.Provider value={blockChainCtx}>
      {props?.children}
    </BlockChainContext.Provider>
  );
};
