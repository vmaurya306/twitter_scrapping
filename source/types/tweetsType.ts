export interface ITweet {
    created_at:string,
    text:string,
    author_id:string,
    id:string,
    hashtags:string[]
}

export interface IMeta {
    previous_token:string,
    result_count:number,
    newest_id:string,
    oldest_id:string,
    next_token:string
}

export interface IOptions {
    headers:{
        'User-Agent':string,
        authorization:string
    }
}

export interface IParams {
    max_results:number,
    'tweet.fields':string,
    expansions:string
}