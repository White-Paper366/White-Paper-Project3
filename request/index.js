export const request=(params)=>{
  //显示加载中弹框
wx-wx.showLoading({
  title: '加载中',
  mask: true
})

  return new Promise((resolve,reject)=>{
    //截取接口的公共路径
    const baseURL = "https://api.zbztb.cn/api/public/v1";
    wx.request({
    ...params,
    //将公共路径的部分与传递过来的路径结合
    url:baseURL+params.url,
    success:(result)=>{
      resolve(result);
    },
    fail:(err)=>{
      reject(err);
    },
    complete:()=>{
      //关闭正在等待的图标
      wx.hideLoading();
    }
    })
  });
}