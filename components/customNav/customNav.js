// components/customNav/customNav.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pageName: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navBarHeight: 0,
    headerStyle: '',
    menuStyle: '',
    searchStyle: '',
    pageNameStyle: '',
    isBack: false, // 是否有返回键
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      const { menuButtonTop, navBarHeight, menuHeight, menuWidth, menuRight, windowWidth } = app.globalData;
      let width
      if (getCurrentPages().length == 1) {
        this.setData({
          isBack: false,
        });
        width = menuWidth * 2 / 3;
      } else {
        this.setData({
          isBack: true,
        })
      }
      let headerStyle = `padding-top: ${menuButtonTop}px; height: ${navBarHeight}px;`;
      let menuStyle = `height: ${menuHeight}px; border-radius: ${menuHeight / 2}px; width: ${ width ? width : menuWidth }px;margin-left: ${ menuRight }px;`
      let searchStyle = `height: ${menuHeight}px; line-height: ${menuHeight}px; border-radius: ${menuHeight / 2}px; width: ${ windowWidth - (menuRight * 6 + menuWidth * 2) }px;margin-left: ${ menuRight }px;`
      let pageNameStyle = `height: ${menuHeight}px; line-height: ${menuHeight}px; width: ${(menuWidth * 2)}px;`
      this.setData({
        headerStyle,
        menuStyle,
        navBarHeight,
        searchStyle,
        pageNameStyle
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
      wx.navigateTo({
        url: `/pages/search/search`,
      })
    },
    bindBack() {
      wx.navigateBack({
        delta: 1
      });
    },
    bindToHome() {
      wx.switchTab({
        url: `/pages/index/index`
      })
    }
  }
})