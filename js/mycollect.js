var storage = window.localStorage;
var userId = '';
if (storage.user != undefined) {
	userId = storage.user;
} else {
	// 			var toUrl4 = "login.html";
	// 			$('#pub').attr('href', toUrl4);
	// 			$('#mypub').attr('href', toUrl4);
	// 			$('#myorder').attr('href', toUrl4);
	// 			$('#myshoucang').attr('href', toUrl4);
}
var html = '';
var imaurl = 'http://192.168.43.188:8088/image/20190513/73e40b62f2b24b1e8ce5f8a9f3e69bf8.jpeg'
var url = "http://192.168.43.188:8080/order/getCollectDetailList/" + userId;
mui.ajax(url, {
	dataType: 'json', //服务器返回json格式数据
	type: 'get', //HTTP请求类型
	timeout: 10000, //超时时间设置为10秒；
	success: function(data) {
		var mypub = data.data.list;
		if (mypub.length != 0) {
			for (var i = 0; i < mypub.length; i++) {
				html +=
					'<div  class="shoppingCart"><div class="layer"></div><ul class="ulList">'
				html += '<li class="liList mui-table-view-cell">'
				html += '<div class="yuan"><i class="iconfont icon-yuan itemSel"></i></div>'
				html += '<div class="shopName"><img src="http://192.168.43.188:8088/image' + mypub[i].productSrcOne +
					'" /></div>'
				html += '<div class="shopContent">'
				html += '<p class="shopTitle">' + mypub[i].productName + '</p>'
				html += '<p class="colorCenter">' + mypub[i].productBigCategoryId + '     ' + mypub[i].productSmallCategoryId +
					'</p>'
				// html += '<div class="bottomNum">'
				html += '<div class="priceLeft"><span>￥' + mypub[i].productPrice + '</span></div>'
				html +=
					'<div class="shopContent">' + mypub[i].productText + '</div>'
				// html += '</div>'
				html += '<button style="margin-left:150px;" onclick="removeCollect(' + mypub[i].productId + ')">取消收藏</button>'
				html += '<button style="margin-left:150px;color: #fff;background: #f22f4a;" onclick="WantBuy(' + mypub[i].collectProductId +
					',' + mypub[i].productPrice +
					')" id="goumai">我要买</button>'
				html += '</div>'
				html += '</li>'
				html += '</ul></div>'
			}
			$('.mui-scroll').html(html)
		} else {
			html +=
				'<div class="emptyBox"><div class="emptyImg"><img src="../images/sudoku_12.jpg" /></div><div class="emptyWord">亲，目前还没有收藏的宝贝哦...</div><a style="color: #000000;" href="../index.html"><div class="emptyBtn">挑选宝贝</div></a></div>'
		}

		$('#shoppingList').html(html)
	},
	error: function(xhr, type, errorThrown) {
		console.log("error");
		console.log(type);
	}
});

function removeCollect(value) {
	console.log(value);
	console.log(userId);
	var btnArray = ['否', '是'];
	mui.confirm('是否取消收藏此闲置宝贝？', '', btnArray, function(e) {
		if (e.index == 1) {
			var requDataCollect = {
				collectProductId: value,
				collectUserId: userId
			}
			console.log(requDataCollect.collectProductId);
			console.log(requDataCollect.collectUserId);
			var urlDelete = "http://192.168.43.188:8080/order/deleteCollect";
			mui.ajax(urlDelete, {
				data: requDataCollect,
				dataType: 'json', //服务器返回json格式数据
				type: 'post', //HTTP请求类型
				async: false,
				contentType: 'application/json;charset=UTF-8',
				timeout: 10000, //超时时间设置为10秒；
				success: function(data) {
					console.log("success")
			mui.alert('已取消此物品收藏', '嗨转小Tip', function() {
				location.reload();
			});
				},
				error: function(xhr, type, errorThrown) {
					console.log(type);
				}
			});
		} else {
			mui.toast('宝贝仍在收藏当中');
		}
	})

}
mui.init();
mui.init({
	pullRefresh: {
		container: '#shoppingList',
		down: {
			callback: pulldownRefresh,
			contentdown: '',
			contentover: '',
			contentrefresh: '',
			style: ''
		},
		up: {
			callback: pullupRefresh,
			contentup: '',
			contentover: '',
			contentrefresh: '',
			style: ''
		}
	}
});

