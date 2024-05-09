"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const jsdom_1 = require("jsdom");
const handleData_1 = require("./handleData");
async function amazonScrapping(key) {
    const items = [];
    const response = await axios_1.default.get(`https://www.amazon.com.br/s?k=${key}`, {
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            Accept: 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        }
    })
        .then((res) => {
        const DOM = new jsdom_1.JSDOM(res.data);
        const results = DOM.window.document.querySelectorAll('[data-component-type="s-search-result"]');
        results.forEach((elem) => {
            const imageURL = (0, handleData_1.getImageURL)(elem);
            const title = (0, handleData_1.getTitle)(elem);
            const rating = (0, handleData_1.getRating)(elem);
            items.push({
                imageURL,
                title,
                rating
            });
        });
        return items;
    });
    return response;
}
exports.default = amazonScrapping;
