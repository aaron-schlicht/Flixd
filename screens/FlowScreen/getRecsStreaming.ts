import axios from "axios";
import { Service } from "../../types";

const API_KEY = "f03e1c9e7d2633ef0b20ab2c36cddb39";
const BASE_URL = `https://api.themoviedb.org/3/movie/`;

const getRecsStreaming = async (ids: number[]) => {
  let recsStreaming: Service[][] = [];

  for (const id of ids) {
    const res: any = await axios.get(
      BASE_URL + id + `/watch/providers?api_key=${API_KEY}&language=en-US`
    );
    if (res && res.results["US"] && res.results["US"].flatrate) {
      recsStreaming.push((res.results["US"].flatrate as Service[]) || []);
    }
  }

  return recsStreaming;
};

export default getRecsStreaming;