function pulldownRefresh() {
	mui('#shoppingList').pullRefresh().endPulldownToRefresh(); //refresh completed
}

function pullupRefresh() {
	mui('#shoppingList').pullRefresh().endPullupToRefresh(); //refresh completed
}

function WantBuy(value, price) {
	var btnArray = ['否', '是'];
	mui.confirm('确认花费  ￥' + price + '  购买此宝贝？', '', btnArray, function(e) {
		if (e.index == 1) {

			console.log(value);
			console.log(userId);
			var requData = {
				productId: value,
				userId: userId
			};
			var url = "http://192.168.43.188:8080/order/insertOrder";
			mui.ajax(url, {
				data: requData,
				dataType: 'json', //服务器返回json格式数据
				type: 'post', //HTTP请求类型
				async: false,
				contentType: 'application/json;charset=UTF-8',
				timeout: 10000, //超时时间设置为10秒；
				success: function(data) {
					console.log("success")
					console.log(data.data);
				},
				error: function(xhr, type, errorThrown) {
					console.log(type);
				}
			});
			var requDataCollect = {
				collectProductId: value,
				collectUserId: userId
			}
			var urlDelete = "http://192.168.43.188:8080/order/deleteCollect";
			mui.ajax(urlDelete, {
				data: requDataCollect,
				dataType: 'json', //服务器返回json格式数据
				type: 'post', //HTTP请求类型
				async: false,
				contentType: 'application/json;charset=UTF-8',
				timeout: 10000, //超时时间设置为10秒；
				success: function(data) {
					console.log("success")
					console.log(data.data);
					mui.toast('订单创建成功');
				},
				error: function(xhr, type, errorThrown) {
					console.log(type);
				}
			});
		} else {
			mui.toast('已取消购买');
		}
	})
}
var delColor = false
var selectedNum = 0
var html = '';
// var obj = [{
// 		'shopType': '海外直购',
// 		'shopList': [{
// 				"shopImg": "../../image/images/gouwuche/gouwuche-shopImg_03.jpg",
// 				"shopTitle": "APM Monaco FESTIVALL系列 银镶晶钻繁星戒指 A18075OX",
// 				"shopColor": "",
// 				"shopPrice": "7,908"
// 			},
// 			{
// 				"shopImg": "../../image/images/gouwuche/gouwuche-shop1img.jpg",
// 				"shopTitle": "Gucci Sylvie动物造型铆钉手提包 意大利制造",
// 				"shopColor": "颜色：1060 NERO",
// 				"shopPrice": "36,420"
// 			}
// 		]
// 	},
// 	{
// 		'shopType': '自营海外仓',
// 		'shopList': [{
// 				"shopImg": "../../image/images/gouwuche/gouwuche-shopimg.jpg",
// 				"shopTitle": "VERSACE  黑色与金色 不锈钢蓝 宝石牛皮 DV-25圆形腕表",
// 				"shopColor": "颜色：PNUL",
// 				"shopPrice": "500.00"
// 			},
// 			{
// 				"shopImg": "../../image/images/gouwuche/gouwuche-shop1img.jpg",
// 				"shopTitle": "Gucci Sylvie动物造型铆钉手提包 意大利制造",
// 				"shopColor": "颜色：1060 NERO",
// 				"shopPrice": "36,420"
// 			}
// 		]
// 	}
// 
// ]
// for (var i = 0; i < obj.length; i++) {
// 	html +=
// 		'<div  class="shoppingCart"><div class="layer"></div><div class="itemName"><i class="iconfont icon-yuan itemsSel"></i><em class="mui-icon mui-icon-home home"></em><span>' +
// 		obj[i].shopType + '</span></div><ul class="ulList">'
// 	for (var j = 0; j < obj[i].shopList.length; j++) {
// 		html += '<li class="liList mui-table-view-cell">'
// 		html += '<div class="yuan"><i class="iconfont icon-yuan itemSel"></i></div>'
// 		html += '<div class="shopName"><img src="' + obj[i].shopList[j].shopImg + '" /></div>'
// 		html += '<div class="shopContent">'
// 		html += '<p class="shopTitle">' + obj[i].shopList[j].shopTitle + '</p>'
// 		html += '<p class="colorCenter">' + obj[i].shopList[j].shopColor + '</p>'
// 		html += '<div class="bottomNum">'
// 		html += '<div class="priceLeft"><span>￥' + obj[i].shopList[j].shopPrice + '</span></div>'
// 		html +=
// 			'<div class="numRight"><span class="reduce">－</span><input type="text" value="1" class="num" /><span class="add">＋</span></div>'
// 		html += '</div>'
// 		html += '</div>'
// 		html += '</li>'
// 	}
// 	html += '</ul></div>'
// }
// $('.mui-scroll').html(html)
$("body").on("touchstart", ".add", function() {
	var addNum = $(this).prev().val()
	addNum++ //商品数量增加
	$(this).prev().val(addNum)
	price()
	totalPrice()
})
$("body").on("touchstart", ".reduce", function() {
	var jNum = $(this).next().val()
	jNum-- //商品数量减少
	if (jNum < 1) {
		jNum = 1
		return false
	}
	$(this).next().val(jNum)
	price()
	totalPrice()
})
$("body").on("change", ".num", function() {
	price()
	totalPrice()
})
//总计
function price() {
	var totalPrice = 0 //商品总额
	var $sonCheckBox = $('.itemSel');
	$sonCheckBox.each(function() {
		if ($(this).is('.icon-duigou1')) {
			var $mul = $(this).parent().parent()
			var s = $mul.find(".priceLeft span").text()
			s = s.replace(/,/g, '');
			s = s.replace(/￥/g, '');
			console.log(s)
			totalPrice += Number(s) * Number($mul.find(".num").val())
		}
	})
	if (totalPrice > 0) {
		$('#checkOut').addClass('bottomBtnColor')
	} else {
		$('#checkOut').removeClass('bottomBtnColor')
	}
	$(".shopTotal").html(totalPrice + '.00')
}

