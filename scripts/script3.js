const axios = require("axios");

// Ваш API-ключ etherscan.io
const apiKey = "CCWD3ZMYTCC5PPPBMKDIQ7TWQMN4FB167T";

// Адресат арбітражних транзакцій
const recipientAddress = "0x9Db7378614d8d9D7149c4eE4763F88c38F9B1517";

// Функція для отримання списку арбітражних транзакцій
async function getArbitrageTransactions() {
  try {
    const apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${recipientAddress}&apikey=${apiKey}`;

    const response = await axios.get(apiUrl);
    const transactions = response.data.result;

    // Фільтрація транзакцій зі статусом "арбітраж"
    const arbitrageTransactions = transactions.filter(
      (tx) => tx.isError === "1"
    );

    console.log("Список арбітражних транзакцій:");
    console.log(arbitrageTransactions);
  } catch (error) {
    console.error(
      "Помилка при отриманні списку арбітражних транзакцій:",
      error
    );
  }
}

// Виклик функції для отримання списку арбітражних транзакцій
getArbitrageTransactions();
