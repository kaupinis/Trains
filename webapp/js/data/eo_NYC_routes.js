// eo_NYC_routes.js

var NY1 = new TRoute("NY1", "Subway 1");
NY1.common_name = "Broadway - 7 Avenue Local NY1";
NY1.frequency = 15;
NY1.iddir = "S";
NY1.stop_ids = ["NYT101", "NYT103","NYT104","NYT106","NYT107","NYT108","NYT109", 
"NYT110", "NYT111","NYT112", "NYT113","NYT114","NYT115","NYT116","NYT117","NYT118","NYT119",
"NYT120", "NYT121", "NYT122","NYT123","NYT124","NYT125","NYT126","NYT127","NYT128","NYT129",   "NYT130", "NYT131","NYT132","NYT133","NYT134","NYT135","NYT136","NYT137","NYT138","NYT139", 
"NYT142"];
NY1.stop_names = getStopNameArrayB(NY1.stop_ids, "1", stops_nyt);
addRouteToService(NY1);

var NY1_0 = new TTrip("NY1_0", "Subway 1", 0, "0123456");
NY1_0.headsign = "South Ferry";
NY1_0.start_time = "6:00";
NY1_0.end_time = "25:00";
NY1_0.shape_id = "1..S05R";
NY1_0.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58",
"-2:60","-2:62","-2:64", "-2:66", "-2:68","-2:70","-2:72", "-2:74"
];
NY1.trips[NY1.trips.length] = NY1_0;

var NY1_1 = new TTrip("NY1_1", "Subway 1", 1, "0123456");
NY1_1.headsign = "Van Cortlandt Park - 242 St";
NY1_1.start_time = "6:00";
NY1_1.end_time = "25:00";
NY1_1.shape_id = "1..N03R";
NY1_1.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58",
"-2:60","-2:62","-2:64", "-2:66", "-2:68","-2:70","-2:72", "-2:74"
];
NY1.trips[NY1.trips.length] = NY1_1;

var NY2 = new TRoute("NY2", "Subway 2");
NY2.common_name = "7 Avenue Express NY2";
NY2.frequency = 15;
NY2.iddir = "S";
NY2.stop_ids = 
["NYT201","NYT204","NYT205","NYT206","NYT207","NYT208","NYT209","NYT210","NYT211","NYT212",
"NYT213","NYT214","NYT215","NYT216","NYT217","NYT218","NYT219","NYT220","NYT221","NYT222",
"NYT224","NYT225","NYT226","NYT227","NYT120","NYT121","NYT122","NYT123","NYT124","NYT125", 
"NYT126","NYT127","NYT128","NYT129","NYT130","NYT131","NYT132","NYT133", "NYT134","NYT135",
"NYT136", "NYT137","NYT228","NYT229","NYT230","NYT231","NYT232","NYT233", "NYT234","NYT235",
"NYT236","NYT237","NYT238","NYT239","NYT241","NYT242","NYT243","NYT244", "NYT245","NYT246",
"NYT247"
];
NY2.stop_names = getStopNameArrayB(NY2.stop_ids, "2", stops_nyt);
addRouteToService(NY2);

var NY2_0 = new TTrip("NY2_0", "Subway 2", 0, "0123456");
NY2_0.headsign = "Flatbush Av - Brooklyn College";
NY2_0.start_time = "6:00";
NY2_0.end_time = "25:00";
NY2_0.shape_id = "2..S03R";
NY2_0.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-1",   "-1",    "-2:50", "-1",    "-1",
"-1",   "-2:52","-2:54", "-1",    "-1",   "-1",   "-2:56", "-1",    "-1",    "-1",  
"-1",   "-2:58","-2:60","-2:62","-2:64", "-2:66", "-2:68","-2:70","-2:72", "-2:74",
"-2:76","-2:78","-2:80","-2:82","-2:84", "-2:86", "-2:88","-2:90","-2:92", "-2:94", 
"-2:96"];
NY2.trips[NY2.trips.length] = NY2_0;

var NY2_1 = new TTrip("NY2_1", "Subway 2", 1, "0123456");
NY2_1.headsign = "Wakefield - 241 St";
NY2_1.start_time = "6:00";
NY2_1.end_time = "25:00";
NY2_1.shape_id = "2..N02R";
NY2_1.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-1",   "-1",   "-1",    "-1",    "-2:40","-1",   "-1",    "-1",    "-2:42", "-2:44", 
"-1",   "-1",   "-1",    "-2:46", "-1",   "-1",   "-2:48","-2:50",  "-2:52", "-2:54", 
"-2:56", "-2:58","-2:60","-2:62", "-2:64","-2:66","-2:68","-2:70",  "-2:72", "-2:74", 
"-2:76", "-2:78","-2:80","-2:82","-2:84", "-2:86","-2:88","-2:90",  "-2:92", "-2:94", 
"-2:96"];
NY2.trips[NY2.trips.length] = NY2_1;

var NY3 = new TRoute("NY3", "Subway 3");
NY3.common_name = "7 Avenue Express NY3";
NY3.frequency = 15;
NY3.iddir = "S";
NY3.stop_ids = [
"NYT301","NYT302","NYT224","NYT225","NYT226","NYT227","NYT120","NYT123","NYT127", "NYT128",
"NYT132","NYT137","NYT228","NYT229","NYT230","NYT231","NYT232","NYT233","NYT234", "NYT235",
"NYT236","NYT237","NYT238","NYT239","NYT248","NYT249","NYT250","NYT251","NYT252", "NYT253",
"NYT254","NYT255","NYT256","NYT257"
];
NY3.stop_names = getStopNameArrayB(NY3.stop_ids, "3", stops_nyt);
addRouteToService(NY3);

var NY3_0 = new TTrip("NY3_0", "Subway 3", 0, "0123456");
NY3_0.headsign = "New Lots Av";
NY3_0.start_time = "6:00";
NY3_0.end_time = "25:00";
NY3_0.shape_id = "3..S42R";
NY3_0.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58",
"-2:60","-2:62","-2:64", "-2:66"
];
NY3.trips[NY3.trips.length] = NY3_0;

