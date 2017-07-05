/** layui-v0.1.5 跨设备模块化前端框架@LGPL www.layui.com By 贤心 */
;layui.define(["jquery","layer","laytpl","upload"],function(i){var a="2.0.85",e=layui.jquery,t=layui.layer,l=layui.laytpl,n="layim-show",s="layim-this",o={},r=function(){this.v=a,e("body").on("click","*[layim-event]",function(i){var a=e(this),t=a.attr("layim-event");Y[t]?Y[t].call(this,a,i):""})};r.prototype.config=function(i){var a=[];return layui.each(Array(4),function(i){a.push(layui.cache.dir+"css/modules/layim/skin/"+(i+1)+".jpg")}),i=i||{},i.skin=i.skin||[],layui.each(i.skin,function(i,e){a.unshift(e)}),i.skin=a,i=e.extend({isfriend:!0,isgroup:!0},i),window.JSON&&window.JSON.parse?(C(i),this):void 0},r.prototype.on=function(i,a){return"function"==typeof a&&(o[i]?o[i].push(a):o[i]=[a]),this},r.prototype.cache=function(){return w},r.prototype.chat=function(i){return window.JSON&&window.JSON.parse?(I(i),this):void 0},r.prototype.setChatMin=function(){return L(),this},r.prototype.getMessage=function(i){return N(i),this},r.prototype.addList=function(i){return z(i),this},r.prototype.removeList=function(i){return J(i),this},r.prototype.content=function(i){return layui.laytpl.content(i)};var d=function(i){var a={friend:"该分组下暂无好友",group:"暂无群组",history:"暂无历史会话"};return i=i||{},i.item=i.item||"d."+i.type,["{{# var length = 0; layui.each("+i.item+", function(i, data){ length++; }}",'<li layim-event="chat" data-type="'+i.type+'" data-index="{{ '+(i.index||"i")+' }}" id="layim-'+i.type+'{{ data.id }}"><img src="{{ data.avatar }}"><span>{{ data.username||data.groupname||data.name||"佚名" }}</span><p>{{ data.remark||data.sign||"" }}</p></li>',"{{# }); if(length === 0){ }}",'<li class="layim-null">'+(a[i.type]||"暂无数据")+"</li>","{{# } }}"].join("")},u=['<div class="layui-layim-main">','<div class="layui-layim-info">','<div class="layui-layim-user">{{ d.mine.username }}</div>','<div class="layui-layim-status">','{{# if(d.mine.status === "online"){ }}','<span class="layui-icon layim-status-online" layim-event="status" lay-type="show">&#xe617;</span>','{{# } else if(d.mine.status === "hide") { }}','<span class="layui-icon layim-status-hide" layim-event="status" lay-type="show">&#xe60f;</span>',"{{# } }}",'<ul class="layui-anim layim-menu-box">','<li {{d.mine.status === "online" ? "class=layim-this" : ""}} layim-event="status" lay-type="online"><i class="layui-icon">&#xe618;</i><cite class="layui-icon layim-status-online">&#xe617;</cite>在线</li>','<li {{d.mine.status === "hide" ? "class=layim-this" : ""}} layim-event="status" lay-type="hide"><i class="layui-icon">&#xe618;</i><cite class="layui-icon layim-status-hide">&#xe60f;</cite>隐身</li>',"</ul>","</div>",'<p class="layui-layim-remark" title="{{# if(d.mine.sign){ }}{{d.mine.sign}}{{# } }}">{{ d.mine.remark||d.mine.sign||"你很懒，没有写签名" }}</p>',"</div>",'<ul class="layui-layim-tab{{# if(!d.base.isfriend || !d.base.isgroup){ }}'," layim-tab-two",'{{# } }}">','<li class="layui-icon',"{{# if(!d.base.isfriend){ }}"," layim-hide","{{# } else { }}"," layim-this","{{# } }}",'" title="联系人" layim-event="tab" lay-type="friend">&#xe612;</li>','<li class="layui-icon',"{{# if(!d.base.isgroup){ }}"," layim-hide","{{# } else if(!d.base.isfriend) { }}"," layim-this","{{# } }}",'" title="群组" layim-event="tab" lay-type="group">&#xe613;</li>','<li class="layui-icon" title="历史会话" layim-event="tab" lay-type="history">&#xe611;</li>',"</ul>",'<ul class="layim-tab-content {{# if(d.base.isfriend){ }}layim-show{{# } }} layim-list-friend">','{{# layui.each(d.friend, function(index, item){ var spread = d.local["spread"+index]; }}',"<li>",'<h5 layim-event="spread" lay-type="{{ spread }}"><i class="layui-icon">{{# if(spread === "true"){ }}&#xe61a;{{# } else {  }}&#xe602;{{# } }}</i><span>{{ item.groupname||"未命名分组"+index }}</span><em>(<cite class="layim-count"> {{ (item.list||[]).length }}</cite>)</em></h5>','<ul class="layui-layim-list {{# if(spread === "true"){ }}'," layim-show",'{{# } }}">',d({type:"friend",item:"item.list",index:"index"}),"</ul>","</li>","{{# }); if(d.friend.length === 0){ }}",'<li><ul class="layui-layim-list layim-show"><li class="layim-null">暂无联系人</li></ul>',"{{# } }}","</ul>",'<ul class="layim-tab-content {{# if(!d.base.isfriend && d.base.isgroup){ }}layim-show{{# } }}">',"<li>",'<ul class="layui-layim-list layim-show layim-list-group">',d({type:"group"}),"</ul>","</li>","</ul>",'<ul class="layim-tab-content  {{# if(!d.base.isfriend && !d.base.isgroup){ }}layim-show{{# } }}">',"<li>",'<ul class="layui-layim-list layim-show layim-list-history">',d({type:"history"}),"</ul>","</li>","</ul>",'<ul class="layim-tab-content">',"<li>",'<ul class="layui-layim-list layim-show" id="layui-layim-search"></ul>',"</li>","</ul>",'<ul class="layui-layim-tool">','<li class="layui-icon layim-tool-search" layim-event="search" title="搜索">&#xe615;</li>','<li class="layui-icon layim-tool-skin" layim-event="skin" title="换肤">&#xe61b;</li>',"{{# if(d.base.find){ }}",'<li class="layui-icon layim-tool-find" layim-event="find" title="查找">&#xe61f;</li>',"{{# } }}","{{# if(!d.base.copyright){ }}",'<li class="layui-icon layim-tool-about" layim-event="about" title="关于">&#xe60b;</li>',"{{# } }}","</ul>",'<div class="layui-layim-search"><input><label class="layui-icon" layim-event="closeSearch">&#x1007;</label></div>',"</div>"].join(""),c=['<ul class="layui-layim-skin">',"{{# layui.each(d.skin, function(index, item){ }}",'<li><img layim-event="setSkin" src="{{ item }}"></li>',"{{# }); }}",'<li layim-event="setSkin"><cite>默认</cite></li>',"</ul>"].join(""),y=['<div class="layim-chat layim-chat-{{d.data.type}}">','<div class="layim-chat-title">','<a class="layim-chat-other">','<img src="{{ d.data.avatar }}"><span layim-event="{{ d.data.type==="group" ? "groupMembers" : "" }}">{{ d.data.name||"佚名" }} {{d.data.temporary ? "<cite>临时会话</cite>" : ""}} {{# if(d.data.type==="group"){ }} <em class="layim-chat-members"></em><i class="layui-icon">&#xe61a;</i> {{# } }}</span>',"</a>","</div>",'<div class="layim-chat-main">',"<ul></ul>","</div>",'<div class="layim-chat-footer">','<div class="layim-chat-tool" data-json="{{encodeURIComponent(JSON.stringify(d.data))}}">','<span class="layui-icon layim-tool-face" title="选择表情" layim-event="face">&#xe60c;</span>','<span class="layui-icon layim-tool-image" title="上传图片" layim-event="image">&#xe60d;<input type="file" name="file"></span>',"{{# if(d.base && d.base.uploadFile){ }}",'<span class="layui-icon layim-tool-image" title="发送文件" layim-event="image" data-type="file">&#xe61d;<input type="file" name="file"></span>',"{{# }; }}","{{# if(d.base && d.base.chatLog){ }}",'<span class="layim-tool-log" layim-event="chatLog"><i class="layui-icon">&#xe60e;</i>聊天记录</span>',"{{# }; }}","</div>",'<div class="layim-chat-textarea"><textarea></textarea></div>','<div class="layim-chat-bottom">','<div class="layim-chat-send">',"{{# if(!d.base.brief){ }}",'<span class="layim-send-close" layim-event="closeThisChat">关闭</span>',"{{# } }}",'<span class="layim-send-btn" layim-event="send">发送</span>','<span class="layim-send-set" layim-event="setSend" lay-type="show"><em class="layui-edge"></em></span>','<ul class="layui-anim layim-menu-box">','<li {{d.local.sendHotKey !== "Ctrl+Enter" ? "class=layim-this" : ""}} layim-event="setSend" lay-type="Enter"><i class="layui-icon">&#xe618;</i>按Enter键发送消息</li>','<li {{d.local.sendHotKey === "Ctrl+Enter" ? "class=layim-this" : ""}} layim-event="setSend"  lay-type="Ctrl+Enter"><i class="layui-icon">&#xe618;</i>按Ctrl+Enter键发送消息</li>',"</ul>","</div>","</div>","</div>","</div>"].join(""),m=layui.laytpl.digit=function(i){return 10>i?"0"+(0|i):i};layui.laytpl.date=function(i){var a=new Date(i||new Date);return a.getFullYear()+"-"+m(a.getMonth()+1)+"-"+m(a.getDate())+" "+m(a.getHours())+":"+m(a.getMinutes())+":"+m(a.getSeconds())},layui.laytpl.content=function(i){var a=function(i){return new RegExp("\\n*\\["+(i||"")+"(pre|div|p|table|thead|th|tbody|tr|td|ul|li|ol|li|dl|dt|dd|h2|h3|h4|h5)([\\s\\S]*?)\\]\\n*","g")};return i=(i||"").replace(/&(?!#?[a-zA-Z0-9]+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;").replace(/"/g,"&quot;").replace(/@(\S+)(\s+?|$)/g,'@<a href="javascript:;">$1</a>$2').replace(/\s{2}/g,"&nbsp").replace(/img\[([^\s]+?)\]/g,function(i){return'<img class="layui-layim-photos" src="'+i.replace(/(^img\[)|(\]$)/g,"")+'">'}).replace(/file\([\s\S]+?\)\[[\s\S]*?\]/g,function(i){var a=(i.match(/file\(([\s\S]+?)\)\[/)||[])[1],e=(i.match(/\)\[([\s\S]*?)\]/)||[])[1];return a?'<a class="layui-layim-file" href="'+a+'" target="_blank"><i class="layui-icon">&#xe61e;</i><cite>'+(e||a)+"</cite></a>":i}).replace(/face\[([^\s\[\]]+?)\]/g,function(i){var a=i.replace(/^face/g,"");return'<img alt="'+a+'" title="'+a+'" src="'+R[a]+'">'}).replace(/a\([\s\S]+?\)\[[\s\S]*?\]/g,function(i){var a=(i.match(/a\(([\s\S]+?)\)\[/)||[])[1],e=(i.match(/\)\[([\s\S]*?)\]/)||[])[1];return a?'<a href="'+a+'" target="_blank">'+(e||a)+"</a>":i}).replace(a(),"<$1 $2>").replace(a("/"),"</$1>").replace(/\n/g,"<br>")};var f,p,h,v,g,b=['<li {{ d.mine ? "class=layim-chat-mine" : "" }}>','<div class="layim-chat-user"><img src="{{ d.avatar }}"><cite>',"{{# if(d.mine){ }}",'<i>{{ layui.laytpl.date(d.timestamp) }}</i>{{ d.username||"佚名" }}',"{{# } else { }}",'{{ d.username||"佚名" }}<i>{{ layui.laytpl.date(d.timestamp) }}</i>',"{{# } }}","</cite></div>",'<div class="layim-chat-text">{{ layui.laytpl.content(d.content||"&nbsp") }}</div>',"</li>"].join(""),x='<li class="layim-chatlist-{{ d.data.type }}{{ d.data.id }} layim-this" layim-event="tabChat"><img src="{{ d.data.avatar }}"><span>{{ d.data.name||"佚名" }}</span>{{# if(!d.base.brief){ }}<i class="layui-icon" layim-event="closeChat">&#x1007;</i>{{# } }}</li>',k=function(i,a,l){return i=i||{},e.ajax({url:i.url,type:i.type||"get",data:i.data,dataType:i.dataType||"json",cache:!1,success:function(i){0==i.code?a&&a(i.data||{}):t.msg(i.msg||(l||"Error")+": LAYIM_NOT_GET_DATA",{time:5e3})},error:function(i,a){window.console&&console.log&&console.error("LAYIM_DATE_ERROR："+a)}})},w={message:{},chat:[]},C=function(i){var a=i.mine||{},t=layui.data("layim")[a.id]||{},n={base:i,local:t,mine:a,history:t.history||{}};return w=e.extend(w,n),i.brief?layui.each(o.ready,function(i,a){a&&a(n)}):void k(i.init,function(a){var t=i.mine||a.mine||{},n=layui.data("layim")[t.id]||{},s={base:i,local:n,mine:t,friend:a.friend||[],group:a.group||[],history:n.history||{}};w=e.extend(w,s),S(l(u).render(s)),(n.close||i.min)&&j(),layui.each(o.ready,function(i,a){a&&a(s)})},"INIT")},S=function(i){return t.open({type:1,area:["260px","520px"],skin:"layui-box layui-layim",title:"&#8203;",offset:"rb",id:"layui-layim",shade:!1,moveType:1,shift:2,content:i,success:function(i){var a=layui.data("layim")[w.mine.id]||{},l=a.skin;f=i,f.css({"background-image":l?"url("+l+")":"none"}),w.base.right&&i.css("margin-left","-"+w.base.right),p&&t.close(p.attr("times"));var n=[],s=i.find(".layim-list-history");s.find("li").each(function(){n.push(e(this).prop("outerHTML"))}),n.length>0&&(n.reverse(),s.html(n.join(""))),T()},cancel:function(i){j();var a=layui.data("layim")[w.mine.id]||{};return a.close=!0,layui.data("layim",{key:w.mine.id,value:a}),!1}})},T=function(){f.on("contextmenu",function(i){return i.cancelBubble=!0,i.returnValue=!1,!1});var i=function(){t.closeAll("tips")};f.find(".layim-list-history").on("contextmenu","li",function(a){var l=e(this),n='<ul data-id="'+l[0].id+'" data-index="'+l.data("index")+'"><li layim-event="menuHistory" data-type="one">移除该会话</li><li layim-event="menuHistory" data-type="all">清空全部会话列表</li></ul>';l.hasClass("layim-null")||(t.tips(n,this,{tips:1,time:0,shift:5,fix:!0,skin:"layui-box layui-layim-contextmenu",success:function(i){var a=function(i){$(i)};i.off("mousedown",a).on("mousedown",a)}}),e(document).off("mousedown",i).on("mousedown",i),e(window).off("resize",i).on("resize",i))})},j=function(i){return p&&t.close(p.attr("times")),f&&f.hide(),w.mine=w.mine||{},t.open({type:1,title:!1,id:"layui-layim-close",skin:"layui-box layui-layim-min layui-layim-close",shade:!1,closeBtn:!1,shift:2,offset:"rb",content:'<img src="'+(w.mine.avatar||layui.cache.dir+"css/pc/layim/skin/logo.jpg")+'"><span>'+(i||w.base.title||"我的LayIM")+"</span>",success:function(i,a){p=i,w.base.right&&i.css("margin-left","-"+w.base.right),i.on("click",function(){t.close(a),f.show();var i=layui.data("layim")[w.mine.id]||{};delete i.close,layui.data("layim",{key:w.mine.id,value:i})})}})},I=function(i){i=i||{};var a=e("#layui-layim-chat"),n={data:i,base:w.base,local:w.local};if(!i.id)return t.msg("非法用户");if(a[0]){var s=h.find(".layim-chat-list"),r=s.find(".layim-chatlist-"+i.type+i.id);return"none"===h.css("display")&&h.show(),v&&t.close(v.attr("times")),1!==s.find("li").length||r[0]||(h.css("width","800px"),s.css("display","inline-block")),r[0]||(s.append(l(x).render(n)),a.append(l(y).render(n))),M(s.find(".layim-chatlist-"+i.type+i.id)),r[0]||D(),O(i),K(),g}var d=g=t.open({type:1,area:["600px","520px"],skin:"layui-box layui-layim-chat",id:"layui-layim-chat",title:"&#8203;",shade:!1,moveType:1,maxmin:!0,closeBtn:w.base.brief?1:1,content:l('<ul class="layim-chat-list">'+x+"</ul>"+y).render(n),success:function(a){var e=layui.data("layim")[w.mine.id]||{},l=e.skin;h=a,h.css({"background-image":l?"url("+l+")":"none"}),K(),O(i),layui.each(o.chatChange,function(i,a){a&&a(E())}),D(),q(),a.on("click",".layui-layim-photos",function(){var i=this.src;t.close(I.photosIndex),t.photos({photos:{data:[{alt:"大图模式",src:i}]},shade:.01,closeBtn:2,shift:0,success:function(i,a){I.photosIndex=a}})})},min:function(){return L(),!1},end:function(){t.closeAll("tips")}});return d},L=function(i){var a=i||E().data;h&&!i&&h.hide(),v&&t.close(v.attr("times")),t.open({type:1,title:!1,id:"layui-layim-min",skin:"layui-box layui-layim-min",shade:!1,closeBtn:!1,shift:a.shift||2,offset:e(window).height()-50,content:'<img src="'+a.avatar+'"><span>'+a.name+"</span>",success:function(a,e){i||(v=a),a.on("click",function(){t.close(e),i?layui.each(w.chat,function(i,a){I(a)}):h.show(),i&&(w.chat=[],_())})}})},M=function(i,a){i=i||e(".layim-chat-list ."+s);var l=-1===i.index()?0:i.index(),n=".layim-chat",r=h.find(n).eq(l);if(a){i.hasClass(s)&&M(0===l?i.next():i.prev()),i.remove(),r.remove();var d=h.find(n).length;return 1===d&&(h.find(".layim-chat-list").hide(),h.css("width","600px")),0===d&&t.close(g),!1}i.addClass(s).siblings().removeClass(s),r.css("display","inline-block").siblings(n).hide(),r.find("textarea").focus(),layui.each(o.chatChange,function(i,a){a&&a(E())}),q()},q=function(){var i=E(),a=w.message[i.data.type+i.data.id];a&&delete w.message[i.data.type+i.data.id]},E=function(){var i=e(".layim-chat-list ."+s).index(),a=h.find(".layim-chat").eq(i),t=JSON.parse(decodeURIComponent(a.find(".layim-chat-tool").data("json")));return{elem:a,data:t,textarea:a.find("textarea")}},O=function(i){var a=layui.data("layim")[w.mine.id]||{},e={},t=a.history||{},n=t[i.type+i.id];if(f){var s=f.find(".layim-list-history");if(i.historyTime=(new Date).getTime(),t[i.type+i.id]=i,a.history=t,layui.data("layim",{key:w.mine.id,value:a}),!n){e[i.type+i.id]=i;var o=l(d({type:"history",item:"d.data"})).render({data:e});s.prepend(o),s.find(".layim-null").remove()}}},H=function(){var i={username:w.mine?w.mine.username:"访客",avatar:w.mine?w.mine.avatar:layui.cache.dir+"css/pc/layim/skin/logo.jpg",id:w.mine?w.mine.id:null,mine:!0},a=E(),e=a.elem.find(".layim-chat-main ul"),n=w.base.maxLength||3e3;if(i.content=a.textarea.val(),""!==i.content.replace(/\s/g,"")){if(i.content.length>n)return t.msg("内容最长不能超过"+n+"个字符");e.append(l(b).render(i));var s={mine:i,to:a.data},r={username:s.mine.username,avatar:s.mine.avatar,id:s.to.id,type:s.to.type,content:s.mine.content,timestamp:(new Date).getTime(),mine:!0};A(r),layui.each(o.sendMessage,function(i,a){a&&a(s)})}_(),a.textarea.val("").focus()},N=function(i){i=i||{};var a=e(".layim-chatlist-"+i.type+i.id),t={},n=a.index();if(i.timestamp=i.timestamp||(new Date).getTime(),A(i),!h&&i.content||-1===n){if(w.message[i.type+i.id])w.message[i.type+i.id].push(i);else if(w.message[i.type+i.id]=[i],"friend"===i.type){var s;layui.each(w.friend,function(a,e){return layui.each(e.list,function(a,e){return e.id==i.id?(e.type="friend",e.name=e.username,w.chat.push(e),s=!0):void 0}),s?!0:void 0}),s||(i.name=i.username,i.temporary=!0,w.chat.push(i))}else if("group"===i.type){var o;layui.each(w.group,function(a,e){return e.id==i.id?(e.type="group",e.name=e.groupname,w.chat.push(e),o=!0):void 0}),o||(i.name=i.groupname,w.chat.push(i))}else i.name=i.name||i.username||i.groupname,w.chat.push(i);return"group"===i.type&&layui.each(w.group,function(a,e){return e.id==i.id?(t.avatar=e.avatar,!0):void 0}),L({name:"收到新消息",avatar:t.avatar||i.avatar,shift:6})}var r=E();r.data.type+r.data.id!==i.type+i.id&&(a.addClass("layui-anim layer-anim-06"),setTimeout(function(){a.removeClass("layui-anim layer-anim-06")},300));var d=h.find(".layim-chat").eq(n),u=d.find(".layim-chat-main ul");""!==i.content.replace(/\s/g,"")&&u.append(l(b).render(i)),_()},A=function(i){var a=layui.data("layim")[w.mine.id]||{},e=a.chatlog||{};e[i.type+i.id]?(e[i.type+i.id].push(i),e[i.type+i.id].length>50&&e[i.type+i.id].shift()):e[i.type+i.id]=[i],a.chatlog=e,layui.data("layim",{key:w.mine.id,value:a})},D=function(){var i=layui.data("layim")[w.mine.id]||{},a=E(),e=i.chatlog||{},t=a.elem.find(".layim-chat-main ul");layui.each(e[a.data.type+a.data.id],function(i,a){t.append(l(b).render(a))}),_()},z=function(i){var a,e=f.find(".layim-list-"+i.type),n={};if(w[i.type])if("friend"===i.type)layui.each(w.friend,function(e,l){return i.groupid==l.id?(layui.each(w.friend[e].list,function(e,t){return t.id==i.id?a=!0:void 0}),a?t.msg("好友 ["+(i.username||"")+"] 已经存在列表中",{shift:6}):(w.friend[e].list=w.friend[e].list||[],n[w.friend[e].list.length]=i,i.groupIndex=e,w.friend[e].list.push(i),!0)):void 0});else if("group"===i.type){if(layui.each(w.group,function(e,t){return t.id==i.id?a=!0:void 0}),a)return t.msg("您已是 ["+(i.groupname||"")+"] 的群成员",{shift:6});n[w.group.length]=i,w.group.push(i)}if(!a){var s=l(d({type:i.type,item:"d.data",index:"friend"===i.type?"data.groupIndex":null})).render({data:n});if("friend"===i.type){var o=e.find(">li").eq(i.groupIndex);o.find(".layui-layim-list").append(s),o.find(".layim-count").html(w.friend[i.groupIndex].list.length),o.find(".layim-null")[0]&&o.find(".layim-null").remove()}else"group"===i.type&&(e.append(s),e.find(".layim-null")[0]&&e.find(".layim-null").remove())}},J=function(i){var a=f.find(".layim-list-"+i.type);w[i.type]&&("friend"===i.type?layui.each(w.friend,function(e,t){layui.each(t.list,function(t,l){if(i.id==l.id){var n=a.find(">li").eq(e);n.find(".layui-layim-list>li");return n.find(".layui-layim-list>li").eq(t).remove(),w.friend[e].list.splice(t,1),n.find(".layim-count").html(w.friend[e].list.length),0===w.friend[e].list.length&&n.find(".layui-layim-list").html('<li class="layim-null">该分组下已无好友了</li>'),!0}})}):"group"===i.type&&layui.each(w.group,function(e,t){return i.id==t.id?(a.find(">li").eq(e).remove(),w.group.splice(e,1),0===w.group.length&&a.html('<li class="layim-null">暂无群组</li>'),!0):void 0}))},_=function(){var i=E(),a=i.elem.find(".layim-chat-main"),e=a.find("ul");if(e.find("li").length>=50){var t=e.find("li").eq(0);e.prev().hasClass("layim-chat-system")||e.before('<div class="layim-chat-system"><span layim-event="chatLog">查看更多记录</span></div>'),t.remove()}a.scrollTop(a[0].scrollHeight),a.find("ul li:last").find("img").load(function(){a.scrollTop(a[0].scrollHeight)})},K=function(){var i=E(),a=i.textarea;a.focus(),a.off("keydown").on("keydown",function(i){var e=layui.data("layim")[w.mine.id]||{},t=i.keyCode;if("Ctrl+Enter"===e.sendHotKey)return void(i.ctrlKey&&13===t&&H());if(13===t){if(i.ctrlKey)return a.val(a.val()+"\n");if(i.shiftKey)return;i.preventDefault(),H()}})},R=function(){var i=["[微笑]","[嘻嘻]","[哈哈]","[可爱]","[可怜]","[挖鼻]","[吃惊]","[害羞]","[挤眼]","[闭嘴]","[鄙视]","[爱你]","[泪]","[偷笑]","[亲亲]","[生病]","[太开心]","[白眼]","[右哼哼]","[左哼哼]","[嘘]","[衰]","[委屈]","[吐]","[哈欠]","[抱抱]","[怒]","[疑问]","[馋嘴]","[拜拜]","[思考]","[汗]","[困]","[睡]","[钱]","[失望]","[酷]","[色]","[哼]","[鼓掌]","[晕]","[悲伤]","[抓狂]","[黑线]","[阴险]","[怒骂]","[互粉]","[心]","[伤心]","[猪头]","[熊猫]","[兔子]","[ok]","[耶]","[good]","[NO]","[赞]","[来]","[弱]","[草泥马]","[神马]","[囧]","[浮云]","[给力]","[围观]","[威武]","[奥特曼]","[礼物]","[钟]","[话筒]","[蜡烛]","[蛋糕]"],a={};return layui.each(i,function(i,e){a[e]=layui.cache.dir+"images/face/"+i+".gif"}),a}(),$=function(i){i=i||window.event,i.stopPropagation?i.stopPropagation():i.cancelBubble=!0},B=function(i,a){var e,t=i.value;i.focus(),document.selection?(e=document.selection.createRange(),document.selection.empty(),e.text=a):(e=[t.substring(0,i.selectionStart),a,t.substr(i.selectionEnd)],i.focus(),i.value=e.join(""))},F="layui-anim-up",Y={status:function(i,a){var t=function(){i.next().hide().removeClass(F)},l=i.attr("lay-type");if("show"===l)$(a),i.next().show().addClass(F),e(document).off("click",t).on("click",t);else{var n=i.parent().prev();i.addClass(s).siblings().removeClass(s),n.html(i.find("cite").html()),n.removeClass("layim-status-"+("online"===l?"hide":"online")).addClass("layim-status-"+l),layui.each(o.online,function(i,a){a&&a(l)})}},tab:function(i){var a,e=".layim-tab-content",t=f.find(".layui-layim-tab>li");"number"==typeof i?(a=i,i=t.eq(a)):a=i.index(),a>2?t.removeClass(s):(Y.tab.index=a,i.addClass(s).siblings().removeClass(s)),f.find(e).eq(a).addClass(n).siblings(e).removeClass(n)},spread:function(i){var a=i.attr("lay-type"),e="true"===a?"false":"true",t=layui.data("layim")[w.mine.id]||{};i.next()["true"===a?"removeClass":"addClass"](n),t["spread"+i.parent().index()]=e,layui.data("layim",{key:w.mine.id,value:t}),i.attr("lay-type",e),i.find(".layui-icon").html("true"===e?"&#xe61a;":"&#xe602;")},search:function(i){var a=f.find(".layui-layim-search"),e=f.find("#layui-layim-search"),t=a.find("input"),l=function(i){var a=t.val().replace(/\s/);if(""===a)Y.tab(0|Y.tab.index);else{for(var l=[],n=w.friend||[],s=w.group||[],o="",r=0;r<n.length;r++)for(var d=0;d<(n[r].list||[]).length;d++)-1!==n[r].list[d].username.indexOf(a)&&(n[r].list[d].type="friend",n[r].list[d].index=r,n[r].list[d].list=d,l.push(n[r].list[d]));for(var u=0;u<s.length;u++)-1!==s[u].groupname.indexOf(a)&&(s[u].type="group",s[u].index=u,s[u].list=u,l.push(s[u]));if(l.length>0)for(var c=0;c<l.length;c++)o+='<li layim-event="chat" data-type="'+l[c].type+'" data-index="'+l[c].index+'" data-list="'+l[c].list+'"><img src="'+l[c].avatar+'"><span>'+(l[c].username||l[c].groupname||"佚名")+"</span><p>"+(l[c].remark||l[c].sign||"")+"</p></li>";else o='<li class="layim-null">无搜索结果</li>';e.html(o),Y.tab(3)}};!w.base.isfriend&&w.base.isgroup?Y.tab.index=1:w.base.isfriend||w.base.isgroup||(Y.tab.index=2),a.show(),t.focus(),t.off("keyup",l).on("keyup",l)},closeSearch:function(i){i.parent().hide(),Y.tab(0|Y.tab.index)},skin:function(){t.open({type:1,title:"换肤",shade:!1,area:"300px",skin:"layui-box layui-layer-border",id:"layui-layim-skin",zIndex:66666666,content:l(c).render({skin:w.base.skin})})},find:function(){t.open({type:2,title:"查找",shade:!1,area:["1000px","520px"],skin:"layui-box layui-layer-border",id:"layui-layim-find",content:w.base.find})},about:function(){t.alert("版本： "+a+'<br>版权所有：<a href="http://layim.layui.com" target="_blank">layim.layui.com</a>',{title:"关于 LayIM",shade:!1})},setSkin:function(i){var a=i.attr("src"),e=layui.data("layim")[w.mine.id]||{};e.skin=a,a||delete e.skin,layui.data("layim",{key:w.mine.id,value:e});try{f.css({"background-image":a?"url("+a+")":"none"}),h.css({"background-image":a?"url("+a+")":"none"})}catch(t){}},chat:function(i){var a=layui.data("layim")[w.mine.id]||{},e=i.data("type"),t=i.data("index"),l=i.attr("data-list")||i.index(),n={};"friend"===e?n=w[e][t].list[l]:"group"===e?n=w[e][l]:"history"===e&&(n=(a.history||{})[t]||{}),n.name=n.name||n.username||n.groupname,"history"!==e&&(n.type=e),I(n)},tabChat:function(i){M(i)},closeChat:function(i){M(i.parent(),1)},closeThisChat:function(){M(null,1)},groupMembers:function(i,a){var l=i.find(".layui-icon"),n=function(){l.html("&#xe61a;"),i.data("down",null),t.close(Y.groupMembers.index)},s=function(i){$(i)};i.data("down")?n():(l.html("&#xe619;"),i.data("down",!0),Y.groupMembers.index=t.tips('<ul class="layim-members-list"></ul>',i,{tips:3,time:0,shift:5,fix:!0,skin:"layui-box layui-layim-members",success:function(a){var t=w.base.members||{},l=E(),n="";t.data=e.extend(t.data,{id:l.data.id}),k(t,function(e){layui.each(e.list,function(i,a){n+='<li><a><img src="'+a.avatar+'"></a><p>'+a.username+"</p></li>"}),a.find(".layim-members-list").html(n),layui.each(o.members,function(i,a){a&&a(e)}),i.find(".layim-chat-members").html((e.list||[]).length+"人")}),a.on("mousedown",function(i){$(i)})}}),e(document).off("mousedown",n).on("mousedown",n),e(window).off("resize",n).on("resize",n),i.off("mousedown",s).on("mousedown",s))},send:function(){H()},setSend:function(i,a){var t=i.siblings(".layim-menu-box"),l=function(){t.hide().removeClass(F)},n=i.attr("lay-type");if("show"===n)$(a),t.show().addClass(F),e(document).off("click",l).on("click",l);else{i.addClass(s).siblings().removeClass(s);var o=layui.data("layim")[w.mine.id]||{};o.sendHotKey=n,layui.data("layim",{key:w.mine.id,value:o})}},face:function(i,a){var l="",n=E(),s=function(){t.close(Y.face.index)};for(var o in R)l+='<li title="'+o+'"><img src="'+R[o]+'"></li>';l='<ul class="layui-clear layim-face-list">'+l+"</ul>",Y.face.index=t.tips(l,i,{tips:1,time:0,fix:!0,skin:"layui-box layui-layim-face",success:function(i){i.find(".layim-face-list>li").on("mousedown",function(i){$(i)}).on("click",function(){B(n.textarea[0],"face"+this.title+" "),t.close(Y.face.index)})}}),e(document).off("mousedown",s).on("mousedown",s),e(window).off("resize",s).on("resize",s),$(a)},image:function(i){var a=i.data("type")||"images",e={images:"uploadImage",file:"uploadFile"},l=E(),n=w.base[e[a]]||{};layui.upload({url:n.url||"",method:n.type,file:i.find("input")[0],unwrap:!0,check:a,success:function(i){try{i=JSON.parse(i)}catch(e){return i={},t.msg("请对上传接口返回JSON字符")}0==i.code?(i.data=i.data||{},"images"===a?B(l.textarea[0],"img["+(i.data.src||"")+"]"):"file"===a&&B(l.textarea[0],"file("+(i.data.src||"")+")["+(i.data.name||"下载文件")+"]")):t.msg(i.msg||"上传失败")}})},chatLog:function(i){var a=E();return w.base.chatLog?(t.close(Y.chatLog.index),Y.chatLog.index=t.open({type:2,maxmin:!0,title:"与 "+a.data.name+" 的聊天记录",area:["450px","100%"],shade:!1,offset:"rb",skin:"layui-box",shift:2,id:"layui-layim-chatlog",content:w.base.chatLog+"?id="+a.data.id+"&type="+a.data.type})):t.msg("未开启更多聊天记录")},menuHistory:function(i,a){var l=layui.data("layim")[w.mine.id]||{},n=i.parent(),s=i.data("type"),o=f.find(".layim-list-history"),r='<li class="layim-null">暂无历史会话</li>';if("one"===s){var d=l.history;delete d[n.data("index")],l.history=d,layui.data("layim",{key:w.mine.id,value:l}),e("#"+n.data("id")).remove(),0===o.find("li").length&&o.html(r)}else"all"===s&&(delete l.history,layui.data("layim",{key:w.mine.id,value:l}),o.html(r));t.closeAll("tips")}};i("layim",new r)}).addcss("modules/layim/layim.css?v=2.085","skinlayimcss");