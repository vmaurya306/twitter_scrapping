import { Request, Response } from 'express';
const FB_AUTH_URL = process.env.FB_AUTH_URL;
const FB_REDIRECT_URL = process.env.FB_REDIRECT_URL;
const FB_CLIENT_ID = process.env.FB_CLIENT_ID;

const authUrl:string = `${FB_AUTH_URL}?client_id=${FB_CLIENT_ID}&redirect_uri=${FB_REDIRECT_URL}&response_type=token&scope=user_posts,public_profile`;

const getAuthCode = async (req: Request, res: Response) => {
    if(Object.keys(req.query).length>0){
        res.send(req.query);
    }else{
        res.send(`<a href=${authUrl}>Get access token</a>`);
    }
};

export default getAuthCode;