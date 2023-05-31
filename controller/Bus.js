import url from 'url';
import axios from 'axios';
import qs from 'qs';

async function getAuthorizationHeader() {
  const parameters = {
    grant_type: 'client_credentials',
    client_id: '110502542-f4ef0225-f7f3-49d7',
    client_secret: 'b8ba09f0-1be8-4a1f-abc3-f944c69b89ce',
  };

  const authUrl = 'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token';
  try {
	  const res = await axios({
      method: 'POST',
      url: authUrl,
      data: qs.stringify(parameters),
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
	  });
	  const accesstoken = res.data;
	  return {
      authorization: `Bearer ${accesstoken.access_token}`,
	  };
  } catch (err) {
	  return err;
  }
}

function getBusTime(data) {
  const now = new Date();
  const updateTime = Math.floor((now - new Date(data.UpdateTime)) / (1000 * 60));
  if (data.EstimateTime !== undefined) {
    if (data.EstimateTime === 120) return {time: '即將進站', alert: 2};
    else if (data.EstimateTime <= 60) return {time: '進站中', alert: 2};
    return {time: `${Math.floor((data.EstimateTime - updateTime) / 60)} 分鐘後`, alert: data.EstimateTime <= 600 ? 1 : 0};
  }
  if (data.StopStatus === 2) return {time: '不停靠', alert: -1};
  if (data.StopStatus === 3 || data.NextBusTime === undefined) return {time: '末班駛離', alert: -1};
  if (data.StopStatus == 1) {
    const nextBusTime = new Date(data.NextBusTime);
;   return {time: `${nextBusTime.getHours().toString().padStart(2, '0')}:${nextBusTime.getMinutes().toString().padStart(2, '0')}`, alert: 0};
  }
  return 'Hello, Error';
}

const chart = [[0, 0, 3, 4, 8, 18, 21, 32, 72, 77, 82], [0, 0, 2, 6, 40, 47, 47, 51, 52, 53, 54]];

function busTime9025(stopSequence, direction) {
  const now = new Date();
  const day = new Date().getDay();
  if (direction === 0) {
    if (day === 0 || day === 6) {
      if (now >= 1080) return '末班駛離';
      else if (now >= 450) return `${Math.floor((1080 + chart[0][stopSequence]) / 60).toString().padStart(2, '0')}:${((1080 + chart[0][stopSequence]) % 60).toString().padStart(2, '0')}`;
      else if (now >= 437) return `${Math.floor((450 + chart[0][stopSequence - 1]) / 60).toString().padStart(2, '0')}:${Math.floor((450 + chart[0][stopSequence]) % 60).toString().padStart(2, '0')}`;
      else if (now >= 420) return `${Math.floor((437 + chart[0][stopSequence - 1]) / 60).toString().padStart(2, '0')}:${Math.floor((437 + chart[0][stopSequence]) % 60).toString().padStart(2, '0')}`;
      else return `${Math.floor((420 + chart[0][stopSequence - 1]) / 60).toString().padStart(2, '0')}:${Math.floor((420 + chart[0][stopSequence]) % 60).toString().padStart(2, '0')}`;
    } else if (now >= 1070) return '末班駛離';
    else if (now >= 1020) return `${Math.floor((1070 + chart[0][stopSequence]) / 60).toString().padStart(2, '0')}:${Math.floor((1070 + chart[0][stopSequence]) % 60).toString().padStart(2, '0')}`;
    else if (now >= 960) return `${Math.floor((1020 + chart[0][stopSequence]) / 60).toString().padStart(2, '0')}:${Math.floor((1020 + chart[0][stopSequence]) % 60).toString().padStart(2, '0')}`;
    else if (now >= 720) return `${Math.floor((960 + chart[0][stopSequence]) / 60).toString().padStart(2, '0')}:${Math.floor((960 + chart[0][stopSequence]) % 60).toString().padStart(2, '0')}`;
    else busTime = `${Math.floor((720 + chart[0][stopSequence - 1]) / 60).toString().padStart(2, '0')}:${Math.floor((720 + chart[0][stopSequence]) % 60).toString().padStart(2, '0')}`;
  } else if (day === 0 || day === 6) {
    if (now >= 1140) return '末班駛離';
    else if (now >= 1090) return `${Math.floor((1140 + chart[1][stopSequence]) / 60).toString().padStart(2, '0')}:${((1140 + chart[1][stopSequence]) % 60).toString().padStart(2, '0')}`;
    else if (now >= 1020) return `${Math.floor((1090 + chart[1][stopSequence]) / 60).toString().padStart(2, '0')}:${((1090 + chart[1][stopSequence]) % 60).toString().padStart(2, '0')}`;
    else if (now >= 450) return `${Math.floor((1020 + chart[1][stopSequence]) / 60).toString().padStart(2, '0')}:${((1020 + chart[1][stopSequence]) % 60).toString().padStart(2, '0')}`;
    else return `${Math.floor((450 + chart[1][stopSequence]) / 60).toString().padStart(2, '0')}:${Math.floor((450 + chart[1][stopSequence]) % 60).toString().padStart(2, '0')}`;
  } else if (now >= 750) return '末班駛離';
  else if (now >= 470) return `${Math.floor((750 + chart[1][stopSequence]) / 60).toString().padStart(2, '0')}:${Math.floor((750 + chart[1][stopSequence]) % 60).toString().padStart(2, '0')}`;
  else if (now >= 430) return `${Math.floor((470 + chart[1][stopSequence]) / 60).toString().padStart(2, '0')}:${Math.floor((470 + chart[1][stopSequence]) % 60).toString().padStart(2, '0')}`;
  else if (now >= 397) return `${Math.floor((430 + chart[1][stopSequence]) / 60).toString().padStart(2, '0')}:${Math.floor((430 + chart[1][stopSequence]) % 60).toString().padStart(2, '0')}`;
  return `${Math.floor((397 + chart[1][stopSequence]) / 60).toString().padStart(2, '0')}:${Math.floor((397 + chart[1][stopSequence]) % 60).toString().padStart(2, '0')}`;
}

