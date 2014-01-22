var DNS = {
    '192.168.1.0': 'base', // Not used, base values
    '192.168.1.1': 'admin',
    '192.168.2.200': 'michael',
    '192.200.5.50': 'jan',
    'fdc3:aa7a:d3a2:66cd': 'crash'
};

var termCount = 0;
var numBooted = 0;
var decryptDifficulty = 5; // Sliding scale, ±1 depending on last attempt.

function addNuke(sys) {
    sys.cmdNuke = function() {
        sys.blankPs();
        sys.term.write('$ UPLOADING NUKE VIRUS NOW', true);

        setTimeout(function() {
            sys.term.write('what are you uploading...', true);
        }, 1000);

        setTimeout(function() {
            sys.term.write('$ UPLOAD COMPLETE. COMMENCING NUKE.', true);
        }, 2000);

        setTimeout(function() {
            sys.term.write('STOP!!!! WHAT ARE YOU DOING TO MY COMPUTER?!?', true);
        }, 4000);

        setTimeout(function() {
            sys.term.write('$ NUKE COMPLETE. COMPUTER OFFLINE. SHUTTING DOWN.', true);
        }, 6000);

        setTimeout(function() {
            sys.cmdExit();
            alert("MESSAGE: Excellent! The computer is offline, looks like they won't be " +
                "a problem for a while! I'll email Jan now, nice work! John.");

            DNS['fdc3:aa7a:d3a2:66cd'] = 'admin';
            $('#icon-crash').data('term', 'admin');
            $('#icon-crash').hide();
        }, 10000);
    }

    sys.CMD_PTRS['upload-nuke'] = sys.cmdNuke;
}

function Crash(term) {

    this.parent = term;

    var self = this;

    this.interrupt = function(text) {
        self.parent.term.newLine();
        self.parent.blankPs();
        self.parent.term.rawMode = true;
        self.parent.term.write(text);
        self.parent.term.newLine();
        self.parent.term.prompt();
    };

    this.doKick = function() {
        setTimeout(self.parent.cmdExit, 5000);
        self.interrupt('SYSTEM: YOU ARE BEING LOGGED OFF IN 5 SECONDS.');
        numBooted++;
    }

    this.doChallenge1 = function() {
        switch(numBooted) {
            case 0:
                self.interrupt('seriously, you\'re in over your head, time to leave!');
                self.doKick();
                break;
            case 1:
                self.interrupt('ahh you\'re that sysadmin! haha! trying to remove me? :)');
                setTimeout(function() {
                    self.interrupt('OK, I\'ve put a worm on your computer too. You\'re ' +
                        'going away now. DON\'T COME BACK.');
                    self.doKick();
                }, 10000);
                break;
            case 2:
                addNuke(self.parent);
                setTimeout(function() {
                    alert("MESSAGE: It's John, I see you're in! Quick, upload the nuke virus " +
                        "with `upload-nuke` command now to break the hacker connection!");
                }, 10000);
        }
    };

    this.run = function() {
        self.interrupt(CRASH_TAUNTS[numBooted]);
        setTimeout(self.doChallenge1, 1000);
    };
}

