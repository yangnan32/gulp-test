// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
/**
 * 实现拦截函数
 * @param fcn
 * @param scope
 * @returns {Function}
 */
Function.prototype.createInterceptor = function(fcn,scope){
    var method = this;
    return !jQuery.isFunction(fcn) ? this :function() {
        var me = this,
            args = arguments;
        fcn.target = me;
        fcn.method = method;
        return (fcn.apply(scope || me || window, args) !== false) ?
            method.apply(me || window, args) :
            null;
    };
};
/**
 * 扩展原生js的Function，增加orderNumber属性
 * 用于放到队列中的回调函数排序
 * @type {Number}
 */
Function.prototype.orderNumber=100;
/**
 * 定义一个执行队列
 * @type {Object}
 */
var executeQueue={
    executeArray:[],
    /**
     * 入队列
     */
    push:function(data){
        this.executeArray.push(data);
        this.executeArray.sort(function(a,b){if(a.orderNumber> b.orderNumber)return -1; else return 1;});
    },
    /**
     * 出队列
     */
    pop:function(){return this.executeArray.pop();},
    /**
     * 队列大小
     */
    size:function(){return this.executeArray.length;},
    /**
     * 循环执行队列
     */
    execute:function(){
        while( executeQueue.size()>0){
            var exec=executeQueue.pop();
            exec.call();
        }
    }
};

/**
 * 对document注册一个allReady事件
 * 此事件取出所有放到队列中的函数执行
 */
$(document).on("allReady",function(){
    executeQueue.execute();
});
//==================调试模式开关=============================
var console;
if(console==undefined){
    console=new Object();
    console.log=function(str){}
}
var loadCallBack;

// 基础js的全局变量
var zWidgets = {
    _document:$(document),
    zindex:500,
    mask:{},
    maskObj:{},
    //myPath : basePath + "js/plugins/widgets/",
    myPath : "js/plugins/widgets/",
    tooltip:{
        tooltipTitle:'',
        tooltip_x:10,
        tooltip_y:10,
        htmlMeaning : function(str, isBias){
            if(str == undefined){
                return "";
            }
            if(str.indexOf("&")!== -1){
                str=str.replace(/&+/g,"&amp;");
            }
            if(str.indexOf(" ") !== -1)
            {
                str=str.replace(/\s+/g,'&nbsp;');
            }
            if(str.indexOf(">")!== -1){
                str=str.replace(/>+/g,'&gt;');
            }
            if(str.indexOf("<")!== -1){
                str=str.replace(/<+/g,'&lt;');
            }
            if(str.indexOf("\"")!== -1){
                if(isBias === true)
                {
                    str=str.replace(/\"/g,"\\\"");
                }else
                {
                    str=str.replace(/\"/g,"\"");
                }
            }
            if(str.indexOf("\'")!== -1){
                if(isBias === true)
                {
                    str=str.replace(/\'/g,"\\\'");
                }else
                {
                    str=str.replace(/\'/g,"\'");
                }
            }
            return str;
        }
    },
    selection_zindex: 100,                 // 下拉框层常量
    browser: {
        userAgent: navigator.userAgent.toLowerCase(),
        getVersion: function () {
            return (navigator.appVersion);
        },
        isIE: function () {
            var index = this.userAgent.indexOf("msie");
            return (index > 0);
        },
        isIE6: function () {
            var index = this.userAgent.indexOf("msie 6.");
            return (index > 0);
        },
        isIE7: function () {
            var index = this.userAgent.indexOf("msie 7.");
            return (index > 0);
        },
        isIE8: function () {
            var index = this.userAgent.indexOf("msie 8.");
            return (index > 0);
        },
        isChrome: function () {
            var index = this.userAgent.indexOf("chrome/");
            return (index > 0);
        },
        isFirefox: function () {
            var index = this.userAgent.indexOf("firefox");
            return (index > 0);
        }
    },
    htmlTpl:{},          // html组件模板
    //判断变量是否为空
    isEmpty : function(v,allowBlank){
        return $.isEmptyObject(v)|| v=== null || v === undefined || (($.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
    },
    //判断是否为undefined
    isDefined : function(v){
        return typeof v !== 'undefined';
    },

    // 获取当前最大z-index+1方法
    getNextZindex:function(){
        return this.zindex++;
    },
    // 水印文字脚本
    initEmptyText : function($that){
        if ($that.val() == "" && $that.attr("emptyText") && $that.attr("emptyText") != "") {
            $that.val($that.attr("emptyText"));
            $that.addClass("uiframe-emptyTextColor");
        }
    },
    // 原对象根据新对象属性赋值
    changeObjProperty : function(oldObj, newObj){
        if (oldObj == null) {
            oldObj = {}
        }
        if (newObj && newObj !="") {
            for (var param in newObj) {
                if (newObj.hasOwnProperty(param)){
                    oldObj[param] = newObj[param];
                }
            }
        }
    },
    // 设置div自适应高度方法
    setFitHeight : function($jquery){
        var parentHeight = $jquery.parent().height();
        var siblingArray = $jquery.siblings("div");
        var siblingHeight = 0;
        var i,max;
        for (i = 0, max = siblingArray.length; i < max; i += 1) {
            if ($(siblingArray[i]).css("display") != "none" && !$(siblingArray[i]).hasClass("uiframe-noFit") && !$(siblingArray[i]).hasClass("uiFrame-window-mask")) {
                siblingHeight += $(siblingArray[i]).height();
            }
        }
        $jquery.height(parentHeight - siblingHeight);
    },
    // 初始化fit(自适应高度)方法
    initFit : function(parentDom){
        //防止重复初始化
        if (!parentDom) {
            parentDom = "body";
        }
        var $parent = $("#" + parentDom);

        //找到所有含有uiframe-fit样式的div，应用自适应高度方法
        $parent.find("div.uiframe-fit").each(function () {
            var that = $(this);
            var $parentDiv =  that.parent();
            that.width($parentDiv.width()); //设置div自适应宽度方法
            zWidgets.setFitHeight(that);
//        $parentDiv.resize(function(){
//            that.width($parentDiv.width()); //设置div自适应宽度方法
//            zWidgets.setFitHeight(that);
//        });
        });
    }
};


