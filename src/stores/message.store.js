import {defineStore} from 'pinia';
import {MessageResponse} from '../api/http/historyMessage.js';

export const useMessage = defineStore("message",{
    state:()=>{
        return {
            messages : []
        }
    },

    actions:{
        /**
         * @param {MessageResponse} msg 
         */
        add(msg){
            this.messages[this.messages.length]=msg;
        }
    }
});