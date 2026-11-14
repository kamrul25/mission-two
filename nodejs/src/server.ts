import http from "node:http"

import fs from "node:fs/promises"
import path from "node:path"

const DB_PATH= path.join(process.cwd(), "books.json")
console.log(DB_PATH);


const server = http.createServer((req, res)=>{
    // console.log(req);
    
    // Get Book
    if (req?.url ==="/books" && req.method ==="GET") {
        console.log("I am in /books url");
        res.end(JSON.stringify({
    "id":2,
    "title":"Hasan Book",
    "author": "Hasan",
    "price":500
}));
        
    }


    res.writeHead(200, {"content-type":"application/json"});
    res.end(JSON.stringify({data:"Hello World. I am NodeJS server"}));
})  

server.listen(4000, ()=>{
    console.log("Server Running on port 4000");
    
});