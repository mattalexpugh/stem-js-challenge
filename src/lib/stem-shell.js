var DNS = {
	'192.168.1.1': 'base',
	'192.168.2.200': 'michael',
    '1': 'michael'
};

var termCount = 0;

function SystemBase(profile, parent) {

	this.activeprofile = profile;
    this.parent = (parent === undefined) ? null : parent;
	this.args = [];
	this.cwd = ['/'];
	this.fs = PROFILES[profile].fs;
    this.currentDir = PROFILES[profile].fs; // Init to the same thing as this.fs
	this.term = null;
	this.greeting = PROFILES[profile].greeting;
	this.ps = PROFILES[profile].ps;
	this.username = PROFILES[profile].username;
	this.password = PROFILES[profile].password;
	this.authenticated = false;
    this.env = Object();

	var self = this;

	this.setArgs = function(argv) {
        self.args = [];

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

    this.peekPath = function() {
        var dot = self.cwd.pop();
        self.cwd.push(dot);

        return dot;
    }

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

	this.cmdLs = function() {
        var dot = self.peekPath();
        var dir = self.currentDir[dot];
        var items = _.keys(dir);
		self.term.write(items);
	};

	this.cmdCat = function() {
		if (self._checkArgs("Error: Usage - cat <filename>")) {

			var fileFound = _.has(self.currentDir, self.args[0]);

			if (! fileFound) {
				self.term.write("Error: Unknown file: " + self.args[0]);
				return false;
			}

			self.term.write(self.currentDir[self.args[0]], true);
		}
	};

	this.cmdLogin = function() {
		return false;
	};

	this.cmdDecrypt = function() {
		return "decrypt";
	};

	this.cmdPwd = function() {
        var wd = (self.cwd.length == 1) ? self.cwd : self.cwd.join('/').substring(1);
		self.term.write(wd);
	};

	this.cmdCd = function() {
		if (! self._checkArgs("Error: Usage - cd <dirname>")) {
			return false;
		}

        var dirname = self.args[0];
        var dot = self.peekPath()

        if (dirname == '..') {
            if (dot == '/') {
                self.term.write("Error: At root already.");
            } else {
                self.cwd.pop();
                var dirPtr = self.fs;

                _.each(self.cwd, function(x) {
                    dirPtr = dirPtr[x];
                });

                self.currentDir = dirPtr;
            }

            return;
        }

		var items = self.currentDir[dot];
		var dirs = _.filter(_.keys(items), function(x) { return (typeof items[x] == "object");});
		var valid = _.contains(_.values(dirs), dirname);

		if (! valid) {
			self.term.write("Error: Unknown directory '" + dirname + "'");
			return false;
		}

        self.currentDir = self.currentDir[dot];
		self.cwd.push(dirname);
	};

	this.cmdExit = function() {
        if (self.parent !== null) {
            self.parent.term.focus();
        }

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

		self.term.write("SSH: Enter Password for " + ip + ":");
        self.term.rawMode = true;
        self.term.env.getPassword = true;
        self.term.env.next = self.createSsh;
        self.term.env.sshIp = ip;
	};

    this.createSsh = function() {
        var ip = self.term.env.sshIp;
        var profile = DNS[ip];
        var newSession = new SystemBase(profile, self);
        newSession.doLogin(self.term.env.password);

        if (newSession.isAuthenticated()) {
            newSession.termOpen();
        } else {
            self.term.write("Error: Password incorrect.");
        }

        self.term.env.sshIp = null;
        self.term.env.password = '';
    }

	this.doLogin = function(password) {
		self.authenticated = (password == self.password);
	};

	this.isAuthenticated = function() {
		return self.authenticated;
	};

	this.CMD_PTRS = {
		'ls': self.cmdLs,
		'cd': self.cmdCd,
		'cat': self.cmdCat,
		'login': self.cmdLogin,
		'decrypt': self.cmdDecrypt,
		'pwd': self.cmdPwd,
		'exit': self.cmdExit,
		'whoami': self.cmdWhoAmI,
		'ssh': self.cmdSsh
	};

	this.termHandler = function() {
		self.term.newLine();

        if (self.term.rawMode) {
            if (self.term.env.getPassword) {
                self.term.env.password = self.term.lineBuffer;
                self.term.env.getPassword = false;
                self.term.env.next();
            }

            self.term.rawMode = false;
        } else if (self.term.lineBuffer != '') {
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
		}

		self.term.prompt();
	};
}
