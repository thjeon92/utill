 /*
 ===============================================================================
 == Registered Common Functioncs
 ===============================================================================
 ● $.fn.formSerializeObject	: 
 ● $.fn.onEnter				:  
*/

var matched, browser;

jQuery.uaMatch = function( ua ) {
    ua = ua.toLowerCase();

    var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [];

    return {
        browser: match[ 1 ] || "",
        version: match[ 2 ] || "0"
    };
};

matched = jQuery.uaMatch( navigator.userAgent );
browser = {};

if ( matched.browser ) {
    browser[ matched.browser ] = true;
    browser.version = matched.version;
}

// Chrome is Webkit, but Webkit is also Safari.
if ( browser.chrome ) {
    browser.webkit = true;
} else if ( browser.webkit ) {
    browser.safari = true;
}

jQuery.browser = browser; 

function get_version_of_IE () {  
	 var rv = 10; // Return value assumes failure.    
     if (navigator.appName == 'Microsoft Internet Explorer') {        
          var ua = navigator.userAgent;        
          var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");        
          if (re.exec(ua) != null)            
              rv = parseFloat(RegExp.$1);    
         }    
     return rv; 
} 
 
// IE 버젼 10이하는 안내페이지로 이동 
if(browser.msie ==true && get_version_of_IE() <9 ){
	location.replace("/browserError.jsp");
}; 

//form serialize string -> object
$.fn.formSerializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

$.fn.onEnter = function(func) {
	var that = this;
	
	this.each(function(index) {
		that.keydown(function (key) {
			if(key.keyCode == 13) {	//키가 13이면 실행 (엔터는 13)
				func();
			}
		});
	});
};

    
 
function openPop(url, params, minHeight, maxHeight)
{
	$("#modalCommonPop .modal-content").load(url, params, function(){
		
		$("#modalCommonPop .modal-body").css("min-height", minHeight);
		$("#modalCommonPop .modal-body").css("max-height", maxHeight);
		$("#modalCommonPop .modal-body").css("overflow", "auto");
		$("#ui-datepicker-div").remove(); 
		$("#modalCommonPop").modal("show");
		
	});
}
 
function closeModalPop()
{
	$("#modalCommonPop").modal("hide");
	$("#modalCommonPop .modal-content").empty();
}
 
function pageMovePop(url, params, minHeight, maxHeight) {
	$("#modalCommonPop .modal-content").empty(); 
	openPop(url, params, minHeight, maxHeight); 
}
 
var alertMsg = function(title, msg, callback){
	$("#msgPop").parent().show(); 
	$("#msgTit").text(title);
	$("#msgBox").text(msg);
	$("#msgPop").show();
	$("#btnAlertClose").click(function(){
		closeMsg(); 
		if(callback && typeof callback == 'function') {
			callback(); 
		}	 
	}); 
};

var confirmMsg = function(title, msg, callback){
	$("#confirmPop").parent().show(); 
	$("#confirmTit").text(title);
	$("#confirmBox").text(msg);
	$("#confirmPop").show();
	$("#btnConfirmClose").click(function(){
		closeConfirm(); 
		if(callback && typeof callback == 'function') {
			callback(); 
		}	 
	}); 
};

var closeConfirm = function(){
	$("#confirmPop").parent().hide();
};

var closeMsg = function(){
	$("#msgPop").parent().hide();
}

var layerPop = function(layer_num){
	$("#"+layer_num).parent().show(); //dim
	$("#"+layer_num).show();
}

var closePop = function(op){
	$(".layer_dim").css("display","none"); 
} 


function onlyAlpNum() // 숫자와 영문자만 입력 허용.
{
	if((event.keyCode < 48) || ((event.keyCode > 57) && (event.keyCode < 65)) || ((event.keyCode > 90) && (event.keyCode < 97)) || (event.keyCode > 122))
	{
		if(navigator.appName == "Netscape")
		{
			event.preventDefault();
		}
		else
		{
			event.returnValue = false;
		}
	}
}

//숫자만 입력 허용.
function onlyNum(){
	if ( ( (48<=event.keyCode) && (event.keyCode<=57) ) || (event.keyCode==8) ) {
        event.returnValue=true;
	}
	else 
	{
        event.returnValue=false; 
	}
}

function onlyHangul() // 한글만 입력 허용.
{
	if((event.keyCode < 12592) || (event.keyCode > 12687))
	{
		if(navigator.appName=="Netscape")
		{
			event.preventDefault();
		}
		else
		{
			event.returnValue = false;
		}
	}
}

