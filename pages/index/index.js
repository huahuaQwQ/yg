//0 引入 用来发送请求的方法
import { request }from "../../request/index.js";
Page({
    data: {
        //轮播图 数组
        swiperList:[],
        //导航 数组
        catesList:[],
        //楼层 数据
        floorList:[]
    },
    //options(Object)
    onLoad: function(options) {
        //1 发送异步请求获取轮播图数据 优化异步请求 可以用es6 的promise来解决
        //2 尝试用spring boot 写一个接口
        // wx.request({
        //     url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
        //     success: (result) => {
        //        this.setData({
        //         swiperList:result.data.message
        //        })
        //     }
        // });
        this.getSwiperList();
        this.getCatesList();
        this.getFloorList();
    },

    //获取轮播图数据
    getSwiperList(){
        request({url:"/home/swiperdata"})
        .then(result=>{
            this.setData({
                swiperList:result
            })
        })
    },
    //获取 分类导航数据
    getCatesList(){
        request({url:"/home/catitems"})
        .then(result=>{
            this.setData({
                catesList:result
            })
        })
    },
    //获取 楼层数据
    getFloorList(){
        request({url:"/home/floordata"})
        .then(result=>{
            this.setData({
                floorList:result
            })
        })
    }


});