import client from "./httpClientFactory.js";
import Result from './result.js';
import { UserResponse } from "./user.js";

class CommentApi{

    async get(url){
        try{
            const res = await client.get(url);
            return res.data;
        }catch(err){
            throw err;
        }
    }

    /**
     * @param {Number} isHot
     * @returns {Result}
     */
    async getVideoComments(videoId,offset,isHot){
        try{
            return await this.get(`/api/comments/video-comments/${videoId}/${offset}/${isHot}`);
        }catch(err){
            throw err;
        }
    }

    /**
     * 
     * @param {Number} rootId 
     * @param {Number} parentId 
     * @param {Number} offset 
     * @param {Number} isHot 
     * @returns {Result}
     */
    async getReplyComments(rootId,parentId,offset,isHot){
        try{
            return await this.get(`/api/comments/reply-comments/${rootId}/${parentId}/${offset}/${isHot}`);
        }catch(err){
            throw err;
        }
    }

    async getPublicVideoComments(videoId,offset,limit){
        try{
            return await this.get(`/api/public/comments/video-comments/${videoId}/${offset}/${limit}`);
        }catch(err){
            throw err;
        }
    }

    async getPublicReplyComments(rootId,parentId,offset){
        try{
            return await this.get(`/api/public/comments/reply-comments/${rootId}/${parentId}/${offset}`);
        }catch(err){
            throw err;
        }
    }

    /**
     * 
     * @param {CreateCommentRequest} request 
     * @returns {Result}
     */
    async createComment(request){
        try{
            const res =await client.post(`/api/comments/create-comment`,request);
            return res.data;
        }catch(err){
            throw err;
        }
    }

    async deleteComment(commentId,videoId,parentId){
        try{
            const res = await client.delete(`/api/comments/delete-comment/${commentId}/${videoId}/${parentId}`);
            return res.data;
        }catch(err){
            throw err;
        }
    }

    /**
     * 
     * @param {ActionComment} action 
     * @returns 
     */
    async actionComment(action){
        try{
            const res = await client.put(`/api/interaction/handle-user-relation`,action);
            return res.data;
        }catch(err){
            throw err;
        }
    }
}

export class CreateCommentRequest{
    constructor(videoId,rootId,parentId,content,author_id){
        this.videoId=videoId;
        this.rootId=rootId;
        this.parentId=parentId;
        this.content=content;
        this.author_id=author_id;
    }
}


export class ActionComment{
    /**
     * @param {boolean} action_type 
     */
    constructor(comment_id,user_id,action_type,videoId,rootId,authorId){
        this.comment_id=comment_id;
        this.user_id=user_id;
        this.action_type=action_type;
        this.videoId=videoId;
        this.rootId=rootId;
        this.authorId=authorId;
    }
}


export class CommentResponse{
    /**
     * 
     * @param {Number} id 
     * @param {Number} video_id 
     * @param {Number} root_id 
     * @param {Number} parent_id 
     * @param {Number} reply_count 
     * @param {Number} like_count 
     * @param {Number} deslike_count 
     * @param {String} conetnt 
     * @param {Date} created 
     * @param {UserResponse} user 
     * @param {boolean} action 
     */
    constructor(id,video_id,root_id,parent_id,reply_count,like_count,deslike_count,conetnt,created,user,action){
        this.id=id;
        this.video_id=video_id;
        this.root_id=root_id;
        this.parent_id=parent_id;
        this.reply_count=reply_count;
        this.like_count=like_count;
        this.deslike_count=deslike_count;
        this.content=conetnt;
        this.created=created;
        this.user=user;
        this.action=action;
    }
}

export const commentApi = new CommentApi();