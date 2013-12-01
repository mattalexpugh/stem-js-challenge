var PROFILES = {
    'base': {
        greeting: "%+r Base System %-r",
        fs: new get_base_fs(),
        ps: "$ >",
        username: "root",
        password: "toor",
        color1: "#181818",
        color2: "#555555"
    },
    'admin': {
        greeting: "%+r MAPLESOFT ADMINISTRATIVE TERMINAL 001  %-r",
        fs: new get_admin_fs(),
        ps: "admin $ >",
        username: "admin",
        password: "supersecret",
        color1: "#181818",
        color2: "#00ff00"
    },
    'michael': {
        greeting: "%+r MAPLESOFT TERMINAL 211 - ACCESS RESTRICTED %-r",
        fs: new get_michael_fs(),
        ps: "michael@pc211.dyne $ >",
        username: "michael",
        password: "qwerty123",
        color1: "#181818",
        color2: "#555555"
    },
    'jan': {
        greeting: "%+r MAPLESOFT MAC TERMINAL 3 - ACCESS RESTRICTED %-r",
        fs: new get_jan_fs(),
        ps: "jan@mac3.dyne ~",
        username: "jan",
        password: "fruitbat66",
        color1: "#181818",
        color2: "#333333"
    },
    'crash': {
        greeting: "%+r WELCOME TO THE ENDERZONE %-r",
        fs: new get_crash_fs(),
        ps: "[ crash@hades ] :: >",
        username: "crash_override",
        password: "h4ckth3g1b$0n",
        color1: "#000000",
        color2: "#ff0000"
    }
};
