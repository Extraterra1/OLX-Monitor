# OLX Monitor

Hi! this is a simple bot to monitor newly listed products on the website OLX (Portugal's eBay). Built in Node.JS using Axios and Cheerio. The bot crawls through every URL you feed it and then sends you a Telegram message if it finds a new product. It uses Telegraf.js to handle the Telegram Bot API.

Olá! Este é um bot simples para monitorizar os novos produtos listados no site OLX (eBay de Portugal). Construído em Node.JS usando Axios e Cheerio. O bot rastreia todos os URLs que lhe são fornecidos e envia uma mensagem de Telegram se encontrar um novo produto. Usa Telegraf.js para lidar com a API do Telegram.

Hola! este es un simple bot para monitorear los productos recién listados en el sitio web OLX (eBay de Portugal). Construido en Node.JS usando Axios y Cheerio. El bot rastrea a través de cada URL que le das y luego te envía un mensaje de Telegram si encuentra un nuevo producto. Utiliza Telegraf.js para manejar la API de Telegram.

## Getting Started

### Prerequisites

You obviously need [Node.JS](https://nodejs.org/en/download/current) to get this to work.

Using [Bash](https://git-scm.com/download/win) is reccomended

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Extraterra1/OLX-Monitor.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Make your .env file and add your Telegram Bot Key and the Chat ID where it's supposed to send the alerts.
   ```js
   BOT_KEY = "ENTER YOUR BOT KEY";
   CHAT_ID = "ENTER YOUR CHAT ID";
   ```
4. Create a new txt file called **"urls.txt"**. This is where you'll paste the URLs for every term you want to monitor.
   ```js
   https://www.olx.pt/tecnologia-e-informatica/computadores-informatica/componentes/q-fonte-alimenta%C3%A7%C3%A3o/?search%5Border%5D=created_at:desc&reason=observed_search
   https://www.olx.pt/tecnologia-e-informatica/computadores-informatica/componentes/q-rtx-3080/?search%5Border%5D=created_at:desc&search%5Bfilter_float_price:from%5D=300&search%5Bfilter_float_price:to%5D=450&reason=observed_search
   https://www.olx.pt/ads/q-RYZEN/?search%5Border%5D=created_at:desc&search%5Bfilter_float_price:from%5D=10&search%5Bfilter_float_price:to%5D=200&reason=observed_search
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Running

Time to get this started. Just open your console and type the next command

```js
   node index.js
```

After that you'll start to see your console light up.

The bot updates every 10 minutes by defaul, you can change this in index.js by altering the "interval" variable.

You can also just add a INTERVAL variable on your .env file

```js
const interval = 600000;
// change 60000 for your desired interval, keep in mind this is in miliseconds
// 1 minute = 60 seconds = 60000 ms
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## [](https://www.makeareadme.com/#license)License

[MIT](https://choosealicense.com/licenses/mit/)