function dataNullCheck(value) // Input Data Null 체크 여부.
{
	var temp = $.trim(value);

	if(temp === "" || temp === undefined || temp === null)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function dataNullAndLengthCheck(value, num) // Input Data Null 체크, 입력 값 길이 체크.
{
	var temp = $.trim(value);

	if(temp === "" || temp === undefined || temp === null)
	{
		return true;
	}
	else
	{
		if(temp.length >= num)
		{
			return false;
		}
		else
		{
			return true;
		}

		return false;
	}
}

function isValidNum(str) // 숫자 인지 확인.
{
	for(var i = 0; i < str.length; i++)
	{
		achar = str.charCodeAt(i);
		if(achar < 48 || achar > 57)
		{
			return false;
		}
	}

	return true;
}

function isValidEmail(email) // 이메일 형식 검사.
{
	var format = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
	if(email.search(format) != -1)
	{
		return true; // 올바른 포맷 형식.
	}

	return false;
}

function specialStrReplace(text) // html 태그 xss처리.
{
	return text.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&apos;").replace(/\r\n|\r|\n/g, "<br/>\n");
}

function makeCalendar(calendarId, showDateId)
{
	$("#" + calendarId).datepicker({
		changeMonth: true,
		changeYear: true,
		dayNamesMin: ["월", "화", "수", "목", "금", "토", "일"],
		dayNames: ["월", "화", "수", "목", "금", "토", "일"],
		monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		nextText: "다음 달",
		prevText: "이전 달",
		showButtonPanel: true,
		beforeShow: function(input){
			setTimeout(function(){
				var buttonPane = $(input).datepicker("widget").find(".ui-datepicker-buttonpane");
				var btn = $('<button class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" type="button">지우기</button>');
				btn.unbind("click").bind("click", function(){
					$(input).datepicker("hide");
					$(input).val("");
					$("#" + showDateId).text("날짜를 선택하세요.");
				});

				btn.appendTo(buttonPane);
			}, 1);
		},
		currentText: "오늘",
		dateFormat: "yymmdd",
		showMonthAfterYear: true,
		yearRange: "1900:2030",
		showOtherMonths: true,
		selectOtherMonths: true,
		onSelect: function(date){
			var showDate = date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2);
			$("#" + showDateId).text(showDate);
			$("#" + calendarId).val(date);
		},
		closeText: "닫기"
	});
	
	$("#" + calendarId).show().focus().hide();
}

function makeCalendarYearMonth(calendarId, showDateId)
{
	$("#" + calendarId).datepicker({
		changeMonth: true,
		changeYear: true,
		dayNamesMin: ["월", "화", "수", "목", "금", "토", "일"],
		dayNames: ["월", "화", "수", "목", "금", "토", "일"],
		monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		nextText: "다음 달",
		prevText: "이전 달",
		showButtonPanel: true,
		beforeShow: function(input){
			setTimeout(function(){
				var buttonPane = $(input).datepicker("widget").find(".ui-datepicker-buttonpane");
				var btn = $('<button class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" type="button">지우기</button>');
				btn.unbind("click").bind("click", function(){
					$(input).datepicker("hide");
					$(input).val("");
					$("#" + showDateId).text("날짜를 선택하세요.");
				});

				btn.appendTo(buttonPane);
			}, 1);
		},
		currentText: "오늘",
		dateFormat: "yymm",
		showMonthAfterYear: true,
		yearRange: "1900:2030",
		showOtherMonths: true,
		selectOtherMonths: true,
		onSelect: function(date){
			var showDate = date.substr(0, 4) + "-" + date.substr(4, 2);
			$("#" + showDateId).text(showDate);
			$("#" + calendarId).val(date);
		},
		closeText: "닫기"
	});
	
	$("#" + calendarId).show().focus().hide();
}

function getToday(currentDate, format)
{
	var year = Number(currentDate.substring(0, 4));
	var month = Number(currentDate.substring(4, 6));
	var day = Number(currentDate.substring(6, 8));

	var date = new Date(year + "-" + month + "-" + day);

	if(format)
	{
		return (date.getFullYear()).toString() + "-" + (("00" + (date.getMonth() + 1).toString()).slice(-2)) + "-" + ("00" + (date.getDate()).toString()).slice(-2);
	}
	else
	{
		return (date.getFullYear()).toString() + (("00" + (date.getMonth() + 1).toString()).slice(-2)) + ("00" + (date.getDate()).toString()).slice(-2);
	}
}

function getDate(day, format)
{
	var result = new Date(new Date() - day * 1000 * 60 * 60 * 24);

	if(format)
	{
		return (result.getFullYear()).toString() + "-" + (("00" + (result.getMonth() + 1).toString()).slice(-2)) + "-" + ("00" + (result.getDate()).toString()).slice(-2);
	}
	else
	{
		return (result.getFullYear()).toString() + (("00" + (result.getMonth() + 1).toString()).slice(-2)) + ("00" + (result.getDate()).toString()).slice(-2);
	}
	
}

function getFormatDate(date){
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + '-' + month + '-' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}

function getDateTime () {
		var date = new Date();
		var year = date.getFullYear();
		var month = (1 + date.getMonth());
		month = month >= 10 ? month : '0' + month;
		var day = date.getDate();
		day = day >= 10 ? day : '0' + day; 
		
		var hour = date.getHours();
		hour = hour >= 10 ? hour : '0' + hour; 
		var mimute = date.getMinutes();
		mimute = mimute >= 10 ? mimute : '0' + mimute; 
		var seconds = date.getSeconds();
		seconds = seconds >= 10 ? seconds : '0' + seconds;  
	return year + '-' + month + '-' + day + ' '  + hour + ':' + mimute + ':' + seconds ;
} 
 
function calculateToBytes(bytes) // 파일싸이즈 변환.
{
	var s = ["bytes", "KB", "MB", "GB", "TB", "PB"];
	var e = Math.floor(Math.log(bytes) / Math.log(1024));

	if (e == "-Infinity")
	{
		return "0" + s[0];
	}
	else
	{
		return (bytes / Math.pow(1024, Math.floor(e))).toFixed(2) + s[e];
	}
}

