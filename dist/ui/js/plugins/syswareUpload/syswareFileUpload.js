var _Fs_items = {};
/**
 * 插件回调函数  进度反馈
 * @param params
 * @private
 */
function _SyswareFS_OnProgressChange(params) {
    var rs = eval("(" + params + ")");
    var guid = rs.guid;
    var that = _Fs_items[guid];
    if (that) {
        if (rs.type == "uploading") {
            that.onUploadProgressChange(rs);
        } else if (rs.type == "checking") {
            that.onCheckProgressChange(rs);
        } else if (rs.type == "computeFileHashMD5") {
            that.onGetMD5CodeProgressChange(rs);
        }
    }
}
/**
 * 插件回调 文件选择后回调
 * @param params
 * @private
 */
function _SyswareFS_OnFileSelected(params) {
    var rs = eval("(" + params + ")");
    var guid = rs.guid;
    var that = _Fs_items[guid];
    if (that) {
        that.onSelectChange(rs);
    }
}
/**
 * 插件回调 出错回调
 * @param params
 * @private
 */
function _SyswareFS_OnError(params) {
    var rs = eval("(" + params + ")");
    var guid = rs.guid;
    var that = _Fs_items[guid];
    if (that) {
        that.onError(rs);
    }
}
/**
 * 插件回调 文件上传完毕回调
 * @param params
 * @private
 */
function _SyswareFS_OnUploadFinish(params) {
    var rs = eval("(" + params + ")");
    var guid = rs.guid;
    var that = _Fs_items[guid];
    if (that) {
        that.onUploadFinish(rs);
    }
};

