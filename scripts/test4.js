const Web3 = require("web3");
const fs = require("fs");

// Создание экземпляра веб-провайдера Ethereum (указать свой провайдер)
const web3 = new Web3("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID");

// Адрес контракта
const contractAddress = "";

// Создание фильтра для получения логов
const filter = {
  address: contractAddress,
  fromBlock: 0,
  toBlock: "latest",
  topics: [],
};

// Запрос логов
web3.eth
  .getPastLogs(filter)
  .then((logs) => {
    // Сохранение логов в JSON-файл
    const logsJSON = JSON.stringify(logs);
    fs.writeFileSync("logs.json", logsJSON);

    console.log("Логи успешно сохранены в logs.json");
  })
  .catch((error) => {
    console.error("Произошла ошибка при получении логов:", error);
  });
