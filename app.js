const fs = require("node:fs")
const http = require("http");
const { createServer } = require("node:http");

let server = createServer((req,res)=>{
    if (req.url == "/") {
      fs.readFile("./views/index.html", (err, page) => {
        if (err) {
          console.log(err);
        } else {
          res.write(page);
          res.end();
        }
      });
    } else if (req.url == "/literature") {
      fs.readFile("./views/adabiyot.html", (err, page) => {
        if (err) {
          console.log(err);
        } else {
          res.write(page);
          res.end();
        }
      });
    } else if (req.url == "/articles") {
      fs.readFile("./views/maqola.html", (err, page) => {
        if (err) {
          console.log(err);
        } else {
          res.write(page);
          res.end();
        }
      });
    } else if (req.url == "/dissertation") {
      fs.readFile("./views/dissertatsiya.html", (err, page) => {
        if (err) {
          console.log(err);
        } else {
          res.write(page);
          res.end();
        }
      });
    } else if (req.url == "/monograph") {
      fs.readFile("./views/monografiya.html", (err, page) => {
        if (err) {
          console.log(err);
        } else {
          res.write(page);
          res.end();
        }
      });
    } else if (req.url == "/universities") {
      fs.readFile("./views/muassasa.html", (err, page) => {
        if (err) {
          console.log(err);
        } else {
          res.write(page);
          res.end();
        }
      });
    } else if (req.url == "/authors") {
      fs.readFile("./views/muallif.html", (err, page) => {
        if (err) {
          console.log(err);
        } else {
          res.write(page);
          res.end();
        }
      });
    } else if (req.url == "/journals") {
      fs.readFile("./views/jurnal.html", (err, page) => {
        if (err) {
          console.log(err);
        } else {
          res.write(page);
          res.end();
        }
      });
    }else{
        fs.readFile("./views/404.html", (err, page) => {
          if (err) {
            console.log(err);
          } else {
            res.write(page);
            res.end();
          }
        });
    }
})


server.listen(3000, "localhost", (error)=>{
    if(error){
        console.log(err);
        
    }else{
        console.log("Server running on port: 3000");
    }
})