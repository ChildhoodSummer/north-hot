var ajaxUrl = 'http://www.eheat.com.cn/wechatservice.ashx';
var heatUrl = 'http://www.heatingpay.com/command.ashx';

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
openid = 'oVxc7t9BGX_892JWfsXQsvfRGec0';

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


var data = {
    method: 'getjssdk',
    url: window.location.href,
    openid: openid
}
$.post(ajaxUrl, data, function(res){
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