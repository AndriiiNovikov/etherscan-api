async function main() {
  // make an API call to the ABIs endpoint
  const response = await fetch(
    "https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=0x0124D0fA0DfB1430dFcff16eC6A96945E7a0BC10&apikey=CCWD3ZMYTCC5PPPBMKDIQ7TWQMN4FB167T"
  );
  const data = await response.json();

  // print the JSON response
  let abi = data.result;
  console.log(abi);
}

main();
