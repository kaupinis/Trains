//eo_lang.js

const en = 0;
const es = 1;
const fr = 2;
const de = 3;
const it = 4;
const ja = 5;
const zh = 6;
const cmn = 6;

/*
var BD = [];
var BD[0] = [];
var BD[1] = [];
var BD[2] = [];
var BD[3] = [];

BD[0][0] = 'List<br><span style="color:black">No<br>Next</span>';

BD[0][1] = 'Quiet<br><span style="color:black">Reset</span>';

BD[0][2] = '<img src="images/snd.png" id="sb3img"  width="36" height="28" alt="Enable Sound / gamma">Stat<br><span style="color:black">Yes</span>';

BD[0][3] = 'Alt<br><span style="color:black">Search</span><br><span style="color:black;font-size:6pt">Monitor</span><br><img src="images/mic.png" id="sb4img"  width="20" height="20" alt="Enable Speech Recognition">';

BD[0][4] = 'Menu<br><span style="color:black">Back</span><br><span style="color:black;font-size:6pt">QuikHelp</span>';

BD[1][0] = 'Lista<br><span style="color:black">No<br>Siguiente</span>';

BD[1][1] = 'Callar<br><span style="color:black">Restablecer</span>';

BD[1][2] = '<img src="images/snd.png" id="sb3img"  width="36" height="28" alt="Enable Sound / gamma">Stat<br><span style="color:black">Sí</span>';

BD[1][3] = 'Alt<br><span style="color:black">Search</span><br><span style="color:black;font-size:6pt">Monitor</span><br><img src="images/mic.png" id="sb4img"  width="20" height="20" alt="Enable Speech Recognition">';

BD[1][4] = 'Menú<br><span style="color:black">Back</span><br><span style="color:black;font-size:6pt">QuikHelp</span>';

BD[2][0] = 'List<br><span style="color:black">No<br>Next</span>';

BD[2][1] = 'Quiet<br><span style="color:black">Reset</span>';

BD[2][2] = '<img src="images/snd.png" id="sb3img"  width="36" height="28" alt="Enable Sound / gamma">Stat<br><span style="color:black">Yes</span>';

BD[2][3] = 'Alt<br><span style="color:black">Search</span><br><span style="color:black;font-size:6pt">Monitor</span><br><img src="images/mic.png" id="sb4img"  width="20" height="20" alt="Enable Speech Recognition">';

BD[2][4] = 'Menu<br><span style="color:black">Back</span><br><span style="color:black;font-size:6pt">QuikHelp</span>';

BD[3][0] = 'List<br><span style="color:black">No<br>Next</span>';

BD[3][1] = 'Quiet<br><span style="color:black">Reset</span>';

BD[3][2] = '<img src="images/snd.png" id="sb3img"  width="36" height="28" alt="Enable Sound / gamma">Stat<br><span style="color:black">Yes</span>';

BD[3][3] = 'Alt<br><span style="color:black">Search</span><br><span style="color:black;font-size:6pt">Monitor</span><br><img src="images/mic.png" id="sb4img"  width="20" height="20" alt="Enable Speech Recognition">';

BD[3][4] = 'Menu<br><span style="color:black">Back</span><br><span style="color:black;font-size:6pt">QuikHelp</span>';

function updateButtons()
{
  document.getElementById("sb1").innerHTML = BD[SelectedLanguage][0];
  document.getElementById("sb2").innerHTML = BD[SelectedLanguage][1];
  document.getElementById("sb3").innerHTML = BD[SelectedLanguage][2];
  document.getElementById("sb4").innerHTML = BD[SelectedLanguage][3];
  document.getElementById("sb5").innerHTML = BD[SelectedLanguage][4];
}
*/

function sayPhrase(s)
{
  if(s.indexOf("EOP" == 0))
  {
    var r = EOP[SelectedLanguage][s];
    if(typeof r === 'undefined')
    {
      say(EOP[0][s]);   
    }
    else say(r);
  }
  else if(SelectedLanguage == 0) say(s);
  else
  {
    say(s);   
  }
   
}

function getPhrase(s)
{
  if(s.indexOf("EOP") == 0)
  {
    var r = EOP[SelectedLanguage][s];
    if(typeof r === 'undefined')
    {
      r = EOP[0][s];   
    }
    return(r);
  }
  else if(SelectedLanguage == 0) return(s);
  else
  {
    return(s);   
  }
}

var EOP = [];

EOP[en] = {
    EOP1: "Offline schedule mode.",
    EOP2: "Use the lower left corner quiet button to reset.",
    EOP3: "Click the right side center Menu button twice for help.",
    EOP4: "No itineraries found",
    EOP5: "Geolocation not enabled.",
    EOP6: "Shall I repeat this?",
    EOP7: "Find connections from one of the following",
    EOP8: "No find connections results.",
    EOP9: "then find connections to one of the following",
    EOP10: "taking the trip ",
    EOP11: "starting about now",
    EOP12: "Monitor this itinerary?",
    EOP13: "Monitor these connections?",
    EOP14: "Search started.",
    EOP15: "No search results.",
    EOP16: "Add a letter. ",
    EOP17: "Do you wish to delete the last character?",
    EOP18: "Do you want to exit number mode?",
    EOP19: "Do you want to enter a number?",
    EOP20: "Add a blank space?",
    EOP21: "Sketch a new number. ",
    EOP22: "Sketch a new letter. ",
    EOP23: "Sketch a letter. ",
    EOP24: "Sketch a number. ",
    EOP25: "Number mode off.",
    EOP26: "Vehicle is ",
    EOP27: " from ",
    EOP28: " to ",
    EOP29: "Change selected stop from ",
    EOP30: "Train stop",
    EOP31: "Subway stop",
    EOP32: "Bus stop",
    EOP33: "Search for one of the following: All stops",
    EOP34: "All stops?",
    EOP35: "Add a letter to your search phrase. ",
    EOP36: "Pick one of the following search results: ",
    EOP37: "Your search phrase is spelled:",
    EOP38: "Monitor this trip?",
    EOP39: "Stop monitoring this trip?",
    EOP40: "Select one of the following favorites: Here. ",
    EOP41: "Home. ",
    EOP42: "favorite stop 1 ",
    EOP43: "favorite stop 2. ",
    EOP44: "favorite trip 1. ",
    EOP45: "favorite trip 2. ",
    EOP46: "favorite itinerary 1. ",
    EOP47: "favorite itinerary 2. ",
    EOP48: "Save ",
    EOP49: " as Home.",
    EOP50: " as favorite stop 1.",
    EOP51: " as favorite stop 2.",
    EOP52: " as favorite trip 1.",
    EOP53: " as favorite trip 2.",
    EOP54: " as favorite itinerary 1.",
    EOP55: " as favorite itinearary 2.",
    EOP56: "Here is a list of some possible trips from ",
    EOP57: " to ",
    EOP58: "Sorry, no possible trips were found.",
    EOP59: "Repeating the options.",
    EOP60: "Connections List of one option.",
    EOP61: "Connections List of ",
    EOP62: " options.",
    EOP63: "Option ",
    EOP64: " Depart ",
    EOP65: " at ",
    EOP66: " arrive ",
    EOP67: " with ",
    EOP68: " transfers.",
    EOP69: "Leg ",
    EOP70: " departs ",
    EOP71: " and arrives at ",
    EOP72: "Final leg.",
    EOP73: "Start station ",
    EOP74: "is",
    EOP75: " miles away from here.",
    EOP76: "You are ",
    EOP77: " miles or ",
    EOP78: " minutes away from the ",
    EOP79: " stop.",
    EOP80: "The selected itinerary is not within a one hour time window.",
    EOP81: "Here is a list of what's nearby ",
    EOP82: "There are no stops nearby.",
    EOP83: "There are no imminent trips near ",
    EOP84: "End of list.",
    EOP85: "platforms at this station include ",
    EOP86: " or you can ",
    EOP87: "Selecting a stop.",
    EOP88: "Switching to ",
    EOP89: " stop list. OK?",
    EOP90: " which is ",
    EOP91: " miles away",
    EOP92: "Select a stop from the following list or click ALT for a different list.",
    EOP93: "No alerts.",
    EOP94: "Alert ",
    EOP95: " of ",
    EOP96: "More details?",
    EOP97: "no upcoming stops listed",
    EOP98: " in ",
    EOP99: "on track ",
    EOP100: " next stop ",
    EOP101: "Bus ",
    EOP102: "Select a preference item.",
    EOP103: "Select a help topic.",
    EOP104: "Quick help.",
    EOP105: "Search by spelling.",
    EOP106: "Sketch each letter on the pad using straight vertical, straight horizontal or straight diagonal lines. The letter 'O' is rectangular. The letter 'D' has one vertical and two diagonal lines.",
    EOP107: "Try again",
    EOP108: "Is that ",
    EOP109: "Timetable",
    EOP110: "Connections",
    EOP111: "Connections Details",
    EOP112: "What's Nearby",
    EOP113: "Direction",
    EOP114: "Trip Strategies"
}

