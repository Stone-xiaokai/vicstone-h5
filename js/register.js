function getAccountFocus() {
	document.getElementById('icon-wode1').style.color = '#e22425';
}

function getAccountBlur() {
	document.getElementById('icon-wode1').style.color = '#aaa';
}

function getPasswordFocus() {
	document.getElementById('icon-password').style.color = '#e22425';
}

function getPasswordBlur() {
	document.getElementById('icon-password').style.color = '#aaa';
}

(function($, doc) {

	document.getElementById("loginValue").addEventListener('input', function() {
		console.log(this.value);
	});
	document.getElementById("passwordValue").addEventListener('input', function() {
		console.log(this.value);
	});

	document.getElementById('buttonAction').addEventListener('tap', function() {
		var check = true;
		mui("#input_example input").each(function() {
			//若当前input为空，则alert提醒 
			if (!this.value || this.value.trim() == "") {
				var label = this.previousElementSibling;
				mui.alert(label.innerText + "不允许为空");
				check = false;
				return check;
			} else {

			}
		});
		if (check == true) {
			// mui.openWindow('mail.html');
			console.log(mui("#loginValue")[0].value);

			if (mui("#passwordValue")[0].value != mui("#passwordValueTwo")[0].value) {
				mui.alert('两次输入的密码不一致', '嗨转小Tip', function() {});
			} else {
				var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if (!myreg.test(mui("#phoneValue")[0].value)) {
					mui.alert('请输入有效的手机号', '嗨转小Tip', function() {});
				} else {
					var requData = {
						username: mui("#loginValue")[0].value,
						password: mui("#passwordValue")[0].value,
						city: mui("#addressValue")[0].value,
						phone: mui("#phoneValue")[0].value
					};
					mui.ajax('http://192.168.43.188:8080/member/insertUser', {
						data: requData,
						dataType: 'json', //服务器返回json格式数据
						type: 'post', //HTTP请求类型
						contentType: 'application/json;charset=UTF-8',
						timeout: 10000, //超时时间设置为10秒；
						success: function(data) {
							console.log(data);
							if (data.code == "200") {
								mui.openWindow({
									id: 'login.html',
									url: 'login.html',
									createNew: true, //会有一直返回不回去的风险
									show: {
										aniShow: 'pop-in'
									},
									extras: { //extras里面的就是参数了
										name: data.data
									},
									waiting: {
										autoShow: true, //自动显示等待框，默认为true
									}
								});
							} else {
								mui.alert('用户名或者手机号已被注册', '嗨转小Tip', function() {

								});
							}
						},
						error: function(xhr, type, errorThrown) {

						}
					});
				}
			}

		}
	})

}(mui, document));

mui('.mui-bar-tab').on('tap', 'a', function() {
	console.log(this.getAttribute('href'));
	location.href = this.getAttribute('href');
});