function stop9025(stopSequence, direction) {
  const stops = ['松山機場', '臺北大學（臺北校區）', '行天宮', '高雙里', '中央大學警衛室', '中央大學依仁堂', '祐民醫院', '新明國中', '舊社', '第一銀行']
  if (direction === 1) {
    return stops[stopSequence - 1];
  } else {
    return stops[10 - stopSequence];
  }
}

function fun9025(param, response) {
  const output = [];
  const now = new Date();
  let num, busTime, departTime = -1, departStop = 0;  //num：當前過站的站牌, departStop：上一個過站的站牌 (因為同時可能不只一班車)
  for (let i = 0; i < response.data.length; i++) {  //response只有車最後經過的那站
    num = response.data[i].StopSequence;
    if (num === departStop) continue;
    for (let j = departStop + 1; j < num; j++) {  //已經經過的站
      if (departTime === -1) {  //前面沒有車
        busTime = busTime9025(j, param.dir);
        if(busTime === '末班駛離') output.push({stop: stop9025(j, param.dir), bus: '9025A', time: busTime, alert: -1});
        else output.push({stop: stop9025(j, param.dir), bus: '9025A', time: busTime, alert: 0});
      } else {
        let time = chart[param.dir][j] - chart[param.dir][departStop] - Math.floor((now - new Date(departTime)) / (1000 * 60));  //兩站間格時間減掉經過的時間
        if (time < chart[param.dir][j] - chart[param.dir][departStop + 1]) { //預防塞車
          time = chart[param.dir][j] - chart[param.dir][departStop + 1];
        }
        if (time <= 2) output.push({stop: stop9025(j, param.dir), bus: '9025A', time: '即將進站', alert: 2});
        else if(time<=10) output.push({stop: stop9025(j, param.dir), bus: '9025A', time: `${time} 分鐘後`, alert: 1});
        else output.push({stop: stop9025(j, param.dir), bus: '9025A', time: `${time} 分鐘後`, alert: 0});
      }
    }
    const stay = Math.floor((now - new Date(response.data[i].GPSTime)) / (1000 * 60));  //最後經過的站
    if (response.data[i].A2EventType === 1 && !(num === 10 && stay > 1)) {
      busTime = '進站中';
      output.push({stop: stop9025(num, param.dir), bus: '9025A', time: '進站中', alert: 2});
    } else if (departTime === -1) {
      busTime = busTime9025(num, param.dir);
      if(busTime === '末班駛離') output.push({stop: stop9025(num, param.dir), bus: '9025A', time: busTime, alert: -1});
      else output.push({stop: stop9025(num, param.dir), bus: '9025A', time: busTime, alert: 0});
    } else {
      let time = chart[param.dir][num] - chart[param.dir][departStop] - Math.floor((now - new Date(departTime)) / (1000 * 60));
      if (time < chart[param.dir][num] - chart[param.dir][departStop + 1]) {
        time = chart[param.dir][num] - chart[param.dir][departStop + 1];
      }
      if (time <= 2) output.push({stop: stop9025(num, param.dir), bus: '9025A', time: '即將進站', alert: 2});
      else if(time<=10) output.push({stop: stop9025(num, param.dir), bus: '9025A', time: `${time} 分鐘後`, alert: 1});
      else output.push({stop: stop9025(num, param.dir), bus: '9025A', time: `${time} 分鐘後`, alert: 0});
    }
    departTime = response.data[i].GPSTime;
    departStop = num;
  }

  for (let j = departStop + 1; j <= 10; j++) {  //還沒經過的站
    if (departTime === -1) {
      busTime = busTime9025(j, param.dir);
      if (busTime === '末班駛離') output.push({stop: stop9025(j, param.dir), bus: '9025A', time: busTime, alert: -1});
      else output.push({stop: stop9025(j, param.dir), bus: '9025A', time: busTime, alert: 0});
    } else {
      let time = chart[param.dir][j] - chart[param.dir][departStop] - Math.floor((now - new Date(departTime)) / (1000 * 60));
      if (time < chart[param.dir][j] - chart[param.dir][departStop + 1]) {
        time = chart[param.dir][j] - chart[param.dir][departStop + 1];
      }
      if (time <= 2) output.push({stop: stop9025(j, param.dir), bus: '9025A', time: '即將進站', alert: 2});
      else if (time <= 10) output.push({stop: stop9025(j, param.dir), bus: '9025A', time: `${time} 分鐘後`, alert: 1});
      else output.push({stop: stop9025(j, param.dir), bus: '9025A', time: `${time} 分鐘後`, alert: 0});
    }
  }
  return output;
}

