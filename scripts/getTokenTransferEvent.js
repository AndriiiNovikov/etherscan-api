// tokentx
// [BETA] Get a list of "ERC20 - Token Transfer Events" by Address

// tokentx(address: string, contractaddress: string, startblock: string, endblock: string, page: number, offset: number, sort: string): Promise<object>
// Parameters
// address (string) Account address
// contractaddress (string) Address of ERC20 token contract (if not specified lists transfers for all tokens)
// startblock (string) start looking here
// endblock (string) end looking there
// page (number) Page number
// offset (number) Max records to return
// sort (string) Sort asc/desc
// Returns
// Promise<object>:
// Example
// var txlist = api.account.tokentx('0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae', '0x5F988D968cb76c34C87e6924Cc1Ef1dCd4dE75da', 1, 'latest', 'asc');

const axios = require("axios");

async function getTokenTransferEvents(
  address,
  contractAddress,
  startBlock,
  endBlock,
  page,
  offset,
  sort
) {
  const apiKey = "CCWD3ZMYTCC5PPPBMKDIQ7TWQMN4FB167T";
  const apiUrl = `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&contractaddress=${contractAddress}&startblock=${startBlock}&endblock=${endBlock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const result = response.data.result;

    // Вывод информации о событиях "ERC20 - Token Transfer"
    console.log('События "ERC20 - Token Transfer":');
    console.log(result);
  } catch (error) {
    console.error(
      'Произошла ошибка при получении событий "ERC20 - Token Transfer":',
      error.message
    );
  }
}

getTokenTransferEvents(
  "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
  "x5F988D968cb76c34C87e6924Cc1Ef1dCd4dE75da",
  1,
  "latest",
  1,
  10,
  "asc"
);
