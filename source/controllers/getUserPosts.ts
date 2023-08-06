const needle = require('needle');
import { Request, Response } from 'express';
const FB_API_BASE_URL = process.env.FB_API_BASE_URL;
import { IPosts, IResponse} from "../types/facebookPostsTypes";

const getUserPosts = async (req: Request, res: Response) => {
    const id:string = req.params.id;
    const bearerToken:string = process.env.FACEBOOK_TOKEN || "";
    const limit:any = req.query.limit;
    let responseObj:IResponse;

    const apiUrl:string=`${FB_API_BASE_URL}/${id}/posts?${limit?"limit="+limit+"&":''}access_token=${bearerToken}`;
    const result:any = await needle('get',apiUrl);

    if(result.statusCode == 200){
        resolveHashTags(result?.body?.data);
        responseObj = {
            posts:result.body.data,
            paging:result.body.paging
        };
       
    }else{
        responseObj = {
            error:result.body.error
        };
    }
    res.send(responseObj);
};

const resolveHashTags = (data:IPosts[])=>{
    data?.forEach((post:IPosts) => {
        let tags:string[] = [];
        if(post?.message){
            post?.message?.split(" ")?.forEach((ele:string)=> {
                if(ele.includes("#")){
                    tags.push(ele);
                }
            });
        }
        post.hashTags = [...tags]
    });
}

export default {getUserPosts};