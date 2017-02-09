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
				hideLoading()
				alert('网络不给力哦！')
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
				alert('网络不给力哦！')
			})
			return deferred.promise;
		},
		bindingWarmCard1: function (custid, cardnum, username, companyname, alias, phonenum, smsverifycode) { //绑卡方式1:卡号，姓名，电话号码，验证码
			var deferred = $q.defer();
			var data = {
				method: 'bindingwarmcard',
				openid: openid,
				custid: custid,
				cardnum: cardnum,
				username: username,
				companyname: companyname,
				alias: alias,
				phonenum: phonenum,
				smsverifycode: smsverifycode
			}
			$http.post(ajaxUrl, data).then(function successCallback(response) {
				deferred.resolve(response.data);
			}, function errorCallback(response) {
				hideLoading()
				alert('网络不给力哦！')
			})
			return deferred.promise;
		},
		bindingWarmCard2: function (custid, cardnum, companyname, roomid, username) { //绑卡方式2:身份证,姓名
			var deferred = $q.defer();
			var data = {
				method: 'bindingwarmcard',
				openid: openid,
				custid: custid,
				cardnum: cardnum,
				companyname: companyname,
				roomid: roomid,
				username: username
			}
			$http.post(ajaxUrl, data).then(function successCallback(response) {
				deferred.resolve(response.data);
			}, function errorCallback(response) {
				hideLoading()
				alert('网络不给力哦！')
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
				hideLoading()
				alert('网络不给力哦！')
			})
			return deferred.promise;
		},
		getBushuList: function (companyname) { //获取部署列表
			var deferred = $q.defer();
			$http.post(heatUrl + '?m=getbushulist&company=' + companyname, data).then(function successCallback(response) {
				deferred.resolve(response.data);
			}, function errorCallback(response) {
				hideLoading()
				alert('网络不给力哦！')
			})
			return deferred.promise;
		},
		getBushuLevel: function (companyname) { //获取小区
			var deferred = $q.defer();
			$http.post(heatUrl + '?m=getbushulevel&company=' + companyname, data).then(function successCallback(response) {
				deferred.resolve(response.data);
			}, function errorCallback(response) {
				hideLoading()
				alert('网络不给力哦！')
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
				hideLoading()
				alert('网络不给力哦！')
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
				hideLoading()
				alert('网络不给力哦！')
			})
			return deferred.promise;
		}
	}
})