import axios from 'axios';
import { getToken } from '../../util/tokenUtil.js';

class AxiosFactory {
    constructor(contentType) {
        let type = contentType || "application/json";
        this.client = axios.create({
            timeout: 10000,
            headers: {
                "X-Uskey": getToken(),
                "Content-Type": type
            }
        });

        this.client.interceptors.request.use(
            (config) => {
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.client.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (error.response) {
                    // console.log("response :",error.response);
                }
                return Promise.reject(error);
            }
        );
    }

    getClient() {
        return this.client;
    }
}

const factory = new AxiosFactory();
const client = factory.getClient();

export default client;