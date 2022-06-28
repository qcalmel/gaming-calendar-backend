import {NextFunction, Request, Response} from "express";
import axios, {AxiosResponse} from 'axios';

interface Game {
    id: Number;
    name:String,
}

const config = {
    headers: {
        Accept: "application/json",
        "Client-ID": "vdyvkae7tp66ret5xpmzl00h0je5eu",
        Authorization: "Bearer hyx8ewg9unrgtuo2ntac21itvfxep9",
    }
};

const getGames = async (req: Request, res: Response, next: NextFunction) => {
    const query : String = req.body.query
    const data =`fields 
            id,
            name,
            cover.url,
            first_release_date,
            platforms.name,
            platforms.abbreviation,
            release_dates.human,
            release_dates.category,
            release_dates.date;
            search "${query || ''}";
            where version_parent = null & category = 0 & platforms != null;
            limit 200;`
    ;
    let result: AxiosResponse = await axios.post(`https://api.igdb.com/v4/games`,data,config);
    let games: [Game] = result.data;
    return res.status(200).json({
        message: games
    });
};

export default {getGames}