var NY3_1 = new TTrip("NY3_1", "Subway 3", 1, "0123456");
NY3_1.headsign = "Harlem - 148 St";
NY3_1.start_time = "6:00";
NY3_1.end_time = "25:00";
NY3_1.shape_id = "3..N01R";
NY3_1.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58",
"-2:60","-2:62","-2:64", "-2:66"
];
NY3.trips[NY3.trips.length] = NY3_1;

var NY4 = new TRoute("NY4", "Subway 4");
NY4.common_name = "Lexington Avenue Express NY4";
NY4.frequency = 15;
NY4.iddir = "S";
NY4.stop_ids = [
"NYT401","NYT402","NYT405","NYT406","NYT407","NYT408","NYT409","NYT410","NYT411","NYT412",
"NYT413","NYT414","NYT415","NYT416","NYT621","NYT626","NYT629","NYT631","NYT635","NYT640",
"NYT418","NYT419","NYT420","NYT423","NYT234","NYT235","NYT239","NYT250"
];
NY4.stop_names = getStopNameArrayB(NY4.stop_ids, "4", stops_nyt);
addRouteToService(NY4);

var NY4_0 = new TTrip("NY4_0", "Subway 4", 0, "0123456");
NY4_0.headsign = "Crown Hts - Utica Av";
NY4_0.start_time = "6:00";
NY4_0.end_time = "25:00";
NY4_0.shape_id = "4..S01R";
NY4_0.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54"
];
NY4.trips[NY4.trips.length] = NY4_0;

var NY4_1 = new TTrip("NY4_1", "Subway 4", 1, "0123456");
NY4_1.headsign = "Woodlawn";
NY4_1.start_time = "6:00";
NY4_1.end_time = "25:00";
NY4_1.shape_id = "4..N42R";
NY4_1.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54"
];
NY4.trips[NY4.trips.length] = NY4_1;



var NY5 = new TRoute("NY5", "Subway 5");
NY5.common_name = "Lexington Avenue Express NY5";
NY5.frequency = 15;
NY5.iddir = "N";
NY5.stop_ids = [
"NYT247","NYT246","NYT245","NYT244","NYT243","NYT242","NYT241","NYT239","NYT235","NYT234",
"NYT423","NYT420","NYT419","NYT418","NYT640","NYT635","NYT631","NYT629","NYT626","NYT621",
"NYT416","NYT222","NYT221","NYT220","NYT219","NYT218","NYT217","NYT216","NYT215","NYT214",
"NYT213","NYT505","NYT504","NYT503","NYT502","NYT501"
];
NY5.stop_names = getStopNameArrayB(NY5.stop_ids, "5", stops_nyt);
addRouteToService(NY5);

var NY5_0 = new TTrip("NY5_0", "Subway 5", 0, "0123456");
NY5_0.headsign = "Eastchester - Dyre Av";
NY5_0.start_time = "6:00";
NY5_0.end_time = "25:00";
NY5_0.shape_id = "5..N04R";
NY5_0.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58",
"-2:60","-2:62","-2:64", "-2:66", "-2:68","-2:70"
];
NY5.trips[NY5.trips.length] = NY5_0;

var NY5_1 = new TTrip("NY5_1", "Subway 5", 1, "0123456");
NY5_1.headsign = "Flatbush Av - Brooklyn College";
NY5_1.start_time = "6:00";
NY5_1.end_time = "25:00";
NY5_1.shape_id = "5..S04R";
NY5_1.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58",
"-2:60","-2:62","-2:64", "-2:66", "-2:68","-2:70"
];
NY5.trips[NY5.trips.length] = NY5_1;

var NY5X = new TRoute("NY5X", "Subway 5X");
NY5X.common_name = "Lexington Avenue Express";
NY5X.frequency = 15;
NY5X.iddir = "N";
NY5X.stop_ids = [
"NYT247","NYT246","NYT245","NYT244","NYT243","NYT242","NYT241","NYT239","NYT235","NYT234",
"NYT423","NYT420","NYT419","NYT418","NYT640","NYT635","NYT631","NYT629","NYT626","NYT621",
"NYT416","NYT222","NYT221","NYT213","NYT505","NYT504","NYT503","NYT502","NYT501"
];
NY5X.stop_names = getStopNameArrayB(NY5X.stop_ids, "5X", stops_nyt);
addRouteToService(NY5X);

var NY6 = new TRoute("NY6", "Subway 6");
NY6.common_name = "Lexington Avenue Local";
NY6.frequency = 15;
NY6.iddir = "S";
NY6.stop_ids = [
"NYT601","NYT602","NYT603","NYT604","NYT606","NYT607","NYT608","NYT609","NYT610","NYT611",
"NYT612","NYT613","NYT614","NYT615","NYT616","NYT617","NYT618","NYT619","NYT621","NYT622",
"NYT623","NYT624","NYT625","NYT626","NYT627","NYT628","NYT629","NYT630","NYT631","NYT632",
"NYT633","NYT634","NYT635","NYT636","NYT637","NYT638","NYT639","NYT640"
];
NY6.stop_names = getStopNameArrayB(NY6.stop_ids, "6", stops_nyt);
addRouteToService(NY6);

var NY6_0 = new TTrip("NY6_0", "Subway 6", 0, "0123456");
NY6_0.headsign = "Brooklyn Bridge - City Hall";
NY6_0.start_time = "6:00";
NY6_0.end_time = "25:00";
NY6_0.shape_id = "6..S01R";
NY6_0.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58",
"-2:60","-2:62","-2:64", "-2:66", "-2:68","-2:70","-2:72","-2:74"
];
NY6.trips[NY6.trips.length] = NY6_0;

var NY6_1 = new TTrip("NY6_1", "Subway 6", 1, "0123456");
NY6_1.headsign = "Pelham Bay Park";
NY6_1.start_time = "6:00";
NY6_1.end_time = "25:00";
NY6_1.shape_id = "6..N01R";
NY6_1.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58",
"-2:60","-2:62","-2:64", "-2:66", "-2:68","-2:70","-2:72","-2:74"
];
NY6.trips[NY6.trips.length] = NY6_1;

