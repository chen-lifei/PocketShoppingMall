App({
    onLaunch: function () {
        try {
            this.globalData.userInfo = !!wx.getStorageSync('userInfo') ? JSON.parse(wx.getStorageSync('userInfo')) : {
                nickname: "游客99887",
                avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202104%2F22%2F20210422220420_0a16e.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1681900348&t=66d61da6e6f96ee36ea24f5d20da0ab8'
            };
            this.globalData.token = wx.getStorageSync('token');
        } catch (e) {
            console.log(e);
        }
    },

    globalData: {
        userInfo: {},
        token: '',
    }
})