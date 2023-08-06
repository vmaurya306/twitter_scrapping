const needle = require('needle');
import { NextFunction, Request, Response } from 'express';
const bearerToken = process.env.BEARER_TOKEN;
import { ITweet, IMeta, IOptions, IParams } from "../types/tweetsType";

const getUserTweets = async (req: Request, res: Response, next: NextFunction) => {
    
    let userTweets: ITweet[] = [{
        created_at:"",
        text:"",
        author_id:"",
        id:"",
        hashtags:[]
    }];


    let metaData:IMeta = {
        previous_token:"",
        result_count:0,
        newest_id:"",
        oldest_id:"",
        next_token:""
    };

    const { id } = req.params;
    const url:string = process.env.TWITTER_API_URL + 'users/' + id + '/tweets';
    
    let params:IParams = {
        max_results: Number(req.query.max_results),
        'tweet.fields': 'created_at',
        expansions: 'author_id'
    };

    const options:IOptions = {
        headers: {
            'User-Agent': 'v2UserTweetsJS',
            authorization: `Bearer ${bearerToken}`
        }
    };

    let hasNextPage:boolean = true;
    let nextToken = req.query.nextToken;
    if (hasNextPage) {
        let resp:any = await getPage(params, options, nextToken, url);
        if (resp && resp.meta && resp.meta.result_count && resp.meta.result_count > 0) {
            metaData = resp.meta;          
            if (resp.data) {
                userTweets =resp.data;
                resp.data.forEach((ele:ITweet) => {
                    let tag:string[] = ele.text.match(/#[a-z]+/gi)??[];        
                    ele.hashtags = tag;
                });
            }
            if (resp.meta.next_token) {
                nextToken = resp.meta.next_token;
            } else {
                hasNextPage = false;
            }
        } else {
            hasNextPage = false;
        }
    }

    return res.status(200).json({
        data: userTweets,
        meta: metaData
    });
};

const getPage = async (
    params: { max_results?: number; 'tweet.fields'?: string; expansions?: string; pagination_token?: any },
    options: { headers: { 'User-Agent': string; authorization: string } },
    nextToken: any,
    url: string
) => {
    if (nextToken) {
        params.pagination_token = nextToken;
    }

    try {
        const resp = await needle('get', url, params, options);
        if (resp.statusCode != 200) {
            console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
            return;
        }
        return resp.body;
    } catch (err) {
        throw new Error(`Request failed: ${err}`);
    }
};

export default { getUserTweets };
