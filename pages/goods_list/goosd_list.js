// pages/goods_list/goosd_list.js
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList:[]
  },
    QueryParams:{
      query:"",
      cid:"",
      pagenum:1,
      pagesize:10
    },
    //总页数
    totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.QueryParams.cid = options.cid;
      this.getGoodsList();
  },
  //获取商品列表数据
  async getGoodsList(){
    const res = await request({ url: "/goods/search", data: this.QueryParams});
    //获取总条数
    const total = res.data.message.total;
    //计算总页数
    this.totalPages = Math.ceil(total/this.QueryParams.pagesize);
    this.setData({
      //  拼接数组
      goodsList: [...this.data.goodsList, ...res.data.message.goods]
    })
    // 关闭下拉刷新等待效果
    wx.stopPullDownRefresh();
  },


  //标题点击事件，从子组件传递过来的
  bindtabsItemChange(e){
   //获取被点击标题的索引
   const {index} = e.detail;
   //将循环传过来的索引与被点击的索引进行比对 修改原数组
   let {tabs} = this.data;
   tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
   //将修改后的标题状态赋值到data中
   this.setData({
     tabs
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
    //重置数据数组
    goodsList:[]
    //重置页码
    this.QueryParams.pagenum = 1
    //重新请求数据
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //判断是否还有下一页数据
    if(this.QueryParams.pagenum>=this.totalPages){
       wx,wx.showToast({
         title: '没有数据了'
       })
    }else{
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})