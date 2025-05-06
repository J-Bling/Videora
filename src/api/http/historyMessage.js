import client from './httpClientFactory.js';
import {UserResponse} from './user.js';

class MessageApi{

    /**
     * 
     * @param {Number} targetId 
     * @param {Number} lastCreated 
     * @param {Number} offset 
     * @returns {MessageResponse[]}
     */
    async getHistoryMessages(targetId,lastCreated,offset){
        try{
            const res = await client.get(`/api/history-message/messages/${targetId}/${lastCreated}/${offset}`);
            return res.data.data;
        }catch(err){
            throw err;
        }
    }


    /**
     * 
     * @returns {UserResponse[]}
     */
    async getFriends(){
        try{
            const res =await client.get("/api/history-message/friend-list");
            return res.data.data;
        }catch(err){
            throw  err;
        }
    }
}

export const messageApi = new MessageApi();

export class MessageResponse{
    /**
     * 
     * @param {Number} id 
     * @param {String} room 
     * @param {Number} sender_id 
     * @param {Number} target_id 
     * @param {String} message 
     * @param {Number} created 
     */
    constructor(id,room,sender_id,target_id,message,created){
        this.id=id;
        this.room=room;
        this.sender_id=sender_id;
        this.target_id = target_id;
        this.message=message;
        this.created = created;
    }
}