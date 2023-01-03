var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp()
Page({
    data: {
        keywrod: '',
        searchStatus: false,
        goodsList: [],
        helpKeyword: [],
        historyKeyword: [],
        categoryFilter: false,
        currentSortType: 'default',
        currentSortOrder: '',
        filterCategory: [],
        defaultKeyword: {},
        hotKeyword: [],
        page: 1,
        size: 20,
        currentSortType: 'id',
        currentSortOrder: 'desc',
        categoryId: 0
    },
    //事件处理函数
    closeSearch: function () {
        wx.navigateBack()
    },
    clearKeyword: function () {
        this.setData({
            keyword: '',
            searchStatus: false
        });
    },
    onLoad: function () {
        this.getSearchKeyword();
    },
    getSearchKeyword() {
        this.setData({
            historyKeyword: ["除臭猫砂", "猫砂盆"],
            defaultKeyword: "请输入搜索内容",
            hotKeyword: [{
                keyword: "小夜灯"
            }]
        });
    },
    inputChange: function (e) {

        this.setData({
            keyword: e.detail.value,
            searchStatus: false
        });
        this.getHelpKeyword();
    },
    getHelpKeyword: function () {
        this.setData({
            helpKeyword: ["小香风外套", "羊毛大衣", "针织衫"]
        });
    },
    inputFocus: function () {
        this.setData({
            searchStatus: false,
            goodsList: []
        });

        if (this.data.keyword) {
            this.getHelpKeyword();
        }
    },
    clearHistory: function () {
        this.setData({
            historyKeyword: []
        });
    },
    getGoodsList: function () {
        this.setData({
            searchStatus: true,
            categoryFilter: false,
            goodsList: [],
            filterCategory: "",
            page: 1,
            size: 10
        });
        this.getSearchKeyword();
    },
    onKeywordTap: function (event) {
        this.getSearchResult(event.target.dataset.keyword);
    },
    getSearchResult(keyword) {
        this.setData({
            keyword: keyword,
            page: 1,
            categoryId: 0,
            goodsList: []
        });

        this.getGoodsList();
    },
    openSortFilter: function (event) {
        let currentId = event.currentTarget.id;
        switch (currentId) {
            case 'categoryFilter':
                this.setData({
                    'categoryFilter': !this.data.categoryFilter,
                    'currentSortOrder': 'asc'
                });
                break;
            case 'priceSort':
                let tmpSortOrder = 'asc';
                if (this.data.currentSortOrder == 'asc') {
                    tmpSortOrder = 'desc';
                }
                this.setData({
                    'currentSortType': 'price',
                    'currentSortOrder': tmpSortOrder,
                    'categoryFilter': false
                });

                this.getGoodsList();
                break;
            default:
                //综合排序
                this.setData({
                    'currentSortType': 'default',
                    'currentSortOrder': 'desc',
                    'categoryFilter': false
                });
                this.getGoodsList();
        }
    },
    selectCategory: function (event) {
        let currentIndex = event.target.dataset.categoryIndex;
        let filterCategory = this.data.filterCategory;
        let currentCategory = null;
        for (let key in filterCategory) {
            if (key == currentIndex) {
                filterCategory[key].selected = true;
                currentCategory = filterCategory[key];
            } else {
                filterCategory[key].selected = false;
            }
        }
        this.setData({
            'filterCategory': filterCategory,
            'categoryFilter': false,
            categoryId: currentCategory.id,
            page: 1,
            goodsList: []
        });
        this.getGoodsList();
    },
    onKeywordConfirm(event) {
        this.getSearchResult(event.detail.value);
    }
})