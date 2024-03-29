const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const user = require('../../../services/user.js');
const app = getApp();

Page({
    data: {
        loginType: "",
        errorText: "",
        showLogin: false,
        codeLogin: true,
        checkPolicy: true,
        userInfo: {},
        loginData: {
            phone: "",
            email: "",
            password: "",
            code: ""
        },
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
    enterLogin(data) {
        let loginType = data.target && data.target.dataset.type;
        this.setData({
            loginType
        });
    },
    toggleCodeLogin() {
        this.setData({
            codeLogin: !this.data.codeLogin
        });
    },
    // 清空手机号
    handleClearNumber() {
    },
    onLogin() {
        let loginData = this.data.loginData;
        if (this.data.loginType === "phone") {
            if (!loginData.phone) return this.setData({ errorText: "请输入手机号" });
            if (!loginData.phone) return this.setData({ errorText: "手机号码格式错误，请更换后重试" });
            if (this.data.codeLogin) {
                if(!loginData.code) return this.setData({ errorText: "请输入短信验证码" });
                if(loginData.code.length !== 6) return this.setData({ errorText: "短信验证码格式错误" });
            }
            if (!this.data.codeLogin && !loginData.password) return this.setData({ errorText: "请输入密码" });
        } else if (this.data.loginType === "email") {
            if (!loginData.email) return this.setData({ errorText: "请输入邮箱" });
            if (!loginData.email) return this.setData({ errorText: "邮箱格式错误，请更换后重试" });
            if (!loginData.password) return this.setData({ errorText: "请输入密码" });
        }
        if (!this.data.checkPolicy) return this.setData({ errorText: "您需要同意相关条款才能使用" });
        this.setData({ errorText: "" });
    },
    // 手机号登录
    onPhoneLogin() {},
    onEmailLogin() {
    },
    onInput(e) {
        let loginData = this.data.loginData;
        let type = e.target.dataset.type;
        loginData[type] = e.detail.value;
        this.setData({
            loginData
        });
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