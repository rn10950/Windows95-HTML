function winDebug() {
	//alert("debug started");
	var test1 = ["Test JS Name", "testDebug()"];
	var test2 = ["Test JS Name 2", "testDebug2()"];
	var test3 = ["Test JS Name 3", "testDebug3()"];
	var test4 = ["Test JS Name 4", "testDebug4()"];
	 /* guts of the program */
	 if(typeof debugTest === 'undefined') {
		// running in debug window
		var code1 = '<div class="win_wid_debug_tgt"></div><div id="win_wid_debug_container"><p id="win_wid_debug_header">';
		var code2 = 'This application contains some JavaScript tests and solutions for debugging and developing the Windows 95 Emulator. ';
		var code3 = '</p><table id="win_wid_debug_table"><tr class="win_wid_debug_table_row"><td class="win_wid_debug_table_cell">';
		var code4 = '<div id="win_wid_debug_cell-1"><span class="win_wid_debug_celltext"></span><button class="win_wid_debug_button">Execute</button>';
		var code5 = '</div></td><td class="win_wid_debug_table_cell"><div id="win_wid_debug_cell-2"><span class="win_wid_debug_celltext">';
		var code6 = '</span><button class="win_wid_debug_button">Execute</button></div></td></tr><tr class="win_wid_debug_table_row">';
		var code7 = '<td class="win_wid_debug_table_cell"><div id="win_wid_debug_cell-3"><span class="win_wid_debug_celltext"></span>';
		var code8 = '<button class="win_wid_debug_button">Execute</button></div></td><td class="win_wid_debug_table_cell"><div id="win_wid_debug_cell-4">';
		var code9 = '<span class="win_wid_debug_celltext"></span><button class="win_wid_debug_button">Execute</button></div></td>';
		var code10 = '</tr><tr class="win_wid_debug_table_row"><td class="win_wid_debug_table_cell"><div id="win_wid_debug_cell-5">';
		var code11 = '<span class="win_wid_debug_celltext"></span><button class="win_wid_debug_button">Execute</button></div></td>';
		var code12 = '<td class="win_wid_debug_table_cell"><div id="win_wid_debug_cell-6"><span class="win_wid_debug_celltext">';
		var code13 = '</span><button class="win_wid_debug_button">Execute</button></div></td></tr><tr class="win_wid_debug_table_row">';
		var code14 = '<td class="win_wid_debug_table_cell"><div id="win_wid_debug_cell-7"><span class="win_wid_debug_celltext">';
		var code15 = '</span><button class="win_wid_debug_button">Execute</button></div></td><td class="win_wid_debug_table_cell">';
		var code16 = '<div id="win_wid_debug_cell-8"><span class="win_wid_debug_celltext"></span><button class="win_wid_debug_button">';
		var code17 = 'Execute</button></div></td></tr><tr class="win_wid_debug_table_row"><td class="win_wid_debug_table_cell">';
		var code18 = '<div id="win_wid_debug_cell-9"><span class="win_wid_debug_celltext"></span><button class="win_wid_debug_button">';
		var code19 = 'Execute</button></div></td><td class="win_wid_debug_table_cell"><div id="win_wid_debug_cell-10">';
		var code20 = '<span class="win_wid_debug_celltext"></span><button class="win_wid_debug_button">Execute</button></div></td>';
		var code21 = '</tr></table><span id="win_wid_debug_grouptitle">Debug Applications</span><form>';
		var code22 = '<button class="win_wid_debug_ok" onClick="debugClose()">OK</button></form></div>';
		var debugHTML = code1 + code2 + code3 + code4 + code5 + code6 + code7 + code8 + code9 + code10 + 
		code11 + code12 + code13 + code14 + code15 + code16 + code17 + code18 + code19 + code20 + code21 + code22;
		// add css + spawn window
		addCSS("system/debug/debug.css");
		makeWidget("system/debug/icon.png", "Windows Debug", debugHTML, true, true, false, true, 500, 320, "win_wid_debug_window");
	 }
	 // test 1
	if(typeof test1 !== 'undefined') {
		$( "#win_wid_debug_cell-1" ).find("span").text(test1[0]);
		$( "#win_wid_debug_cell-1" ).find("button").attr("onclick", test1[1]);
	} else {
		$( "#win_wid_debug_cell-1" ).attr("style", "display:none;");
	}
	 // test 2
	if(typeof test2 !== 'undefined') {
		$( "#win_wid_debug_cell-2" ).find("span").text(test2[0]);
		$( "#win_wid_debug_cell-2" ).find("button").attr("onclick", test2[1]);
	} else {
		$( "#win_wid_debug_cell-2" ).attr("style", "display:none;");
	}
	 // test 3
	if(typeof test3 !== 'undefined') {
		$( "#win_wid_debug_cell-3" ).find("span").text(test3[0]);
		$( "#win_wid_debug_cell-3" ).find("button").attr("onclick", test3[1]);
	} else {
		$( "#win_wid_debug_cell-3" ).attr("style", "display:none;");
	}
	 // test 4
	if(typeof test4 !== 'undefined') {
		$( "#win_wid_debug_cell-4" ).find("span").text(test4[0]);
		$( "#win_wid_debug_cell-4" ).find("button").attr("onclick", test4[1]);
	} else {
		$( "#win_wid_debug_cell-4" ).attr("style", "display:none;");
	}
	 // test 5
	if(typeof test5 !== 'undefined') {
		$( "#win_wid_debug_cell-5" ).find("span").text(test5[0]);
		$( "#win_wid_debug_cell-5" ).find("button").attr("onclick", test5[1]);
	} else {
		$( "#win_wid_debug_cell-5" ).attr("style", "display:none;");
	}
	 // test 6
	if(typeof test6 !== 'undefined') {
		$( "#win_wid_debug_cell-6" ).find("span").text(test6[0]);
		$( "#win_wid_debug_cell-6" ).find("button").attr("onclick", test6[1]);
	} else {
		$( "#win_wid_debug_cell-6" ).attr("style", "display:none;");
	}
	 // test 7
	if(typeof test7 !== 'undefined') {
		$( "#win_wid_debug_cell-7" ).find("span").text(test7[0]);
		$( "#win_wid_debug_cell-7" ).find("button").attr("onclick", test7[1]);
	} else {
		$( "#win_wid_debug_cell-7" ).attr("style", "display:none;");
	}
	 // test 8
	if(typeof test8 !== 'undefined') {
		$( "#win_wid_debug_cell-8" ).find("span").text(test8[0]);
		$( "#win_wid_debug_cell-8" ).find("button").attr("onclick", test8[1]);
	} else {
		$( "#win_wid_debug_cell-8" ).attr("style", "display:none;");
	}
	 // test 9
	if(typeof test9 !== 'undefined') {
		$( "#win_wid_debug_cell-9" ).find("span").text(test9[0]);
		$( "#win_wid_debug_cell-9" ).find("button").attr("onclick", test9[1]);
	} else {
		$( "#win_wid_debug_cell-9" ).attr("style", "display:none;");
	}
	 // test 10
	if(typeof test10 !== 'undefined') {
		$( "#win_wid_debug_cell-10" ).find("span").text(test10[0]);
		$( "#win_wid_debug_cell-10" ).find("button").attr("onclick", test10[1]);
	} else {
		$( "#win_wid_debug_cell-10" ).attr("style", "display:none;");
	}
}
// divider
function testDebug() {
	alert("debug test");
}
function testDebug2() {
	alert("debug test 2");
}
function testDebug3() {
	alert("debug test 3");
}
function testDebug4() {
	alert("debug test 4");
}