EOP[es] = {
    EOP1: "modo offline.",
    EOP2: "Use el botón de la esquina inferior izquierda para restablecer.",
    EOP3: "Haga clic en el botón Menú del centro del lado derecho dos veces para obtener ayuda.",
    EOP4: "No se encontraron itinerarios.",
    EOP5: "Geolocation not enabled.",
    EOP6: "¿Debo repetir esto?",
    EOP109: "Horario",
    EOP110: "Conexiones",
    EOP111: "Detalles de la conexión",
    EOP112: "Que esta cerca",
    EOP113: "Direction",
    EOP114: "Trip Strategies"
    
}
EOP[fr] = {
    EOP1: "mode hors-ligne.",
    EOP2: "Utilisez le bouton de coin inférieur gauche pour réinitialiser.",
    EOP3: "Cliquez deux fois sur le bouton droit du menu Centre à droite pour obtenir de l'aide.",
    EOP4: "Aucun itinéraire trouvé",
    EOP5: "Geolocation not enabled.",
    EOP6: "Dois-je répéter cela?",
    EOP109: "Horaire",
    EOP110: "Connexions",
    EOP111: "Détails des connexions",
    EOP112: "Qu'est-ce qui est à proximité",
    EOP113: "Direction",
    EOP114: "Trip Strategies"
    
}
EOP[de] = {
    EOP1: "Offline-Modus.",
    EOP2: "Verwenden Sie die untere linke Ecktaste, um zurückzusetzen.",
    EOP3: "Klicken Sie zweimal auf die Schaltfläche der rechten Seite der Seitenmitte für die Hilfe.",
    EOP4: "Keine Routen gefunden",
    EOP5: "Geolocation not enabled.",
    EOP6: "Soll ich das wiederholen? ",
    EOP109: "Fahrplan",
    EOP110: "Verbindungen",
    EOP111: "Details von Verbindungen",
    EOP112: "Was ist in der Nähe?",
    EOP113: "Direction",
    EOP114: "Trip Strategies"
}

EOP[it] = {
    EOP1: "modalità offline",
    EOP2: "Utilizzare il pulsante Tranquillo angolo in basso a sinistra per ripristinare.",
    EOP3: "Fare clic due volte il pulsante del menu del centro laterale destro per assistenza.",
    EOP4: "Nessun itinerario trovato",
    EOP5: "Geolocalizzazione non abilitata",
    EOP6: "Devo ripetere questo?",
    EOP109: "Orario",
    EOP110: "Collegamenti",
    EOP111: "Dettagli dei collegamenti",
    EOP112: "Stop nelle vicinanze",
    EOP113: "Direction",
    EOP114: "Trip Strategies"
}

EOP[ja] = {
    EOP1: "オフラインモード",
    EOP2: "左下隅の静かなボタンを使ってリセットしてください。",
    EOP3: "ヘルプのために右側のセンターメニューボタンを2回クリックします。",
    EOP4: "旅程は見つかりませんでした",
    EOP5: "地理化は有効になっていません",
    EOP6: "これを繰り返すのですか？",
    EOP109: "時刻表",
    EOP110: "接続",
    EOP111: "接続の詳細",
    EOP112: "近くの停車場",
    EOP113: "Direction",
    EOP114: "Trip Strategies"
}

EOP[zh] = {
    EOP1: "离线模式",
    EOP2: "使用左下角静安按钮重置。",
    EOP3: "单击右侧中心菜单按钮两次以获取帮助。",
    EOP4: "没有找到行程",
    EOP5: "无法启用地理位置",
    EOP6: "我要重复一遍吗？",
    EOP109: "时间表",
    EOP110: "连接",
    EOP111: "连接细节",
    EOP112: "附近停靠",
    EOP113: "Direction",
    EOP114: "Trip Strategies"
}

var helptopics = [];

helptopics[en] = ["Quick Help", "Overview", "Using the menu", "Getting status and Selecting a trip", "Other platforms at a stop", "Selecting a stop", "Search for stop by sketching", "Search for Stop", "Finding connections", "Monitoring a trip", "Known Issues", "Speech Recognition","Cookies"
];

helptopics[es] = ["ayuda rapida", "visión general", "usando el menú", "obtener el estado y seleccionar un viaje", "Otras plataformas en una parada", "Seleccionar una parada", "Buscar parada dibujando", 
"Buscar parada", "Encontrar conexiones", "Seguimiento de un viaje", "Problemas conocidos", "Reconocimiento de voz", "Cookies"
];
helptopics[fr] = ["aide rapide", "Aperçu", "en utilisant le menu", "obtenir le statut et sélectionner un voyage", "Autres plates-formes à un arrêt", "Sélection d'un arrêt", "Rechercher un arrêt en esquissant",
"Rechercher un arrêt", "Trouver des connexions", "Surveiller un voyage", "Problèmes connus", "Reconnaissance de la parole", "Cookies"
];
helptopics[de] = ["schnelle Hilfe", "Überblick", "über das Menü", "Status abrufen und eine Reise auswählen",
"Andere Plattformen an einer Haltestelle", "Stopp auswählen", "Suchen Sie nach Stopp durch Skizzieren",
"Suche nach Stopp", "Verbindungen finden", "Eine Reise überwachen", "Bekannte Probleme", "Spracherkennung",
"Cookies"
];

helptopics[it] = ["Guida rapido", "sommario", "Come usare il menu", "Ottenere lo stato e selezionando un viaggio", "Altre piattaforme in una fermata", "Selezione di una fermata", "Cerca la fermata abbozzando",
"Cerca Stop", "Trovare itinerari", "Monitoraggio di un viaggio", "Problemi noti", "Riconoscimento vocale",
"Cookies"
];

helptopics[ja] = ["クイックヘルプ", "概要", "メニューの使い方",  "ステータスを取得して旅行を選択します", "停留所の他のプラットフォーム", "停止を選択する", "スケッチによる停止を検索する", "停止を検索する", "旅程を見つける", "旅行の監視",
"既知の問題点", "音声認識", "クッキー"
];

helptopics[zh] = ["快速帮助", "概括", "如何使用菜单", "获得状态并选择旅行", "其他平台停止", "选择停止", 
"通过素描搜索停止", "搜索停止", "寻找行程", "监督旅行", "已知的问题", "语音识别", "饼干"
];

var AudioMenu = [];

AudioMenu[en] = ["Main menu. Alerts", "What's nearby", "Find Connections", "Select a Common Stop", "Platforms at this station", "Direction",
 "Search for Stop", "Find a carrier or bus route", "Get favorites ", "Save favorites", "Last Connections", "Last Stop", "Last trip","Preferences","Help topics"
];

AudioMenu[es] = ["Menú principal. Alertas", "paradas cercanas", "encontrar conexiones",
"Seleccione una parada común", "Plataformas en esta estación.", "Dirección","Buscar parada",
"buscar bocetos", "Obtener favoritos", "guardar favoritos", "Últimas conexiones", 
"última parada", "último viaje", "preferencias", "temas de ayuda"];

AudioMenu[fr] = ["Menu principal. Alertes", "Arrêts à proximité", "Trouver des connexions",
"Sélectionnez un arrêt commun", "plates-formes à cette station","Direction", "Recherche d'arrêt", 
"Recherche par esquisse", "faire des favoris", "sauver les favoris", "Dernières connexions",
"dernier arrêt", "dernier voyage", "préférences", "sujets d'aide"];

AudioMenu[de] = ["Hauptmenü. Reisebewertung", "nahen Haltestellen", "Verbindungen finden.",
"Wählen Sie einen gewöhnlichen Zughalt aus", "Plattformen an dieser Station", "Richtung","Suche nach Stopp",
"Suche nach Skizzieren.", "Favoriten", "Favoriten speichern", "letzte Verbindungen", 
"letzter Halt", "letzte Reise", "Präferenzen", "Hilfethemen"];

AudioMenu[it] = ["Menu principale. Avvisi", "Stazioni nelle vicinanze", "trova itinerari", 
"Seleziona una fermata comune", " Piattaforme in questa stazione", "Direzione","Cerca tappa del treno",
"Cerca Sketching.", "Ottieni i preferiti", "Salva i preferiti", "Ultimi collegamenti", 
"Ultima fermata", "Ultimo viaggio", "Preferenze", "Argomenti di aiuto"
];

AudioMenu[ja] = ["メインメニュー。 警戒している", "近くの駅", "旅程を見つけます", "一般的な停留所を選択してください","方向",
"このステーションのプラットフォーム", "電車の停車場を検索する", "スケッチで検索します", "お気に入りを得る", 
"お気に入りを保存します", "最後の接続", "終点", "最後の旅", "環境設定", "ヘルプトピックス"
];

AudioMenu[zh] = ["主菜单。 警报", "附近的车站", "找到行程", "选择一个常见的停止", "方向","这个站的平台", "搜索火车站",
"通过素描搜索", "收藏夹", "保存收藏夹", "最后一个连接", "终点站", "最后一次旅行", "偏好", "帮助主题"
];

var QuickHelp = [];
var Overview = [];
var UMenu = [];
var Rstatus = [];
var Platforms = [];
var SelStop = [];
var Sketch = [];
var Srch = [];
var Fcon = [];
var MTrip = [];
var Srec = [];
var KIssues = [];
var Cook = [];

QuickHelp[en] = "With eight olives Trains in audio mode, you select functions from audio menu lists by pressing five buttons along the edges of your screen.^  Click the southwest corner button to reset everything to the quiet state.^  Use the top two corner buttons to navigate a list.^  The northeast corner button gives the time and the currently selected place, or answers YES to select a menu list option.^  The northwest corner button advances to the next menu list option, or answers NO.^   The menu button at the east or center of the right edge of the screen starts listing the main menu options, or starts the Help menu, or goes back one list item.^  Press the multi-function southeast corner button to select an alternate common stop list, or initiate a search, or  monitor a selected trip.^   Now, click the southwest quiet reset button for normal operation, or use the top two buttons to navigate for more help topics.^  Shall I repeat this?";

