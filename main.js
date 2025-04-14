const http = require("http");
const fs = require("fs");
const url = require("url");

function readData() {
  return JSON.parse(fs.readFileSync("./data.json", "utf-8"));
}

function writeData(data) {
  fs.writeFileSync("./data.json", JSON.stringify(data));
}

let server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  const pathParts = pathname.split("/").filter(Boolean); 
  const path = pathParts[0];
  const id = pathParts[1];

  if (path == "products" && req.method == "GET" && query.limit && query.skip) {
    let data = readData();
    const limit = parseInt(query.limit);
    const skip = parseInt(query.skip);
    let from = limit * (skip - 1);
    const retData = data.slice(from, from + limit);

    res.end(JSON.stringify(retData));
  } 

  else if (path == "products" && req.method == "GET" && !id) {
    let data = readData();
    res.end(JSON.stringify(data));
  } else if (path == "products" && req.method == "GET" && id) {
    let data = readData();
    data = data.filter((val) => val.id == id);
    if (data.length) {
      res.end(JSON.stringify(data));
    } else {
      res.end("Not found product");
    }
  } else if (path == "products" && req.method == "DELETE" && id) {
    let data = readData();
    data = data.filter((val) => val.id != id);
    writeData(data);
    res.end("Deleted successfully");
  } else if (path == "products" && req.method == "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      let data = readData();
      data.push({
        id: data.length == 0 ? 1 : data.at(-1).id + 1,
        ...JSON.parse(body),
      });
      writeData(data);
      res.end("Product added successfully");
    });
  } else if (path == "products" && req.method == "PATCH" && id) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      data = readData();
      let findIndex = data.findIndex((val) => val.id == id);

      if (findIndex == -1) {
        res.end("Not found product");
      } else {
        data[findIndex] = {
          ...data[findIndex],
          ...JSON.parse(body),
        };
        writeData(data);
        res.end("Product updated successully");
      }
    });
  }else if(path == "products" && req.method == "GET" && query.search){
    let data = readData()
    let search = query.search.toString().toLowerCase();
    let retData = data.filter((item) =>
      item.name.toLowerCase().includes(search)
    );
    res.end(JSON.stringify(retData));

  }
});

server.listen(3000, () => {
  console.log(`Server running on port: 3000`);
});
