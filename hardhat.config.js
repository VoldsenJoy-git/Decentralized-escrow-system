require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks:{
    sepolia:{
      // chainId: 11155111,
      url:'https://eth-sepolia.g.alchemy.com/v2/LZoAWC2ZBiuMI4oMO6lOqqEqUkozpji2',
      accounts:['6e8be580680261f1aa63b3fca92c1e457b585f9c52fc0c50ecd90c41466f2c9a'],
    },
  },
  paths :{
    artifacts : "./front_end/src/artifacts",
  },
};
// require('@nomiclabs/hardhat-waffle');

// module.exports = {
//   solidity: '0.8.0',
//   networks: {
//     sepolia: {
//       url: 'https://eth-sepolia.g.alchemy.com/v2/LZoAWC2ZBiuMI4oMO6lOqqEqUkozpji2',
//       accounts: ['6e8be580680261f1aa63b3fca92c1e457b585f9c52fc0c50ecd90c41466f2c9a'],
//     },
//   },
// };

