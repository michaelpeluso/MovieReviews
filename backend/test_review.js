/* 
    Instructions and Answers
    https://docs.google.com/document/d/1YolkLe22-qsvYwuu8npriTbWSuwZacGWJDSocEbWkh4/edit
*/

import mongodb from "mongodb";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();
const port = 5000;

/* 
    #1
*/
async function getMongoDatabase() {
    const client = new mongodb.MongoClient(process.env.DB_URI);
    //console.log(await (await client.connect()).db("it302").collection("inventory").find({}).toArray());

    try {
        await client.connect();

        return client.db("it302");
    } catch (e) {
        return e;
    }
}

/* 
    #2
*/
const inventory = await getMongoDatabase();
const docs = await inventory.collection("inventory").find({}).toArray();

/* 
    #4
*/
app.get("/get-category", async (req, res) => {
    const category = req.query.category;
    console.log(category);
    return res.json("Get request received.");
});

/* 
    #5
*/
app.get("/", async (req, res) => {
    const client = new mongodb.MongoClient(process.env.DB_URI);
    const data = await (await client.connect()).db("it302").collection("inventory").find({}).toArray();
    res.json(data);
});

/* 
    #3
*/
app.listen(port, () => {
    console.log("server is running on port", port);
});
