
const tokenItem="token";

/**
 * 
 * @returns {String | null}
 */
export function getToken(){
    let token = localStorage.getItem(tokenItem);
    if(token) return token;

    let cookie=document.cookie;
    if(!cookie) return null;
    for(let keyValue of cookie.split(";")){
        let [key,value] = keyValue.split("=");
        if(key===tokenItem) return value;
    }

    return null;
}

/**
 * 
 * @param {String} token 
 */
export function setToken(token){
    localStorage.setItem(tokenItem,token);
    if(!localStorage.getItem(tokenItem)){
        let date =new Date();
        date.setTime(date.getTime()+(7 * 24 * 60 * 60 * 1000));
        document.cookie=`${tokenItem}=${token};path=/;expires=${date}`
    }
}