//删除功能
function del() {
	//商品总额
	var $sonCheckBox = $('.itemSel');
	var $parCheckBox = $(".shoppingCart")
	var emtyHtml = ''
	$sonCheckBox.each(function() {
		if ($(this).is('.icon-duigou1')) {
			var $mul = $(this).parent().parent()
			$mul.remove()
		}
	})
	$parCheckBox.each(function() {

		if ($(this).find('.liList').length == 0) {
			$(this).remove()
		}

	})
	if ($('.liList').length == 0) {
		$('.selectAll').hide()
		emtyHtml += '<div class="emptyBox" style="display: block;">'
		emtyHtml += '<div class="emptyImg">'
		emtyHtml += '<img src="../../image/images/gouwuche-nostate_03.jpg" />'
		emtyHtml += '</div>'
		emtyHtml += '<div class="emptyWord">富豪的购物车从不会空的...</div>'
		emtyHtml += '<div class="emptyBtn">去购物</div>'
		$('#shoppingList').html(emtyHtml)
		$('#shoppingList').addClass('emptyMan')
		$(".bottomBar").css("display", "none")
		$(".btnEdit").css("display", "none")
	}
	sel()
	price()
	totalPrice()
}

function sel() {
	delColor = false
	var $sonCheckBox = $('.itemSel');
	selectedNum = $("li").find('.icon-duigou1').length
	$('.selected').text(selectedNum)
	$sonCheckBox.each(function() {
		if ($(this).is('.icon-duigou1')) {
			delColor = true
		}
	})
	return delColor
}


$("body").on("touchstart", "#delBtn", function() {
	del()
})
//编辑、删除按钮切换
$("body").on("touchstart", ".btnEdit", function() {
	if ($(this).text() == "编辑") {
		$('.bottomRightDel').show()
		$('.bottomRight').hide()
		$(".btnEdit").text("完成")
	} else {
		$('.bottomRightDel').hide()
		$('.bottomRight').show()
		$(this).text("编辑")
	}
})
//单选选功能

