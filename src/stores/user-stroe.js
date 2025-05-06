import {defineStore} from 'pinia';

export const useUserData=defineStore('user',{
    state : ()=>{
        return {
            id : null,
            nickname : "",
            avatar_url : "",
            gender : null,
            description : ""
        }
    },

    getters : {
    
    },

    actions : {
        updateNickname(name){
            this.nickname=name;
        },

        updateAvatar(avatar){
            this.avatar_url=avatar
        },

        updateDescription(description){
            this.description=description;
        },

        /**
         * 
         * @param {Number} id 
         * @param {String} nicknam 
         * @param {String} avatar_url 
         * @param {Boolean} gender 
         * @param {String} description 
         */
        init(id,nicknam,avatar_url,gender,description){
            this.id=id;
            this.nickname=nicknam;
            this.avatar_url= avatar_url;
            this.gender=gender;
            this.description=description;
        }
    }
})