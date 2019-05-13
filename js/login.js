var userMem = {};

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
		mui("#input_example input").each(function() {
			//若当前input为空，则alert提醒 
			if (!this.value || this.value.trim() == "") {
				var label = this.previousElementSibling;
				mui.alert(label.innerText + "不允许为空");
				check = false;
				return false;
			} else {
				var requData = {
					username: mui("#loginValue")[0].value,
					password: mui("#passwordValue")[0].value
				};
				mui.ajax('http://192.168.43.188:8080/member/selectByNameAndPassWord', {
					data: requData,
					dataType: 'json', //服务器返回json格式数据
					type: 'post', //HTTP请求类型
					contentType: 'application/json;charset=UTF-8',
					timeout: 10000, //超时时间设置为10秒；
					success: function(data) {
						console.log(data.code);
						if (data.code = "200") {
							var storage = window.localStorage;
							storage.user=data.data.id;
							storage.username = data.data.username;
							console.log(storage.username);
							mui.openWindow({
								id: 'mine.html',
								url: 'mine.html',
								createNew:true,
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
						}
					},
					error: function(xhr, type, errorThrown) {

					}
				});
			}
		});
	})

}(mui, document));

mui('.mui-bar-tab').on('tap', 'a', function() {
	console.log(this.getAttribute('href'));
	location.href = this.getAttribute('href');
});
