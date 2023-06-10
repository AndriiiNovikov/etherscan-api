//  JavaScript-скрипта, который использует axios для выполнения HTTP-запроса к API Etherscan 
//  и экспортирует полученные данные в формате JSON:

const axios = require("axios");
const fs = require("fs");

const walletAddress = "0x9Db7378614d8d9D7149c4eE4763F88c38F9B1517";
const apiKey = "CCWD3ZMYTCC5PPPBMKDIQ7TWQMN4FB167T";

const apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;

axios
  .get(apiUrl)
  .then((response) => {
    const transactions = response.data.result;
    console.log(transactions);

    // Экспорт данных в JSON файл
    fs.writeFileSync(
      "transactions.json",
      JSON.stringify(transactions, null, 2)
    );

    console.log(
      "Данные о транзакциях успешно сохранены в файл transactions.json"
    );
  })
  .catch((error) => {
    console.error("Произошла ошибка при получении данных:", error.message);
  });
