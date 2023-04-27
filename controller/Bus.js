import { URLSearchParams } from 'url';
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
  let busTime;
  const nowH = new Date().getHours();
  const nowM = new Date().getMinutes();
  const now = nowH * 60 + nowM;
  const dataTime = now - ((data.UpdateTime[11] - '0') * 600 + (data.UpdateTime[12] - '0') * 60 + (data.UpdateTime[14] - '0') * 10 + (data.UpdateTime[15] - '0'));
  if (data.EstimateTime) {
    if (data.EstimateTime === 120) busTime = '即將進站';
    else if (data.EstimateTime <= 60) busTime = '進站中';
    else busTime = `${Math.floor((data.EstimateTime - dataTime) / 60)} 分鐘後`;
  } else if (data.StopStatus === 2) busTime = '不停靠';
  else if (data.StopStatus === 3 || data.NextBusTime === undefined) busTime = '末班駛離';
  else if (data.StopStatus === 1) {
    const busHour = (data.NextBusTime[11] - '0') * 10 + (data.NextBusTime[12] - '0');
    const busMinute = (data.NextBusTime[14] - '0') * 10 + (data.NextBusTime[15] - '0');
    busTime = `${busHour.toString().padStart(2, '0')}:${busMinute.toString().padStart(2, '0')}`;
  }
  return busTime;
}

const chart = [[0, 0, 3, 4, 8, 18, 21, 32, 72, 77, 82], [0, 0, 2, 6, 40, 47, 47, 51, 52, 53, 54]];

function busTime9025(StopSequence, Direction) {
  const nowH = new Date().getHours();
  const nowM = new Date().getMinutes();
  const now = nowH * 60 + nowM;
  const today = new Date().getDay();
  let busTime;
  if (Direction === 0) {
    if (today === 0 || today === 6) {
      if (now >= 1080) busTime = '末班駛離';
      else if (now >= 450) busTime = `${Math.floor((1080 + chart[0][StopSequence]) / 60).toString().padStart(2, '0')}:${((1080 + chart[0][StopSequence]) % 60).toString().padStart(2, '0')}`;
      else if (now >= 437) busTime = `${Math.floor((450 + chart[0][StopSequence - 1]) / 60).toString().padStart(2, '0')}:${Math.floor((450 + chart[0][StopSequence]) % 60).toString().padStart(2, '0')}`;
      else if (now >= 420) busTime = `${Math.floor((437 + chart[0][StopSequence - 1]) / 60).toString().padStart(2, '0')}:${Math.floor((437 + chart[0][StopSequence]) % 60).toString().padStart(2, '0')}`;
      else busTime = `${Math.floor((420 + chart[0][StopSequence - 1]) / 60).toString().padStart(2, '0')}:${Math.floor((420 + chart[0][StopSequence]) % 60).toString().padStart(2, '0')}`;
    } else if (now >= 1070) busTime = '末班駛離';
    else if (now >= 1020) busTime = `${Math.floor((1070 + chart[0][StopSequence]) / 60).toString().padStart(2, '0')}:${Math.floor((1070 + chart[0][StopSequence]) % 60).toString().padStart(2, '0')}`;
    else if (now >= 960) busTime = `${Math.floor((1020 + chart[0][StopSequence]) / 60).toString().padStart(2, '0')}:${Math.floor((1020 + chart[0][StopSequence]) % 60).toString().padStart(2, '0')}`;
    else if (now >= 720) busTime = `${Math.floor((960 + chart[0][StopSequence]) / 60).toString().padStart(2, '0')}:${Math.floor((960 + chart[0][StopSequence]) % 60).toString().padStart(2, '0')}`;
    else busTime = `${Math.floor((720 + chart[0][StopSequence - 1]) / 60).toString().padStart(2, '0')}:${Math.floor((720 + chart[0][StopSequence]) % 60).toString().padStart(2, '0')}`;
  } else if (today === 0 || today === 6) {
    if (now >= 1140) busTime = '末班駛離';
    else if (now >= 1090) busTime = `${Math.floor((1140 + chart[1][StopSequence]) / 60).toString().padStart(2, '0')}:${((1140 + chart[1][StopSequence]) % 60).toString().padStart(2, '0')}`;
    else if (now >= 1020) busTime = `${Math.floor((1090 + chart[1][StopSequence]) / 60).toString().padStart(2, '0')}:${((1090 + chart[1][StopSequence]) % 60).toString().padStart(2, '0')}`;
    else if (now >= 450) busTime = `${Math.floor((1020 + chart[1][StopSequence]) / 60).toString().padStart(2, '0')}:${((1020 + chart[1][StopSequence]) % 60).toString().padStart(2, '0')}`;
    else busTime = `${Math.floor((450 + chart[1][StopSequence]) / 60).toString().padStart(2, '0')}:${Math.floor((450 + chart[1][StopSequence]) % 60).toString().padStart(2, '0')}`;
  } else if (now >= 750) busTime = '末班駛離';
  else if (now >= 470) busTime = `${Math.floor((750 + chart[1][StopSequence]) / 60).toString().padStart(2, '0')}:${Math.floor((750 + chart[1][StopSequence]) % 60).toString().padStart(2, '0')}`;
  else if (now >= 430) busTime = `${Math.floor((470 + chart[1][StopSequence]) / 60).toString().padStart(2, '0')}:${Math.floor((470 + chart[1][StopSequence]) % 60).toString().padStart(2, '0')}`;
  else if (now >= 397) busTime = `${Math.floor((430 + chart[1][StopSequence]) / 60).toString().padStart(2, '0')}:${Math.floor((430 + chart[1][StopSequence]) % 60).toString().padStart(2, '0')}`;
  else busTime = `${Math.floor((397 + chart[1][StopSequence]) / 60).toString().padStart(2, '0')}:${Math.floor((397 + chart[1][StopSequence]) % 60).toString().padStart(2, '0')}`;
  return busTime;
}

