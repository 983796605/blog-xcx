// components/dynamicList/dynamicList.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: {
            type: Object
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 去文字详情页
        toDetail(e) {
            let {
                id
            } = e.currentTarget.dataset;
            wx.navigateTo({
                url: `/pages/detail/detail?id=${id}`,
            })
        },
    }
})