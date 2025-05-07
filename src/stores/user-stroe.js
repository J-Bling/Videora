import {defineStore} from 'pinia';

export const useUserData=defineStore('user',{
    state : ()=>{
        return {
            user:{
                id : null,
                nickname :null,
                avatar_url : null,
                gender : null,
                description : null
            },
            visitor:{
                id : null,
                nickname :"游客",
                avatar_url : "https://bpic.588ku.com/element_origin_min_pic/19/08/21/db123b756ff0c3b404aaec62ea6e41a9.jpg",
                gender : null,
                description : ""
            }
        }
    },

    getters : {
    
    },

    actions : {
        updateNickname(name){
            this.user.nickname=name;
        },

        updateAvatar(avatar){
            this.user.avatar_url=avatar
        },

        updateDescription(description){
            this.user.description=description;
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
            this.user.id=id;
            this.user.nickname=nicknam;
            this.user.avatar_url= avatar_url;
            this.user.gender=gender;
            this.user.description=description;
        },
        
        logout(){
            this.user.id=null;
            this.user.nickname=null;
            this.user.avatar_url=null;
            this.user.description=null;
        }
    }
})