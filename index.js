import axios from "axios";
import cheerio from "cheerio";
import { Telegraf } from "telegraf";
const app = new Telegraf("6156365798:AAGSth_AVl833DGcyJmABzg3nvwXTA6XyPA");
const chatId = "741910784";
const SPECIAL_CHARS = ["\\", "_", "*", "[", "]", "(", ")", "~", "`", ">", "<", "&", "#", "+", "-", "=", "|", "{", "}", ".", "!"];
const escapeMarkdown = (text) => {
  SPECIAL_CHARS.forEach((char) => (text = text.replaceAll(char, `\\${char}`)));
  return text;
};
const items = [];

setInterval(() => {
  (async () => {
    const response = await axios.get(
      "https://www.olx.pt/ads/q-RYZEN/?search%5Border%5D=created_at:desc&search%5Bfilter_float_price:from%5D=10&search%5Bfilter_float_price:to%5D=200&reason=observed_search"
    );
    const html = response.data;
    console.log(items.length);

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
        if (items.length > 5) {
          const caption = `🔴 *NEW* listing\n\n🗨️${escapeMarkdown(title)}\n💰*${price}€*\n`;
          const escapedCaption = caption + `🔗[OLX](${url})`;
          app.telegram.sendPhoto(chatId, { url: img }, { caption: escapedCaption, parse_mode: "MarkdownV2" });
        }
      }
    }
  })();
}, 600000);
