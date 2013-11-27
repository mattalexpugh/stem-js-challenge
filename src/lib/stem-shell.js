var DNS = {
	'192.168.1.1': 'base',
	'192.168.2.200': 'michael'
};

var termCount = 0;

function SystemBase(profile) {

	this.activeprofile = profile;
	this.args = [];
	this.cwd = ['/'],
	this.fs = PROFILES[profile].fs;
	this.term = null;
	this.greeting = PROFILES[profile].greeting;
	this.ps = PROFILES[profile].ps;
	this.username = PROFILES[profile].username;
	this.password = PROFILES[profile].password;
	this.authenticated = false;

	var self = this;

	this.resetArgs = function() {
		self.args = [];
	};

	this.setArgs = function(argv) {
		for (var i = 1; i < argv.length; i++) {
			self.args.push(argv[i]);
		}
	};

	this._checkArgs = function(error) {
		var hasArgs = (self.args.length > 0);

		if (! hasArgs) {
			self.term.write(error);
		}

		return hasArgs;
	};

	this.termOpen = function() {
		var thisId = termCount;
		termCount++;

		if ((!self.term) || (self.term.closed)) {
			self.term = new Terminal({
				cols: 100,
				rows: 35,
				x: 100,
				y: 100,
				termDiv: 'termTarget' + thisId,
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
				id: termCount,
				ps: self.ps,
				ctrlHandler: null,
				initHandler: null,
				wrap: false,
				greeting: self.greeting,
				handler: this.termHandler,
				exitHandler: this.termExitHandler,
				}
			);

			self.term.open();

			var mainPane = (document.getElementById)?
				document.getElementById('mainPane') : document.all.mainPane;
			if (mainPane) mainPane.className = 'lh15 dimmed';
		}
	};

	this.termExitHandler = function() {
		var mainPane = (document.getElementById)?
			document.getElementById('mainPane') : document.all.mainPane;
		if (mainPane) mainPane.className = 'lh15';
	};

	this.getCurrentDirList = function() {
		var dir = self.fs[self.cwd];
		var items = _.keys(dir);

		return items;
	};

	this.cmdMan = function() {
		return false;
	};

	this.cmdLs = function() {
		self.term.write(self.getCurrentDirList());
	};

	this.cmdCat = function() {
		if (self._checkArgs("Error: Usage - cat <filename>")) {

			var fileFound = _.has(self.fs, self.args[0]);

			if (! fileFound) {
				self.term.write("Error: Unknown file: " + self.args[0]);
				return false;
			}

			self.term.write(self.fs[self.args[0]], true);
		}
	};

	this.cmdLogin = function() {
		return false;
	};

	this.cmdChown = function() {
		return false;
	};

	this.cmdDecryp = function() {
		return "decrypt";
	};

	this.cmdPwd = function() {
		self.term.write(self.cwd);
	};

	this.cmdCd = function() {
		if (! self._checkArgs("Error: Usage - cd <dirname>")) {
			return false;
		}

		var items = self.fs[self.cwd];
		var dirs = _.filter(items, function(x) { return (typeof x == "object");});

		debugger;
		var dirname = self.args[0];
		var valid = _.has(dirs, dirname);

		if (! valid) {
			self.term.write("Error: Unknown directory '" + dirname + "'");
			return false;
		}

		self.cwd.push(dirname);
	};

	this.cmdExit = function() {
		self.term.close();
		termCount--;
	};

	this.cmdWhoAmI = function() {
		self.term.write(self.username);
	};

	this.cmdSsh = function() {
		if (! self._checkArgs("Error: Usage - ssh <computer_address>")) {
			return false;
		}

		var ip = self.args[0];
		var valid = _.has(DNS, ip);

		if (! valid) {
			self.term.write("Error: Unable to connect to " + ip);
			return false;
		}

		var newSession = new SystemBase(DNS[ip]);
		self.term.write("SSH: Enter Username for " + ip + ":")
		self.term.write("SSH: Enter Password for " + ip + ":")
		newSession.termOpen();
	};

	this.doLogin = function(username, password) {
		self.authenticated = ((username == self.username) &&
								(password == self.password));
	};

	this.isAuthenticated = function() {
		return self.authenticated;
	};

	this.CMD_PTRS = { /* Function Pointers */
		'man': self.cmdMan,
		'ls': self.cmdLs,
		'cd': self.cmdCd,
		'cat': self.cmdCat,
		'login': self.cmdLogin,
		'chown': self.cmdChown,
		'decrypt': self.cmdDecrypt,
		'pwd': self.cmdPwd,
		'exit': self.cmdExit,
		'whoami': self.cmdWhoAmI,
		'ssh': self.cmdSsh
	};

	this.termHandler = function() {
		self.term.newLine();

		if (self.term.lineBuffer != '') {
			var funcLine = self.term.lineBuffer.replace(/%/g, '%%');
			var argv = funcLine.split(" ")
			var command = argv[0];
			var commandFound = _.has(self.CMD_PTRS, command);

			if ((argv.length > 1) && (argv[1].length > 0)) {
				self.setArgs(argv);
			}

			if (commandFound) {
				self.CMD_PTRS[command]();
			} else {
				self.term.write("Command not recognised. Try again.");
			}

			self.term.newLine();
			self.resetArgs();
		}

		self.term.prompt();
	};
}
