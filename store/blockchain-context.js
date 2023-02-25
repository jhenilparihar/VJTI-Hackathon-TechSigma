import React, { useEffect, useContext, useState } from "react";
import Web3 from "web3";
import Marketplace from "../abis/Marketplace.json";
import axios from "axios";
import { useRouter } from "next/router";

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
  buyNFT: () => {},
  toggleForSale: () => {},
  changeTokenPrice: () => {},
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
    // if(!metamaskConnected) {
    await connectToMetamask();
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
        const NFTContract1 = new web3.eth.Contract(
          Marketplace.abi,
          networkData.address
        );
        setNFTContract(NFTContract1);
        setContractDetected(true);
        localStorage.setItem("NFTContract", NFTContract1);
        localStorage.setItem("contractDetected", contractDetected);

        const NFTCount = await NFTContract1.methods.NFTCounter().call();
        setNFTCount(NFTCount);
        localStorage.setItem("NFTCount", NFTCount);
        for (var i = 1; i <= NFTCount; i++) {
          const nft = await NFTContract1?.methods?.allNFTs(i).call();

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

        const ProfileCounter = await NFTContract1.methods.UserCounter().call();

        for (
          var profile_counter = 1;
          profile_counter <= ProfileCounter;
          profile_counter++
        ) {
          const address = await NFTContract1.methods
            .allAddress(profile_counter)
            .call();
          const profile = await NFTContract1.methods
            .allProfiles(address)
            .call();

          setAllUserProfile((p) => {
            let newState;
            newState = { ...p };
            newState[address] = profile;
            return newState;
          });
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

  const uploadProfile = async () => {
    const isProfileSet = await NFTContract?.methods
      ?.isProfileSet(accountAddress)
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
      NFTContract.methods
        .addUserProfile(
          "https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
          "https://blogs.airdropalert.com/wp-content/uploads/2021/12/Lazy-Lion-NFT-1005x1024.png",
          "@newUser",
          "New on the platform",
          accountAddress,
          "abc@gmail.com",
          overAllDate
        )
        .send({ from: accountAddress })
        .on("confirmation", () => {
          const router = useRouter();
          localStorage.setItem(this.state.accountAddress, new Date().getTime());
          this.setState({ loading: false });
          // window.location.reload();
          //router.reload();
        });
    }
  };

  const setMetaData = async () => {
    if (NFTs.length !== 0) {
      NFTs.map(async (nft) => {
        const result = await fetch(nft?.tokenURI);
        const metaData = await result.json();
        setNFTs((prevState) => {
          const newState = prevState.map((nft) => {
            return parseInt(nft?.tokenId) === Number(metaData.tokenId)
              ? {
                  ...nft,
                  metaData,
                }
              : nft;
          });
          console.log(newState);
          return newState;
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

  const mintMyNFT = async (
    fileUrl,
    name,
    tokenPrice,
    description,
    fileType
  ) => {
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
        ?.mintNFT(name, tokenURI, price, fileUrl, description)
        .send({ from: accountAddress })
        .on("confirmation", () => {
          localStorage.setItem(accountAddress, new Date().getTime());
          setLoading(false);
          // window.location.reload();
        });
      const mintedNFT = {
        tokenName: name,
        tokenId: tokenId,
        tokenImage: fileUrl,
        tokenType: fileType,
        tokenDesc: description,
        currentOwner: accountAddress,
        previousOwner: "0x00",
        price: price,
        mintedBy: accountAddress,
        tokenURI: tokenURI,
      };
      try {
        const result = await axios.post(
          "https://vjtihackathon.pythonanywhere.com/login/createcontent/",
          mintedNFT
        );
        console.log(result);
      } catch (error) {
        console.log(error);
      }
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
    console.log(tokenId, typeof tokenId)
    setLoading(true);
    NFTContract?.methods
      ?.toggleForSale(tokenId)
      .send({ from: accountAddress })
      .on("confirmation", () => {
        setLoading(false);
        //window.location.reload();
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
        //window.location.reload();
      });
  };

  const buyNFT = (tokenId, price) => {
    console.log(tokenId, typeof tokenId, price, typeof price, "tt");
    setLoading(true);
    NFTContract?.methods
      ?.buyToken(tokenId)
      .send({ from: accountAddress, value: price })
      .on("confirmation", () => {
        setLoading(false);
        //window.location.reload();
      });
  };

  const buyNFT2 = (tokenId, price) => {
    console.log(tokenId, typeof tokenId, price, typeof price, "tt");
    setLoading(true);
    fetch("./file.json")
      .then((response) => response.json())
      .then((jsonObject) => console.log(jsonObject[0]));

    NFTContract?.methods
      ?.buyToken2("0xdeF7796A0cE84Dd02cAA8bDD2C044d41a68C2dbd", tokenId)
      .send({ from: accountAddress, value: price })
      .on("confirmation", () => {
        setLoading(false);
        //window.location.reload();
      });
  };

  const connectToMetamaskHandler = async () => {
    await loadWeb3();
    await loadBlockchainData();
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
    mintMyNFT: mintMyNFT,
    uploadFileToIPFS: uploadFileToIPFS,
    buyNFT: buyNFT,
    buyNFT2: buyNFT2,
    toggleForSale: toggleForSale,
    changeTokenPrice: changeTokenPrice,
    connectToMetamask: connectToMetamask,
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
  const getData = async () => {
    await loadWeb3();
    await loadBlockchainData();
  };
  useEffect(() => {
    console.log("hey", localStorage.getItem("isReload"));
    localStorage.getItem("isReload") && getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      await setMetaData();
    };

    getData();
  }, [NFTs?.length]);

  const setProfile = async () => {
    if (accountAddress && NFTContract) {
      {
        await uploadProfile();
      }
    }
  };
  useEffect(() => {
    setProfile();
  }, [NFTContract]);

  return (
    <BlockChainContext.Provider value={blockChainCtx}>
      {props?.children}
    </BlockChainContext.Provider>
  );
};
