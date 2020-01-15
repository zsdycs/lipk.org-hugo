1. 注册（包含上传头像）：POST /signup
1. 登录：POST /signin
1. 登出：GET /signout
1. 搜索：POST /search?keyword=xxx
1. 音频列表: GET /audiolist
1. 获取订单列表（已支付）: GET /ordelist
2. 购买
    1. 添加到购物车: POST /addcart
    1. 获取购物车商品表: GET /cartlist
    1. 提交订单: POST /addorde
    1. 购买确认（添加已支付）: POST /ordesure
2. 收藏
    1. 收藏: POST /like
    1. 收藏列表: GET /likelist