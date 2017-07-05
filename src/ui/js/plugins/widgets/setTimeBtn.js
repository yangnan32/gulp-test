zWidgets.setTimeBtn = function(data){
	var btnObj = {
		id : data.id,
		time: data.time,
		name: data.name,
		nowTime: 30,
		clickName: data.clickName
	};

	btnObj.setClick = function(){
		$(zWidgets._document).off(".setTime");
		$(zWidgets._document).on("click.setTime", "#"+btnObj.id, function(){
			btnObj.setTime(btnObj.time);
		})
	};
	btnObj.setTime = function(time){
		btnObj.nowTime = time;
		clearTimeout(btnObj.start);
		var $btn = $("#"+btnObj.id);
		if (time == 0) {
			btnObj.setClick();
			$btn.val(btnObj.name).removeClass("uiframe-cancel-btn");
			btnObj.nowTime = time;
			clearTimeout(btnObj.start);
		} else {
			$(zWidgets._document).off(".setTime");
			$btn.val(btnObj.clickName +"(" + btnObj.nowTime + ")").addClass("uiframe-cancel-btn");
			btnObj.nowTime--;
			btnObj.start = window.setTimeout(function() {
				btnObj.setTime(btnObj.nowTime)
			},1000);
		}
	};
	btnObj.setClick();
};