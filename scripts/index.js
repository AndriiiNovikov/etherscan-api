const axios = require("axios");

// Ваш API-ключ etherscan.io
const apiKey = "CCWD3ZMYTCC5PPPBMKDIQ7TWQMN4FB167T";

// Хеш арбітражної транзакції
const transactionHash =
  "0xe752093cb2bfceb7227589f9baca10ef6585cfb899a78a918a128c4257d5ec46";

// Функція для отримання даних про переміщення токенів та обмін
async function getEventLogs() {
  try {
    const apiUrl = `https://api.etherscan.io/api?module=logs&action=getLogs&txhash=${transactionHash}&apikey=${apiKey}`;

    const response = await axios.get(apiUrl);
    const eventLogs = response.data.result;

    console.log("Дані про переміщення токенів та обмін:");
    console.log(eventLogs);
  } catch (error) {
    console.error(
      "Помилка при отриманні даних про переміщення токенів та обмін:",
      error
    );
  }
}

// Виклик функції для отримання даних про переміщення токенів та обмін
getEventLogs();
