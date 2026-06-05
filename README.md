
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
8) Budget view: sotcks values gain/losses, evtl. curves, budget development

Beyound MVP:
Eventually connection to an external API for gathering real time data (otherwise simulation of stock price)
Integrating the external data
Show stock value curves and charts (use js chart library)
More complex view for PC UI