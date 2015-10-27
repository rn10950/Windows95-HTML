/*
	--- NOTES ---

- the window dragging class is now 'win_drag' and not 'win_window'

BUGS TO BE FIXED:
=================
 - start button needs to deactivate all windows and taskbar buttons

*/

// GLOBAL VARIABLES
var window_set = 0; // must be set to zero for proper function of the window generator
var debug = true; // debug variable, set to true for console output
var titbHeight = 18; // titlebar height in pixels
var defaultImage = "icons/default16.png"; // default taskbar and titlebar icon (16 x 16)

// AUTORUN FUNCTION (Classes and Start Menu)
$( document ).ready(function(){
	/* Environment Setup Functions */
	console.log("Window Creation Syntax: makeWindow('Icon URL', 'Window Title', 'iFrame URL', Taskbar Boolean, Resize Boolean, Width, Height);");
	if(returnBrowserEngine() == "webkit") { // add webkit/blink only functions here
		$('head').append('<link rel="stylesheet" type="text/css" href="system/webkit.css">');
	}
	// #win-container setup - height
		var winHeight = $(window).height();
		var wcHeight = winHeight - $( "#win_taskbar" ).height();
		var wcHeightCSS = "height: " + wcHeight + "px;";
		$( "#win_container" ).attr("style", wcHeightCSS);
	/* Start Menu Function */
	$( "#win_start_button" ).click(function(){
		$( "#win_start" ).toggle(0, function(){
			$( ".win_titlebar" ).toggleClass( "win_titb_start" );
			$( ".win_tb_button" ).toggleClass( "win_tb_button_start" );
			$( "#win_start_button" ).toggleClass( "win_start_button_depressed" );
			// START MENU DESELECTION BY CLICKING OUTSIDE OF START MENU
			/*if($("#win_start_button").hasClass("win_start_button_depressed") == true) {
				$(document).click(function(event) {
					if(!$(event.target).closest('#win_start').length) {
						// put hide code here
						$( ".win_titlebar" ).toggleClass( "win_titb_start" );
						$( ".win_tb_button" ).toggleClass( "win_tb_button_start" );
						$( "#win_start_button" ).toggleClass( "win_start_button_depressed" );
					}        
				})
			}*/
		});
	});
	/* minimize, maximize, close buttons */
	// MINIMIZE BUTTON
    $( "#win_container" ).on('mousedown','.win_titb_min', function() {
		$( this ).attr("src", "system/win_controls/min_dep.png");
        $( this ).mouseup(function() {
            $( this ).attr("src", "system/win_controls/min.png");
			var windc_id = $( this ).parent().attr("id");
			var windc_id_splt = windc_id.split("_");
			var win_id = windc_id_splt[2];
			var window_id = "#window_" + win_id;
			//alert( 'Window ID Number (mouseup function - min): ' + win_id );
			var win_id_i = parseInt(win_id);
			windowMin(win_id_i);
        });
	});
	// MAXIMIZE BUTTON
    $( "#win_container" ).on('mousedown','.win_titb_max', function() {
		$( this ).attr("src", "system/win_controls/max_dep.png");
        $( this ).mouseup(function() {
            $( this ).attr("src", "system/win_controls/max.png");
			var windc_id = $( this ).parent().attr("id");
			var windc_id_splt = windc_id.split("_");
			var win_id = windc_id_splt[2];
			var window_id = "#window_" + win_id;
			//alert( 'Window ID Number (mouseup function - 51) ' + win_id ); 
			windowMax(win_id);
        });
	});
	// CLOSE BUTTON
    $( "#win_container" ).on('mousedown','.win_titb_close', function() {
		$( this ).attr("src", "system/win_controls/close_dep.png");
        $( this ).mouseup(function() {
            $( this ).attr("src", "system/win_controls/close.png");
			var windc_id = $( this ).parent().attr("id");
			//alert(windc_id);
			var windc_id_splt = windc_id.split("_");
			var win_id = windc_id_splt[2];
			var window_id = "#window_" + win_id;
			//alert( 'Window ID Number (mouseup function - 51) ' + win_id ); 
			windowClose(win_id);
			/*---
			
				GIANT ASS COMMENT
				=================
			Here lies my dignity. I used many functions
			here to try to get the window to close, but 
			infact I just prefixed win_ when I wasn't
			supposed to. Remember where prefixes are
			necessary, kids!
			
			---*/
        });
	});
	// WINDOW MAXIMIZE BY DOUBLE CLICKING TITLEBAR
	$( "#win_container" ).on('dblclick','.win_titlebar', function(event) {
		if($(event.target).closest('.win_titb_controls').length > 0) { return }
		if($( this ).hasClass("nores") == false) { // makes sure the window is re-sizable
			var titlebar_id = $( this ).attr( "id" );
			var tbid_split = titlebar_id.split("_"); // splits the titlebar id by _
			var window_number = tbid_split[2]; // put window number into variable
			windowMax(window_number);
		}
	})
	// WINDOW SWITCH BY CLICKING WINDOW
	$( "#win_container" ).on('click','.win_titlebar', function(event) {
		if($(event.target).closest('.win_titb_min').length > 0) { return }
		var titlebar_id = $( this ).parent().attr( "id" );
        var tbid_split = titlebar_id.split("_"); // splits the titlebar id by _
        var window_number = tbid_split[1]; // put window number into variable
        switchTo(window_number);
	})
	// WINDOW CLOSE BY DOUBLE CLICKING TITLEBAR ICON
	$( "#win_container" ).on('dblclick','.win_titb_icon', function() {
		var titlebar_id = $( this ).parent().attr( "id" );
        var tbid_split = titlebar_id.split("_"); // splits the titlebar id by _
        var window_number = tbid_split[2]; // put window number into variable
		//alert(titlebar_id);
		//alert('icon: ' + window_number);
        switchTo(window_number);
		windowClose(window_number);
	})
	// WINDOW SWITCH BY CLICKING TASKBAR BUTTON
	$( "#win_taskbar" ).on('click','.win_tb_button', function() {
        var button_id = $( this ).attr( "id" );
        var btnid_split = button_id.split("_"); // splits the titlebar id by _
        var window_number = btnid_split[3]; // put window number into variable
        switchTo(window_number);
	})
	// WINDOW SWITCH BY CLICKING WINDOW CONTENTS
	$( "#win_container" ).on('click','.win_window', function(event) {
		if($(event.target).closest('.win_titb_min').length > 0) { return } /* disables onClick for min */
        var button_id = $( this ).attr( "id" );
        var btnid_split = button_id.split("_"); // splits the titlebar id by _
        var win_num = btnid_split[1]; // put window number into variable
        switchTo(win_num);
	})
	// WINDOW DRAGGING FUNCTION
	$( "#win_container" ).on('mouseover', function() {
		//$( this ).parent().draggable();
		$( ".win_drag" ).draggable({ 
			handle: ".win_titlebar", 
			scroll: false,
			start: function() { // switches to window being dragged
				var win_id = $( this ).attr("id") // #window_(num)
				var win_id_splt = win_id.split("_");
				var win_num = win_id_splt[1];
				switchTo(win_num);
			}
		});
	});
	// WINDOW RESIZE FUNCTION
	$( "#win_container" ).on('mouseover', function() {
		$( ".win_window" ).resizable({
			handles: "all",
			minHeight: 150,
			minWidth: 150,
			cancel: ".nores",
			start: function() { // switches to window being dragged
				var win_id = $( this ).attr("id") // #window_(num)
				var win_id_splt = win_id.split("_");
				var win_num = win_id_splt[1];
				switchTo(win_num);
			}
		});
	});
});


