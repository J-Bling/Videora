import { defineStore } from 'pinia';

export const useReviewStore = defineStore('review', {
  state: () => ({
    statuses: {
        REVIEWING: { code: 0, text: "审核中" },
        REVIEW_SUCCEED: { code: 1, text: "审核通过" },
        REVIEW_FAIL: { code: 2, text: "审核失败" }
    },
    currentStatus: null
  }),
  
  getters: {
    // 获取所有审核状态
    allStatuses(state) {
        return Object.keys(state.statuses);
    },
    
    // 获取状态详情
    getStatusDetails: (state) => (status) => {
        return state.statuses[status] || null;
    },
    
    // 根据code获取状态名称
    getStatusByCode: (state) => (code) => {
        return Object.keys(state.statuses).find(key => state.statuses[key].code === code);
    },
    
    // 根据text获取状态名称
    getStatusByText: (state) => (text) => {
        return Object.keys(state.statuses).find(key => state.statuses[key].text === text);
    },
    
    // 获取当前状态详情
    currentStatusDetails(state) {
        return state.currentStatus ? this.getStatusDetails(state.currentStatus) : null;
    },
    
    // 判断当前是否审核中
    isReviewing(state) {
        return state.currentStatus === 'REVIEWING';
    },
    
    // 判断当前是否审核通过
    isApproved(state) {
        return state.currentStatus === 'REVIEW_SUCCEED';
    },
    
    // 判断当前是否审核失败
    isRejected(state) {
        return state.currentStatus === 'REVIEW_FAIL';
    }
  },
  
  actions: {
    // 设置当前状态
    setCurrentStatus(status) {
        if (status in this.statuses) {
            this.currentStatus = status;
        }
    },
    
    // 根据code设置当前状态
    setCurrentStatusByCode(code) {
        const status = this.getStatusByCode(code);
        if (status) {
            this.currentStatus = status;
        }
    },
    
    // 根据text设置当前状态
    setCurrentStatusByText(text) {
        const status = this.getStatusByText(text);
        if (status) {
            this.currentStatus = status;
        }
    },
    
    // 设置为审核中状态
    setToReviewing() {
        this.currentStatus = 'REVIEWING';
    },
    
    // 设置为审核通过状态
    setToApproved() {
        this.currentStatus = 'REVIEW_SUCCEED';
    },
    
    // 设置为审核失败状态
    setToRejected() {
        this.currentStatus = 'REVIEW_FAIL';
    },
    
    // 验证状态是否有效
    isValidStatus(status) {
        return status in this.statuses;
    },
    
    // 验证code是否有效
    isValidCode(code) {
        return Object.values(this.statuses).some(s => s.code === code);
    }
  }
});