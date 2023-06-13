const axios = require("axios");
const fs = require("fs");
const etherscanApi = require("etherscan-api");

const apiKey = "CCWD3ZMYTCC5PPPBMKDIQ7TWQMN4FB167T"; // Replace with your etherscan.io API key
const network = "mainnet"; // Replace with the desired Ethereum network
const adress = "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae"; // Replace with the target address
const startBlock = "1"; // Start block number
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
    fs.writeFileSync(`./tmp/${adress}.json`, jsonData);
    console.log("Transaction data saved to transactions.json");
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchTransactionsAndSaveToFile();
