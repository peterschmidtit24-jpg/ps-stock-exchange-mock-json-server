
## Mock JSON Server

This folder contains the mock backend for the stock exchange simulator. It uses
`json-server` to expose the data in `db.json` as a REST API, so the React client
can load, create, update, and delete project data without a real database.

### Purpose

The mock server provides the app data during development:

- companies and their profile information
- stocks and their current prices
- certificates and bonds
- example transactions
- logo/image assets from the `assets` folder

The frontend reads from this server through `API_BASE_URL`, which is configured
in the client app. When the server is running locally, the API is available at:

```bash
http://localhost:5005
```

### How To Run

Install dependencies once:

```bash
npm install
```

Start the server:

```bash
npm start
```

For development with automatic restart when files change:

```bash
npm run dev
```

The server uses the `PORT` value from `.env` if it exists. If no port is set, it
uses port `5005`.

Example `.env`:

```bash
PORT=5005
```

### Main Files

```md
server.js
Starts the JSON server, enables default middleware, serves static assets, and
connects the API routes to `db.json`.

db.json
The mock database. Each top-level array becomes an API resource.

assets/
Contains company logo files used by the frontend. Image paths in `db.json`
should point to this folder, for example `/assets/SEA.png`.
```

### Available API Routes

Because `json-server` creates routes automatically from `db.json`, each
collection can be accessed directly:

```bash
GET    /companies
GET    /companies/:id
POST   /companies
PUT    /companies/:id
DELETE /companies/:id

GET    /stocks
GET    /stocks/:id
POST   /stocks
PUT    /stocks/:id
DELETE /stocks/:id
```

Other collections in `db.json`, such as `bonds`, `certificates`, or
`transactions`, are exposed in the same way.

### Relations

Related data is connected through id fields. For example, a stock belongs to a
company through `companyId`:

```json
{
  "id": "SEA",
  "companyId": "SEAL",
  "currentPrice": 71.25
}
```

This stock connects to the company with:

```json
{
  "id": "SEAL",
  "name": "Sea Limited"
}
```

The frontend can also request expanded company data with:

```bash
GET /stocks/SEA?_expand=company
```

### Logo Handling

Company logos are served from:

```bash
mock-json-server/assets
```

In `db.json`, each company should reference its logo with a public path:

```json
"image": "/assets/SEA.png"
```

When adding a new company:

1. Add the logo file to `mock-json-server/assets`.
2. Use a clear filename, preferably the stock ticker, such as `SEA.png`.
3. Update the company object in `db.json`.
4. Restart the mock server if needed.

### Data Handling Notes

The React app uses this server for CRUD actions. For example:

- Market page loads `/companies` and `/stocks`.
- Creating data sends `POST` requests.
- Updating data sends `PUT` requests.
- Deleting market entries sends `DELETE` requests.
- The next-day simulation updates stock prices with `PUT /stocks/:id`.

Changes made through the API are written directly into `db.json`. If the data
gets corrupted during testing, restore it from a backup copy such as
`db.json.v1` or from version control.

### Common Checks

If the frontend does not show data:

- Check that the mock server is running.
- Check that the client `API_BASE_URL` points to the correct port.
- Open `http://localhost:5005/stocks` in the browser.
- Make sure every stock has a matching company via `companyId`.
- Make sure image paths point to real files inside `assets/`.

---

Project description: p2-stock-exchange

MVP project 2: Stock exchange sim

Features:

1) JSON server for delivering the project data. Company data, stocks data. 1 company owns 2 stock types (stock, certificate, bond?)
   (games and companies)

CRUD

2) Mobile first design, list stocks to buy (limited example) (Available Stocks View list)
3) Pick a stock from the list to buy, buy button --> save it to the data base on json-server (start with a budget) (C)
4) After pick a detail page appears for sell/buy
5) Show the list of bought stocks (R)
6) simulate days passing and value exchange (e.g. a next day button) (U)
7) Sale stocks from the list (D). After pick from the bought list the details page for buy and sale appears. (Bought Stocks View list)
8) Budget view: stocks values gain/losses, evtl. curves, budget development

Beyound MVP:
Eventually connection to an external API for gathering real time data (otherwise simulation of stock price)
Integrating the external data
Show stock value curves and charts (use js chart library)
More complex view for PC UI

Components (derived from design):
1) pages:
Market
Portfolio
Budget
StockDetail
(Settings)
2) components
BottomToolBar (Buttons for Market, Portfolio, Budget)
TopToolBar (Pagename, Money, Changes in %, TimeButton (Days, Months, Years)
SearchBar (only of some pages: Market)
FilterBar (with buttons All, Stocks, Bonds, Certificates), only for Market view
List with List-RowElements (Company, WPK, Company Symbol, Current Value, Change since first day simulation) for Market, Porfolio, Budget
Chart component for showing stock chart
Chart component for showing budget development chart
Details-View:
  Your position bar
  BUy and Sell buttons
  Qualtity buttons (+, -, 10+, 10-, input)
  Total cost/Available cash infoBar
  Buy confirmation button
