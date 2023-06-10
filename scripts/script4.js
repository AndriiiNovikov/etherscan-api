const axios = require("axios");

// Ваш API-ключ etherscan.io
const apiKey = "CCWD3ZMYTCC5PPPBMKDIQ7TWQMN4FB167T";

// Адресат транзакцій
const recipientAddress = "0x9Db7378614d8d9D7149c4eE4763F88c38F9B1517";

// Функція для отримання списку усіх транзакцій
async function getAllTransactions() {
  try {
    const apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${recipientAddress}&apikey=${apiKey}`;

    const response = await axios.get(apiUrl);
    const transactions = response.data.result;

    console.log("Список усіх транзакцій:");
    console.log(transactions);
    console.log("Lastone:");
    console.log(transactions[transactions.length -1]);
  } catch (error) {
    console.error("Помилка при отриманні списку транзакцій:", error);
  }
}

// Виклик функції для отримання списку усіх транзакцій
getAllTransactions();
