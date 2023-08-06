
export interface IPosts{
    created_time:string,
    message?:string,
    id:string,
    hashTags:string[]
}

export interface IError {
    message:string,
    type:string,
    code:number,
    error_subcode:number,
    fbtrace_id:string
}

export interface IResponse{
    posts?:IPosts,
    paging?:{
        next:string,
        previous:string
    },
    error?:IError

}