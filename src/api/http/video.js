import client from "./httpClientFactory.js";
import {UserResponse} from './user.js';
 

class VideoApi{
    /**
     * 推荐视频
     * @param {Number} offset 
     * @returns {VideoDataResponse[]}
     */
    async recommendVideo(offset){
        try{
            const res =await client.get(`/api/video/data/recommend/${offset}`);
            return res.data.data;
        }catch(err){
            throw err;
        }
    }    


    /**
     * 分类推荐视频
     * @param {String} categoryName 
     * @param {Number} offset 
     * @returns {VideoDataResponse[]}
     */
    async categoryVideo(categoryName,offset){
        try{
            const res = await client.get(`/api/video/data/category/${categoryName}/${offset}`);
            return res.data.data;
        }catch(err){
            throw err;
        }
    }


    /**
     * 视频详情页
     * @param {Number} id 
     * @returns {VideoDataResponse}
     */
    async getVideoDetail(videoId){
        try{
            const res = await client.get(`/api/video/data/detail/${videoId}`);
            return res.data.data;
        }catch(err){
            throw err;
        }
    }


    /**
     * 获取视频切片
     * @param {Number} videoId 
     * @param {Number} offset 
     * @param {Number} quality 
     * @returns {VideoClipsResponse[]}
     */
    async getVideoClips(videoId,offset,quality){
        try{
            const res = await client.get(`/api/video/data/video-clip/${videoId}/${offset}/${quality}`);
            return res.data.data;
        }catch(err){
            throw err;
        }
    }

    
    /**
     * 推荐动态 要把 lastCreated 转换成 毫秒的时间戳
     * @param {Number} lastCreated 
     * @returns {VideoDataResponse[]}
     */
    async recommendDynamicVideo(lastCreated){
        try{
            const res = await client.get(`/api/video/dynamic/recommend/${lastCreated}`);
            return res.data.data;
        }catch(err){
            throw err;
        }
    }


    /**
     * 选择频道推荐动态 要把lastCreated转换成 毫秒时间戳
     * @param {Number} authorId 
     * @param {Number} offset 
     * @param {Number} lastCreated 
     * @returns {VideoDataResponse[]}
     */
    async selectDynamicVideoByAuthorId(authorId,offset,lastCreated){
        try{
            const res = await client.get(`/api/video/dynamic/select/${authorId}/${offset}/${lastCreated}`);
            return res.data.data;
        }catch(err){
            throw err;
        }
    }



    // public api
    /**
     *  获取 public 的推荐内容
     * @param {Number} offset 
     * @returns {VideoDataResponse}
     */
    async getPublicVideoRecommend(offset){
        try{
            const res = await client.get(`/api/public/videos/recommend/${offset}`);
            return res.data.data;
        }catch(err){
            throw err;
        }
    }

    /**
     * 获取public 选中频道的内容
     * @param {String} categoryName 
     * @param {Number} offset 
     * @returns {VideoDataResponse}
     */
    async getPublicVideoCategory(categoryName,offset){
        try{
            const res = await client.get(`/api/public/videos/category/${categoryName}/${offset}`);
            return res.data.data;
        }catch(err){
            throw err;
        }
    }


    /**
     * 获取public 详情内容
     * @param {Number} videoId 
     * @returns {VideoDataResponse}
     */
    async getPublicVideoDetail(videoId){
        try{
            const res = await client.get(`/api/public/videos/detail/${videoId}`);
            return res.data.data;
        }catch(err){
            throw err;
        }
    }

    /**
     * 获取 public 视频切片
     * @param {Number} videoId 
     * @param {Number} offset 
     * @returns {VideoClipsResponse[]}
     */
    async getPublicVideoClips(videoId,offset){
        try{
            const res = await client.get(`/api/public/videos/video-clip/${videoId}/${offset}`);
            return res.data.data;
        }catch(err){
            throw err;
        }
    }

    /**
     * 
     * @returns {VideoDataResponse[]}
     */
    async getHottestVideo(){
        try{
            const res = await client.get("/api/public/videos/hottest");
            return res.data.data;
        }catch(err){
            throw err;
        }
    }
}

export const videoDataApi = new VideoApi();

export class VideoRecordForUser{
    constructor(){
        this.hadCoin=null;
        this.hadLike=null;
        this.hadFavoties=null;
    }
}

export class VideoStats{
    constructor(){
        this.video_id=null;
        this.view_count=null;//播放
        this.like_count=null;//点赞
        this.coin_count=null;//投币
        this.favorite_count=null;//收藏
        this.share_count=null;//分享数
        this.barrage_count=null;//弹幕数
    }
}

export class VideoDataResponse{
    constructor(){
        this.id = null;
        this.title = null;       // 视频标题
        this.description = null; // 视频描述
        this.category = null;    // 视频分类
        this.duration = null;    // 视频时长（秒）
        this.width = null;       // 视频宽度（像素）
        this.height = null;      // 视频高度（像素）
        this.format = null;      // 视频格式（如 mp4、webm）
        this.cover_url = null;   // 视频封面URL
        this.clips_count = null; // 视频分片数量
        this.created = null;     // 视频创建时间
        this.updated = null;     // 视频更新时间
        this.authorId = null;    // 视频作者ID
        this.videoRecordForUser=new VideoRecordForUser();
        this.videoStats= new VideoStats();
        this.author = new UserResponse(null,null,null,null,null,null,null,null);
    }
}

export class VideoClipsResponse{
    constructor(){
        this.video_index=null;
        this.duration=null;
        this.url = null;
    }
}