export class WebSocketMessage{
    constructor(token){
        if(!token){
            throw new Error("token is not allow null");
        }
        this.url = `/ws/api/ws/chat?token=${token}`;
        this.socket=null;
        this.reconnectSize=0;
    }   

    /**
     * @param {Function} callback 
     */
    connect(callback){
        try{
            if(this.socket===null){
                this.socket= new WebSocket(url);
                this.socket.onopen=(event)=>console.log("message link ok");
                this.socket.onclose=(event)=>{
                    if(this.reconnectSize++<5){
                        setTimeout(()=>this.connect(),2000);
                    }
                }
                this.socket.onmessage=(event)=>this.accect(event,callback);
            }
            
        }catch(err){
            console.error("link ws fail : ",err);
        }
    }

    close(){
        this.socket.close;
        this.socket=null;
    }

    accect(event,callback){
        try{
            let data= event.data;
            callback(JSON.parse(data));
        }catch(err){
            console.error("JSON parse fail : ",err);
        }
    }

    send(target_id,message){
        try{
            let request = new SendMessageRequest(target_id,message);
            this.socket.send(JSON.stringify(request));
            return true;
        }catch(err){
            console.error("send message fail : ",err);
            return false;
        }
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