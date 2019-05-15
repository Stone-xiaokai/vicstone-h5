var imgArr = new Array("img/banner1.jpg", "img/banner2.jpg", "img/banner3.jpg", "img/banner4.jpg", "img/banner5.jpg",
	"img/banner6.jpg");
var imgValue = document.getElementById('banner');
var num = 0;
var timer;
var recommendTitle = document.getElementById('recom-t');
var searchValue = document.getElementById('input');
var searchIcon = document.getElementsByClassName('search');
window.onload = function() { //初始加载
	/* document.getElementById('banner').src=imgArr[0];//加载页面时将banner赋给src
	 timer = setInterval(function () {//轮播定时
        play()
        }, 3000);*/
	// console.log(recommendTitle);
}

function play() { //轮播图
	num = num + 1; //每次加一
	//进行判断，如果num大于最后一张时,图片返回第一张
	//// 1 2 3 4
	if (num > imgArr.length - 1) {
		num = 0;
	}
	document.getElementById('banner').src = imgArr[num];
}

function searchV(value) { //获取input输入的值
	console.log(value);
	// window.location.href = "../page/SearchList.html?param="+value;
	location.href = "./page/SearchList.html?param="+encodeURI(encodeURI(value));
// 	var url = "http://192.168.43.188:8080/product/select/selectByMoHu/"+value;
// 	mui.ajax(url, { 
// 		dataType: 'json', //服务器返回json格式数据
// 		type: 'get', //HTTP请求类型
// 		timeout: 10000, //超时时间设置为10秒；
// 		success: function(data) {
// 			var productList = data.data;
// 			console.log(productList.length);
// 			var html = '';
// // 			for (var i = 0; i < productList.length; i++) {
// // 				if (i == 0 || i % 2 == 0) {
// // 					html += '<a class="recom-list" href="./page/news.html?param=' + productList[i].productId +
// // 						'" style="float: left;"><p><span id="recomT">' + productList[i].productName +
// // 						'</span><br /><span id="recom-p">￥' + productList[i].productPrice +
// // 						'</span></p><img id="img-product" src="http://192.168.43.188:8088/image' + productList[i].productSrcOne +
// // 						'" /></a>'
// // 				} else {
// // 					html += '<a class="recom-list" href="./page/news.html?param=' + productList[i].productId +
// // 						'" style="float: right;"><p><span id="recomT">' + productList[i].productName +
// // 						'</span><br /><span id="recom-p">￥' + productList[i].productPrice +
// // 						'</span></p><img id="img-product" src="http://192.168.43.188:8088/image' + productList[i].productSrcOne +
// // 						'" /></a>'
// // 				}
// // 			}
// // 			$("#productArr").html(html)
// 		},
// 		error: function(xhr, type, errorThrown) {
// 			console.log(type);
// 		}
// 	});
}

function getFocus() { //获取焦点
	searchValue.placeholder = '';
}

function loseBlur() { //失去焦点
	searchValue.placeholder = '搜索商品';
}

function searchResult() { //点击搜索按钮事件
	console.log('11111111111');
}
