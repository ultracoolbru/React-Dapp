require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: {
        count: 10,
        initialIndex: 0,
        mnemonic: "test test test test test test test test test test test junk",
        path: "m/44'/60'/0'/0",
        accountsBalance: "1000000000000000000000000",
      },
    },
    goerli: {
      url: process.end.REACT_APP_INFURA_URL,
      accounts: [`0x${process.env.REACT_APP_META_PRIVATE_KEY}`],
    }
  },
};

//0x7849F95e1FcfAF5352658524A65Fe6E3081A5b9B
