Component({
    behaviors: [],
    options: {
        addGlobalClass: true,
    },
    // 属性定义
    properties: {
        name: {
            type: String,
            value: ''
        },
    },
    data: {},
    lifetimes: {
        attached: function () {},
        moved: function () {},
        detached: function () {},
    },
    attached: function () {},
    ready: function () {},
    pageLifetimes: {
        show: function () {},
        hide: function () {},
        resize: function () {},
    },
    methods: {
    }
});