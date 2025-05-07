<template>
    <div>{{ path }}</div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import {computed}from 'vue';

const route = useRoute();
const path=computed(() => {
    return decodeURIComponent(route.path)
});
</script>