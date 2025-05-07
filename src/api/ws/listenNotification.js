
export class WebScoketNotification{
    constructor(token){
        if(!token) {
            throw new Error("token is not allow null");
        }
        this.url=`ws://${window.location.host}/api/ws/push?token=${token}`;
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
                    if(this.reconnectionSize++<5){
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
    }

    /**
     * @param {MessageRequestOfRead} request 
     */
    isReadNotification(request){
        try{
            this.socket(JSON.stringify(request));
        }catch(err){
            console.error("callback notification message faile : ",err);
        }
    }
}

export class MessageRequestOfRead{
    /**
     * @param {Number} userId 
     * @param {Number[]} messageIds 
     */
    constructor(userId,messageIds){
        this.userId=userId || null;
        this.messageIds=messageIds || [];
    }

    add(id){
        this.messageIds[this.messageIds.length]=id;
    }
}