var NY6X = new TRoute("NY6", "Subway 6X");
NY6X.common_name = "Pelham Bay Park Express NY6X";
NY6X.frequency = 15;
NY6X.iddir = "S";
NY6X.stop_ids = [
"NYT601","NYT602","NYT603","NYT604","NYT606","NYT607","NYT608","NYT613","NYT619","NYT621",
"NYT622","NYT623","NYT624","NYT625","NYT626","NYT627","NYT628","NYT629","NYT630","NYT631",
"NYT632","NYT633","NYT634","NYT635","NYT636","NYT637","NYT638","NYT639","NYT640"
];
NY6X.stop_names = getStopNameArrayB(NY6X.stop_ids, "6X", stops_nyt);
addRouteToService(NY6X);

var NY6X_0 = new TTrip("NY6X_0", "Subway 6X", 0, "0123456");
NY6X_0.headsign = "Brooklyn Bridge - City Hall";
NY6X_0.start_time = "6:00";
NY6X_0.end_time = "25:00";
NY6X_0.shape_id = "6..S02R";
NY6X_0.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56"
];
NY6X.trips[NY6X.trips.length] = NY6X_0;

var NY6X_1 = new TTrip("NY6X_1", "Subway 6X", 1, "0123456");
NY6X_1.headsign = "Pelham Bay Park";
NY6X_1.start_time = "6:00";
NY6X_1.end_time = "25:00";
NY6X_1.shape_id = "6..N02R";
NY6X_1.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56"
];
NY6X.trips[NY6X.trips.length] = NY6X_1;

var NY7 = new TRoute("NY7", "Subway 7");
NY7.common_name = "Flushing Local NY7";
NY7.frequency = 15;
NY7.iddir = "S";
NY7.stop_ids = [
"NYT701","NYT702","NYT705","NYT706","NYT707","NYT708","NYT709","NYT710","NYT711","NYT712",
"NYT713","NYT714","NYT715","NYT716","NYT718","NYT719","NYT720","NYT721","NYT723","NYT724",
"NYT725","NYT726"
];
NY7.stop_names = getStopNameArrayB(NY7.stop_ids, "7", stops_nyt);
addRouteToService(NY7);

var NY7_0 = new TTrip("NY7_0", "Subway 7", 0, "0123456");
NY7_0.headsign = "34 St - 11 Av";
NY7_0.start_time = "6:00";
NY7_0.end_time = "25:00";
NY7_0.shape_id = "7..S97R";
NY7_0.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42"
];
NY7.trips[NY7.trips.length] = NY7_0;

var NY7_1 = new TTrip("NY7_1", "Subway 7", 1, "0123456");
NY7_1.headsign = "Flushing - Main St";
NY7_1.start_time = "6:00";
NY7_1.end_time = "25:00";
NY7_1.shape_id = "7..N97R";
NY7_1.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42"
];
NY7.trips[NY7.trips.length] = NY7_1;

var NY7X = new TRoute("NY7X", "Subway 7X");
NY7X.common_name = "Flushing Express NY7X";
NY7X.frequency = 15;
NY7X.iddir = "S";
NY7X.stop_ids = [
"NYT701","NYT702","NYT707","NYT712","NYT718","NYT719","NYT720","NYT721","NYT723","NYT724",
"NYT725","NYT726"
];
NY7X.stop_names = getStopNameArrayB(NY7X.stop_ids, "7X", stops_nyt);
addRouteToService(NY7X);

var NYGS = new TRoute("NYGS", "42 St Shuttle");
NYGS.common_name = "42 St Shuttle";
NYGS.frequency = 15;
NYGS.iddir = "N";
NYGS.stop_ids = ["NYT901","NYT902"];
NYGS.stop_names = getStopNameArrayB(NYGS.stop_ids, "GS", stops_nyt);
addRouteToService(NYGS);

var NYGS_0 = new TTrip("NYGS_0", "Shuttle", 0, "0123456");
NYGS_0.headsign = "Times Sq - 42 St";
NYGS_0.start_time = "6:00";
NYGS_0.end_time = "25:00";
NYGS_0.shape_id = "GS.N03R"
NYGS_0.times = [
"-2:00","-2:02"
];
NYGS.trips[NYGS.trips.length] = NYGS_0;

var NYGS_1 = new TTrip("NYGS_1", "Shuttle", 1, "0123456");
NYGS_1.headsign = "Grand Central - 42 St";
NYGS_1.start_time = "6:00";
NYGS_1.end_time = "25:00";
NYGS_1.shape_id = "GS.S01R";
NYGS_1.times = [
"-2:00","-2:02"
];
NYGS.trips[NYGS.trips.length] = NYGS_1;


var NYA = new TRoute("NYA", "Subway A");
NYA.common_name = "8 Avenue Express NYA";
NYA.frequency = 15;
NYA.iddir = "S";
NYA.stop_ids = [
"NYTA02","NYTA03","NYTA05","NYTA06","NYTA07","NYTA09","NYTA10","NYTA11","NYTA12","NYTA14",
"NYTA15","NYTA16","NYTA17","NYTA18","NYTA19","NYTA20","NYTA21","NYTA22","NYTA24","NYTA25",
"NYTA27","NYTA28","NYTA30","NYTA31","NYTA32","NYTA33","NYTA34","NYTA36","NYTA38","NYTA40",
"NYTA41","NYTA42","NYTA43","NYTA44","NYTA45","NYTA46","NYTA47","NYTA48","NYTA49","NYTA50",
"NYTA51","NYTA52","NYTA53","NYTA54","NYTA55","NYTA57","NYTA59","NYTA60","NYTA61","NYTH01",
"NYTH02","NYTH03","NYTH04","NYTH06","NYTH07","NYTH08","NYTH09","NYTH10","NYTH11",
"NYTA57","NYTA59","NYTA60","NYTA61","NYTA63","NYTA64","NYTA65"
];
NYA.stop_names = getStopNameArrayB(NYA.stop_ids, "A", stops_nyt);
addRouteToService(NYA);

