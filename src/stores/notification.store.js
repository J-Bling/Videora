import {defineStore} from 'pinia';
import {Notification} from '../api/http/historyNotification.js';

export const useNotification=defineStore("ntification",{
    state:()=>{
        return {
            system:[],
            likeOfVideo:[],
            likeOfComment:[],
            replyComment:[],
            follow:[],
            letter : [],
            dynamic :[],
            server:[]
        }
    },

    getters:{
        getCount(){
            return this.system.length + this.likeOfComment.length
                +this.likeOfVideo.length + this.replyComment.length
                +this.follow.length + this.letter.length
                + this.dynamic.length + this.server.length;
        }
    },

    actions :{
        /**
         * @param {Notification[]} messages 
         * @param {Notification} msg 
         */
        contain(messages,msg){
            if(messages.length>0) {
                for(let i=0;i<messages.length;i++){
                    if(messages[i].message_id===msg.message_id){
                        return false;
                    }
                }
            }
            messages[messages.length]=msg;
        },

        /**
         * @param {Notification} msg 
         */
        add(msg){
            switch(msg.type){
                case 0 :
                    this.contain(this.system,msg);
                    break;
                case 1:
                    this.contain(this.likeOfVideo,msg);
                    break;
                case 2 :
                    this.contain(this.likeOfComment,msg);
                    break;
                case 3 :
                    this.contain(this.replyComment,msg);
                    break;
                case 4 :
                    this.contain(this.follow,msg);
                    break;
                case 5 :
                    this.contain(this.letter,msg);
                    break;
                case 6 :
                    this.contain(this.dynamic,msg);
                    break;
                case 7 : 
                    this.contain(this.server,msg);
                    break;   
                default :
                    break;
            }
        }
    }
})