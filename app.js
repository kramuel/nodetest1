/* Includes: */
var fs = require("fs");
var http = require("http");
var url = require("url");

/* Register server: */
http
  .createServer(function (req, res) {
    console.log("Serving " + req.url);

    var p = url.parse(req.url, true);

    if (req.url == "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write("<!DOCTYPE html>");
      res.write("<html>");
      res.write("<head>");
      res.write("<title>" + req.url + "</title>");
      res.write("</head>");
      res.write("<body>");
      res.write("<h1>" + req.url + "</h1>");
      res.write("<p>" + "my first paragrpah" + "</p>");
      res.write("</body>");
      res.write("</html>");
      res.end();
    } else if (p.pathname == "/calc") {
      fs.readFile("jscalc.html", function (err, data) {
        res.write(data);
        return res.end();
      });
    } else if (p.pathname == "/compute") {
      var adr = req.url;
      var q = url.parse(adr, true);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write("<!DOCTYPE html>");
      res.write("<html>");
      res.write("<head>");
      res.write("<title>" + q.search + "</title>");
      res.write("</head>");
      res.write("<body>");

      var X = q.query.x * 1,
        Y = q.query.y * 1,
        Z;
      switch (q.query.op) {
        case "plus":
          Z = X + Y;
          break;
        case "minus":
          Z = X - Y;
          break;
        case "times":
          Z = X * Y;
          break;
        case "div":
          Z = X / Y;
          break;
      }
      var resl = X + " " + q.query.op + " " + Y + " = " + Z;

      res.write("<h1>" + resl + "</h1>");
      res.write("<p>" + "my first http calc" + "</p>");
      res.write("</body>");
      res.write("</html>");
      res.end();
    } else if (p.pathname == "/") {
      fs.readFile("counter.html", function (err, data) {
        res.write(data);
        return res.end();
      });
    }
  })
  .listen(8080);
