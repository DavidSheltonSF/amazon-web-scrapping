import {Request, Response} from 'express';

import amazonScrapping from '../amazonScrapping';


export const amazonScrappingController = async (req: Request, res: Response) => {
  try {
    const {key} = req.query;

    console.log(key)

    const response = await amazonScrapping(String(key));

    res.status(200).json(response);
    
  } catch(err){
    console.log(err);
    res.sendStatus(400);

  }

}