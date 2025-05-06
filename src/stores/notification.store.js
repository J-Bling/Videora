import {defineStore} from 'pinia';
import {Notification} from '../api/http/historyNotification.js';

export const useNotificationType=defineStore("ntificationType",{
    state:()=>{
        return {
            count:0,
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

    actions :{
        /**
         * @param {Notification} msg 
         */
        add(msg){
            switch(msg.type){
                case 0 :
                    this.system[this.system.length]=msg;
                    break;
                case 1:
                    this.likeOfVideo[this.likeOfVideo.length]=msg;
                    break;
                case 2 :
                    this.likeOfComment[this.likeOfComment.length]=msg;
                    break;
                case 3 :
                    this.replyComment[this.replyComment.length]=msg;
                    break;
                case 4 :
                    this.follow[this.follow.length]=msg;
                    break;
                case 5 :
                    this.letter[this.letter.length]=msg;
                    break;
                case 6 :
                    this.dynamic[this.dynamic.length]=msg;
                    break;
                case 7 : 
                    this.server[this.server.length]=msg;
                    break;   
                default :
                    break;
            }
        }
    }
})