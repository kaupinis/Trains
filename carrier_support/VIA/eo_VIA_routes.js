// eo_VIA_routes.js

VIA.addStops(stops_Via);

var VIAR1 = new TRoute("VIAR1","VIA Rail Toronto - London");
VIAR1.common_name = "Toronto - London";
VIAR1.cal = VIA_Cal;
VIAR1.routem = "119-93";
VIA.addRouteToService(VIAR1);

/*
var VIAR2 = new TRoute("VIAR2","VIA Rail Toronto - Kingston");
VIAR2.common_name = "Toronto - Kingston";
VIAR2.cal = VIA_Cal;
VIAR2.routem = "119-58";
VIA.addRouteToService(VIAR2);
*/

var VIAR3 = new TRoute("VIAR3","VIA Rail Montréal - Senneterre");
VIAR3.common_name = "Montréal - Senneterre";
VIAR3.cal = VIA_Cal;
VIAR3.routem = "226-460";
VIA.addRouteToService(VIAR3);

var VIAR4 = new TRoute("VIAR4","VIA Rail Montréal - Toronto");
VIAR4.common_name = "Montréal - Toronto";
VIAR4.cal = VIA_Cal;
VIAR4.routem = "226-119";
VIA.addRouteToService(VIAR4);

var VIAR5 = new TRoute("VIAR5","VIA Rail Montréal - Jonquière");
VIAR5.common_name = "Montréal - Jonquière";
VIAR5.cal = VIA_Cal;
VIAR5.routem = "226-444";
VIA.addRouteToService(VIAR5);

var VIAR6 = new TRoute("VIAR6","VIA Rail Vancouver - Toronto");
VIAR6.common_name = "Vancouver - Toronto";
VIAR6.cal = VIA_Cal;
VIAR6.routem = "8-119";
VIA.addRouteToService(VIAR6);

var VIAR7 = new TRoute("VIAR7","VIA Rail Toronto - Sarnia");
VIAR7.common_name = "Toronto - Sarnia";
VIAR7.cal = VIA_Cal;
VIAR7.routem = "119-341";
VIA.addRouteToService(VIAR7);

var VIAR8 = new TRoute("VIAR8","VIA Rail Sudbury - White River");
VIAR8.common_name = "Sudbury - White River";
VIAR8.cal = VIA_Cal;
VIAR8.routem = "621-116";
VIA.addRouteToService(VIAR8);

var VIAR9 = new TRoute("VIAR9","VIA Rail Winnipeg - Churchill");
VIAR9.common_name = "Winnipeg - Churchill";
VIAR9.cal = VIA_Cal;
VIAR9.routem = "388-435";
VIA.addRouteToService(VIAR9);

var VIAR10 = new TRoute("VIAR10","VIA Rail Ottawa - Québec");
VIAR10.common_name = "Ottawa - Québec";
VIAR10.cal = VIA_Cal;
VIAR10.routem = "617-628";
VIA.addRouteToService(VIAR10);

/*
var VIAR11 = new TRoute("VIAR11","VIA Rail RÉGÎM");
VIAR11.common_name = "RÉGÎM";
VIAR11.cal = VIA_Cal;
VIAR11.routem = "REGIM";
VIAR11.stop_ids = ["VIA355","VIA358","VIA364","VIA20","VIA233","VIA363","VIA337","VIA271","VIA97",
"VIA382","VIA272","VIA372","VIA604","VIA555"];
addRouteToService(VIAR11);
*/

var VIAR12 = new TRoute("VIAR12","VIA Rail Toronto - Windsor");
VIAR12.common_name = "Toronto - Windsor";
VIAR12.cal = VIA_Cal;
VIAR12.routem = "119-618";
VIA.addRouteToService(VIAR12);

var VIAR13 = new TRoute("VIAR13","VIA Rail Jasper - Prince Rupert");
VIAR13.common_name = "Jasper - Prince Rupert";
VIAR13.cal = VIA_Cal;
VIAR13.routem = "21-458";
VIA.addRouteToService(VIAR13);

var VIAR14 = new TRoute("VIAR14","VIA Rail Air Connect");
VIAR14.common_name = "Air Connect";
VIAR14.cal = VIA_Cal;
VIAR14.routem = "AC";
VIA.addRouteToService(VIAR14);

var VIAR15 = new TRoute("VIAR15","VIA Rail Toronto - New York");
VIAR15.common_name = "Toronto - New York";
VIAR15.cal = VIA_Cal;
VIAR15.routem = "119-120";
VIA.addRouteToService(VIAR15);

/*
var VIAR16 = new TRoute("VIAR16","VIA Rail Air Connect");
VIAR16.common_name = "Air Connect";
VIAR16.cal = VIA_Cal;
VIAR16.routem = "AC";
VIA.addRouteToService(VIAR16);
*/
/*
var VIAR17 = new TRoute("VIAR17","VIA Rail Train de Québec");
VIAR17.common_name = "Train de Québec";
VIAR17.cal = VIA_Cal;
VIAR17.routem = "TDCQ";
VIAR17.stop_ids = ["VIA640","VIA641","VIA642","VIA643"];
VIA.addRouteToService(VIAR17);
*/

var VIAR18 = new TRoute("VIAR18","VIA Rail Ottawa - Montréal");
VIAR18.common_name = "Ottawa - Montréal";
VIAR18.cal = VIA_Cal;
VIAR18.routem = "617-226";
VIA.addRouteToService(VIAR18);

var VIAR19 = new TRoute("VIAR19","VIA Rail Ottawa - Toronto");
VIAR19.common_name = "Ottawa - Toronto";
VIAR19.cal = VIA_Cal;
VIAR19.routem = "617-119";
VIA.addRouteToService(VIAR19);

var VIAR20 = new TRoute("VIAR20","VIA Rail Québec - Fallowfield");
VIAR20.common_name = "Québec - Fallowfield";
VIAR20.cal = VIA_Cal;
VIAR20.routem = "628-576";
VIA.addRouteToService(VIAR20);

var VIAR21 = new TRoute("VIAR21","VIA Rail Québec - Montréal");
VIAR21.common_name = "Québec - Montréal";
VIAR21.cal = VIA_Cal;
VIAR21.routem = "628-226";
VIA.addRouteToService(VIAR21);

/*
var VIAR22 = new TRoute("VIAR22","VIA Rail Montréal - Aldershot");
VIAR22.common_name = "Montréal - Aldershot";
VIAR22.cal = VIA_Cal;
VIAR22.routem = "226-600";
VIA.addRouteToService(VIAR22);
*/

var VIAR23 = new TRoute("VIAR23","VIA Rail The Pas - Churchill");
VIAR23.common_name = "The Pas - Churchill";
VIAR23.cal = VIA_Cal;
VIAR23.routem = "149-435";
VIA.addRouteToService(VIAR23);

var VIAR24 = new TRoute("VIAR24","VIA Rail Montréal - Halifax");
VIAR24.common_name = "Montréal - Halifax";
VIAR24.cal = VIA_Cal;
VIAR24.routem = "226-620";
VIA.addRouteToService(VIAR24);


