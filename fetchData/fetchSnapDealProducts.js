import axios from "axios";
import cheerio from "cheerio";

// Products imported
import { snapDealProducts } from '../Products/snapDealProducts.js';
import {addSnapDealProduct,deleteOldSnapDealProduct} from '../helper.js'

const FetchData = async (index, url) => {

    let products = { id: index };
    const keys = ["Title", "Rating", "price", "finalPrice", "image"];
    try {
        const siteURL = url;

        const { data } = await axios({
            method: "GET",
            url: siteURL
        });

        const $ = cheerio.load(data);

        const nameSelector = "#productOverview > div.col-xs-14.right-card-zoom.reset-padding > div > div.pdp-elec-topcenter-inner.layout > div.row > div.col-xs-22 > h1";
        try {
            $(nameSelector).each((i, element) => {
                const value = $(element).attr("title");
                // console.log(value);
                if (value) {
                    products[keys[0]] = value;
                }
            });
            
        } catch (error) {
            console.log(error.message);
            
        }


        const ratingSelector = '#productOverview > div.col-xs-14.right-card-zoom.reset-padding > div > div.pdp-elec-topcenter-inner.layout > div.row > div.col-xs-24.reset-padding.rBelowName > div.pdp-e-i-ratereviewQA.marT10 > div.pdp-e-i-ratings > div > span:nth-child(2)';
        $(ratingSelector).each((i, element) => {
            const value = $(element).text();
            // console.log(value);
            if (value) {
                products[keys[1]] = value;
            }
        });

        const MrpPriceSelector = '#buyPriceBox > div.row.reset-margin > div.col-xs-14.reset-padding.padL8 > div.disp-table > div.pdp-e-i-PAY-r.disp-table-cell.lfloat > div.pdpCutPrice';
        try {
            $(MrpPriceSelector).each((i, element) => {
                const value = $(element).text();
                // console.log(value);
                if (value) {
                    products[keys[2]] = value;
                }
            });

        } catch (err) {
            console.log(err.message)

        }


        const finalPrice = '#buyPriceBox > div.row.reset-margin > div.col-xs-14.reset-padding.padL8 > div.disp-table > div.pdp-e-i-PAY-r.disp-table-cell.lfloat > span.pdp-final-price > span';
        $(finalPrice).each((i, element) => {
            const value = $(element).text();
            // console.log(value);
            if (value) {
                products[keys[3]] = value;
            }
        });

        const imageSelector = '#bx-slider-left-image-panel > li > img';
        $(imageSelector).each((i, element) => {
            const value = $(element).attr("src");
            products[keys[4]] = value;
        });

        // console.log(products)
        addSnapDealProduct(products);
    } catch (error) {
        console.log(error.message);
    }
};

export const fechsnapDealProducts = () => {
    deleteOldSnapDealProduct();
    snapDealProducts.map((url, index) => {
        FetchData(index, url);
    });
};