var NYA_0 = new TTrip("NYA_0", "Subway A", 0, "0123456");
NYA_0.headsign = "Far Rockaway - Mott Av";
NYA_0.start_time = "6:00";
NYA_0.end_time = "25:00";
NYA_0.shape_id = "A..N09R";
NYA_0.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58",
"-2:60","-2:62","-2:64", "-2:66", "-2:68","-2:70","-2:72", "-2:74", "-2:76", "-2:78",
"-2:80","-2:82","-2:84", "-2:86", "-2:88","-2:90","-2:92", "-2:94", "-2:96", "-2:98",
"-2:100","-2:102","-2:104", "-2:106", "-2:108","-2:110","-2:112", "-2:114", "-2:116",
"-1","-1","-1","-1","-1","-1"
];
NYA.trips[NYA.trips.length] = NYA_0;

var NYA_1 = new TTrip("NYA_1", "Subway A", 1, "0123456");
NYA_1.headsign = "Inwood - 207 St";
NYA_1.start_time = "6:00";
NYA_1.end_time = "25:00";
NYA_1.shape_id = "A..N09R";
NYA_1.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58",
"-2:60","-2:62","-2:64", "-2:66", "-2:68","-2:70","-2:72", "-2:74", "-2:76", "-2:78",
"-2:80","-2:82","-2:84", "-2:86", "-2:88","-2:90","-2:92", "-2:94", "-2:96", "-2:98",
"-2:100","-2:102","-2:104", "-2:106", "-2:108","-2:110","-2:112", "-2:114", "-2:116",
"-1","-1","-1","-1","-1","-1"
];
NYA.trips[NYA.trips.length] = NYA_1;

var NYA2 = new TRoute("NYA2", "Subway A Ozone Park");
NYA2.common_name = "8 Avenue Express";
NYA2.frequency = 15;
NYA2.iddir = "S";
NYA2.stop_ids = [
"NYTA55","NYTA57","NYTA59","NYTA60","NYTA61","NYTA63","NYTA64","NYTA65"
];
NYA2.stop_names = getStopNameArrayB(NYA2.stop_ids, "A2", stops_nyt);
addRouteToService(NYA2);

var NYA2_0 = new TTrip("NYA2_0", "Subway A", 0, "0123456");
NYA2_0.headsign = "Ozone Park - Lefferts Blvd";
NYA2_0.start_time = "6:00";
NYA2_0.end_time = "25:00";
NYA2_0.shape_id = "A..S43R";
NYA2_0.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14"
];
NYA2.trips[NYA2.trips.length] = NYA2_0;

var NYA2_1 = new TTrip("NYA_1", "Subway A", 1, "0123456");
NYA2_1.headsign = "Euclid Av";
NYA2_1.start_time = "6:00";
NYA2_1.end_time = "25:00";
NYA2_1.shape_id = "A..N43R";
NYA2_1.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14"
];
NYA2.trips[NYA2.trips.length] = NYA2_1;


var NYB = new TRoute("NYB", "Subway B");
NYB.common_name = "Central Park West Local / 6 Avenue Express NYB";
NYB.frequency = 15;
NYB.iddir = "S";
NYB.stop_ids = [
"NYTD13","NYTA14","NYTA15","NYTA16","NYTA17","NYTA18","NYTA19","NYTA20","NYTA21","NYTA22",
"NYTA24","NYTD14","NYTD15","NYTD16","NYTD17","NYTD20","NYTD21","NYTD22","NYTR30","NYTD24",
"NYTD25","NYTD26","NYTD28","NYTD31","NYTD35","NYTD39","NYTD40"
];
NYB.stop_names = getStopNameArrayB(NYB.stop_ids, "B", stops_nyt);
addRouteToService(NYB);

var NYB_0 = new TTrip("NYB_0", "Subway B", 0, "0123456");
NYB_0.headsign = "Brighton Beach";
NYB_0.start_time = "6:00";
NYB_0.end_time = "25:00";
NYB_0.shape_id = "B..S45R";
NYB_0.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52"
];
NYB.trips[NYB.trips.length] = NYB_0;

var NYB_1 = new TTrip("NYB_1", "Subway B", 1, "0123456");
NYB_1.headsign = "Bedford Park Blvd";
NYB_1.start_time = "6:00";
NYB_1.end_time = "25:00";
NYB_1.shape_id = "B..N45R";
NYB_1.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52"
];
NYB.trips[NYB.trips.length] = NYB_1;

var NYC = new TRoute("NYC", "Subway C");
NYC.common_name = "8 Avenue Local NYC";
NYC.frequency = 15;
NYC.iddir = "S";
NYC.stop_ids = [
"NYTA09","NYTA10","NYTA11","NYTA12","NYTA14","NYTA15","NYTA16","NYTA17","NYTA18","NYTA19",
"NYTA20","NYTA21","NYTA22","NYTA24","NYTA25","NYTA27","NYTA28","NYTA30","NYTA31","NYTA32",
"NYTA33","NYTA34","NYTA36","NYTA38","NYTA40","NYTA41","NYTA42","NYTA43","NYTA44","NYTA45",
"NYTA46","NYTA47","NYTA48","NYTA49","NYTA50","NYTA51","NYTA52","NYTA53","NYTA54","NYTA55"
];
NYC.stop_names = getStopNameArrayB(NYC.stop_ids, "C", stops_nyt);
addRouteToService(NYC);

var NYC_0 = new TTrip("NYC_0", "Subway C", 0, "0123456");
NYC_0.headsign = "Euclid Av";
NYC_0.start_time = "6:00";
NYC_0.end_time = "25:00";
NYC_0.shape_id = "C..S04R";
NYC_0.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58",
"-2:60","-2:62","-2:64", "-2:66", "-2:68","-2:70","-2:72", "-2:74", "-2:76", "-2:78"
];
NYC.trips[NYC.trips.length] = NYC_0;

var NYC_1 = new TTrip("NYC_1", "Subway C", 1, "0123456");
NYC_1.headsign = "168 St";
NYC_1.start_time = "6:00";
NYC_1.end_time = "25:00";
NYC_1.shape_id = "C..N04R";
NYC_1.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58",
"-2:60","-2:62","-2:64", "-2:66", "-2:68","-2:70","-2:72", "-2:74", "-2:76", "-2:78"
];
NYC.trips[NYC.trips.length] = NYC_1;

