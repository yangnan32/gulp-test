// 清空表单水印文字的方法
zWidgets.clearEmptyText = function(formId){
	$("#"+formId).find("input, textarea").each(function() {
		var $that = $(this);
		if($that.hasClass("uiframe-emptyTextColor")) {
			$that.val("").removeClass("uiframe-emptyTextColor");
		}
	});
};
// 判断当前浏览器是否支持HTML5-webSocket
zWidgets.html5 = function(){
	// 判断浏览器是否支持HTML5
	if(!window.WebSocket){
		layer.open({
			type: 1,
			skin: 'layui-layer-demo', //样式类名
			closeBtn: 0, //不显示关闭按钮
			shift: 2,
			shadeClose: true, //开启遮罩关闭
			content: '<div style="padding:20px;text-align:center">请使用支持HTML5的浏览器访问<br />(IE10+，FireFox，Chrome)</div>'
		});
		return false;
	}
};
// 需要显示水印文字的表单重置方法
zWidgets.resetForm = function(formId){
	$("#"+formId).find("input, textarea").each(function() {
		if (!$(this).hasClass("uiframe-module-btn")) {
			var $that = $(this);
			if($that.attr("emptyText") && $that.attr("emptyText") !== "") {
				$that.val($(this).attr("emptyText"));
				$that.addClass("uiframe-emptyTextColor")
			} else {
				$that.val("");
			}
		}
	});
};
//手动加入错误信息 传入id值
zWidgets.addError = function(el, errorText){
	var $el = $("#"+el);
	$el.addClass("error");
	if ($el.next("label.error")) {
		$el.next("label.error").remove();
	}
	var label=$('<label for="n" generated="true" class="error">'+errorText+'</label>');
	label.insertAfter($el);
};
//手动删除错误信息 传入id值
zWidgets.removeError = function(el){
	var $el = $("#"+el);
	$el.removeClass("error");
	$el.next("label").remove();
};
//手动加入错误信息 传入jquery对象
zWidgets.addErrorObj = function(el, errorText){
	var $el = $(el);
	$el.addClass("error");
	if ($el.next("label.error")) {
		$el.next("label.error").remove();
	}
	var label=$('<label for="n" generated="true" class="error">'+errorText+'</label>');
	label.insertAfter($el);
};
//手动删除错误信息 传入jquery对象
zWidgets.removeErrorObj = function(el){
	var $el = $(el);
	$el.removeClass("error");
	$el.next("label").remove();
};

$(function(){
	$(zWidgets._document).on("click.star", ".widgetStar b", function(){
		var $parent = $(this).parent(".widget-star");
		$(this).addClass("starOn").prevAll("b").addClass("starOn").end().nextAll("b").removeClass("starOn");
		$parent.find(".starShowText").empty().html('<span class="starVal" val="'+$(this).attr("val")+'">'+$(this).attr("text")+'</span>'+$parent.data("suffix"));
		$parent.find("input").val($(this).attr("val"));
	}).on("mouseenter.star", ".widgetStar b", function(){
		$(this).addClass("starHover").prevAll("b").addClass("starHover").end().nextAll("b").removeClass("starHover");
	}).on("mouseleave.star", ".widgetStar b", function(){
		$(this).parent(".widget-star").find("b").removeClass("starHover");
	}).on("mouseover.tooltip", ".tooltip", function (e) {
		var $that = $(this);
		$("#tooltip").remove();   //移除
		zWidgets.tooltip.tooltipTitle = this.title || $that.attr("myTitle");
		if($that.attr("myTitle") && $that.attr("myTitle").length > 200) {
			zWidgets.tooltip.tooltipTitle = $that.attr("myTitle").substring(0, 199) + "...";    // 限制划过提示框显示文字为200
		}
		$that.attr("myTitle", zWidgets.tooltip.tooltipTitle);
		$that.removeAttr("title");
		if (zWidgets.tooltip.tooltipTitle=="") return;
		var tooltip = "<div id='tooltip'>" + zWidgets.tooltip.htmlMeaning(zWidgets.tooltip.tooltipTitle) + "</div>"; //创建 div 元素
		$("#body").append(tooltip);	//把它追加到文档中
		if ($("#tooltip").width() >= 300) {
			$("#tooltip").css("width","300px");
		}
		$("#tooltip").hide();
		$("#tooltip")
			.css({
				"top": ((e.pageY+$("#tooltip").height()+50)>$(window).height()? e.pageY -$("#tooltip").height()- zWidgets.tooltip.tooltip_y:e.pageY+zWidgets.tooltip.tooltip_y) + "px",
				"left": ((e.pageX+$("#tooltip").width()+50)>$(window).width()? e.pageX -$("#tooltip").width()- 2 * zWidgets.tooltip.tooltip_x:e.pageX+zWidgets.tooltip.tooltip_x) + "px"
			});	  //设置x坐标和y坐标，并且显示
		$("#tooltip").show();
	}).on("mouseout.tooltip", ".tooltip", function () {
		if($(this).attr("myTitle") === ""){
			$(this).attr("myTitle", zWidgets.tooltip.tooltipTitle);
		}
		$("#tooltip").remove();   //移除
	}).on("mousemove.tooltip", ".tooltip", function (e) {
		var toolTipWidth=$("#tooltip").width();
		if(toolTipWidth>300)toolTipWidth=300;
		var $toolTip=$("#tooltip");
		$toolTip.hide();
		$toolTip.css({
			"top": ((e.pageY+$("#tooltip").height()+50)>$(window).height()? e.pageY -$("#tooltip").height()- zWidgets.tooltip.tooltip_y:e.pageY+zWidgets.tooltip.tooltip_y) + "px",
			"left": ((e.pageX+toolTipWidth+50)>$(window).width()? e.pageX - toolTipWidth - 2 * zWidgets.tooltip.tooltip_x:e.pageX+zWidgets.tooltip.tooltip_x) + "px"
		});
		$toolTip.show();
	}).on("click.tooltip", ".tooltip", function (e) {
		if($(this).attr("myTitle") === ""){
			$(this).attr("myTitle", zWidgets.tooltip.tooltipTitle);
		}
		$("#tooltip").remove();
	});
});