QuickHelp[es] =
"Con eight olives trains en modo de audio, selecciona las funciones de las listas de menú de audio presionando cinco botones a lo largo de los bordes de su pantalla.^   Haga clic en el botón Southwest Corner para restablecer todo al estado tranquilo.^   Use los dos botones de esquina superior para navegar LISTA.^   El botón de la esquina del noreste le da el tiempo y el lugar seleccionado actualmente, o las respuestas SÍ para seleccionar una opción de lista de menú.^   El botón Northwest Corner avanza a la siguiente opción de lista del menú, o respuestas no.^   El botón de menú en el este O centro del borde derecho de la pantalla comienza a listar las opciones del menú principal, o inicia el menú de ayuda, o regresa un elemento de lista.^   Presione el botón de la esquina de su sureste multifunción para seleccionar una lista de parada comunes alternativa, o iniciar una búsqueda , o monitorea un viaje seleccionado   ahora, haga clic en el botón de reinicio de silencio suroeste para el funcionamiento normal, o use los dos botones principales para navegar para obtener más temas de ayuda.^   ¿Debo repetir esto?";

QuickHelp[fr] =
"Avec eight olives trains en mode audio, vous sélectionnez des fonctions dans des listes de menus audio en appuyant sur cinq boutons le long des bords de votre écran.^   Cliquez sur le bouton Southwest Corner pour tout réinitialiser à l'état calme.^   Utilisez les deux boutons de coin supérieurs pour naviguer sur un Liste.^   Le bouton de coin nord-est donne l'heure et l'endroit actuellement sélectionné, ou des réponses Oui pour sélectionner une option de liste de menus.^   Le bouton Northwest Corner avance à l'option de la liste de menus suivante, ou répond no.^   Le bouton de menu de l'est ou le centre du bord droit de l'écran commence à répertorier les options de menu principales ou à démarrer le menu d'aide ou à remonter un élément de liste.^   Appuyez sur la touche MULTI-FONCTION SUD-EST pour sélectionner une autre liste d'arrêt courante ou une recherche Ou surveiller un voyage sélectionné   Maintenant, cliquez sur le bouton de réinitialisation silencieux du sud-ouest pour un fonctionnement normal ou utilisez les deux boutons les plus élevés pour naviguer pour plus de sujets d'aide.^   Dois-je répéter cela?";

QuickHelp[de] =
"Mit acht Oliven-Zügen im Audiomodus wählen Sie Funktionen aus Audio-Menülisten aus, indem Sie auf den Rändern Ihres Bildschirms auf fünf Tasten drücken.^   Klicken Sie auf die Schaltfläche Südwest-Eck-Taste, um alles in den ruhigen Zustand zurückzusetzen.^   Navigieren Sie mit den oberen TOPEN TOPEN TOPEN Liste.^   Die Nordost-Eck-Taste gibt der Zeit und den aktuell ausgewählten Ort an oder antwortet Ja, um eine Menütieroption auszuwählen.^   Die Nordwest-Eckknopf geht zur nächsten Menütieroption oder antwortet nein.^   Die Menütaste im Osten oder Mitte des rechten Randes des Bildschirms beginnt, die Hauptmenüoptionen aufzulisten oder das Hilfemenü zu starten, oder geht ein Listenelement zurück.^   Drücken Sie die Multifunktions-Südost-Eck-Taste, um eine alternative gemeinsame Stoppliste auszuwählen oder eine Suche initiieren , oder überwachen Sie einen ausgewählten TRIP   Nun, klicken Sie auf die Südwest-Release-Reset-Taste für den Normalbetrieb oder verwenden Sie die oberen beiden Tasten, um weitere Hilfethemen zu navigieren.^   Soll ich das wiederholen?";

QuickHelp[it] =
"Con otto olives si allena in modalità audio, seleziona le funzioni da elenchi di menu audio premendo cinque pulsanti lungo i bordi dello schermo.^ Fare clic sul pulsante Angolo sud-ovest per ripristinare tutto nello stato silenzioso.^ Utilizzare i primi due pulsanti d'angolo per navigare .^ Il pulsante dell'angolo nord-orientale dà il tempo e il luogo attualmente selezionato, o risponde Sì per selezionare un'opzione di elenco di menu.^ Il pulsante dell'angolo nord-ovest avanza all'opzione di elenco dei menu successivo o non risponde il pulsante MENU a est o al centro del il bordo destro dello schermo inizia a elencare le opzioni del menu principale o avvia il menu Guida o torna indietro di un elemento di elenco.^ Premere il pulsante multifunzione sudorientale multifunzione per selezionare un elenco di arresto comuni alternativo o avviare una ricerca o monitorare un selezionato Viaggio ora, fai clic sul pulsante di ripristino silenzioso sud-ovest per il normale funzionamento o utilizzare i primi due pulsanti per navigare per più argomenti della Guida.^ Devo ripetere questo? ";

QuickHelp[ja] =
"オーディオモードで8つのOLIブの列車では、画面の端に沿って5つのボタンを押して、オーディオメニューリストから機能を選択します。 南西コーナーボタンをクリックして、静かな状態にすべてをリセットします。 リストを移動するには、上部の2つのコーナーボタンを使用します。 北東コーナーボタンは時間と現在選択されている場所を与えます。また、メニューリストオプションを選択するにはYesに回答します。 Northwest Cornerボタンは、次のメニューリストオプションに進みます。 画面の右端のEASTまたは中央のメニューボタンは、メインメニューオプションのリストのリストを開始するか、ヘルプメニューを起動するか、1つのリスト項目を返します。 多機能南東コーナーボタンを押して代替共通停止リストを選択したり、検索を開始したり、選択したトリップを監視してください。通常の操作のためにSouthwest Quiet Resetボタンをクリックするか、上部2つのボタンを使用してもっとヘルプトピックをナビゲートします。 。 これを繰り返すのですか？";

QuickHelp[zh] =
"在音频模式下八个olives列车，通过沿着屏幕边缘按下五个按钮，从音频菜单列表中选择功能。 单击Southwest Corner按钮将所有内容重置为安静状态。 使用前两个角按钮导航列表。 东北角按钮给出时间和当前所选的位置，或者答案是选择菜单列表选项。 Northwest Corner按钮进入下一个菜单列表选项，或答案否。 屏幕右边缘的EAST或中心的菜单按钮开始列出主菜单选项，或启动帮助菜单，或者返回一个列表项。 按Multi-Function Southeast Corner按钮选择备用公共停止列表，或者立即启动搜索或监视选定的行程，单击正常操作的Southwest Quiet Reset按钮，或使用前两个按钮导航以获得更多帮助主题 。 我要重复一遍吗？";

Overview[en] = "eight olives trains is a transit schedule app that supports real time status for MBTA trains, subways and buses, Metro North trains, Long Island railroad and New York subways.^  Schedules are included for other trains and buses.^  It works best when you are on-line and have allowed access to your geolocation, but it also supports certain schedule only features when offline.^  The Audio Mode speaks to you if your platform supports speech synthesis.^  You interact using five floating buttons located at the four screen corners and the center right edge.^  From your selected location you can get upcoming arrivals and departures, select and monitor trips, find nearby stops, get a list of connection options from point 'A' to point 'B', or select stops by sketching, spelling or list.^  When in doubt, click the southwest reset button to return to the quiet state.^ Your browser may ask your permission to access your geolocation data.^  Shall I repeat this?";

Overview[es] = 
"eight olives trains es una aplicación de programación de tránsito que admite el estado en tiempo real para los trenes de MBTA, los subterráneos y los autobuses, los trenes de Metro North, Long Island Railroad y New York Subways.^   Los horarios están incluidos para otros trenes y autobuses.^   Funciona mejor cuando estás En línea y han permitido acceder a su geolocalización, pero también admite ciertas funciones de programación solo cuando está fuera de línea.^   El modo de audio le habla si su plataforma admite síntesis de voz.^   Interactúa usando cinco botones flotantes ubicados en las cuatro esquinas de la pantalla y El borde derecho central.^   Desde su ubicación seleccionada, puede obtener las próximas llegadas y salidas, seleccione y Monitoree los viajes, encuentre paradas cercanas, obtenga una lista de opciones de conexión desde el punto 'A' a Punto 'B', o seleccione las paradas al dibujar, Ortografía o lista.^   En caso de duda, haga clic en el botón Southwest Restablecer para volver al estado tranquilo.^   Su navegador puede pedirle su permiso para acceder a sus datos de geolocalización.^   ¿Debo repetir esto? ";

Overview[fr] = 
"eight olives trains est une application de planification de transit qui soutient le statut de temps réel des trains MBTA, des métrages et des bus, des trains de Metro North, de Long Island Railroad et de New York Subways.^   Les horaires sont inclus pour d'autres trains et autobus.^   ça marche mieux quand tu es En ligne et ont permis d'accéder à votre géolocalisation, mais il prend également en charge certaines fonctionnalités de la planification uniquement lorsqu'il est hors ligne.^   Le mode audio vous indique si votre plate-forme prend en charge la synthèse de la parole.^   Vous interagissez en utilisant cinq boutons flottants situés sur les quatre coins de l'écran et Le Centre Droit Edge.^   Depuis votre emplacement sélectionné Vous pouvez obtenir des arrivées et des départs à venir, sélectionnez et surveillez les voyages, trouvez les arrêts à proximité, obtenez une liste des options de connexion du point 'A' au point 'B' ou de sélectionner des arrêts en esquissant, orthographe ou liste.^   En cas de doute, cliquez sur le bouton de réinitialisation du sud-ouest pour revenir à l'état calme.^   Votre navigateur peut demander à votre permission d'accéder à vos données de géolocalisation.^   Dois-je répéter cela? ";

