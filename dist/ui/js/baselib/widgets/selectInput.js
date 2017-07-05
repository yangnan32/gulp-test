zWidgets.selectInput = function(data) {
    // 定义searchInput集合对象
    var selectInputObj = {
        id: data.id,
        changeUrl: data.url,
        tagUrl: data.tagUrl,
        key: data.key,
        dataName: data.dataName,    // 搜索数据时参数名称
        dataRoot: data.dataRoot,
        openEnter:data.openEnter || true,
        columns: data.columns,
        filterId: data.filterId,    // 定制过滤名称limitId
        vals: data.vals,            // 回显数据的key值
        valTexts: data.valTexts,    // 回显数据的value值
        maxLength: data.maxLength || 0,
        height: data.height,
        tooltipCls: data.tooltipCls,
        textAlign: data.textAlign || "left",
        useToolPage:data.useToolPage || false,
        inputId : data.id + "Input",
        btnId : data.id + "Btn",
        parentId : data.id + "Parent",
        selectDivId : data.id + "SelectDiv",
        tableDivId : data.id + "SelectTable",
        tagDivId : data.id + "TagDiv",
        prevBtnId : "prev" + data.id,
        nextBtnId : "next" + data.id,
        totalPageId : "totalpage" + data.id,
        pageId : "page" + data.id,
        toolPageRightId : "toolBarRight" + data.id,
        bbarId : "select_bbar" + data.id,
        dataNoneId : "dataNone" + data.id,
        searchName: "",                //load搜索条件
        totalPage: "",                 //显示总页数
        selectData: "",                //加载的数据
        totalCount: "",                //数据总条数
        start: 0,                       //开始条数
        limit: data.limit || "5",       //每页条数
        startPage: 1,                  //开始页数
        showY : 0                       //显示数据Y轴距离
    };

    // 初始化下拉显示列表
    selectInputObj.renderSelectDiv = function() {
        var myWidth = parseInt($("#"+selectInputObj.parentId).width());
        var myHeight = "";
        if (selectInputObj.height && selectInputObj.height != null && selectInputObj.height != "" && selectInputObj.height != 0) {
            myHeight = "height:" + selectInputObj.height+"px;";
        }
        var $selectDiv = $('<div id="'+selectInputObj.selectDivId+'" class="uiframe-selectbox-ajax uiframe-selectHide" style="width:'+myWidth+'px;*margin-left:-'+(myWidth+33)+'px">' +
        '<div style="overflow-y:auto;overflow-x: hidden;'+myHeight+'">' +
        '<table class="uiframe-ajax-content uiframe-searchInput-table" id="'+selectInputObj.tableDivId+'"></table>' +
        '</div>' +
        '</div>');
        var $toolbar = $('<div class="comboxCheckboxDiv uiframe-select-bbar uiframe-searchInput-bbar" id="'+selectInputObj.bbarId+'">' +
            '<div style="float: left;margin-top: 1px;">' +
            '<table>' +
            '<tr>' +
            '<td class="uiframe-grid-span"></td>' +
            '<td><input type="button" class="searchInputClear uiframe-module-btn uiframe-module-cancel-btn" id="clearBtn'+selectInputObj.id+'" value="清空"></td>' +
            '<td class="uiframe-grid-span"></td>' +
            '</tr>' +
            '</table>' +
            '</div>' +
            '<div style="float:right;" id="'+selectInputObj.toolPageRightId+'">' +
            '<table>' +
            '<tr>' +
            '<td><span id="'+selectInputObj.pageId+'"></span></td>' +
            '<td style="line-height:18px;">/</td>' +
            '<td><span id="'+selectInputObj.totalPageId+'"></span></td>' +
            '<td><div class="uiframe-grid-span"></div></td>' +
            '<td style="line-height:18px;"><div style="_padding-top: 4px;">页</div></td>' +
            '<td><div class="uiframe-grid-span"></div></td>' +
            '<td><input type="button" class="uiframe-module-btn" id="'+selectInputObj.prevBtnId+'" value="上一页"></td>' +
            '<td><div class="uiframe-grid-span"></div></td>' +
            '<td><input type="button" class="uiframe-module-btn" id="'+selectInputObj.nextBtnId+'" value="下一页" /></td>' +
            '<td class="uiframe-grid-span"></td>' +
            '</tr>' +
            '</table>' +
            '</div>' +
            '</div>' +
            '<div class="uiframe-select-bbar uiframe-searchInput-bbar" id="'+selectInputObj.dataNoneId+'" style="display: none;padding-left: 8px;">无数据</div>'
        );
        $("#"+selectInputObj.id).parents("div.widget-selectInput").append($selectDiv);
        if(selectInputObj.useToolPage){
            $("#"+selectInputObj.selectDivId).append($toolbar);
        }
        var $tagDiv = $('<div class="uiframe-search-tagDiv selectInputTag" id="'+selectInputObj.tagDivId+'" style="width:'+myWidth+'px;"></div>');
        $("#"+selectInputObj.id).parents("div.widget-selectInput").after($tagDiv)
    };

    selectInputObj.renderSelectDiv();
    // 渲染水印文字方法
    selectInputObj.initEmptyText = function(){
        var $input = $("#"+selectInputObj.inputId);
        if ($("#"+selectInputObj.id).val() == "" && $input.attr("emptyText") && $input.attr("emptyText") != "") {
            $input.width($input.attr("emptyText").length*12+10).val($input.attr("emptyText")).addClass("uiframe-emptyTextColor");
        } else {
            $input.width(10).val("").removeClass("uiframe-emptyTextColor");
        }
    };

    // 初始化工具栏按钮
    selectInputObj.initToolBtn = function(){
        selectInputObj.totalPage = Math.ceil(selectInputObj.totalCount/selectInputObj.limit);
        $("#"+selectInputObj.pageId).text(selectInputObj.startPage);
        $("#"+selectInputObj.totalPageId).text(selectInputObj.totalPage);
        if(selectInputObj.totalCount <= selectInputObj.recordPage){
            $("#"+selectInputObj.toolPageRightId).hide();
        } else {
            $("#"+selectInputObj.toolPageRightId).show();
        }
        if(selectInputObj.totalPage == 0){
            $("#"+selectInputObj.bbarId).hide();
            $("#"+selectInputObj.dataNoneId).show();
            $("#"+selectInputObj.pageId).text("0");
        }  else {
            $("#"+selectInputObj.dataNoneId).hide();
            $("#"+selectInputObj.bbarId).show();
            if(selectInputObj.startPage == selectInputObj.totalPage){
                $("#"+selectInputObj.nextBtnId).attr("disabled","disabled").removeClass("uiframe-module-btn-hover").addClass("uiframeTextDisabled");
            }else{
                $("#"+selectInputObj.nextBtnId).removeAttr("disabled","disabled").removeClass("uiframeTextDisabled");
            }
        }
        if(selectInputObj.startPage == 1){
            $("#"+selectInputObj.prevBtnId).attr("disabled","disabled").removeClass("uiframe-module-btn-hover").addClass("uiframeTextDisabled");
        }else{
            $("#"+selectInputObj.prevBtnId).removeAttr("disabled","disabled").removeClass("uiframeTextDisabled");
        }
    };

    //加载数据方法
    selectInputObj.loadajax_search = function(url){
        // 设置最大选择数量限制
        if (selectInputObj.maxLength != "" && $("#"+selectInputObj.id).val() != "" && $("#"+selectInputObj.id).val().split(",").length >= parseInt(selectInputObj.maxLength)) {
            $("#"+selectInputObj.selectDivId).hide();
            $("#"+selectInputObj.inputId).val("");
            $("#"+selectInputObj.id).trigger("errorMsg");                // 错误信息提示
            return false;
        }
        var params = {
            start:selectInputObj.start,
            limit:selectInputObj.limit,
            limitId:selectInputObj.filterId != "" ? selectInputObj.filterId+","+$("#"+selectInputObj.id).val() : $("#"+selectInputObj.id).val()
        };

        var hidevalue = $("#"+selectInputObj.id).val();
        var columns= eval("("+selectInputObj.columns+")");
        var columnlength = columns.length;

        // 处理POST请求中特殊字符方法
        selectInputObj.searchName = selectInputObj.searchName.replace(/%/g,"%25");
        selectInputObj.searchName = selectInputObj.searchName.replace(/\&/g,"%26");
        selectInputObj.searchName = selectInputObj.searchName.replace(/\+/g,"%2B");
        selectInputObj.searchName = selectInputObj.searchName.replace(/\?/g,"%3F");
        params[selectInputObj.dataName] = selectInputObj.searchName;

        var _url = "";
        if(url.indexOf("?")!=-1){
            _url = url + "&";
        }else{
            _url =url + "?";
        }
        _url += "start="+selectInputObj.start+"&limit="+selectInputObj.limit+"&"+selectInputObj.dataName+"="+selectInputObj.searchName;
        $.ajax({
            type: "GET",
            url: _url,
            dataType: "json",
            data:"",
            success:function(data_name){
                if(data_name){
                    var datas;
                    if (selectInputObj.dataRoot && selectInputObj.dataRoot != "") {
                        datas= eval("data_name." + selectInputObj.dataRoot) || [];
                    } else {
                        datas= eval("data_name") || [];
                    }
                    if(datas == undefined){return;}
                    selectInputObj.totalCount = datas.recordtotal||0;
                    selectInputObj.selectData = datas.resultSet||[];
                }
                var table=$("#"+selectInputObj.tableDivId);
                table.find("tbody").empty();       //清空数据
                var tdW = $("#"+selectInputObj.selectDivId).width()/columnlength -12;
                for(var i=0;i<selectInputObj.selectData.length;i++){
                    var record=selectInputObj.selectData[i];
                    if(record){
                        var columnKey=record[selectInputObj.key];
                        var tr=$('<tr class="syswareSearchLi click-ajax-tr" val="'+columnKey+'"></tr>');
                        for(var k=0;k<columnlength;k++){
                            var column=columns[k];
                            var dataIndex=column.dataIndex;
                            var showValue=column.showValue;
                            var data=record[dataIndex]||"";
                            if(showValue==true){
                                tr.append('<td style="text-align:'+selectInputObj.textAlign+'" class="searchText"><div class="uiframe-searchCombo-td '+selectInputObj.tooltipCls+'" myTitle="'+data+'" style="width:'+tdW+'px;">'+data+'</div></td>');
                            } else{
                                tr.append('<td style="text-align:'+selectInputObj.textAlign+'"><div class="uiframe-searchCombo-td '+selectInputObj.tooltipCls+'" myTitle="'+data+'" style="width:'+tdW+'px;">'+data+'</div></td>');
                            }
                        }
                        table.append(tr);
                    }
                }
                selectInputObj.initToolBtn();
                // 根据显示值实现选中
                $("#"+selectInputObj.tableDivId).find("td").each( function () {
                    var get_value = $(this).attr("value");
                    if (get_value == hidevalue) {
                        $(this).parent("tr").addClass("uiframe-selected");
                    }
                });
                // 根据下拉框显示区域内容多少动态变化显示位置
                if (selectInputObj.showY == "" || selectInputObj.showY == "0") return false;
                var $showDiv = $("#"+selectInputObj.selectDivId);
                var showH = $showDiv.height();
                var bodyH = $(window).height();
                //if(selectInputObj.showY + showH + 30 > bodyH && selectInputObj.showY > (showH + 1)){
                //    $showDiv.css("margin-top", -(showH + 2));
                //} else {
                    $showDiv.css("margin-top", $("#"+selectInputObj.parentId).height() + 2);
                //}
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
            }
        });
    };

    //加载热门标签
    selectInputObj.loadTag = function(url){
        if (!url || url == "") return false;
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            data:{},
            success:function(data_name){
                if(data_name){
                    var datas;
                    if (selectInputObj.dataRoot && selectInputObj.dataRoot != "") {
                        datas= eval("data_name." + selectInputObj.dataRoot) || [];
                    } else {
                        datas= eval("data_name") || [];
                    }
                    if(datas == undefined){return;}
                    selectInputObj.totalCount = datas.recordtotal||0;
                    selectInputObj.selectData = datas.resultSet||[];
                }
                var $tagDiv=$("#"+selectInputObj.tagDivId);
                $tagDiv.empty();       //清空数据
                if (selectInputObj.selectData.length > 0) {
                    $tagDiv.text("标签:");
                }
                for(var i=0;i<selectInputObj.selectData.length;i++){
                    var record=selectInputObj.selectData[i];
                    if(record){
                        var columnKey=record[selectInputObj.key];
                        var columnVal=record["name"];
                        var $span=$('<a href="javascript:void(0);" val="'+columnKey+'">'+columnVal+'</a>');
                        $tagDiv.append($span);
                    }
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
            }
        });
    };

    // 回显数据方法
    selectInputObj.setValue = function (keys, values) {
        if (keys != "" && values != "") {
            var keyArray = keys.split(",");
            var valueArray = values.split(",");
            for (var i = 0, max = keyArray.length; i < max; i++) {
                var $selectDiv = '<div class="uiframe-search-selectLayout searchSelectLayout">' +
                    '<div class="uiframe-search-inputDiv searchInsertInput"></div>' +
                    '<div class="uiframe-search-selectDiv searchSelectDiv">' +
                    '<div class="uiframe-search-name search-selectData" keyVal="' + keyArray[i] + '">' + valueArray[i] + '</div>' +
                    '<div class="uiframe-search-delete search-deleteData"></div>' +
                    '</div>' +
                    '</div>';
                $("#" + selectInputObj.inputId).before($selectDiv);
            }
        }
    };

    // 添加错误信息
    selectInputObj.addError = function () {
        var $el = $("#"+selectInputObj.parentId).parent();
        var $input = $("#"+selectInputObj.parentId);
        var $btn = $("#"+selectInputObj.btnId);
        if ($el.data("errortext") && $("#"+selectInputObj.id).val() == "") {
            $input.addClass("error");
            $btn.addClass("error");
            if ($el.parent().find("label.error")) {
                $el.parent().find("label.error").remove();
            }
            var label=$('<label for="n" generated="true" class="error">'+ $el.data("errortext")+'</label>');
            $el.parent().append(label);
        }
    };

    // 添加校验是否为中文的错误信息
    selectInputObj.addCHError = function () {
        var $el = $("#"+selectInputObj.parentId).parent();
        var $input = $("#"+selectInputObj.parentId);
        var $btn = $("#"+selectInputObj.btnId);
        if ($el.data("errortext")) {
            $input.addClass("error");
            $btn.addClass("error");
            if ($el.parent().find("label.error")) {
                $el.parent().find("label.error").remove();
            }
            var label=$('<label for="n" generated="true" class="error">'+ $el.data("errortext")+'</label>');
            $el.parent().append(label);
        }
    };

    // 删除错误信息
    selectInputObj.removeError = function () {
        var $el = $("#"+selectInputObj.parentId).parent();
        var $input = $("#"+selectInputObj.parentId);
        var $btn = $("#"+selectInputObj.btnId);
        $input.removeClass("error");
        $btn.removeClass("error");
        $el.parent().find("label.error").remove();
    };

    $("#"+selectInputObj.id).on("addError", function(){
        selectInputObj.addError();
    }).on("removeError", function(){
        selectInputObj.removeError();
    }).on("addCHError", function(){
        selectInputObj.addCHError();
    });

    //文本框出现光标时执行脚本
    $(document).on("focus", "#"+selectInputObj.inputId, function(){
        $("#"+selectInputObj.parentId).find(".searchSelectDiv").removeClass("uiframe-search-selectDiv-select");
        $(this).width(10).val("").removeClass("uiframe-emptyTextColor");
    }).on("keyup.searchInput", "#"+selectInputObj.inputId, function(e){     // 搜索过滤
        var $that = $(this);
        var $hidden = $("#"+selectInputObj.id);
        var $layout = $("#"+selectInputObj.parentId);
        var $showDiv = $("#"+selectInputObj.selectDivId);
        selectInputObj.showY = $(e.target).offset().top;
        if (e.ctrlKey || e.shiftKey || e.keyCode == 16 || e.keyCode == 17) return false;
        if(e.keyCode === 40 || e.keyCode === 39 ||e.keyCode === 38 || e.keyCode === 37 || e.keyCode === 27) return;
        if (e.keyCode === 13 && $.trim($that.val()) != "" && selectInputObj.openEnter) {
            var val = $.trim($that.val());
            var $selectDiv = $('<div class="uiframe-search-selectLayout searchSelectLayout">' +
                '<div class="uiframe-search-inputDiv searchInsertInput"></div>' +
                '<div class="uiframe-search-selectDiv searchSelectDiv">' +
                '<div class="uiframe-search-name search-selectData" keyVal="0">'+val+'</div>' +
                '<div class="uiframe-search-delete search-deleteData"></div>' +
                '</div>' +
                '</div>');
            $that.before($selectDiv);
            $that.val("").hide();
            //$hidden.val("");
            $hidden.attr("text", "");
            $layout.find("div.search-selectData").each(function(){
                if ($hidden.val() == "") {
                    //$hidden.val($(this).attr("keyVal"));
                    $hidden.attr("text", $(this).text());
                    $hidden.attr("texts", $(this).text());
                } else {
                    //$hidden.val($hidden.val()+","+$(this).attr("keyVal"));
                    $hidden.attr("text", $hidden.attr("text")+$(this).text());
                    $hidden.attr("texts", $hidden.attr("text")+","+$(this).text());
                }
            });
            $showDiv.hide();
            selectInputObj.removeError();
            $hidden.trigger("enterAfter", [val, $selectDiv]);
            return false;
        }
        $that.width(12 * $that.val().length + 10);
        if ($that.val() == '' && e.keyCode === 8) {
            $("#"+selectInputObj.selectDivId).hide();
            if ($("#"+selectInputObj.parentId).find(".uiframe-search-selectDiv-select").length == 1) {
                $("#"+selectInputObj.parentId).find(".uiframe-search-selectDiv-select").find(".search-deleteData").trigger("click");
            }
            if ($that.prev("div")) {
                $that.prev("div").find(".searchSelectDiv").addClass("uiframe-search-selectDiv-select");
            }
            return false;
        } else {
            $("#"+selectInputObj.parentId).find(".searchSelectDiv").removeClass("uiframe-search-selectDiv-select");
        }
        selectInputObj.searchName = $that.val();
        selectInputObj.startPage = 1;
        selectInputObj.start = 0;
        selectInputObj.loadajax_search(selectInputObj.changeUrl);
        if (selectInputObj.maxLength == "" || $("#"+selectInputObj.id).val() == "" || $("#"+selectInputObj.id).val().split(",").length >= parseInt(selectInputObj.maxLength)) {
            $("#" + selectInputObj.selectDivId).css("z-index", zWidgets.selection_zindex).show();
            zWidgets.selection_zindex++;
        }
    }).on("blur", "#"+selectInputObj.inputId, function(){       //文本框光标消失时执行脚本
        $("#"+selectInputObj.parentId).find(".searchSelectDiv").removeClass("uiframe-search-selectDiv-select");
        if ($(this).find(".uiframe-search-selectDiv").length == 0) {
            $("#"+selectInputObj.inputId).show();
        } else {
            $("#"+selectInputObj.inputId).hide();
        }
        selectInputObj.initEmptyText();
    }).on("click", "#"+selectInputObj.tagDivId+" a", function(){
        var hiddenVal = $("#"+selectInputObj.id).val();
        var valLength = 1;
        if (hiddenVal.indexOf(",") != -1) {
            valLength = hiddenVal.split(",").length
        }
        if (hiddenVal == "") {
            valLength = 0
        }
        if (selectInputObj.maxLength && selectInputObj.maxLength != "0" && valLength >= parseInt(selectInputObj.maxLength)) return false;
        if (!$(this).hasClass("uiframe-tagClick")){
            if ($("#"+selectInputObj.inputId).hasClass('uiframe-emptyTextColor')) {
                $("#"+selectInputObj.inputId).trigger("focus");
            }
            var $hidden = $("#"+selectInputObj.id);
            var $layout = $("#"+selectInputObj.parentId);
            var hiddenVal = $hidden.val();
            var val = $(this).attr("val");
            if(hiddenVal.indexOf(val) == -1) {
                selectInputObj.setValue(val, $(this).text());
                selectInputObj.removeError();
                $hidden.val("");
                $hidden.attr("text", "");
                $layout.find("div.search-selectData").each(function () {
                    if ($hidden.val() == "") {
                        $hidden.val($(this).attr("keyVal"));
                        $hidden.attr("text", $(this).text());
                        $hidden.attr("texts", $(this).text());
                    } else {
                        $hidden.val($hidden.val() + "," + $(this).attr("keyVal"));
                        $hidden.attr("text", $hidden.attr("text") + $(this).text());
                        $hidden.attr("texts", $hidden.attr("text") + "," + $(this).text());
                    }
                });
            }
        }
    });

    // 定义点击删除按钮调用的事件，增加水印
    $("#"+selectInputObj.id).on("initEmptyText", function(){
        selectInputObj.initEmptyText();
    });

    // 点击下拉框展加载数据
    $("#"+selectInputObj.selectDivId).on("searchAction", function(){
        selectInputObj.searchName = "";
        selectInputObj.startPage = 1;
        selectInputObj.start = 0;
        selectInputObj.loadajax_search(selectInputObj.changeUrl);
    });

    $("#"+selectInputObj.id).on("setUrl", function (event,url) {          //为此组件id绑定更换url方法
        selectInputObj.changeUrl = url;
        selectInputObj.loadajax_search(url);
    }).on("setValue", function(e, keys, values){
        selectInputObj.setValue(keys, values);
    });

    // 翻页工具栏按钮绑定点击事件
    $("#"+selectInputObj.toolPageRightId).on("click", "input", function(e){
        var myId = $(e.target).attr("id");
        switch (myId) {
            case selectInputObj.prevBtnId: {
                selectInputObj.startPage = parseInt(selectInputObj.startPage) - 1;
                break;
            }
            case selectInputObj.nextBtnId: {
                selectInputObj.startPage = parseInt(selectInputObj.startPage) + 1;
                break;
            }
        }
        selectInputObj.start = (selectInputObj.startPage - 1) * selectInputObj.limit;
        selectInputObj.loadajax_search(selectInputObj.changeUrl);
    });

    // 加载数据
    selectInputObj.loadTag(selectInputObj.tagUrl);
    //selectInputObj.loadajax_search(selectInputObj.changeUrl);

    // 初始化水印
    selectInputObj.initEmptyText();

    // 回显数据
    selectInputObj.setValue(selectInputObj.vals, selectInputObj.valTexts);

    // 此ID下的组件已初始化完成表示
    $("#"+selectInputObj.id).parents("div.widget-selectInput").attr("data-parserFlag", true);
};

