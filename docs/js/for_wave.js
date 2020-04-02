// playing svg and play svg
var playing_svg_str = '<svg fill=\"currentColor\" preserveAspectRatio=\"xMidYMid meet\" height=\"1em\" width=\"1em\"' +
  'viewBox=\"0 0 30 30\" class=\"play_svg\" data-test-selector=\"audioplayerPauseButton\" style=\"vertical-align: middle;\">' +
  '<title>Pause</title><g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">' +
  '<g transform=\"translate(-1.000000, -1.000000)\" fill=\"#000\" fill-rule=\"nonzero\">' +
  '<path d=\"M16,1 C7.7125,1 1,7.7125 1,16 C1,24.2875 7.7125,31 16,31 C24.2875,31 31,24.2875 31,16 C31,7.7125 24.2875,1 16,1 Z M14.8779764,17.678113 L14.8554276,22.1907022 C14.8665399,22.3146295 14.8326113,22.4160768 14.7536409,22.4950472 C14.6746704,22.5740177 14.5732231,22.6079463 14.4492959,22.596834 L12.8098773,22.6157868 C12.6972034,22.6159278 12.5986681,22.5737991 12.5142684,22.4893995 C12.4298687,22.4049998 12.38774,22.3064645 12.3878811,22.1937905 L12.4104298,17.6812013 C12.4105708,17.5685274 12.3975126,14.4982006 12.3976536,14.3855267 L12.4033225,9.85605765 C12.4034635,9.74338373 12.445839,9.64474264 12.5304502,9.56013144 C12.6150614,9.47552023 12.7137025,9.43314475 12.8263764,9.43300373 L14.4657527,9.44785293 C14.5784266,9.44771191 14.6769619,9.48984061 14.7613616,9.57424029 C14.8457613,9.65863996 14.88789,9.75717529 14.8877489,9.86984921 L14.8652002,14.3824384 C14.8650592,14.4951123 14.8781174,17.5654391 14.8779764,17.678113 Z M19.7513089,17.678113 L19.7287601,22.1907022 C19.7398724,22.3146295 19.7059438,22.4160768 19.6269733,22.4950472 C19.5480029,22.5740177 19.4465556,22.6079463 19.3226284,22.596834 L17.6832098,22.6157868 C17.5705359,22.6159278 17.4720006,22.5737991 17.3876009,22.4893995 C17.3032012,22.4049998 17.2610725,22.3064645 17.2612135,22.1937905 L17.2837623,17.6812013 C17.2839033,17.5685274 17.2708451,14.4982006 17.2709861,14.3855267 L17.276655,9.85605765 C17.276796,9.74338373 17.3191715,9.64474264 17.4037827,9.56013144 C17.4883939,9.47552023 17.587035,9.43314475 17.6997089,9.43300373 L19.3390851,9.44785293 C19.4517591,9.44771191 19.5502944,9.48984061 19.6346941,9.57424029 C19.7190937,9.65863996 19.7612224,9.75717529 19.7610814,9.86984921 L19.7385326,14.3824384 C19.7383916,14.4951123 19.7514499,17.5654391 19.7513089,17.678113 Z\">' +
  '</path></g></g></svg>';
var play_svg_str = '<svg fill=\"currentColor\" preserveAspectRatio=\"xMidYMid meet\" height=\"1em\" width=\"1em\"' +
  'viewBox=\"0 0 30 30\" class=\"play_svg\" style=\"vertical-align:middle\">' +
  '<title>Play</title><g stroke="none" stroke-width="1" fill=\"none\" fill-rule=\"evenodd\">' +
  '<g transform=\"translate(-1.000000, -1.000000)\" fill=\"#000\" fill-rule=\"nonzero\">' +
  '<path d=\"M21.2224954,16.2938514 C21.2876061,16.3396427 21.320161,16.4006969 21.320161,16.4770157 C21.320161,16.5685983 21.2876061,16.6372842 21.2224954,16.6830755 L13.9952401,22.2466908 C13.9301294,22.2924821 13.8406034,22.3001139 13.7266597,22.2695864 C13.6289936,22.2237951 13.5801612,22.1474774 13.5801612,22.040631 L13.5801612,10.9134004 C13.5801612,10.8218178 13.6289936,10.7531319 13.7266597,10.7073406 C13.8243258,10.6615493 13.9138517,10.6691811 13.9952401,10.7302361 L21.2224954,16.2938514 Z M16,1 C7.7125,1 1,7.7125 1,16 C1,24.2875 7.7125,31 16,31 C24.2875,31 31,24.2875 31,16 C31,7.7125 24.2875,1 16,1 Z M16,29.0645161 C8.79818548,29.0645161 2.93548387,23.2018145 2.93548387,16 C2.93548387,8.79818548 8.79818548,2.93548387 16,2.93548387 C23.2018145,2.93548387 29.0645161,8.79818548 29.0645161,16 C29.0645161,23.2018145 23.2018145,29.0645161 16,29.0645161 Z\">' +
  '</path></g></g></svg>';

