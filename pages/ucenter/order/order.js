var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

Page({
    data: {
        orderList: []
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        this.getOrderList();
    },
    getOrderList() {
        // let that = this;
        // util.request(api.OrderList).then(function (res) {
        //     if (res.errno === 0) {
        //         that.setData({
        //             orderList: res.data.data
        //         });
        //     }
        // });
        this.setData({
            orderList: [
                {
                    id: 39,
                    order_sn: 1003938343232,
                    order_status_text: "待发货",
                    goodsList: [
                        {
                            id: 32,
                            list_pic_url: "https://yanxuan-item.nosdn.127.net/190c509790fac83c11c5c784edd3254f.png?type=webp&imageView&quality=65&thumbnail=330x330",
                            goods_name: "全家猫粮",
                            number: 3,
                        }
                    ],
                    actual_price: 58
                }
            ]
        });
    },
    payOrder() {
        wx.redirectTo({
            url: '/pages/pay/pay',
        })
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    }
})