import axios from 'axios';
import jsSHA from 'jssha';
import url from 'url';

const getAuthorizationHeader = function () {
  const AppID = 'e05be185a29147f7b37c4343bedae576';
  const AppKey = '1BySzX0HVXNpZgE-4znpiKBW8TE';
  const GMTString = new Date().toGMTString();
  const ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update(`x-date: ${GMTString}`);
  const HMAC = ShaObj.getHMAC('B64');
  const Authorization = `hmac username=\"${AppID}\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"${HMAC}\"`;
  return { Authorization, 'X-Date': GMTString };
};

function get_busTime(data) {
  let busTime;
  const now_h = new Date().getHours();
  const now_m = new Date().getMinutes();
  const now = now_h * 60 + now_m;
  const data_time = now - ((data.UpdateTime[11] - '0') * 600 + (data.UpdateTime[12] - '0') * 60 + (data.UpdateTime[14] - '0') * 10 + (data.UpdateTime[15] - '0'));
  // console.log(data_time);
  if (data.EstimateTime != null) {
    if (data.EstimateTime === 120) busTime = '即將進站';
    else if (data.EstimateTime <= 60) busTime = '進站中';
    else busTime = `${Math.floor((data.EstimateTime - data_time) / 60)}分鐘後`;
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

function busTime_9025(StopSequence, Direction) {
  const now_h = new Date().getHours();
  const now_m = new Date().getMinutes();
  const now = now_h * 60 + now_m;
  const today = new Date().getDay();
  let busTime;
  if (Direction === 0) {
    if (today === 0 || today === 6) {
      if (now >= 1080)busTime = '末班駛離';
      else if (now >= 450)busTime = `${Math.floor((1080 + chart[0][StopSequence]) / 60).toString().padStart(2, '0')}:${((1080 + chart[0][StopSequence]) % 60).toString().padStart(2, '0')}`;
      else busTime = `${Math.floor((450 + chart[0][StopSequence - 1]) / 60).toString().padStart(2, '0')}:${Math.floor((450 + chart[0][StopSequence]) % 60).toString().padStart(2, '0')}`;
    } else if (now >= 1070)busTime = '末班駛離';
    else if (now >= 1020)busTime = `${Math.floor((1070 + chart[0][StopSequence]) / 60).toString().padStart(2, '0')}:${Math.floor((1070 + chart[0][StopSequence]) % 60).toString().padStart(2, '0')}`;
    else if (now >= 960)busTime = `${Math.floor((1020 + chart[0][StopSequence]) / 60).toString().padStart(2, '0')}:${Math.floor((1020 + chart[0][StopSequence]) % 60).toString().padStart(2, '0')}`;
    else if (now >= 720)busTime = `${Math.floor((960 + chart[0][StopSequence]) / 60).toString().padStart(2, '0')}:${Math.floor((960 + chart[0][StopSequence]) % 60).toString().padStart(2, '0')}`;
    else busTime = `${Math.floor((720 + chart[0][StopSequence - 1]) / 60).toString().padStart(2, '0')}:${Math.floor((720 + chart[0][StopSequence]) % 60).toString().padStart(2, '0')}`;
  } else if (today === 0 || today === 6) {
    if (now >= 1140)busTime = '末班駛離';
    else if (now >= 450)busTime = `${Math.floor((1140 + chart[1][StopSequence]) / 60).toString().padStart(2, '0')}:${((1140 + chart[1][StopSequence]) % 60).toString().padStart(2, '0')}`;
    else busTime = `${Math.floor((450 + chart[1][StopSequence]) / 60).toString().padStart(2, '0')}:${Math.floor((450 + chart[1][StopSequence]) % 60).toString().padStart(2, '0')}`;
  } else if (now >= 750)busTime = '末班駛離';
  else if (now >= 470)busTime = `${Math.floor((750 + chart[1][StopSequence]) / 60).toString().padStart(2, '0')}:${Math.floor((750 + chart[1][StopSequence]) % 60).toString().padStart(2, '0')}`;
  else if (now >= 430)busTime = `${Math.floor((470 + chart[1][StopSequence]) / 60).toString().padStart(2, '0')}:${Math.floor((470 + chart[1][StopSequence]) % 60).toString().padStart(2, '0')}`;
  else if (now >= 397)busTime = `${Math.floor((430 + chart[1][StopSequence]) / 60).toString().padStart(2, '0')}:${Math.floor((430 + chart[1][StopSequence]) % 60).toString().padStart(2, '0')}`;
  else busTime = `${Math.floor((397 + chart[1][StopSequence]) / 60).toString().padStart(2, '0')}:${Math.floor((397 + chart[1][StopSequence]) % 60).toString().padStart(2, '0')}`;
  return busTime;
}

function state_9025(StopSequence, Direction) {
  if (Direction === 1) {
    if (StopSequence === 1) return '松山機場';
    if (StopSequence === 2) return '臺北大學(臺北校區)';
    if (StopSequence === 3) return '行天宮';
    if (StopSequence === 4) return '高雙里';
    if (StopSequence === 5) return '中央大學警衛室';
    if (StopSequence === 6) return '中央大學依仁堂';
    if (StopSequence === 7) return '祐民醫院';
    if (StopSequence === 8) return '新明國中';
    if (StopSequence === 9) return '舊社';
    return '第一銀行';
  }
  if (StopSequence === 10) return '松山機場';
  if (StopSequence === 9) return '臺北大學(臺北校區)';
  if (StopSequence === 8) return '行天宮';
  if (StopSequence === 7) return '高雙里';
  if (StopSequence === 5) return '中央大學警衛室';
  if (StopSequence === 6) return '中央大學依仁堂';
  if (StopSequence === 4) return '祐民醫院';
  if (StopSequence === 3) return '新明國中';
  if (StopSequence === 2) return '舊社';
  return '中壢公車站';
}

function fun9025(parame, response) {
  let i; let j;
  const output = []; let output1; let output2;
  const now_h = new Date().getHours();
  const now_m = new Date().getMinutes();
  const now = now_h * 60 + now_m;
  let num; let busTime; let departTime = -1; let departState = 0; const l = response.data.length;
  for (i = 0; i < l; i += 1) {
    num = response.data[i].StopSequence;
    if (num === departState) continue;
    for (j = departState + 1; j < num; j += 1) {
      if (departTime === -1) {
        busTime = busTime_9025(j, parame.dir);
        if (j === parame.id) {
          output1 = busTime;
          output2 = (busTime[0] - '0') * 36000 + (busTime[1] - '0') * 3600 + (busTime[3] - '0') * 600 + (busTime[4] - '0') * 60;
        }
      } else {
        let time = chart[parame.dir][j] - chart[parame.dir][departState] - (now - ((response.data[i - 1].GPSTime[11] - '0') * 600 + (response.data[i - 1].GPSTime[12] - '0') * 60 + (response.data[i - 1].GPSTime[14] - '0') * 10 + (response.data[i - 1].GPSTime[15] - '0')));
        if (time < chart[parame.dir][j] - chart[parame.dir][departState + 1]) {
          time = chart[parame.dir][j] - chart[parame.dir][departState + 1];
        }
        if (time <= 2) busTime = '即將進站';
        else busTime = `${time}分鐘後`;
        if (j === parame.id) {
          output1 = busTime;
          output2 = time * 60;
        }
      }
      output.push({
        state: state_9025(j, parame.dir),
        time: busTime,
      });
    }
    const stay = (now - ((response.data[i].GPSTime[11] - '0') * 600 + (response.data[i].GPSTime[12] - '0') * 60 + (response.data[i].GPSTime[14] - '0') * 10 + (response.data[i].GPSTime[15] - '0')));
    if (response.data[i].A2EventType === 1 && !(num === 10 && stay > 1)) {
      busTime = '進站中';
      if (num === parame.id) {
        output1 = busTime;
        output2 = 0;
      }
    } else if (departTime === -1) {
      busTime = busTime_9025(num, parame.dir);
      if (num === parame.id) {
        output1 = busTime;
        output2 = (busTime[0] - '0') * 36000 + (busTime[1] - '0') * 3600 + (busTime[3] - '0') * 600 + (busTime[4] - '0') * 60;
      }
    } else {
      let time = chart[parame.dir][num] - chart[parame.dir][departState] - (now - ((response.data[i - 1].GPSTime[11] - '0') * 600 + (response.data[i - 1].GPSTime[12] - '0') * 60 + (response.data[i - 1].GPSTime[14] - '0') * 10 + (response.data[i - 1].GPSTime[15] - '0')));
      if (time < chart[parame.dir][num] - chart[parame.dir][departState + 1]) {
        time = chart[parame.dir][num] - chart[parame.dir][departState + 1];
      }
      if (time <= 2) busTime = '即將進站';
      else busTime = `${time}分鐘後`;
      if (num === parame.id) {
        output1 = busTime;
        output2 = time * 60;
      }
    } output.push({
      state: state_9025(num, parame.dir),
      time: busTime,
    });
    departTime = response.data[i].GPSTime;
    departState = num;
  }

  for (j = departState + 1; j <= 10; j += 1) {
    if (departTime === -1) {
      busTime = busTime_9025(j, parame.dir);
      if (j === parame.id) {
        output1 = busTime;
        output2 = (busTime[0] - '0') * 36000 + (busTime[1] - '0') * 3600 + (busTime[3] - '0') * 600 + (busTime[4] - '0') * 60;
      }
    } else {
      let time = chart[parame.dir][j] - chart[parame.dir][departState] - (now - ((response.data[l - 1].GPSTime[11] - '0') * 600 + (response.data[l - 1].GPSTime[12] - '0') * 60 + (response.data[l - 1].GPSTime[14] - '0') * 10 + (response.data[l - 1].GPSTime[15] - '0')));
      if (time < chart[parame.dir][j] - chart[parame.dir][departState + 1]) {
        time = chart[parame.dir][j] - chart[parame.dir][departState + 1];
      }
      if (time <= 2) busTime = '即將進站';
      else busTime = `${time}分鐘後`;
      if (j === parame.id) {
        output1 = busTime;
        output2 = time * 60;
      }
    }output.push({
      state: state_9025(j, parame.dir),
      time: busTime,
    });
  }

  // console.log(output2);
  if (parame.type === 0) return output;
  if (parame.type === 1) return output1;
  if (parame.type === 2) return { output1, output2 };
}

async function afun9025(parame) {
  let Url;
  if (parame.dir === 0) Url = "https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeNearStop/Streaming/InterCity/9025?%24select=GPSTime&%24filter=Direction%20eq%200%20and%20SubRouteName%2FEn%20eq%20'9025A'&%24orderby=StopSequence&%24top=30&%24format=JSON";
  else Url = "https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeNearStop/Streaming/InterCity/9025?%24select=GPSTime&%24filter=Direction%20eq%201%20and%20SubRouteName%2FEn%20eq%20'9025A'&%24orderby=StopSequence&%24top=30&%24format=JSON";
  const response = await axios.get(Url, {
    headers: getAuthorizationHeader(),
  });
  return fun9025(parame, response);
}

async function state(parame) {
  const APIBASE = 'https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taoyuan/PassThrough/Station';
  const data = {
    $select: 'StopStatus,EstimateTime,RouteName,NextBusTime',
    $filter: "(RouteUID eq 'TAO3220' or RouteUID eq 'TAO133') and Direction eq 1 or (RouteUID eq 'TAO3221' or RouteUID eq 'TAO1730') and Direction eq 0",
    $orderby: 'RouteName/En',
    $top: '4',
    $format: 'JSON',
  };
  const URL = url.parse(`${APIBASE}/${parame.id}`, true);
  URL.query = data;
  const Url = url.format(URL);
  const output = [];
  const response = await axios.get(Url, {
    headers: getAuthorizationHeader(),
  });
  response.data.forEach((doc) => {
    const busTime = get_busTime(doc);
    let way;
    if (doc.RouteName.En === '132' || doc.RouteName.En === '133') way = '往中壢公車站';
    else if (doc.RouteName.En === '172' || doc.RouteName.En === '173') way = '往桃園高鐵站';
    output.push({
      route: doc.RouteName.Zh_tw,
      time: busTime,
      to: way,
    });
  });
  let stopID;
  if (parame.id === 205) stopID = 6;
  else stopID = 5;
  const par = { id: stopID, type: 1, dir: 0 };
  let res = await axios.get("https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeNearStop/Streaming/InterCity/9025?%24select=GPSTime&%24filter=Direction%20eq%200%20and%20SubRouteName%2FEn%20eq%20'9025A'&%24orderby=StopSequence&%24top=30&%24format=JSON", {
    headers: getAuthorizationHeader(),
  });
  let busTime = fun9025(par, res);
  output.push({
    route: '9025A',
    time: busTime,
    to: '往松山機場',
  });
  const par1 = { id: stopID, type: 1, dir: 1 };
  res = await axios.get("https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeNearStop/Streaming/InterCity/9025?%24select=GPSTime&%24filter=Direction%20eq%201%20and%20SubRouteName%2FEn%20eq%20'9025A'&%24orderby=StopSequence&%24top=30&%24format=JSON", {
    headers: getAuthorizationHeader(),
  });
  busTime = fun9025(par1, res);
  output.push({
    route: '9025A',
    time: busTime,
    to: '往中壢公車站',
  });
  // console.log(output);
  return output;
}

async function route(parame) {
  const str = `Direction eq ${parame.dir}`;
  const APIBASE = 'https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taoyuan';
  const data = {
    $select: 'StopStatus,EstimateTime,StopName,NextBusTime',
    $filter: str,
    $orderby: 'StopSequence',
    $format: 'JSON',
  };
  const URL = url.parse(`${APIBASE}/${parame.id}`, true);
  URL.query = data;
  const Url = url.format(URL);
  const output = [];
  const response = await axios.get(Url, {
    headers: getAuthorizationHeader(),
  });
  let i;
  for (i = 0; i < response.data.length; i += 1) {
    const doc = response.data[i];
    const busTime = get_busTime(doc);
    output.push({
      state: doc.StopName.Zh_tw,
      time: busTime,
    });
  }
  // console.log(output);
  return output;
}

async function second() {
  const station_id = [235, 2393, 205, 236, 238, 1351];// 站位代號們，用於second.jsx
  const APIBASE = 'https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taoyuan/PassThrough/Station';
  const data = {
    $select: 'StopStatus,EstimateTime,RouteName,NextBusTime,StopName',
    $filter: "(RouteUID eq 'TAO3220' or RouteUID eq 'TAO133') and Direction eq 1 or (RouteUID eq 'TAO3221' or RouteUID eq 'TAO1730') and Direction eq 0",
    $top: '4',
    $orderby: 'NextBusTime',
    $format: 'JSON',
  };
  const output = [];
  let i; let j;
  for (i = 0; i < station_id.length; i += 1) {
    const URL = url.parse(`${APIBASE}/${station_id[i]}`, true);
    URL.query = data;
    const Url = url.format(URL);
    const response = await axios.get(Url, {
      headers: getAuthorizationHeader(),
    });

    let min1 = 90000; let min2 = 90000; let tmp; let min1_index = 0; let min2_index = 1;
    for (j = 0; j < response.data.length; j += 1) {
      // console.log(response.data);
      if (response.data[j].StopStatus !== 1 && response.data[j].StopStatus !== 0) continue;
      if (response.data[j].EstimateTime === undefined) {
        tmp = (response.data[j].NextBusTime[11] - '0') * 36000 + (response.data[j].NextBusTime[12] - '0') * 3600 + (response.data[j].NextBusTime[14] - '0') * 600 + (response.data[j].NextBusTime[15] - '0') * 60;
      } else tmp = response.data[j].EstimateTime;
      // console.log(tmp);
      if (tmp < min1) {
        min2 = min1;
        min2_index = min1_index;
        min1 = tmp;
        min1_index = j;
      } else if (tmp < min2) {
        min2 = tmp;
        min2_index = j;
      }
    }
    let stopID; let tmp1; let tmp2;
    if (station_id[i] === 205 || station_id[i] === 235) {
      if (station_id[i] === 205) stopID = 6;
      else stopID = 5;
      const par = { id: stopID, type: 2, dir: 0 };
      let res = await axios.get("https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeNearStop/Streaming/InterCity/9025?%24select=GPSTime&%24filter=Direction%20eq%200%20and%20SubRouteName%2FEn%20eq%20'9025A'&%24orderby=StopSequence&%24top=30&%24format=JSON", {
        headers: getAuthorizationHeader(),
      });
      tmp1 = fun9025(par, res);
      tmp = tmp1.output2;
      if (!isNaN(tmp) && tmp < min1) {
        min2 = min1;
        min2_index = min1_index;
        min1 = tmp;
        min1_index = -1;
      } else if (!isNaN(tmp) && tmp < min2) {
        min2 = tmp;
        min2_index = -1;
      }
      par.dir = 1;
      res = await axios.get("https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeNearStop/Streaming/InterCity/9025?%24select=GPSTime&%24filter=Direction%20eq%201%20and%20SubRouteName%2FEn%20eq%20'9025A'&%24orderby=StopSequence&%24top=30&%24format=JSON", {
        headers: getAuthorizationHeader(),
      });
      tmp2 = fun9025(par, res);
      tmp = tmp2.output2;
      if (!isNaN(tmp) && tmp < min1) {
        min2 = min1;
        min2_index = min1_index;
        min1 = tmp;
        min1_index = -2;
      } else if (!isNaN(tmp) && tmp < min2) {
        min2 = tmp;
        min2_index = -2;
      }
    }

    let busTime1; let busTime2; let route1_output; let route2_output;
    if (min1_index < 0) {
      if (min1_index === -1)busTime1 = tmp1.output1;
      else busTime1 = tmp2.output1;
      route1_output = '9025A';
    } else {
      busTime1 = get_busTime(response.data[min1_index]);
      route1_output = response.data[min1_index].RouteName.Zh_tw;
    }
    if (min2_index < 0) {
      if (min2_index === -1)busTime2 = tmp1.output1;
      else busTime2 = tmp2.output1;
      route2_output = '9025A';
    } else {
      busTime2 = get_busTime(response.data[min2_index]);
      route2_output = response.data[min2_index].RouteName.Zh_tw;
    }
    output.push({
      state: response.data[0].StopName.Zh_tw,
      route1: route1_output,
      time1: busTime1,
      route2: route2_output,
      time2: busTime2,
    });
  }
  // console.log(output);
  return output;
}

export default {
  state,
  route,
  second,
  afun9025,
};
