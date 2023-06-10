const request = require("sync-request");
const axios = require("axios");
const fetch = require("node-fetch");
const fs = require("fs");
const etherscanApi = require("etherscan-api");


// Ваш API-ключ etherscan.io
const apiKey = "CCWD3ZMYTCC5PPPBMKDIQ7TWQMN4FB167T";

// Адресат транзакцій
const recipientAddress = "0x9Db7378614d8d9D7149c4eE4763F88c38F9B1517";

//Дати початку та кінця парсингу
const startDate = "2023-05-10T00:00:00Z";

const endDate = "2023-06-01T00:00:00Z";

// Останній отриманий блок
const lastBlockNumber = 17396129;

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



// Функція для отримання наступних транзакцій
async function getNextTransactions() {
  try {
    const startBlock = lastBlockNumber + 1;
    const apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${recipientAddress}&startblock=${startBlock}&apikey=${apiKey}`;

    const response = await axios.get(apiUrl);
    const transactions = response.data.result;

    // console.log("Наступні транзакції:");
    // console.log(transactions);
    console.log("lastBlock:");
    console.log(transactions[transactions.length - 1]);
  } catch (error) {
    console.error("Помилка при отриманні наступних транзакцій:", error);
  }
}

// Виклик функції для отримання наступних транзакцій
getNextTransactions();
