let app;
let queryDoc;
const utils = {
    // 初始化的一些变量
    initMethods: (data) => {
        if (data._this) app = data._this;
    },
    // 获取元素信息
    findDocment: (doc, THIS) => {
        return new Promise((resolve, reject) => {
            queryDoc = wx.createSelectorQuery();
            if (THIS) queryDoc = wx.createSelectorQuery().in(THIS);
            queryDoc.select(doc).boundingClientRect((res, err) => {
                if (res) resolve(res)
            }).exec();
        })
    },
    // 检测用户信息
    checkUser: _ => {
        let info = wx.getStorageSync('localUserInfo');
        if (info && info.uid) {
            return info;
        } else {
            return false;
        }
    },
    // 点击获取用户信息
    getWxUserInfo() {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        return new Promise((reslove, reject) => {
            // wx.getUserProfile({
            //     desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            //     success: (res) => {
            //         console.log(res)
            //         wx.setStorageSync('wxUserInfo', res)
            //         reslove(res)
            //     }
            // })
        })
    },
    // 验证参数是否正确 data = { key, msg }
    verifyParams (params, data = {
        msg: '参数丢失~'
    }, func) {
        if (!params || !params[data.key]) {
            wx.showModal({
                title: '提示！',
                content: data.msg ? data.msg : '参数丢失~',
                showCancel: false,
                confirmText: '返回',
                success: res => {
                    if (res.confirm) {
                        wx.navigateBack({
                            delta: 1,
                            fail: err => {
                                wx.switchTab({
                                    url: data.url ? data.url : '/pages/index/index',
                                })
                            }
                        })
                    }
                }
            })
            return
        }
        func && func()
    },
    // 检测用户是否登录
    checkLogin: _ => {
        let token = wx.getStorageSync('token');
        return token && token.length ? true : false
    },
    // 检测用户是否已经同意授权协议
    checkEmpower: _ => {
        return wx.getStorageSync('isEmpower');
    },
    formatTime: date => {
        date = date ? date : new Date();
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        return `${[year, month, day].map(utils.formatNumber).join('-')} ${[hour, minute, second].map(utils.formatNumber).join(':')}`
    },
    formatNumber: n => {
        n = n.toString()
        return n[1] ? n : `0${n}`
    },
    /**
     * 通过秒获取 时分秒
     */
    formatSeconds: (value, formatHour) => { // 根据秒转换时间   formatHour = hh:mm:ss
        var theTime = parseInt(value); // 需要转换的时间秒 
        var theTime1 = 0; // 分 
        var theTime2 = 0; // 小时 
        var theTime3 = 0; // 天
        if (theTime > 60) {
            theTime1 = parseInt(theTime / 60);
            theTime = parseInt(theTime % 60);
            if (theTime1 > 60) {
                theTime2 = parseInt(theTime1 / 60);
                theTime1 = parseInt(theTime1 % 60);
                if (theTime2 > 24) {
                    //大于24小时
                    theTime3 = parseInt(theTime2 / 24);
                    theTime2 = parseInt(theTime2 % 24);
                }
            }
        }
        var result = '';
        if (theTime >= 0) {
            result = "" + utils.addZero(theTime) + (formatHour ? '' : "秒");
        }
        if (theTime1 >= 0) {
            result = "" + utils.addZero(theTime1) + (formatHour ? ':' : "分") + result;
        }
        if (theTime2 >= 0) {
            result = "" + utils.addZero(theTime2) + (formatHour ? ':' : "小时") + result;
        }
        if (theTime3 > 0) {
            result = "" + utils.addZero(theTime3) + (formatHour ? ':' : "天") + result;
        }
        return result;
    },
    addZero: num => {
        return parseInt(num) < 10 ? '0' + num : num
    },
    htmlRestore: (str) => { //  转义方法
        var s = "";
        if (str.length === 0) {
            return "";
        }
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");
        return s;
    },
    clearHtml: (str) => {
        str = str.replace(/<[^>].*?>/g, "");
        return str
    },
    // 获取手机导航栏信息
    setNavBarInfo: _ => {
        // 获取系统信息
        const systemInfo = wx.getSystemInfoSync();
        // 胶囊按钮位置信息
        const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
        // console.log(systemInfo)
        // console.log(menuButtonInfo)
        app.globalData.isIOS = !(systemInfo.model.indexOf("iPhone") == -1)
        // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
        app.globalData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight;
        app.globalData.windowWidth = systemInfo.screenWidth;
        app.globalData.menuBotton = menuButtonInfo.bottom;
        app.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
        app.globalData.menuHeight = menuButtonInfo.height;
        app.globalData.menuWidth = menuButtonInfo.width;
        app.globalData.menuButtonTop = menuButtonInfo.top;
        app.globalData.menuButtonLeft = menuButtonInfo.left;
    },
    // 获取页面地址+参数
    getCurrentUrl: _ => {
        let pages = getCurrentPages();
        let currentPage = pages[pages.length - 1];
        let url = `/${currentPage.route}`;
        let options = currentPage.options;
        let str = '';
        for (let x in options) {
            str += str.length == 0 ? `?${x}=${options[x]}` : `&${x}=${options[x]}`
        }
        return url + str;
    },
    // 预览图片/视频
    previewMedia: params => {
        wx.previewMedia({
            sources: params.resource,
            current: params.current ? params.current : 0,
            showmenu: !params.showmenu
        })
    },
    // toast提示
    openToast: data => {
        wx.showToast({
            title: data.title,
            icon: data.icon ? data.icon : 'none',
            image: data.image ? data.image : '',
            duration: data.duration ? data.duration : 1500,
            mask: data.mask ? true : false,
        })
    },
    // 模态对话框
    notCancelModal: data => {
        wx.showModal({
            title: data.title,
            confirmText: '知道了',
            showCancel: false,
            success: _ => {
                data && data.success && data.success()
            }
        })
    },
    // 打开Loading
    openLoading: (THIS) => {
        THIS.selectComponent("#Loading").openLoading();
    },
    // 关闭Loading
    closeLoading: (THIS) => {
        THIS.selectComponent("#Loading").closeLoading();
    },
    // 打开用户协议授权窗
    openAgreement: (THIS) => {
        THIS.selectComponent("#agreement").show();
    },
    // 关闭用户协议授权窗
    closeAgreement: (THIS) => {
        THIS.selectComponent("#agreement").close();
    },
    // 打开喜欢老师弹窗
    openlikeTeacher: (THIS) => {
        THIS.selectComponent("#likeTeacher").show();
    },
    // 跳转页面
    publicNavigate: (url, type = 3) => {
        console.log(type)
        if (type == 1) { // 关闭所有页面，打开到应用内的某个页面
            wx.reLaunch({
                url: url,
            })
        } else if (type == 2) { // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
            wx.switchTab({
                url: url,
            })
        } else if (type == 3) { // 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。
            wx.navigateTo({
                url: url,
            })
        }
    },
    // 支付
    WxRequestPayment: data => {
        // wx.requestPayment({
        //     'timeStamp': data.pay_data.timeStamp,
        //     'nonceStr': data.pay_data.nonceStr,
        //     'package': data.pay_data.package,
        //     'signType': 'MD5',
        //     'paySign': data.pay_data.paySign,
        //     success: res => {
        //         data.success && data.success(res)
        //     },
        //     fail: err => {
        //         data.err && data.err(err);
        //         wx.showToast({
        //             icon: "none",
        //             title: "支付失败了"
        //         })
        //     }
        // })
    },
    // 订阅消息
    openSubscribeMsg: data => {
        return new Promise((reslove, reject) => {
            wx.requestSubscribeMessage({
                tmplIds: [data.id],
                success: res => {
                    console.log('订阅完成')
                    reslove()
                },
                fail: res => {
                    console.log('订阅取消')
                    reslove()
                }
            })
        })
    }
}
//  防抖
throttle: (func, wait) => {
    let timeout

    return function () {
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null
                func.call(this, arguments)
            }, wait)
        }
    }
}

module.exports = utils