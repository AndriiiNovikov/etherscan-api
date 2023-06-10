const request = require("sync-request");
const axios = require("axios");
// Ваш API-ключ etherscan.io
const apiKey = "CCWD3ZMYTCC5PPPBMKDIQ7TWQMN4FB167T";
//Дати початку та кінця парсингу
const startDate = "2023-05-10T00:00:00Z";

//Function for converting date string to UNIX format
function convertDateToUnixTime(dateString) {
  return new Date(dateString).getTime() / 1000;
}

const startDateUnix = convertDateToUnixTime(startDate);

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

// Example usage
getBlockNumberByTime(startDateUnix)
  .then((blockNumber) => {
  console.log("Block Number:", blockNumber);
});