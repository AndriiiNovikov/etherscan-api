const etherscanApi = require("etherscan-api");

const apiKey = "CCWD3ZMYTCC5PPPBMKDIQ7TWQMN4FB167T"; // Замініть на свій API-ключ etherscan.io
const network = "mainnet"; // Замініть на бажану мережу Ethereum
const transactionHash =
  "0x36946a9d0ee0d41038d6381d980e8ca7a6e00a5970fda310c0b32f8834d78cbb"; // Замініть на хеш транзакції, для якої ви хочете отримати інформацію

const api = etherscanApi.init(apiKey, network);

api.proxy
  .eth_getTransactionByHash(transactionHash)
  .then((transaction) => {
    console.log(transaction);
  })
  .catch((error) => {
    console.error("Помилка:", error);
  });
