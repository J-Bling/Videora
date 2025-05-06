import client from './httpClientFactory.js';
import { VideoDataResponse } from './video.js';
import {UserResponse} from './user.js';
import {CommentResponse} from './comments.js';


export class Notification{
    /**
     * 
     * @param {String} message_id 
     * @param {Number} user_id 
     * @param {Number} target_id 
     * @param {Number} tag_id 
     * @param {String} message 
     * @param {Number} type 
     * @param {Number} created 
     * @param {Boolean} is_read
     */
    constructor(message_id,user_id,target_id,tag_id,message,type,created,is_read){
        this.message_id=message_id;
        this.user_id=user_id;
        this.target_id=target_id;
        this.tag_id=tag_id;
        this.message=message;
        this.type=type;
        this.created=created;
        this.is_read=is_read;
    }
}


export class HistoryNotificationResponse{
    /**
     * 
     * @param {Notification} notification 
     * @param {UserResponse} userResponse 
     */
    constructor(notification,userResponse){
        this.notification=notification;
        this.userResponse=userResponse;
    }
}


export class NotificationForVideoResponse{
    /**
     * 
     * @param {VideoDataResponse} videoDataResponse 
     * @param {HistoryNotificationResponse[]} notificationWithUser 
     */
    constructor(videoDataResponse,notificationWithUser){
        this.videoDataResponse=videoDataResponse;
        this.notificationWithUser=notificationWithUser
    }
}


export class NotificationForComment extends NotificationForVideoResponse{
    /**
     * 
     * @param {CommentResponse} commentResponse 
     * @param {VideoDataResponse} videoDataResponse 
     * @param {HistoryNotificationResponse} notificationWithUser 
     */
    constructor(commentResponse,videoDataResponse,notificationWithUser){
        super(videoDataResponse,notificationWithUser);
        this.commentResponse=commentResponse;
    }
}


class HistoryNotificationApi{

    /**
     * 
     * @param {Number} offste 
     * @returns {NotificationForVideoResponse}
     */
    async getLikeVideoNotification(offste){
        try{
            const res =await client.get(`/api/history-notification/like-video-notification/${offste}`);
            return res.data.data;
        }catch(err){
            throw err;
        }
    }


    /**
     * 
     * @param {Number} offset 
     * @returns {NotificationForComment[]}
     */
    async getReplyCommentNotification(offset){
        try{
            const res= await client.get(`/api/history-notification/reply-comment-notification/${offset}`);
            return res.data.data;
        }catch(err){
            throw err;
        }
    }

    /**
     * 
     * @param {number} offset 
     * @returns {NotificationForComment[]}
     */
    async getLikeCommentNotification(offset){
        try{
            const res = await client.get(`/api/history-notification/like-comment-notification/${offset}`);
            return res.data.data;
        }catch(err){
            throw err;
        }
    }

    /**
     * 
     * @param {Number} offset 
     * @returns {HistoryNotificationResponse[]}
     */
    async getFollowNotification(offset){
        try{
            const res = await client.get(`/api/history-notification/follow-notification/${offset}`);
            return res.data.data;
        }catch(err){
            throw err;
        }
    }
}


export const historyNotificationApi = new HistoryNotificationApi();