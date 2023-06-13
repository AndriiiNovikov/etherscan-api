//  JavaScript-скрипта, который использует axios для выполнения HTTP-запроса к API Etherscan
//  и экспортирует полученные данные в формате JSON:

const axios = require("axios");
const fs = require("fs");

// const walletAddress = "0x9Db7378614d8d9D7149c4eE4763F88c38F9B1517";
const apiKey = "CCWD3ZMYTCC5PPPBMKDIQ7TWQMN4FB167T";
const transactionHash =  "0x18d35e664372190f0b16dada83b06f892eea334e07198e78f34e2dde34f7acea";

// const apiUrl = `https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${transactionHash}&apikey=${apiKey}`;
const apiUrl = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash=${transactionHash}&apikey=${apiKey};`

axios
  .get(apiUrl)
  .then((response) => {
    const transactions = response.data.result;
    console.log(transactions);

    // Экспорт данных в JSON файл
    fs.writeFileSync(
      "tmp/transactionReseipt.json",
      JSON.stringify(transactions, null, 2)
    );

    console.log(
      "Данные о транзакциях успешно сохранены в файл transactionReseipt.json"
    );
  })
  .catch((error) => {
    console.error("Произошла ошибка при получении данных:", error.message);
  });
