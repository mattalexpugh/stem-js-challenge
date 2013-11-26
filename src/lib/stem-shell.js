/* Util funcs */

function hasKey(k, dict) {
	for (var x in dict) {
		if (x == k) {
			return true;
		}
	}

	return false;
}


/* Session vars */
var term;
var fs;
var cwd ='/';
var args = [];

/* Args handling */
function resetArgs() {
	args = [];
}

function setArgs(argv) {
	for (var i = 1; i < argv.length; i++) {
		args.push(argv[i]);
	}
}

function _checkArgs(error) {
	var hasArgs = (args.length > 0);

	if (! hasArgs) {
		term.write(error);
		return false;
	}

	return true;
}

/* Term Bootstrapping */

function termOpen() {
	if ((!term) || (term.closed)) {
		term = new Terminal(
			{
		        cols: 100,
		        rows: 35,
		        x: 100,
		        y: 100,
		        termDiv: 'termTarget',
		        bgColor: '#181818',
		        frameColor: '#555555',
		        frameWidth: 1,
		        rowHeight: 15,
		        blinkDelay: 500,
		        fontClass: 'term',
		        crsrBlinkMode: false,
		        crsrBlockMode: true,
		        DELisBS: false,
		        printTab: true,
		        printEuro: true,
		        catchCtrlH: true,
		        closeOnESC: true,
		        historyUnique: false,
		        id: 0,
		        ps: '>',
		        ctrlHandler: null,
		        initHandler: null,
		        wrap: false,
				greeting: help.join('%n'),
				handler: termHandler,
				exitHandler: termExitHandler,
			}
		);
		term.open();

		// dimm UI text
		var mainPane = (document.getElementById)?
			document.getElementById('mainPane') : document.all.mainPane;
		if (mainPane) mainPane.className = 'lh15 dimmed';
	}
}

function termExitHandler() {
	// reset the UI
	var mainPane = (document.getElementById)?
		document.getElementById('mainPane') : document.all.mainPane;
	if (mainPane) mainPane.className = 'lh15';
}


/* Commands */
function cmdMan() {
	return false;
}

function cmdLs() {
	return false;
}

function cmdCat() {
	if (_checkArgs("Error: Usage - cat <filename>")) {

		var fileFound = hasKey(args[0], filesContainer);

		if (! fileFound) {
			term.write("Error: Unknown file: " + args[0]);
			return false;
		}

		term.write(filesContainer[args[0]], true);
	}
}

function cmdLogin() {
	return false;
}

function cmdChown() {
	return false;
}

function cmdDecrypt() {
	return "decrypt";
}

function cmdPwd() {
	term.write(cwd, true);
}

function cmdCd() {

}

/* Function Pointers */
var CMD_PTRS = {
	'man': cmdMan,
	'ls': cmdLs,
	'cd': cmdCd,
	'cat': cmdCat,
	'login': cmdLogin,
	'chown': cmdChown,
	'decrypt': cmdDecrypt,
	'pwd': cmdPwd
}


function termHandler() {
	this.newLine();

	if (this.lineBuffer.match(/^\s*exit\s*$/i)) {
		this.close();
		return;
	}
	else if (this.lineBuffer.match(/^\s*tests\s+-w\s*$/i)) {
		this.write('starting tests with wrap %+ion%-i:');
		this.newLine();
		this.newLine();
		this.write(texts);
	}
	else if (this.lineBuffer.match(/^\s*tests\s*$/i)) {
		this.wrapOff();
		this.write('starting tests with wrap %+ioff%-i:');
		this.newLine();
		this.newLine();
		this.write(texts);
		this.wrapOn();
	}
	else if (this.lineBuffer.match(/^\s*kant\s*$/i)) {
		this.write(kant, true);
		return;
	}
	else if (this.lineBuffer.match(/^\s*help\s*$/i)) {
		this.clear();
		this.write(help);
	}
	else if (this.lineBuffer != '') {
		var funcLine = this.lineBuffer.replace(/%/g, '%%');
		var argv = funcLine.split(" ")
		var command = argv[0];
		var commandFound = hasKey(command, CMD_PTRS);

		if ((argv.length > 1) && (argv[1].length > 0)) {
			setArgs(argv);
		}

		if (commandFound) {
			CMD_PTRS[command]();
		} else {
			this.write("Command not recognised. Try again.");
		}

		this.newLine();
		resetArgs();
	}

	this.prompt();
}
