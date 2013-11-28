var PROFILES = {
    'base': {
        greeting: "%+r Base System Greeting %-r",
        fs: new get_base_fs(),
        ps: "$ >",
        username: "root",
        password: "toor"
    },
    'michael': {
        greeting: "%+r DYNETECH TERMINAL 211 - ACCESS RESTRICTED %-r",
        fs: new get_michael_fs(),
        ps: "michael@pc211.dyne $ >",
        username: "michael",
        password: "qwerty123"
    },
    'jan': {
        greeting: "%+r DYNETECH TERMINAL 211 - ACCESS RESTRICTED %-r",
        fs: new get_michael_fs(),
        ps: "jan@mac3.dyne ~",
        username: "jan",
        password: "fruitbat66"
    }
};
