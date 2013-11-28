function get_base_home_dir() {
    return {
        'documents': {},
        'downloads': {},
        '.bash_profile': ''
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

function get_michael_fs() {
    var base_fs = new get_base_fs();
    var michael_home = {
        '.log': '',
        'emails': {
            'int-john-mcgilly.email': email_michael_1,
            'ext-william-monroe.email': email_spam_1
        }
    };

    base_fs['/']['home']['michael'] = michael_home;

    return base_fs;
}