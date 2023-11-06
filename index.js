const ethers = require("ethers");

async function vicGasless() {
  const typedData = {
    types: {
      Metadata: [
        {
          name: "value",
          type: "string",
        },
        {
          name: "deadline",
          type: "string",
        },
      ],
      Transfer: [
        {name: "sender", type: "address"},
        {name: "receiver", type: "address"},
        {name: "metadata", type: "Metadata"},
        {name: "value", type: "uint256"},
        {name: "nonce", type: "uint256"},
        {name: "deadline", type: "uint256"},
      ],
    },
    primaryType: "Transfer",
    domain: {
      name: "Vie Coin",
      version: "1",
      chainId: 97,
      verifyingContract: "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8", // vic address
    },
    message: {
      sender: "0x00d8aCf6554E80C92E23cfB80e8C4f99fbb9Bc06",
      receiver: "0x2113685F4B766b6df209f0A9Aa74A9F67606560c",
      metadata: {
        value: "10,000 VIC", // 10,000 VIC
        deadline: "08-31-2023 10:08",
      },
      value: ethers.utils.parseUnits("1", 18), // 1000000000000000000
      nonce: 1, // VIC.nonceOf(owner) + 1
      deadline: 1687949677246,
    },
  };
  let privateKey =
    "084a736dcffb8985e191333dcfaa107e17257f1d6e57036e10612e5d9706bc35";
  let wallet = new ethers.Wallet(privateKey);
  const signature = await wallet._signTypedData(
    typedData.domain,
    typedData.types,
    typedData.message
  );
  console.log({...sliceSignature(signature)});
}

function sliceSignature(signature) {
  let r = signature.slice(0, 66);
  let s = "0x" + signature.slice(66, 130);
  let v = "0x" + signature.slice(130, 132);
  v = Number(v);

  if (v < 27) {
    v = v + 27;
  }

  return {r, s, v};
}

vicGasless();
