// pages/pay/pay.js
import { getSetting, chooseAddress, openSetting, showModal, showToast } from "../../utils/async.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    //获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    //获取缓存中购物车的信息
    let cart = wx.getStorageSync("cart") || [];
    //过滤后的购物车数组
    cart = cart.filter(v=>v.checked);
    this.setData({ address });

    //总价格，总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
        totalPrice += v.num * v.data.message.goods_price;
        totalNum += v.num;
    })
    this.setData({
      cart,
      totalPrice, totalNum,
      address
    });
  },
  //点击支付
  handleOderPay(){
   //判断缓存中有没有token
   const token = wx.getStorageSync("token");
   //判断
   if(!token){
    wx.navigateTo({
      url: '/pages/auth/auth',
    });
    return;
   }
   console.log("已经存在token")
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