const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(proxy("/api/**", { // https://github.com/chimurai/http-proxy-middleware
    target: "http://localhost:5000",
    secure: false
  }));
};