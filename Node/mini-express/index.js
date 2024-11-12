const http = require("http");
const url = require("url");

const allowMethods = (http.METHODS ?? []).map((method) => method.toLowerCase());

console.log(allowMethods);

function App() {
  this._router = new Router();
}
function Router() {
  this.stack = [];
}

allowMethods.forEach((method) => {
  Router.prototype[method] = function (path, handler) {
    this.stack.push({
      path,
      method,
      handler,
    });
  };
});

/* Router.prototype.handle = function (req, res) {
  const url = req.url;
  const method = (req.method || "get").toLowerCase();
  const target = this.stack.find(
    (item) => item.method === method && item.path === url
  );
  if (target) {
    return target.handler(req, res);
  }
  return res.end("Not Found");
}; */

// --------- 支持中间件 -----------
Router.prototype.handle = function (req, res) {
  const url = req.url;
  const method = (req.method || "get").toLowerCase();
  let idx = 0;
  const next = () => {
    if (idx >= this.stack.length) {
      return;
    }
    const route = this.stack[idx++];
    if (route && route.method === method && route.path === url) {
      route.handler(req, res, next);
    } else {
      next();
    }
  };
  next();
};

allowMethods.forEach((method) => {
  App.prototype[method] = function (path, handler) {
    this._router[method](path, handler);
  };
});

App.prototype.listen = function (...args) {
  const server = http.createServer((req, res) => {
    this._router.handle(req, res);
  });
  server.listen(...args);
};

const express = function () {
  const app = new App();
  return app;
};

// ----------------- 使用 ---------------
const application = express();
application.get("/", (req, res, next) => {
  console.log("next-before");
  res.end("home");
  next();
  console.log("next-after");
});

application.get("/user", (req, res, next) => {
  console.log("user1");
  setTimeout(() => {
    next();
  }, 1000);
});
application.get("/user", (req, res) => {
  console.log("user2");
  res.end("user page");
});
application.get("/about", (req, res) => {
  res.end("about page");
});
application.listen(5050, () => {
  console.log("mini-express start at port 5050");
});