var list = ["(失明前)我想记得的四十七件事 - 陈绮贞.mp3", "(给我)说一句 - 连诗雅.mp3", "7538(Me U-Remix) - KT,长气制作,Chiu Chiu.mp3", "9420 - 麦小兜.mp3", "A Lovely Way To Spend An Evening - Eddie Higgins Trio.mp3", "ADAMAS - 试听版 - LiSA.mp3", "Auld Lang Syne (Live) - 王菲.mp3", "Away - Sleep Dealer.mp3", "Beauty And The Beast - 手嶌葵.mp3", "BINGBIAN病变（Cover 江澈 ／ cubi） - 秋仁.mp3", "Brighter Than Sunshine - Aqualung.mp3", "Call - Karyn Williams.mp3", "Cerezo Rosa - Antonio de Lucena.mp3", "City Of Stars - From ＂La La Land＂ Soundtrack - Ryan Gosling,Emma Stone.mp3", "Close to You - Olivia Ong.mp3", "CLOSE TO YOU - 押尾コータロー.mp3", "Colin Wine's Mailbox - 刘昊霖,kidult.mp3", "Count On Me - Bruno Mars.mp3", "Creep - Radiohead.mp3", "Cubi／Fi9江澈／Younglife-病变Remix（阮豆／Cy Remix） - 阮豆,Cy.mp3", "Curiosity - Carly Rae Jepsen.mp3", "Dalaa - Eddy.mp3", "Dreams - The Cranberries.mp3", "East of Eden - Zella Day.mp3", "Falling Slowly - Glen Hansard,Markéta Irglová.mp3", "Flashlight - From ＂Pitch Perfect 2＂ Soundtrack - Jessie J.mp3", "FLY 民谣版（我是江小白 插曲 依妮演唱 饰夕雨） - 魏小涵.mp3", "FLY 民谣版（我是江小白 插曲 罗雪儿演唱 饰佟离） - 魏小涵.mp3", "Grace and Seraphim - Tamas Wells.mp3", "Gymnopedie Nr. 1 - Martin Ermen.mp3", "Happy - Pharrell Williams.mp3", "He's a Pirate (Pirates of the Caribbean theme) - David Garrett.mp3", "Hidden Path - Sleep Dealer.mp3", "Horizon - Janji.mp3", "I Will Follow Him - Peggy March.mp3", "If I Die Young - The Band Perry.mp3", "If You Want Me - Glen Hansard,Markéta Irglová.mp3", "Imagine - John Lennon.mp3", "In Love - July.mp3", "Intro - The xx.mp3", "Kong - 侧田.mp3", "La Valse D'amelie - Yann Tiersen.mp3", "Les larmes d'automne - Luigi Rubino.mp3", "Love Story Theme - Mantovani & His Orchestra.mp3", "Lucky! - 夏之禹.mp3", "Mathilde's First Waltz - Bark Cat Bark.mp3", "Miss You Tonight - 茶小姐和熊先生.mp3", "My Soul - July.mp3", "Night Changes - One Direction.mp3", "Nothing Else - Angus & Julia Stone.mp3", "Only Trust Your Heart - Diana Krall,Christian McBride.mp3", "Por Una Cabeza - Thomas Newman.mp3", "Purple Passion - Diana Boncheva.mp3", "Right Here Waiting - Ulli Bögershausen.mp3", "River Flows In You (Original Mix) - Mark Pride.mp3", "Riverside - Agnes Obel.mp3", "Say Hello - Rosie Thomas.mp3", "secret base ~君がくれたもの~ - SILENT SIREN.mp3", "Secret Garden - 舒淇.mp3", "Stronger - Inez.mp3", "Sweet About Me - Twenty Ten Version - Gabriella Cilmi.mp3", "Sweetie(Be_Mine) - J.Boss,Desweet 怼甜.mp3", "The Dream Waltz - Mike Strickland.mp3", "Ther - Kraffa.mp3", "Think Again - Kate Havnevik.mp3", "Till The World Ends - Britney Spears.mp3", "Tram - 舒淇.mp3", "Valder Fields 2009北京演唱会 - Tamas Wells.mp3", "Visions - Acreix.mp3", "Waltz - Mike Paer.mp3", "We Are One - Kelly Sweet.mp3", "What Are Words - Chris Medina.mp3", "Wonderful U (Demo Version) - AGA.mp3", "You Can't Stop The Beat - John Travolta,Amanda Bynes,Queen Latifah.mp3", "you　- 2014再ミックス Thanks／you ver. - - M.Graveyard,癒月.mp3", "《瞬间的永恒》夜色钢琴曲 - 赵海洋.mp3", "あの頃～ジンジンバオヂュオニー～ - whiteeeen.mp3", "ありがとう - 大橋卓弥.mp3", "いつも何度でも - 伊藤サチコ.mp3", "いのちの名前 - 広橋真紀子.mp3", "ひとり上手 - 中島みゆき.mp3", "一 - AGA.mp3", "一丝不挂 - 陈奕迅.mp3", "一个人生活 - 林凡.mp3", "一个人飞 - 李克勤.mp3", "一事无成 - 周柏豪,郑融.mp3", "一别两宽 - 佳利.mp3", "一厘米 - AGA.mp3", "一场朋友 - 许美静.mp3", "一格格 - 卫兰.mp3", "一步一生 - 许志安.mp3", "一生一心(机场版) - 梁朝伟.mp3", "一起走过的日子(Live) - live - 刘德华.mp3", "一身诗意千寻瀑 - 不才.mp3", "七友 - 梁汉文.mp3", "七月上 - Jam.mp3", "万水千山总是情 - 汪明荃.mp3", "三千年前 - 关淑怡.mp3", "三千年后 - 李香琴.mp3", "下一站茶山刘 - 房东的猫.mp3", "下半生(粤语版) - 郭燕.mp3", "下雨看世界 - 古巨基.mp3", "不再犹豫 - Beyond.mp3", "不再联系 - 程响.mp3", "不只爱情 - 区文诗.mp3", "不方便的真相 - 麦家瑜.mp3", "不来也不去 - 陈奕迅.mp3", "不许你注定一人 - Dear Jane.mp3", "世界尽头 - 撒娇.mp3", "世纪末烟火 - 易桀齐.mp3", "为爱冒险 - 胡鸿钧.mp3", "乌云中 (Live) - 艾热.mp3", "乐园(粤) - 与非门乐队.mp3", "二十世纪少年(Unplugged) - unplug - Ping Pung.mp3", "于心有愧 - 陈奕迅.mp3", "云烟成雨 - 房东的猫.mp3", "亡命之徒 - 纵贯线.mp3", "人间 - 王菲.mp3", "人非草木 - 吴雨霏.mp3", "今年没圣诞(我们都迷失了) - 许志安.mp3", "从头再来 (Live) - 刘欢.mp3", "他的爱我的怯 (剧场版) (feat. 郑伊健 & 陈冠希 & 陈奕迅)(TV Verison) - 容祖儿.mp3", "他约我去迪士尼 - 陈慧琳,陈晓琪.mp3", "仙乐处处飘 - Lil' Ashes.mp3", "会过去的 - 车婉婉,许志安.mp3", "传说 - 薛之谦.mp3", "伤信 - 陈洁丽.mp3", "何故.何苦.何必 - 彭家丽.mp3", "佛系少女 - 冯提莫.mp3", "作曲家 - 李荣浩.mp3", "你一定要幸福 (cover 何洁) - 简弘亦.mp3", "你再也读不出我任何欲望 - Cicada.mp3", "你在终点等我 (Cover 王菲) - 冯提莫.mp3", "你在终点等我 - 王菲.mp3", "你我之间 - 周也棠.mp3", "你有没有见过他（Cover 慕容毓） - 不才.mp3", "你爱我爱不起 - 郑秀文.mp3", "你的手信 - 陈慧敏.mp3", "依恋 - 蔡淳佳.mp3", "侧脸 - 于果.mp3", "信口开河 - 侧田.mp3", "信我 - 侧田.mp3", "借我 - 谢春花.mp3", "倾城 - 许美静.mp3", "假如让你吻下去(Live) - live - 张敬轩.mp3", "偏爱 - 张芸京.mp3", "偿还 - 邓丽君.mp3", "傻女 - 容祖儿.mp3", "像暗杀似的绕到背后突然拥抱你（治愈版）（Cover：彦祖）（Cover：太一） - 邓壬鑫.mp3", "光辉岁月 - Beyond.mp3", "其实都没有 - 杨宗纬.mp3", "再没这样的人 - 夏初安.mp3", "再生花 - 陈慧琳.mp3", "再见悲哀 - 林忆莲.mp3", "冷战 - 王菲.mp3", "凶手 - 戴辛尉.mp3", "分分钟需要你 - 林子祥.mp3", "到此为止 (Dear Jane Version) - Dear Jane.mp3", "到此为止 (iTunes Session) - 周柏豪.mp3", "到此为止 - 连诗雅.mp3", "到此为止.mp3", "前所未见 - 陈慧琳.mp3", "加减乘除 - 刘小慧.mp3", "劲歌金曲 - 古巨基.mp3", "匆匆那年 - 王菲 (1).mp3", "匆匆那年 - 王菲.mp3", "北方 - 倪健.mp3", "北欧是我们的死亡终站 - my little airport.mp3", "十个放火的少年 - 李拾壹,刘以达.mp3", "十二（Cover 留声玩具） - 张罐子.mp3", "千千阙歌 - 陈慧娴.mp3", "南国之舞 - 梁翘柏.mp3", "卜卜卜 - Lil' Ashes.mp3", "历历万乡（Cover 陈粒） - 孟大宝.mp3", "友情多余暧昧未够 - 乐思言.mp3", "友谊之光 - Maria Cordero.mp3", "双双 (Duet Version) - 李幸倪,郭伟亮.mp3", "取消资格 - 陈小春.mp3", "只只 - 孟凡明.mp3", "只要平凡 - 张杰,张碧晨.mp3", "听你说（Cover 郁可唯和林凡） - 冯提莫,二珂,栾宝宝.mp3", "启程 - 水木年华.mp3", "哪儿 - Lil' Ashes.mp3", "唇语 - 任然.mp3", "唱给你的歌 - 河图.mp3", "喊你的名字 - 吉克隽逸.mp3", "喜帖街 - 王闻.mp3", "回忆(伴奏) - instrumental - 侯志坚.mp3", "回旋木马的终端 - 梁咏琪.mp3", "因为爱情 - 陈奕迅,王菲.mp3", "围城 - Kolor.mp3", "圆 - AGA.mp3", "圣诞路人 - 乐瞳.mp3", "在到处之间找我 - 梁翘柏.mp3", "地尽头 - 关淑怡.mp3", "城南花已开 - 三亩地.mp3", "堆积情感 - 邝美云.mp3", "墙外之音 - 平原习作.mp3", "多情 - 黎瑞恩.mp3", "大约别离时 - 关正杰.mp3", "天之痕(钢琴版) - 群星.mp3", "天后（国粤版）（Cover 陈势安） - 阿细.mp3", "天天 - 刘蕴晴.mp3", "天空 - 王菲.mp3", "天黑黑 - 孙燕姿.mp3", "失常 - 官恩娜.mp3", "女皇的新衣 - 王菲.mp3", "好久不见 - 陈奕迅.mp3", "好好恋爱 - 邓丽欣,方力申.mp3", "好好过 - 连诗雅.mp3", "好好（想把你写成一首歌）（Cover 五月天） - 小义学长.mp3", "如果一生只有三十岁 - 新青年理发厅.mp3", "如果有来生 - 不才.mp3", "如风 - 王菲.mp3", "孤雏 - AGA.mp3", "孩子气 - 陈妍希.mp3", "孱弱 - 关楚耀.mp3", "守护天使 - 邓健泓.mp3", "完 - 陈奕迅.mp3", "宝记正传 (Forever Mix) - remix - 群星.mp3", "寂寞的风 - 邝美云.mp3", "小传奇 - Mr.mp3", "小小的太阳 - 张宇.mp3", "小聪明 - 杨丞琳.mp3", "小风波+相识非偶然+半梦半醒+雾之恋+爱在深秋+爱是这样甜(Live) - live - 谭咏麟.mp3", "少林英雄 - 于荣光.mp3", "岁月神偷 - 周笔畅.mp3", "岁月神偷 - 金玟岐.mp3", "带着音乐去旅行 - 二珂.mp3", "幸而 - 胡杏儿.mp3", "广东十年爱情故事 - 广东雨神.mp3", "广东爱情故事 - 广东雨神.mp3", "床前明月光 - 阿智,hugo.mp3", "应许何遇（Cover 原曲 ／ 紫禁情） - 漆柚.mp3", "开一扇窗 - 李昊嘉.mp3", "开到荼蘼 - 王菲.mp3", "开学礼 - 李克勤.mp3", "弄堂口 - 詹思祺.mp3", "当你 - 王心凌.mp3", "当安静的公园披上了夜网, 东方的夜莺徒然向玫瑰花歌唱 - 饭碗的彼岸.mp3", "当爱在靠近 - 胡瑞特.mp3", "影 - 柴咲コウ.mp3", "往日时光 - 谭维维.mp3", "微甜的回忆 - 杨子姗.mp3", "心愿 - 四个女生.mp3", "心有不甘 - 卫兰.mp3", "心淡 - 容祖儿,彭羚.mp3", "心经 - 王菲.mp3", "心虚 - 梁君诺.mp3", "心路 - 王菲.mp3", "忘川 - 陈僖仪.mp3", "忽如远行客 - 慕容毓.mp3", "怎么说我不爱你 - 萧敬腾.mp3", "思前恋后.mp3", "急救中 - Robynn & Kendy.mp3", "性情中人 - 苏永康,JW.mp3", "怯 - 容祖儿.mp3", "总有你鼓励 - 左麟右李.mp3", "恋爱サーキュレーション - 花澤香菜.mp3", "悲剧人物 - 张敬轩.mp3", "情人知己 - 叶蒨文.mp3", "情已逝+蓝雨+爱得比你深+头发乱了(Live) - live - 张学友.mp3", "情歌 - 侧田.mp3", "情歌 - 关心妍.mp3", "情歌王 - 古巨基.mp3", "想把我唱给你听 - 老狼,王婧.mp3", "愿你决定 - 张国荣.mp3", "愿得一人心 - 李行亮.mp3", "成全 - 刘若英.mp3", "成都 - 赵雷.mp3", "我不动 - 周柏豪.mp3", "我不是伟人 (粤) - 陈小春.mp3", "我也不想这样 - 徐佳莹.mp3", "我们的明天 - 鹿晗.mp3", "我们都是好孩子 - 王筝.mp3", "我只在乎你 - 邓丽君.mp3", "我唔识拍拖 - 杨斌.mp3", "我怎样才会知道你是不是一个贱人 - Serrini樹妮妮.mp3", "我有我天地 - 彭羚.mp3", "我的未来式 - 郭采洁.mp3", "我要你 - 老狼,任素汐.mp3", "手紙 ~拝啓 十五の君へ~.mp3", "承蒙错爱 - 小义学长.mp3", "换个他 - 沈震轩.mp3", "搜神记 - 容祖儿.mp3", "放晴 - 梁正.mp3", "放生 - 范逸臣.mp3", "敢爱敢做 - 林子祥,林凯轩.mp3", "斤两十足(FULL VERSION) - 许冠杰.mp3", "无尽的爱 - 关淑怡.mp3", "无谓再假 - Mr.mp3", "无赖 - 郑中基.mp3", "日落日出 (Christmas Morning Remix) - 周柏豪,连诗雅.mp3", "旧街角 - 连诗雅.mp3", "旭丘分校校歌 - 小岩井ことり,村川梨衣,佐倉綾音.mp3", "时间走得太快，我们还没有来得及看清快乐 - 理想青年.mp3", "明天你是否依然爱我 - 谭咏麟,关淑怡.mp3", "明知做戏 - 吴雨霏.mp3", "星星月亮太阳 - 林二汶.mp3", "昨迟人 - 许志安.mp3", "是不是这样的夜晚你才会这样的想起我 - 彭家丽.mp3", "晨雾 - Cicada.mp3", "暗恋无罪 - 彭羚.mp3", "暗涌 - 王菲.mp3", "最冷一天 - 张国荣.mp3", "最后　仍在一起 - Cicada.mp3", "最后的一班渡轮 - 蔡国权.mp3", "最愛 - 周慧敏.mp3", "最珍惜仍是你(剧场版) - 梁朝伟.mp3", "最美的期待 - 周笔畅.mp3", "月亮 - 陈慧娴.mp3", "月光 - 胡彦斌.mp3", "月光男孩 - 蔡康永.mp3", "月球下的人 - 李幸倪.mp3", "杂技 (Live) - 卫兰.mp3", "极速梦想（QQ飞车SSC超级联赛主题曲） - 丹戈尔.mp3", "林志炫 - 凤凰花开的路口.mp3", "梦一场 - 萧敬腾.mp3", "梦伴 - 关淑怡.mp3", "梦伴 - 李悦君Ericaceae.mp3", "梦想天空分外蓝 - 陈奕迅.mp3", "棋子 - 王菲.mp3", "楼下那个女人 - 游鸿明.mp3", "死在旋转公寓 - Glow Curve.mp3", "殘酷遊戲 - 卫兰.mp3", "毕业后你不是我的 - 孙子涵.mp3", "没有回忆的冬季 - 汤宝如.mp3", "浮白 - 花粥,胜娚（王胜男）.mp3", "海に行く - 茶太.mp3", "海洋天堂 - 桂纶镁.mp3", "海鸟情诗 - 夏初安.mp3", "消逝 - 傅许.mp3", "深夜港湾 - 关淑怡.mp3", "深夜港湾 - 甄楚倩.mp3", "清平调 - 王菲,邓丽君.mp3", "温柔 - 五月天.mp3", "温澜潮生 - 封浩彦MACKYO.mp3", "漫步人生路 - 刘惜君.mp3", "漫步人生路 - 邓丽君.mp3", "爱不释手 - 钟汉良.mp3", "爱与痛的边缘 - 谭咏麟.mp3", "爱了很久的朋友 - 田馥甄.mp3", "爱得太迟 - 古巨基.mp3", "爱的传说 - 邰正宵.mp3", "爱的初体验 - 张震岳.mp3", "爱的回归线 - 陈韵若,陈每文.mp3", "爱的故事(上) - 孙耀威.mp3", "爱的故事上集(Live) - live - 张敬轩,孙耀威.mp3", "牵丝戏 - 银临,Aki阿杰.mp3", "猪之歌 - 香香.mp3", "现代爱情故事 - 许秋怡,张智霖.mp3", "珍重 - 叶蒨文.mp3", "生命之花 - 张继聪.mp3", "生命树 - 吴雨霏.mp3", "电灯胆 - 邓丽欣.mp3", "白玫瑰 - 陈奕迅.mp3", "皎然记（Cover 司夏） - 柚木暖.mp3", "相依为命 - 陈小春.mp3", "相守 - 栗先达.mp3", "相见恨晚 - 彭佳慧.mp3", "眉间雪 - HITA.mp3", "矜持 - 王菲.mp3", "知足 - 五月天.mp3", "知足（粤语版）（Cover 五月天） - 阿细.mp3", "离人愁 - 曲肖冰.mp3", "私奔 - 郑钧.mp3", "秋桜 - 柴田淳.mp3", "秋酿 - 房东的猫.mp3", "空洞です - ゆらゆら帝国.mp3", "立秋 - 筠子.mp3", "童年 - 蔡国权.mp3", "童话镇Plus（Live） - 暗杠.mp3", "笑看风云 - 邓瑞霞.mp3", "笨蛋(剧场版) - 林俊杰,金莎.mp3", "第一时间 - F4.mp3", "等 - 陈洁仪.mp3", "粽香 - 汐音社.mp3", "繁华的寂静 - 文武贝.mp3", "红叶…斜落我心寂寞时 - 钟镇涛.mp3", "红色高跟鞋 - 蔡健雅.mp3", "红豆 - 王菲.mp3", "约定 - 王菲.mp3", "纯情(Live) - live - 王菲.mp3", "纸巾 - 余文乐.mp3", "纸短情长 - 花粥.mp3", "终身美丽 (Live) - live - 李克勤.mp3", "终身美丽 - 郑秀文.mp3", "经典老歌 - 加州旅馆.mp3", "给我一个吻 - 张露.mp3", "给我一个理由忘记 - A-Lin.mp3", "给自己的情书 - 李克勤.mp3", "给英格兰友人demo - 莫染.mp3", "绿茶（Cover 灰灰） - 杨亚茹Triste.mp3", "缘夕（Cover 胡艾彤） - 少年霜.mp3", "罗生门 - 麦浚龙,谢安琪.mp3", "罪人 - 李克勤.mp3", "美孚新村上春树 - The Lee's.mp3", "美孚根斯堡与白田珍宝金 - my little airport.mp3", "老揣扈蓬“我想和你做的五十件事” - 查可欣.mp3", "自作多情 - 周慧敏.mp3", "自动弃权 (放手版) - 符家浚.mp3", "自渡 - 陈粒.mp3", "致青春 - 王菲.mp3", "良辰 - 刘蕴晴.mp3", "花开半夏 - 爱朵女孩.mp3", "花蛤与蟹 - 花蛤与蟹.mp3", "花街的流星 - 李克勤.mp3", "莲有秀兮 - 饭碗的彼岸.mp3", "落花流水 - 陈奕迅.mp3", "葡萄成熟时 - 陈奕迅.mp3", "蒙太奇 - 李想Evelyn.mp3", "蓝色大门（Fly Away Remix） - L1STALLDO(厘思翱渡),Lucy Van Pelt.mp3", "藏（Cover：徐梦圆／双笙） - 流仙,封茗囧菌.mp3", "虚拟 - 陈粒.mp3", "蜗居 - 许廷铿.mp3", "行走世界，最难忘回家的路 - 牛奶咖啡.mp3", "街头霸王榜 - 林子祥.mp3", "街灯晚餐 - 卫兰.mp3", "表情 - 许志安.mp3", "让我愉快爱一次 - 周影.mp3", "让泪化作相思雨 - 南合文斗.mp3", "记得 - 张惠妹.mp3", "记念 - RAiNBOW计划,雷雨心.mp3", "谁也别管谁 - 文雀.mp3", "谁人能这么刻意假到底 - 刘小慧.mp3", "谁愿放手 - 陈慧琳.mp3", "走狗 - 周柏豪.mp3", "近我者甜呀 - 黑猫.mp3", "还原成长 - Mr.mp3", "追光者（粤语版）（Cover 岑宁儿） - 阿细.mp3", "逃跑的木偶 - 郝云.mp3", "遇到了 - Mr.mp3", "那么就要出发了吗 - 陈绮贞.mp3", "那些年 - 胡夏.mp3", "那些花儿 - 朴树.mp3", "那就这样吧 - Rocky_滕少.mp3", "邮差 - 区瑞强.mp3", "采茶纪 - 双笙.mp3", "采访 - 法老,杨秋儒.mp3", "重复犯错 - 古巨基.mp3", "金句Medley：That's Why You Go Away + 原来你什么都不要 + 不拖不欠 + 心淡 + 谁来爱我 + 多得他 + I Will Always Love You (Live) - 林二汶.mp3", "钟无艳 - 谢安琪.mp3", "钢琴哭 - 钟嘉欣.mp3", "锦鲤抄 - 银临,云の泣.mp3", "问为何 - 雷安娜.mp3", "阳光 - 黄永灿.mp3", "隔夜茶 - 张敬轩.mp3", "雨过天阴 - 谢安琪.mp3", "青春颂 - 许廷铿.mp3", "靠近 - 罗震环.mp3", "面具 - 许廷铿.mp3", "颠沛（Prod.by Soly） - Dirty Zack,Soly.mp3", "风居住的街道（Piano ver） - 饭碗的彼岸.mp3", "风景 - 陈洁仪.mp3", "风的季节 - 徐小凤.mp3", "飘浮女孩 - JW.mp3", "飘雪 - 陈慧娴.mp3", "飞鱼 - 苏打绿.mp3", "魂游太虚 - 许廷铿.mp3", "鹦鹉 - 孟凡明.mp3", "黄金时段1314 - 何乾樑.mp3", "黑白照 - 邓丽欣.mp3", "默 - 那英.mp3"]

