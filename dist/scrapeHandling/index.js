import {getImageURL, getTitle, getRating} from "./handleData.js"


async function amazonScrapping(key) {
    const items = [];
    const response = await axios.get(`https://www.amazon.com.br/s?k=${key}`, {
        headers: {
          mode: 'cors',
          Host: 'www.amazon.com.br',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          "Access-Control-Allow-Origin": "*",
          Connection: 'keep-alive',
          Origin: 'http://localhost:5173/'
        },
    })
        .then((res) => {
        const domParser = new DOMParser();
        const DOM = domParser.parseFromString(res.data);
        const results = DOM.window.document.querySelectorAll('[data-component-type="s-search-result"]');
        results.forEach((elem) => {
            const imageURL = getImageURL(elem)
            const title = getTitle(elem)
            const rating = getRating(elem)
            items.push({
                imageURL,
                title,
                rating
            });
        });
        return items;
    })
        .catch((err) => {
        console.log(err);
        return null;
    });
    return response;
}
export default amazonScrapping