async function afun9025(param) {
  const url = `https://tdx.transportdata.tw/api/basic/v2/Bus/RealTimeNearStop/Streaming/InterCity/9025?%24select=GPSTime&%24filter=Direction%20eq%20${param.dir}%20and%20SubRouteName%2FEn%20eq%20'9025A'&%24orderby=StopSequence&%24top=30&%24format=JSON`;
  let response;
  while (true) {
    try {
      response = await axios.get(url, {
        headers: await getAuthorizationHeader(),
      });
      break;
    } catch (error) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  return fun9025(param, response);
}

async function route(param) {
  if (param.buses.toString() === ['9025A'].toString()) return await afun9025(param);
  param.buses.sort();
  if (![['132'], ['133'], ['132', '133'], ['172'], ['173'], ['172', '173'], ['5035']].some(valid => valid.join() === param.buses.join())) {
    throw new Error('Invalid Buses: ' + param.buses.join(' '));
  }
  
  const APIBASE = 'https://tdx.transportdata.tw/api/basic/v2/Bus/EstimatedTimeOfArrival/City/Taoyuan';
  const data = {
    $select: 'StopUID,StopStatus,EstimateTime,StopName,NextBusTime',
    $filter: `Direction eq ${param.dir}`,
    $orderby: 'StopSequence',
    $format: 'JSON',
  };
  
  const getFinalUrl = (bus) => {
    const finalUrl = url.parse(`${APIBASE}/${bus}`, true);
    finalUrl.query = data;
    return url.format(finalUrl);
  };

  let responses;
  while (true) {
    try {
      responses = await Promise.all(param.buses.map(async (bus) => {
        return await axios.get(getFinalUrl(bus), {
          headers: await getAuthorizationHeader(),
        });
      }));
      break;
    } catch (error) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  const output = [];
  if (param.buses.length == 1) {  // 如果只有選擇一個公車
    responses[0].data.forEach(data => {
      const busTimeObj = getBusTime(data);
      output.push({
        id: Math.random().toString(16).slice(2),
        stop: data.StopName.Zh_tw,
        isCombined: 0,
        pass: param.buses,
        bus: [{name: param.buses[0], time: busTimeObj.time}],
        alert: busTimeObj.alert,
      });
    });
  } else {  // 如果有兩個公車
    // 各自的站牌，最後各自加入空字串以計算最後一次的 extra
    const names = responses.map(response => response.data.map(stop => stop.StopName.Zh_tw)).map(stops => [...stops, '']);
    const commonNames = names[0].filter(name => names[1].includes(name));    // 共通的站牌
    const prev = [-1, -1];  // 紀錄上一個共通站排是各自的第幾站，因為第一站就是 0，所以初始值設 -1
    commonNames.forEach(name => {  // 遍歷所有共通站牌
      // 加入所有在當前與上次共通站牌之間的所有站牌
      // 找到此共通站排是各自的第幾站
      const curr = [names[0].findIndex(element => element === name), names[1].findIndex(element => element === name)];
      // 在此共通站牌之前，加入兩站各自獨立的站牌
      [0, 1].forEach(i => {
        if (curr[i] - prev[i] > 1) {
          const index = responses[i].data.findIndex(stop => stop.StopName.Zh_tw === names[i][prev[i] + 1]);
          for (let j = prev[i] + 1; j < curr[i]; j++) {
            const data = responses[i].data[j];
            const busTimeObj = getBusTime(data);
            output.push({
              id: Math.random().toString(16).slice(2),
              stop: data.StopName.Zh_tw,
              isCombined: 1,
              pass: [param.buses[i]],
              bus: [{name: param.buses[i], time: busTimeObj.time}],
              alert: busTimeObj.alert,
            });
          }
        }
      });
      prev.splice(0, curr.length, ...curr);  // prev = curr 的寫法
      if (name !== '') {
        const data = responses.map(response => response.data.find(stop => stop.StopName.Zh_tw === name));
        // 因為剛好 132 和 172 第一班都比較早，所以判斷如果 133 或 173 有車才比較下一班抵達的時間
        const earlier = Number(data[1].NextBusTime !== undefined && Date.parse(data[1].NextBusTime) < Date.parse(data[0].NextBusTime));
        const busTimeObj = getBusTime(data[earlier]);
        output.push({
          id: Math.random().toString(16).slice(2),
          stop: data[earlier].StopName.Zh_tw,
          isCombined: 0,
          pass: param.buses,
          bus: [{name: param.buses[earlier], time: busTimeObj.time}],
          alert: busTimeObj.alert,
        });
      }
    });
  }
  return output;
}

export default route;