Overview[de] = 
"Eight Olives Trains ist eine Transit-Zeitplan-App, die den Echtzeitstatus für MBTA-Züge, U-Bahnen und Busse, Metro-North, Long Island Railroad und New York unterstützt.^   Zeitpläne sind für andere Züge und Busse enthalten.^   Es funktioniert am besten, wenn Sie es sind Online und haben Zugriff auf Ihre Geolocation, aber es unterstützt jedoch auch bestimmte Zeitpläne nur Funktionen, wenn der Audiomodus von Ihnen spricht, wenn Ihre Plattform Sprachsynthese unterstützt.^   Sie interagieren mit fünf schwimmenden Tasten an den vier Bildschirm-Ecken und die mittlere rechte Rande.^   Von Ihrem ausgewählten Standort erholen Sie sich ankommende Ankünfte und Abreise, wählen und überwachen Sie Reisen, finden Sie in der Nähe von Haltestellen, erhalten Sie eine Liste der Verbindungsoptionen von Point 'A' auf Punkt 'B', oder wählen Sie mit dem Skizzieren, Rechtschreibung oder Liste.^   Wenn im Zweifelsfall auf die Schaltfläche Südwesten zurückgesetzt, um in den ruhigen Zustand zurückzukehren.^   Ihr Browser fragt möglicherweise Ihre Erlaubnis, auf Ihre Geolocation-Daten zuzugreifen.^   Soll ich das wiederholen? ";

Overview[it] = 
"Eight Olives Trains è un'applicazione di Transit Schedule che supporta lo stato del tempo reale per i treni MBTA, le metropolitane e gli autobus, i Metro North Trains, la Long Island Railroad e la metropolitana di New York.^ I programmi sono inclusi per altri treni e autobus.^ Funziona meglio quando si è on-line e hai permesso l'accesso alla tua geolocalizzazione, ma supporta anche determinati programmi solo le funzionalità quando offline.^ La modalità audio ti parla se la piattaforma supporta la sintesi del linguaggio.^ Si interagire con cinque pulsanti flottanti situati ai quattro angoli dello schermo e al bordo centrale.^ Dalla posizione selezionata è possibile ottenere arrivi e partenze in prossimità, selezionare e monitorare i viaggi, trovare fermi nelle vicinanze, ottenere un elenco di opzioni di connessione dal punto 'A' a punto 'B' o selezionare Stops Schizzi, ortografia o elenco.^ In caso di dubbio, fare clic sul pulsante di reset sud-ovest per tornare allo stato silenzioso.^ Il tuo browser potrebbe chiedere al permesso di accedere ai tuoi dati di geolocalizzazione.^ Devo ripetere questo?";

UMenu[en] = "Functions are selected by audio menus.^  From the quiet state, pressing the east, menu button starts the Main Menu.^  Clicking the northwest or no button advances to the next menu item.^  Clicking the east, menu button goes back one menu item.^  Clicking the northeast, yes button selects that menu item and initiates the selected action.^  The main menu has options to get weather and trip alerts, find connections, select a common stop, search for stop, and save or retrieve favorites.^ Shall I repeat this?";

UMenu[es] = "Las funciones son seleccionadas por los menús de audio.^   Desde el estado tranquilo, presionando el botón del Menú East, inicia el menú principal.^   Al hacer clic en el Noroeste o ningún botón avances en el siguiente elemento del menú.^   Al hacer clic en el este, el botón del menú vuelve un elemento del menú .^   Haciendo clic en el botón Northeast, sí, selcts ese elemento del menú e inicia la acción seleccionada.^   El menú principal tiene opciones para obtener alertas de tiempo y tiempo, encontrar conexiones, seleccione una parada común, busque parada y guardar o recuperar favoritos.^   ¿Debo repetir esto?";

UMenu[fr] = "Les fonctions sont sélectionnées par des menus audio.^   À partir de l'état silencieux, appuyez sur la touche Menu, le bouton Menu démarre le menu principal.^   En cliquant sur le bouton Nord-Ouest ou sans avance à l'élément de menu suivant.^   En cliquant sur l'est, le bouton Menu remonte à un élément de menu.^ .^   En cliquant sur la touche Nord-Est, oui Selcts que l'élément de menu et initie l'action sélectionnée.^   Le menu principal contient des options pour obtenir des alertes météo et de déclenchement, rechercher des connexions, sélectionner une butée courante, rechercher des butées et enregistrer ou récupérer des favoris.^   Dois-je répéter cela?";

UMenu[de] = "Funktionen werden von Audio-Menüs ausgewählt.^   Aus dem ruhigen Zustand, mit dem Drücken der Ost-, MENU-Taste startet das Hauptmenü das Hauptmenü.^   Durch Klicken auf die Nordwest- oder NEIN-Taste wird zum nächsten Menüpunkt auf den nächsten Menüpunkt geklickt.^ .^   Klicken Sie auf die Schaltfläche Nordosten, JA-Taste, die Menüelemente, die ausgewählte Aktion initiiert.^ Soll ich das wiederholen?";

UMenu[it] =
"Le funzioni sono selezionate da menu audio.^ Dallo stato silenzioso, premendo l'est, il pulsante Menu avvia il menu principale.^ Facendo clic sul pulsante nord-ovest o nessun pulsante alla voce di menu successiva.^ Cliccando verso est, il pulsante Menu torna indietro di una voce di menu.^ Facendo clic sul pulsante nord-orientale, si seleziona la voce di menu e avvia l'azione selezionata.^ Il menu principale ha le opzioni per ottenere avvisi meteo e viaggi, trovare connessioni, selezionare un arresto comune, cercare Stop e salvare o recuperare i preferiti.^ Devo ripetere questo?";

Rstatus[en] = "From the quiet state, clicking the northeast or yes button will report the current time and stop location currently selected.^  Clicking the northwest or no button will let you step through the list of upcoming arrivals and departures.^  Clicking the northeast yes button will then select that trip.^  The trip stop list can then be navigated using the no button to advance or the east menu button to go back.^  Selecting a trip's stop item changes your location to that stop.^  Shall I repeat this?";

Rstatus[es] = "Desde el estado tranquilo, al hacer clic en el botón Noreste o Sí informará la hora actual y detener la ubicación actualmente seleccionada.^   Al hacer clic en el noroeste o ningún botón le permitirá pasar por la lista de las próximas llegadas y salidas.^   Al hacer clic en el botón Northeast Sí, entonces Seleccione ese viaje.^   La lista de parada de viaje se puede navegar luego usando el botón NINGUNA para avanzar o al botón del menú Este para volver.^   Selección de un elemento de parada de viaje Cambia su ubicación a esa parada.^   ¿Debo repetir esto?";

Rstatus[fr] = "De l'état silencieux, en cliquant sur le bouton nord-est ou oui signalera l'heure actuelle et l'emplacement d'arrêt actuellement sélectionné.^   Le clic sur le nord-ouest ou sans bouton ne vous permettra de participer à la liste des arrivées et des départs à venir.^   En cliquant sur le bouton Northeast Oui.^ Sélectionnez ce voyage.^   La liste d'arrêt de déclenchement peut ensuite être navigue à l'aide de la touche Aucun pour avancer ou le bouton de menu EST pour revenir en arrière.^   La sélection d'un élément d'arrêt d'un voyage modifie votre emplacement à cet arrêt.^   Dois-je répéter cela?";

Rstatus[de] = "Klicken Sie im ruhigen Zustand auf, um auf die Schaltfläche Nordost- oder JA-Taste zu klicken, die aktuell ausgewählte aktuelle Uhrzeit- und Stoppstelle.^ Wählen Sie diese Reise aus.^   Die Laufwerksliste kann dann mit der NO-Taste navigiert werden, um voranzutreiben, oder die East-Menütaste, um wiederzusehen.^ Soll ich das wiederholen?";

Rstatus[it] = 
"Dallo stato silenzioso, facendo clic sul pulsante nord-orientale o Sì, riporterà l'ora corrente e la posizione di arresto attualmente selezionata.^ Facendo clic sul nord-ovest o nessun pulsante ti consente di passare l'elenco degli arrivi e delle partenze in arrivo.^ Facendo clic sul pulsante Sì nord-est quindi selezionerà quel viaggio.^ L'elenco di arresto del viaggio può quindi essere navigato utilizzando il pulsante NO per avanzare o il pulsante MENU EST per tornare indietro.^ La selezione dell'oggetto di arresto di un viaggio cambia la tua posizione in quella fermata.^ Devo ripetere questo?";

Platforms[en] = "Many stops may have nearby related stops or platforms where you can access other trains or buses.^  You can list these platforms from the main menu platforms option or by pressing the southeast multi-function button followed by the northeast status button.^  Shall I repeat this?";

Platforms[es] = "Muchas paradas pueden tener paradas o plataformas relacionadas cercanas donde puede acceder a otros trenes o autobuses.^   Puede enumerar estas plataformas de la opción de plataformas del menú principal o presionando el botón multifunción del sureste seguido del botón de estado del noreste.^   ¿Debo repetir esto?";

Platforms[fr] = "De nombreux arrêts peuvent avoir des arrêts ou des plates-formes associés à proximité où vous pouvez accéder à d'autres trains ou bus.^   Vous pouvez répertorier ces plates-formes à partir de l'option de plateformes de menu principale ou en appuyant sur le bouton multifonction sud-est suivi du bouton d'état nord-est.^   Dois-je répéter cela?";

