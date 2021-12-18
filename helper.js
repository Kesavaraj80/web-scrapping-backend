import {client} from './index.js';

// Flipkart
export async function addProduct(data) {
    // console.log("Flipkart Product Inserted")
    return await client.db("HACKATHON-WEB-SCRAPPING-DB").collection("flipkartDB").insertOne(data);
}

export async function deleteOldProduct() {
    console.log("old Flipkart Product deleted Successfully");
    return await client.db("HACKATHON-WEB-SCRAPPING-DB").collection("flipkartDB").deleteMany({ });
}


// Snapdeal

export async function addSnapDealProduct(data) {
    // console.log("SnapDeal Product Inserted")
    return await client.db("HACKATHON-WEB-SCRAPPING-DB").collection("SnapDealDB").insertOne(data);
}

export async function deleteOldSnapDealProduct() {
    console.log("old SnapDeal Product Deleted Successfully");
    return await client.db("HACKATHON-WEB-SCRAPPING-DB").collection("SnapDealDB").deleteMany({ });
}