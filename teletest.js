import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

const app = new Telegraf("6156365798:AAGSth_AVl833DGcyJmABzg3nvwXTA6XyPA");
const chatId = "741910784";
const img = "https://ireland.apollo.olxcdn.com/v1/files/idqfu1eqi08q2-PT/image;s=200x0;q=50";
// app.telegram.sendMessage(chatId, "this is a test message");
const caption = `🔴 *NEW* listing\n\n🗨️Ryzen 5 5600 com cooler box\n💰*120 €*\n🔗[OLX](${img})`;
app.telegram.sendPhoto(chatId, { url: img }, { caption: caption, parse_mode: "MarkdownV2" });