$(function(){
    // 支持搜索多选的下拉框
    zWidgets._document.on("click",".syswareSearchInput",function(e){
        var $parent = $(this).parents("div.widget-selectInput");
        var $showDiv = $("#"+$parent.data("id") + "SelectDiv");
        var displayText = $showDiv.css('display');
        if(displayText == "block"){
            $showDiv.css("display","none");
        }else{
            var showH = $showDiv.height();
            var bodyH = $(window).height();
            //if(e.pageY + showH + 10 > bodyH && e.pageY > (showH + 1)){
            //    $showDiv.css("margin-top", -(showH + 2));
            //    $showDiv.attr("showTop", "true");
            //} else {
                $showDiv.css("margin-top", $("#"+$parent.data("id") + "Parent").height() + 2);
            //}
            $("body").find(".uiframe-selectHide").hide();
            //if (zWidgets.browser.isIE() && zWidgets.browser.isIE8() || zWidgets.browser.isChrome()) {
            //    $showDiv.css("top",parseInt($(this).position().top) + $("#"+$parent.data("id") + "Parent").height() + 2);
            //}
            $showDiv.css("display","block").css("z-index",zWidgets.selection_zindex);
            $showDiv.trigger("searchAction", [""]); //查询条件定义为空
            $(this).attr("tabindex", 0).focus();
            zWidgets.selection_zindex++;
        }
        return false;  //阻止事件冒泡
    }).on("click",".syswareSearchLi",function(){      // 搜索下拉框选中操作
        var $that = $(this);
        var $parent = $that.parents("div.widget-selectInput");
        var $hidden = $("#"+$parent.data("id"));
        var $layout = $("#"+$parent.data("id") + "Parent");
        var $input = $("#"+$parent.data("id")+"Input");
        var $showDiv = $("#"+$parent.data("id")+"SelectDiv");
        var text  = $that.children("td.searchText").text();
        var hiddenVal = $hidden.val();
        var val = $that.attr("val");
        if(hiddenVal.indexOf(val) == -1)  {
            var $selectDiv = '<div class="uiframe-search-selectLayout searchSelectLayout">' +
                '<div class="uiframe-search-inputDiv searchInsertInput"></div>' +
                '<div class="uiframe-search-selectDiv searchSelectDiv">' +
                '<div class="uiframe-search-name search-selectData" keyVal="'+val+'">'+text+'</div>' +
                '<div class="uiframe-search-delete search-deleteData"></div>' +
                '</div>' +
                '</div>';
            $input.before($selectDiv);
            $input.val("").hide();
            $hidden.trigger("removeError");
            $hidden.val("");
            $hidden.attr("text", "");
            $layout.find("div.search-selectData").each(function(){
                if ($hidden.val() == "") {
                    $hidden.val($(this).attr("keyVal"));
                    $hidden.attr("text", $(this).text());
                    $hidden.attr("texts", $(this).text());
                } else {
                    $hidden.val($hidden.val()+","+$(this).attr("keyVal"));
                    $hidden.attr("text", $hidden.attr("text")+$(this).text());
                    $hidden.attr("texts", $hidden.attr("text")+","+$(this).text());
                }
            });
        }
        $showDiv.hide();
        $hidden.trigger("initEmptyText");             // 判断水印文字
        $hidden.trigger("change", [$hidden.val(), $hidden.attr("text")]);   // 改变选中数据监听事件
        return false;
    }).on("click",".search-deleteData",function(){
        var $parent = $(this).parents("div.widget-selectInput");
        var $layout = $("#"+$parent.data("id") + "Parent");
        var $hidden = $("#"+$parent.data("id"));
        $(this).parents("div.searchSelectLayout").remove();
        $hidden.val("");
        $hidden.attr("text", "");
        $layout.find("div.search-selectData").each(function(){
            if ($hidden.val() == "") {
                $hidden.val($(this).attr("keyVal"));
                $hidden.attr("text", $(this).text());
            } else {
                $hidden.val($hidden.val()+","+$(this).attr("keyVal"));
                $hidden.attr("text", $hidden.attr("text")+","+$(this).text());
            }
        });
        if ($layout.find(".uiframe-search-selectData").length == 0) {
            $layout.find("input.uiframe-search-text").show();
        } else {
            $layout.find("input.uiframe-search-text").hide();
        }
        if ($hidden.val() == "") {
            $hidden.trigger("addError");
        }
        $hidden.trigger("initEmptyText");             // 判断水印文字
        $hidden.trigger("change", [$hidden.val(), $hidden.attr("text")]);   // 改变选中数据监听事件
        return false;
    }).on("click",".searchInsertInput",function(){
        var $parent = $(this).parents("div.widget-selectInput");
        var $input = $("#"+$parent.data("id") + "Input");
        if (!$(this).next().hasClass("uiframe-search-text")) {
            $(this).parent("div.searchSelectLayout").before($input);
            $input.width(10).val("").show().trigger("focus");
        }
        return false;
    }).on("click",".searchSelectDiv",function(){
        var $parent = $(this).parents("div.widget-selectInput");
        var $layout = $("#"+$parent.data("id") + "Parent");
        $layout.find(".searchSelectDiv").removeClass("uiframe-search-selectDiv-select");
        $(this).addClass("uiframe-search-selectDiv-select");
        $layout.attr("tabindex",0).focus();
        return false;
    }).on("click",".searchInputClear",function(){
        var $parent = $(this).parents("div.widget-selectInput");
        var $hidden = $("#"+$parent.data("id"));
        var $layout = $("#"+$parent.data("id") + "Parent");
        $hidden.val("");
        $layout.find(".searchSelectLayout").remove();
        $layout.find("input.uiframe-search-text").show();
        $hidden.trigger("removeError");
        $hidden.trigger("initEmptyText");             // 判断水印文字
        $hidden.trigger("change", ["", ""]);   // 改变选中数据监听事件
        return false;
    }).on("click",".uiframe-mainCon-search",function(){
        var $parent = $(this).parents("div.widget-selectInput");
        var $input = $("#"+$parent.data("id") + "Input");
        $(this).append($input);
        $input.show().trigger("focus");
        return false;
//    }).on("keydown",".widget-selectInput",function(e){
//        var $inputId = $("#"+$(this).attr("inputId"));
//        if(e.keyCode === 8 && $(this).find(".uiframe-search-selectDiv-select").length == 1) {
//            var $select = $(this).find(".uiframe-search-selectDiv-select");
//            $select.parent().prev("div").find(".searchSelectDiv").addClass("uiframe-search-selectDiv-select");
//            $select.find(".search-deleteData").trigger("click");
//        }
//        return false;
    }).on("mouseover", ".searchSelectDiv", function(){
        $(this).addClass('uiframe-search-selectDiv-hover');
    }).on("mouseout", ".searchSelectDiv", function(){
        $(this).removeClass('uiframe-search-selectDiv-hover');
    }).on("mouseover", ".uiframe-search-btn", function(){
        $(this).addClass('uiframe-search-btn-hover');
    }).on("mouseout", ".uiframe-search-btn", function(){
        $(this).removeClass('uiframe-search-btn-hover');
    });
});