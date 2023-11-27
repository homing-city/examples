import './mixins/index';

// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {
    wx.setEnableDebug({
      enableDebug: true
    });
  }
});