// WINDOW CREATION FUNCTION
function makeWindow(icon, title, frameurl, taskbar, res, wid, hei) { /* IT WORKS!!! What's the catch? */
	window_set++;
	// Add titlebar height to window height
	var winHeight = hei + titbHeight;
	// split window HTML into sections to allow concatenation
	if(res != false) { // window is resizable
		var sec1 = '<div class="win_window win_drag" id="window_';
		var sec2 = '" style="width: ' + wid + 'px; height: ' + hei + 'px;"';
		var sec3 = '><div class="win_titlebar win_titb_active" id="win_titb_';
	} else { // window is not resizable
		var sec1 = '<div class="win_window nores" id="window_';
		var sec2 = '" style="width: ' + wid + 'px; height: ' + hei + 'px;"';
		var sec3 = '><div class="win_titlebar win_titb_active nores" id="win_titb_';
	}
	var sec4 = '"><div class="win_titb_icon"><img src="';
	var sec5 = '" onerror="this.src = defaultImage"></div><div class="win_titb_text">';
	var sec6 = '</div><div class="win_titb_controls" id="win_windc_'
	// determine Window control type
    if(res != false && taskbar != false) { // all buttons
		var sec7 = '"><img src="system/win_controls/min.png" class="win_titb_min" id"_"><img src="system/win_controls/max.png" class="win_titb_max" id"_"><img src="system/win_controls/close.png" class="win_titb_close" id"_"></div></div></div>';
	} else if(res == false && taskbar == false) { // only close
		var sec7 = '"><img src="system/win_controls/close.png" class="win_titb_close" id"_"></div></div></div>';
	} else if (res == false) { // max. shaded out
		var sec7 = '"><img src="system/win_controls/min.png" class="win_titb_min" id"_"><img src="system/win_controls/max_disabled.png" class="win_titb_max_dis" id"_"><img src="system/win_controls/close.png" class="win_titb_close" id"_"></div></div></div>';
	} else if (taskbar == false) { // no minimize button
		var sec7 = '"><img src="system/win_controls/max.png" class="win_titb_max" id"_"><img src="system/win_controls/close.png" class="win_titb_close" id"_"></div></div></div>';
	}
	//var sec8 = '<iframe class="win_window_iframe" src="' + frameurl + '" id="win_window_' + window_set + '_iframe"></div>';
	// merge strings into one variable for insertion into DOM
	var insertHTML = sec1 + window_set + sec2 + window_set + sec3 + window_set + sec4 + icon + sec5 + title + sec6 + window_set + sec7;
	console.log(insertHTML);
	$( '#win_placeholder' ).after( insertHTML );
	var window_id = '#window_' + window_set; // gets the ID of current window
	var titlebar_id = '#win_titb_' + window_set; // window id in titlebar format
	// insert iframe into window
	$(document.createElement('iframe')).attr({
		id: "win_window_" + window_set + "_iframe",
		class: "win_window_iframe",
		src: frameurl
	}).appendTo( window_id );
	// window active/inactive classes
	$( '.win_window').removeClass( 'win_window_active' );
	$( '.win_window').addClass( 'win_window_inactive' );
	$( window_id ).removeClass('win_window_inactive');
	$( window_id ).addClass('win_window_active');
	// titlebar active/inactive classes
	$( '.win_titlebar').removeClass( 'win_titb_active' );
	$( '.win_titlebar').addClass( 'win_titb_inactive' );
	$( titlebar_id ).removeClass('win_titb_inactive');
	$( titlebar_id ).addClass('win_titb_active');
	if(taskbar != false) {
		//addTaskbar(window_set, 'icons/start.png', title);
		addTaskbar(window_set, icon, title);
	}
	windowCenter(window_set);
}
// BROWSER DETECTION FUNCTION
function returnBrowserEngine() {
	var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	var isFirefox = typeof InstallTrigger !== 'undefined';
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
	var isChrome = !!window.chrome && !isOpera;
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	if(isFirefox == true) {
		return "gecko";
	}
	else if(isChrome == true || isOpera == true || isSafari == true) {
		return "webkit";
	}
	else if(isIE == true) {
		return "trident";
	}
	else {
		return "unknown";
	}
}

