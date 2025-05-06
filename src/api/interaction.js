import client from './httpClientFactory.js';
import Result from './result.js';
import {UserRelation} from './user.js';

class InteractionApi{

    /**
     * 
     * @param {Number} videoId 
     * @returns {Result}
     */
    async coin(videoId){
        try{
            const res = await client.get(`/api/interaction/coin-flip/${videoId}`);
            return res.data;
        }catch(err){
            throw err;
        }
    }


    /**
     * 
     * @param {Number} videoId 
     * @param {Number} isFavorite 
     * @returns 
     */
    async handleFavorites(videoId,isFavorite){
        try{
            const res =await client.get(`/api/interaction/handle-favorites/${videoId}/${isFavorite}`);
            return res.data;
        }catch(err){
            throw err;
        }
    }


    /**
     * 
     * @param {Number} videoId 
     * @param {Number} authorId 
     * @param {Number} like 
     * @returns 
     */
    async handleLike(videoId,authorId,like){
        try{
            const res = await client.get(`/api/interaction/handle-like/${videoId}/${authorId}/${like}`);
            return res.data;
        }catch(err){
            throw err;
        }
    }

    /**
     * 
     * @param {Number} userId 
     * @param {Number} targetId 
     * @param {Boolean} relation_type 
     * @returns 
     */
    async handleRelation(userId,targetId,relation_type){
        try{
            const relation = new UserRelation(0,userId,targetId,relation_type);
            const res = await client.put("/api/interaction/handle-user-relation",relation);
            return res.data;
        }catch(err){
            throw err;
        }
    }
}


export const interactionApi = new InteractionApi();