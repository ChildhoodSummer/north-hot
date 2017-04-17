var ajaxUrl = 'http://www.eheat.com.cn/wechatservice.ashx';
var heatUrl = 'http://www.heatingpay.com/command.ashx';
var testUrl = 'http://172.16.0.20:8003/wechatservice.ashx';

var app = angular.module('app', [
    'ngRoute',
    'ngAnimate'
]);

app.directive('whenScrolled', function() {//滚动加载
    return function(scope, elm, attr) {  
        $(window).scroll(function () {  
            var scrollTop = $(window).scrollTop();  
            var scrollHeight = $(document).height();  
            var windowHeight = $(window).height();  
            if (scrollTop + windowHeight >= scrollHeight) {  
                scope.$apply(attr.whenScrolled);  
            }  
        });  
    };  
});  

app.run(['$rootScope', '$location', '$window', function ($rootScope, $location, $window) {

    'use strict';

    $rootScope.go = function (path, pageAnimationClass) {

        if (typeof(pageAnimationClass) === 'undefined') { 
            $rootScope.pageAnimationClass = 'crossFade';
        }else {
            $rootScope.pageAnimationClass = pageAnimationClass;
        }

        if (path === 'back') { 
            $window.history.back();
        }else { 
            $location.path(path);
        }
    };

}]);

app.filter('to_trusted', ['$sce', function ($sce) {//去除html片段
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);



 var openid = args().openid;
//openid = 'ovgs2w8rXElIKOEkfXHcxgCNhOe4';
openid = 'oVxc7t9BGX_892JWfsXQsvfRGec0';//辽宁
//openid = 'olH8exECSIlNzNrzeGqpKaKbZx4M';//义马

app.config([
	'$httpProvider',
	function($httpProvider) {
	    $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
	    $httpProvider.defaults.transformRequest.unshift(function(data, headersGetter) {
	        var key, result = [];
	        for (key in data) {
	            if (data.hasOwnProperty(key)) {
	                result.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
	            }
	        }
	        return result.join("&");
	    });
	}
]);

function args() {
    var s = location.href;
    var o = new Object();
    var i = s.indexOf("?");
    if (i > 0) {
        s = s.substring(i + 1, s.length);
        i = s.indexOf("#");
        if (i > 0) {
            o.page = s.substring(i + 1, s.length);
            s = s.substring(0, i);
        }
        var params = s.split("&");
        for (var x = 0; x < params.length; x++) {
            var a = params[x].indexOf("=");
            var k = params[x].substring(0, a);
            var v = unescape(params[x].substring(a + 1, params[x].length));
            o[k] = v;
        }
    }
    return o;
}





function showLoading(){
    var load = '<div id="loadingToast" style="opacity: 0; display: none;">div class="weui-mask_transparent"></div><div class="weui-toast"><i class="weui-loading weui-icon_toast"></i><p class="weui-toast__content">加载中</p></div></div>';
    $('body').append(load);
}
function hideLoading(){
    $('#loadingToast, .weui-toast').remove()
}


var getjssdkdata = {
    method: 'getjssdk',
    url: window.location.href,
    openid: openid
}
$.post(ajaxUrl, getjssdkdata, function(res){
    res = JSON.parse(res)
    wx.config({
        debug: false,
        appId: res.appid, 
        timestamp: res.timestamp,
        nonceStr: res.noncestr,
        signature: res.signature,
        jsApiList: [
            'chooseImage',
            'uploadImage',
            'closeWindow',
            'openEnterpriseContact',
            'getLocation'
        ]
    });
})

var evalWXjsApi = function(jsApiFun) {
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        jsApiFun();
    } else {
        document.attachEvent && document.attachEvent("WeixinJSBridgeReady", jsApiFun);
        document.addEventListener && document.addEventListener("WeixinJSBridgeReady", jsApiFun);
    }
}



function delHtmlTag(str){
  return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
 }

function showAlert(show){
    var newAlert = '<div class="js_dialog" id="hotAlert"><div class="weui-mask"></div><div class="weui-dialog"><div class="weui-dialog__bd" id="alertMain"></div><div class="weui-dialog__ft"><a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" onclick="closeAlert()">知道了</a></div></div></div>';
    $('body').append(newAlert);
    $('#alertMain').html(show);
}

function closeAlert(){
     $('#alertMain').html('');
     $('#hotAlert').remove()
}



//义马发送验证码
function sendcode(btn){
    var telnum = $.trim($("#ymtel").val());
    if($("#ymtel").val()==""){
        showAlert("请输入手机号码");
    }else{
        sendCode(btn);
        var para = {
            method: 'sendsmsverifycode',
            openid: openid,
            tel: telnum
        }
        $.post(ajaxUrl, para, function(res){
            if(res.result === 0){
                showAlert("验证码已发送");
            }else{
                showAlert("验证码发送失败，请稍候再试");
            }
        },"json");
    }
}


var timeClock = '';
var timeNums = 60;
var timeBtn;
function sendCode(thisBtn){
    timeBtn = thisBtn;
    timeBtn.disabled = "disabled";
    timeBtn.style.backgroundColor = '#bec0c1';
    timeBtn.innerHTML = '剩余'+ timeNums +'s';
    timeClock = setInterval(doLoop, 1000); //一秒执行一次
}
function doLoop(){
    timeNums--;
    if(timeNums > 0){
        timeBtn.innerHTML = '剩余'+ timeNums + 's';
    }else{
        clearInterval(timeClock); //清除js定时器
        $(timeBtn).removeAttr("disabled");
        timeBtn.style.backgroundColor ='#3fafe8'
        timeBtn.innerHTML = '重新发送';
        timeNums = 60; //重置时间
    }
}





