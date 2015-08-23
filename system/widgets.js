/*

This is the JS file for the Windows widgets, which include
 - Run
 - About/WinVer

and also contains the Win95Emu Debug window.

WARNING: Requires, and must be loaded AFTER, win95.js

Widgets: unresizable windows that may or may not have a taskbar button and/or titlebar icon.

----

TODO: see if dynamically side-loading js files is possible (create a debug.js for the debug wizard)

remove classses in widgets.css

TODO: create widgetjs folder (or another name) and create a run.js inside it (and include it, ln 91)

fix window spawn positioning bug and get the 'open' and 'cancel' buttons to work on the run dialog

*/

$( document ).ready(function(){
	console.log("Widget Creation Syntax: makeWidget('Icon URL/False', 'Window Title', 'HTML', Taskbar Boolean, Minimize Boolean, Question Boolean, Center Boolean, Width, Height, 'Custom Class');");
});

function makeWidget(icon, title, html, taskbar, min, ques, center, wid, hei, cusClass) { /* IT WORKS!!! What's the catch? */
	window_set++;
	// Add titlebar height to window height
	var winHeight = hei + titbHeight;
	// split window HTML into sections to allow concatenation
	if(cusClass != false) { // custom class
		var sec1 = '<div class="win_drag win_widget nores ' + cusClass + '" id="window_';
	} else { // no custom class
		var sec1 = '<div class="win_window nores" id="window_';
	}
	var sec2 = '" style="width: ' + wid + 'px; height: ' + winHeight + 'px;"';
	var sec3 = '><div class="win_titlebar win_titb_active nores" id="win_titb_';
	if(icon == false) { // no icon (default)
		var sec4 = '">';
		var sec5 = '<div class="win_titb_text win_titb_text_noicon">';
	} else { // icon present
		var sec4 = '"><div class="win_titb_icon"><img src="';
		var sec5 = '" onerror="this.src = defaultImage"></div><div class="win_titb_text">';
	}
	var sec6 = '</div><div class="win_titb_controls" id="win_windc_'
	// determine Window control type
	if(min == true) {
		// minimize shown
		var sec7 = '"><img src="system/win_controls/min.png" class="win_titb_min" id"_"><img src="system/win_controls/max_disabled.png" class="win_titb_max_dis" id"_"><img src="system/win_controls/close.png" class="win_titb_close" id"_"></div></div>';
	} else {
		if(ques != true) { // No Question Mark
			var sec7 = '"><img src="system/win_controls/close.png" class="win_titb_close" id"_"></div></div>';
		} else { // Question Mark Present
			var sec7 = '"><img src="system/win_controls/question.png" class="win_titb_question" id"_"><img src="system/win_controls/close.png" class="win_titb_close" id"_"></div></div>';
		}
	}
	// merge strings into one variable for insertion into DOM
	if(icon == false) { // prevents "false" boolean from being inserted into page
		var insertHTML = sec1 + window_set + sec2 + window_set + sec3 + window_set + sec4 + sec5 + title + sec6 + window_set + sec7;
	} else {
		var insertHTML = sec1 + window_set + sec2 + window_set + sec3 + window_set + sec4 + icon + sec5 + title + sec6 + window_set + sec7;
	}
	// SET UP HTML TARGET DIV
	var htmlTarget = '<div class="win_widget_htmltarget" style="height: ' + hei + 'px;">' + html + '</div></div>';
	var finalHTML = insertHTML + htmlTarget;
	$( '#win_placeholder' ).after( finalHTML );
	var window_id = '#window_' + window_set; // gets the ID of current window
	var titlebar_id = '#win_titb_' + window_set; // window id in titlebar format
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
		addTaskbar(window_set, icon, title);
	}
	//return window_set;
	if(center == true) {
		windowCenter(window_set);
	}
}

