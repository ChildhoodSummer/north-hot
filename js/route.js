app.config(['$routeProvider',function ($routeProvider) {
	'use strict';
	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'homeCtrl'
		})
		.when('/home', { //首页
			templateUrl: 'views/home.html',
			controller: 'homeCtrl'
		})
		.when('/aboutme', { //企业简介
			templateUrl: 'views/aboutme.html',
			controller: 'aboutmeCtrl'
		})
		.when('/station', { //维修站点
			templateUrl: 'views/station.html',
			controller: 'stationCtrl'
		})
		.when('/map', { //地图map
			templateUrl: 'views/map.html',
			controller: 'mapCtrl'
		})
		.when('/others', { //其他信息
			templateUrl: 'views/others.html',
			controller: 'othersCtrl'
		})
		.when('/otherlist', { //其他信息列表
			templateUrl: 'views/otherlist.html',
			controller: 'otherListCtrl'
		})
		.when('/othercon', { //其他信息内容
			templateUrl: 'views/othercontent.html',
			controller: 'otherContentCtrl'
		})
		.when('/bindmethod', { //选择绑卡方式
			templateUrl: 'views/bindmethod.html',
			controller: 'bindmethodCtrl'
		})
		.when('/cardnum', { //卡号绑卡
			templateUrl: 'views/cardnum.html',
			controller: 'cardnumCtrl'
		})
		.when('/cardid', { //身份证绑卡
			templateUrl: 'views/card-id.html',
			controller: 'cardIdCtrl'
		})
		.when('/cardhouse', { //小区楼号绑卡1
			templateUrl: 'views/card-house.html',
			controller: 'cardHouseCtrl'
		})
		.when('/cardaddress', { //地址或房屋号绑卡
			templateUrl: 'views/card-address.html',
			controller: 'cardAddressCtrl'
		})
		.otherwise({
            redirectTo: '/'
        });
}]);


