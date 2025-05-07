import axios from 'axios';
import { getToken } from '../../util/tokenUtil.js';
// import interceptor from './interceptor.js';

class axiosFactory{
    constructor(conentType){
        let type =conentType || "application/json"
        this.client = axios.create({
            timeout : 10000,
            headers:{"X-Uskey" : getToken(),"Content-Type:" : type}
        });

        // interceptor(this.client);
    }


    getClient(){
        return this.client;
    }
}

const factory = new axiosFactory();
const client = factory.getClient();

export default client;