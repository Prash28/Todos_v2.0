//Postgres DB server

import express from "express";
import cors from "cors";
import pool from "./database.js";
// import pool from "./database.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/getitems",(req,res) =>{
    const get_stmt = "select * from tododetails;"
    pool.query(get_stmt)
        .then((resp) =>{
            console.log(resp);
            res.send(resp["rows"]);
        })
        .catch((e) =>{
            console.log(e);
        })
})
app.post("/additem", async (req, res) => {
    const id = req.body["id"];
    const title = req.body["title"];
    const description = req.body["description"];
    const status = req.body["status"];
    
    const insert_stmt = `insert into tododetails(id, title, description, status) values(${id}, '${title}', '${description}', '${status}');`
    pool.query(insert_stmt)
        .then((res) => {
            console.log("data saved");
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })

    res.send("Response received "+req.body)
});

app.listen(4000, () => console.log("server1 is running in port 4000"));