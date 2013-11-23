<!--

// *** text wrap sample ***
// mass:werk, N.Landsteiner 2007

var texts = [
'1)',
'This is just a sample text to introduce the amazing word wrap facillities new with termlib.js 1.3. You must have seen this!',
'2)',
'The quick brown fox jumps over the lazy dog. (Seen this before?) Now for a break just at a word boundary ...',
'3)',
'The quick brown fox jumps over the lazy dog. (Seen this before?) Now for a line-break at a dash .... and yet another break occuring in the middle of a dashed-word but not exactly filling the line ...',
'4)',
'The quick brown fox jumps over the lazy dog. Now this break should occure just(here) before the parenthesis ...',
'5)',
'This is a sentence containing a word stretching over more than 1 line ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ and so on ...',
'6)',
'And this is a sentence containing a word stretching over 2 lines ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 and so on ...'
];

var kant=[
'%+uKant, Immanuel: Critique of Pure Reason. Part I, Chapter I:%-u',
'',
'                         Kritik der reinen Vernunft',
'                                     I.',
'                       Transzendentale Elementarlehre',
'',
'                     Der transzendentalen Elementarlehre',
'                                Erster Teil',
'',
'                        Die transzendentale Ästhetik',
'',
'                                    § 1',
'Auf welche Art und durch welche Mittel sich auch immer eine Erkenntnis auf Gegenstände beziehen mag, es ist doch diejenige, wodurch sie sich auf dieselbe unmittelbar bezieht, und worauf alles Denken als Mittel abzweckt, die %+iAnschauung%-i. Diese findet aber nur statt, sofern uns der Gegenstand gegeben wird; dieses aber ist wiederum, uns Menschen wenigstens, nur dadurch möglich, daß er das Gemüt auf gewisse Weise affiziere. Die Fähigkeit (Rezeptivität), Vorstellungen durch die Art, wie wir von Gegenständen affiziert werden, zu bekommen, heißt %+iSinnlichkeit%-i. Vermittelst der Sinnlichkeit also werden uns Gegenstände %+igegeben%-i, und sie allein liefert uns %+iAnschauungen%-i; durch den Verstand aber werden sie %+igedacht%-i, und von ihm entspringen %+iBegriffe%-i. Alles Denken aber muß sich, es sei geradezu (direkte) oder im Umschweife (indirekte), vermittelst gewisser Merkmale, zuletzt auf Anschauungen, mithin, bei uns, auf Sinnlichkeit beziehen, weil uns auf andere Weise kein Gegenstand gegeben werden kann.',
'',
'Die Wirkung eines Gegenstandes auf die Vorstellungsfähigkeit, sofern wir von demselben affiziert werden, ist %+iEmpfindung%-i. Diejenige Anschauung, welche sich auf den Gegenstand durch Empfindung bezieht, heißt %+iempirisch%-i. Der unbestimmte Gegenstand einer empirischen Anschauung heißt %+iErscheinung%-i.',
'',
'In der Erscheinung nenne ich das, was der Empfindung korrespondiert, die %+iMaterie%-i derselben, dasjenige aber, welches macht, daß das Mannigfaltige der Erscheinung in gewissen Verhältnissen geordnet werden kann, nenne ich die %+iForm%-i der Erscheinung. Da das, worinnen sich die Empfindungen allein ordnen, und in gewisse Form gestellt werden können, nicht selbst wiederum Empfindung sein kann, so ist uns zwar die Materie aller Erscheinung nur a posteriori gegeben, die Form derselben aber muß zu ihnen insgesamt im Gemüte a priori bereitliegen und daher abgesondert von aller Empfindung können betrachtet werden.',
'',
'Ich nenne alle Vorstellungen rein (im transzendentalen Verstande), in denen nichts, was zur Empfindung gehört, angetroffen wird. Demnach wird die reine Form sinnlicher Anschauungen überhaupt im Gemüte a priori angetroffen werden, worinnen alles Mannigfaltige der Erscheinungen in gewissen Verhältnissen angeschaut wird. Diese reine Form der Sinnlichkeit wird auch selber %+ireine Anschauung%-i heißen. So, wenn ich von der Vorstellung eines Körpers das, was der Verstand davon denkt, als Substanz, Kraft, Teilbarkeit usw., imgleichen, was davon zur Empfindung gehört, als Undurchdringlichkeit, Härte, Farbe usw. absondere, so bleibt mir aus dieser empirischen Anschauung noch etwas übrig, nämlich Ausdehnung und Gestalt. Diese gehören zur reinen Anschauung, die a priori, auch ohne einen wirklichen Gegenstand der Sinne oder Empfindung, als eine bloße Form der Sinnlichkeit im Gemüte stattfindet.',
'',
'Eine Wissenschaft von allen Prinzipien der Sinnlichkeit a priori nenne ich die %+itranszendentale Ästhetik%-i. Es muß also eine solche Wissenschaft geben, die den ersten Teil der transzendentalen Elementarlehre ausmacht, im Gegensatz derjenigen, welche die Prinzipien des reinen Denkens enthält, und transzendentale Logik genannt wird.',
'',
'In der transzendentalen Ästhetik also werden wir zuerst die Sinnlichkeit %+iisolieren%-i, dadurch, daß wir alles absondern, was der Verstand durch seine Begriffe dabei denkt, damit nichts als empirische Anschauung übrigbleibe. Zweitens werden wir von dieser noch alles, was zur Empfindung gehört, abtrennen, damit nichts als reine Anschauung und die bloße Form der Erscheinungen übrigbleibe, welches das einzige ist, das die Sinnlichkeit a priori liefern kann. Bei dieser Untersuchung wird sich finden, daß es zwei reine Formen sinnlicher Anschauung, als Prinzipien der Erkenntnis a priori gebe, nämlich Raum und Zeit, mit deren Erwägung wir uns jetzt beschäftigen werden.'
]

