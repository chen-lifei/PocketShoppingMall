App({
    onLaunch: function () {
        try {
            this.globalData.userInfo = !!wx.getStorageSync('userInfo') ? JSON.parse(wx.getStorageSync('userInfo')) : {
                nickname: "游客99887",
                avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftupian.qqw21.com%2Farticle%2FUploadPic%2F2022-4%2F202242710561814794.jpg&refer=http%3A%2F%2Ftupian.qqw21.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1674887937&t=6b87bca69fe836f8086a4f7a1d22f867'
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