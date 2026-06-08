try {
  process.loadEnvFile(); // load environment variables from .env, if the file exists
} catch (error) {
  console.warn('.env file not found, using default environment variables.');
}

const jsonServer = require('json-server'); // import json-server to create a mock REST API (mock server)
const path = require('path');

const server = jsonServer.create(); // initialize the server instance

const middlewares = jsonServer.defaults(); // apply json-server default middleware (logger, static, CORS, no-cache)
server.use(middlewares);

// __dirname gives the absolute path to the directory containing this server.js file, so we can serve static assets from there
// e.g.  E:\Projects2025\Ironhack-Courses\ironhack\module3\p2-stock-exchange\mock-json-server
// join add assets to it: E:\Projects2025\Ironhack-Courses\ironhack\module3\p2-stock-exchange\mock-json-server\assets
server.use('/assets', jsonServer.defaults({ static: path.join(__dirname, 'assets') }));

const router = jsonServer.router('db.json'); // create a router backed by db.json for automatic CRUD routes
server.use(router);

const PORT = process.env.PORT || 5005; // use PORT from env or fallback to 5005

// start listening for incoming requests
server.listen(PORT, () => {
  console.log(`JSON Server is running at port ${PORT}`);
  console.log(`Local Access at http://localhost:${PORT}`);
});

//* To run the server:
// 1. (optional) Add local `.env` file with your preferred PORT value.
// 2. Add mock data to db.json as needed.
//    - Use lowercase, plural collection names, e.g. "recipes"
//    - Include an "id" property for each item; string IDs are preferred.
//    - Model relations with singular property names ending in "Id", e.g. "recipeId"
// 3. Start the server with `npm start` or `npm run dev`

// if its pointing to the old origin of the biolerplate server ############
// git remote set-url origin https://github.com/peterschmidtit24-jpg/p2-stock-exchange.git
// That updates the origin remote from the old boilerplate repo to your GitHub repo.
// Then I pushed your existing commit with:
// git push -u origin main

// free icons from page https://uxwing.com/
