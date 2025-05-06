import client from './httpClientFactory.js';


class VideoLoadApi {
    /**
     * 上传视频初始化
     * @param {VideoUploadRequest} videoUploadRequest 
     * @param {File} imageFile 
     */
    async uploadInit(videoUploadRequest,imageFile){
        try{
            const data = new FormData();
            data.append("uploadRequest",JSON.stringify(videoUploadRequest));
            data.append("imageFile",imageFile,imageFile.name);
            const res =  await client.post(`/api/videos/upload/init`,data,{
                headers:{

                }
            });
            return res.data.data;
        }catch(err){
            throw err;
        }
    }

    /**
     * 上传视频分片
     * @param {VideoClipUploadRequest} videoClipUploadRequest 
     * @param {File} videoFile 
     */
    async uploadChunk(videoClipUploadRequest,videoFile){
        try{
            const data= new FormData();
            data.append("clipUploadRequest",videoClipUploadRequest);
            data.append("videoFile",videoFile);

            const res= client.post(`/api/videos/upload/chunk`,data,{
                headers:{

                }
            });
        }catch(err){
            throw err;
        }
    }
}


export class VideoUploadRequest{
    constructor(title,description,category,file_size,duration,width,height,format,clips_count){
        this.title=title;
        this.description=description;
        this.category=category;
        this.file_size=file_size;
        this.duration=duration;
        this.width=width;
        this.height=height;
        this.format=format;
        this.clips_count=clips_count;
    }
}


export class VideoClipUploadRequest{
    constructor(video_id,video_index,duration,width,height,format){
        this.video_id=video_id;
        this.video_index=video_index;
        this.duration=duration;
        this.width=width;
        this.height=height;
        this.format=format;
    }
}