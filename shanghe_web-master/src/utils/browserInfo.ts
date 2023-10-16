function browserInfo() {
  const agent = navigator.userAgent.toLowerCase();

  const arr = [];
  const system = agent.split(' ')[1].split(' ')[0].split('(')[1];
  arr.push(system);
  const REGSTR_EDGE = /edge\/[\d.]+/gi;
  const REGSTR_IE = /trident\/[\d.]+/gi;
  const OLD_IE = /msie\s[\d.]+/gi;
  const REGSTR_FF = /firefox\/[\d.]+/gi;
  const REGSTR_CHROME = /chrome\/[\d.]+/gi;
  const REGSTR_SAF = /safari\/[\d.]+/gi;
  const REGSTR_OPERA = /opr\/[\d.]+/gi;
  // IE
  if (agent.indexOf('trident') > 0) {
    arr.push(agent.match(REGSTR_IE)[0].split('/')[0]);
    arr.push(agent.match(REGSTR_IE)[0].split('/')[1]);
    return arr;
  }
  // OLD_IE
  if (agent.indexOf('msie') > 0) {
    arr.push(agent.match(OLD_IE)[0].split(' ')[0]);
    arr.push(agent.match(OLD_IE)[0].split(' ')[1]);
    return arr;
  }
  // Edge
  if (agent.indexOf('edge') > 0) {
    arr.push(agent.match(REGSTR_EDGE)[0].split('/')[0]);
    arr.push(agent.match(REGSTR_EDGE)[0].split('/')[1]);
    return arr;
  }
  // firefox
  if (agent.indexOf('firefox') > 0) {
    arr.push(agent.match(REGSTR_FF)[0].split('/')[0]);
    arr.push(agent.match(REGSTR_FF)[0].split('/')[1]);
    return arr;
  }
  // Opera
  if (agent.indexOf('opr') > 0) {
    arr.push(agent.match(REGSTR_OPERA)[0].split('/')[0]);
    arr.push(agent.match(REGSTR_OPERA)[0].split('/')[1]);
    return arr;
  }
  // Safari
  if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0) {
    arr.push(agent.match(REGSTR_SAF)[0].split('/')[0]);
    arr.push(agent.match(REGSTR_SAF)[0].split('/')[1]);
    return arr;
  }
  // Chrome
  if (agent.indexOf('chrome') > 0) {
    arr.push(agent.match(REGSTR_CHROME)[0].split('/')[0]);
    arr.push(agent.match(REGSTR_CHROME)[0].split('/')[1]);
    return arr;
  } else {
    arr.push('未获取到浏览器信息');
    return arr;
  }
}
export const getBrowserInfo = (): string => {
  let browse = '';
  const Info = browserInfo();
  if (Info[1] && Info[2]) {
    browse = browserInfo()[1] + ' ' + browserInfo()[2];
  } else {
    browse = '未获取到浏览器信息';
  }

  switch (browse) {
    case 'msie 6.0':
      browse = 'ie 6';
      break;
    case 'msie 7.0':
      browse = 'ie 7';
      break;
    case 'trident 4.0':
      browse = 'ie 8';
      break;
    case 'trident 5.0':
      browse = 'ie 9';
      break;
    case 'trident 6.0':
      browse = 'ie 10';
      break;
    case 'trident 7.0':
      browse = 'ie 11';
      break;
  }
  return browse;
};

export const lowVersionBrowser = () => {
  const ua = navigator.userAgent.toLowerCase();
  let browser: any;
  (browser = ua.match(/rv:([\d.]+)\) like gecko/))
    ? (browser = parseFloat(browser[1]) >= 10)
    : (browser = ua.match(/msie ([\d.]+)/))
    ? (browser = false)
    : (browser = ua.match(/firefox\/([\d.]+)/))
    ? (browser = parseFloat(browser[1]) >= 30)
    : (browser = ua.match(/chrome\/([\d.]+)/))
    ? (browser = parseFloat(browser[1]) >= 28)
    : (browser = ua.match(/version\/([\d.]+).*safari/))
    ? (browser = parseFloat(browser[1]) >= 7)
    : false;

  return browser;
};
