const request = require("sync-request");
const axios = require("axios");
const fetch = require("node-fetch");
const fs = require("fs");
const etherscanApi = require("etherscan-api");
const abiDecoder = require("abi-decoder");


// Ваш API-ключ etherscan.io
const apiKey = "CCWD3ZMYTCC5PPPBMKDIQ7TWQMN4FB167T";

// 
const network = "mainnet"; // Replace with the desired Ethereum network

// Адресат транзакцій
const adress = "0x9Db7378614d8d9D7149c4eE4763F88c38F9B1517";

//Дати початку та кінця парсингу
const startDate = "2023-05-10T00:00:00Z";
const endDate =   "2023-06-01T00:00:00Z";

//Function for converting date string to UNIX format
function convertDateToUnixTime(dateString) {
  return new Date(dateString).getTime() / 1000;
}

//Конвертуємо дату у формат UNIX
const startDateUnix = convertDateToUnixTime(startDate);
console.log("startDateUnix: " + startDateUnix);
const endDateUnix = convertDateToUnixTime(endDate);
console.log("endDateUnix: " + endDateUnix);

//Функція отримання найближчого до "timestamp" блоку
function getBlockNumberByTime(timestamp) {
  const url = `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${apiKey}`;

  return axios
    .get(url)
    .then((response) => {
      const data = response.data;
      const blockNumber = data.result;
      return blockNumber;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Getting number of start block
const startBlockNumber = getBlockNumberByTime(startDateUnix).then((blockNumber) => {
  console.log("startBlockNumber:", blockNumber);
});

// Getting number of end block
const endBlockNumber = getBlockNumberByTime(endDateUnix).then(
  (blockNumber) => {
    console.log("endBlockNumber:  ", blockNumber);
  }
);


// Функція для отримання транзакцій і збереження у json
const startBlock = startBlockNumber; // Start block number
const endBlock = "latest"; // End block number or "latest"
const page = 1; // Page number
const offset = 100; // Max records to return
const sort = "asc"; // Sort order (asc/desc)

const api = etherscanApi.init(apiKey, network);

async function fetchTransactionsAndSaveToFile() {
  try {
    const result = await api.account.txlist(
      adress,
      startBlock,
      endBlock,
      page,
      offset,
      sort
    );
    const jsonData = JSON.stringify(result.result, null, 2);
    console.log('start block:'); 
    console.log(result.result[0]);
    console.log("end block:");
    console.log(result.result[result.result.length - 1]);
    fs.writeFileSync(`./temp/${adress}.json`, jsonData);
    console.log(`Transaction data saved to ${adress}.json`);
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchTransactionsAndSaveToFile();