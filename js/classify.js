var controls = document.getElementById("segmentedControls");
var contents = document.getElementById("segmentedControlContents");
var html = [];
var Request = new Object();
Request = GetRequest();
var bigleiId = Request["param"];

function GetRequest() {

	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
		}
	}
	return theRequest;
};
var url = "http://192.168.43.188:8080/productCategory/list/" + bigleiId;
var nlist = [];
mui.ajax(url, {
	dataType: 'json', //服务器返回json格式数据
	type: 'get', //HTTP请求类型
	timeout: 10000, //超时时间设置为10秒；
	success: function(data) {
		var mypub = data.data.list;

		for (var i = 0; i < mypub.length; i++) {
			var contentOut = [];
			// 			console.log(contentOut.length);
			var eid = mypub[i].id;
			var storage = window.localStorage;
			if (storage.user != undefined) {
				var url = "http://192.168.43.188:8080/product/select/productBySmallLeiUser/" + mypub[i].id+"/"+storage.user;

			} else {
				var url = "http://192.168.43.188:8080/product/select/productBySmallLei/" + mypub[i].id;
			}
			var wareListOut = [];
			mui.ajax(url, {
				dataType: 'json', //服务器返回json格式数据
				type: 'get', //HTTP请求类型
				async: false,
				timeout: 10000, //超时时间设置为10秒；
				success: function(data) {
					// console.log(mypub[i].id);
					var contentIn = []
					if (data.data.length == 0) {
						var contentArr = {
							"image": "/null.jpg",
							"name": "该分类下还没有宝贝",
							"id": "0"
						}
						contentIn.push(contentArr);
						contentOut = contentIn;
					} else {
						for (var j = 0; j < data.data.length; j++) {
							var contentArr = {

								"image": data.data[j].productSrcOne,
								"name": data.data[j].productName,
								"id": data.data[j].productId
							}
							contentIn.push(contentArr);
						}
						contentOut = contentIn;
					}
					// 								var list = {
					// 						"listId": mypub[i].id,
					// 						"list": mypub[i].name,
					// 						"content":contentIn
					// 					};
					// 					nlist.push(list);
				},
				error: function(xhr, type, errorThrown) {
					console.log(type);
				}
			});
			var list = {
				"listId": mypub[i].id,
				"list": mypub[i].name,
				"content": contentOut
			};
			nlist.push(list);
			// 			console.log(nlist[3].listId);
			// 			console.log(nlist[3].content.length);
		};
		for (var i = 0; i < nlist.length; i++) {
			html.push('<a class="mui-control-item" href="#content' + nlist[i].listId + '">' + nlist[i].list + '</a>');
		}
		controls.innerHTML = html.join('');
		var htmlContent = '';
		for (i = 0; i < nlist.length; i++) {
			htmlContent += '<div id="content' + nlist[i].listId + '" class="mui-control-content"><ul class="mui-table-view">';
			// 			htmlContent +=
			// 				'<li class="mui-table-view-cell"><div class="title-show">宝贝<div class="lookAll"></div></div><ul class="ul-show">'
			for (j = 0; j < nlist[i].content.length; j++) {
				if (nlist[i].content[j].id == 0) {
					htmlContent +=
						'<li class="mui-table-view-cell"><div class="title-show">嗨转平台宝贝<div class="lookAll"></div></div><ul class="ul-show">'

					htmlContent +=
						'<a class="recom-list" href="#" style="float: left;"><li class="li-show"><div class="wareImg"><img src="http://192.168.43.188:8088/image' +
						nlist[i].content[j].image +
						'" /></div><div class="wareName">' + nlist[i].content[j].name + '</div></li></a>'
				} else {
					htmlContent +=
						'<li class="mui-table-view-cell"><div class="title-show">嗨转平台宝贝<div class="lookAll"></div></div><ul class="ul-show">'
					htmlContent += '<a class="recom-list" href="../page/news.html?param=' + nlist[i].content[j].id +
						'" style="float: left;"><li class="li-show"><div class="wareImg"><img src="http://192.168.43.188:8088/image' +
						nlist[i].content[j].image +
						'" /></div><div class="wareName">' + nlist[i].content[j].name + '</div></li></a>'
				}
				// htmlContent+= '<li class="mui-table-view-cell"><div class="title-show">宝贝<div class="lookAll"></div></div><ul class="ul-show">'
				// 								htmlContent += '<a class="recom-list" href="../page/news.html?param='+ nlist[i].content[j].id +'" style="float: right;"><li class="li-show"><div class="wareImg"><img src="http://192.168.43.188:8088/image' + nlist[i].content[j].image +
				// 									'" /></div><div class="wareName">' + nlist[i].content[j].name + '</div></li></a>'
				// 				htmlContent +=
				// 					'<a id="productOne" class="recom-list" href="#" style="float: right;"><li class="li-show"><div class="wareImg"><img src="http://192.168.43.188:8088/image' +
				// 					nlist[i].content[j].image +
				// 					'" /></div><div class="wareName">' + nlist[i].content[j].name + '</div></li></a>'
				htmlContent += '</ul></li>'
			}
			htmlContent += '</ul></div>';
		}
		contents.innerHTML = htmlContent;

		//默认选中第一个
		controls.querySelector('.mui-control-item').classList.add('mui-active');
		contents.querySelector('.mui-control-content').classList.add('mui-active');
		// 
		// 		$("body").on("tap", ".li-show", function() {
		// 			mui.openWindow({
		// 				url: '../shopdetail/shopdetail.html', //需要打开页面的url地址 
		// 				id: 'shopdetail.html', //需要打开页面的url页面id
		// 				styles: {
		// 					top: '0px', //新页面顶部位置 
		// 					bottom: '0px', //新页面底部位置 
		// 				},
		// 				extras: {
		// 					name: 'aries',
		// 					age: '18',
		// 					//					../../image../../image.//自定义扩展参数，可以用来处理页面间传值 
		// 				},
		// 				show: { //控制打开页面的类型
		// 					autoShow: true,
		// 					//					//页面loaded事件发生后自动显示，默认为true 
		// 					aniShow: 'zoom-fade-out', //页面显示动画，默认为”slide-in-right“；  页面出现的方式 左右上下
		// 					duration: '500' //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒； 
		// 				},
		// 				waiting: { // 控制 弹出转圈框的信息
		// 					autoShow: true, //自动显示等待框，默认为true 
		// 					title: '', //等待对话框上显示的提示内容 
		// 					options: {
		// 						width: '50px', //等待框背景区域宽度，默认根据内容自动计算合适宽度 
		// 						height: '50px', //等待框背景区域高度，默认根据内容自动计算合适高度 ../../image../../image../../image 
		// 					}
		// 				}
		// 			});
		// 		})

		//隐藏当前页面
		function plusReady() {
			// 获取应用首页窗口对象
			var ws = plus.webview.currentWebview();
			var h = plus.webview.getWebviewById(plus.runtime.appid);
			mui.fire(h, 'shopping');
		}
		//点击购物车按钮进入购物车页面
		$("body").on("touchstart", "#shopCart", function() {
			if (window.plus) {
				plusReady();
			} else {
				document.addEventListener('plusready', plusReady, false);
			}
		})

	},
	error: function(xhr, type, errorThrown) {
		console.log(type);
	}
});