// CSS FILE ADDITION FUNCTION
function addCSS(url) {
	$('head').append('<link rel="stylesheet" type="text/css" href="' + url + '">');
}

// TASKBAR ADDITION FUNCTION
function addTaskbar(win_id, icon, title) {
	// icon detection
	if(icon != false) {
		// icon present
		var sec1 = '<div class="win_tb_button" id="win_tb_win_';
		var sec2 = '"><div class="win_tb_icon"><img src="';
		var sec3 = '" onerror="this.src = defaultImage"></div><div class="win_tb_text">';
		var sec4 = '</div></div>';
		// merge stings into one variable for insertion into DOM
		var insertHTML = sec1 + win_id + sec2 + icon + sec3 + title + sec4;
	} else {
		// icon not present
		var placeholder = "system/images/placeholder.png";
		var sec1 = '<div class="win_tb_button" id="win_tb_win_';
		var sec2 = '"><div class="win_tb_icon_noicon"><img src="';
		var sec3 = '"></div><div class="win_tb_text_noicon">';
		var sec4 = '</div></div>';
		// merge stings into one variable for insertion into DOM
		var insertHTML = sec1 + win_id + sec2 + placeholder + sec3 + title + sec4;
	}	
	//insert into DOM
	$( '#win_tb_placeholder' ).append( insertHTML ); // change positioning to account for id = 1
	// left formula is l=(165*(n-1))+60
	var taskbarid = '#win_tb_win_' + win_id; // here because the decrement below decrements the WHOLE FUCKING VARIABLE
	//var taskbarid_id = '#win_tb_win_' + win_id; // here because the decrement below decrements the WHOLE FUCKING VARIABLE
	var lessid = win_id; // sets the n-1 var in the left formula to n for decrementing on the next line.
    lessid--; // n => n-1
	$( '.win_tb_button' ).removeClass( 'win_tb_button_active' );
	$( '.win_tb_button' ).addClass( 'win_tb_button_inactive' );
	$( taskbarid ).removeClass( 'win_tb_button_inactive' );
	$( taskbarid ).addClass( 'win_tb_button_active' );
}
// TITLEBAR SWITCH HANDLER
$( ".win_titlebar" ).on("click", function() {
	var titlebar_id = $( this ).parent().attr( "id" );
	alert(titlebar_id);
});
// WINDOW SWITCH FUNCTION
function switchTo(num) {
	var window_id = '#window_' + num; // gets the ID of current window
	var taskbarid = '#win_tb_win_' + num;
	var titlebar_id = '#win_titb_' + num;
	// window active/inactive classes
	$( '.win_window').removeClass( 'win_window_active' );
	$( '.win_window').addClass( 'win_window_inactive' );
	$( window_id ).removeClass('win_window_inactive');
	$( window_id ).removeClass('win_window_minimized'); // de-minimize window
	$( window_id ).addClass('win_window_active');
	// titlebar active/inactive classes
	$( '.win_titlebar').removeClass( 'win_titb_active' );
	$( '.win_titlebar').addClass( 'win_titb_inactive' );
	$( titlebar_id ).removeClass('win_titb_inactive');
	$( titlebar_id ).addClass('win_titb_active');
	//addTaskbar(window_set, 'icons/start.png', title);
	$( '.win_tb_button' ).removeClass( 'win_tb_button_active' );
	$( '.win_tb_button' ).addClass( 'win_tb_button_inactive' );
	$( taskbarid ).removeClass( 'win_tb_button_inactive' );
	$( taskbarid ).addClass( 'win_tb_button_active' );
}
// WINDOW CLOSE FUNCTION
function windowClose(num) {
	if(debug == true) {
		console.log("Close function activated for Window " + num);
	}
    //var nextWin = num--;
    var closeID = "#window_" + num;
	//alert(closeID);
    $( closeID ).detach();
	// remove the taskbar button
	// taskbar id format = #win_tb_win_<id>
	var taskbarID = "#win_tb_win_" + num;
	$( taskbarID ).detach();
	// switch focus to next window in taskbar OR prev. if the  
	// closed window was the last window on the taskbar
	var newWin = num++;
	if(newWin > window_set){
		var newWin = 1;
	}
	switchTo(newWin);
}
// WINDOW MAXIMIZE FUNCTION
function windowMax(num) {
	if(debug == true) {
		console.log("Maximize function enabled for Window " + num);
	}
	var winID = "#window_" + num;
	//$( winID ).addClass( "win_window_maximized" );
	$( winID ).toggleClass( "win_window_maximized" );
}

