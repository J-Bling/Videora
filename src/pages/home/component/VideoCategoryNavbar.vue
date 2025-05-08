<template>
    <div class="bilibili-nav-container">
    <div v-for="(row, index) in rows" :key="index" class="nav-row">
        <div class="nav-items">
        <el-link
            v-for="item in row.items"
            :key="item.key"
            :class="{ 'nav-item': true, 'is-active': item.key === currentCategory }"
            @click="navigateTo(item)"
        >
            {{ item.name }}
        </el-link>
        <el-dropdown v-if="row.moreItems.length > 0">
            <el-link class="nav-item more-link">
            更多<el-icon><arrow-down /></el-icon>
            </el-link> 
            <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item
                v-for="moreItem in row.moreItems"
                :key="moreItem.key"
                @click="navigateTo(moreItem)"
                >
                {{ moreItem.name }}
                </el-dropdown-item>
            </el-dropdown-menu>
            </template>
        </el-dropdown>
        </div>
    </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useVideoCategoryStore } from '../../../stores/video-category.store';
import { ArrowDown } from '@element-plus/icons-vue';

const router = useRouter();
const store = useVideoCategoryStore();

const currentCategory = computed(() => store.currentCategory);

const categories = computed(() => 
    Object.entries(store.categories).map(([key, value]) => ({
    key,
    ...value
    }))
);

const rows = computed(() => [
    {
    items: categories.value.slice(0, 8),
    moreItems: []
    },
    {
    items: categories.value.slice(8, 16),
    moreItems: categories.value.slice(16)
    }
]);

const navigateTo = (item) => {
    store.currentCategory = item.key;
    router.push(`/video/${encodeURIComponent(item.name)}`);
};
</script>

<style scoped>
.bilibili-nav-container {
    padding: 12px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.nav-row {
    display: flex;
    justify-content: center;
    margin-bottom: 8px;
}

.nav-items {
    display: inline-flex;
    gap: 20px;
    max-width: 1200px;
}

.nav-item {
    font-size: 12px;
    color: #505050;
    padding: 4px 8px;
    transition: all 0.2s;
    white-space: nowrap;
    
    &:hover {
    color: #00aeec;
    background: #f0fbff;
    border-radius: 4px;
    }

    &.is-active {
    color: #00aeec;
    font-weight: 500;
    }
}

.more-link {
    color: #9499a0;
    
    &:hover {
    color: #00aeec;
    }
}

.el-dropdown {
    vertical-align: baseline;
}
</style>