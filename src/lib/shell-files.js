var help = [
    ' ',
    ' * type "ls" to see this directory\'s contents (where you can go).',
    ' * type "cd <directory>" to move to that directory (see ls).',
    ' * type "pwd" to print the wording directory (where you are).',
    ' * type "cat <file>" to read a file.',
    ' * type "decrypt <file>" to decrypt an encrypted file.',
    ' * type "whoami" to see who you\'re logged in as.',
    ' * type "ssh <computer>" to open a secure shell connection to a PC.',
    ' * type "exit" to quit.',
    ' '
];

var email_admin_1 = [
    '%+r **** URGENT EMAIL - PLEASE DELETE **** %-r',
    ' ',
    'Michael,',
    ' ',
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
    'The IP address is 192.200.5.50, I won\'t be emailing you the password, you probably have it in your logs somewhere from last time. ',
    ' ',
    'John'
];

var email_spam_1 = [
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
    'Dr William Monroe Financial Analysis and Remittance Manager'
];

var email_jan_1 = [
    'John',
    ' ',
    'I need someone to look at this right away, if Michael\'s away then have the lead admin ' +
        'access his computer for the details, I don\'t really care how you do it - just do it. ',
    'I\'ve been getting popups on my desktop threatening the secure data on this system by ' +
        'a hacker calling themselves `crash`, I\'ve noticed some encrypted messages in my private ' +
        'folder, and a bunch of encrypted communication logs in /log that don\'t seem internal.',
    ' ',
    'I\'d recommend your admin look there first, try and make sense of it. It doesn\'t look like ' +
        'the attacker is on our network, so the IP address of their computer will look different.',
    ' ',
    'Thanks for this, I\'ve managed to limit `crash` to this computer only right now, ' +
        'but for how long? Who knows.',
    ' ',
    'Jan.'
];

var log_michael = [
    '01/02/2013 - Connection to Donna\'s PC using password alb3rqu3rqi3 - SUCCESS',
    '13/05/2013 - Connection to Rodriguez\'s PC using password w4nn4f1t3 - SUCCESS',
    '15/08/2013 - Connection to Jan\'s PC using password: fruitbat66 - SUCCESS',
    '02/10/2013 - Connection to John\'s PC using password: god - FAILURE'
];

var log_jan = [
    'foo'
]