(function ($) {
    $.fn.SyswareFileUpload = function (option) {
        var processor;//html5方式或插件方式的处理器
        var defaultOptions = {
            url: option.fsdUrl,
            base64Upload: false,
            sliceSize: option.sliceSize || 3 * 1024 * 1024,
            lastUnFinishedUpload: option.lastUnFinishedUpload,
            onSocketOpen: option.onSocketOpen,
            onSocketClose: option.onSocketClose,
            onSocketMessage: option.onSocketMessage,
            onGetMD5CodeProgressChange: option.onGetMD5CodeProgressChange,//上传进度
            onCheckProgressChange: option.onCheckProgressChange,
            onUploadProgressChange: option.onUploadProgressChange,
            onSelectChange: option.onSelectChange,
            onUploadFinish: option.onUploadFinish,
            onError: option.onError || undefined,
            downloadActivexCallBack: option.downloadActivexCallBack || undefined,
            validate: option.validate || function () {
                return true
            },
            forceUseActiveX: option.forceUseActiveX || false,
            autoUpload: true,
            tryHtml5: true
        }
        if (option.autoUpload != undefined) {
            defaultOptions.autoUpload = option.autoUpload;
        }

        if (!defaultOptions.forceUseActiveX && window.WebSocket) {//尝试HTML5的方式
            processor = new Html5UploadProcess(defaultOptions);
            processor.process($(this))
        } else {
            var pluginInstalled = false;
            try {
                pluginInstalled = true;
                new ActiveXObject("Sysware.SyswareFilePlugin.1")
            } catch (e) {
                pluginInstalled = false;
            }
            var mimetype = navigator.mimeTypes["application/x-syswarefileplugin"];
            if (mimetype) {
                var plugin = mimetype.enabledPlugin;
                if (plugin) {
                    pluginInstalled = true;
                }
            } else {
                pluginInstalled = pluginInstalled || false;
            }

            if (!pluginInstalled) {
                if (defaultOptions.downloadActivexCallBack) {
                    defaultOptions.downloadActivexCallBack("http://" + defaultOptions.url + "/SYSWARE.FilePlugin_V1.0.1_CN_32bit.exe");
                }
                return false;
            }
            //插件方式调用，插件只加载一次，插件的回调函数是全局函数
            //通过guid来确定是哪次文件
            var guid = "guid_" + new Date().getTime();
            option.guid = guid;
            processor = new SyswareFsClientProcess(guid, defaultOptions);
            _Fs_items[guid] = processor;
            processor.process($(this));
            window.onbeforeunload = function () {
                processor.stop();
            }


        }

        /**
         * 以客户端插件方式上传
         * @param _guid
         * @param _defaultOptions
         * @constructor
         */

        function SyswareFsClientProcess(_guid, _defaultOptions) {
            var obj;
            this.defaultOptions = _defaultOptions;
            var fileName;
            this.guid = _guid;
            var fileParams;
            /**
             * 文件选中回调
             * @param params
             */
            this.onSelectChange = function (params) {
                fileName = params.fileName;
                fileParams = params;
                var rs = {fileName: params.fileName, fileSize: params.fileLength};
                if (_defaultOptions.onSelectChange) {
                    _defaultOptions.onSelectChange(rs);
                }
                if (defaultOptions.autoUpload) {
                    if (_defaultOptions.validate(rs)) {
                        obj.UploadToFileServer(JSON.stringify(params));
                    }
                }

            }
            /**
             * 手动调用上传
             */
            this.startUpload = function () {
                if (fileParams && obj) {
                    if (_defaultOptions.validate(rs)) {
                        obj.UploadToFileServer(JSON.stringify(fileParams));
                    }
                }
            };
            /**
             * 返回插件对象
             * @returns {*}
             */
            this.getPluginObject = function () {
                return obj;
            }

            this.onGetMD5CodeProgressChange = function (params) {
                if (_defaultOptions.onGetMD5CodeProgressChange) {
                    _defaultOptions.onGetMD5CodeProgressChange({progress: params.progress});
                }
            }

            /**
             * 上传进度
             * @param params 插件返回的json
             */
            this.onUploadProgressChange = function (params) {

                if (_defaultOptions.onUploadProgressChange) {
                    _defaultOptions.onUploadProgressChange({progress: params.progress});
                }
            }
            /**
             * 上传完整性检查进度
             * @param params
             */
            this.onCheckProgressChange = function (params) {
                if (_defaultOptions.onCheckProgressChange) {
                    _defaultOptions.onCheckProgressChange({progress: params.progress});
                }
            }
            /**
             * 上传出错回调
             * @param params
             */
            this.onError = function (params) {
                if (_defaultOptions.onError) {
                    _defaultOptions.onError({errorMessage: params.errorMessage});
                }
            }
            /**
             * 上传完成回调
             * @param params
             */
            this.onUploadFinish = function (params) {
                if (_defaultOptions.onUploadFinish) {
                    _defaultOptions.onUploadFinish({fileId: params.fileID, success: params.uploadStatus});
                }

            }
            /**
             * 处理上传过程
             * @param el
             */
            this.process = function (el) {

                if (!$("#syswarefileclientplguin")[0]) {//如果插件没被加载过，加载插件
                    var plugin = '<object id="syswarefileclientplguin" type="application/x-syswarefileplugin" width="0" height="0"></object>';
                    $("body").append(plugin);
                }
                if (defaultOptions.autoUpload) {
                    upload(this.defaultOptions)
                }
            }
            /**
             * 调用插件开始上传
             * @param __defaultOptions
             */

            function upload(__defaultOptions) {
                var url = "http://" + __defaultOptions.url;
                var param = "{url:'" + url + "',guid:'" + _guid + "',fileFilter:''}";
                try {
                    obj = document.getElementById("syswarefileclientplguin");
                    if (obj) {
                        //console.log("syswarefileclientplguin");
                        //obj.UploadFile(param);
                        obj.SelectedFile(param);


                    } else {
                        //console.log(" no  syswarefileclientplguin");
                    }
                } catch (e) {
                    if (_defaultOptions.onError) {
                        _defaultOptions.onError({errorMessage: e});
                    }
                }


            }

            this.stop = function () {
                if (obj) {
                    obj.StopUploadFile("{'guid':'" + _guid + "'}");
                }
            }
        }

        /**
         * html5方式上传
         * @param _defaultOptions
         * @constructor
         */
        function Html5UploadProcess(_defaultOptions) {
            var socket;
            var suffix;
            this.defaultOptions = _defaultOptions;
            /**
             * 开始上传
             * @param files
             */
            this.startUpload = function (files) {
                if (window.WebSocket) {

                    $.getJSON("http://" + _defaultOptions.url + "/fileServerDiscovery/rest/getServer_j.do?jsoncallback=?", function (response) {
                        if (response.success) {
                            upload(files, response.data.uri);
                        } else {
                            if (defaultOptions.onError) {
                                defaultOptions.onError({errorMessage: "没有可用的文件服务器!"});
                            }
                        }
                    })
                } else {
                }
                if (_defaultOptions.onSelectChange) {
                    _defaultOptions.onSelectChange({fileName: files[0].name, fileSize: files[0].size});
                }

            }
            this.uploadBase64Img = function (base64Code, _suffix) {
                suffix = _suffix;
                defaultOptions.base64Upload = true;
                var blob = convertBase64UrlToBlob(base64Code, suffix);
                var ar = [];
                ar.push(blob);
                this.startUpload(ar);
            }
            this.process = function (el) {
                var that = this;
                el.off("change");
                el.on("change", function () {
                    if (defaultOptions.autoUpload) {
                        var files = el[0].files;
                        that.startUpload(files);
                    }
                });
            }

            /**
             * base64码转blob
             * @param urlData
             * @returns {*}
             */
            function convertBase64UrlToBlob(urlData, suffix) {
                var bytes = window.atob(urlData.split(',')[1]);
                var ab = new ArrayBuffer(bytes.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < bytes.length; i++) {
                    ia[i] = bytes.charCodeAt(i);
                }
                return new Blob([ab], {type: 'image/' + suffix});
            }

            function upload(_files, uri) {
                var files = _files;
                for (i = 0; i < files.length; i++) {
                    socket = new SyswareWebsocket();


                    socket.sendFile(files[i]);

                }

                this.stop = function () {
                    if (socket) {
                        socket.stop();
                    }
                }

                function SyswareWebsocket() {
                    var websocket;
                    var uploadState = 0;//0未上传 1正在上传
                    var startSize, endSize = 0;
                    var paragraph = defaultOptions.sliceSize;
                    var _url;

                    this.stop = function () {
                        if (websocket) {
                            websocket.close();
                        }
                    }

                    /**
                     * 通过websocket上传文件内容
                     * @param file
                     * @param fileId
                     */
                    function doUploadFile(file, fileId, uploadedSize) {
                        if (uploadedSize) {
                            endSize = uploadedSize;
                        }
                        if (file) {
                            //将上传状态设置成1
                            uploadState = 1;
                            var reader = new FileReader();
                            reader.onload = function loaded(evt) {
                                var ArrayBuffer = evt.target.result;
                                websocket.send(ArrayBuffer);
                            };
                            if (endSize < file.size) {
                                startSize = endSize;
                                if (paragraph > (file.size - endSize)) {
                                    endSize = file.size;
                                } else {
                                    endSize += paragraph;
                                }
                                if (file.webkitSlice) {
                                    blob = file.webkitSlice(startSize, endSize);
                                } else
                                    blob = file.slice(startSize, endSize);
                                reader.readAsArrayBuffer(blob);
                            }
                        }
                    }

                    function getMd5Code(file, done) {
                        var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webketSlice;
                        var chunkSize = defaultOptions.sliceSize;
                        var chunks = Math.ceil(file.size / chunkSize);
                        var currentChunk = 0;
                        var spark = new SparkMD5.ArrayBuffer();

                        function loadNext() {
                            var fileReader = new FileReader();
                            fileReader.onload = function (e) {
                                spark.append(e.target.result)
                                currentChunk++;
                                if (currentChunk < chunks) {
                                    loadNext();
                                } else {
                                    var md5Code = spark.end();
                                    if (defaultOptions.onGetMD5CodeProgressChange) {
                                        setTimeout(function () {
                                            defaultOptions.onGetMD5CodeProgressChange({progress: 100});
                                        }, 0);

                                    }
                                    done(md5Code);
                                }

                            }
                            fileReader.onerror = function (e) {
                                if (defaultOptions.onError) {
                                    defaultOptions.onError({errorMessage: e});
                                }
                                done(null);
                            }
                            var start = currentChunk * chunkSize;
                            var progress = Math.floor((start / file.size) * 100);
                            if (defaultOptions.onCheckProgressChange) {
                                setTimeout(function () {
                                    defaultOptions.onGetMD5CodeProgressChange({progress: progress});
                                }, 0);

                            }
                            var end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
                            fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
                        }

                        loadNext();
                    }


                    /**
                     * 创建socket发送文件
                     * @param fileInfo
                     */
                    function socketSendFile(file, fileInfo) {
                        websocket = new WebSocket(_url + "/websocket/fileup");
                        websocket.onopen = function () {
                            if (defaultOptions.onSocketOpen) {
                                defaultOptions.onSocketOpen();
                            }
                            console.log("onopen");
                            websocket.send(fileInfo);//发送文件的基本信息 文件名，大小，md5校验码
                        }
                        websocket.onclose = function () {
                            if (defaultOptions.onSocketClose) {
                                defaultOptions.onSocketClose();
                            }
                        }
                        websocket.onerror = function (e) {
                            if (defaultOptions.onError) {
                                defaultOptions.onError({errorMessage: e});
                            }
                            console.log("onerror");

                        }
                        /**
                         * 处理服务器返回的握手信息
                         */
                        function processHandShakeState(data) {
                            if (data.fileExists) {
                                if (defaultOptions.onUploadProgressChange) {
                                    defaultOptions.onUploadProgressChange({progress: 100});
                                }
                                websocket.close();
                                if (defaultOptions.onUploadFinish) {
                                    defaultOptions.onUploadFinish({fileId: data.fileId, success: true});
                                }
                                return;
                            }
                            doUploadFile(file, data.fileId, data.size);//开始上传文件数据
                        }

                        /**
                         * 正在发送文件数据
                         * @param data
                         */
                        function processSendingState(data) {
                            if (defaultOptions.onUploadProgressChange) {
                                var percent = data.percent;
                                setTimeout(function () {
                                    defaultOptions.onUploadProgressChange({progress: percent});
                                }, 0);
                            }
                            doUploadFile(file, data.fileId, data.size);

                        }

                        /**
                         * 文件实体已经全部发送到服务器
                         */
                        function processSendOverState() {
                            if (defaultOptions.onUploadProgressChange) {
                                var percent = data.percent;
                                setTimeout(function () {
                                    defaultOptions.onUploadProgressChange({progress: percent});
                                }, 0);
                            }
                        }

                        /**
                         * 服务端正在数据完整性校验
                         * @param data
                         */
                        function processCheckingState(data) {
                            if (defaultOptions.onCheckProgressChange) {
                                setTimeout(function () {
                                    defaultOptions.onCheckProgressChange({progress: data.percent});
                                }, 0);
                            }
                        }

                        /**
                         *
                         * @param data
                         */
                        function processCheckOverState(data) {
                            websocket.close();
                            if (data.checkResult) {
                                if (defaultOptions.onUploadFinish) {
                                    defaultOptions.onUploadFinish({fileId: data.fileId, success: true});
                                }
                            } else {
                                defaultOptions.onUploadFinish({fileId: undefined, success: false});
                            }

                        }

                        websocket.onmessage = function (event) {
                            console.log("onmessage");
                            if (defaultOptions.onSocketMessage) {
                                defaultOptions.onSocketMessage(event.data);
                            }
                            //console.log(event.data);
                            var responseMessage = eval('(' + event.data + ')');
                            if (responseMessage && responseMessage.success && responseMessage.data) {
                                var data = responseMessage.data;
                                if (data.dataType == "handshake") {
                                    processHandShakeState(data);
                                } else if (data.dataType == "checking") {
                                    processCheckingState(data);
                                } else if (data.dataType == "checkover") {
                                    processCheckOverState(data);
                                } else if (data.dataType == "sending") {
                                    processSendingState(data);
                                } else if (data.dataType == "sendover") {
                                    if (defaultOptions.onCheckProgressChange) {
                                        defaultOptions.onCheckProgressChange({progress: 100});
                                    }
                                }
                            }
                        }
                    }

                    this.sendFile = function (file) {
                        if(window.location.protocol=="https"){
                            _url = "wss://" + uri;
                        }else{
                            _url = "ws://" + uri;
                        }
                        getMd5Code(file, function (md5Code) {
                            if (md5Code) {
                                var fileId = "";
                                var groupName = "group1";
                                var fileAttrs = {
                                    fileId: fileId,
                                    fileName: file.name || new Date().getTime() + "." + suffix,
                                    fileSize: file.size,
                                    md5Code: md5Code,
                                    groupName: groupName
                                }
                                if (defaultOptions.validate != undefined && defaultOptions.validate({
                                        fileName: file.name,
                                        fileSize: file.size,
                                        md5:md5Code
                                    })) {
                                    socketSendFile(file, JSON.stringify(fileAttrs));//发送文件的基本信息 文件名，大小，校验码
                                }
                            }
                        });
                    }
                }
            }


        }

        return processor;
    };
})(jQuery);