import axios from "axios";
import cheerio from "cheerio";

// function calls
import {addProduct,deleteOldProduct} from '../helper.js'
import { flipkartProducts } from "../Products/flipkartProducts.js";

const FetchData = async (index,url) => {

    let products = {id:index};
    const keys = ["Title", "Rating", "price", "finalPrice", "image"];
    try {
        const siteURL = url;

        const { data } = await axios({
            method: "GET",
            url: siteURL
        });

        const $ = cheerio.load(data);

        const nameSelector = ".B_NuCI";
        $(nameSelector).each((i, element) => {
            const value = $(element).text();
            // console.log(value);
            if (value) {
                products[keys[0]] = value;
            }
        });

        const ratingSelector = '._2d4LTz';
        $(ratingSelector).each((i, element) => {
            const value = $(element).text();
            // console.log(value);
            if (value) {
                products[keys[1]] = value;
            }
        });

        const MrpPriceSelector = '._3I9_wc';
        $(MrpPriceSelector).each((i, element) => {
            const value = $(element).text();
            // console.log(value);
            if (value) {
                products[keys[2]] = value;
            }
        });

        const finalPrice = '._30jeq3';
        $(finalPrice).each((i, element) => {
            const value = $(element).text();
            // console.log(value);
            if (value) {
                products[keys[3]] = value;
            }
        });

        const imageSelector = '#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-5-12._78xt5Y > div:nth-child(1) > div > div._3li7GG > div._1BweB8 > div._3kidJX > div.CXW8mj._3nMexc > img';
        $(imageSelector).each((i, element) => {
            const value = $(element).attr("src");
            if (value) {
                products[keys[4]] = value;
            }
        });


        // console.log(products)
        addProduct(products);
    } catch (error) {
        console.log(error.message);
    }
};

export const fechFlipkartProducts = () => {
    deleteOldProduct();
    flipkartProducts.map((url,index) => {
        FetchData(index,url);
    });
};
