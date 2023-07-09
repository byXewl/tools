/*全局广告开始*/
//=================================================================jquery.cookie Start=======================================
jQuery.cookie = function (name, value, options) {
	if (typeof value != 'undefined') { // name and value given, set cookie
		options = options || {};
		if (value === null) {
			value = '';
			options.expires = -1;
		}
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				var totalTime = 24 * 3600;
				var hour = date.getHours();
				var minutes = date.getMinutes();
				var seconds = date.getSeconds();
				var pastTime = 3600 * hour + 60 * minutes + seconds;
				var leftTime = totalTime - pastTime;
				date.setTime(date.getTime() + (options.expires * leftTime * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
		}
		// CAUTION: Needed to parenthesize options.path and options.domain
		// in the following expressions, otherwise they evaluate to undefined
		// in the packed version for some reason...
		var path = options.path ? '; path=' + (options.path) : '';
		var domain = options.domain ? '; domain=' + (options.domain) : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else { // only name given, get cookie
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};
//================================================================jquery.cookie End===========================================================================
function Load_AD() {
	//Set the popup window to center
	var COOKIE_NAME = "atoolbox.net";
	if ($.cookie(COOKIE_NAME)) {
		$(".layer").hide();
		$("#globalAd").hide();
	} else {
		var erdangjiadeH = $(window).height();
		var erdangjiadeW = $(window).width();
		$(".layer").show();
		$("#globalAd").css({ 'top': erdangjiadeH / 2 - $("#globalAd").height() / 2, 'left': erdangjiadeW / 2 - $("#globalAd").width() / 2 });
		//$("#globalAd").css({ 'top': 96, 'left': erdangjiadeW / 2 - $("#globalAd").width() / 2 });
		$("#globalAd").slideDown(300, function () {
			setTimeout("CloseGloableAd()", '300000');
		});
		$.cookie(COOKIE_NAME, "atoolbox.net", { path: '/', expires: 1 });
	}
}
//关闭全局广告方法
function CloseGlobalAd() {
	$('#globalAd').hide();
	$('.layer').hide();

}
//跳转广告方法
function RedirectUrlToActive() {
	$('#globalAd').hide();
	$('.layer').hide();
}
/*全局广告结束*/
function Bind_Download(appType) {
	if(isMobile() === true) {
		if(appType === 'ios') {
			window.open("https://itunes.apple.com/cn/app/id1599085781?mt=8");
		} else if(appType === 'wechat') {
			window.open("http://www.atoolbox.net/Article.php?Id=1751");
		}
	} else {
		if(appType === 'ios') {
			$('#a-mmredbox-cover-img').attr("src", "./Images/AppAssets/qr-ios-app-border.png");
		} else if(appType === 'wechat') {
			$('#a-mmredbox-cover-img').attr("src", "./Images/AppAssets/qr-wechat-mp-border.png");
		}
		var erdangjiadeH = $(window).height();
		var erdangjiadeW = $(window).width();
		$(".layer").show();
		$("#globalAd").css({ 'top': erdangjiadeH / 2 - $("#globalAd").height() / 2, 'left': erdangjiadeW / 2 - $("#globalAd").width() / 2 });
		$("#globalAd").slideDown(300, function () {
			setTimeout("CloseGloableAd()", '300000');
		});
	}
}
$("#wxLink").click(function(){
	if(isMobile() === true) {
		return false;
	} else {
		$('#a-mmredbox-cover-img').attr("src", "./Images/search-wechat-vertical.png");
		var erdangjiadeH = $(window).height();
		var erdangjiadeW = $(window).width();
		$(".layer").show();
		$("#globalAd").css({ 'top': erdangjiadeH / 2 - $("#globalAd").height() / 2, 'left': erdangjiadeW / 2 - $("#globalAd").width() / 2 });
		$("#globalAd").slideDown(300, function () {
			setTimeout("CloseGloableAd()", '300000');
		});
	}
});
//判断是手机端还是pc端
function isMobile() {
	if(window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
		return true; // 移动端
	} else {
		return false; // PC端
	}
}