Platforms[de] = "Viele Haltestellen haben möglicherweise in der Nähe in der Nähe zugehörigen Stopps oder Plattformen, in denen Sie auf andere Züge oder Busse zugreifen können.^   Sie können diese Plattformen von der Hauptmenü-Plattform-Option aufzulisten oder durch Drücken der Südost-Multifunktionstaste gefolgt von der Nordost-Status-Taste.^   Soll ich wiederholen Dies?";

Platforms[it] = 
"Molte fermate possono avere fermate o piattaforme correlate nelle vicinanze in cui è possibile accedere ad altri treni o autobus.^ È possibile elencare queste piattaforme dall'opzione delle piattaforme del menu principale o premendo il pulsante multi-funzione sud-orientale seguito dal pulsante di stato nord-est.^ Devo ripetere questo?";

SelStop[en] = "You can select a stop from the main menus Select A Common stop option.^  That list includes stops near your current location, any favorites or home location you may have saved plus major stops in the rail and subway networks.^  Clicking the southeast corner button toggles between various geographic stop lists.^  You can also select stops from trip lists or by using one of the search options.^  Shall I repeat this?";

SelStop[es] = "Puede seleccionar una parada de los menús principales, seleccione una opción de parada común.^   Esa lista incluye paradas cerca de su ubicación actual, cualquier favorito o ubicación en el hogar puede haber guardado más paradas principales en las redes de riel y metro.^   Haciendo clic en el botón de la esquina sureste Alterna entre varias listas de paradas geográficas.^   También puede seleccionar las paradas de las listas de viaje o usando una de las opciones de búsqueda.^   ¿Debo repetir esto? ";

SelStop[fr] = "Vous pouvez sélectionner une butée à partir des menus principaux Sélectionnez une option d'arrêt courante.^   Cette liste comprend des arrêts près de votre emplacement actuel, des favoris ou de votre emplacement à domicile que vous avez peut-être sauvegardé plus des arrêts majeurs dans les réseaux de rail et de métro.^   En cliquant sur le bouton Southeast Corner Bascule entre diverses listes d'arrêt géographiques.^   Vous pouvez également sélectionner des arrêts à partir de listes de voyage ou en utilisant l'une des options de recherche.^   Dois-je répéter cela? ";

SelStop[de]  = "Sie können einen Stopp der Hauptmenüs auswählen Wählen Sie eine gemeinsame Halteloption aus.^ wechselt zwischen verschiedenen geografischen Stopplisten.^   Sie können auch Stopps aus Reiselisten oder mithilfe einer der Suchoptionen auswählen.^   Soll ich das wiederholen? ";

SelStop[it] = 
"È possibile selezionare una fermata dai menu principali selezionare un'opzione di arresto comune.^ Quell'elenco include fermate vicino alla posizione corrente, tutti i preferiti o la posizione iniziale che potresti aver salvato più fermate principali nelle reti ferroviarie e della metropolitana.^ Facendo clic sul pulsante angolare sud-est attiva tra vari elenchi di arresto geografici.^ È inoltre possibile selezionare STOP dagli elenchi di viaggio o utilizzando una delle opzioni di ricerca.^ Devo ripetere questo?";

Sketch[en] = "The main menu option Search For Stop By Sketching lets you enter a search phrase letter by letter by sketching each block letter in the center-located sketch pad area.^  Sketch using horizontal, vertical or diagonal lines and I\'ll guess the letter.^  If a guess is wrong, continue sketching or click NO.^  When the guess is correct, click the northeast or yes button to start the next letter.^  Click the east or menu button to erase the current letter and start it again.^  Click the southeast button to start the search.^  Use the no and yes buttons to select a search result.^  If you click YES before sketching a character you can choose to enter numbers mode or add a blank space.^  Shall I repeat this?";

Sketch[es] = "La opción de la opción del menú principal Búsqueda de STOP BYBETING le permite ingresar una letra de frase de búsqueda por letra dibujando cada letra de bloque en el área de cadánea de boceto ubicado en el centro.^   Bosquejo con líneas horizontales, verticales o diagonales y adivinaré la letra.^   Si una conjetura es incorrecta, continúe dibujando o haga clic en No.^   Cuando la conjetura es correcta, haga clic en el botón Nordeste o Sí para iniciar la siguiente letra.^   Haga clic en el botón del Este o Menú para borrar la letra actual y volver a iniciarlo.^   Haga clic en el botón Sureste para iniciar la búsqueda.^   Use los botones NO y SÍ para seleccionar un resultado de búsqueda.^   Si hace clic en Sí antes de dibujar un carácter, puede elegir ingresar al modo números o agregar un espacio en blanco.^ ¿Debo repetir esto?";

Sketch[fr] = "L'option de menu principal la recherche d'arrêt par Sketching vous permet de saisir une lettre de phrase de recherche par lettre en esquissant chaque lettre de bloc dans la zone de cavalier de croquis située au centre.^   Croquis à l'aide de lignes horizontales, verticales ou diagonales et je devine la lettre.^   Si une hypothèse est erronée, continuez à dessiner ou cliquez sur Non.^   Lorsque la supposion est correcte, cliquez sur le bouton Northeast ou Oui pour lancer la lettre suivante.^   Cliquez sur le bouton EST ou MENU pour effacer la lettre actuelle et recommencez.^   Cliquez sur le bouton Sud-Est pour lancer la recherche.^   Utilisez les boutons NON et OUI pour sélectionner un résultat de recherche.^   Si vous cliquez sur Oui avant de dessiner un personnage, vous pouvez choisir d'entrer en mode numéros ou d'ajouter un espace vide.^   Dois-je répéter cela?";

Sketch[de] = "Die Hauptmenü-Options-Suche nach Haltestelle Durch Skizzieren können Sie einen Suchvortragsschreiben mit dem Buchstaben eingeben, indem Sie jeden Blockbuchstaben in der zentralsten Skizzenblockfläche skizzieren.^   Skizzieren Sie mit horizontalen, vertikalen oder diagonalen Linien und erraten Sie den Buchstaben.^   Wenn eine Vermutung falsch ist, skizzieren Sie das Skizzieren oder klicken Sie auf Nein.^   Wenn die Vermutung korrekt ist, klicken Sie auf die Schaltfläche Nordost- oder JA, um den nächsten Buchstaben zu starten.^   Klicken Sie auf die Schaltfläche East oder Menütaste, um den aktuellen Buchstaben zu löschen.^   Klicken Sie auf die SüdAST-Taste, um die Suche zu starten.^   Wählen Sie mit den Tasten NO und YES, um ein Suchergebnis auszuwählen.^   Wenn Sie auf Ja klicken, bevor Sie einen Zeichen skizzieren, können Sie den Nummernmodus eingeben oder einen Leerzeichen hinzufügen.^   Soll ich das wiederholen?";

Sketch[it] = 
"L'opzione del menu principale Ricerca di STOP Sketching ti consente di inserire una lettera di ricerca con frase di ricerca con la lettera disegnando ogni lettera di blocco nell'area del pad di schizzo localizzato.^ Schizzo con linee orizzontali, verticale o diagonale e indovinare la lettera.^ Se un'ipotesi è sbagliata, continua a disegnare o fare clic su No.^ Quando l'ipotesi è corretta, fai clic sul pulsante Northeast o Yes per avviare la lettera successiva.^ Fare clic sul pulsante East o Menu per cancellare la lettera corrente e avviarlo di nuovo.^ Fai clic sul pulsante sud-orientale per avviare la ricerca.^ Utilizzare i pulsanti No e SÌ per selezionare un risultato di ricerca.^ Se si fa clic su Sì prima di disegnare un carattere è possibile scegliere di inserire la modalità numeri o aggiungere uno spazio vuoto.^ Devo ripetere questo?";

Srch[en] = "The main menu option Search For Stop lets you construct a search phrase by selecting letters I say.^   Use the northwest or no button to advance to the next letter option and the northeast or yes button to accept that letter.^  Use the east or menu button to go back and correct and entry.^  Use the southeast button to start a search.^  Use the no and yes buttons to select a search result.^  Shall I repeat this?";

Srch[es] = "La opción de la opción del menú principal Búsqueda de la parada le permite construir una frase de búsqueda seleccionando las letras que digo.^   Use el botón Northwest o No para avanzar a la opción de siguiente letra y el botón Noreste o Sí para aceptar esa letra.^   Use el este o menú Botón para volver y corregir y la entrada.^   Use el botón Sureste para iniciar una búsqueda.^   Use los botones NO y SÍ para seleccionar un resultado de búsqueda.^   ¿Debo repetir esto?";

Srch[fr] = "L'option de menu principal la recherche d'arrêt pour vous permet de construire une phrase de recherche en sélectionnant des lettres que je dis.^   Utilisez le bouton nord-ouest ou sans bouton pour passer à l'option de lettre suivante et le bouton nord-est ou oui pour accepter cette lettre.^   Utilisez l'est ou le menu Bouton pour revenir en arrière et corriger et entrer.^   Utilisez le bouton Sud-Est pour lancer une recherche.^   Utilisez les boutons NO et oui pour sélectionner un résultat de recherche.^   Dois-je répéter cela?";

Srch[de] = "Mit der Hauptmenüoptionssuche nach Stopp können Sie einen Suchvorwurf erstellen, indem Sie Buchstaben auswählen, die ich sage.^ Taste, um wieder zurückzukehren und zu korrigieren und zu rufen.^   Verwenden Sie die Südost-Taste, um eine Suche zu starten.^   Wählen Sie mit den Tasten NEIN und YES, um ein Suchergebnis auszuwählen.^   Soll ich das wiederholen?";