function getSelectionObjectValue(name) // 체크박스, 라디오버튼 체크유무 Object생성.
{
	var params = {};
	var chkObject = document.getElementsByName(name);

	for(var i = 0; i < chkObject.length; i++)
	{
		if(chkObject[i].checked)
		{
			if(chkObject[i].type == "checkbox")
			{
				params[chkObject[i].id] = "Y";
			}
			else if(chkObject[i].type == "radio")
			{
				params[chkObject[i].name] = "Y";
				break;
			}
		}
		else
		{
			if(chkObject[i].type == "checkbox")
			{
				params[chkObject[i].id] = "N";
			}
			else if(chkObject[i].type == "radio")
			{
				params[chkObject[i].name] = "N";
				break;
			}
		}
	}

	return params;
}

//전화번호 형식(숫자-숫자-숫자)인지 체크.
function isValidPhone(tel)
{
	var format = /^(\d+)-(\d+)-(\d+)$/;
	if(tel.search(format) != -1)
	{
		return true; // 올바른 포맷 형식.
	}

	return false;
}
function isValidTelReg(TelNo) {
	var regExp	  = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
	if(regExp.test(TelNo)) {
		return true;
	} else {
		return false;
	}
}

function isValidPhoneReg(PhoneNo) {
	var handNoExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
	if(handNoExp.test(PhoneNo)) {
		return true;
	} else {
		return false;
	}
}

function phoneFomatter(num,type){
    var formatNum = '';
    if(num.length==11){
        if(type==0){
            formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
        }else{
            formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        }
    }else if(num.length==8){

        formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
    }else{
        if(num.indexOf('02')==0){
            if(type==0){
                formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-****-$3');
            }else{
                formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
            }
        }else{
            if(type==0){
                formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-***-$3');
            }else{
                formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
            }
        }
    }
    return formatNum;
}



//영문, 숫자 인지 확인.
function isValidEngNum(str) {
	for(var i = 0; i < str.length; i++){
		achar = str.charCodeAt(i);
		if(achar > 255){
			return false;
		}
	}
	return true; 
}

