// Package Import
import express from 'express';
import {MongoClient} from 'mongodb';
import dotenv from "dotenv";
import cors from "cors";  

// Functions Import
import { fechFlipkartProducts } from "./fetchData/fechFlipkartProducts.js";
import {fechsnapDealProducts} from "./fetchData/fetchSnapDealProducts.js";



const app = express();
// Middleware
app.use(express.json());
app.use(cors());
dotenv.config();


const PORT = process.env.PORT||9000;

const MONGO_URL = process.env.MONGO_URL;


async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("MongoDB Connected");
    return client;
}

// Server
app.listen(PORT,()=>{
    console.log("Server Started at "+PORT);
});

app.get('/',()=>{
    Hii
})

app.get('/flipkart',async(req, res)=>{
    const result = await client.db("HACKATHON-WEB-SCRAPPING-DB").collection("flipkartDB").find().toArray();
    res.send(result)
})

app.get('/snapdeal',async(req, res)=>{
    const result = await client.db("HACKATHON-WEB-SCRAPPING-DB").collection("SnapDealDB").find().toArray();
    res.send(result)
})

export  const client = await createConnection();

// Other Functions Calls
fechFlipkartProducts();
fechsnapDealProducts();