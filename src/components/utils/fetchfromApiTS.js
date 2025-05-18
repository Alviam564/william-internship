import axios from "axios";

export const BASE_URL = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers'


export const fetchfromAPI = async () => {
  const { data } = await axios.get(BASE_URL);

  return data;
};