var wave = new Array()

createAudio("/music/いつも何度でも - 伊藤サチコ.mp3")

createA(list)

function createA(list) {
  for (var i = 0; i < list.length; i++) {
    var a = document.createElement('a');
    var br = document.createElement("div");
    a.setAttribute('href', "javascript:clickA('/music/" + list[i] + "')");
    // a.setAttribute('onclik', );
    a.textContent = list[i]
    a.setAttribute("data-value", list[i])
    br.innerHTML = "<br/>"
    document.getElementById("rows_a").appendChild(a);
    document.getElementById("rows_a").appendChild(br);
  }
}

function clickA(event) {
  $("#audio_image").css("display", "none");
  $("#loading").css("display", "flex");
  var f = document.getElementById("audio0");
  f.innerHTML = '';
  $("#audio0").parent().prev().prev().empty();
  $("#audio0").parent().prev().prev().append(play_svg_str);
  $(".btnPause").addClass("btnPlay");
  $(".btnPause").removeClass("btnPause");
  createAudio(event);
}

function createAudio(url) {
  loadAudio(url)
  wave[0] = new_wave("#audio0", url)
  $(".row_div").hover(function () {
    $(this).removeClass("display_3qnOD")
  }, function () {
    $(this).addClass("display_3qnOD")
  });
  wave_finish()
  wave_audioprocess()
  getTime()
  $(".like-a").addClass("add-like")
}


