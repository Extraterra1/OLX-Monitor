import "dotenv/config";

import axios from "axios";
import cheerio from "cheerio";
import { Telegraf } from "telegraf";
import { promisify } from "util";
import fs from "fs";

const app = new Telegraf(process.env.BOT_KEY);
const chatId = process.env.CHAT_ID;

//TIME BETWEEN SEARCHES
const interval = process.env.INTERVAL || 600000;

const SPECIAL_CHARS = ["\\", "_", "*", "[", "]", "(", ")", "~", "`", ">", "<", "&", "#", "+", "-", "=", "|", "{", "}", ".", "!"];
const escapeMarkdown = (text) => {
  SPECIAL_CHARS.forEach((char) => (text = text.replaceAll(char, `\\${char}`)));
  return text;
};

const items = [];
const readFileAsync = promisify(fs.readFile);
const getUrls = async () => {
  const data = await readFileAsync("urls.txt");
  return data.toString().split("\n");
};
const urls = await getUrls();

for (const url of urls) {
  setInterval(() => {
    (async () => {
      //get search term
      let term;
      if (url.match(/q-(.*?)(?=\/)/)) {
        term = decodeURIComponent(url.match(/q-(.*?)(?=\/)/)[1]).replace("-", " ");
      } else {
        term = "no term";
      }
      console.log(`Fetching ${term}`);
      const response = await axios.get(url);
      const html = response.data;

      // Use Cheerio to parse the HTML
      const $ = cheerio.load(html);
      const list = $(".css-1sw7q4x").splice(0, 5);

      for (const e of list) {
        const title = $(e).find(".css-16v5mdi").text();
        const priceStr = $(e).find(".css-10b0gli").text();
        const price = priceStr
          .split("€")[0]
          .replace(/\..*}(.*)/, "$1")
          .replace(/\D/g, "");
        const url = "https://www.olx.pt" + $(e).find(".css-rc5s2u").attr("href");
        const img = $(e).find(".css-gl6djm img").attr("src");
        const id = url
          .substring(url.lastIndexOf("/") + 1, url.lastIndexOf("."))
          .split("-")
          .slice(-1)
          .toString();
        const itemToPush = {
          title: title,
          price: price,
          url: url,
          img: img,
          id: id,
        };
        const index = items.findIndex((e) => e.id == id);
        if (index === -1) {
          items.push(itemToPush);
          console.log(`Inserted ${title} ${price}€`);
          if (items.length > urls.length * 5) {
            const caption = `🔴 *NEW* listing\n\n🗨️${escapeMarkdown(title)}\n💰*${price}€*\n`;
            const escapedCaption = caption + `🔗[OLX](${url})\nSearch Term: "${term}"`;
            app.telegram.sendPhoto(chatId, { url: img }, { caption: escapedCaption, parse_mode: "MarkdownV2" });
          }
        }
      }
    })();
  }, interval);
}
