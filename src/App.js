import React from "react";
import { ethers } from "ethers";
import { Button } from "antd";
import "./App.css";

const LENS_PERIPHERY = "0x8C87ABf19e161009AA92494bb2fBc8484EaB7c3C"
const LENS_HUB = "0xA308bf7Cb21Da0EEC18Bbe422b27984cbF372FC2"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      provider: null,
      walletAddr: null,
      chainId: 0,
    };
  }

  connect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const network = await provider.getNetwork();
    const accounts = await provider.send("eth_requestAccounts", []);
    this.setState({
      chainId: network.chainId,
      walletAddr: accounts[0],
    });
  };


  setProfileMetadataURIWithSig = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const typedData = {
        types: {
          SetProfileMetadataURIWithSig: [
            { name: "profileId", type: "uint256" },
            { name: "metadata", type: "string" },
            { name: "nonce", type: "uint256" },
            { name: "deadline", type: "uint256" },
          ],
        },
        primaryType: "SetProfileMetadataURIWithSig",
        domain: {
          name: "LensPeriphery",
          version: "1",
          chainId: 80001,
          verifyingContract: LENS_PERIPHERY,
        },
        message: {
          profileId: 16, // replace your profile_id
          metadata: "test_metadata",
          nonce: 0, // LENS_PERIPHERY.sigNonces(<wallet_address>)
          deadline: 16946096450000,
        },
      };
      const signer = provider.getSigner();
      const signature = await signer._signTypedData(
        typedData.domain,
        typedData.types,
        typedData.message
      );
      console.log({ ...this.sliceSignature(signature) });
    } catch (error) {
      console.log(error);
    }
  };

  burnWithSig = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const typedData = {
        types: {
          BurnWithSig: [
            { name: "tokenId", type: "uint256" },
            { name: "nonce", type: "uint256" },
            { name: "deadline", type: "uint256" },
          ],
        },
        primaryType: "BurnWithSig",
        domain: {
          name: "Lens Protocol Profiles",
          version: "1",
          chainId: 80001,
          verifyingContract: LENS_HUB,
        },
        message: {
          tokenId: 16, // replace your profile_id
          nonce: 0, // LENS_HUB.sigNonces(<wallet_address>)
          deadline: 16946096450000,
        },
      };
      const signer = provider.getSigner();
      const signature = await signer._signTypedData(
        typedData.domain,
        typedData.types,
        typedData.message
      );
      console.log({ ...this.sliceSignature(signature) });
    } catch (error) {
      console.log(error);
    }
  };

  setDefaultProfileWithSig = async () => {
    try {
      const { walletAddr } = this.state
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const typedData = {
        types: {
          SetDefaultProfileWithSig: [
            { name: "wallet", type: "address" },
            { name: "profileId", type: "uint256" },
            { name: "nonce", type: "uint256" },
            { name: "deadline", type: "uint256" },
          ],
        },
        primaryType: "SetDefaultProfileWithSig",
        domain: {
          name: "Lens Protocol Profiles",
          version: "1",
          chainId: 80001,
          verifyingContract: LENS_HUB,
        },
        message: {
          wallet: walletAddr,
          profileId: 16, // replace your profile_id
          nonce: 0, // LENS_HUB.sigNonces(<wallet_address>)
          deadline: 16946096450000,
        },
      };
      const signer = provider.getSigner();
      const signature = await signer._signTypedData(
        typedData.domain,
        typedData.types,
        typedData.message
      );
      console.log({ ...this.sliceSignature(signature) });
    } catch (error) {
      console.log(error);
    }
  };

  setProfileImageURIWithSig = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const typedData = {
        types: {
          SetProfileImageURIWithSig: [
            { name: "profileId", type: "uint256" },
            { name: "imageURI", type: "string" },
            { name: "nonce", type: "uint256" },
            { name: "deadline", type: "uint256" },
          ],
        },
        primaryType: "SetProfileImageURIWithSig",
        domain: {
          name: "Lens Protocol Profiles",
          version: "1",
          chainId: 80001,
          verifyingContract: LENS_HUB,
        },
        message: {
          imageURI: "test_uri",
          profileId: 16, // replace your profile_id
          nonce: 0, // LENS_HUB.sigNonces(<wallet_address>)
          deadline: 16946096450000,
        },
      };
      const signer = provider.getSigner();
      const signature = await signer._signTypedData(
        typedData.domain,
        typedData.types,
        typedData.message
      );
      console.log({ ...this.sliceSignature(signature) });
    } catch (error) {
      console.log(error);
    }
  };

  commentWithSig = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const typedData = {
        types: {
          CommentWithSig: [
            { name: "profileId", type: "uint256" },
            { name: "contentURI", type: "string" },
            { name: "profileIdPointed", type: "uint256" },
            { name: "pubIdPointed", type: "uint256" },
            { name: "referenceModuleData", type: "bytes" },
            { name: "collectModule", type: "address" },
            { name: "collectModuleInitData", type: "bytes" },
            { name: "referenceModule", type: "address" },
            { name: "referenceModuleInitData", type: "bytes" },
            { name: "nonce", type: "uint256" },
            { name: "deadline", type: "uint256" },
          ],
        },
        primaryType: "CommentWithSig",
        domain: {
          name: "Lens Protocol Profiles",
          version: "1",
          chainId: 80001,
          verifyingContract: LENS_HUB,
        },
        message: {
          contentURI: "test_uri",
          profileId: 16,
          profileIdPointed: 1,
          pubIdPointed: 1,
          referenceModuleData: "0x",
          collectModule: "0xA11fc66eb7d554aE2eBFfe5533F44b8e75575eB0",
          collectModuleInitData: "0x0000000000000000000000000000000000000000000000000000000000000000",
          referenceModule: "0x0000000000000000000000000000000000000000",
          referenceModuleInitData: "0x",
          nonce: 0, // LENS_HUB.sigNonces(<wallet_address>)
          deadline: 16946096450000,
        },
      };
      const signer = provider.getSigner();
      const signature = await signer._signTypedData(
        typedData.domain,
        typedData.types,
        typedData.message
      );
      console.log({ ...this.sliceSignature(signature) });
    } catch (error) {
      console.log(error);
    }
  };

  postWithSig = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const typedData = {
        types: {
          PostWithSig: [
            { name: "profileId", type: "uint256" },
            { name: "contentURI", type: "string" },
            { name: "collectModule", type: "address" },
            { name: "collectModuleInitData", type: "bytes" },
            { name: "referenceModule", type: "address" },
            { name: "referenceModuleInitData", type: "bytes" },
            { name: "nonce", type: "uint256" },
            { name: "deadline", type: "uint256" },
          ],
        },
        primaryType: "PostWithSig",
        domain: {
          name: "Lens Protocol Profiles",
          version: "1",
          chainId: 80001,
          verifyingContract: LENS_HUB,
        },
        message: {
          profileId: 16,
          contentURI: "test_uri",
          collectModule: "0xA11fc66eb7d554aE2eBFfe5533F44b8e75575eB0",
          collectModuleInitData: "0x0000000000000000000000000000000000000000000000000000000000000000",
          referenceModule: "0x0000000000000000000000000000000000000000",
          referenceModuleInitData: "0x",
          nonce: 0, // LENS_HUB.sigNonces(<wallet_address>)
          deadline: 16946096450000,
        },
      };
      const signer = provider.getSigner();
      const signature = await signer._signTypedData(
        typedData.domain,
        typedData.types,
        typedData.message
      );
      console.log({ ...this.sliceSignature(signature) });
    } catch (error) {
      console.log(error);
    }
  };

  mirrorWithSig = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const typedData = {
        types: {
          MirrorWithSig: [
            { name: "profileId", type: "uint256" },
            { name: "profileIdPointed", type: "uint256" },
            { name: "pubIdPointed", type: "uint256" },
            { name: "referenceModuleData", type: "bytes" },
            { name: "referenceModule", type: "address" },
            { name: "referenceModuleInitData", type: "bytes" },
            { name: "nonce", type: "uint256" },
            { name: "deadline", type: "uint256" },
          ],
        },
        primaryType: "MirrorWithSig",
        domain: {
          name: "Lens Protocol Profiles",
          version: "1",
          chainId: 80001,
          verifyingContract: LENS_HUB,
        },
        message: {
          profileId: 16,
          profileIdPointed: 2,
          pubIdPointed: 2,
          contentURI: "test_uri",
          referenceModuleData: "0x",
          referenceModule: "0x0000000000000000000000000000000000000000",
          referenceModuleInitData: "0x",
          nonce: 0, // LENS_HUB.sigNonces(<wallet_address>)
          deadline: 16946096450000,
        },
      };
      const signer = provider.getSigner();
      const signature = await signer._signTypedData(
        typedData.domain,
        typedData.types,
        typedData.message
      );
      console.log({ ...this.sliceSignature(signature) });
    } catch (error) {
      console.log(error);
    }
  };

  setDispatcherWithSig = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const typedData = {
        types: {
          SetDispatcherWithSig: [
            { name: "profileId", type: "uint256" },
            { name: "dispatcher", type: "address" },
            { name: "nonce", type: "uint256" },
            { name: "deadline", type: "uint256" },
          ],
        },
        primaryType: "SetDispatcherWithSig",
        domain: {
          name: "Lens Protocol Profiles",
          version: "1",
          chainId: 80001,
          verifyingContract: LENS_HUB,
        },
        message: {
          profileId: 16,
          dispatcher: "0xA11fc66eb7d554aE2eBFfe5533F44b8e75575eB0",
          nonce: 0, // LENS_HUB.sigNonces(<wallet_address>)
          deadline: 16946096450000,
        },
      };
      const signer = provider.getSigner();
      const signature = await signer._signTypedData(
        typedData.domain,
        typedData.types,
        typedData.message
      );
      console.log({ ...this.sliceSignature(signature) });
    } catch (error) {
      console.log(error);
    }
  };

  followWithSig = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const typedData = {
        types: {
          FollowWithSig: [
            { name: "profileIds", type: "uint256[]" },
            { name: "datas", type: "bytes[]" },
            { name: "nonce", type: "uint256" },
            { name: "deadline", type: "uint256" },
          ],
        },
        primaryType: "FollowWithSig",
        domain: {
          name: "Lens Protocol Profiles",
          version: "1",
          chainId: 80001,
          verifyingContract: LENS_HUB,
        },
        message: {
          profileIds: [2, 16],
          datas: ["0x", "0x"],
          nonce: 0, // LENS_HUB.sigNonces(<wallet_address>)
          deadline: 16946096450000,
        },
      };
      const signer = provider.getSigner();
      const signature = await signer._signTypedData(
        typedData.domain,
        typedData.types,
        typedData.message
      );
      console.log({ ...this.sliceSignature(signature) });
    } catch (error) {
      console.log(error);
    }
  };

  setFollowModuleWithSig = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const typedData = {
        types: {
          SetFollowModuleWithSig: [
            { name: "profileId", type: "uint256" },
            { name: "followModule", type: "address" },
            { name: "followModuleInitData", type: "bytes" },
            { name: "nonce", type: "uint256" },
            { name: "deadline", type: "uint256" },
          ],
        },
        primaryType: "SetFollowModuleWithSig",
        domain: {
          name: "Lens Protocol Profiles",
          version: "1",
          chainId: 80001,
          verifyingContract: LENS_HUB,
        },
        message: {
          profileId: 16,
          followModule: "0x0000000000000000000000000000000000000000",
          followModuleInitData: "0x",
          nonce: 0, // LENS_HUB.sigNonces(<wallet_address>)
          deadline: 16946096450000,
        },
      };
      const signer = provider.getSigner();
      const signature = await signer._signTypedData(
        typedData.domain,
        typedData.types,
        typedData.message
      );
      console.log({ ...this.sliceSignature(signature) });
    } catch (error) {
      console.log(error);
    }
  };

  sliceSignature = signature => {
    let r = signature.slice(0, 66);
    let s = "0x" + signature.slice(66, 130);
    let v = "0x" + signature.slice(130, 132);
    v = Number(v);

    if (v < 27) {
      v = v + 27;
    }

    return { v, r, s };
  };

  render () {
    const { walletAddr, chainId } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p>Address: {walletAddr}</p>
          <p>ChainID: {chainId}</p>
          <br />
          <Button type={"primary"} onClick={this.connect}>
            Connect
          </Button>
          <br />
          <Button type={"primary"} onClick={this.setProfileMetadataURIWithSig}>
            SetProfileMetadataURIWithSig
          </Button>
          <br />
          <Button type={"primary"} onClick={this.burnWithSig}>
            BurnWithSig
          </Button>
          <br />
          <Button type={"primary"} onClick={this.setDefaultProfileWithSig}>
            SetDefaultProfileWithSig
          </Button>
          <br />
          <Button type={"primary"} onClick={this.setProfileImageURIWithSig}>
            setProfileImageURIWithSig
          </Button>
          <br />
          <Button type={"primary"} onClick={this.commentWithSig}>
            CommentWithSig
          </Button>
          <br />
          <Button type={"primary"} onClick={this.postWithSig}>
            PostWithSig
          </Button>
          <br />
          <Button type={"primary"} onClick={this.setDispatcherWithSig}>
            SetDispatcherWithSig
          </Button>
          <br />
          <Button type={"primary"} onClick={this.mirrorWithSig}>
            MirrorWithSig
          </Button>
          <br />
          <Button type={"primary"} onClick={this.followWithSig}>
            FollowWithSig
          </Button>
          <br />
          <Button type={"primary"} onClick={this.setFollowModuleWithSig}>
            SetFollowModuleWithSig
          </Button>
          <br />
        </header>
      </div>
    );
  }
}

export default App;
