zWidgets.multiFile = function(data) {
	// 使用SyswareFileUpload插件封装的组件
	var forceUseActiveX = false;
	if (!forceUseActiveX && window.WebSocket) {
		forceUseActiveX = false;
		$("#"+data.id).css("position","relative");
		var w= $("#"+data.id).width();
		var h= $("#"+data.id).height();
		$("#"+data.id).append("<div id='_f_form"+data.id+"' style='width:"+w+"px;height:"+h+"px; opacity:0; position: absolute;left: 0;top: 0;z-index: 888'><input type='file' style='width:"+w+"px;' name='_fi' id='_fi"+data.id+"'/></div>")
	}else {
		forceUseActiveX=true;
	}
	var multiFileAjax = {
		id : data.id,
		clearBtnId : data.id + "ClearBtn",
		fileId : data.fileId,
		fileValueId : data.fileValueId,
		fileUlId : data.fileUlId,
		fileIdValue : data.fileIdValue || "",
		fileNameValue : data.fileNameValue || "",
		maxLength : data.maxLength || 5,
		url : data.url,
		autoLoad : data.autoLoad,
		AjaxUpload:undefined,
		getFileId:function(){
			var fileId = "";
			$("#"+this.fileUlId).find("li").each(function(){
				if (fileId == "") {
					fileId = $(this).attr("fileId");
				} else {
					fileId += ","+$(this).attr("fielId");
				}
			});
			return fileId;
		},
		getFileValue:function(){
			var fileValue = "";
			$("#"+this.fileUlId).find("li").each(function(){
				if (fileValue == "") {
					fileValue = $(this).attr("fileValue");
				} else {
					fileValue += ","+$(this).attr("fileValue");
				}
			});
			return fileValue;

		},
		initBtn: function(){
			if ($("#"+multiFileAjax.fileUlId + " li").length >= multiFileAjax.maxLength) {
				$("#"+multiFileAjax.id).hide();
			} else {
				$("#"+multiFileAjax.id).show();
			}
		},
		fileAjaxUpload:function(){
			var m;
			var el_obj = $('#_fi'+multiFileAjax.id);
			if (forceUseActiveX) {
				el_obj = $('#'+multiFileAjax.id);
			}
			el_obj.off("click");
			el_obj.on("click",function () {
				var fileName = "";
				$(this).SyswareFileUpload({
					forceUseActiveX: forceUseActiveX,
					fsdUrl: multiFileAjax.url,
					onCheckProgressChange: function (param) {
						$("#mask_"+multiFileAjax.id).html("文件完整性校验中:" + param.progress + "%");
					},
					onGetMD5CodeProgressChange: function (param) {
						$("#mask_"+multiFileAjax.id).html("文件哈希值计算中:" + param.progress + "%");
					},
					onSelectChange: function (param) {
						fileName = param.fileName;
						if(!$("#mask_"+multiFileAjax.id)[0]){
							zWidgets.mask.show({
								target: $("#body"),
								zindex: 9999,
								loadText: "<div id='mask_"+multiFileAjax.id+"'>准备上传...</div>"
							});
						}
					},
					onUploadFinish: function (param) {
						if(!param.success){
							zWidgets.mask.hide({id:"body"});
							alert("上传失败，上传过程中有数据丢失!");
							return;
						}

						$("#"+multiFileAjax.fileUlId).append('<li fileId="'+param.fileId+'" fileValue="'+fileName+'" class="uiframe-multiFile-li"><div class="uiframe-multiFile-text">'+fileName+'</div><div class="uiframe-multiFile-delete multiFileDelete"></div></li>');

						$('#'+multiFileAjax.fileId).val(multiFileAjax.getFileId());
						$('#'+multiFileAjax.fileValueId).val(multiFileAjax.getFileValue());

						multiFileAjax.initBtn();
						if (param.fileId != "" && $('#'+multiFileAjax.id).hasClass("error")) {
							$('#'+multiFileAjax.id).removeClass("error");
						}

						$('#'+multiFileAjax.id).trigger("fileSuccess");
						$('#'+multiFileAjax.id).focus();
						zWidgets.mask.hide({id:"body"});

					},
					onUploadProgressChange: function (param) {
						$("#mask_"+multiFileAjax.id).html("正在上传中:" + param.progress + "%");
					}
				})
			});
			return this.AjaxUpload;
		}
	};

	if(multiFileAjax.autoLoad && multiFileAjax.autoLoad != "false"){
		multiFileAjax.fileAjaxUpload();
	}

	// 渲染回显数据
	if (multiFileAjax.fileIdValue != "" && multiFileAjax.fileNameValue != "") {
		var fileIdArray = multiFileAjax.fileIdValue.split(",");
		var fileNameArray = multiFileAjax.fileNameValue.split(",");
		for (var i = 0, max = fileIdArray.length; i < max; i += 1) {
			$("#"+multiFileAjax.fileUlId).append('<li fileId="'+fileIdArray[i]+'" fileValue="'+fileNameArray[i]+'" class="uiframe-multiFile-li"><div class="uiframe-multiFile-text">'+fileNameArray[i]+'</div><div class="uiframe-multiFile-delete multiFileDelete"></div></li>');
		}
	}

	//清空按钮操作
	$("#"+multiFileAjax.clearBtnId).on("click", function(){
		$('#'+multiFileAjax.fileId).val('');
		$('#'+multiFileAjax.fileValueId).val('');
		$("#"+multiFileAjax.fileUlId).empty();
		multiFileAjax.initBtn();
	});

	// 禁用
	$("#"+multiFileAjax.id).on("disable",function(){
		$("#"+multiFileAjax.id).addClass("uiframe-emptyTextColor");
		$("#_fi"+multiFileAjax.id).attr("disabled");
	});
	// 启用
	$("#"+multiFileAjax.id).on("enable",function(){
		$("#"+multiFileAjax.id).removeClass("uiframe-emptyTextColor");
		$("#_fi"+multiFileAjax.id).removeAttr("disabled");
		multiFileAjax.fileAjaxUpload();
	});

	// 删除文件
	$(document).on("click", "#"+multiFileAjax.fileUlId+" .multiFileDelete", function(){
		$(this).parent("li").remove();
		$('#'+multiFileAjax.fileId).val(multiFileAjax.getFileId());
		$('#'+multiFileAjax.fileValueId).val(multiFileAjax.getFileValue());
		multiFileAjax.initBtn();
	});

	// 此ID下的组件已初始化完成表示
	$("#"+multiFileAjax.id).parent("div.widget-multiFile").attr("data-parserFlag", true);
};