function SystemBase(profile) {

    this.actprofile = profile;
    this.args = [];
    this.cwd;
    this.fs = PROFILES[profile].fs;
    this.currentDir;
    this.term = null;
    this.greeting = PROFILES[profile].greeting;
    this.ps = PROFILES[profile].ps;
    this.username = PROFILES[profile].username;
    this.password = PROFILES[profile].password;
    this.authenticated = false;
    this.env = Object();
    this.ai;

    var self = this;

    this.setArgs = function (argv) {
        self.args = [];

        for (var i = 1; i < argv.length; i++) {
            self.args.push(argv[i]);
        }
    };

    this._checkArgs = function (error) {
        var hasArgs = (self.args.length > 0);

        if (!hasArgs) {
            self.term.write(error);
        }

        return hasArgs;
    };

    this.peekPath = function () {
        var dot = self.cwd.pop();
        self.cwd.push(dot);

        return dot;
    }

    this.termOpen = function () {
        termCount++;

        if ((!self.term) || (self.term.closed)) {
            self.term = new Terminal({
                    cols: 100,
                    rows: 35,
                    x: 100,
                    y: 100,
                    termDiv: 'term-target',
                    bgColor: PROFILES[self.actprofile].color1,
                    frameColor: PROFILES[self.actprofile].color2,
                    frameWidth: 1,
                    rowHeight: 15,
                    blinkDelay: 500,
                    fontClass: 'term ' + self.actprofile,
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

            self.cwd = ['/', 'home', self.actprofile];
            self.resetCwd();
            self.term.open();

            if (self.actprofile == 'admin') {
                self.term.write('You have new mail.', true);
            }

            var mainPane = (document.getElementById) ?
                document.getElementById('mainPane') : document.all.mainPane;
            if (mainPane) mainPane.className = 'lh15 dimmed';

            if (self.actprofile == 'crash') {
                self.ai = new Crash(self);
                setTimeout(self.ai.run, 5000);
            }
        }
    };

    this.termExitHandler = function () {
        var mainPane = (document.getElementById) ?
            document.getElementById('mainPane') : document.all.mainPane;
        if (mainPane) mainPane.className = 'lh15';
    };

    this.resetCwd = function () {
        var dirPtr = self.fs;

        for (var i = 0; i < self.cwd.length - 1; i++) {
            dirPtr = dirPtr[self.cwd[i]];
        }

        self.currentDir = dirPtr;
    };

    this.challengeDecrypt = function() {
        var pool = DECRYPT_CHALLENGES[decryptDifficulty];
        var puzzle = _.clone(pool[Math.floor(Math.random() * pool.length)]);
        var targetIdx = Math.floor(Math.random() * puzzle.length);
        self.term.env.decryptTarget = puzzle[targetIdx];
        puzzle[targetIdx] = '???';

        self.term.write("[SECRET] Fill in the missing value: " + puzzle.join(' '));
        self.term.rawMode = true;
        self.term.env.getDecryptResponse = true;
        self.term.env.next = self.doDecrypt;
        self.blankPs();
    };

    this.doDecrypt = function() {
        var response = self.term.env.decryptResponse;
        self.term.env.decryptSuccess = response == self.term.env.decryptTarget;
        self.term.env.decryptTarget = null;

        if (self.term.env.decryptSuccess) {
            decryptDifficulty++;
            var dot = self.peekPath();

            self.term.write("[DECRYPTION SUCCESSFUL]", true);
            self.term.write(atob(self.currentDir[dot][self.args[0]]));
	    self.args = [];
        } else {
            decryptDifficulty--;
            self.term.write("[DECRYPTION UNSUCCESSFUL]", true);
            self.term.write("Incorrect response: " + response + " - Please try again.");
        }

        // Sanity checking
        decryptDifficulty = (decryptDifficulty < 1) ? 1 : decryptDifficulty;
        decryptDifficulty = (decryptDifficulty > 10) ? 10 : decryptDifficulty;
    };

    this.cmdLs = function () {
        var dot = self.peekPath();
        var dir = self.currentDir[dot];
        var items = _.keys(dir);
        self.term.write(items);
    };

    this.cmdCat = function () {
        if (self._checkArgs("Error: Usage - cat <filename>")) {

            var dot = self.peekPath();
            var fileFound = _.has(self.currentDir[dot], self.args[0]);

            if (!fileFound) {
                self.term.write("Error: Unknown file: " + self.args[0]);
                return false;
            }

            self.term.write(self.currentDir[dot][self.args[0]]);
        }
    };

    this.cmdDecrypt = function () {
        if (self._checkArgs("Error: Usage - decrypt <filename>")) {

            var dot = self.peekPath();
            var fileFound = _.has(self.currentDir[dot], self.args[0]);

            if (!fileFound) {
                self.term.write("Error: Unknown file: " + self.args[0]);
                return false;
            }

            self.challengeDecrypt();
        }
    };

    this.cmdPwd = function () {
        var wd = (self.cwd.length == 1) ? self.cwd : self.cwd.join('/').substring(1);
        self.term.write(wd);
    };

    this.cmdCd = function () {
        if (!self._checkArgs("Error: Usage - cd <dirname>")) {
            return false;
        }

        var dirname = self.args[0];
        var dot = self.peekPath();

        if (dirname == '..') {
            if (dot == '/') {
                self.term.write("Error: At root already.");
            } else {
                self.cwd.pop();
                self.resetCwd();
            }

            return;
        }

        if(dirname.charAt(0) == '/') {
            self.cwd.splice(1, self.cwd.length - 1);
            self.resetCwd();
            if(dirname != '/') {
                self.args[0] = dirname.substring(1);
                self.cmdCd();
            }
            return;
        }

        var items = self.currentDir[dot];
        var dirs = _.filter(_.keys(items), function (x) {
            return (typeof items[x] == "object");
        });
        var valid = _.contains(_.values(dirs), dirname);

        if (!valid) {
            self.term.write("Error: Unknown directory '" + dirname + "'");
            return false;
        }

        self.currentDir = self.currentDir[dot];
        self.cwd.push(dirname);
    };

    this.cmdExit = function () {
        self.term.close();
    };

    this.cmdWhoAmI = function () {
        self.term.write(self.username);
    };

    this.cmdHelp = function() {
        self.term.write(help.join("\n"));
    }

    this.cmdSsh = function () {
        if (!self._checkArgs("Error: Usage - ssh <computer_address>")) {
            return false;
        }

        var ip = self.args[0];
        var valid = _.has(DNS, ip);

        if (!valid) {
            self.term.write("Error: Unable to connect to " + ip);
            return false;
        }

        self.term.write("SSH: Enter Password for " + ip + ":");
        self.term.rawMode = true;
        self.term.env.getPassword = true;
        self.term.env.next = self.createSsh;
        self.term.env.sshIp = ip;
        self.blankPs();
    };

    this.cmdClear = function() {
        self.term.clear();
    }

    this.createSsh = function () {
        var ip = self.term.env.sshIp;
        var profile = DNS[ip];
        var newSession = new SystemBase(profile);
        newSession.doLogin(self.term.env.password);

        if (newSession.isAuthenticated()) {
            self.cmdExit();
            $("#icon-" + profile).show();
            newSession.termOpen();
        } else {
            self.term.write("Error: Password incorrect.");
        }

        self.term.env.sshIp = null;
        self.term.env.password = '';
    }

    this.blankPs = function () {
        self.term.env.resetPs = true;
        self.term.env.ps = self.term.ps;
        self.term.ps = '';
    }

    this.doLogin = function (password) {
        self.authenticated = (password == self.password);
    };

    this.isAuthenticated = function () {
        return self.authenticated;
    };

    this.CMD_PTRS = {
        'ls': self.cmdLs,
        'cd': self.cmdCd,
        'cat': self.cmdCat,
        'help': self.cmdHelp,
        'decrypt': self.cmdDecrypt,
        'pwd': self.cmdPwd,
        'exit': self.cmdExit,
        'whoami': self.cmdWhoAmI,
        'ssh': self.cmdSsh,
        'clear': self.cmdClear,
    };

    this.termHandler = function () {
        self.term.newLine();

        if (self.term.rawMode) {
            if (self.term.env.getPassword) {
                self.term.env.password = self.term.lineBuffer;
                self.term.env.getPassword = false;
                self.term.env.next();
            }

            if (self.term.env.getDecryptResponse) {
                self.term.env.decryptResponse = self.term.lineBuffer;
                self.term.env.getDecryptResponse = false;
                self.term.env.next();
            }

            if (self.term.env.resetPs) {
                self.term.ps = self.term.env.ps;
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
	    if(command != 'decrypt') {
	        self.args = [];
	    }
        }

        self.term.prompt();
    };
}