var NYD = new TRoute("NYD", "Subway D");
NYD.common_name = "6 Avenue Express NYD";
NYD.frequency = 15;
NYD.iddir = "S";
NYD.stop_ids = [
"NYTD01","NYTD03","NYTD04","NYTD05","NYTD06","NYTD07","NYTD08","NYTD08","NYTD10","NYTD11",
"NYTD12","NYTD13","NYTA15","NYTA24","NYTD14","NYTD15","NYTD16","NYTD17","NYTD20","NYTD21",
"NYTD22","NYTR31","NYTR36","NYTB12","NYTB13","NYTB14","NYTB15","NYTB16","NYTB17","NYTB18",
"NYTB19","NYTB20","NYTB21","NYTB22","NYTB23","NYTD43"
];
NYD.stop_names = getStopNameArrayB(NYD.stop_ids, "D", stops_nyt);
addRouteToService(NYD);

var NYD_0 = new TTrip("NYD_0", "Subway D", 0, "0123456");
NYD_0.headsign = "Coney Island - Stillwell Av";
NYD_0.start_time = "6:00";
NYD_0.end_time = "25:00";
NYD_0.shape_id = "D..S07R";
NYD_0.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58",
"-2:60","-2:62","-2:64", "-2:66", "-2:68","-2:70"
];
NYD.trips[NYD.trips.length] = NYD_0;

var NYD_1 = new TTrip("NYD_1", "Subway D", 1, "0123456");
NYD_1.headsign = "Norwood - 205 St";
NYD_1.start_time = "6:00";
NYD_1.end_time = "25:00";
NYD_1.shape_id = "D..N14R";
NYD_1.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58",
"-2:60","-2:62","-2:64", "-2:66", "-2:68","-2:70"
];
NYD.trips[NYD.trips.length] = NYD_1;

var NYE = new TRoute("NYE", "Subway E");
NYE.common_name = "8 Avenue Local NYE";
NYE.frequency = 15;
NYE.iddir = "S";
NYE.stop_ids = [
"NYTG05","NYTG06","NYTG07","NYTF05","NYTF06","NYTF07",
"NYTF01","NYTF03","NYTF06",
"NYTG08","NYTG14","NYTG21","NYTF09",
"NYTF11","NYTF12","NYTD14","NYTA25","NYTA27","NYTA28","NYTA30","NYTA31","NYTA32","NYTA33",
"NYTA34","NYTE01"
];
NYE.stop_names = getStopNameArrayB(NYE.stop_ids, "E", stops_nyt);
addRouteToService(NYE);

var NYE_0 = new TTrip("NYE_0", "Subway E", 0, "0123456");
NYE_0.headsign = "World Trade Center";
NYE_0.start_time = "6:00";
NYE_0.end_time = "25:00";
NYE_0.shape_id = "E..S69R";
NYE_0.times = ["-1", "-1","-1", "-1","-1", "-1",
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36"
];
NYE.trips[NYE.trips.length] = NYE_0;

var NYE_1 = new TTrip("NYE_1", "Subway E", 1, "0123456");
NYE_1.headsign = "Jamaica Center - Parsons";
NYE_1.start_time = "6:00";
NYE_1.end_time = "25:00";
NYE_1.shape_id = "E..N70R";
NYE_1.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-1",
"-1","-1", "-1","-1", "-1"
];
NYE.trips[NYE.trips.length] = NYE_1;

var NYF = new TRoute("NYF", "Subway F");
NYF.common_name = "Queens Blvd Express/ 6 Av Local NYF";
NYF.frequency = 15;
NYF.iddir = "S";
NYF.stop_ids = [
"NYTF01","NYTF02","NYTF03","NYTF04","NYTF05","NYTF06","NYTF07","NYTG08","NYTG14","NYTB04",
"NYTB06","NYTB08","NYTB10","NYTD15","NYTD16","NYTD17","NYTD18","NYTD19","NYTD20","NYTD21",
"NYTF14","NYTF15","NYTF16","NYTF18","NYTA41","NYTF20","NYTF21","NYTF22","NYTF23","NYTF24",
"NYTF25","NYTF26","NYTF27","NYTF29","NYTF30","NYTF31","NYTF32","NYTF33","NYTF34","NYTF35",
"NYTF36","NYTF38","NYTF39","NYTD42","NYTD43"
];
NYF.stop_names = getStopNameArrayB(NYF.stop_ids, "F", stops_nyt);
addRouteToService(NYF);

var NYF_0 = new TTrip("NYF_0", "Subway F", 0, "0123456");
NYF_0.headsign = "Coney Island - Stillwell Av";
NYF_0.start_time = "6:00";
NYF_0.end_time = "25:00";
NYF_0.shape_id = "F..S69R";
NYF_0.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58",
"-2:60","-2:62","-2:64", "-2:66", "-2:68","-2:70","-2:72", "-2:74", "-2:76", "-2:78",
"-2:80","-2:82","-2:84", "-2:86", "-2:88"
];
NYF.trips[NYF.trips.length] = NYF_0;

var NYF_1 = new TTrip("NYF_1", "Subway F", 1, "0123456");
NYF_1.headsign = "Jamaica - 179 St";
NYF_1.start_time = "6:00";
NYF_1.end_time = "25:00";
NYF_1.shape_id = "F..N69R";
NYF_1.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58",
"-2:60","-2:62","-2:64", "-2:66", "-2:68","-2:70","-2:72", "-2:74", "-2:76", "-2:78",
"-2:80","-2:82","-2:84", "-2:86", "-2:88"
];
NYF.trips[NYF.trips.length] = NYF_1;

var NYFS = new TRoute("NYFS", "Franklin Avenue Shuttle");
NYFS.common_name = "Franklin Avenue Shuttle";
NYFS.frequency = 15;
NYFS.iddir = "S";
NYFS.stop_ids = [
"NYTS01","NYTS03","NYTS04","NYTD26"
];
NYFS.stop_names = getStopNameArrayB(NYFS.stop_ids, "FS", stops_nyt);
addRouteToService(NYFS);

