var app = getApp();
var WxParse = require('../../lib/wxParse/wxParse.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({
    data: {
        id: 0,
        goods: {},
        attribute: [],
        issueList: [],
        comment: [],
        brand: {},
        specificationList: [],
        productList: [],
        relatedGoods: [],
        cartGoodsCount: 0,
        userHasCollect: 0,
        number: 1,
        checkedSpecText: '请选择规格数量',
        openAttr: false,
        noCollectImage: "/static/images/icon_collect.png",
        hasCollectImage: "/static/images/icon_collect_checked.png",
        collectBackImage: "/static/images/icon_collect.png"
    },
    getGoodsInfo: function () {
        this.setData({
            goods: {
                name: "汉服上衣女夏款汉元素衬衣半身裙",
                desc: "可以穿着上班的汉服上衣女夏款汉元素衬衣半身裙日常套装超仙显瘦",
                price: 199
            },
            imageList: [{
                id: 0,
                image: "https://gw.alicdn.com/bao/uploaded/i4/4105858260/O1CN01e6Uddu2At8FkFCGQ5_!!0-item_pic.jpg_320x320q90.jpg_.webp"
            }],
            attribute: [{
                name: "成分",
                value: "70%聚酯纤维 28%棉 2%氨纶"
            }],
            issueList: [{
                id: 0,
                question: "不合身的话可以怎样处理？",
                answer: "不合身或者不喜欢可以联系我们进行退换货处理哦~"
            }],
            comment: {
                count: 988,
                data: {
                    avatar: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202009%2F21%2F20200921093641_4ead4.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1675263091&t=26e52914887d8566a3cb0e89420c8f58",
                    nickname: "爱睡觉的蠢猫",
                    createTime: "2023/1/3 14:28",
                    content: "很漂亮的裙子，上身效果超好看的",
                    pictureList: [{
                        id: 0,
                        url: "https://gw.alicdn.com/bao/uploaded/i4/4105858260/O1CN01e6Uddu2At8FkFCGQ5_!!0-item_pic.jpg_320x320q90.jpg_.webp"
                    }]
                }
            },
            brand: {
                brandId: 8,
                name: "巴拉巴拉服饰"
            },
            specificationList: [],
            productList: [],
            userHasCollect: false
        });

        if (this.data.userHasCollect) {
            this.setData({
                'collectBackImage': this.data.hasCollectImage
            });
        } else {
            this.setData({
                'collectBackImage': this.data.noCollectImage
            });
        }
        // WxParse.wxParse('goodsDetail', 'html', res.data.info.goods_desc, that);
        this.getGoodsRelated();
    },
    getGoodsRelated: function () {
        this.setData({
            relatedGoods: [{
                id: 1,
                name: "娃娃领泡泡袖衬衫+拼接蝴蝶结半裙",
                desc: "盐系穿搭小清新套装蓝色小清新娃娃领泡泡袖衬衫+拼接蝴蝶结半裙",
                image: "https://gw.alicdn.com/bao/uploaded/i2/1944673643/O1CN01PFvjUS1cmXYW6OMbq_!!1944673643.jpg_320x320q90.jpg_.webp",
                price: 38.8
            }],
        });
    },
    clickSkuValue: function (event) {
        let that = this;
        let specNameId = event.currentTarget.dataset.nameId;
        let specValueId = event.currentTarget.dataset.valueId;

        //判断是否可以点击

        //TODO 性能优化，可在wx:for中添加index，可以直接获取点击的属性名和属性值，不用循环
        let _specificationList = this.data.specificationList;
        for (let i = 0; i < _specificationList.length; i++) {
            if (_specificationList[i].specification_id == specNameId) {
                for (let j = 0; j < _specificationList[i].valueList.length; j++) {
                    if (_specificationList[i].valueList[j].id == specValueId) {
                        //如果已经选中，则反选
                        if (_specificationList[i].valueList[j].checked) {
                            _specificationList[i].valueList[j].checked = false;
                        } else {
                            _specificationList[i].valueList[j].checked = true;
                        }
                    } else {
                        _specificationList[i].valueList[j].checked = false;
                    }
                }
            }
        }
        this.setData({
            'specificationList': _specificationList
        });
        //重新计算spec改变后的信息
        this.changeSpecInfo();

        //重新计算哪些值不可以点击
    },

    //获取选中的规格信息
    getCheckedSpecValue: function () {
        let checkedValues = [];
        let _specificationList = this.data.specificationList;
        for (let i = 0; i < _specificationList.length; i++) {
            let _checkedObj = {
                nameId: _specificationList[i].specification_id,
                valueId: 0,
                valueText: ''
            };
            for (let j = 0; j < _specificationList[i].valueList.length; j++) {
                if (_specificationList[i].valueList[j].checked) {
                    _checkedObj.valueId = _specificationList[i].valueList[j].id;
                    _checkedObj.valueText = _specificationList[i].valueList[j].value;
                }
            }
            checkedValues.push(_checkedObj);
        }

        return checkedValues;

    },
    //根据已选的值，计算其它值的状态
    setSpecValueStatus: function () {

    },
    //判断规格是否选择完整
    isCheckedAllSpec: function () {
        return !this.getCheckedSpecValue().some(function (v) {
            if (v.valueId == 0) {
                return true;
            }
        });
    },
    getCheckedSpecKey: function () {
        let checkedValue = this.getCheckedSpecValue().map(function (v) {
            return v.valueId;
        });

        return checkedValue.join('_');
    },
    changeSpecInfo: function () {
        let checkedNameValue = this.getCheckedSpecValue();

        //设置选择的信息
        let checkedValue = checkedNameValue.filter(function (v) {
            if (v.valueId != 0) {
                return true;
            } else {
                return false;
            }
        }).map(function (v) {
            return v.valueText;
        });
        if (checkedValue.length > 0) {
            this.setData({
                'checkedSpecText': checkedValue.join('　')
            });
        } else {
            this.setData({
                'checkedSpecText': '请选择规格数量'
            });
        }

    },
    getCheckedProductItem: function (key) {
        return this.data.productList.filter(function (v) {
            if (v.goods_specification_ids == key) {
                return true;
            } else {
                return false;
            }
        });
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        this.setData({
            id: parseInt(options.id),
            cartGoodsCount: 6
        });
        this.getGoodsInfo();
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
    },
    switchAttrPop: function () {
        if (this.data.openAttr == false) {
            this.setData({
                openAttr: !this.data.openAttr
            });
        }
    },
    closeAttr: function () {
        this.setData({
            openAttr: false,
        });
    },
    addCannelCollect: function () {
        let that = this;
        //添加或是取消收藏
        util.request(api.CollectAddOrDelete, {
                typeId: 0,
                valueId: this.data.id
            }, "POST")
            .then(function (res) {
                let _res = res;
                if (_res.errno == 0) {
                    if (_res.data.type == 'add') {
                        that.setData({
                            'collectBackImage': that.data.hasCollectImage
                        });
                    } else {
                        that.setData({
                            'collectBackImage': that.data.noCollectImage
                        });
                    }

                } else {
                    wx.showToast({
                        image: '/static/images/icon_error.png',
                        title: _res.errmsg,
                        mask: true
                    });
                }
            });
    },
    openCartPage: function () {
        wx.switchTab({
            url: '/pages/cart/cart',
        });
    },
    addToCart: function () {
        var that = this;
        if (this.data.openAttr === false) {
            //打开规格选择窗口
            this.setData({
                openAttr: !this.data.openAttr
            });
        } else {

            //提示选择完整规格
            if (!this.isCheckedAllSpec()) {
                wx.showToast({
                    image: '/static/images/icon_error.png',
                    title: '请选择规格',
                    mask: true
                });
                return false;
            }

            //根据选中的规格，判断是否有对应的sku信息
            let checkedProduct = this.getCheckedProductItem(this.getCheckedSpecKey());
            if (!checkedProduct || checkedProduct.length <= 0) {
                //找不到对应的product信息，提示没有库存
                wx.showToast({
                    image: '/static/images/icon_error.png',
                    title: '库存不足',
                    mask: true
                });
                return false;
            }

            //验证库存
            if (checkedProduct.goods_number < this.data.number) {
                //找不到对应的product信息，提示没有库存
                wx.showToast({
                    image: '/static/images/icon_error.png',
                    title: '库存不足',
                    mask: true
                });
                return false;
            }

            //添加到购物车
            util.request(api.CartAdd, {
                    goodsId: this.data.goods.id,
                    number: this.data.number,
                    productId: checkedProduct[0].id
                }, "POST")
                .then(function (res) {
                    let _res = res;
                    if (_res.errno == 0) {
                        wx.showToast({
                            title: '添加成功'
                        });
                        that.setData({
                            openAttr: !that.data.openAttr,
                            cartGoodsCount: _res.data.cartTotal.goodsCount
                        });
                    } else {
                        wx.showToast({
                            image: '/static/images/icon_error.png',
                            title: _res.errmsg,
                            mask: true
                        });
                    }

                });
        }

    },
    cutNumber: function () {
        this.setData({
            number: (this.data.number - 1 > 1) ? this.data.number - 1 : 1
        });
    },
    addNumber: function () {
        this.setData({
            number: this.data.number + 1
        });
    }
})