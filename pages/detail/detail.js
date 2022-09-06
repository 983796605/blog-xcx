const utils = require("../../utils/util.js")
const {
    getBlogDetailApi, // 获取博客文章
} = require("../../api/index")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageName: "文章详情页",
        ID: '',
        detailData: null
    },
    // 获取详情页数据
    getBlogDetail() {
        let { ID } = this.data;
        utils.openLoading(this);
        getBlogDetailApi({ id: ID }).then(res => {
            utils.closeLoading(this);
            console.log(res)
            if(res.code == 200) {
                this.setData({
                    detailData: res.data
                })
            } else {
                utils.openToast({ title: res.message })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let { id } = options;
        this.setData({
            ID: id || ''
        })
        utils.verifyParams(options, {
            key: 'id'
        }, () => {
            this.getBlogDetail()
        })
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