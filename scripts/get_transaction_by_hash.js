const axios = require("axios");

async function getTransactionInfo(transactionHash) {
  const apiUrl = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${transactionHash}&apikey=CCWD3ZMYTCC5PPPBMKDIQ7TWQMN4FB167T`;

  try {
    const response = await axios.get(apiUrl);
    const transaction = response.data.result;

    // Вывод информации о транзакции
    console.log("Информация о транзакции:");
    console.log(transaction);

    // Получение адреса контракта, если транзакция связана с контрактом
    const contractAddress = transaction.to;

    if (contractAddress) {
      // Вызов функции для получения информации о свопах и транзакциях ERC-20 токенов
      await getContractTokenInfo(contractAddress, transactionHash);
    }
  } catch (error) {
    console.error(
      "Произошла ошибка при получении информации о транзакции:",
      error.message
    );
  }
}

// Замените 'YourApiKeyToken' на ваш собственный API-ключ Etherscan
getTransactionInfo(
  "0xbff4a1b9a1a57fcf11e96136f86bc1fe1e4a20749e724a0984a06dac24a7b52f"
);