function run(start) { // the run box
	// toggle Start menu if launched from there
	if(start == true) {
		$( "#win_start" ).toggle(0, function(){
			$( ".win_titlebar" ).toggleClass( "win_titb_start" );
			$( ".win_tb_button" ).toggleClass( "win_tb_button_start" );
			$( "#win_start_button" ).toggleClass( "win_start_button_depressed" );
		});
	}
	// add in the run.js include into <head>
	var runJsLink = $("<script src='system/widgetjs/run.js'>");
    $("head").append(runJsLink);
	//html code below
	var sec1 = '<div class="win_wid_run_tgt"></div><div id="win_wid_run_container"> <div id="win_wid_run_icondiv"> <img src="system/images/run_icon.png"> ';
	var sec2 = '</div> <p id="win_wid_run_text"> Type the name of a program, folder, or document, and<br> ';
	var sec3 = 'Windows will open it for you. </p> <p id="win_wid_run_opent"> <span class="win_underline">O';
	var sec4 = '</span>pen: </p> <input type="text" id="win_wid_run_input" autofocus> <button id="win_wid_run_obutton" onClick="runOK()" disabled autofocus>';
	var sec5 = 'OK</button> <button class="win_wid_run_cbutton" id="test" onClick="runCancel()">Cancel</button> <button class="win_wid_run_bbutton" onClick="runBrowse()">';
	var sec6 = 'Browse...</button> </div>';
	var widgetHTML = sec1 + sec2 + sec3 + sec4 + sec5 + sec6; // combine html code
	// time to make the widgets...
	makeWidget(false, 'Run', widgetHTML, false, false, false, false, 340, 140, 'win_wid_run_dialog');
	$( '#win_wid_run_input' ).focus();
	// set "open" button active and inactive based on input value
	$( '#win_wid_run_input' ).on('input', function() {
		var tbVal = $( '#win_wid_run_input' ).val();
		if(tbVal.length > 0) { // input != empty
			$( '#win_wid_run_obutton' ).removeAttr('disabled');
		} else { // input is empty
			$( '#win_wid_run_obutton' ).prop('disabled', true);
		}
	});
}
function runOK() {
	var boxVal = $( "#win_wid_run_input" ).val();
	aliasRun(boxVal); // sends the input to the alias => JS function (run.js)
	runClose();
}
function runCancel() {
	runClose();
}
function runBrowse() {
	// this is just a placeholder for if/when we can browse for "executables"
}
function runClose() {
	// get the grandparent of the placeholder div (aka: win_window)
	var win_id = $( ".win_wid_run_tgt" ).parent().parent().attr('id');
	// start refining the window_id retrieved above and execute windowClose()
	var win_id_splt = win_id.split("_");
	var win_num = win_id_splt[1];
	windowClose(win_num);
}
/* WINVER DIALOG FUNCTION */
function winverStart() {
	var html1 = '<div class="win_wid_winver_tgt"></div><div id="win_wid_winver_container">';
	var html2 = '<span id="win_wid_winver_name" class="win_wid_winver_text">Windows 95</span>';
	var html3 = '<img id="win_wid_winver_icon" src="system/images/winver_logo.png">';
	var html4 = '<span id="win_wid_winver_copy" class="win_wid_winver_text">Copyright &copy; 1981-1995, Microsoft Corp.</span>';
	var html5 = '<button id="win_wid_winver_ok" onclick="closeWinver()">OK</button></div>';
	var winverHTML = html1 + html2 + html3 + html4 + html5;
	makeWidget(false, "Windows", winverHTML, true, false, false, true, 300, 130, "win_wid_winver_dialog");
}
function closeWinver() {
	// get the grandparent of the placeholder div (aka: win_window)
	var win_id = $( ".win_wid_winver_tgt" ).parent().parent().attr('id');
	// start refining the window_id retrieved above and execute windowClose()
	var win_id_splt = win_id.split("_");
	var win_num = win_id_splt[1];
	windowClose(win_num);
}

// ERROR MESSAGE FUNCTION
function windowsError(icon, title, msg) {
	if (icon == 1) {
		var iconURL = "icons/dialogs/error.png";
	}
	var sec1 = '<div class="win_wid_error_tgt"></div><div class="win_wid_error_container">';
	var sec2 = '<div class="win_wid_error_concont"><div class="win_wid_error_icondiv"><img src="';
	// icon img url
	var sec3 = '" class="win_wid_error_icon"></div><p class="win_wid_error_text">';
	// message text
	var sec4 = '</p></div><p class="win_wid_error_buttoncont">';
	var sec5 = '<button class="win_wid_error_close" onclick="errorClose()">OK</button></p></div>';
	var errorHTML = sec1 + sec2 + iconURL + sec3 + msg + sec4 + sec5;
	makeWidget(false, title, errorHTML, false, false, false, true, 340, 140, "win_wid_error_dialog");
}
function errorClose() {
	var win_id = $( ".win_wid_error_tgt" ).parent().parent().attr('id');
	// start refining the window_id retrieved above and execute windowClose()
	var win_id_splt = win_id.split("_");
	var win_num = win_id_splt[1];
	windowClose(win_num);
}