<template>
    <div class="home">
        <div id="home-header">
            <!-- 占在当前组件顶部 (注意不是整个页面顶部！) -->
            <div class="navigator-tabs">
                <div class="dynamic">
                    <button @click="JumpRoute('/dynamic')"><Bell/><span>动态</span></button>
                </div>
                <div class="hot">
                    <button @click="JumpRoute('/popularity-ranking')"><HotWater/><span>热门</span></button>
                </div>
                <div>
                    <VideoCategoryNavbar/> 
                </div>
            </div>
        </div>
        <div id="home-main">
            <!-- 占在核心区域 -->
            <div class="rotating-recommendations">
                <!-- 轮播推荐 -->
                <RotatingRecommendations/>
            </div>
            <div class="short-video">
                <!-- 短视频推荐 -->
                 <ShortVideo/>
            </div>
        </div>
        <div id="home-foot">
            <!-- 占较下方 -->
            <div class="video-link">
                <!-- 长视频推荐 -->
                 <VideoLink/>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import {Bell,HotWater} from '@element-plus/icons-vue';
import RotatingRecommendations from './component/RotatingRecommendations.vue';
import ShortVideo from './component/ShortVideo.vue';
import VideoCategoryNavbar from './component/VideoCategoryNavbar.vue';
import VideoLink from './component/VideoLink.vue';

const router=useRouter();
function JumpRoute(path){
    router.push({path:path});
}


</script>