function get_base_home_dir() {
    return {
        'documents': {},
        'downloads': {},
        '.bash_profile': 'test'
    };
}

function get_base_fs() {
    return {
        '/': {
            'home': {
                'root': new get_base_home_dir()
            }
        }
    };
}

function get_admin_fs() {
    var base_fs = new get_base_fs();
    var admin_home = {
        'system.log': btoa('System log empty.'),
        'documents': {
            'officecomputers.txt': ''
        }
    };

    base_fs['/']['home']['admin'] = admin_home;

    return base_fs;
}

function get_michael_fs() {
    var base_fs = new get_base_fs();
    var michael_home = {
        'system.log': btoa(log_michael.join('\n')),
        'emails': {
            'int-john-mcgilly.email': email_michael_1.join('\n'),
            'ext-william-monroe.email': email_spam_1.join('\n')
        }
    };

    base_fs['/']['home']['michael'] = michael_home;

    return base_fs;
}

function get_jan_fs() {
    return new get_base_fs();
}

function get_crash_fs() {
    return new get_base_fs();
}
