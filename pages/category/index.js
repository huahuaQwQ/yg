import { request }from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //左侧菜单数据
    leftMeanList:[],
    //右侧商品数据
    rightContent:[],
    //被点击的左侧的菜单
    currentIndex:0,
    //右侧内容的滚动条距离顶部的距离
    scrollTop: 0
  },
  //接口的返回数据
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * 0web中本地存储和小程序中本地存储区别：
     *    1 写代码方式不一样
     *      web：存储数据 localStorage.setItem("key","value")   获取数据 localStorage.getItem("key")
     *      小程序：存储数据 wx.setStorageSync("key","value");   获取数据 wx.getStorageSync("key");
     *      例子小程序：存储数据 wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});   获取数据 const Cates=wx.getStorageSync("cates");
     *    2 存储时，有没有做类型转换
     *      web：不管存入什么类型数据，最终都会调用 toString() ,把数据变成字符串再存入进去
     *      小程序：不存在类型转换，存什么类型，取什么类型
     * 1判断一下本地存储中有没有旧数据
     *  {time:Data.now(),data:[...]}
     * 2没有旧数据 直接发送新请求
     * 3有旧数据 同时旧数据没有过期就使用 本地存储中的旧数据即可
     */

    //1获取本地存储中数据 （小程序有本地存储技术）
    const Cates=wx.getStorageSync("cates");
    //2 判断
    if(!Cates){
      //数据不存在 发送请求 获取数据
      this.getCates();
    }else{
      //有旧数据 判断过期时间 超过10s(1000毫秒*10=10秒) 改成5分钟
      if(Date.now()-Cates.time>1000*10){
        //重新发送请求
        this.getCates();
      }else{
        //可以使用旧数据
        // console.log("可以使用旧数据");
        this.Cates=Cates.data;
        let leftMeanList=this.Cates.map(v=>v.cat_name);
        let rightContent=this.Cates[0].children;
        this.setData({
          leftMeanList,
          rightContent
        })
      }

    }

  },
  //获取分类数据
  async getCates() {
    // request({
    //   url: "/categories"
    // })
    //   .then(res => {
    //     this.Cates = res.data.message;

    //     // 把接口的数据存入到本地存储中
    //     wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });


    //     // 构造左侧的大菜单数据
    //     let leftMenuList = this.Cates.map(v => v.cat_name);
    //     // 构造右侧的商品数据
    //     let rightContent = this.Cates[0].children;
    //     this.setData({
    //       leftMenuList,
    //       rightContent
    //     })
    //   })

    // 1 使用es7的async await来发送请求
    const res = await request({ url: "/categories" });
    // this.Cates = res.data.message;
    this.Cates = res;
    // 把接口的数据存入到本地存储中
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
    // 构造左侧的大菜单数据
    let leftMenuList = this.Cates.map(v => v.cat_name);
    // 构造右侧的商品数据
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  //左侧菜单的点击事件
  handleItemTap(e){
    /**
     * 1 获取被点击标题身上的索引
     * 2 给data中的currentIndex赋值就可以了
     * 3 根据不同的索引来渲染右侧的商品内容
     */
    const {index}=e.currentTarget.dataset;
    let rightContent=this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      //重新设置右侧内容scroll-view标签的距离顶部的距离
          scrollTop:0
    })

  }
 

})