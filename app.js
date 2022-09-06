const utils = require("/utils/util.js")
const request = require("/utils/request.js")
App({
    onLaunch() {
        // 初始化一些数据数据
        request.initMethods({
            url: this.globalData.BASE_URL
        });
        utils.initMethods({
            _this: this
        })
        // 获取手机信息
        utils.setNavBarInfo();
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        // wx.login({
        //     success: res => {
        //         // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //     }
        // })
    },
    globalData: {
        BASE_URL: "https://api.wangbo98.cn",
        windowWidth: 0, // 系统窗口宽度
        navBarHeight: 0, // 导航栏高度
        menuBotton: 0, // 胶囊距底部间距（保持底部间距一致）
        menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
        menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
        menuButtonTop: 0, // 胶囊距离底部距离
        menuButtonLeft: 0,
        askDetailPutTop: 0, // 问题统计数据/列表立即提问顶部的距离
    }
})