Srch[it] = 
"L'opzione del menu principale Ricerca per Stop ti consente di costruire una frase di ricerca selezionando le lettere che dico.^ Utilizzare il pulsante Northwest o NO per passare all'opzione della lettera successiva e al pulsante nord-orientale o sì per accettare quella lettera.^ Utilizzare il pulsante East o Menu per tornare indietro e correggere e immettere.^ Utilizzare il pulsante sud-orientale per avviare una ricerca.^ Utilizzare i pulsanti No e SÌ per selezionare un risultato di ricerca.^ Devo ripetere questo?";

Fcon[en] = "The main menu Find Connections option lets you get a list of itineraries or connections to get from point 'A' to point 'B'.^  The stops are selected from the common stop list, so uncommon stops should first be selected and saved as a favorite or just selected to be the current stop so that it appears in the common stop list.^   You can also specify the start time and day if it isn't now.^  The results are a list of trip options.^  Selecting a trip option lists the itinerary in more detail.^   You can select any leg option for more detail on the part of the trip.^  Use the east or menu button to go back a step.^  Shall I repeat this?";

Fcon[es] = "El menú principal Encuentra la opción de conexiones Le permite obtener una lista de itinerarios o conexiones para obtener desde el punto 'A' a punto 'B'.^   Las paradas se seleccionan de la lista de paradas comunes, por lo que las paradas poco comunes deben seleccionarse y guardar primero como un Favorito o seleccionado para ser la parada actual para que aparezca en la lista de paradas comunes.^   También puede especificar la hora de inicio y el día si no lo es ahora.^   Los resultados son una lista de opciones de viaje.^   Selección de un viaje La opción enumera el itinerario con más detalle.^   Puede seleccionar cualquier opción de pierna para obtener más detalles por parte del viaje.^   Use el botón del este o del menú para volver un paso.^   ¿Debo repetir esto?";

Fcon[fr] = "L'option Menu Menu Find Connections vous permet d'obtenir une liste d'itinéraires ou de connexions pour obtenir du point 'A' au point 'B'.^   Les arrêts sont sélectionnés dans la liste des arrêts courants, les arrêts si rares doivent d'abord être sélectionnés et enregistrés en tant que Favoris ou juste sélectionné pour être l'arrêt actuel de sorte qu'il apparaisse dans la liste de points communs.^   Vous pouvez également spécifier l'heure de début et la journée si ce n'est pas maintenant.^   Les résultats sont une liste des options de voyage.^   Sélectionner un voyage L'option répertorie l'itinéraire plus en détail.^   Vous pouvez sélectionner une option de jambe pour plus de détails de la part du voyage.^   Utilisez le bouton EST ou MENU pour remonter une étape.^   Dois-je répéter cela?";

Fcon[de] = "Mit dem Hauptmenü finden Sie Verbindungen, mit denen Sie eine Liste von Reiserouten oder Verbindungen erhalten, um von Point 'A' zu Punkt 'B' zu erhalten.^   Die Haltestellen werden aus der gemeinsamen Stoppliste ausgewählt, sodass SONDER-STOPS zuerst ausgewählt und gespeichert werden soll Favorit oder einfach ausgewählt, um der aktuelle Stopp so zu sein, dass er in der Liste der gemeinsamen Stopps angezeigt wird.^   Sie können auch die Startzeitpunkt und den Tag angeben, wenn es nicht jetzt ist.^   Die Ergebnisse sind eine Liste der Auslöseoptionen.^   Auswählen einer Reise Die Option listet die Reiseroute detaillierter auf.^   Sie können jede Beinoption ausführlicher für den Teil der Fahrt auswählen.^   Verwenden Sie die East- oder Menütaste, um einen Schritt zurückzukehren.^   Soll ich das wiederholen?";

Fcon[it] = 
"Il menu principale Trova Connections Option consente di ottenere un elenco di itinerari o connessioni per ottenere dal punto 'A' a punto 'B'.^ Le fermate sono selezionate dall'elenco Arresto comune, quindi le interruzioni non comuni dovrebbero prima essere selezionate e salvate come preferite o semplicemente selezionate per essere l'arresto corrente in modo che venga visualizzato nell'elenco Arresto comune.^ Puoi anche specificare l'ora di inizio e il giorno se non è ora.^ I risultati sono un elenco di opzioni di viaggio.^ Selezione di un'opzione di viaggio elenca l'itinerario in modo più dettagliato.^ È possibile selezionare qualsiasi opzione GAM per ulteriori dettagli da parte della parte del viaggio.^ Utilizzare il pulsante East o Menu per tornare indietro di un passaggio.^ Devo ripetere questo?";

MTrip[en] = "When a trip has been selected, you can click the southeast button to enable Monitor Mode.^  Monitoring a trip gives a minute by minute update of vehicle location and next stop status.^  For MBTA vehicles, the status is based on real time information when on-line.^  For schedule based status, data is estimated based on the schedule information.^  The map display is also active in Monitor Mode.^  Use the southwest reset button to exit Monitor Mode.^  Shall I repeat this?";

MTrip[es] = "Cuando se ha seleccionado un viaje, puede hacer clic en el botón Sureste para habilitar el modo de monitor.^   Monitoreo de un viaje ofrece una actualización de un minuto a minuto de la ubicación del vehículo y el estado de parada siguiente.^   Para vehículos MBTA, el estado se basa en información en tiempo real cuando En línea.^   Para el estado basado en horarios, los datos se estima en función de la información de la programación.^   La pantalla del mapa también está activa en el modo de monitor.^   Use el botón de reinicio del suroeste para salir del modo de monitor.^   ¿Debo repetir esto?";

MTrip[fr] = "Lorsqu'un déclenchement a été sélectionné, vous pouvez cliquer sur le bouton SUTRAST pour activer le mode moniteur.^   Surveillance d'un déclenchement donne une minute à la mise à jour minutieuse de l'emplacement du véhicule et de l'état d'arrêt suivant.^   Pour les véhicules MBTA, le statut est basé sur des informations en temps réel lorsque En ligne.^   Pour le statut basé sur la planification, les données sont estimées sur la base des informations de planification.^   L'affichage de la carte est également actif dans le mode moniteur.^   Utilisez le bouton de réinitialisation du sud-ouest pour quitter le mode Moniteur.^   Dois-je répéter cela?";

MTrip[de] = "Wenn eine Reise ausgewählt wurde, können Sie auf die Südost-Taste klicken, um den Monitormodus zu aktivieren.^   Überwachung einer Fahrt ergibt eine Minute nach Minute des Fahrzeugs und dem nächsten Stoppstatus.^   Für MBTA-Fahrzeuge basiert der Status auf Echtzeitinformationen, wenn Online.^   Für den statell basierten Status werden Daten basierend auf den Zeitplaninformationen geschätzt.^   Die Kartenanzeige ist auch im Monitormodus aktiv.^   Verwenden Sie die Südwest-Reset-Taste, um den Monitormodus zu verlassen.^   Soll ich das wiederholen?";

MTrip[it] = 
"Quando è stato selezionato un viaggio, è possibile fare clic sul pulsante sud-orientale per abilitare la modalità monitor.^ Monitoraggio di un viaggio dà un aggiornamento minuto per minuto della posizione del veicolo e lo stato di arresto successivo.^ Per i veicoli MBTA, lo stato è basato su informazioni in tempo reale quando on-line.^ Per lo stato basato su pianificazione, i dati sono stimati in base alle informazioni di pianificazione.^ Il display della mappa è anche attivo in modalità monitor.^ Utilizzare il pulsante di ripristino sud-ovest per uscire dalla modalità monitor.^ Devo ripetere questo?";

Srec[en] = "Speech recognition can be enabled from the tri-bar menu, or from reset state press the Menu button and then the lower right button.^ You may be asked to permit use of the microphone.^  Once enabled, you press the lower right button to activate the microphone for 2 seconds and say a command.^  Valid commands are quiet, reset, yes, no, menu, back, help, alt, search, monitor, next, list, status, stat, nearby, platforms, alerts, connections, here, select, bus and commands.^  This feature is still experimental.^  Shall I repeat this?"; 

Srec[es] = "El reconocimiento de voz se puede habilitar en el menú Tri-Bar, o de Restablecer Estado Presione el botón MENÚ y luego el botón inferior derecho.^ Se le puede pedir que permita el uso del micrófono.^   Una vez habilitado, presiona el botón inferior derecho para activar el micrófono durante 2 segundos y decir un comando.^   Los comandos válidos son silenciosos, restablecer, sí, no, menú, de vuelta, ayuda.^ , Alt, Búsqueda, Monitor, Siguiente, Lista, Estado, Estado, Cerca, Plataformas, Alertas, Conexiones, Aquí, Seleccionar, Bus y Comandos.^   Esta característica sigue siendo experimental.^   ¿Debo repetir esto?";

Srec[fr] = "La reconnaissance vocale peut être activée dans le menu Tri-bar, ou à partir de l'état de réinitialisation, appuyez sur la touche MENU, puis sur le bouton inférieur droit.^ On peut vous demander de permettre d'utiliser le microphone.^   Une fois activé, vous appuyez sur la touche inférieure droite pour activer le microphone pendant 2 secondes et dire une commande.^   Les commandes valides sont silencieuses, réinitialisées, oui, non, Menu , Alt, rechercher, moniteur, suivez, liste, statut, statistiques, proches, plateformes, alertes, connexions, ici, sélectionnez, autobus et commandes.^   Cette fonctionnalité est toujours expérimentale.^   Dois-je répéter cela?";