var NYFS_0 = new TTrip("NYFS_0", "Subway FS", 0, "0123456");
NYFS_0.headsign = "Prospect Park";
NYFS_0.start_time = "6:00";
NYFS_0.end_time = "25:00";
NYFS_0.shape_id = "FS.S01R";
NYFS_0.times = [
"-2:00","-2:02","-2:04", "-2:06"
];
NYFS.trips[NYFS.trips.length] = NYFS_0;

var NYFS_1 = new TTrip("NYFS_1", "Subway FS", 1, "0123456");
NYFS_1.headsign = "Franklin Av";
NYFS_1.start_time = "6:00";
NYFS_1.end_time = "25:00";
NYFS_1.shape_id = "FS.N01R";
NYFS_1.times = [
"-2:00","-2:02","-2:04", "-2:06"
];
NYFS.trips[NYFS.trips.length] = NYFS_1;

var NYG = new TRoute("NYG", "Subway G");
NYG.common_name = "Brooklyn-Queens Crosstown NYG";
NYG.frequency = 15;
NYG.iddir = "S";
NYG.stop_ids = [
"NYTG22","NYTG24","NYTG26","NYTG28","NYTG29","NYTG30","NYTG31","NYTG32","NYTG33","NYTG34",
"NYTG35","NYTG36","NYTA42","NYTF20","NYTF21","NYTF22","NYTF23","NYTF24","NYTF25","NYTF26",
"NYTF27"
];
NYG.stop_names = getStopNameArrayB(NYG.stop_ids, "G", stops_nyt);
addRouteToService(NYG);

var NYG_0 = new TTrip("NYG_0", "Subway G", 0, "0123456");
NYG_0.headsign = "Church Av";
NYG_0.start_time = "6:00";
NYG_0.end_time = "25:00";
NYG_0.shape_id = "G..S14R";
NYG_0.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40"
];
NYG.trips[NYG.trips.length] = NYG_0;

var NYG_1 = new TTrip("NYG_1", "Subway G", 1, "0123456");
NYG_1.headsign = "Court Sq";
NYG_1.start_time = "6:00";
NYG_1.end_time = "25:00";
NYG_1.shape_id = "G..N14R";
NYG_1.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40"
];
NYG.trips[NYG.trips.length] = NYG_1;

var NYJ = new TRoute("NYJ", "Subway J");
NYJ.common_name = "Nassau St Local NYJ";
NYJ.frequency = 15;
NYJ.iddir = "S";
NYJ.stop_ids = [
"NYTG05","NYTG06","NYTJ12","NYTJ13","NYTJ14","NYTJ15","NYTJ16","NYTJ17","NYTJ19","NYTJ20",
"NYTJ21","NYTJ22","NYTJ23","NYTJ24","NYTJ27","NYTJ28","NYTJ29","NYTJ30","NYTJ31","NYTM11",
"NYTM12","NYTM13","NYTM14","NYTM16","NYTM18","NYTM19","NYTM20","NYTM21","NYTM22","NYTM23",
];
NYJ.stop_names = getStopNameArrayB(NYJ.stop_ids, "J", stops_nyt);
addRouteToService(NYJ);

var NYJ_0 = new TTrip("NYJ_0", "Subway J", 0, "0123456");
NYJ_0.headsign = "Broad St";
NYJ_0.start_time = "6:00";
NYJ_0.end_time = "25:00";
NYJ_0.shape_id = "J..S12R";
NYJ_0.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58"
];
NYJ.trips[NYJ.trips.length] = NYJ_0;

var NYJ_1 = new TTrip("NYJ_1", "Subway J", 1, "0123456");
NYJ_1.headsign = "Jamaica Center - Parsons/Archer";
NYJ_1.start_time = "6:00";
NYJ_1.end_time = "25:00";
NYJ_1.shape_id = "J..S12R";
NYJ_1.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58"
];
NYJ.trips[NYJ.trips.length] = NYJ_1;

var NYL = new TRoute("NYL", "Subway L");
NYL.common_name = "14 St-Canarsie Local NYL";
NYL.frequency = 15;
NYL.iddir = "S";
NYL.stop_ids = [
"NYTL01","NYTL02","NYTL03","NYTL05","NYTL06","NYTL08","NYTL10","NYTL11","NYTL12","NYTL13",
"NYTL14","NYTL15","NYTL16","NYTL17","NYTL19","NYTL20","NYTL21","NYTL22","NYTL24","NYTL25",
"NYTL26","NYTL27","NYTL28","NYTL29"
];
NYL.stop_names = getStopNameArrayB(NYL.stop_ids, "L", stops_nyt);
addRouteToService(NYL);

var NYL_0 = new TTrip("NYL_0", "Subway L", 0, "0123456");
NYL_0.headsign = "Canarsie - Rockaway Pkwy";
NYL_0.start_time = "6:00";
NYL_0.end_time = "25:00";
NYL_0.shape_id = "L..S01R";
NYL_0.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46"
];
NYL.trips[NYL.trips.length] = NYL_0;

var NYL_1 = new TTrip("NYL_1", "Subway L", 1, "0123456");
NYL_1.headsign = "8 Av";
NYL_1.start_time = "6:00";
NYL_1.end_time = "25:00";
NYL_1.shape_id = "L..N01R";
NYL_1.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46"
];
NYL.trips[NYL.trips.length] = NYL_1;

var NYM = new TRoute("NYM", "Subway M");
NYM.common_name = "QNS BLVD-6th AVE/ Myrtle Local NYM";
NYM.frequency = 15;
NYM.iddir = "S";
NYM.stop_ids = [
"NYTG08","NYTG09","NYTG10","NYTG11","NYTG12","NYTG13","NYTG14","NYTG15","NYTG16","NYTG18",
"NYTG19","NYTG20","NYTG21","NYTF09","NYTF11","NYTF12","NYTD15","NYTD16","NYTD17","NYTD18",
"NYTD19","NYTD20","NYTD21","NYTM18","NYTM16","NYTM14","NYTM13","NYTM12","NYTM11","NYTM10",
"NYTM09","NYTM08","NYTM06","NYTM05","NYTM04","NYTM01"
];
NYM.stop_names = getStopNameArrayB(NYM.stop_ids, "M", stops_nyt);
addRouteToService(NYM);

