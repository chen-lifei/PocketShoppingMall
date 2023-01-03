const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');

//获取应用实例
const app = getApp()
Page({
    data: {
        goodsCount: 0,
        newGoods: [],
        hotGoods: [],
        topics: [],
        banner: [],
    },
    onShareAppMessage: function () {
        return {
            title: 'Pocket Shopping Mall',
            desc: '口袋商城',
            path: '/pages/index/index'
        }
    },
    getIinitialData: function () {
        let banner = [
            {
                id: 0,
                link: "",
                image: "https://gw.alicdn.com/imgextra/i4/140514434/O1CN01ffk0Fi1icopo4G7z1_!!140514434.jpg_790x10000Q75.jpg_.webp"
            },
            {
                id: 1,
                link: "",
                image: "https://gw.alicdn.com/imgextra/i4/3630334036/O1CN01gNltsR1fgXHL6b1Bt_!!3630334036-0-beehive-scenes.jpg_790x10000Q75.jpg_.webp"
            },
            {
                id: 2,
                link: "",
                image: "https://gw.alicdn.com/imgextra/i1/2633509945/O1CN01APNFmp2NKrbcNpygN_!!2633509945-0-beehive-scenes.jpg_790x10000Q75.jpg_.webp"
            }
        ];
        let newGoodsList = [
            {
                id: 0,
                name: "汉服上衣女夏款汉元素衬衣半身裙",
                image: "https://gw.alicdn.com/bao/uploaded/i4/4105858260/O1CN01e6Uddu2At8FkFCGQ5_!!0-item_pic.jpg_320x320q90.jpg_.webp",
                price: 199
            },
            {
                id: 1,
                name: "娃娃领泡泡袖衬衫+拼接蝴蝶结半裙",
                image: "https://gw.alicdn.com/bao/uploaded/i2/1944673643/O1CN01PFvjUS1cmXYW6OMbq_!!1944673643.jpg_320x320q90.jpg_.webp",
                price: 38.8
            },
            {
                id: 2,
                name: "纯棉被套单件150x200卡通幼儿园儿童学生宿舍单人200x230全棉被罩",
                image: "https://gw.alicdn.com/bao/uploaded/i1/2103158604/O1CN01j0essY2DQgMuEm5mT_!!2103158604-0-lubanu-s.jpg_320x320q90.jpg_.webp",
                price: 68
            },
        ];
        let hotGoodsList = [
            {
                id: 0,
                name: "汉服上衣女夏款汉元素衬衣半身裙",
                desc: "可以穿着上班的汉服上衣女夏款汉元素衬衣半身裙日常套装超仙显瘦",
                image: "https://gw.alicdn.com/bao/uploaded/i4/4105858260/O1CN01e6Uddu2At8FkFCGQ5_!!0-item_pic.jpg_320x320q90.jpg_.webp",
                price: 199
            },
            {
                id: 1,
                name: "娃娃领泡泡袖衬衫+拼接蝴蝶结半裙",
                desc: "盐系穿搭小清新套装蓝色小清新娃娃领泡泡袖衬衫+拼接蝴蝶结半裙",
                image: "https://gw.alicdn.com/bao/uploaded/i2/1944673643/O1CN01PFvjUS1cmXYW6OMbq_!!1944673643.jpg_320x320q90.jpg_.webp",
                price: 38.8
            }
        ];
        let topicList = [
            {
                id: 0,
                name: "汉服上衣女夏款汉元素衬衣半身裙",
                image: "https://gw.alicdn.com/bao/uploaded/i4/4105858260/O1CN01e6Uddu2At8FkFCGQ5_!!0-item_pic.jpg_320x320q90.jpg_.webp",
                price: 199
            },
            {
                id: 1,
                name: "娃娃领泡泡袖衬衫+拼接蝴蝶结半裙",
                image: "https://gw.alicdn.com/bao/uploaded/i2/1944673643/O1CN01PFvjUS1cmXYW6OMbq_!!1944673643.jpg_320x320q90.jpg_.webp",
                price: 38.8
            }
        ];
        this.setData({
            banner: banner,
            newGoods: newGoodsList,
            hotGoods: hotGoodsList,
            topics: topicList,
        });
    },
    onLoad: function (options) {
        this.getIinitialData();
        this.setData({
            goodsCount: 66
        });
    },
})