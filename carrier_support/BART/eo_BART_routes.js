// eo_BART_routes.js

//let B_YELLOW = new TRoute("B_YELLOW", "Antioch - SFIA/Millbrae");
let B_YELLOW = new TRoute("B_YELLOW", "BART Yellow Line");
B_YELLOW.cal = BART_cal;
B_YELLOW.m = [1, 2];
B_YELLOW.stop_ids = ["B_MLBR","B_SFIA","B_SBRN","B_SSAN","B_COLM","B_DALY","B_BALB","B_GLEN","B_24TH","B_16TH","B_CIVC",
"B_POWL","B_MONT","B_EMBR","B_WOAK","B_12TH","B_19TH","B_MCAR","B_ROCK","B_ORIN","B_LAFY",
"B_WCRK","B_PHIL","B_CONC","B_NCON","B_PITT","B_PCTR","B_ANTC"];
BART.addRoute(B_YELLOW);

//let B_ORANGE = new TRoute("B_ORANGE", "Richmond - Berryessa/North San Jose");
let B_ORANGE = new TRoute("B_ORANGE", "BART Orange Line");
B_ORANGE.cal = BART_cal;
B_ORANGE.m = [4,3];
B_ORANGE.stop_ids = ["B_BERY","B_MLPT","B_WARM","B_FRMT","B_UCTY","B_SHAY","B_HAYW","B_BAYF","B_SANL","B_COLS",
"B_FTVL","B_LAKE","B_12TH","B_19TH","B_MCAR","B_ASHB","B_DBRK","B_NBRK","B_PLZA","B_DELN","B_RICH"
];
BART.addRoute(B_ORANGE);

//let B_GREEN = new TRoute("B_GREEN", "Berryessa/North San Jose - Daly City");
let B_GREEN = new TRoute("B_GREEN", "BART Green Line");
B_GREEN.cal = BART_cal;
B_GREEN.m = [5,6];
B_GREEN.stop_ids = ["B_DALY","B_BALB","B_GLEN","B_24TH","B_16TH","B_CIVC","B_POWL","B_MONT","B_EMBR","B_WOAK",
"B_LAKE","B_FTVL","B_COLS","B_SANL","B_BAYF","B_HAYW","B_SHAY","B_UCTY","B_FRMT","B_WARM",
"B_MLPT","B_BERY"
];
BART.addRoute(B_GREEN);

//let B_RED = new TRoute("B_RED", "Richmond - Daly City/Millbrae");
let B_RED = new TRoute("B_RED", "BART Red Line");
B_RED.cal = BART_cal;
B_RED.m = [7,8];
B_RED.stop_ids = ["B_SFIA","B_MLBR","B_SBRN","B_SSAN","B_COLM","B_DALY","B_BALB","B_GLEN","B_24TH","B_16TH",
"B_CIVC","B_POWL","B_MONT","B_EMBR","B_WOAK","B_12TH","B_19TH","B_MCAR","B_ASHB","B_DBRK","B_NBRK","B_PLZA","B_DELN","B_RICH"
];
BART.addRoute(B_RED);

//let B_BLUE = new TRoute("B_BLUE", "Daly City - Dublin/Pleasanton");
let B_BLUE = new TRoute("B_BLUE", "BART Blue Line");
B_BLUE.cal = BART_cal;
B_BLUE.m = [11,12];
B_BLUE.stop_ids = ["B_DALY","B_BALB","B_GLEN","B_24TH","B_16TH","B_CIVC","B_POWL","B_MONT","B_EMBR","B_WOAK",
"B_LAKE","B_FTVL","B_COLS","B_SANL","B_BAYF","B_CAST","B_WDUB","B_DUBL"
];
BART.addRoute(B_BLUE);

//let B_BEIGE = new TRoute("B_BEIGE", "Coliseum - Oakland Airport");
let B_BEIGE = new TRoute("B_BEIGE", "Oakland Airport Shuttle");
B_BEIGE.cal = BART_cal;
B_BEIGE.m = [20, 19];
B_BEIGE.stop_ids = ["B_OAKL","B_COLS"];
BART.addRoute(B_BEIGE);

 