//문자열에 특수문자(",  ',  <,  > ) 검사.
function isValidSpecialChar(str) {
	if(str.search(/[\",\',<,>]/g) >= 0){
		return true; // 존재 하면.
	}
	return false;
}

//한글 필터링
function isValidKorean(data){
	//UTF-8 코드 중 AC00부터 D7A3 값이지 검사
	var format = /^[\uac00-\ud7a3]*$/g;
	if(data.search(format) != -1){
		return true; //올바른 포맷 형식
	}
	return false;
}

//이미지 파일인지 검사
function isImageFile(fileName) {
	if(!/(\.gif|\.jpg|\.jpeg|\.png)$/i.test(fileName)) {
		return false;
	}
	return true;
}

//날짜 형식 검사 정규표현식 : 2011-03-01
function isValidDateFormat(_date) {
	var format = /[12][0-9]{3}-[0-9]{2}-[0-9]{2}/;
	if(_date.search(format) == -1)
		return false;
		
	var _year = _date.substr(0,4);
	var _month= _date.substr(5,2);
	var _day = _date.substr(8,2);
	
	return isValidDate(_year, _month, _day);		
}

//날짜가 정확한지 검사(문자)
function isValidDate(syear, smonth, sday) {
	var temp, year, month, day;
	var days = new Array (31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

	syear = syear.trim();
	smonth = smonth.trim();
	sday = sday.trim();
	 if(syear.length != 4 ||smonth.length!=2||sday.length!=2 )
			return false;
	
	 year = parseInt(syear);
	
		temp = smonth;
	 if(temp.charAt(0) == '0')
	     temp = temp.charAt(1);
	 month = parseInt(temp);
	
	 temp = sday;
	 if(temp.charAt(0) == '0')
	     temp = temp.charAt(1);
	 day = parseInt(temp);

 	// 날짜 검사
	if(year%4==0 && year%100 !=0 || year%400==0)
		days[1]=29;
	else
		days[1]=28;

	if(month < 1 || month > 12)
		return false;

	if(day > days[month-1] || day < 1)
		return false;
	return true;
}

//두 날짜간의 날수를 계산(형식 : 2011-03-01)
function getDays(sDate,eDate) {  
 var date1 = new Date(sDate.split('-')[0],sDate.split('-')[1],sDate.split('-')[2]);
 var date2 = new Date(eDate.split('-')[0],eDate.split('-')[1],eDate.split('-')[2]);

 var interval = date2 - date1;
 var day = 1000*60*60*24;
 
 return parseInt(interval/day);
}

//주민등록 번호 검사
function isValidResidentNO(PN_1, PN_2) {
		var days = new Array (31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

		var check = new Array (2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5);
		var ssn = new Array(13);
		var temp, year, month, day, tot, chkNum, i;
		
		var ssn1 = PN_1.value;
		var ssn2 = PN_2.value;

		if((ssn1.length != 6) || (ssn2.length != 7))
			return false;

		for(i = 0; i< 13; i++) {
			if(i < 6)
				ssn[i] = parseInt(ssn1.charAt(i));
			else
				ssn[i] = parseInt(ssn2.charAt(i-6));
		}
		
		temp = ssn1.substr(0, 2);
		if(temp.charAt(0) == '0')
			temp = temp.charAt(1);
		year = parseInt(temp);

		if(ssn[6] == 1 || ssn[6] == 2)
			year = year + 1900;
		else
			year = year + 2000;

		temp = ssn1.substr(2, 2);
		if(temp.charAt(0) == '0')
			temp = temp.charAt(1);
		month = parseInt(temp);

		if(ssn[6] < 1 || ssn[6] > 4)
			return false;

		temp = ssn1.substr(4, 2);
		if(temp.charAt(0) == '0')
			temp = temp.charAt(1);
		day = parseInt(temp);

		if(year%4==0 && year%100 !=0 || year%400==0)
			days[1]=29;
		else
			days[1]=28;

		if(month < 1 || month > 12)
			return false;

		if(day > days[month-1] || day < 1)
			return false;

		tot=0;
		for(i=0; i<12; i++)
			tot = tot + ssn[i] * check[i];
		chkNum = 11 - tot % 11;
		chkNum = chkNum % 10;

		if(chkNum != ssn[12])
			return false;
		return true;
}


//공통코드 selectbox option 생성
function createCommonCodeElement(elementId, params, type, callback){
	var targetElement = $(elementId);
	switch(type) {
		case 'all':
			targetElement.append('<option value="">전체</option>');
			break;
		case 'choice':
			targetElement.append('<option value="">선택하세요</option>');
			break;
	} 
	commonAjax('/common/selectCommonCodeList.ajax', params, function(resultData) {
		
		if(elementId.indexOf('memberPhone') >-1) {
			targetElement.append("<option value='-'>없음</option>");
 			targetElement.append("<option value='070' selected>070</option>");
		}		
		if(params.mainCode =='M20'){
			targetElement.append("<option value='-'>이메일 없음</option>");
		} 
		if(params.mainCode =='M22'){
			targetElement.append("<option value='-'>없음</option>");
		}	
		$.each(resultData, function(idx, item) { 
		 	if( elementId.toLowerCase().indexOf("phone") >-1 ){
				if(params.elementValue == item.subCode)
					targetElement.append('<option value="' + $.trim(item.subCode) +'" selected>' + (item.mainCode =='M21' ? item.subCode: item.codeData1) + '</option>');
				else
					targetElement.append('<option value="' + $.trim(item.subCode) +'">' + (item.mainCode =='M21' ? item.subCode: item.codeData1)  + '</option>');
			}else{ 
				if(params.elementValue == item.subCode)
					targetElement.append('<option value="' + $.trim(item.subCode) +'" selected>' +   item.codeData1  + '</option>');
				else
					targetElement.append('<option value="' + $.trim(item.subCode) +'">' +  item.codeData1  + '</option>');
			}
		});
		if(callback && typeof callback == 'function') {
			callback();
		}
	}, "json", false);
}

//공통코드 selectbox option 생성
function createCommonCodeElementList(reqList, callback) {
	var deferreds = [];
	$.each(reqList, function(idx, req) {
		var targetElement = $(req.elementId);
		switch(req.type){
			case 'all':
				targetElement.append('<option value="">전체</option>');
				break;
			case 'choice':
				targetElement.append('<option value="">선택</option>');
				break;
		}
		commonAjax('/common/selectCommonCodeList.ajax', req.param, function(resultData) {
			$.each(resultData, function(idx, item) {
				if(req.elementValue == item.subCode)
					targetElement.append('<option value="' + $.trim(item.subCode) +'" selected>' + item.codeData1 + '</option>');
				else
					targetElement.append('<option value="' + $.trim(item.subCode) +'">' + item.codeData1 + '</option>');
			});
		}, "json", true);
	});
	return $.when.apply($, deferreds).done(function() {
		if(callback && typeof callback == 'function') {
			callback(arguments);
		}
	});
}
//공통코드 selectbox option 생성 (이름2 칼럼 쓰는 거, 예를 들면 학기에서 봄, 여름, 가을 ,겨울)
function createCommonCodeElement2(elementId, params, type, callback){
	var targetElement = $(elementId);
	switch(type) {
		case 'all':
			targetElement.append('<option value="">전체</option>');
			break;
		case 'choice':
			targetElement.append('<option value="">선택</option>');
			break;
	}
	commonAjax('/common/selectCommonCodeList.ajax', params, function(resultData){
		$.each(resultData, function(idx, item) {
			if(params.elementValue == item.subCode)
				targetElement.append('<option value="' + $.trim(item.subCode) +'" selected>' + item.codeData1 + '</option>');
			else
				targetElement.append('<option value="' +  $.trim(item.subCode) +'">' + item.codeData1 + '</option>');
			
		});
		if(callback && typeof callback == 'function') {
			callback();
		}
	}, "json", true);
}

//공통코드 selectbox option 생성 (이름2 칼럼 쓰는 거, 예를 들면 학기에서 봄, 여름, 가을 ,겨울)
function createCommonCodeElementList2(reqList, callback) {
	var deferreds = [];
	$.each(reqList, function(idx, req) {
		var targetElement = $(req.elementId);
		switch(req.type){
			case 'all':
				targetElement.append('<option value="">전체</option>');
				break;
			case 'choice':
				targetElement.append('<option value="">선택</option>');
				break;
		}
		commonAjax('/common/selectCommonCodeList.ajax', req.param, function(resultData) {
			$.each(resultData, function(idx, item) {
				if(req.elementValue == $.trim(item.subCode))
					targetElement.append('<option value="' + $.trim(item.subCode) +'" selected>' + item.codeData1 + '</option>');
				else
					targetElement.append('<option value="' + $.trim(item.subCode) +'">' + item.codeData1 + '</option>');
			});
		}, "json", true);
	});
	return $.when.apply($, deferreds).done(function() {
		if(callback && typeof callback == 'function') {
			callback(arguments);
		}
	});
}

//공통코드 selectbox option 생성 
function createCorsFgCodeElement(elementId, params, type, callback) {
	var targetElement = $(elementId);
	switch(type){
		case 'all':
			targetElement.append('<option value="">전체</option>');
			break;
		case 'choice':
			targetElement.append('<option value="">선택</option>');
			break;
	}
	commonAjax('/common/selectCorsFgCodeList.ajax', params, function(resultData){
		$.each(resultData, function(idx, item) {
			targetElement.append('<option value="' + $.trim(item.subCode) +'">' + item.codeData1 + '</option>');
		});
		if(callback && typeof callback == 'function'){
			callback();
		}
	}, "json", true);
}
//공통코드 selectbox option 생성  
function createCorsFgCodeElementList(reqList, callback) {
	var deferreds = [];
	$.each(reqList, function(idx, req){
		var targetElement = $(req.elementId);
		switch(req.type){
			case 'all':
				targetElement.append('<option value="">전체</option>');
				break;
			case 'choice':
				targetElement.append('<option value="">선택</option>');
				break;
		}
		commonAjax('/common/selectCorsFgCodeList.ajax', req.param, function(resultData) {
			$.each(resultData, function(idx, item){ 
				if(req.elementValue == item.subCode)
					targetElement.append('<option value="' + item.subCode +'" selected>' + item.codeData1 + '</option>');
				else
					targetElement.append('<option value="' + item.subCode +'">' + item.codeData1 + '</option>');
			});
		}, "json", true);
	});
	return $.when.apply($, deferreds).done(function() {
		if(callback && typeof callback == 'function') {
			callback(arguments);
		}
	});
}
/* 공통코드 selectbox option 생성(국가 별도 Order by 적용) */
function createCommonCodeElementNation(reqList, callback) {
	var deferreds = [];
	$.each(reqList, function(idx, req) {
		var targetElement = $(req.elementId);
		switch(req.type) {
			case 'all':
				if(req.param.chkedVal == "ko") {
					targetElement.append('<option value="">전체</option>');
				} else {
					targetElement.append('<option value="">All</option>');
				}
				break;
			case 'choice':
				if(req.param.chkedVal == "ko") {
					targetElement.append('<option value="">선택</option>');
				} else {
					targetElement.append('<option value="">Choice</option>');
				}
				break;
		}
		commonAjax('/common/selectCommonCodeNation.ajax', req.param, function(resultData) {
			$.each(resultData, function(idx, item) { 
					if(req.elementValue == item.subCode)
						targetElement.append('<option value="' + $.trim(item.subCode) +'" selected>' + item.codeData1 + '</option>');
					else
						targetElement.append('<option value="' + $.trim(item.subCode) +'">' + item.codeData1 + '</option>');
				 
			});
		}, "json", true);
	});
	return $.when.apply($, deferreds).done(function() {
		if(callback && typeof callback == 'function') {
			callback(arguments);
		}
	});
}

//폼 데이터 set
function setFormData(formId, data){
	var targetForm = $(formId),
		$checkbox = targetForm.find(':checkbox'),
		$radio = targetForm.find(':radio'),
		$dateSpan = targetForm.find(':button>span'),
		$span = targetForm.find('span');
	
	//input, textarea set
	/*
	$.each(targetForm.serializeArray(), function(idx, item){
		$('#'+item.name).val(data[item.name]);
	});
	*/ 
	
	$.each(data, function(key, value){
		if(value !=null ) {  
			//checkbox set
			$.each($checkbox, function(){
				var that = this,
					$that = $(that);
				if(key == that.name  && value == that.value ){
					$that.prop('checked', true);
				}
			}); 
			
			//radio set
			$.each($radio, function(){
				var that = this,
					$that = $(that);
				if(( key == that.name || key == that.id )&& value == that.value ) {
					//	&& value.indexOf(that.value) > -1){
					$that.prop('checked', true);
				}
			});
			//달력 set
			$.each($dateSpan, function(){
				var that = this,
					$that = $(that);
				if((key + 'Show') == that.id || (key + 'Show') == that.name){
					var date = data[key],
						showDate = date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2);
					$that.text(showDate);
				}
			});
			
			//span
			$.each($span, function(){
				var that = this,
				$that = $(that);
				if(key == that.id || key == that.name)  
					$that.html(value);
			}); 
			// input 
			$.each(targetForm.find(':input'), function(){
				var that = this,
				$that = $(that);
				if(key == that.id || key == that.name)   
					$that.val(value); 
			});
		}	
	});
}

//폼 필수값 체크
function validFormData(formId, msgInfo){ 
	var targetForm = $(formId),
		$input = targetForm.find(':input'),
		invalid = false;
	
	$.each($input, function(){
		var that = this,
			$that = $(that);
			if($that.attr('required') && !$that.val()){
				if(msgInfo[that.id]) {
					alert(msgInfo[that.id]);
					$that.focus();
					invalid = true;
					return false;
				}	
			}
	});
	return invalid;
}

function commonGotoUrl(action, method, params, target) {
    var builder = [];
    builder.push('<form method="' + method + '" action="' + action + '" target="'+target+'">');
    for (var key in params) {
        builder.push('<input type="text" name="' + key + '" value="' + params[key] + '" />');
    }
    builder.push('<input type="submit" />');
    builder.push('</form>');
    $(builder.join('')).appendTo(document.body).submit().remove();
};


/* 우편번호 API			*/
/* zipNo	: 우편번호ID	*/
/* addr		: 기본주소ID	*/
/* detaAddr	: 상세주소ID	*/
var fncExecDaumPostcode = function(zipNo, addr, detaAddr, addrDiv) {
	new daum.Postcode({
		oncomplete: function(data) {
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
			// 각 주소의 노출 규칙에 따라 주소를 조합한다.
			// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
			var fullAddr = ''; // 최종 주소 변수
			var extraAddr = ''; // 조합형 주소 변수
			
			// 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
			if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
				fullAddr = data.roadAddress;
			} else { // 사용자가 지번 주소를 선택했을 경우(J)
				fullAddr = data.jibunAddress;
			}
			
			// 사용자가 선택한 주소가 도로명 타입일때 조합한다.
			if(data.userSelectedType === 'R') {
				//법정동명이 있을 경우 추가한다.
				if(data.bname !== '') {
					extraAddr += data.bname;
				}
				// 건물명이 있을 경우 추가한다.
				if(data.buildingName !== '') {
					extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
				}
				// 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
				fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');
			}
			
			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			$("#" + zipNo).val(data.zonecode); //5자리 새우편번호 사용
			$("#" + addr).val(fullAddr);
			
			// 커서를 상세주소 필드로 이동한다.
			$("#" + detaAddr).focus();
		}
	}).open();
}

/* 팝업관련상수 */
window.POPUP = {
	  'RD_WIDTH'  : 900
	, 'RD_HEIGHT' : 800
};

/* RD */
function submitWithJson(obj, data, target, method) {
	try {
		var param = null;
		
		// json object이라면
		if(obj && Object.prototype.toString.call(obj) === '[object Object]') {
			param = {
				  'url'	   : obj.url	|| ''
				, 'data'   : obj.data	|| {}
				, 'target' : obj.target	|| '_self'
				, 'method' : obj.method	|| 'POST'
			};
		} else {
			param = {
				  'url'	   : obj	|| ''
				, 'data'   : data	|| {}
				, 'target' : target	|| '_self'
				, 'method' : method	|| 'POST'
			};
		}
		
		//랜덤한 수를 출력
		var curDate	  = new Date();
		var ranNumber = Math.floor(Math.random() * 10000) + 1;
		var strId  = "";
			strId += param.target;
			strId += "_";
			strId += curDate.getFullYear();
			strId += curDate.getMonth();
			strId += curDate.getDay();
			strId += curDate.getHours();
			strId += curDate.getMinutes();
			strId += curDate.getSeconds();
			strId += "_" + ranNumber;
		var $newForm = jQuery("<form></form>")
						.attr("name"  , strId)
						.attr("id"	  , strId)
						.attr("method", param.method);
		if($newForm) {
			if(Object.prototype.toString.call(param.data) === "[object Array]") {
				jQuery.each(param.data, function(index, val) {
					var row = val;
					
					jQuery.each(row, function(key, val) {
						jQuery("<input type='hidden'>")
							.attr("name" , key)
							.attr("value", val)
							.appendTo($newForm);
					});
				});
				$newForm.appendTo(document.body);
			} else {
				jQuery.each(param.data, function(key, val) {
					jQuery("<input type='hidden'>")
					 .attr("name" , key)
					 .attr("id"   , key)
					 .attr("value", val)
					 .appendTo($newForm);
				});
				$newForm.appendTo(document.body);
			}
			
			var myForm = $newForm[0];
			
			myForm.action = param.url;
			myForm.method = param.method;
			myForm.target = param.target;
			myForm.submit();
			$newForm.remove();
		}//if ( $popForm ) {
	} catch(e) {
		alert(e.message);
	} finally {
		
	}
};

//전화번호 Mask
var telKeyupMaskFomatter = function(phoneId) {
	var formatNum = $("#" + phoneId).val();
	
	if(formatNum.length < 2) {
		$("#" + phoneId).mask("000-0000-0000");
	} else {
		if(formatNum.substring(0, 2) == "02") {
			$("#" + phoneId).mask("00-0000-0000");
		} else {
			$("#" + phoneId).mask("000-0000-0000");
		}
	}
};

//핸드폰번호 Mask
var telFocusoutMaskFomatter = function(phoneId) {
	var formatNum = $("#" + phoneId).val();
	
	if(formatNum.substring(0, 2) == "02") {
		if(formatNum.length == 11) {
			$("#" + phoneId).mask("00-000-0000");
		} else {
			$("#" + phoneId).mask("00-0000-0000");
		}
	} else {
		if(formatNum.length == 12) {
			$("#" + phoneId).mask("000-000-0000");
		} else {
			$("#" + phoneId).mask("000-0000-0000");
		}
	}
};

//특수문자 제한
var specialCharacters = function(id) {
	var regExp = /[~!@\#$%^&*\()\-=+_<>?,./'"`|\\]/gi; 
	var temp = $("#" + id).val();
	
	//특수문자가 포함되면 삭제하여 값으로 다시셋팅
	if(regExp.test(temp)) {
		$("#" + id).val(temp.replace(regExp, ""));
	}
};

/**
 * byte단위로 길이체크
 * @param {String} sValue: 문자열
 * @return {Number} byte 단위 문자열 수
 */
var getLengthB = function(sValue) {
	var vChkStr = sValue.toString();
	var vCnt = 0;
	
	for(var i = 0; i < vChkStr.length; i++) {
		if(vChkStr.charCodeAt(i) > 127) {
			vCnt += 2;
		} else {
			vCnt += 1;
		}
	}
	
	return vCnt;
};

/**
 * 브라우저 체크
 */
var checkIEBrowser = function(){
	var agent = navigator.userAgent.toLowerCase();
	
	if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) {
		return true;
	}else{
		return false;
	}
};

/**
 * IE인경우 용량 체크
 * @param {String} 1:파일사이즈리턴, 2:파일용량체크
 * @param {String} fileId: 문자열
 * @param {Number} 1:fileSizeId , 2:limit
 */
var validateFileSizeIE = function(fileType, fileId, limit){
	/*var myFSO = new ActiveXObject("Scripting.FileSystemObject");
	var filePath = $("#"+fileId).val();
	
	if(filePath == ''){
		alert('파일을 등록하세요.');
		return;
	}
	
	var thisFile = myFSO.getFile(filePath);
	var size = thisFile.size;
	
	if(fileType=="1"){
		return size;
	} else {
		if(size > limit *1024 * 1024){  //1mb
			alert('파일의 용량이 너무 큽니다. 다시 확인해주세요');
			$("#"+fileId).val('');
		}
	}*/
//	var filePath = $("#"+fileId).val();
	
//	if(filePath == ''){
//		alert('파일을 등록하세요.');
//		return;
//	}
	
	var size = document.getElementById(fileId).files[0].size;
	
	if(fileType=="1"){
		return size;
	} else {
		if(size > limit *1024 * 1024){  //1mb
			alert('파일의 용량이 너무 큽니다. 다시 확인해주세요');
			$("#"+fileId).val('');
		}
	}
};

/**
 * IE이외의 경우 용량 체크
 * @param {String} 1:파일사이즈리턴, 2:파일용량체크
 * @param {String} fileId: 문자열
 * @param {String} 1:fileSizeId , 2:limit
 */
var validateFileSizeOther = function(fileType, fileId, limit){
	if($("#"+fileId).val() == ''){
		alert('파일을 등록하세요.');
		return;
	}
	var size = $("#"+fileId)[0].files[0].size;

	if(fileType=="1"){
		return size;
	} else {
		if(size > limit *1024 * 1024){  //1mb
			alert('파일의 용량이 너무 큽니다. 다시 확인해주세요');
			$("#"+fileId).val('');
		}
	}
	
};

/**
 * IE이외의 경우 용량 체크
 * @param {String} fileId: 파일 ID
 * @return {Number} fileSizeId:파일사이즈 리턴Id
 */
var validationFileSize = function(fileId, fileSizeId){
	if(checkIEBrowser()){
		return validateFileSizeIE("1", fileId);
	}else{
		return validateFileSizeOther("1", fileId);
	}
};

/**
 * 파일사이즈 제한
 * @param {String} fileId: 파일 ID
 * @return {Number} limitFileSize : 파일 사이즈(mb)
 */
var validationFileSizeLimit = function(fileId, limitFileSize){
	if(checkIEBrowser()){
		validateFileSizeIE("2", fileId, limitFileSize);
	}else{
		validateFileSizeOther("2", fileId, limitFileSize);
	}
};

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var fncGetMaskProcess = function(type, data){
	if(type!=null || type!=""){
		var rtnVal = "";
		if(type=="memberName"){
			rtnVal  = data.substring(0,1)
			rtnVal += data.replace(/\S/gi, "*").substring(1);
		} else if(type=="adminName"){
			if(data.indexOf("(")>0){
				var dataSubstr = data.substring(0,data.indexOf("("))
				rtnVal  = data.substring(0,1);
				rtnVal += dataSubstr.replace(/\S/gi, "*").substring(1);
				rtnVal += data.substring(data.indexOf("("), data.length);
			} else if(data.indexOf("[")>0){
				var dataSubstr = data.substring(0,data.indexOf("["))
				rtnVal  = data.substring(0,1);
				rtnVal += dataSubstr.replace(/\S/gi, "*").substring(1);
				rtnVal += data.substring(data.indexOf("["), data.length);
			} else {
				rtnVal  = data.substring(0,1)
				rtnVal += data.replace(/\S/gi, "*").substring(1);
			}
		} else if(type=="licesenceNo"){
			rtnVal  = data.substring(0,3)
			rtnVal += data.replace(/\S/gi, "*").substring(3);
		} else if(type=="birthDay"){
			rtnVal  = data.substring(0,data.length-2);
			rtnVal += "**";
		} else if(type=="licenseIssueDate"){
			rtnVal  = data.substring(0,data.length-2);
			rtnVal += "**";
		} else if(type=="memberPhone"){
			if(data.indexOf("-")>0){
				var dataSplit = data.split("-");
				rtnVal  = dataSplit[0];
				rtnVal += "-"+((dataSplit[1]==undefined||dataSplit[1]=="")?"****":dataSplit[1].replace(/\S/gi, "*"));
				rtnVal += "-"+((dataSplit[2]==undefined||dataSplit[2]=="")?"****":dataSplit[2].replace(/\S/gi, "*"));
			} else {
				var dataSubstr = data.substring(0,2);
				if(dataSubstr=="02"){
					rtnVal  = dataSubstr;
					rtnVal += "-"+data.replace(/\S/gi, "*").substring(3);
				} else {
					rtnVal  = data.substring(0,3);
					rtnVal += "-"+data.replace(/\S/gi, "*").substring(4);
				}
			}
		} else if(type=="memberHPhone"){
			if(data.indexOf("-")>0){
				var dataSplit = data.split("-");
				rtnVal  = dataSplit[0];
				rtnVal += "-"+((dataSplit[1]==undefined||dataSplit[1]=="")?"****":dataSplit[1].replace(/\S/gi, "*"));
				rtnVal += "-"+((dataSplit[2]==undefined||dataSplit[2]=="")?"****":dataSplit[2].replace(/\S/gi, "*"));
			} else {
				var dataSubstr = data.substring(0,2);
				if(dataSubstr=="02"){
					rtnVal  = dataSubstr;
					rtnVal += "-"+data.replace(/\S/gi, "*").substring(3);
				} else {
					rtnVal  = data.substring(0,3);
					rtnVal += "-"+data.replace(/\S/gi, "*").substring(4);
				}
			}
		}
		
		return rtnVal;
	}
};

var fncMemberInfoPopup = function(type, id){
	/*
	if(type!=null || type!=""){
		if(type=="admin"){
			var params = {type : 'admin', adminId : id};
		 	commonAjax("/lic/admin/adminMemberInfo.ajax", params, callbackMemberInfo, "json", true);
		} else if(type=="user"){
			var params = {type : 'user', memberLicenseNo : id};
		 	commonAjax("/lic/admin/adminMemberInfo.ajax", params, callbackMemberInfo, "json", true);
		}
	}
	*/
	var url ="/lic/admin/adminMemberInfo.do?type="+type+"&id="+id ;
	
	var userwidth = 610; // (screen.width -300 );
	var userheight = 450; 
	window.open(url,"memberWindow",'scrollbars=no,toolbar=no,location=no,status=no,menubar=no,resizable=yes,width='+userwidth+',height='+userheight+',left=200,top=150');
	
};
 
var setCommas = function(val) {
	var ret= "";
	if(val != null ) {
		ret =  val.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
	}		
    return ret ;
};
 

(function(window, document, $){
	if(!$){ console.log('not find jQuery'); return ; }
	var mama = {};

	var type = ['png', 'gif', 'jpg', 'jpeg'];

	//console.log(type.indexOf('gifg'));
	
	mama.fileView = function( obj, target ){
		var files = obj.files;
		
		if(files && files[0]){
			if(type.indexOf(files[0]['name'].split('.')[1]) == -1){
			  alert('png, gif, jpg, jpeg 확장명인 이미지만 업로드 가능합니다.');
				return ;
			}
			
			if(!!this.createURL){
				window.URL.revokeObjectURL(this.createURL);
			}
			this.createURL = window.URL.createObjectURL(files[0]);
			$(target).attr('src', this.createURL);
		}
		
		return ;
	};
	
	mama.goBack = function(){
		window.history.back();
		return ;
		};
	
	window.mama = mama;
})(window, document, jQuery);

 function commonAjax(url, params, callback, dataType, async) {
	 	params = params ? params : {};
	 	
	 	if(!(dataType == "text" || dataType == "json")) { 
	 		dataType = "text";
	 	}  
	 	$.ajax({
	 		  type		  : "POST"
	 		, url		  : url
	 		, dataType	  : dataType // text, html, script, json, jsonp, xml. (서버가 던져주는 데이터형.)
	 		, async		  : !async
	 		, contentType : "application/json;charset=UTF-8"
	 		, data		  : JSON.stringify(params)
	 		, success	  : function(data, status) {
	 			if(data.result == "error") {
	 				alertMsg("알림","오류가 발생하였습니다." + "\n" + data.msg);
	 			} else {
	 				if(!(callback === "" || callback === undefined || callback === null)) {
	 					callback(data);
	 				}
	 			} 
	 		  }
	 		, error: function(request, status, statusText) {
	 			if(request.status == "401") {
	 				alertMsg("알림","세션이 만료되었거나 사용권한 없습니다.  ");
	 			} else {
	 				if(request.status == '200') {
	 					callback();
	 				} else {
	 					alertMsg("오류:"+request.status, "작업중 오류가 발생하였습니다.");
	 				}
	 			} 
	 		  }
	 		, beforeSend  : function() {  
	 			$('.loader').show();	
	 	 	  }
	 		, complete	  : function() {  
	 			$('.loader').hide();  
	 		}
	 		,timeout:100000  
	 	});
	 }
  

