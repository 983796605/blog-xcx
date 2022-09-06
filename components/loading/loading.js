// components/loading/loading.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    Loading: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    openLoading() {
      this.setData({
        Loading: true
      })
    },
    closeLoading() {
      this.setData({
        Loading: false
      })
    }
  }
})