Srec[de] = "Die Spracherkennung kann vom TRI-BAR-Menü aktiviert werden, oder aus dem Rücksetzzustand Drücken Sie die MENU-Taste und dann die untere rechte Taste.^ Sie können aufgefordert werden, die Verwendung des Mikrofons zuzulassen.^   Nach dem Aktivieren drücken Sie die untere rechte Taste, um das Mikrofon 2 Sekunden lang zu aktivieren und einen Befehl zu sagen.^ , ALT, Suchen, Monitor, Nächstes, Liste, Status, Stat, In der Nähe, Plattformen, Alarme, Verbindungen, hier, Auswahl, Bus und Befehle.^   Diese Funktion ist noch experimentell.^   Soll ich das wiederholen?";

Srec[it] = 
"Il riconoscimento vocale può essere abilitato dal menu TRI-Bar, o dallo stato di reset Premere il tasto MENU e quindi il pulsante in basso a destra.^ Potrebbe essere richiesto di consentire l'uso del microfono.^ Una volta abilitato, si preme il pulsante in basso a destra per attivare il microfono per 2 secondi e dire un comando.^ I comandi validi sono silenziosi, reset, sì, no, menu, schiena, aiuto, alt, ricerca, monitor, successivo, elenco, stato, stat, nelle vicinanze, piattaforme, avvisi, collegamenti, qui, selezionare, bus e comandi.^ Questa caratteristica è ancora sperimentale.^ Devo ripetere questo?";

KIssues[en] = "Trains audio may not work well if you are using other audio programs such as Voice Over or certain blue tooth apps on your platform.^  Find Connections is still in development.^   Shall I repeat this?" ;

KIssues[es] = "Es posible que los trenes de audio no funcionen bien si está utilizando otros programas de audio, como voz o ciertas aplicaciones de dientes azules en su plataforma.^   Buscar conexiones todavía está en desarrollo.^   ¿Debo repetir esto?";

KIssues[fr] = "Trains Audio Pourriez-vous ne pas bien fonctionner si vous utilisez d'autres programmes audio tels que la voix ou certaines applications de dents bleues sur votre plate-forme.^   Trouver des connexions est toujours en développement.^   Dois-je répéter cela?";

KIssues[de] = "Züge Audio funktioniert möglicherweise nicht gut, wenn Sie andere Audioprogramme wie Voice-Over- oder bestimmte blaue Zahn-Apps auf Ihrer Plattform verwenden.^   Nach Verbindungen finden Sie noch in der Entwicklung.^   Soll ich das wiederholen?";

KIssues[it] = 
"Treni Audio potrebbe non funzionare bene se si utilizza altri programmi audio come Voice over o alcune app di Denti Blue sulla tua piattaforma.^ Trova connessioni è ancora in fase di sviluppo.^ Devo ripetere questo?";

Cook[en] = "Trains normally uses cookies or cache memory to store the program and data to permit off-line operation.^  Any schedules or data you save are also stored in cookie memory.^  If you clear cookies and application cache, all data is deleted.^  Any eightolives software update occurs automatically when you are on-line adding a new application cache and then deleting the old.^  Shall I repeat this?" ;

Cook[es] = "Los trenes normalmente utilizan cookies o memoria caché para almacenar el programa y los datos para permitir la operación fuera de línea.^   Cualquier horario o datos que guarde también se almacena en la memoria de cookies.^   Si borra las cookies y la memoria caché de la aplicación, todos los datos se eliminan.^   Cualquiera La actualización de software de octavos ocurre automáticamente cuando está en línea, agregando un nuevo caché de la aplicación y luego eliminando lo antiguo.^   ¿Debo repetir esto?";

Cook[fr] = "Les trains utilisent normalement des cookies ou une mémoire de cache pour stocker le programme et les données pour permettre un fonctionnement hors ligne.^   Tous les horaires ou données que vous avez enregistrés sont également stockés dans la mémoire de cookie.^   Si vous effacez les cookies et le cache d'applications, toutes les données sont supprimées.^   TOUT La mise à jour du logiciel de huit cultures se produit automatiquement lorsque vous êtes en ligne ajoutant un nouveau cache d'application, puis supprimez l'ancien.^   Dois-je répéter cela?";

Cook[de] = "Züge verwendet normalerweise Cookies oder Cache-Speicher, um das Programm und die Daten zu speichern, um den Offline-Betrieb zu ermöglichen.^   Alle Termine oder Daten, die Sie speichern, werden auch im Cookie-Speicher gespeichert.^   Wenn Sie Cookies und Anwendungscache einlesen, werden alle Daten gelöscht.^   Jeder wird gelöscht.^ Das Software-Aktualisierung mit der Achseligkeit tritt automatisch auf, wenn Sie einen neuen Anwendungscache hinzufügen und das Alte löschen.^   Soll ich das wiederholen?";

Cook[it] =
"I treni normalmente utilizzano i cookie o la memoria della cache per memorizzare il programma e i dati per consentire il funzionamento off-line.^ Qualsiasi pianificazione o dati che salvi vengono memorizzati anche nella memoria dei cookie.^ Se si cancellano i cookie e la cache dell'applicazione, tutti i dati vengono cancellati.^ Ogni aggiornamento software di Eightolives si verifica automaticamente quando si è on-line aggiungendo una nuova cache dell'applicazione e quindi eliminare il vecchio.^ Devo ripetere questo?";

Cook[ja] =
"電車は通常、オフライン操作を許可するようにプログラムとデータを保存するためにCookieまたはCacheメモリを使用します。 保存したスケジュールやデータもCookieメモリに格納されています。 クッキーとアプリケーションキャッシュをクリアすると、すべてのデータが削除されます。 新しいアプリケーションキャッシュをオンラインしてから古いを削除すると、8回のソフトウェアアップデートが自動的に行われます。 これを繰り返すのですか？";

Cook[zh] =
"列车通常使用cookie或缓存内存来存储程序和数据以允许离线操作。 您保存的任何计划或数据也都存储在cookie内存中。 如果您清除Cookie和Application Cache，则删除所有数据。 当您在线添加新的应用程序缓存时，任何八个软件更新都会自动发生。然后删除旧的。 我要重复一遍吗？";


const MenuIndices = ["Welcome", "Welcome3","PlotPopup","PlotBusSel", "Nav", "TimeMenu",  "Preferences", "Ops", "Help", "Aboutx","SubStationPopup", "PlaceSelect", "Plan", "KMap",
"File", "FileSel", "OpenFile", "ConnectionsDetails", "BusSel", "TripPopup", "StopSearch", "OpenFile","Dev","Favs","TAdj", "Madj", "SkedPop", "Feedback","HerePopup", "OSMc","MapW","OptionPopup","LatLonM","FSTOP", "SELW","Notify","DepNot", "AlertWindow",
"Preferences2","InfoWindow","DMap","You"];


var MP = [];
MP[0] = [];
MP[1] = [];
MP[2] = [];
MP[3] = [];
MP[4] = [];
MP[5] = [];
MP[6] = [];


MP[0][0] = [    // Welcome
  "Learn how we use cookies.",

 // button
  "Got It",

 // label
];

MP[0][1] = [    // Welcome3

 // button
  "Got it",

 // label
];

MP[0][2] = [    // PlotPopup
  "X",
  "Plot Bus",
  "Station Pathways",
  "Plot Here to Start",
  "Plot Connections",
  "Plot Trip",
  "Update Vehicles",
  "Monitor This Trip",
  "Stop Monitor Mode",
  "Add Waypoint",
  "Connect Waypoints",
  "Save Waypoints",
  "Clear Plots",
  "Close",

 // button

 // label
  "For Selected Connections:",
  "Autotrack",
];

MP[0][3] = [    // PlotBusSel

 // button
  "Plot Bus",
  "Cancel",

 // label
];

MP[0][4] = [    // Nav
  "X",
  "Find Connections",
  "Select Stop From List",
  "Search For Stop",
  "What's Nearby",
  "Find Bus Number",
  "Favorites Save/Open",
  "View Map",
  "Last Monitor",
  "Stop Monitor Mode",
  "File",
  "Ops",
  "Pref",
  "Help",
  "Close",

 // button

 // label
  " Enable Audio",
  "Recognition",
];

MP[0][5] = [    // TimeMenu

 // button
  "Set Time",
  "Cancel",
  "Set Time As NOW",

 // label
];

MP[0][6] = [    // Preferences
  "X",
  "Get Facility Info",
  "Facility Info By Stop",
  "Pathways Info By Stop",
  "Levels Info By Stop",
  "More Preferences",
  "Developer",
  "Clear Cache",
  "Close",

 // button

 // label
];

MP[0][7] = [    // Ops
  "X",
  "View Timetable",
  "Select Here",
  "Set Home (Default)",
  "Clear Home (Default)",
  "Find Connections",
  "Show Last Connections",
  "Get Nearest Station",
  "Send Feedback",
  "Update Alerts",
  "Report Facilities",
  "Show Notifications",
  "Station Pathways",
  "Fetch Tile",
  "Clear Tile Cache",
  "Clear Report",
  "Report Associate Service",
  "Report MBTA GTFS Date",
  "Make Mesages Template 0",
  "Make Mesages Template 1",
  "Report Cache",
  "Set Time As Now",
  "Set Time",
  "Report Geolocation",
  "Save Recoding",
  "Clear Saved Readings",
  "Print Preview",
  "Close",

 // button

 // label
  "Record Positions",
];

MP[0][8] = [    // Help
  "X",
  "More Help",
  "Share Trains - the QR code",
  "Using Trains (pdf)",
  "Quick Hints",
  "About Cookies",
  "License",
  "Known Issues",
  "Send Feedback",
  "About",
  "MBTA.com",
  "Amtrak",
  "MTA",
  "NJ Transit",
  "Close",

 // button

 // label
];

