// 首页顶部 icon
const app = getApp();
const utils = require("../../utils/util")
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type: String,
            value: '王搏博客'
        },
        search_text: {
            type: String,
            value: '看看要搜点什么~'
        },
        current: {
            type: Number,
            value: 0
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        headerStyle: null,
        searchStyle: null,
        searchRadius: "",
        navBarHeight: 0
    },
    lifetimes: {
        attached: async function () {
            // 在组件实例进入页面节点树时执行
            const {
                menuButtonTop,
                navBarHeight,
                menuHeight,
                menuWidth,
                menuButtonLeft,
                windowWidth
            } = app.globalData;
            console.log(menuWidth, menuButtonLeft, windowWidth)
            let headerStyle = `padding-top: ${menuButtonTop}px; height: ${navBarHeight}px;`;
            //   let searchStyle = `height: ${menuHeight}px;line-height: ${menuHeight}px; border-radius: ${menuHeight / 2}px; width: ${menuButtonLeft - (windowWidth - menuButtonLeft)}px;`
            let titleWidth = await utils.findDocment('.title', this); // 获取title的宽
            let searchStyle = `height: ${menuHeight}px; border-radius: ${menuHeight / 2}px; width: ${menuButtonLeft - titleWidth.width}px;`;
            let searchRadius = `border-radius: ${menuHeight / 2}px; line-height: ${menuHeight}px;`
            this.setData({
                headerStyle,
                searchStyle,
                navBarHeight,
                searchRadius
            })
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    },
    /**
     * 组件的方法列表
     */
    methods: {
        toSearch() {
            wx.switchTab({
                url: `/pages/search/search`,
            })
        }
    }
})