var NYM_0 = new TTrip("NYM_0", "Subway M", 0, "0123456");
NYM_0.headsign = "Middle Village - Metropolitan Av";
NYM_0.start_time = "6:00";
NYM_0.end_time = "25:00";
NYM_0.shape_id = "M..S20R";
NYM_0.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58",
"-2:60","-2:62","-2:64", "-2:66", "-2:68","-2:70"
];
NYM.trips[NYM.trips.length] = NYM_0;

var NYM_1 = new TTrip("NYM_1", "Subway M", 1, "0123456");
NYM_1.headsign = "Forest Hills - 71 Av";
NYM_1.start_time = "6:00";
NYM_1.end_time = "25:00";
NYM_1.shape_id = "M..N20R";
NYM_1.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58",
"-2:60","-2:62","-2:64", "-2:66", "-2:68","-2:70"
];
NYM.trips[NYM.trips.length] = NYM_1;


var NYN = new TRoute("NYN", "Subway N");
NYN.common_name = "Broadway Local NYN";
NYN.frequency = 15;
NYN.iddir = "S";
NYN.stop_ids = [
"NYTR01","NYTR03","NYTR04","NYTR05","NYTR06","NYTR08","NYTR09","NYTR11","NYTR13","NYTR14",
"NYTR15","NYTR16","NYTR17","NYTR20","NYTQ01","NYTR31",
"NYTR36","NYTR39","NYTR40","NYTR41","NYTN02","NYTN03","NYTN04","NYTN05","NYTN06","NYTN07",
"NYTN08","NYTN09","NYTN10","NYTD43"
];
NYN.stop_names = getStopNameArrayB(NYN.stop_ids, "N", stops_nyt);
addRouteToService(NYN);

var NYN_0 = new TTrip("NYN_0", "Subway N", 0, "0123456");
NYN_0.headsign = "Coney Island - Stillwell Av";
NYN_0.start_time = "6:00";
NYN_0.end_time = "25:00";
NYN_0.shape_id = "N..S42R";
NYN_0.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58"
];
NYN.trips[NYN.trips.length] = NYN_0;

var NYN_1 = new TTrip("NYN_1", "Subway N", 1, "0123456");
NYN_1.headsign = "Astoria - Ditmars Blvd";
NYN_1.start_time = "6:00";
NYN_1.end_time = "25:00";
NYN_1.shape_id = "N..N42R";
NYN_1.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58"
];
NYN.trips[NYN.trips.length] = NYN_1;

var NYQ = new TRoute("NYQ", "Subway Q");
NYQ.common_name = "Broadway Express NYQ";
NYQ.frequency = 15;
NYQ.iddir = "S";
NYQ.stop_ids = [
"NYTQ05","NYTQ04","NYTQ03","NYTB08","NYTR14","NYTR16","NYTR17","NYTR20","NYTQ01","NYTR30",
"NYTD24","NYTD25","NYTD26","NYTD27","NYTD28","NYTD29","NYTD30","NYTD31","NYTD32","NYTD33",
"NYTD34","NYTD35","NYTD37","NYTD38","NYTD39","NYTD40","NYTD41","NYTD42","NYTD43"
];
NYQ.stop_names = getStopNameArrayB(NYQ.stop_ids, "Q", stops_nyt);
addRouteToService(NYQ);

var NYQ_0 = new TTrip("NYQ_0", "Subway Q", 0, "0123456");
NYQ_0.headsign = "Coney Island - Stillwell Av";
NYQ_0.start_time = "6:00";
NYQ_0.end_time = "25:00";
NYQ_0.shape_id = "Q..S55R"; // ??
NYQ_0.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56"
];
NYQ.trips[NYQ.trips.length] = NYQ_0;

var NYQ_1 = new TTrip("NYQ_1", "Subway Q", 1, "0123456");
NYQ_1.headsign = "96 St";
NYQ_1.start_time = "6:00";
NYQ_1.end_time = "25:00";
NYQ_1.shape_id = "Q..N55R"; // ??
NYQ_1.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56"
];
NYQ.trips[NYQ.trips.length] = NYQ_1;

var NYR = new TRoute("NYR", "Subway R");
NYR.common_name = "Broadway Local NYR";
NYR.frequency = 15;
NYR.iddir = "S";
NYR.stop_ids = [
"NYTG08","NYTG09","NYTG10","NYTG11","NYTG12","NYTG13","NYTG14","NYTG15","NYTG16","NYTG18",
"NYTG19","NYTG20","NYTG21","NYTR11","NYTR13","NYTR14","NYTR15","NYTR16","NYTR17","NYTR18",
"NYTR19","NYTR20","NYTR21","NYTR22","NYTR23","NYTR24","NYTR25","NYTR26","NYTR27","NYTR28",
"NYTR29","NYTR30","NYTR31","NYTR32","NYTR33","NYTR34","NYTR35","NYTR36","NYTR39","NYTR40",
"NYTR41","NYTR42","NYTR43","NYTR44","NYTR45"
];
NYR.stop_names = getStopNameArrayB(NYR.stop_ids, "R", stops_nyt);
addRouteToService(NYR);

var NYR_0 = new TTrip("NYR_0", "Subway R", 0, "0123456");
NYR_0.headsign = "Bay Ridge - 95";
NYR_0.start_time = "6:00";
NYR_0.end_time = "25:00";
NYR_0.shape_id = "A..N09R";
NYR_0.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58",
"-2:60","-2:62","-2:64", "-2:66", "-2:68","-2:70","-2:72", "-2:74", "-2:76", "-2:78",
"-2:80","-2:82","-2:84", "-2:86", "-2:88"
];
NYR.trips[NYR.trips.length] = NYR_0;

var NYR_1 = new TTrip("NYR_1", "Subway R", 1, "0123456");
NYR_1.headsign = "Forest Hills - 71 Av";
NYR_1.start_time = "6:00";
NYR_1.end_time = "25:00";
NYR_1.shape_id = "A..N09R";
NYR_1.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44", "-2:46", "-2:48","-2:50","-2:52", "-2:54", "-2:56", "-2:58",
"-2:60","-2:62","-2:64", "-2:66", "-2:68","-2:70","-2:72", "-2:74", "-2:76", "-2:78",
"-2:80","-2:82","-2:84", "-2:86", "-2:88"
];
NYR.trips[NYR.trips.length] = NYR_1;

