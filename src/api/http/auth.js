import client from "./httpClientFactory.js";
import Result from './result.js'

class AuthApi{

    /**
     * 发送验证码
     * @param {SendCodeRequest} request 
     * @returns {Result}
     */
    async sendCode(request){
        try{
            const res =await client.post(`/api/public/auth/send-code`,request);
            return res.data;
        }catch(err){
            throw err;
        }
    }


    /**
     * 注册
     * @param {AuthRequest} request 
     * @returns {Result}
     */
    async register(request){
        try{
            const res = await client.post("/api/public/auth/register",request);
            return res.data;
        }catch(err){
            throw err;
        }
    }


    /**
     * 使用密码登陆
     * @param {AuthRequest} request 
     * @returns {Result}
     */
    async loginByPass(request){
        try{
            const res = await client.post("/api/public/auth/login-password",request);
            return res.data;
        }catch(err){
            throw err;
        }
    }


    /**
     * 使用验证码登陆
     * @param {AuthRequest} request 
     * @returns {Result}
     */
    async loginByCode(request){
        try{
            const res = await client.post("/api/public/auth/login-verification-code",request);
            return res.data;
        }catch(err){
            throw err;
        }
    }
}


export const auth =new AuthApi();


export class SendCodeRequest{
    /**
     * 
     * @param {String} account 
     * @param {boolean} accountType 
     * @param {Number} scene 
     */
    constructor(account,accountType,scene){
        this.account=account;
        this.accountType=accountType;
        this.scene=scene;
    }
}

export class AuthRequest{
    /**
     * 
     * @param {String} nickname 
     * @param {String} phone 
     * @param {String} email 
     * @param {String} code 
     * @param {String} password 
     */
    constructor(nickname,phone,email,code,password){
        this.nickname=nickname;
        this.phone=phone;
        this.email=email;
        this.code=code;
        this.password=password;
    }
}