// index.js
// 获取应用实例
const app = getApp()
const utils = require("../../utils/util")
const {
    getBlogListApi
} = require("../../api/index");
Page({
    data: {
        navBarHeight: 66,
        hotList: [], // 热门列表
        blogData: {
            list: [],
            page: 1,
            countNum: 0,
            notData: false
        }, // 博客列表
    },
    // 获取热门列表
    getBlogList(order_type) {
        let { page, list } = this.data.blogData;
        utils.openLoading(this);
        getBlogListApi({ order_type: order_type || "", page }).then(res => {
            utils.closeLoading(this);
            console.log(res)
            if(res.code == 200) {
                if(order_type) {
                    this.setData({
                        hotList: res.data.list
                    })
                } else {
                    this.setData({
                        [`blogData.list`]: page == 1 ? res.data.list : list.concat(res.data.list),
                        [`blogData.countNum`]: res.data.countNum,
                        [`blogData.page`]: res.data.list.length ? page + 1 : page,
                        [`blogData.notData`]: !res.data.list.length,
                    })
                }
            }
        })
    },
    // 去文字详情页
    toDetail(e) {
        let { id } = e.currentTarget.dataset;
        wx.navigateTo({
          url: `/pages/detail/detail?id=${id}`,
        })
    },
    // 获取
    onLoad() {
        const {
            navBarHeight,
        } = app.globalData;
        this.setData({
            navBarHeight
        })
        this.getBlogList('heat');
        this.getBlogList();
    },
    onReachBottom() {
        this.getBlogList()
    },
    onPullDownRefresh() {
        this.setData({
            [`blogData.page`]: 1
        })
        this.getBlogList();
        wx.stopPullDownRefresh();
    }
})