var NYH = new TRoute("NYH", "Rockaway Park Shuttle");
NYH.common_name = "Rockaway Park Shuttle";
NYH.frequency = 15;
NYH.iddir = "S";
NYH.stop_ids = [
"NYTH04","NYTH12","NYTH13","NYTH14","NYTH15"
];
NYH.stop_names = getStopNameArrayB(NYH.stop_ids, "H", stops_nyt);
addRouteToService(NYH);

var NYH_0 = new TTrip("NYH_0", "Subway H", 0, "0123456");
NYH_0.headsign = "Rockaway Park - Beach 116 St";
NYH_0.start_time = "6:00";
NYH_0.end_time = "25:00";
NYH_0.shape_id = "H..S21R";
NYH_0.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08"
];
NYH.trips[NYH.trips.length] = NYH_0;

var NYH_1 = new TTrip("NYH_1", "Subway H", 1, "0123456");
NYH_1.headsign = "Broad Channel";
NYH_1.start_time = "6:00";
NYH_1.end_time = "25:00";
NYH_1.shape_id = "H..N21R";
NYH_1.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08"
];
NYH.trips[NYH.trips.length] = NYH_1;

var NYW = new TRoute("NYW", "Subway W");
NYW.common_name = "Broadway Local NYW";
NYW.frequency = 15;
NYW.iddir = "S";
NYW.stop_ids = [
"NYTR01","NYTR03","NYTR04","NYTR05","NYTR06","NYTR08","NYTR09","NYTR11","NYTR13","NYTR14",
"NYTR15","NYTR16","NYTR17","NYTR18","NYTR19","NYTR20","NYTR21","NYTR22","NYTR23","NYTR24",
"NYTR25","NYTR26","NYTR27"
];
NYW.stop_names = getStopNameArrayB(NYW.stop_ids, "W", stops_nyt);
addRouteToService(NYW);

var NYW_0 = new TTrip("NYW_0", "Subway W", 0, "0123456");
NYW_0.headsign = "Whitehall St";
NYW_0.start_time = "6:00";
NYW_0.end_time = "25:00";
NYW_0.shape_id = "N..S72R";
NYW_0.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44"
];
NYW.trips[NYW.trips.length] = NYW_0;

var NYW_1 = new TTrip("NYW_1", "Subway W", 1, "0123456");
NYW_1.headsign = "Astoria - Ditmars Blvd";
NYW_1.start_time = "6:00";
NYW_1.end_time = "25:00";
NYW_1.shape_id = "N..N72R";
NYW_1.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40","-2:42","-2:44"
];
NYW.trips[NYW.trips.length] = NYW_1;

var NYZ = new TRoute("NYZ", "Subway Z");
NYZ.common_name = "Nassau St Express NYZ";
NYZ.frequency = 15;
NYZ.iddir = "S";
NYZ.stop_ids = [
"NYTG05","NYTG06","NYTJ12","NYTJ14","NYTJ15","NYTJ17","NYTJ20","NYTJ21","NYTJ23","NYTJ24",
"NYTJ27","NYTJ28","NYTJ30","NYTM11","NYTM16","NYTM18","NYTM19","NYTM20","NYTM21","NYTM22",
"NYTM23"
];
NYZ.stop_names = getStopNameArrayB(NYZ.stop_ids, "Z", stops_nyt);
addRouteToService(NYZ);

var NYZ_0 = new TTrip("NYZ_0", "Subway Z", 0, "12345");
NYZ_0.headsign = "Broad St";
NYZ_0.start_time = "6:00";
NYZ_0.end_time = "25:00";
NYZ_0.shape_id = "J..S16R";
NYZ_0.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40"
];
NYZ.trips[NYZ.trips.length] = NYZ_0;

var NYZ_1 = new TTrip("NYZ_1", "Subway Z", 1, "12345");
NYZ_1.headsign = "Jamaica Center - Parsons/Archer";
NYZ_1.start_time = "6:00";
NYZ_1.end_time = "25:00";
NYZ_1.shape_id = "J..S16R";
NYZ_1.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40"
];
NYZ.trips[NYZ.trips.length] = NYZ_1;

var NYSI = new TRoute("NYSI", "Staten Island Railway");
NYSI.common_name = "Staten Island RR";
NYSI.frequency = 15;
NYSI.iddir = "N";
NYSI.stop_ids = [
"NYTS09","NYTS11","NYTS13","NYTS14","NYTS15","NYTS16","NYTS17","NYTS18","NYTS19","NYTS20",
"NYTS21","NYTS22","NYTS23","NYTS24","NYTS25","NYTS26","NYTS27","NYTS28","NYTS29","NYTS30",
"NYTS31"
];
NYSI.stop_names = getStopNameArrayB(NYSI.stop_ids, "SI", stops_nyt);
addRouteToService(NYSI);

var NYSI_0 = new TTrip("NYSI_0", "Staten Island RR", 0, "0123456");
NYSI_0.headsign = "St George";
NYSI_0.start_time = "6:00";
NYSI_0.end_time = "25:00";
NYSI_0.shape_id = "SI.N01R";
NYSI_0.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40"
];
NYSI.trips[NYSI.trips.length] = NYSI_0;

var NYSI_1 = new TTrip("NYSI_1", "Staten Island RR", 1, "0123456");
NYSI_1.headsign = "Tottenville";
NYSI_1.start_time = "6:00";
NYSI_1.end_time = "25:00";
NYSI_1.shape_id = "SI.S01R";
NYSI_1.times = [
"-2:00","-2:02","-2:04", "-2:06", "-2:08","-2:10","-2:12", "-2:14", "-2:16", "-2:18",
"-2:20","-2:22","-2:24", "-2:26", "-2:28","-2:30","-2:32", "-2:34", "-2:36", "-2:38",
"-2:40"
];
NYSI.trips[NYSI.trips.length] = NYSI_1;
