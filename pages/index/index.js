import { request }from "../../request/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
    swiperList:[],
    //导航图片数组
    catesList:[],
    //首页楼层图片数据
    floorList:[]
  },

  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1.发送异步请求获取轮播图数据
    //小程序原生方式
    /*wx.request({
      //请求地址
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      //请求成功之后的回调函数
      success:(result)=>{
        this.setData({
          swiperList: result.data.message
        })
      }
    })*/
    this.getSwiperList();
    this.getcatesList();
    this.getfloorList();
  },
   //Promise封装的请求方式
   //获取轮播图数据
  getSwiperList() {
    request({ url: "/home/swiperdata" })
      .then(result => {
        this.setData({
          swiperList: result.data.message
        })
      })
  },
  //获取导航图片数据
  getcatesList() {
    request({ url: "/home/catitems" })
      .then(result => {
        this.setData({
          catesList: result.data.message
        })
      })
  },
  //获取首页楼层图片数据
  getfloorList() {
    request({ url: "/home/floordata" })
      .then(result => {
        this.setData({
          floorList: result.data.message
        })
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})