function loadAudio(url, callback, reader) {
  ID3.loadTags(url, function () {
    var $ = function (e) {
      return document.getElementById(e);
    };
    var tags = ID3.getAllTags(url);
    $("download_a").download = tags.title + " — " + tags.artist;
    $("download_a").href = url
    $("music_author").textContent = tags.artist || "";
    $("music_name").textContent = tags.title || "";
    $("audio_image").title = tags.album || "";
    if ("picture" in tags) {
      var image = tags.picture;
      var base64String = "";
      for (var i = 0; i < image.data.length; i++) {
        base64String += String.fromCharCode(image.data[i]);
      }
      $("audio_image").src = "data:" + image.format + ";base64," + window.btoa(base64String);
      $("loading").style.display = "none";
      $("audio_image").style.display = "block";
    } else {
      // $("audio_image").parentNode.removeChild($("audio_image"))
    }
    if (callback) {
      callback();
    };
  }, {
    tags: ["artist", "title", "album", "picture"],
    dataReader: reader
  });


}

// 创建音频对象
function new_wave(name, music) {
  var wave = WaveSurfer.create({
    container: document.querySelector(name),
    // 绘制波形之前允许播放音频
    backend: 'MediaElement',
    hideScrollbar: true,
    height: 75,
    plugins: [
      WaveSurfer.cursor.create({
        showTime: true,
        opacity: 1,
        customShowTimeStyle: {
          'background-color': '#000',
          color: '#fff',
          padding: '2px',
          'font-size': '10px',
        }
      })
    ]
  });
  // 加载音频资源
  wave.load(music);
  return wave
}
// 秒——>00:00
function secondToDate(result) {
  var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
  var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
  return result = m + ":" + s;
}

