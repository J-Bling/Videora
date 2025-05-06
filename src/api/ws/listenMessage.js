

export class WebSocketMessage{
    constructor(token){
        if(!token){
            throw new Error("token is not allow null");
        }
        this.url = `ws://${window.location.host}/api/ws/chat?token=${token}`;
        this.socket=null;
    }   

    connect(){
        
    }
}

export class SendMessageRequest{
    /**
     * 
     * @param {Number} target_id 
     * @param {String} message 
     */
    constructor(target_id,message){
        this.target_id=target_id;
        this.message=message;
    }
}