import { Watermark } from './watermark.esm.js';

const watermarkConfig = {
  mode: 'interval',
  monitor: true,
  text: '',
  image: undefined,
  opacity: 0.24,
  width: 240,
  height: 64,
  offsetLeft: 0,
  offsetTop: 0,
  gapX: 340,
  gapY: 340,
  zIndex: 9999,
  rotate: -22,
  fontSize: 32,
  textAlign: 'center',
  fontStyle: 'normal',
  fontColor: '#000',
  fontFamily: 'Microsoft Yahei, sans-serif',
  fontWeight: '300',
  blindText: '',
  blindOpacity: 0.01,
};

const getCurrentTime = () => {
  const Month = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];
  const MakeUpZero = {
    0: '00',
    1: '01',
    2: '02',
    3: '03',
    4: '04',
    5: '05',
    6: '06',
    7: '07',
    8: '08',
    9: '09',
  };
  // 获取当前时间
  const nowTime = new Date();
  const nowFullYear = nowTime.getFullYear();
  const nowMonth = Month[nowTime.getMonth()];
  const nowDate = MakeUpZero[nowTime.getDate()] || nowTime.getDate() || '00';
  const nowHour = MakeUpZero[nowTime.getHours()] || nowTime.getHours() || '00';
  const nowtMinute =
    MakeUpZero[nowTime.getMinutes()] || nowTime.getMinutes() || '00';

  return { nowFullYear, nowMonth, nowDate, nowHour, nowtMinute };
};

const copyTextToClipboard = (text) => {
  const textArea = document.createElement('textarea');
  textArea.style.cssText = `position:fixed;top:0;left:0;width:2em;height:2em;padding:0;border:none;outline:none;box-shadow:none;background:transparent`;
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error(err);
  }
  document.body.removeChild(textArea);
};

const { nowFullYear, nowMonth, nowDate, nowHour, nowtMinute } =
  getCurrentTime();
const currentTimeStr = `${nowFullYear}-${nowMonth}-${nowDate}-${nowHour}:${nowtMinute}`;
const watermarkText = `${currentTimeStr} https://lipk.org/resume/ 李鹏坤-个人简历`;

const watermark = new Watermark({
  ...watermarkConfig,
  text: watermarkText,
  blindText: watermarkText,
});
watermark.hide();

// 打印：打印时加载水印，以保留打印信息
window.onbeforeprint = () => {
  const currentTimeStr = `${nowFullYear}-${nowMonth}-${nowDate}-${nowHour}-${nowtMinute}`;
  copyTextToClipboard(`【前端开发】李鹏坤-个人简历_${currentTimeStr}`);
  watermark.show();
};

window.onafterprint = () => {
  // 隐藏水印
  watermark.hide();
  // 销毁水印
  // watermark.destroy();
};
