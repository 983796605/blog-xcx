const request = require("../utils/request");

const api = {
    // 获取首页列表
    getBlogListApi(data) {
        return request.post({
            url: '/blog/get_list',
            data
        })
    },
    // 获取博客文章详情
    getBlogDetailApi(data) {
        return request.get({
            url: '/bolg/get_detail',
            data
        })
    }
}

module.exports = api