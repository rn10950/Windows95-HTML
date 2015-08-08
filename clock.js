// Clock Functions (for taskbar clock)
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function civilTime(h) {
	if (h > 12) {
		h = h - 12;
	} else if (h == 0) {
		h = 12;
	}
	return h;
}
function ampm(h) {
	if(h < 12) {
		var a = 'AM';
	} else {
		var a = 'PM';
	}
	return a;
}
function updateClock ( )
	{
	var d = new Date();
    var x = document.getElementById("win_clock");
    var h = civilTime(d.getHours());
    var m = addZero(d.getMinutes());
	var a = ampm(d.getHours());
    x.innerHTML = h + ":" + m + ' ' + a;
	}