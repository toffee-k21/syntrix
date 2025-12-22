import axios from "axios";

const VELYX_PUBLISH_URL ="https://velyx.me/publish";
const API_KEY = process.env.VELYX_API_KEY!;

export async function publishPriceEvent(data: {
  symbol:string;
  price:number;
  timestamp:number;
}) {
await axios.post(VELYX_PUBLISH_URL,
    {
        topic:"crypto:prices",
        payload: data
    },
    {
        headers: {
        "x-api-key" : `${API_KEY}`,
        "Content-Type" : "application/json"
        }
    }
  );
}

export async function publishUserAlertEvent(
    userId:string,
    data:any
) {
await axios.post(
    VELYX_PUBLISH_URL,
    {
        topic:`user:${userId}:alerts`,
        payload: data
    },
    {
        headers: {
        "x-api-key":`${API_KEY}`,
        "Content-Type":"application/json"
        }
    }
  );
}

