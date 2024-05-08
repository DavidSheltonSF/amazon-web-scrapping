import axios from "axios";
import {JSDOM} from 'jsdom';
import { getImageURL, getTitle, getRating } from "./handleData";

export default async function amazonScrapping(key: string){
  const items: Record<string, any>[] = [];

  const response = await axios.get(`https://www.amazon.com.br/s?k=${key}`, {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      Accept: 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    }
  }
  )
    .then((res) => {
      
      const DOM = new JSDOM(res.data)
      
      const results = DOM.window.document.querySelectorAll('[data-component-type="s-search-result"]');
      
      results.forEach((elem: Element)=>{
        const imageURL = getImageURL(elem);
        const title = getTitle(elem);
        const rating = getRating(elem);

        items.push({
          imageURL,
          title,
          rating
        })
      })
      return items;
    });
    return response;
}