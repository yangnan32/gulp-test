<%--
    * copyright    : Sysware Technology Co., Ltd
    * @version     : 1.0
    * @created     : 12-9-21下午5:40
    * @team	    :
    * @author      : yangn
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.*" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="sysware" tagdir="/WEB-INF/tags/simpleuiframe" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path;
    long uuid=new Date().getTime();
%>
<sysware:sysware-base />
<sysware:sysware-plugins />
<style type="text/css">
    .uiframe-fileinput, .uiframe-btntext{height:23px;}
    body{overflow:hidden}
</style>
<script type="text/javascript">
    $(function(){
        sywBase._document.off(".error");
        // input框验证错误划过提示文字
        sywBase._document.on("mouseover.error", "input.error,textarea.error,div.error", function (e) {
            $("#tooltip").remove();
            Sysware.tooltipTitle = $(this).next('label.error').text();
            if (Sysware.tooltipTitle == "") return;
            var tooltip = "<div id='tooltip'>" + Sysware.htmlMeaning(Sysware.tooltipTitle) + "</div>"; //创建 div 元素
            $("body").append(tooltip);	//把它追加到文档中
            if ($("#tooltip").width() >= 300) {
                $("#tooltip").css("width","300px");
            }
            var toolTipWidth=$("#tooltip").width();
            $("#tooltip")
                    .css({
                        "top": ((e.pageY+$("#tooltip").height()+50)>$(window).height()? e.pageY -$("#tooltip").height()- Sysware.tooltip_y:e.pageY+Sysware.tooltip_y) + "px",
                        "left": ((e.pageX+toolTipWidth+50)>$(window).width()? e.pageX -toolTipWidth- Sysware.tooltip_x:e.pageX+Sysware.tooltip_x) + "px"
                    }).show("fast");

        }).on("mouseout.error", "input.error,textarea.error,div.error", function () {
            $("#tooltip").remove();   //移除
        }).on("mousemove.error", "input.error,textarea.error,div.error", function (e) {
            if ($("#tooltip").width() >= 300) {
                $("#tooltip").css("width","300px");
            }
            var toolTipWidth=$("#tooltip").width();
            $("#tooltip")
                    .css({
                        "top": ( (e.pageY+$("#tooltip").height()+50)>$(window).height()? e.pageY -$("#tooltip").height()- Sysware.tooltip_y:e.pageY+Sysware.tooltip_y) + "px",
                        "left": ( (e.pageX+toolTipWidth+50)>$(window).width()? e.pageX -toolTipWidth- Sysware.tooltip_x:e.pageX+Sysware.tooltip_x) + "px"
                    }).show("fast");
        }).on("click.error", "input.error,textarea.error,div.error", function (e) {
            $("#tooltip").remove();
        });


        $("#saveFileImage").off("click");
        $("#saveFileImage").on("click",function(){
            var fileid = $("#fileId").val();
            if (fileid == "") {
                Sysware.addError("fileInputId", "请选择需要上传的图片");
                return false;
            } else {
                Sysware.removeError("fileInputId");
            }
            var src = basePath + "/download/?ID=" + encodeURI(fileid) + "&&DIS=false&___ifr=true";
            var imgHtml="";
            if ($("[name=imgAlign]:checked").val() && $("[name=imgAlign]:checked").val() != "" && $("[name=imgAlign]:checked").val() != "0"){
                imgHtml = "<p style='text-align:"+$("[name=imgAlign]:checked").val()+"'><img src='" + src+"' /></p>";
            } else {
                imgHtml = "<img src='" + src+"' />";
            }
            var ckeditorId = $(window.parent.document).find(".cke_skin_office2003").prev().attr("id");
            window.parent.CKEDITOR.instances[ckeditorId].insertHtml(imgHtml);
            $(window.parent.document).find("#fileImageWinId").prev("div.uiFrame-window-mask").remove();
            $(window.parent.document).find("#fileImageWinId").remove();
        });
        $("#cancelFileImage").off("click");
        $("#cancelFileImage").on("click",function(){
            $(window.parent.document).find("#fileImageWinId").prev("div.uiFrame-window-mask").remove();
            $(window.parent.document).find("#fileImageWinId").remove();
        });
        //上传附件传值操作
        $("#fileInputId").on("getFileName", function(event,name){
            if (name != "" && name.length > 0) {
                //图片类型验证操作
                var pos = name.lastIndexOf("\\");
                name = name.substring(pos + 1, name.length);
                var pos1 = name.lastIndexOf("\.");
                var fileType = name.substring(pos1 + 1, name.length);
                if (!(fileType == "jpg" || fileType == "JPG" || fileType == "bmp" || fileType == "BMP" || fileType == "png" || fileType == 'PNG')) {
                    window.parent.$.sywDialog.notice("提示","请选择图片格式文件","140px","80px","fileWinId");
                    $("#fileInputId").val("");
                    $("#fileId").val("");
                    $("#FileValueId").val("");
                    $(window.parent.document).find("#fileImageWinId").prev("div.uiFrame-window-mask").remove();
                    $(window.parent.document).find("#fileImageWinId").remove();
                    return false;
                }
            }
        })
    })
</script>
<div class="uiframe-winForm" id="fileFormDiv">
    <form id="fileForm">
        <div class="uiframe-winForm-div">
            <div class="uiframe-winForm-lable-file oneColumn-lable"><label>图片对齐:</label></div>
            <div class="uiframe-jspForm-checkbox">
                <input type="radio" id="imgAlign0" class="uiframe-checkbox" checked="checked" name="imgAlign" value="0" />
                <label class="uiframe-radio-label" for="imgAlign0">默认位置</label>
                <input type="radio" id="imgAlign1" class="uiframe-checkbox" name="imgAlign" value="left" />
                <label class="uiframe-radio-label" for="imgAlign1">左对齐</label>
                <input type="radio" id="imgAlign2" class="uiframe-checkbox" name="imgAlign" value="center"  />
                <label class="uiframe-radio-label" for="imgAlign2">居中</label>
                <input type="radio" id="imgAlign3" class="uiframe-checkbox" name="imgAlign" value="right"  />
                <label class="uiframe-radio-label" for="imgAlign3">右对齐</label>
            </div>
        </div>
        <div class="uiframe-winForm-div">
            <div class="uiframe-winForm-lable-file oneColumn-lable"><label>选择图片:</label></div>
            <div class="uiframe-winForm-fileLeft"></div>
            <div class="uiframe-winForm-file">
                <sysware:file id="fileInputId" fileId="fileId" fileValueId="FileValueId" idName="fileIdName" valueName="FileValueIdName" must="true" width="200" />
            </div>
        </div>
    </form>
    <div class="uiframe-winBbar-div windowBbar-btns" style="border:none;">
        <button class="uiframe-button" id="saveFileImage">确定</button>
        <button class="uiframe-button" id="cancelFileImage">取消</button>
    </div>
</div>


<div class="widgets-ckeditorFile">
    <input type="file" id="imgFile" />
</div>
