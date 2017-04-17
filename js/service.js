app.service('service', function ($q, $http, $location) {
	return {
		getUserAccount: function () { //获取用户信息
			var deferred = $q.defer();
			var data = {
				method: 'getuseraccount',
				openid: openid
			}
			$http.post(ajaxUrl, data).then(function successCallback(response) {
				deferred.resolve(response.data);
			}, function errorCallback(response) {
				hideLoading();
				showAlert('网络不给力哦！');
			})
			return deferred.promise;
		},
		getCompany: function () { //获取公司信息
			var deferred = $q.defer();
			var data = {
				method: 'getcompany',
				openid: openid
			}
			$http.post(ajaxUrl, data).then(function successCallback(response) {
				deferred.resolve(response.data);
			}, function errorCallback(response) {
				hideLoading()
				showAlert('网络不给力哦！');
			})
			return deferred.promise;
		},
		QueryCard: function (IDCard, companyname) { //验证身份证
			var deferred = $q.defer();
			var data = {
				IDCard: IDCard,
				Company: companyname
			}
			$http.post(heatUrl + '?m=QueryCard', data).then(function successCallback(response) {
				deferred.resolve(response.data);
			}, function errorCallback(response) {
				hideLoading();
				showAlert('网络不给力哦！');
			})
			return deferred.promise;
		},
		getBushuList: function (companyname) { //获取部署列表
			var deferred = $q.defer();
			$http.post(heatUrl + '?m=getbushulist&company=' + companyname, data).then(function successCallback(response) {
				deferred.resolve(response.data);
			}, function errorCallback(response) {
				hideLoading();
				showAlert('网络不给力哦！');
			})
			return deferred.promise;
		},
		getBushuLevel: function (companyname) { //获取小区
			var deferred = $q.defer();
			$http.post(heatUrl + '?m=getbushulevel&company=' + companyname, data).then(function successCallback(response) {
				deferred.resolve(response.data);
			}, function errorCallback(response) {
				hideLoading();
				showAlert('网络不给力哦！');
			})
			return deferred.promise;
		},
		companyIntro: function (companyid) { //获取公司简介
			var deferred = $q.defer();
			var data = {
				method: 'companyintro',
				openid: openid,
				companyid:companyid
			}
			$http.post(ajaxUrl, data).then(function successCallback(response) {
				deferred.resolve(response.data);
			}, function errorCallback(response) {
				hideLoading();
				showAlert('网络不给力哦！');
			})
			return deferred.promise;
		},
		serviceStationList: function (currpage) { //获取维修站点
			var deferred = $q.defer();
			var data = {
				method: 'servicestationlist',
				openid: openid,
				linecount:15,
				currpage:currpage
			}
			$http.post(ajaxUrl, data).then(function successCallback(response) {
				deferred.resolve(response.data);
			}, function errorCallback(response) {
				hideLoading();
				showAlert('网络不给力哦！');
			})
			return deferred.promise;
		},
		CompanytCardMode: function (custid) { //获取绑卡方式
			var deferred = $q.defer();
			var data = {
				method: 'companytcardmode',
				openid: openid,
				custid:custid
			}
			$http.post(ajaxUrl, data).then(function successCallback(response) {
				deferred.resolve(response.data);
			}, function errorCallback(response) {
				hideLoading();
				showAlert('网络不给力哦！');
			})
			return deferred.promise;
		},
		bindingWarmCardBynum: function (cardnum,custid,companyname,alias,username,phonenum,code) { //绑卡：卡号+姓名+手机号验证码 
			var deferred = $q.defer();
			var data = {
				method:'bindingwarmcard',
				openid:openid,
				custid:custid,
				cardnum:cardnum,
				companyname:companyname,
				alias:alias,
				username:username,
				phonenum:phonenum,
				smsverifycode:code
			}
			$http.post(ajaxUrl, data).then(function successCallback(response) {
				deferred.resolve(response.data);
			}, function errorCallback(response) {
				hideLoading();
				showAlert('网络不给力哦！');
			})
			return deferred.promise;
		},
		SendSMSverifyCode: function (tel) { //义马热力绑卡获取手机验证码
			var deferred = $q.defer();
			var data = {
				method: 'sendsmsverifycode',
				openid: openid,
				tel:tel
			}
			$http.post(ajaxUrl, data).then(function successCallback(response) {
				deferred.resolve(response.data);
			}, function errorCallback(response) {
				hideLoading();
				showAlert('网络不给力哦！');
			})
			return deferred.promise;
		},
		FindIDcard: function (IDCard,Company) { //身份证查询
			var deferred = $q.defer();
			var data = {
				IDCard: IDCard,
				Company:Company
			}
			$http.post(heatUrl+'?m=QueryCard', data).then(function successCallback(response) {
				deferred.resolve(response.data);
			}, function errorCallback(response) {
				hideLoading();
				showAlert('网络不给力哦！');
			})
			return deferred.promise;
		},
		bindingwarmcardByid: function (roomid,cardnum,companyname,custid,username) { //身份证绑卡
			var deferred = $q.defer();
			var data = {
				method: 'bindingwarmcard',
				openid: openid,
				roomid:roomid,
				cardnum:cardnum,
				companyname:companyname,
				custid:custid,
				username:username
			}
			$http.post(ajaxUrl, data).then(function successCallback(response) {
				deferred.resolve(response.data);
			}, function errorCallback(response) {
				hideLoading();
				showAlert('网络不给力哦！');
			})
			return deferred.promise;
		},
		getBushuListArea: function (companyname) { //小区绑卡获取类型
			var deferred = $q.defer();
			$http.post(heatUrl+'?m=getbushulist&company='+companyname).then(function successCallback(response) {
				deferred.resolve(response.data);
			}, function errorCallback(response) {
				hideLoading();
				showAlert('网络不给力哦！');
			})
			return deferred.promise;
		},
		CheckArea: function (companyname,bushulevelname,name) { //小区查询
			var deferred = $q.defer();
			$http.post(heatUrl+'?m=getbushulevel&company='+companyname+'&bushulevelname='+bushulevelname+'&Name='+name).then(function successCallback(response) {
				deferred.resolve(response.data);
			}, function errorCallback(response) {
				hideLoading();
				showAlert('网络不给力哦！');
			})
			return deferred.promise;
		}
	}
})