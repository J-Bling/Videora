<template>
    <div class="carousel-wrapper">
    <h4>Rotating Recommendations</h4>
    <div 
        class="carousel-container"
        @mouseenter="pauseAutoPlay"
        @mouseleave="startAutoPlay"
    >
        <div 
        class="carousel-track"
        :style="trackStyle"
        >
        <div 
            v-for="video in hotVideos"
            :key="video.id"
            class="carousel-item"
            @click="handleClick(video.id)"
        >
            <img 
            :src="video.cover_url" 
            class="carousel-image"
            alt="video cover"
            >
            <div class="carousel-title">{{ video.title }}</div>
        </div>
        </div>
        <button class="arrow left" @click="prev">‹</button>
        <button class="arrow right" @click="next">›</button>
        <div class="indicators">
        <span
            v-for="(_, index) in hotVideos"
            :key="index"
            class="indicator"
            :class="{ active: currentIndex === index }"
            @click="currentIndex = index"
        ></span>
        </div>
    </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const hotVideos = ref([]);
const currentIndex = ref(0);
let autoPlayTimer = null;

const trackStyle = computed(() => ({
    transform: `translateX(-${currentIndex.value * 100}%)`
}));

const startAutoPlay = () => {
    if (!autoPlayTimer) {
    autoPlayTimer = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % hotVideos.value.length;
    }, 5000);
    }
};

const pauseAutoPlay = () => {
    if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
    }
};

const prev = () => {
    currentIndex.value = 
    (currentIndex.value - 1 + hotVideos.value.length) % hotVideos.value.length;
};

const next = () => {
    currentIndex.value = (currentIndex.value + 1) % hotVideos.value.length;
};

const handleClick = (videoId) => {
    router.push(`/video/${videoId}`);
};

onMounted(async () => {
    await request();
    startAutoPlay();
});

onUnmounted(() => {
    pauseAutoPlay();
});

</script>

<style scoped>
.carousel-wrapper {
    margin: 20px 0;
}

.carousel-container {
    position: relative;
    overflow: hidden;
    height: 400px;
    border-radius: 8px;
}

.carousel-track {
    display: flex;
    height: 100%;
    transition: transform 0.5s ease;
}

.carousel-item {
    flex: 0 0 100%;
    position: relative;
    cursor: pointer;
}

.carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.carousel-title {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background: linear-gradient(transparent, rgba(0,0,0,0.7));
    color: white;
    font-size: 1.2em;
}

.arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0,0,0,0.5);
    color: white;
    border: none;
    padding: 15px;
    cursor: pointer;
    font-size: 24px;
}

.arrow:hover {
    background: rgba(0,0,0,0.8);
}

.left {
    left: 10px;
}

.right {
    right: 10px;
}

.indicators {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
}

.indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255,255,255,0.5);
    cursor: pointer;
    transition: background 0.3s;
}

.indicator.active {
    background: white;
}
</style>