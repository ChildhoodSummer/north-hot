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
		.otherwise({
            redirectTo: '/'
        });
}]);