var help = [
	'%+r **** termlib.js text wrap sample **** %-r',
	' ',
	' * type "tests -w" for wrapping tests.',
	' * type "tests" (without option) to see the same texts without wrapping.',
	' * type "kant" for some longer text (by Immanuel Kant).',
	' * type "help" to see this page.',
	' * type "exit" to quit.',
	' '
]

var term;

function termOpen() {
	if ((!term) || (term.closed)) {
		term = new Terminal(
			{
				x: 220,
				y: 70,
				termDiv: 'termDiv',
				bgColor: '#232e45',
				greeting: help.join('%n'),
				handler: termHandler,
				exitHandler: termExitHandler,
				wrapping: true
			}
		);
		term.open();
		
		// dimm UI text
		var mainPane = (document.getElementById)?
			document.getElementById('mainPane') : document.all.mainPane;
		if (mainPane) mainPane.className = 'lh15 dimmed';
	}
}

function termExitHandler() {
	// reset the UI
	var mainPane = (document.getElementById)?
		document.getElementById('mainPane') : document.all.mainPane;
	if (mainPane) mainPane.className = 'lh15';
}

function termHandler() {
	// default handler + exit
	this.newLine();
	if (this.lineBuffer.match(/^\s*exit\s*$/i)) {
		this.close();
		return;
	}
	else if (this.lineBuffer.match(/^\s*tests\s+-w\s*$/i)) {
		this.write('starting tests with wrap %+ion%-i:');
		this.newLine();
		this.newLine();
		this.write(texts);
	}
	else if (this.lineBuffer.match(/^\s*tests\s*$/i)) {
		this.wrapOff();
		this.write('starting tests with wrap %+ioff%-i:');
		this.newLine();
		this.newLine();
		this.write(texts);
		this.wrapOn();
	}
	else if (this.lineBuffer.match(/^\s*kant\s*$/i)) {
		this.write(kant, true);
		return;
	}
	else if (this.lineBuffer.match(/^\s*help\s*$/i)) {
		this.clear();
		this.write(help);
	}
	else if (this.lineBuffer != '') {
		// echo with write for wrapping, but escape any mark-up
		this.write('You wrote: '+this.lineBuffer.replace(/%/g, '%%'));
		this.newLine();
	}
	this.prompt();
}


// demo hooks

function test(command) {
	if ((!term) || (term.closed)) {
		alert('Please open the terminal first!');
		return;
	}
	TermGlobals.importEachLine( command );
}

//-->