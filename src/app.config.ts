export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/mall/index',
    'pages/cart/index',
    'pages/mine/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '小程序名称',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#8d9199',
    selectedColor: '#1677ff',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/tabbar/home-normal.png',
        selectedIconPath: 'assets/tabbar/home-selected.png'
      },
      {
        pagePath: 'pages/mall/index',
        text: '商城',
        iconPath: 'assets/tabbar/mall-normal.png',
        selectedIconPath: 'assets/tabbar/mall-selected.png'
      },
      {
        pagePath: 'pages/cart/index',
        text: '购物车',
        iconPath: 'assets/tabbar/cart-normal.png',
        selectedIconPath: 'assets/tabbar/cart-selected.png'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: 'assets/tabbar/mine-normal.png',
        selectedIconPath: 'assets/tabbar/mine-selected.png'
      }
    ]
  }
})
