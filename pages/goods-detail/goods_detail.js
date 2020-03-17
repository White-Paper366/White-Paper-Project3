// pages/goods-detail/goods_detail.js
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options;
    this.getGoodsDetail(goods_id);
  },
  //获取商品的详情数据
  async getGoodsDetail(goods_id){
    const goodsObj = await request({ url: "/goods/detail", data:{goods_id} });
    this.GoodsInfo = goodsObj;
      this.setData({
        goodsObj
      })
  },
  //点击轮播图 放大预览
  handlePrevewImage(e){
    const urls = this.GoodsInfo.data.message.pics.map(v=>v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  },
  //加入购物车事件
  handleCartAdd(){
    //获取缓存中的购物车数组
    let cart = wx.getStorageSync("cart")||[];
    //判断商品对象是否存在于购物车中
    let index = cart.findIndex
(v => v.data.message.goods_id === this.GoodsInfo.data.message.goods_id);
     
    if(index===-1){
      //不存在购物车中 直接添加
      this.GoodsInfo.num=1;
      //添加购物车商品选中状态
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    }else{
      //已经存在购物车数据 执行num++
      cart[index].num++;
    }
    //把购物车重新添加到缓存中
    wx.setStorageSync("cart", cart)
    //弹窗提示
    wx.showToast({
      title: '加入成功',
      icon :'success',
      mask:true
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