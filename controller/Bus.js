import axios from 'axios';
import jsSHA from 'jssha';
import StyleSheetValidation from 'react-native/Libraries/StyleSheet/StyleSheetValidation';

//setInterval(roate132_0 , 25000);
//setInterval(roate132_1 , 25000);

const getAuthorizationHeader = function() {
	var AppID = 'e05be185a29147f7b37c4343bedae576';
	var AppKey = '1BySzX0HVXNpZgE-4znpiKBW8TE';
	var GMTString = new Date().toGMTString();
	var ShaObj = new jsSHA('SHA-1', 'TEXT');
	ShaObj.setHMACKey(AppKey, 'TEXT');
	ShaObj.update('x-date: ' + GMTString);
	var HMAC = ShaObj.getHMAC('B64');
	var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
	return { 'Authorization': Authorization, 'X-Date': GMTString};
}

function get_busTime(data)
{
	let busTime;
	if(data.EstimateTime!=null){
		if(data.EstimateTime<=60)busTime="即將進站";
		else busTime=data.EstimateTime/60+"分鐘後";
	}
	else if(data.StopStatus===2)busTime="不停靠";
	else if(data.StopStatus===3)busTime="末班駛離";
	else if(data.StopStatus===1){
		let busHour=(data.NextBusTime[11]-'0')*10+(data.NextBusTime[12]-'0');
		let busMinute=(data.NextBusTime[14]-'0')*10+(data.NextBusTime[15]-'0');
		busTime="未發車 預預估到達時間("+busHour.toString().padStart(2, '0')+':'+busMinute.toString().padStart(2, '0')+")";
	}
	return busTime;
}

function The_Front_Door_of_Central_University(){//正門各路線資料
	const station="https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taoyuan/PassThrough/Station/1351?%24select=RouteName%2CNextBusTime%2CStopStatus&%2CEstimateTimefilter=(RouteUID%20eq%20'TAO1730'%20or%20RouteUID%20eq%20'TAO3221')%20and%20Direction%20eq%200%20or%20(RouteUID%20eq%20'TAO133'%20or%20RouteUID%20eq%20'TAO3220')%20and%20Direction%20eq%201&%24top=30&%24format=JSON";
	console.log(station);
	return station;
}

function Guardroom_of_Central_University(){//警衛室各路線資料
	const station="https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taoyuan/PassThrough/Station/235?%24select=StopStatus%2CRouteName%2CNextBusTime%2CEstimateTime&%24filter=(RouteUID%20eq%20'TAO3220'%20or%20RouteUID%20eq%20'TAO133')%20and%20Direction%20eq%201%20or%20(RouteUID%20eq%20'TAO3221'%20or%20RouteUID%20eq%20'TAO1730')%20and%20Direction%20eq%200&%24top=30&%24format=JSON";
	return station;
}

async function state(stateName)
{
	let station;
	if(stateName===0)station=The_Front_Door_of_Central_University();
	else if(stateName===1)station=Guardroom_of_Central_University();
	const output=[];
	const response = await axios.get(station, { 
		headers: getAuthorizationHeader(),
	})
	console.log(response.data);
	response.data.forEach((doc)=>{
		let busTime=get_busTime(doc);
		output.push({
	  		id: Date.now()+doc.RouteName.En,
	  		state : doc.RouteName.Zh_tw,
	  		time : busTime,
		});
	})
		
	console.log(output);
	return output;
}

function route132_0(){//中壢->中央大學 取各站資料
	const station="https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taoyuan/132?%24select=StopStatus%2CStopName%2CEstimateTime%2CNextBusTime&%24filter=Direction%20eq%200&%24orderby=StopSequence&%24top=30&%24format=JSON";
	return station;
}

function route132_1(){//中央大學->中壢 取各站資料
	const station="https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taoyuan/132?%24select=StopStatus%2CStopName%2CEstimateTime%2CNextBusTime&%24filter=Direction%20eq%201&%24orderby=StopSequence&%24top=30&%24format=JSON";
	return station;
}

function route133_0(){//中壢->中央大學 取各站資料
	const station="https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taoyuan/133?%24select=StopStatus%2CStopName%2CEstimateTime%2CNextBusTime&%24filter=Direction%20eq%200&%24orderby=StopSequence&%24top=30&%24format=JSON";
	return station;
}

function route133_1(){//中央大學->中壢 取各站資料
	const station="https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taoyuan/133?%24select=StopStatus%2CStopName%2CEstimateTime%2CNextBusTime&%24filter=Direction%20eq%201&%24orderby=StopSequence&%24top=30&%24format=JSON";
	return station;
}

function route172_1(){//高鐵桃園站->中央大學 取各站資料
	const station="https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taoyuan/172?%24select=StopStatus%2CStopName%2CEstimateTime%2CNextBusTime&%24filter=Direction%20eq%201&%24orderby=StopSequence&%24top=30&%24format=JSON";
	return station;
}

function route172_0(){//中央大學->高鐵桃園站 取各站資料
	const station="https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taoyuan/172?%24select=StopStatus%2CStopName%2CEstimateTime%2CNextBusTime&%24filter=Direction%20eq%200&%24orderby=StopSequence&%24top=30&%24format=JSON";
	return station;
}

function route173_1(){//高鐵桃園站->中央大學 取各站資料
	const station="https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taoyuan/173?%24select=StopStatus%2CStopName%2CEstimateTime%2CNextBusTime&%24filter=Direction%20eq%201&%24orderby=StopSequence&%24top=30&%24format=JSON";
	return station;
}

function route173_0(){//中央大學->高鐵桃園站 取各站資料
	const station="https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taoyuan/173?%24select=StopStatus%2CStopName%2CEstimateTime%2CNextBusTime&%24filter=Direction%20eq%200&%24orderby=StopSequence&%24top=30&%24format=JSON";
	return station;
}

async function route(routeID){
	let station;
	if(routeID===1320)station=route132_0();
	else if(routeID===1321)station=route132_1();
	else if(routeID===1330)station=route133_0();
	else if(routeID===1331)station=route133_1();
	else if(routeID===1720)station=route172_0();
	else if(routeID===1721)station=route172_1();
	else if(routeID===1730)station=route173_0();
	else if(routeID===1731)station=route173_1();
	const output=[];
	const response = await axios.get(station, { 
		headers: getAuthorizationHeader(),
	})
	console.log(response.data);
	response.data.forEach((doc)=>{
		let busTime=get_busTime(doc);
		output.push({
	  		id: Date.now()+doc.StopName.En,
	  		state : doc.StopName.Zh_tw,
	  		time : busTime,
		});
	})
	console.log(output);
	return output;
}

export default {
	state,
	route,
};