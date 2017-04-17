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
app.controller('mapCtrl', function ($rootScope) {

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
		var tel = '<a href="tel:' + Info.Tel + '" class="black"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-dianhua"></use></svg>&nbsp;' + Info.Tel + '</a>';
	} else {
		for (var a = 0; a < Info.Tel.split('、').length; a++) {
			tel += '<a href="tel:' + Info.Tel.split('、')[a] + '" class="black"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-dianhua"></use></svg>&nbsp;' + Info.Tel.split('、')[a] + '</a>&nbsp;&nbsp;';
		}
	}
	var content = '<div style="margin:0;line-height:20px;padding:2px;">地址：' + delHtmlTag(Info.Content) + '<br/>电话：' + tel + '<br/></div>';

	//创建检索信息窗口对象
	var searchInfoWindow = null;
	searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
		title: Info.Title, //标题
		width: 290, //宽度
		height: 55, //高度
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


// 选择绑卡方式
app.controller('bindmethodCtrl', function ($rootScope, service, $scope, $location) {

	$rootScope.title = '选择绑卡方式';

	//默认绑卡方式
	$scope.homeBind = [{
			"c_mode": "供热卡号",
			"isinputname": 0
		},
		{
			"c_mode": "身份证号"
		},
		{
			"c_mode": "小区楼号"
		},
		{
			"c_mode": "地址或房屋号"
		}
	];

	showLoading();
	service.getCompany().then(function (res) { //获取公司信息
		localStorage.companyInfo = JSON.stringify(res);
		service.CompanytCardMode(res.id).then(function (r) { //获取绑卡方式
			hideLoading();
			if (r == '') {
				$scope.bdList = $scope.homeBind;
			} else if (r.length == 1 && r[0].c_mode == '供热卡号') { //只有供热卡号一种方式绑卡
				localStorage.cardnumInfo = JSON.stringify(r[0]);
				$location.path('/cardnum')
			} else {
				$scope.bdList = r
			}
		})
	})

	$scope.bind = function (task) { //绑卡
		if (task.c_mode == "供热卡号") {
			localStorage.cardnumInfo = JSON.stringify(task);
			$location.path('/cardnum')
		} else if (task.c_mode == "身份证号") {
			localStorage.cardIdInfo = JSON.stringify(task);
			$location.path('/cardid')
		} else if (task.c_mode == "小区楼号") {
			$location.path('/cardhouse')
		} else if (task.c_mode == "地址或房屋号") {
			$location.path('/cardaddress')
		} else if (task.c_mode == "手机号") {
			$location.path('/')
		}
	}

})


// 绑卡方式：卡号&&卡号+姓名
app.controller('cardnumCtrl', function (service, $scope, $location, $rootScope) {
	$rootScope.title = '绑定卡号';
	var cardnumInfo = JSON.parse(localStorage.cardnumInfo); //绑卡信息
	var companyInfo = JSON.parse(localStorage.companyInfo); //公司信息
	$scope.cardnumInfo = cardnumInfo;
	$scope.cardnum = '';
	$scope.username = '';
	$scope.otherperson = '';
	$scope.phonenum = '';
	$scope.vercode = '';
	$scope.companyid = companyInfo.id;

	$scope.addCard = function () { //绑卡
		if ($scope.cardnum == '') {
			showAlert('请输入卡号');
			return;
		} else if (cardnumInfo.isinputname == 1 && $scope.username == '') {
			showAlert('请输入用户姓名');
			return;
		} else if (companyInfo.id == 174 && $("#ymtel").val() == '') { //义马热力手机号
			showAlert('请输入手机号');
			return;
		} else if (companyInfo.id == 174 && $scope.vercode == '') { //义马热力验证码
			showAlert('请输入验证码');
			return;
		}
		showLoading();
		service.bindingWarmCardBynum($scope.cardnum, companyInfo.id, companyInfo.name, $scope.otherperson, $scope.username, $("#ymtel").val(), $scope.vercode).then(function (r) {
			hideLoading();
			if (r.errmsg) {
				showAlert(r.errmsg);
				return;
			} else if (r.RoomID) {
				showAlert('添加成功');
				//此处应添加引导页
			}
		})
	}


})

// 绑卡方式：身份证
app.controller('cardIdCtrl', function (service, $scope, $location, $rootScope) {
	$rootScope.title = '身份证';
	$scope.cardid = '';
	$scope.username = '';
	$scope.cardIdInfo = JSON.parse(localStorage.cardIdInfo); //绑卡信息
	var companyInfo = JSON.parse(localStorage.companyInfo); //公司信息
	$scope.addCard = function () { //绑卡
		if ($scope.cardid == '') {
			showAlert('请输入身份证号');
			return;
		} else if ($scope.cardid.length != 15 && $scope.cardid.length != 18) {
			showAlert('身份证输入有误');
			return;
		} else if ($scope.cardIdInfo.isinputname == 1 && $scope.username == '') {
			showAlert('请输入姓名');
			return;
		}
		showLoading();
		service.FindIDcard($scope.cardid, companyInfo.name).then(function (e) {
			if (e.Data.length == 0) {
				hideLoading();
				showAlert('此身份证没有供暖卡记录');
				return;
			}
			service.bindingwarmcardByid(e.Data[0].ID, cardnum, companyInfo.name, companyInfo.id, $scope.username).then(function (r) {
				hideLoading();
				if (r.errmsg) {
					showAlert(r.errmsg);
					return;
				} else if (r.RoomID) {
					showAlert('添加成功');
					//此处应添加引导页
				}
			})

		})

	}
})

// 绑卡方式：小区楼号1
app.controller('cardHouseCtrl', function (service, $scope, $location, $rootScope) {
	$rootScope.title = '小区楼号';
	$scope.areaText = '';
	var companyInfo = JSON.parse(localStorage.companyInfo); //公司信息
	var searchlevel = "热站";
	service.getBushuListArea(companyInfo.name).then(function (data) {
		$.each(data.Data, function (key, value) {
			if (value.Name == "小区") {
				searchlevel = value.Name;
			}
		});
		console.log(searchlevel)
	})

	$scope.checkArea = function () {
		if ($scope.areaText == '') {
			showAlert('请输入查询条件');
			return;
		}
		showLoading();
		service.CheckArea(companyInfo.name, searchlevel, $scope.areaText).then(function (res) {
			hideLoading();
			$scope.areaList = res.Data;
		})
	}

})

// 绑卡方式：地址或房屋号
app.controller('cardAddressCtrl', function (service, $scope, $location, $rootScope) {
	$rootScope.title = '地址或房屋号';

	$http.post(url,{a:1}).then(function successCallback(response) {
		
	})
})