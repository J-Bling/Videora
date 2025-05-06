import client from './httpClientFactory.js';
import Result from './result.js';

class UserDataApi{
    
    /**
     * 
     * @param {ResetPasswordRequest} request 
     * @returns {Result}
     */
    async resetPasswordByPass(request){
        try{
            const res =await client.put("/api/user/reset-password/password",request);
            return res.data;
        }catch(err){
            throw err;
        }
    }

    /**
     * 
     * @param {ResetPasswordRequest} request 
     * @returns {Result}
     */
    async resetPasswordByCode(request){
        try{
            const res = await client.put("/api/user/reset-password/code",request);
            return res.data;
        }catch(err){
            throw err;
        }
    }


    /**
     * 
     * @param {String} nicknam 
     * @returns {Result}
     */
    async resetNickname(nicknam){
        try{
            const res = await client.put(`/api/user/reset-nickname/${nicknam}`);
            return res.data;
        }catch(err){
            throw err;
        }
    }


    /**
     * 
     * @param {FormData} fileData 
     * @returns {Result}
     */
    async resetAvatar(fileData){
        try{
            const res = await client.put("/api/user/reset-avatar",fileData,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                }
            });
            return res.data;
        }catch(err){
            throw err;
        }
    }


    /**
     * 
     * @param {Number} target_id 
     * @returns {UserResponse[]}
     */
    async getUserDataBase(target_id){
        try{
            const res =await client.get(`/api/user/user-response-data/${target_id}`);
            return res.data.data;
        }catch(err){
            throw err;
        }
    }


    /**
     * 
     * @param {Number} target_id 
     * @returns {UserResponse[]}
     */
    async getUserDataWithStats(target_id){
        try{
            const res =await client.get(`/api/user/user-data-stats/${target_id}`);
            return res.data.data;
        }catch(err){
            throw err;
        }
    }

    /**
     * 
     * @param {Number} target_id 
     * @returns {UserResponse[]}
     */
    async getUserDataWithStatsAndRelation(target_id){
        try{
            const res = await client.get(`/api/user/user-stats-relation/${target_id}`);
            return res.data.data;
        }catch(err){
            throw err;
        }
    }
}

export const userApi = new UserDataApi();


export class ResetPasswordRequest{
    /**
     * 
     * @param {String} code 
     * @param {Boolean} type 
     * @param {String} oldPassword 
     * @param {String} newPassword 
     * @param {String} account 
     */
    constructor(code,type,oldPassword,newPassword,account){
        this.code=code;
        this.type=type;
        this.oldPassword=oldPassword;
        this.newPassword=newPassword;
        this.account=account;
    }
}


export class UserResponse{
    /**
     * 
     * @param {Number} id 
     * @param {String} nickname 
     * @param {Boolean} gender 
     * @param {String} avatar_url 
     * @param {String} description 
     * @param {UserStats} userStats 
     * @param {UserRelation} userRelation
     */
    constructor(id,nickname,gender,avatar_url,description,userStats,userRelation){
        this.id=id;
        this.nicknam=nickname;
        this.gender=gender;
        this.avatar_url=avatar_url;
        this.description=description;
        this.userStats=userStats;
        this.userRelation=userRelation;
    }
}

export class UserStats{
    /**
     * 
     * @param {Number} user_id 
     * @param {Number} video_count 
     * @param {Number} like_count 
     * @param {Number} following_count 
     * @param {Number} follower_count 
     * @param {Number} coin_count 
     * @param {Number} favorite_count 
     */
    constructor(user_id,video_count,like_count,following_count,follower_count,coin_count,favorite_count){
        this.user_id=user_id;
        this.video_count=video_count;
        this.like_count=like_count;
        this.following_count=following_count;
        this.follower_count=follower_count;
        this.coin_count=coin_count;
        this.favorite_count=favorite_count;
    }
}

export class UserRelation{
    /**
     * 
     * @param {Number} id 
     * @param {Number} user_id 
     * @param {Number} target_id 
     * @param {Boolean} relation_type 
     */
    constructor(id,user_id,target_id,relation_type){
        this.id=id;
        this.user_id=user_id;
        this.target_id=target_id;
        this.relation_type=relation_type;
    }
}