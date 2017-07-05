// CKEDITOR.editorConfig = function( config ) {
// 	config.toolbarGroups = [
// 		{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
// 		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
// 		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
// 		{ name: 'links', groups: [ 'links' ] },
// 		{ name: 'insert', groups: [ 'insert' ] },
// 		{ name: 'forms', groups: [ 'forms' ] },
// 		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
// 		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
// 		{ name: 'styles', groups: [ 'styles' ] },
// 		{ name: 'colors', groups: [ 'colors' ] },
// 		{ name: 'about', groups: [ 'about' ] },
// 		{ name: 'others', groups: [ 'others' ] },
// 		{ name: 'tools', groups: [ 'tools' ] }
// 	];

// 	config.extraPlugins = "fileImage";
// 	config.removeButtons = 'Underline,Subscript,Superscript,Cut,Copy,Paste,PasteText,PasteFromWord,Scayt,Outdent,Indent,Blockquote,Styles,About';
// };

// CKEDITOR.editorConfig(CKEDITOR.config);
var ckeditorDownloadPath = "http://192.168.4.27:8081/download/?ID=";
var ckeditorFilePath = "192.168.4.27:8082";
$(function(){
	$(document).on("click", "#ckeditorImgFile", function () {
		var m, $that = $(this), fileName = "";
		$that.SyswareFileUpload({
			forceUseActiveX: false,
			fsdUrl: ckeditorFilePath,
			onCheckProgressChange: function (param) {
				//$("#mask_CkeditorImgFile").html("文件完整性校验中:" + param.progress + "%");
			},
			onGetMD5CodeProgressChange: function (param) {
				//$("#mask_CkeditorImgFile").html("文件哈希值计算中:" + param.progress + "%");
			},
			onSelectChange: function (param) {
				fileName = param.fileName;
				//if(!$("#mask_CkeditorImgFile")[0]){
				//	zWidgets.mask.show({
				//		target: $("#ckeditorFileDiv"),
				//		zindex: 9999,
				//		loadText: "<div id='mask_CkeditorImgFile'>准备上传...</div>"
				//	});
				//}
			},
			onUploadFinish: function (param) {
				if(!param.success){
					alert("上传失败，上传过程中有数据丢失!");
					return;
				}
				$("#ckeditorFileId").val(param.fileId);
				$("#ckeditorFileDiv").removeClass("ckFile-icon").children("img").remove();
				$("#ckeditorFileDiv").append("<img src='"+ckeditorDownloadPath+param.fileId+"' />");
				//zWidgets.mask.hide({id:"ckeditorFileDiv"});
			},
			onUploadProgressChange: function (param) {
				$("#mask_CkeditorImgFile").html("正在上传中:" + param.progress + "%");
				//zWidgets.mask.hide({id:"ckeditorFileDiv"});
			}

		})
	});
});
