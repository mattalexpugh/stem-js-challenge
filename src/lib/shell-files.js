var help = [
    ' ',
    ' * type "ls" to see this directory\'s contents (where you can go).',
    ' * type "cd <directory>" to move to that directory (see ls).',
    ' * type "pwd" to print the working directory (where you are).',
    ' * type "cat <file>" to read a file.',
    ' * type "decrypt <file>" to decrypt an encrypted file.',
    ' * type "clear" to clear the screen.',
    ' * type "whoami" to see who you\'re logged in as.',
    ' * type "ssh <computer_address>" to open a secure connection to different PC.',
    ' * type "exit" to quit.',
    ' '
];

var file_office_computers = [
    '%+r **** HIGHLY CONFIDENTIAL !! ADMIN ONLY **** %-r',
    'USER          IP               PASSWORD',
    '================================================',
    'Sam           192.168.1.100    g3rmz',
    'Zeke          192.168.1.128    simonsays1',
    'George        192.168.1.255    iloveyou',
    'Michael       192.168.2.200    qwerty123',
    'Sara          192.168.2.210    sunsh1n3',
    'Abigail       192.168.2.240    ferrari123',
    ' '
];

var file_rosetta_stone = [
    ' ',
    'TRANSLATIONS',
    '========================================================',
    'a -> 4   b -> b    c -> c    d -> d    e -> 3',
    'f -> f   g -> g    h -> h    i -> 1    j -> j',
    'k -> k   l -> l    m -> m    n -> n    o -> 0 (zero, number)',
    'p -> p   q -> q    r -> r    s -> $    t -> t',
    'u -> u   v -> v    w -> w    x -> x    y -> y',
    'z -> z',
    ' ',
    'NOTES',
    '========================================================',
    'Substitute letters from words phrases with the above.',
    'Passwords tend to have spaces removed. For example:',
    ' ',
    '`break the system` -> br34k th3 $y$t3m -> br34kth3$y$t3m',
    '`hello bob` -> h3ll0 b0b -> h3ll0b0b',
    ' '
];

var email_admin_1 = [
    '%+r **** URGENT EMAIL - PLEASE DELETE **** %-r',
    ' ',
    'Admin,',
    ' ',
    'We need your help, ASAP. There\'s a hacker on the network causing issue. Normally, Michael ' +
        '(our IT guy) would deal with this, but he can\'t work out the encryption on some of the ' +
        'problems we\'re seeing.',
    ' ',
    'You should have a copy of all the IT staff computer addresses (IPs) in ' +
        '`officecomputers.txt` (along with their passwords) in your `/home/admin/documents` directory. ' +
        'Michael\'s has been left online for ' +
        'you to work, so you shouldn\'t have any problems connecting.',
    ' ',
    'This hacker seems smart, a lot of what they\'re doing is encrypted. Remember, you can read a ' +
        'file with `cat`, but if it looks like gibberish - it\'s encrypted, in which case you must ' +
        'use `decrypt` on it.',
    ' ',
    'Good luck.',
    'John McGilly [Head of Security]',
    ' '
];

var email_michael_1 = [
    '%+r **** URGENT EMAIL - PLEASE DELETE **** %-r',
    ' ',
    'Michael,',
    ' ',
    'It seems we\'ve been having a problem with the computer in Jan\'s office, apparently ' +
        'some hacker has taken control of parts. I know you looked at this in August, but ' +
        'this seems different. Could you ssh into it again and take a look? ',
    ' ',
    'The IP address is 192.200.5.50, I won\'t be emailing you the password, you probably have it in your system.log somewhere from last time. ',
    ' ',
    'John',
    ' '
];

var email_spam_1 = [
    ' ',
    'Good Day,',
    ' ',
    'My name is Dr William Monroe, a staff in the Private Clients Section of a well-known bank, here in London, England. ' +
        'One of our accounts, with holding balance of £15,000,000 (Fifteen Million Pounds Sterling) has been dormant ' +
        'and last operated three years ago. From my investigations and confirmation, the owner of the said account, ' +
        'a foreigner by name John Shumejda died on the 4th of January 2002 in a plane crash in Birmingham. ',
    ' ',
    'Since then, nobody has done anything as regards the claiming of this money, as he has no family member that ' +
        'has any knowledge as to the existence of either the account or the funds; and also Information from the ' +
        'National Immigration also states that he was single on entry into the UK.',
    ' ',
    'I have decided to find a reliable foreign partner to deal with. I therefore propose to do business with you,' +
        'standing in as the next of kin of these funds from the deceased and funds released to you after necessary' +
        'processes have been followed.',
    ' ',
    'This transaction is totally free of risk and troubles as the fund is legitimate and does not originate from drug,' +
        'money laundry, terrorism or any other illegal act.',
    ' ',
    'Best Regards,',
    'Dr William Monroe Financial Analysis and Remittance Manager',
    ' '
];

var email_jan_1 = [
    ' ',
    'John',
    ' ',
    'I need someone to look at this right away, if Michael\'s away then have the lead admin ' +
        'access his computer for the details, I don\'t really care how you do it - just do it. ',
    'I\'ve been getting popups on my desktop threatening the secure data on this system by ' +
        'a hacker calling themselves `crash`, I\'ve noticed some encrypted messages in my private ' +
        'folder, and a bunch of encrypted communication logs in `/log` that don\'t seem internal. ' +
        'You\'ll have to check there, as my `system.log` in `/home/jan` seems to have been hacked.',
    ' ',
    'I\'d recommend your admin look there first, try and make sense of it. It doesn\'t look like ' +
        'the attacker is on our network, so the IP address of their computer will look different.',
    ' ',
    'Thanks for this, I\'ve managed to limit `crash` to this computer only right now, ' +
        'but for how long? Who knows.',
    ' ',
    'Jan.',
    ' '
];

var email_jan_2 = [
    ' ',
    'Jan,',
    ' ',
    'I\'ve asked the admin to have a look into this. From what I can see, it seems this hacker ' +
        'is showing off. I think that the logs in `/log` can be reconstructed to find their IP ' +
        'address but I can\'t decrypt them. That\'s only half the problem, we need their password ' +
        'too. It\'s probably a phrase they use a lot, but in their so-called `h4cksp34k` - I\'ve ' +
        'put a translation table in your documents folder. Just in case you have a moment of genius!',
    ' ',
    'You\'re right too, your `system.log` in `/home/jan` is useless here!',
    'John',
    ' '
];

var log_michael = [
    '01/02/2013 - Connection to Donna\'s PC using password alb3rqu3rqi3 - SUCCESS',
    '13/05/2013 - Connection to Rodriguez\'s PC using password w4nn4f1t3 - SUCCESS',
    '15/08/2013 - Connection to Jan\'s PC using password: fruitbat66 - SUCCESS',
    '02/10/2013 - Connection to John\'s PC using password: god - FAILURE'
];

var log_jan = [
    ' ',
    '-=([$y$t3m l0g$ 3r4$3d by cr4$h])=-',
    ' ',
    'I win! :D',
    ' '
];

var CRASH_TAUNTS = [
    'cr4$h sees someone in their system!',
    'what do I have to do to make you go away...? I\'ll find something...',
    'ok, look around my system if you really want, whilst we\'re connected I\'m doing ' +
        'the same to you.'
]