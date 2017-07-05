zWidgets.searchInput = function(data) {
    // 定义searchInput集合对象
    var searchInputObj = {
        id: data.id,
        changeUrl: data.url,
        key: data.key,
        dataName: data.dataName,    // 搜索数据时参数名称
        dataRoot: data.dataRoot,
        selectData: "",                //加载的数据
        showY : 0                       //显示数据Y轴距离
    };

    // 初始化下拉显示列表
    searchInputObj.renderSelectDiv = function() {
        var myWidth = parseInt($("#"+searchInputObj.id).next("input").width() + 20);
        var $selectDiv = $('<div id="'+searchInputObj.id+'Div" class="widgets-searchInput-div" style="width:'+myWidth+'px"><ul></ul></div>');
        $("#"+searchInputObj.id).parents("div.widget-searchInput").append($selectDiv);
    };

    searchInputObj.renderSelectDiv();
    // 渲染水印文字方法
    searchInputObj.initEmptyText = function(){
        var $input = $("#"+searchInputObj.id).next("input");
        if ($("#"+searchInputObj.id).val() == "" && $input.attr("emptyText") && $input.attr("emptyText") != "") {
            $input.val($input.attr("emptyText")).addClass("uiframe-emptyTextColor");
        } else {
            $input.removeClass("uiframe-emptyTextColor");
        }
    };

    //加载数据方法
    searchInputObj.load = function(url, val){
        var _url = "";
        if(url.indexOf("?")!=-1){
            _url = url + "&";
        }else{
            _url =url + "?";
        }
        _url += searchInputObj.dataName+"="+val;

        $.ajax({
            type: "GET",
            url: _url,
            dataType: "json",
            data:"",
            success:function(data_name){
                if(data_name){
                    var datas;
                    if (searchInputObj.dataRoot && searchInputObj.dataRoot != "") {
                        datas= eval("data_name." + searchInputObj.dataRoot) || [];
                    } else {
                        datas= eval("data_name") || [];
                    }
                    if(datas == undefined){return;}
                    searchInputObj.totalCount = datas.recordtotal||0;
                    searchInputObj.selectData = datas.resultSet||[];
                }
                var $showDiv = $("#"+searchInputObj.id+"Div");
                var $ul = $showDiv.find("ul");
                $ul.empty();       //清空数据
                for(var i=0;i<searchInputObj.selectData.length;i++){
                    var record=searchInputObj.selectData[i];
                    if(record){
                        var note = record.checked == true?"已添加":"";
                        var cls = record.checked == true?"":"widgetsSearchInputLi";
                        var columnKey=record[searchInputObj.key];
                        var $li=$('<li class="'+cls+'" val="'+columnKey+'"><img src="'+record.headImg+'"><div class="showName textOver" style="width:'+($showDiv.width() - 100)+'px">'+record.name+'</div><span>'+note+'</span></li>');
                        $ul.append($li);
                    }
                }
                $showDiv.show();
                // 根据下拉框显示区域内容多少动态变化显示位置
                if (searchInputObj.showY == "" || searchInputObj.showY == "0") return false;
                var $showDiv = $("#"+searchInputObj.selectDivId);
                var showH = $showDiv.height();
                var bodyH = $(window).height();
                if(searchInputObj.showY + showH + 30 > bodyH && searchInputObj.showY > (showH + 1)){
                    $showDiv.css("margin-top", -(showH + 1));
                } else {
                    $showDiv.css("margin-top", $("#"+searchInputObj.id).next("input").height() + 1);
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
            }
        });
    };

    //文本框出现光标时执行脚本
    $(document).on("focus", "#"+searchInputObj.id+"Input", function(){
        if ($(this).hasClass("uiframe-emptyTextColor")) {
            $(this).val("").removeClass("uiframe-emptyTextColor")
        }
        $(this).parents("div.widget-searchInput").find(".widgetsSearchInputDelete").show();
    }).on("keyup", "#"+searchInputObj.id+"Input", function(e){     // 搜索过滤
        searchInputObj.showY = $(e.target).offset().top;
        if (e.ctrlKey || e.shiftKey || e.keyCode == 16 || e.keyCode == 17) return false;
        if(e.keyCode === 40 || e.keyCode === 39 ||e.keyCode === 38 || e.keyCode === 37 || e.keyCode === 27) return;
        searchInputObj.load(searchInputObj.changeUrl, $(this).val());
    });

    // 定义点击删除按钮调用的事件，增加水印
    $("#"+searchInputObj.id).on("initEmptyText", function(){
        searchInputObj.initEmptyText();
    });
    // 初始化水印
    searchInputObj.initEmptyText();

    // 此ID下的组件已初始化完成表示
    $("#"+searchInputObj.id).parents("div.widget-searchInput").attr("data-parserFlag", true);
};

$(function(){
    // 支持搜索多选的下拉框
    zWidgets._document.on("click", ".widgetsSearchInputLi", function(){      // 搜索下拉框选中操作
        var $that = $(this);
        var $parent = $that.parents("div.widget-searchInput");
        var $hidden = $("#"+$parent.data("id"));
        var $showDiv = $parent.find(".widgets-searchInput-div");
        $parent.find(".widgetsSearchInputDelete").hide();
        $hidden.val($that.attr("val"));
        $hidden.next("input").val($that.find("p").text());
        $showDiv.hide();
        $hidden.trigger("initEmptyText");             // 判断水印文字
        $hidden.trigger("change", [$that.attr("val"), $that.find("p").text()]);   // 改变选中数据监听事件
        return false;
    }).on("click", ".widgetsSearchInputDelete", function(){
        var $parent = $(this).parents("div.widget-searchInput");
        var $hidden = $("#"+$parent.data("id"));
        var $showDiv = $parent.find(".widgets-searchInput-div");
        $(this).hide();
        $hidden.val("");
        $hidden.next("input").val("");
        $showDiv.hide();
        $hidden.trigger("initEmptyText");             // 判断水印文字
        $hidden.trigger("change", ["", ""]);   // 改变选中数据监听事件
        return false;
    });
});