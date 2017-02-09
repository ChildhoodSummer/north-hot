// 首页
app.controller('homeCtrl', function ($scope, $rootScope, $location, service, $http) {
	$rootScope.title = '首页';
	showLoading();
	service.getUserAccount().then(function (res) {
		hideLoading();

	})
})



// 企业简介
app.controller('aboutmeCtrl', function ($scope, $rootScope, $location, service, $http) {
	$rootScope.title = '企业简介';
	showLoading();
	service.getCompany().then(function (res) {
		service.companyIntro(res.id).then(function (data) {
			hideLoading();
			if (data.errcode != 0) {
				alert(data.errmsg)
				history.go(-1);
			}
			$("#content").html(data.Data);
		})
	})
})


// 维修站点
app.controller('stationCtrl', function ($scope, $rootScope, $location, service, $http) {
	$rootScope.title = '维修站点';
	$scope.currpage = 1;

	showLoading();
	service.serviceStationList($scope.currpage).then(function (res) {
		hideLoading();
		$scope.list = res.Data;
	})


	$scope.loadMore = function () { //查看更多

		$scope.currpage++;
		if ($scope.busy) {
			return false;
		}
		$scope.busy = true;
		showLoading();
		service.serviceStationList($scope.currpage).then(function (res) {
			hideLoading();
			$scope.busy = false;
			for (var i in res.Data) {
				$scope.list.push(res.Data[i]);
			}
		});

	};

	$scope.tel = function (task) {
		var telnum = task.Tel;
		$scope.tellist = telnum.split("、");
		$('#iosMask').show();
		$('#iosActionsheet').show();
		$('#iosActionsheet').addClass('weui-actionsheet_toggle')
	}

	$scope.iosActionsheetCancel = function () {
		$scope.tellist = [];
		$('#iosMask').hide();
		$('#iosActionsheet').removeClass('weui-actionsheet_toggle')
		$('#iosActionsheet').hide();

	}

	$scope.gomap = function (t) {
		localStorage.tskInfo = JSON.stringify(t);
		$location.path('/map')
	}


})





// 维修站点地图
app.controller('mapCtrl', function ($scope, $rootScope, $location, service, $http) {

	$('#allmap').height($(window).height());
	var Info = JSON.parse(localStorage.tskInfo);
	$rootScope.title = Info.Title;
	// 百度地图API功能
	var map = new BMap.Map('allmap');
	var poi = new BMap.Point(Info.Longitude, Info.Latitude);
	map.centerAndZoom(poi, 15);
	map.enableScrollWheelZoom();
	var top_left_navigation = new BMap.NavigationControl();

	var tel = '';
	if (Info.Tel.split('、').length == 1) {
		var tel = '<a href="tel:' + Info.Tel + '"><i class="fa fa-phone" aria-hidden="true"></i>&nbsp;' + Info.Tel + '</a>';
	} else {
		for (var a = 0; a < Info.Tel.split('、').length; a++) {
			tel += '<a href="tel:' + Info.Tel.split('、')[a] + '"><i class="fa fa-phone" aria-hidden="true"></i>&nbsp;' + Info.Tel.split('、')[a] + '</a>&nbsp;&nbsp;';
		}
	}
	var content = '<div style="margin:0;line-height:20px;padding:2px;">地址：' + delHtmlTag(Info.Content) + '<br/>电话：' + tel + '<br/></div>';

	//创建检索信息窗口对象
	var searchInfoWindow = null;
	searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
		title: Info.Title, //标题
		width: 290, //宽度
		height: 60, //高度
		panel: "panel", //检索结果面板
		enableAutoPan: true, //自动平移
		searchTypes: []
	});
	var marker = new BMap.Marker(poi); //创建marker对象
	searchInfoWindow.open(marker);
	marker.addEventListener("click", function (e) {
		searchInfoWindow.open(marker);
	})
	map.addOverlay(marker); //在地图中添加marker
	map.addControl(top_left_navigation);



})




// 其他信息
app.controller('othersCtrl', function ($scope, $rootScope, service) {
	$rootScope.title = '其他信息';
	showLoading();
	service.getCompany().then(function (res) {
		hideLoading();
		$scope.companyname = res.name;
	})
})



// 其他信息列表
app.controller('otherListCtrl', function () {
	
})


// 其他信息内容
app.controller('otherContentCtrl', function () {
	
})