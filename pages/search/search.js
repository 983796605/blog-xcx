const utils = require("../../utils/util")
const {
    getBlogListApi
} = require("../../api/index")
let timer;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchList: [],
        nowContent: "",
        optionContent: "",
        searchShow: false
    },
    // 获取搜索内容
    searchSubmit() {
        let { nowContent } = this.data;
        utils.openLoading(this);
        getBlogListApi({ text: nowContent }).then(res => {
            utils.closeLoading(this);
            console.log(res)
            if(res.code == 200) {
                this.setData({
                    searchList: res.data.list,
                    searchShow: true
                })
            } else {
                utils.openToast({ title: res.message })
            }
        })
    },
    // 实时更新输入框内容
    changeSearchText(e) {
        let {
            value
        } = e.detail;
        this.setData({
            nowContent: value,
        })
        clearTimeout(timer);
        timer = setTimeout(_ => {
            if(this.data.nowContent) {
                this.searchSubmit()
            }
        }, 300)
    },
    // 清除
    clearData() {
        console.log('清楚')
        this.setData({
            nowContent: '',
            optionContent: '',
            searchShow: false
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})