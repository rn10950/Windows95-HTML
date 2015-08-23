/*

This is the JS file for the Windows widgets, which include
 - Run
 - About/WinVer

and also contains the Win95Emu Debug window.

WARNING: Requires, and must be loaded AFTER, win95.js

Widgets: unresizable windows that may or may not have a taskbar button and/or titlebar icon.

----

REALLY IMPORTANT TODO: Get this document to open in DOM

TODO: see if dynamically side-loading js files is possible (create a debug.js for the debug wizard)

remove classses in widgets.css

fix window spawn positioning bug and get the 'open' and 'cancel' buttons to work on the run dialog

*/

$( document ).ready(function(){
	console.log("Widget Creation Syntax: makeWidget('Icon URL/False', 'Window Title', 'HTML', Taskbar Boolean, Question Boolean, Width, Height, 'Custom Class');");
});

function makeWidget(icon, title, html, taskbar, ques, wid, hei, cusClass) { /* IT WORKS!!! What's the catch? */
	window_set++;
	// Add titlebar height to window height
	var winHeight = hei + titbHeight;
	// split window HTML into sections to allow concatenation
	if(cusClass != false) { // custom class
		var sec1 = '<div class="win_window nores ' + cusClass + '" id="window_';
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
		var sec5 = '"></div><div class="win_titb_text">';
	}
	var sec6 = '</div><div class="win_titb_controls" id="win_windc_'
	// determine Window control type
    if(ques != true) { // No Question Mark
		var sec7 = '"><img src="win_controls/close.png" class="win_titb_close" id"_"></div></div>';
	} else { // Question Mark Present
		var sec7 = '"><img src="win_controls/question.png" class="win_titb_question" id"_"><img src="win_controls/close.png" class="win_titb_close" id"_"></div></div>';
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
		addTaskbar(window_set, 'icons/start.png', title);
	}
	//return window_set;
}

function run(start) { // the run box
	// toggle Start menu if launched from there
	if(start == true) {
		$( "#win_start" ).toggle(0, function(){
			$( "#win_start_button" ).toggleClass( "win_start_button_depressed" );
		});
	}
	//html code below
	var sec1 = '<div id="win_wid_run_container"> <div id="win_wid_run_icondiv"> <img src="images/run_icon.png"> ';
	var sec2 = '</div> <p id="win_wid_run_text"> Type the name of a program, folder, or document, and<br> ';
	var sec3 = 'Windows will open it for you. </p> <p id="win_wid_run_opent"> <span class="win_underline">O';
	var sec4 = '</span>pen: </p> <input type="text" id="win_wid_run_input" autofocus> <button id="win_wid_run_obutton" onClick="runOK()" disabled autofocus>';
	var sec5 = 'OK</button> <button id="win_wid_run_cbutton" onClick="runCancel">Cancel</button> <button id="win_wid_run_bbutton" onClick="runBrowse()">';
	var sec6 = 'Browse...</button> </div>';
	var widgetHTML = sec1 + sec2 + sec3 + sec4 + sec5 + sec6; // combine html code
	// time to make the widgets...
	//var win_num = makeWidget(false, 'Run', widgetHTML, false, false, 340, 140, 'win_wid_run_dialog');
	makeWidget(false, 'Run', widgetHTML, false, false, 340, 140, 'win_wid_run_dialog');
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
	function runOK() {
		var boxVal = $( "#win_wid_run_input" ).val();
		aliasRun(boxVal); // sends the input to the alias => JS function
	}
	function runCancel() {
		windowClose(win_num);
	}
	function runBrowse {
		// this is just a placeholder for if/when we can browse for "executables"
	}
}