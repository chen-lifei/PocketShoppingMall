const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const user = require('../../../services/user.js');
const app = getApp();

Page({
    data: {
        userInfo: {},
        showLogin: true
    },
    onShow() {
        this.setData({
            userInfo: app.globalData.userInfo,
        });
        wx.hideTabBar();
    },
    onUserInfoClick() {
        if (wx.getStorageSync('token')) {
        } else {
            this.toggleLogin(true);
        }
    },
    toggleLogin(data) {
        if (typeof data == "boolean") {
            this.setData({
                showLogin: !!data
            });
        } else {
            if (data.target) {
                let show = Number(data.target.dataset.show);
                this.setData({
                    showLogin: !!show
                });
            }
        }
    },
    onDialogBody() {
        // 阻止冒泡
    },
    // 手机号登录
    onPhoneLogin() {},
    onEmailLogin() {
    },
    // 微信登录
    onWechatLogin(e) {
        if (e.detail.errMsg !== 'getUserInfo:ok') {
            if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
                return false
            }
            wx.showToast({
                title: '微信登录失败',
            })
            return false
        }
        util.login().then((res) => {
            return util.request(api.AuthLoginByWeixin, {
                code: res,
                userInfo: e.detail
            }, 'POST');
        }).then((res) => {
            console.log(res)
            if (res.errno !== 0) {
                wx.showToast({
                    title: '微信登录失败',
                })
                return false;
            }
            // 设置用户信息
            this.setData({
                userInfo: res.data.userInfo,
                showLogin: false
            });
            app.globalData.userInfo = res.data.userInfo;
            app.globalData.token = res.data.token;
            wx.setStorageSync('userInfo', JSON.stringify(res.data.userInfo));
            wx.setStorageSync('token', res.data.token);
        }).catch((err) => {
            console.log(err)
        })
    },
    onOrderInfoClick(event) {
        wx.navigateTo({
            url: '/pages/ucenter/order/order',
        });
    },
    onSectionItemClick(event) {
    },
    // 退出登录
    exitLogin() {
        wx.showModal({
            title: '',
            confirmColor: '#b4282d',
            content: '退出登录？',
            success(res) {
                if (res.confirm) {
                    wx.removeStorageSync('token');
                    wx.removeStorageSync('userInfo');
                    wx.switchTab({
                        url: '/pages/index/index'
                    });
                }
            }
        })
    },
});