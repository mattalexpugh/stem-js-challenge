function get_base_home_dir() {
    return {
        'documents': {},
        'downloads': {},
        'emails': {},
        '.bash_profile': 'test'
    };
}

function get_base_fs() {
    return {
        '/': {
            'home': {
                'root': new get_base_home_dir()
            },
            'log': {}
        }
    };
}

function get_admin_fs() {
    var base_fs = new get_base_fs();
    var base_home = new get_base_home_dir();

    var admin_home = {
        'system.log': btoa('System log empty.'),
        'documents': {
            'officecomputers.txt': file_office_computers.join('\n')
        },
        'emails': {
            'int-john-mcgilly.email': email_admin_1.join('\n')
        }
    };

    _.extend(base_home, admin_home);

    base_fs['/']['home']['admin'] = base_home;

    return base_fs;
}

function get_michael_fs() {
    var base_fs = new get_base_fs();
    var base_home = new get_base_home_dir();

    var michael_home = {
        'system.log': btoa(log_michael.join('\n')),
        'emails': {
            'int-john-mcgilly.email': email_michael_1.join('\n'),
            'ext-william-monroe.email': email_spam_1.join('\n')
        }
    };

    _.extend(base_home, michael_home);

    base_fs['/']['home']['michael'] = base_home;

    return base_fs;
}

function get_jan_fs() {
    var base_fs = new get_base_fs();
    var base_home = new get_base_home_dir();

    var jan_home = {
        'system.log': btoa(log_jan.join('\n')),
        'documents': {
            'hackspeak.txt': file_rosetta_stone.join('\n')
        },
        'emails': {
            'sent-john-mcgilly.email': email_jan_1.join('\n'),
            'ext-william-monroe.email': email_spam_1.join('\n'),
            'int-john-mcgilly.email': email_jan_2.join('\n')
        },
        'private': {
            'cr4$hm4nif3$t0.txt': 'hack the gibson'
        }
    };

    _.extend(base_home, jan_home);

    var jan_extra_logs = {
        'ext-connection-1': btoa('BACKDOOR, PARTIAL IP: ????:????:d3a2:???? user: `crash`'),
        'ext-connection-2': btoa('BACKDOOR, PARTIAL IP: ????:aa7a:????:???? user: `crash`'),
        'ext-connection-3': btoa('BACKDOOR, PARTIAL IP: ????:????:????:66cd user: `crash`'),
        'ext-connection-4': btoa('BACKDOOR, PARTIAL IP: fdc3:????:????:???? user: `crash`'),
        'int-connection-1': ''
    };

    base_fs['/']['home']['jan'] = base_home;
    base_fs['/']['log'] = jan_extra_logs;

    return base_fs;
}

function get_crash_fs() {
    var base_fs = new get_base_fs();

    var crash_home = {
        'MANIFESTO.TXT': btoa('ANARCHY!')
    };

    base_fs['/']['home']['crash'] = crash_home;

    return base_fs;
}
