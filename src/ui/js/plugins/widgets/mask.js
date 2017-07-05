zWidgets.mask = {
	id:undefined,                    //指定对象遮罩(jQuery对象)
	zindex:zWidgets.getNextZindex(),      //遮罩z-index值
	loadText:undefined,				  // 遮罩图片是否显示
	opacity:"",                           //遮罩清晰度值
	maskDom : "<div class='uiFrame-window-mask'></div>",
	skin:undefined,
	render:function(){
		var that = $(this.maskDom);
		var _target = $("#"+this.id);       //获取添加模型的target属性
		//如果有被遮罩对象，则遮罩到该对象上面
		if (this.id && this.id != "body") {
			if ($(_target).children(".uiFrame-window-mask").length === 0) {
				$(_target).addClass("uiframe-mask-relative");
				that.appendTo($(_target));
				$(_target).on("resize",function(){
					that.css("width",$(this).width());
					that.css("height",$(this).height());
				});

			}
		} else {
			that.appendTo($("#body"));
		}
		var top = $(_target).height() / 2 - 20;
		var left = $(_target).width() / 2 - 80;
		var _loadText = this.loadText;
		var _skin = this.skin;
		if (_loadText && _loadText != "") {
			var _zindex = parseInt(this.zindex)+1;
			if(_skin && _skin==2){
				var maskbody=$("<div class='uiframe-loadmask-nmsg' style='position:absolute;top:48%;left:"+left+"px;z-index:"+_zindex+"'><div style='margin-left:25px;'>"+_loadText+"</div></div>");
			}else{
				var maskbody=$("<div class='uiframe-loadmask-msg' style='position:absolute;top:48%;left:"+left+"px;z-index:"+_zindex+"'><div style='margin-left:25px;'>"+_loadText+"</div></div>");
			}
			that.after(maskbody);
		}
	},
	adjustHeight:function (_target) {
		var h;
		var that = $(this.maskDom);
		if (_target) {
			that.css("left", "0");
			that.css("top", "0");
			that.css("width", $(_target).width());
			that.css("height", $(_target).height());
		} else {
			h = $(window).height() + $(window).scrollTop();
			that.height(h);
		}
	},
	setZindex:function(){
		var that = $(this.maskDom);
		var _zindex = this.zindex;       //获取添加模型的zindex属性
		var _opacity = this.opacity;     //获取添加模型的opacity属性
		//如果指定了zindex则使用指定的zindex
		if (_zindex) {
			that.css("z-index", _zindex);
		}
		if(_opacity && _opacity !== ""){
			that.css("opacity",_opacity);
		}
	},
	setEvents:function(){
		var that = this;
		var _target = $("#"+this.id);
		$(window).on('resize', function () {that.adjustHeight(_target); });
		$(window).on('scroll', function () {that.adjustHeight(_target); });
	},
	show:function(config){
		this.id = config.id || "body";
		this.zindex = config.zindex || zWidgets.getNextZindex();
		this.loadText = config.loadText;
		this.skin = config.skin;
		this.opacity = config.opacity;
		this.render();          //视图渲染方法
		this.adjustHeight($("#"+this.id));  //赋值遮罩的宽度和高度
		this.setZindex();                               //设置视图的z-index值
		this.setEvents();                               //设置视图的z-index值
	},
	hide:function(config){
		var myId = config.id || "body";
		$("#"+myId).children(".uiframe-loadmask-msg").remove();
		$("#"+myId).children(".uiframe-loadmask-nmsg").remove();
		$("#"+myId).children(".uiFrame-window-mask").remove();
		$("#"+myId).removeClass("uiframe-mask-relative");
	}
};