// WINDOW MINIMIZE FUNCTION
function windowMin(num) {
	if(debug == true) {
		console.log("Minimize Function enabled for Window " + num);
	}
	var winMinID = "#window_" + num;
	if(debug == true) {
		console.log("WinMinID: " + winMinID);
	}
	switchTo(2);
	$( winMinID ).toggleClass( "win_window_minimized" );
}

// deactivate all windows (for Start button and taskbar-less dialogs)
function deactivateAll() {
	$( '.win_window').removeClass( 'win_window_active' );
	$( '.win_window').addClass( 'win_window_inactive' );
	$( '.win_titlebar').removeClass( 'win_titb_active' );
	$( '.win_titlebar').addClass( 'win_titb_inactive' );
	$( '.win_tb_button' ).removeClass( 'win_tb_button_active' );
	$( '.win_tb_button' ).addClass( 'win_tb_button_inactive' );
}

// WINDOW CENTERING FUNCTION
function windowCenter(num) {
	var winID = "#window_" + num;
	var winHeight = $( winID ).height();
	var winWidth = $( winID ).width();
	var viewHeight = $( "#win_container" ).height();
	var viewWidth = $( "#win_container" ).width();
	var heightDiff = viewHeight - winHeight;
	var widthDiff = viewWidth - winWidth;
	var topHeight = heightDiff / 2;
	var leftWidth = widthDiff / 2;
	var winStyle = "top: " + topHeight + "px;left: " + leftWidth + "px;";
	//$( winID ).attr("style", winStyle);
	$( winID ).each(function() {
		$(this).attr("style", $(this).attr("style") + winStyle);
	});
}