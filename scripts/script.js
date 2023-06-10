const fs = require("fs");
const axios = require("axios");

// Встановіть ваш API-ключ etherscan.io
const apiKey = "CCWD3ZMYTCC5PPPBMKDIQ7TWQMN4FB167T";

// Хеш транзакції для отримання інформації
const transactionHash =
  "0x53ca35c905d1a2754b491fdd9f93adaf9082216029a45bd7245f9b2387d76cc5";

// URL запиту до etherscan-api
const apiUrl = `https://api.etherscan.io/api?module=account&action=txlistinternal&txhash=${transactionHash}&apikey=${apiKey}`;

// Виконуємо запит до etherscan-api
axios
  .get(apiUrl)
  .then((response) => {
    const swaps = response.data.result;

    // Збереження інформації про обміни у файл JSON
    const jsonData = JSON.stringify(swaps, null, 2);
    fs.writeFile("swaps.json", jsonData, (err) => {
      if (err) throw err;
      console.log("Інформація про обміни була збережена у файл swaps.json");
    });
  })
  .catch((error) => {
    console.error("Сталася помилка під час виконання запиту:", error);
  });