$("body").on("touchstart", ".itemSel", function() {
	if (!$(this).hasClass('icon-duigou1')) {
		$(this).addClass('icon-duigou1')
	} else {
		$(this).removeClass('icon-duigou1')
		$(this).addClass('icon-yuan')
	}
	var shopL = $(this).parent().parent().parent().find('li')
	if (shopL.length == $(this).parent().parent().parent().find('li').find('.icon-duigou1').length) {
		shopL.parent().prev().find('.itemsSel').addClass('icon-duigou1')
	} else {
		shopL.parent().prev().find('.itemsSel').removeClass('icon-duigou1')
	}
	var shopAll = $('.liList').length
	if (shopAll == $('li').find('.icon-duigou1').length) {
		$('#selAll').addClass('icon-duigou1')
	} else {
		$('#selAll').removeClass('icon-duigou1')
	}
	sel()
	if (delColor == true) {
		$('#delBtn').addClass('delColor')
	} else {
		$('#delBtn').removeClass('delColor')
	}

	price()
	totalPrice()
})
//单个项目全选功能
$("body").on("touchstart", ".itemsSel", function() {
	if (!$(this).hasClass('icon-duigou1')) {
		for (var i = 0; i < $(this).parent().parent().find('.itemSel').length; i++) {
			$(this).parent().parent().find('.itemSel').eq(i).removeClass('icon-yuan')
			$(this).parent().parent().find('.itemSel').eq(i).addClass('icon-duigou1')
			$(this).addClass('icon-duigou1')
		}
	} else {
		for (var i = 0; i < $(this).parent().parent().find('.itemSel').length; i++) {
			$(this).parent().parent().find('.itemSel').eq(i).addClass('icon-yuan')
			$(this).parent().parent().find('.itemSel').eq(i).removeClass('icon-duigou1')
			$(this).removeClass('icon-duigou1')
			$(this).addClass('icon-yuan')
		}
	}
	var shopAll = $('.liList').length
	if (shopAll == $('li').find('.icon-duigou1').length) {
		$('#selAll').addClass('icon-duigou1')
	} else {
		$('#selAll').removeClass('icon-duigou1')
	}
	sel()
	if (delColor == true) {
		$('#delBtn').addClass('delColor')
	} else {
		$('#delBtn').removeClass('delColor')
	}

	price()
	totalPrice()
})
//全选按钮功能
$("body").on("touchstart", "#selAll", function() {
	if (!$(this).hasClass('icon-duigou1')) {
		for (var i = 0; i < $('.itemSel').length; i++) {
			$('.itemSel').removeClass('icon-yuan')
			$('.itemSel').eq(i).addClass('icon-duigou1')
			$('.itemsSel').removeClass('icon-yuan')
			$('.itemsSel').eq(i).addClass('icon-duigou1')
			$(this).addClass('icon-duigou1')
		}
	} else {
		for (var i = 0; i < $('.itemSel').length; i++) {
			$('.itemSel').eq(i).addClass('icon-yuan')
			$('.itemSel').eq(i).removeClass('icon-duigou1')
			$('.itemsSel').eq(i).addClass('icon-yuan')
			$('.itemsSel').eq(i).removeClass('icon-duigou1')
			$(this).removeClass('icon-duigou1')
			$(this).addClass('icon-yuan')
		}
	}
	sel()
	if (delColor == true) {
		$('#delBtn').addClass('delColor')
	} else {
		$('#delBtn').removeClass('delColor')
	}
	price();
	totalPrice()
})
//合计
function totalPrice() {
	var totalPrice = 0
	totalPrice = parseInt($(".shopTotal").text()) - parseInt($(".taxation").text())
	$("#totalNum").html(totalPrice + '.00')
}

function plusReady() {
	// 获取应用首页窗口对象
	var ws = plus.webview.currentWebview();
	plus.webview.hide(ws);
	var h = plus.webview.getWebviewById(plus.runtime.appid);
	mui.fire(h, 'refreshList'); //触发pageOne页面的显示，购物车页面的隐藏
	var ws2 = plus.webview.getWebviewById('pageOneIndex.html')
	console.log(ws.getURL())
	mui.fire(ws2, 'index') //触发首页的pageOneIndex页面的事件
}
// 		$('body').on('touchstart', ".emptyBtn", function() {
// 			if (window.plus) {
// 				plusReady();
// 			} else {
// 				document.addEventListener('plusready', plusReady, false);
// 			}
// 			/*var ws=plus.webview.currentWebview();
// 			plus.webview.hide(ws);
// 			var list = plus.webview.getWebviewById( plus.runtime.appid );
// 			alert(JSON.stringify(plus.runtime.appid))
// 			plus.webview.show(list);*/
// 
// 		})
