
class WebScoketNotification{
    /**
     * @param {String} token 
     */
    constructor(token){
        if(!token) {
            throw new Error("token is not allow null");
        }
        this.url=`/ws/api/ws/push?token=${token}`;
        this.socket=null;
        this.reconnectionSize=0;
    }
    
    /**
     * @param {Function} callback 
     */
    connect(callback){
        try{
            if(this.socket===null){
                this.socket=new WebSocket(this.url);
                this.socket.onopen=(event)=>{
                    console.log("notification listenning ok");
                }

                this.socket.onmessage=(event)=>{
                    try{
                        let data = JSON.parse(event.data);
                        let messages= data.notifications; // String[]
                        callback(messages);
                    }catch(err){
                        console.error("JSON parse fail : ",err);
                    }
                }

                this.socket.onclose=(event)=>{
                    console.log("ws close and reLinking ",this.reconnectionSize);
                    if(this.reconnectionSize++<5){
                        this.socket=null;
                        setTimeout(()=>this.connect(callback),2000);
                    }
                }
            }
        
        }catch(err){
            console.error("browser have not websocket")
        }
    }


    close(){
        this.socket.close();
        console.log("close ws");
    }

    /**
     * @param {MessageRequestOfRead} request 
     */
    isReadNotification(request){
        try{
            console.log(request);
            this.socket.send(JSON.stringify(request));
        }catch(err){
            console.error("callback notification message faile : ",err);
        }
    }
}

/**
 * @param {String} token 
 * @returns {WebScoketNotification}
 */
export function getScoket(token){
    return new WebScoketNotification(token);
}

export class MessageRequestOfRead{
    /**
     * @param {Number} userId 
     * @param {String[]} messageIds 
     */
    constructor(userId,messageIds){
        this.userId=userId || null;
        this.messageIds=messageIds || [];
    }

    add(id){
        this.messageIds[this.messageIds.length]=id;
    }
}