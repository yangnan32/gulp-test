(function(){
    var a ={
        exec:function(editor){
            var ckWin = layer.open({
                type: 1,
                //skin: 'layui-layer-lan',
                title: '上传图片',
                area: ['380px', '320px'],
                content: '<div class="widgets-ckeditorFile-label"><input type="radio" id="imgAlign0" checked="checked" name="imgAlign" value="0" /><label for="imgAlign0">默认位置</label><input type="radio" id="imgAlign1" name="imgAlign" value="left" /><label for="imgAlign1">左对齐</label><input type="radio" id="imgAlign2" name="imgAlign" value="center"  /><label for="imgAlign2">居中</label><input type="radio" id="imgAlign3" name="imgAlign" value="right"  /><label for="imgAlign3">右对齐</label></div><div class="widgets-ckeditorFile ckFile-icon" id="ckeditorFileDiv"><input type="hidden" id="ckeditorFileId" /><input type="file" ckeditorName="'+editor.name+'" id="ckeditorImgFile" /></div>',
                btn: ['保存', '取消'],
                yes: function(index, layero){
                    if ($("#ckeditorFileId").val()) {
                        var src = ckeditorDownloadPath + encodeURI($("#ckeditorFileId").val());
                        var imgHtml="";
                        var img="<img src='" + src+"' />";
                        if ($("[name=imgAlign]:checked").val() && $("[name=imgAlign]:checked").val() != "" && $("[name=imgAlign]:checked").val() != "0"){
                            imgHtml = "</p><p style='text-align:"+$("[name=imgAlign]:checked").val()+"'>"+img;
                        } else {
                            imgHtml = img;
                        }
                        CKEDITOR.instances[editor.name].insertHtml(imgHtml);
                    }
                    layer.close(ckWin);
                },
                btn2: function(index, layero){
                    layer.close(ckWin);
                }
            });
        }
    }
    var b = "fileImage";
    CKEDITOR.plugins.add(b,{
        init:function(editor){
            editor.addCommand(b,a);
            editor.ui.addButton("fileImage",{
                label:"上传图片",
                icon:this.path+"fileImage.png",
                command:b
            })
        }
    })
})();