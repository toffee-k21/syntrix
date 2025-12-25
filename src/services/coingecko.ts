import axios from "axios";

export async function fetchPrices() {
  const res = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price",
    {params: {ids:"bitcoin,ethereum",vs_currencies:"usd" } }
  );

  return {
    BTC: res.data.bitcoin.usd,
    ETH: res.data.ethereum.usd
    };
}