// 播放
$(document).on('click', '.btnPlay', function () {
  var wave_isplay = new Array()
  var istrue = "istrue"
  var id = $(this).next().next().children().attr("id")

  // 给数组赋值
  for (var i = 0; i < wave.length; i++) {
    wave_isplay[i] = "is" + wave[i].isPlaying()
  }

  // 判断是否有声音片段正在播放
  if (arrayishave(wave_isplay, istrue)) {
    //有正在播放，暂停正在播放，开始当前
    wave[arrayisplay(wave_isplay, istrue)].pause();
    // 修改正在播放的按钮状态
    var playing_id = "#audio" + arrayisplay(wave_isplay, istrue)
    $(playing_id).parent().prev().prev().empty()
    $(playing_id).parent().prev().prev().append(play_svg_str)
    $(playing_id).parent().prev().prev().removeClass("btnPause")
    $(playing_id).parent().prev().prev().addClass("btnPlay")
    for (var i = 0; i < 10; i++) {
      if (id == "audio" + i) {
        // console.log(i)
        // 开始播放
        wave[i].play();
        // 修改图标->移除内容->增加内容
        $(this).empty()
        $(this).append(playing_svg_str)
        $(this).removeClass("btnPlay")
        $(this).addClass("btnPause")
      }
    }
  } else {
    for (var i = 0; i < wave.length; i++) {
      if (id == "audio" + i) {
        // console.log(i)
        // 开始播放
        wave[i].play();
        // 修改图标->移除内容->增加内容
        $(this).empty()
        $(this).append(playing_svg_str)
        $(this).removeClass("btnPlay")
        $(this).addClass("btnPause")
      }
    }
  }
});
// 暂停
$(document).on('click', '.btnPause', function () {
  var id = $(this).next().next().children().attr("id")
  for (var i = 0; i < wave.length; i++) {
    if (id == "audio" + i) {
      // 暂停播放
      wave[i].pause();
      // 修改图标->移除内容->增加内容
      $(this).empty()
      $(this).append(play_svg_str)
      $(this).removeClass("btnPause")
      $(this).addClass("btnPlay")
    }
  }
});

