// import {
//   authenticateApi,
//   phoneLoginApi
// } from "../api/login"
// import utils from "./util";
// const login = {
//   // 登录/注册
//   quickLogin: async (data, params = { skipUrl: '', skipType: '1' }) => {
//     return new Promise((resolve, reject) => {
//       var info = wx.getStorageSync("decodeUserInfo"); // 加密信息
//       var openid = wx.getStorageSync("openid");
//       var user = wx.getStorageSync("localUserInfo");
//       var wxUser = wx.getStorageSync("wxUserInfo"); // 微信准确用户信息
//       console.log(params)
//       // 检测 session_key 是否失效
//       login.checkSessionKey().then(status => {
//         if(status) {
//           wx.showLoading({
//             title: '登录中~',
//             icon: 'none'
//           })
//           phoneLoginApi({
//             session_key: info.session_key,
//             resource: 1,
//             iv: data.iv,
//             encryptedData: data.encryptedData,
//             openid: openid ? openid : user.openid,
//             user_info: wxUser ? JSON.stringify(wxUser.userInfo) : ''
//           }).then(res => {
//             console.log(res)
//             wx.hideLoading()
//             if (res.code == 200) {
//               utils.openToast({ title: res.message })
//               // 登录成功
//               wx.setStorageSync("localUserInfo", res.data.info);
//               wx.setStorageSync("token", res.data.token);
//               resolve(res)
//               // 登录成功跳转
//               let { skipType, skipUrl } = params;
//               skipUrl = skipUrl ? skipUrl : '/pages/index/index';
//               if(skipType == 1) { // 关闭所有页面，打开到应用内的某个页面
//                 wx.reLaunch({
//                   url: skipUrl,
//                 })
//               } else if (skipType == 2) { // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
//                 wx.switchTab({
//                   url: skipUrl,
//                 })
//               } else if (skipType == 3) { // 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。
//                 wx.navigateTo({
//                   url: skipUrl,
//                 })
//               } else if (skipType == 4) { // 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
//                 wx.redirectTo({
//                   url: skipUrl,
//                 })
//               }
//             } else if (res.code == 5002) {
//               utils.openToast({ title: 'seesion_key过期请重试~' })
//               login.getWxCode();
//             } else {
//               utils.openToast({ title: '请重试~' })
//               login.getWxCode();
//             }
//           })
//         } else {
//           // session_key 已经失效，需要重新获取code顺便自动登录
//           utils.openToast({ title: "session_key 失效，请重新点击快捷登录~" })
//           login.getWxCode();
//         }
//       })
//     })
//   },
//   // 检测checkSession
//   checkSessionKey: () => {
//     return new Promise((resolve, reject) => {
//       wx.checkSession({
//         success: res => resolve(true),
//         fail: err => resolve(false)
//       })
//     })
//   },
//   // 获取code
//   getWxCode: () => {
//     new Promise((resolve, reject) => {
//       wx.login({
//         success: function (res) {
//           // console.log(res)
//           authenticateApi({
//             code: res.code,
//             resource: 1
//           }).then(res => {
//             console.log(res)
//             if (res.code == 200) {
//               wx.setStorageSync("openid", res.data.openid);
//               wx.setStorageSync("localUserInfo", res.data.info);
//               wx.setStorageSync("token", res.data.token);
//               wx.setStorageSync("decodeUserInfo", {session_key: res.data.session_key});
//             } else if (res.code == 4006 || res.code == 401) { // 用户不存在
//               wx.setStorageSync("openid", res.data.openid);
//               wx.setStorageSync("decodeUserInfo", res.data);
//             }
//           })
//         }
//       })
//     })
//   },
//   // 解密
//   encrypted: (data) => {

//   }
// }

// module.exports = login;