function state9025(stopSequence, direction) {
  const stops = ['松山機場', '臺北大學（臺北校區）', '行天宮', '高雙里', '中央大學警衛室', '中央大學依仁堂', '祐民醫院', '新明國中', '舊社', '第一銀行']
  if (direction === 1) {
    return stops[stopSequence];
  } else {
    return stops[9 - stopSequence];
  }
}

function fun9025(param, response) {
  const output = [];
  const nowH = new Date().getHours();
  const nowM = new Date().getMinutes();
  const now = nowH * 60 + nowM;
  let num, busTime, departTime = -1, departState = 0;
  const l = response.data.length;
  for (let i = 0; i < l; i++) {
    num = response.data[i].StopSequence;
    if (num === departState) continue;
    for (let j = departState + 1; j < num; j++) {
      if (departTime === -1) {
        busTime = busTime9025(j, param.dir);
      } else {
        let time = chart[param.dir][j] - chart[param.dir][departState] - (now - ((departTime[11] - '0') * 600 + (departTime[12] - '0') * 60 + (departTime[14] - '0') * 10 + (departTime[15] - '0')));
        if (time < chart[param.dir][j] - chart[param.dir][departState + 1]) {
          time = chart[param.dir][j] - chart[param.dir][departState + 1];
        }
        if (time <= 2) busTime = '即將進站';
        else busTime = `${time} 分鐘後`;
      }
      output.push({
        state: state9025(j, param.dir),
        time: busTime,
      });
    }
    const stay = (now - ((response.data[i].GPSTime[11] - '0') * 600 + (response.data[i].GPSTime[12] - '0') * 60 + (response.data[i].GPSTime[14] - '0') * 10 + (response.data[i].GPSTime[15] - '0')));
    if (response.data[i].A2EventType === 1 && !(num === 10 && stay > 1)) {
      busTime = '進站中';
    } else if (departTime === -1) {
      busTime = busTime9025(num, param.dir);
    } else {
      let time = chart[param.dir][num] - chart[param.dir][departState] - (now - ((departTime[11] - '0') * 600 + (departTime[12] - '0') * 60 + (departTime[14] - '0') * 10 + (departTime[15] - '0')));
      if (time < chart[param.dir][num] - chart[param.dir][departState + 1]) {
        time = chart[param.dir][num] - chart[param.dir][departState + 1];
      }
      if (time <= 2) busTime = '即將進站';
      else busTime = `${time} 分鐘後`;
    } output.push({
      state: state9025(num, param.dir),
      time: busTime,
    });
    departTime = response.data[i].GPSTime;
    departState = num;
  }

  for (let j = departState + 1; j <= 10; j++) {
    if (departTime === -1) {
      busTime = busTime9025(j, param.dir);
    } else {
      let time = chart[param.dir][j] - chart[param.dir][departState] - (now - ((departTime[11] - '0') * 600 + (departTime[12] - '0') * 60 + (departTime[14] - '0') * 10 + (departTime[15] - '0')));
      if (time < chart[param.dir][j] - chart[param.dir][departState + 1]) {
        time = chart[param.dir][j] - chart[param.dir][departState + 1];
      }
      if (time <= 2) busTime = '即將進站';
      else busTime = `${time}分鐘後`;
    }
    output.push({
      state: state9025(j, param.dir),
      time: busTime,
    });
  }
  return output;
}

async function afun9025(param) {
  let Url;
  if (param.dir === 0) Url = "https://tdx.transportdata.tw/api/basic/v2/Bus/RealTimeNearStop/Streaming/InterCity/9025?%24select=GPSTime&%24filter=Direction%20eq%200%20and%20SubRouteName%2FEn%20eq%20'9025A'&%24orderby=StopSequence&%24top=30&%24format=JSON";
  else Url = "https://tdx.transportdata.tw/api/basic/v2/Bus/RealTimeNearStop/Streaming/InterCity/9025?%24select=GPSTime&%24filter=Direction%20eq%201%20and%20SubRouteName%2FEn%20eq%20'9025A'&%24orderby=StopSequence&%24top=30&%24format=JSON";
  const response = await axios.get(Url, {
    headers: await getAuthorizationHeader(),
  });
  return fun9025(param, response);
}

async function route(param) {
  const APIBASE = 'https://tdx.transportdata.tw/api/basic/v2/Bus/EstimatedTimeOfArrival/City/Taoyuan';
  const str = `Direction eq ${param.dir}`;
  const data = {
    $select: 'StopStatus,EstimateTime,StopName,NextBusTime',
    $filter: str,
    $orderby: 'StopSequence',
    $format: 'JSON',
  };
  const url = new URL(`${APIBASE}/${param.id}`);
  url.search = new URLSearchParams(data).toString();
  const finalUrl = url.toString();

  const output = [];
  const response = await axios.get(finalUrl, {
    headers: await getAuthorizationHeader(),
  });
  console.log(response.data);
  response.data.forEach((doc) => {
    const busTime = getBusTime(doc);
    output.push({
	  	state: doc.StopName.Zh_tw,
	  	time: busTime,
    });
  });
  console.log(output);
  return output;
}

export default {
  route,
  afun9025,
};
