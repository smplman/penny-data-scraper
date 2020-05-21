import { restClient } from "polygon.io";
import * as dotenv from "dotenv";
import Axios from 'axios';
import Cheerio from 'cheerio';

dotenv.config();

// const Alpaca = require('@alpacahq/alpaca-trade-api');

// const alpaca: any = new Alpaca({
//   keyId: process.env.APCA_API_KEY_ID, 
//   secretKey: process.env.APCA_API_SECRET_KEY, 
//   paper: process.env.APCA_PAPER,
//   usePolygon: process.env.APCA_USE_POLYGON
// });

// const rest = restClient(process.env.APCA_API_KEY_ID);

// rest.reference.marketStatus().then((data: any) => {
//     console.log(data);
// });

const URL = 'https://stock-screener.org/high-volume-penny-stocks.aspx';

async function main() {
  let data: any = [];
  let response = await  Axios.get(URL);
  const $ = Cheerio.load(response.data);

  $('#aspnetForm table:nth-child(5) table tbody tr').each((i, el) => {
    data.push({
      symbol: $(el).find('td:nth-child(1)').text().trim(),
      open: parseFloat($(el).find('td:nth-child(3)').text().trim()),
      high: parseFloat($(el).find('td:nth-child(4)').text().trim()),
      low: parseFloat($(el).find('td:nth-child(5)').text().trim()),
      close: parseFloat($(el).find('td:nth-child(6)').text().trim()),
      volume: parseInt($(el).find('td:nth-child(7)').text().trim()),
      pc: parseFloat($(el).find('td:nth-child(8)').text().trim()) / 100,
    })
  });

  console.log(data);

}

main();
 