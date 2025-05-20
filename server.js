const http = require("http");
const fs = require("fs");

const PORT = 4000;

http
  .createServer(function (request, response) {
    console.log("Request starting...", new Date());

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
      "Access-Control-Max-Age": 2592000, // 30 days
    };

    // Handle preflight requests
    if (request.method === "OPTIONS") {
      response.writeHead(204, headers);
      response.end();
      return;
    }

    // Determine file path based on the request URL
    var filePath = "./videos/ipcam" + request.url;
    console.log(`Requested file path: ${filePath}`);

    // Read the file and serve it
    fs.readFile(filePath, function (error, content) {
      if (error) {
        if (error.code == "ENOENT") {
          // File not found, serve a custom 404 page
          fs.readFile("./404.html", function (error, content) {
            response.writeHead(404, headers);
            response.end(content, "utf-8");
          });
        } else {
          // Some other server error
          response.writeHead(500, headers);
          response.end(
            "Sorry, check with the site admin for error: " +
              error.code +
              " ..\n"
          );
        }
      } else {
        // Successfully found the file, send it back with a proper content-type
        response.writeHead(200, {
          "Content-Type": "video/mp4", // or adjust depending on your video type
          ...headers,
        });
        response.end(content, "utf-8");
      }
    });
  })
  .listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  });