MP[0][9] = [    // Aboutx
  "Close",

 // button

 // label
];

MP[0][10] = [    // SubStationPopup
  "X",
  "Select From List",
  "Select From Map",
  "Search For Stop",
  "Save As Fav Stop 1",
  "Save As Fav Stop 2",
  "Open Fav Stop 1",
  "Open Fav Stop 2",
  "Back",
  "Forward",
  "Station Pathways",
  "Close",

 // button
  "Select",

 // label
  "Other Platforms At This Station",
];

MP[0][11] = [    // PlaceSelect
  "X",
  "Here",
  "Home",
  "Current Selection",
  "Select From Map",
  "Search For Stop",
  "What's Nearby",
  "Boston North Station",
  "Boston South Station",
  "New York Penn Station Amtrak",
  "New York Grand Central -NY",
  "Jamaica -NY",
  "Secaucus -NJ",
  "New Haven-CT",
  "Chicago",
  "San Francisco",
  "Los Angeles",
  "Seattle",
  "Denver",
  "Dallas",
  "New Orleans",
  "Washington-DC",
  "Philadelphia",
  "Miami",
  "St Louis",
  "Paris",
  "Report on Facilities",
  "Station Pathways",
  "Back",
  "Forward",
  "Favorites Save/Open",

 // button
  "Select",
  "Cancel",

 // label
  "Select a Stop",
  "Include Local Bus Stops",
];

MP[0][12] = [    // Plan
  "X",
  "Hints",
  "Show Last",
  "Reverse Trip",
//  "Hints",

 // button
  "Get Connections",
  "Cancel",

 // label
//  "Find Connections",
  "From",
  "To",
  "Start time",
  "Upcoming Day",
  "Hide Bad Connections",
  "Apply filter",
  "Max walk distance (miles)",
  "Change time (minutes)",
];

MP[0][13] = [    // KMap
  "  X  ",
//  "Select",
  "Here",
  "Plot",
//  "",
  "Options",
  "credits",

 // button
  "",
  "",
  "+",
  "-",
  "ESC",

 // label
];

MP[0][14] = [    // File
  "Open Local",
  "Save Local",
  "Open FS",
  "Save FS",
  "Close",

 // button

 // label
];

MP[0][15] = [    // FileSel

 // button
  "Open",
  "Cancel",
  "Delete",

 // label
];

MP[0][16] = [    // OpenFile

 // button
  "Cancel",

 // label
];

MP[0][17] = [    // ConnectionsDetails
  "View Connections",
  "Plot Details",
  "Save As Fav Itinerary 1",
  "Save As Fav Itinerary 2",
  "Save Connections",
  "Show Notifications ",
  "Add Trip Notifications ",
  "Print Preview",
  "Close",

 // button

 // label
];

MP[0][18] = [    // BusSel

 // button
  "Find Bus",
  "Cancel",

 // label
  "Find a Bus",
  "Select a Bus Route Number:",
];

MP[0][19] = [    // TripPopup
  "X",
  "Refresh Trip Data",
  "Show Trip Info",
  "Plot Trip",
  "View Map",
  "Monitor This Trip",
  "Stop Monitor Mode",
  "Open Fav Trip 1",
  "Open Fav Trip 2",
  "Save As Fav Trip 1",
  "Save As Fav Trip 2",
  "Show Notifications",
  "Add Departure Notification",
  "Manually Adjust Departure",
  "Clear Adjustments",
  "Back to Details",
  "Back to Show Bus",
  "Print Preview",
  "Close",

 // button

 // label
  "Show Expired Stops",
];

MP[0][20] = [    // StopSearch
  "X",

 // button
  "Select",
  "Cancel",

 // label
  "Search for a Stop",
  "1. Enter partial street, stop or station:",
  "2. Select from list:",
];

MP[0][21] = [    // OpenFile

 // button
  "Cancel",

 // label
];

MP[0][22] = [    // Dev
  "Create eo_tsked.js",
  "Create Facilities Data",
  "Update stopsConnecting facilities",
  "Make tt array",
  "Make tt array2",
  "Make trip array",
  "Make MBTA stops info",
  "Update MBTA stops info",
  "Fix bus stops2",
  "Test WX",
  "Create eo_mnrsked.js",
  "Create eo_PP.js",
  "Create eo_BRTA.js",
  "Create eo_CCRTA.js",
  "Create eo_PB.js",
  "Create eo_SLE.js",
  "Create eo_CT.js",
  "Create eo_MVRTA.js",
  "Create eo_LRTA.js",
  "Create eo_MWRTA.js",
  "Create eo_HL.js",
  "Create eo_Mont.js",
  "Create eo_NJ.js",
  "Create eo_path.js",
  "Create eo_LIRR.js",
  "Create eo_NJBus_cal.js",
  "Create eo_PVRTA_cal.js",
  "Create eo_RIPTA_routes.js",
  "Create eo_CATA.js",
  "Create eo_SMART.js",
  "Create eo_AM_routes.js",
  "Create eo_NCTD.js",
  "Create eo_Metrolink.js",
  "Create eo_Caltrain.js",
  "Create eo_Metra.js",
  "Create eo_SSL.js",
  "Create eo_BART.js",
  "Create eo_BSCC.js",
  "Realtime test",
  "Update PB Stops",
  "Update PP Stops",
  "Update BRTA Stops",
  "Update NYT Stops",
  "Update MVRTA Stops",
  "Update CCRTA Stops",
  "Update LRTA Stops",
  "Update MetroWest Stops",
  "Update PATH Stops",
  "Update LI Stops",
  "Report Tiles",
  "Plot a Shape",
  "Get MNR Feed",
  "Update NJ stops",
  "Update MBTA P",
  "Make NYC headsigs",
  "Make NYC transfers",
  "Update NJ Bus",
  "Add NJ bus stops",
  "Update PVRTA Bus",
  "Update RIPTA Bus",
  "Update MBTA",
  "Make MBTA ids",
  "Update MBTA GTFS",
  "Update CATA Stops",
  "Update AMTRAK Stops",
  "Update AMTRAK timezones",
  "Update Metrolink Stops",
  "Update Caltrain Stops",
  "Update Metra Stops",
  "Update CTA Stops",
  "Format TZ",
  "Report text",
  "Get Metra GTFS",
  "Create CTABus",
  "Create LAM_cal",
  "Create LAMB_cal",
  "Update LAMB stops",
  "Create Via_cal.js",
  "Update VIA stops",
  "Create SFMTA_cal.js",
  "Create eo_SEPTA.js",
  "Update SEPTA stops",
  "Create MDC_cal.js",
  "Create MTABus_cal.js",
  "Update LA GTFS",
 "Close"

 // button

 // label
];

MP[0][23] = [    // Favs
  "Save As Fav Stop 1",
  "Save As Fav Stop 2",
  "Open Fav Stop 1",
  "Open Fav Stop 2",
  "Open Fav Trip 1",
  "Open Fav Trip 2",
  "Open Fav Itinerary 1",
  "Open Fav Itinerary 2",
  "Close",

 // button

 // label
];

MP[0][24] = [    // TAdj
  "X",
  "Manually Set Departure to NOW",
  "Manually Adjust Departure",
  "Clear Adjusted Trip",
  "Clear CompensatedTrips",
  "Clear All Adjusted Trips",
  "Close",

 // button

 // label
];

MP[0][25] = [    // Madj

 // button
  "Adjust",
  "Cancel",

 // label
];

MP[0][26] = [    // SkedPop
  "X",
  "Refresh ",
  "Print Preview",
  "Close",

 // button

 // label
  "Prediction",
  "Schedule Forward",
  "Schedule All",
  "Show Route Name",
  "Show Trip Id",
];

MP[0][27] = [    // Feedback
  "X",

 // button
  "Submit",
  "Cancel",

 // label
  "Send Feedback",
  "From",
  "Short title",
  "Feedback, comment or wish",
];

MP[0][28] = [    // HerePopup
  "X",
  "Show Here",
  "Set Yellow Marker Here",
  "Set Green Marker Here",
  "Set Blue Marker Here",
  "Set Waypoint Here",
  "Center Lat Lon",
  "Clear Markers",
  "Compass View",
  "Close",

 // button

 // label
];

MP[0][29] = [    // OSMc
  " the OpenStreetMap copyright page.",
  "Close",

 // button

 // label
];

MP[0][30] = [    // MapW
  "X",

 // button
  "Open Map",
  "Cancel",

 // label
  "Select Map Type",
  "Use EO Map",
  "Use OpenStreet Map",
  "Use Google Maps",
];

MP[0][31] = [    // OptionPopup
  "Measure",
  "Compass View",
  "OpenStreetMap credit",
  "Close",

 // button

 // label
];

MP[0][32] = [    // LatLonM
  "Clear Entries",

 // button
  "Go to Lat Lon",
  "Cancel",

 // label
];

MP[0][33] = [    // FSTOP
  "Reverse Path",

 // button
  "Find Pathway",
  "Cancel",

 // label
];

MP[0][34] = [    // SELW

 // button
  "Select",
  "Cancel",

 // label
];

MP[0][35] = [    // Notify

 // button
  "Delete Notification",
  "Clear All",
  "Cancel",

 // label
];

MP[0][36] = [    // DepNot

 // button
  "Add",
  "Cancel",

 // label
];

MP[0][37] = [    // AlertWindow
  "X",

 // button

 // label
];

MP[0][38] = [    // Preferences2
  "X",
  "Close",

 // button

 // label
];

MP[0][39] = [    // InfoWindow
  "X",
  "Close"
 // button

 // label
];