// 播放结束事件
function wave_finish() {
  for (var i = 0; i < wave.length; i++) {
    wave[i].on('finish', function () {
      $(".btnPause").empty()
      $(".btnPause").append(play_svg_str)
      $(".btnPause").addClass("btnPlay")
      $(".btnPause").removeClass("btnPause")
    });
  }
}

// 已播放时间
function wave_audioprocess() {
  for (var i = 0; i < wave.length; i++) {
    wave[i].on("audioprocess", function () {
      for (var i = 0; i < wave.length; i++) {
        wave[i].getDuration()
        var id = "#audio" + i
        // console.log(id)
        // console.info(secondToDate(wave[i].getCurrentTime()))
        $(id).parent().prev().text(secondToDate(wave[i].getCurrentTime()))
      }
    })
  }
}
// 判断数组是否包含某值
function arrayishave(arr, value) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == value) {
      return true
    }
  }
}
// 判断数组中正在播放的下标
function arrayisplay(arr, value) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == value) {
      return i
    }
  }
}
// 以秒为单位返回音频片段的持续时间
function getTime() {
  setTimeout(
    function () {
      for (var i = 0; i < wave.length; i++) {
        var duration = new Array()
        duration[i] = wave[i].getDuration()
        if (isNaN(duration[i])) {
          getTime();
        } else {
          var id = "#audio" + i
          if (secondToDate(wave[i].getDuration()) == "00:00") {
            $(id).parent().next().text("00:01")
          } else {
            $(id).parent().next().text(secondToDate(wave[i].getDuration()))
          }
        }
      }

    }, 15);
}