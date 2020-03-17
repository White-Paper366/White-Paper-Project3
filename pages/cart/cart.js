// pages/cart/cart.js
import { getSetting, chooseAddress, openSetting, showModal, showToast} from "../../utils/async.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allChecked:false ,
    totalPrice:0,
    totalNum:0
  },
 
   //点击 获取收货地址
   async handleAddRess() {
    try {
     //获取权限状态
     const res1 = await getSetting();
     const scopeAddress = res1.authSetting["scope.address"];
     //判断权限状态
     if (scopeAddress === false) {
       //收货地址为空则 引导用户打开授权页面
       await openSetting();
     }
     //调用获取收货地址的api
     const address = await chooseAddress();
     //将收货地址存入到缓存中
      wx.setStorageSync("address", address)
  } catch(error){
   console.log(err)
  }
 },
 //商品的选中
  handleItemChange(e){
    //获取被修改商品的id
    const goods_id = e.currentTarget.dataset.id;
    //获取购物车数组
    let {cart} = this.data;
    //找到被修改的商品对象
    let index = cart.findIndex(v=>v.data.message.goods_id===goods_id);
    //进行状态取反
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },
  //设置购物车状态的同时，重新计算 底部工具栏的数据 全选状态 总价格和数量
  setCart(cart){
    let allChecked = true;
    //总价格，总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.data.message.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    })
    //判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      totalPrice, totalNum, allChecked
    });
    //把购物车数据重新设置回data中和缓存中
    wx.setStorageSync("cart", cart);
  },
  //商品全选功能
  handleItemallCheck(){
    //获取data中的数据
    let {cart,allChecked} = this.data;
    //修改值
    allChecked = !allChecked;
    //循环修改cart数组中的商品选中状态
    cart.forEach(v=>v.checked=allChecked)
    //把修改后的值 填充到data或者是缓存中
    this.setCart(cart);
  },
  //商品数量编辑
  async handleItemNumEdit(e){
    //获取传递过来的参数
    const {operation,id} = e.currentTarget.dataset;
    //获取购物车数组
    let {cart} = this.data;
    //找到需要修改商品的索引
    const index = cart.findIndex(v=>v.data.message.goods_id===id);
    //当商品数量小于1点击按钮时判断是否删除
    if(cart[index].num===1&&operation===-1){
      //弹出提示框是否删除
      const res = await showModal({ content:"是否要删除该商品" });
      if (res.confirm) {
        cart.splice(index, 1);
        this.setCart(cart);
      }
    }else{
      //进行修改数量
      cart[index].num += operation;
      //把修改后的数据设置回data或者是缓存中
      this.setCart(cart);
    }
  },
  //点击 结算
  async handlePay(){
    //判断收货地址
    const { address, totalNum} = this.data;
    if(!address.userName){
      await showToast({title:"请选择收货地址哦"});
      return;
    }
    //判断商品选购
    if(totalNum===0){
      await showToast({ title: "您还没有选购商品哦" });
      return;
    }
    //跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/pay'
    })
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
    const cart = wx.getStorageSync("cart")||[];
    this.setData({ address });
    this.setCart(cart);
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