// eo_MBTA_Routes.js

var CH0 = new TRoute("CH0", "Haverhill Line");
CH0.common_name = "CR-Haverhill";
CH0.routem = "CR-Haverhill";
CH0.cal = MBTA_Cal;
CH0.transfers = "T_BNT-0000,T_WR-0329,place-WR-0120";
addRouteToTService(CH0);

var SC = new TRoute("SC", "South Coast Line");
SC.common_name = "SC";
SC.routem = "CR-NewBedford";
SC.cal = MBTA_Cal;
SC.transfers = "T_NEC-2287";
addRouteToTService(SC);

var CH1 = new TRoute("CH1", "Haverhill Line 1");
CH1.common_name = "CH1";
CH1.cal = MBTA_Cal;
CH1.transfers = "T_BNT-0000,T_WR-0329,place-WR-0120";
CH1.stop_ids = [
"WR-0329","WR-0325","WR-0264-02","WR-0228-02","WR-0205-02","NHRML-0152","NHRML-0127","NHRML-0078","NHRML-0073","NHRML-0055","BNT-0000"];
CH1.stop_names = ["Haverhill","Bradford","Lawrence","Andover","Ballardvale","Wilmington","Anderson/ Woburn","Winchester Center","Wedgemere","West Medford","North Station"];
addRouteToTService(CH1);

var CH2 = new TRoute("CH2", "Haverhill Line S");
CH2.common_name = "CH2";
CH2.cal = MBTA_Cal;
CH2.stop_ids = 
["Ballardvale-S", "North Wilmington-S", "Reading-S", "Wakefield-S", "Greenwood-S", "Melrose Highlands-S", "Melrose Cedar Park-S", "Wyoming Hill-S", "53270"];
CH2.stop_names =
["Ballardvale - Commuter Rail Shuttle","North Wilmington - Commuter Rail Shuttle",
"Reading - Commuter Rail Shuttle", "Wakefield - Commuter Rail Shuttle", "Greenwood - Commuter Rail Shuttle", "Melrose Highlands - Commuter Rail Shuttle","Melrose Cedar Park - Commuter Rail Shuttle", "Wyoming Hill - Commuter Rail Shuttle","Malden Center - West Busway"];
addRouteToTService(CH2);

            
var CN0 = new TRoute("CN0", "Newburyport / Rockport Line");
CN0.common_name = "CR-Newburyport";
CN0.routem = "CR-Newburyport";
CN0.cal = MBTA_Cal;
CN0.transfers = "T_BNT-0000,T_ER-0183,T_ER-0046,T_GB-0254";
addRouteToTService(CN0);

var CL0 = new TRoute("CL0", "Lowell Line");
CL0.common_name = "CR-Lowell";
CL0.routem = "CR-Lowell";
CL0.cal = MBTA_Cal;
CL0.transfers = "T_BNT-0000,T_NHRML-0127";
addRouteToTService(CL0);


var CL1 = new TRoute("CL1", "Lowell Line 1");
CL1.common_name = "CR-Lowell";
CL1.cal = MBTA_Cal;
CL1.stop_ids = ["Lowell","North Billerica","Wilmington","Anderson/ Woburn","Winchester Center","Wedgemere","West Medford","5271","113","114"];
CL1.stop_names = ["Lowell","North Billerica","Wilmington","Anderson/ Woburn","Winchester Center","Wedgemere","West Medford","Wellington Station Busway","Portland St @ Causeway St", "Causeway St @ North Station"];
addRouteToTService(CL1);

var CW0 = new TRoute("CW0", "Framingham / Worcester Line");
CW0.common_name = "CR-Worcester";
CW0.routem = "CR-Worcester";
CW0.cal = MBTA_Cal;
CW0.transfers = "T_NEC-2287";
addRouteToTService(CW0);

var KP0 = new TRoute("KP0", "Kingston Line");
KP0.common_name = "CR-Kingston";
KP0.routem = "CR-Kingston";
KP0.cal = MBTA_Cal;
KP0.transfers = "T_NEC-2287";
addRouteToTService(KP0);


var FT0 = new TRoute("FT0", "Fitchburg Line");
FT0.common_name = "CR-Fitchburg";
FT0.routem = "CR-Fitchburg";
FT0.cal = MBTA_Cal;
FT0.transfers = "T_BNT-0000";
addRouteToTService(FT0);

var ND0 = new TRoute("ND0", "Needham Line");
ND0.common_name = "CR-Needham";
ND0.routem = "CR-Needham";
ND0.cal = MBTA_Cal;
ND0.transfers = "T_NEC-2287";
addRouteToTService(ND0);

var FK0 = new TRoute("FK0", "Franklin Line ");
FK0.common_name = "CR-Franklin";
FK0.routem = "CR-Franklin";
FK0.cal = MBTA_Cal;
FK0.transfers = "T_DB-0095,T_NEC-2287";
addRouteToTService(FK0);

var FK1 = new TRoute("FK1", "Fairmount Line");
FK1.common_name = "FK1";
FK1.cal = MBTA_Cal;
FK1.stop_ids = [
"FB-0303-S","FB-0275-S","FB-0230-S","FB-0191-S","FB-0166-S","FB-0148","FB-0143","FB-0125","FB-0118","FB-0109","DB-0095","DB-2205","DB-2230","DB-2240","DB-2249","DB-2258","DB-2265","NEC-2287"];
/*
FK1.stop_ids = ["Forge Park / 495","Franklin","Norfolk","Walpole","Windsor Gardens","Norwood Central","Norwood Depot","Islington","Dedham Corp Center", "Endicott","Readville","Fairmount","Morton Street","Talbot Avenue","Four Corners / Geneva","Uphams Corner","Newmarket", "South Station"];
*/
FK1.stop_names = ["Forge Park / 495","Franklin","Norfolk","Walpole","Windsor Gardens","Norwood Central","Norwood Depot","Islington","Dedham Corp Center", "Endicott","Readville","Fairmount","Morton Street","Talbot Avenue","Four Corners / Geneva","Uphams Corner","Newmarket","South Station"];
addRouteToTService(FK1);

var FM0 = new TRoute("FM0", "Fairmount Line");
FM0.common_name = "CR-Fairmount";
FM0.routem = "CR-Fairmount";
FM0.cal = MBTA_Cal;
FM0.transfers = "T_DB-0095,T_NEC-2287";
addRouteToTService(FM0);

var JUS = new TRoute("JUS", "Shuttle-BroadwayJFK");
JUS.common_name = "Shuttle-BroadwayJFK";
JUS.cal = MBTA_Cal;
JUS.stop_ids = ["151", "13", "121"];
addRouteToTService(JUS);

var CG0 = new TRoute("CG0", "Greenbush Line");
CG0.common_name = "CR-Greenbush";
CG0.routem = "CR-Greenbush";
CG0.cal = MBTA_Cal;
CG0.transfers = "T_NEC-2287";
addRouteToTService(CG0);

/*
var ML0 = new TRoute("ML0", "Middleborough Line");
ML0.common_name = "CR-Middleborough";
ML0.routem = "CR-Middleborough";
ML0.cal = MBTA_Cal;
ML0.transfers = "T_NEC-2287";
addRouteToTService(ML0);
*/

var PS0 = new TRoute("PS0", "Providence / Stoughton Line");
PS0.common_name = "CR-Providence";
PS0.routem = "CR-Providence";
PS0.cal = MBTA_Cal;
PS0.transfers = "T_NEC-2287,T_NEC-1851";
addRouteToTService(PS0);

var PS1 = new TRoute("PS1", "PS1");
PS1.common_name = "CR-Providence / Stoughton";
PS1.cal = MBTA_Cal;
PS1.transfers = "T_NEC-2287,T_NEC-1851";
addRouteToTService(PS1);

var FX0 = new TRoute("FX0", "Foxboro Event Service");
FX0.common_name = "CR-Foxboro";
FX0.routem = "CR-Foxboro";
FX0.transfers = "T_NEC-2287,T_NEC-1851";
FX0.cal = MBTA_Cal;
addRouteToTService(FX0);

var O0 = new TRoute("O0", "Orange Line");
O0.common_name = "Orange Line";
O0.routem = "Orange";
O0.transfers = "T_BNT-0000";
addRouteToTService(O0);

var B0 = new TRoute("B0", "Blue Line");
B0.common_name = "Blue Line";
B0.routem = "Blue";
B0.transfers = "place-state,place-gover,place-aport";
addRouteToTService(B0);

var R0 = new TRoute("R0", "Red Line");
R0.common_name = "Red Line";
R0.routem = "Red";
R0.transfers = "T_NEC-2287,place-asmnl,place-jfk,place-sstat,place-dwnxg,place-pktrm,place-portr";
addRouteToTService(R0);


var R3 = new TRoute("R3", "Mattapan Trolley");
R3.common_name = "Mattapan Trolley";
R3.routem = "Mattapan";
R3.transfers = "place-asmnl"
addRouteToTService(R3);


var G0 = new TRoute("G0", "Green Line East");
G0.common_name = "Green Line East";
//G0.frequency = 15; // minutes
G0.transfers = "place-pktrm,place-coecl,place-gover,place-north";
G0.stop_ids = ["place-lech", "place-spmnl","place-north", "place-haecl", "place-gover", "place-pktrm"];
G0.stop_names = ["Lechmere", "Science Park", "North Station", "Haymarket", "Government Center", "Park Street"];
addRouteToTService(G0);

var G1 = new TRoute("G1", "Green Line B");
G1.common_name = "Green Line B";
G1.routem = "Green-B";
G1.frequency = 12; // minutes
G1.transfers = "place-kencl,place-coecl,place-pktrm,place-gover";
G1.stop_ids = ["place-gover","place-pktrm", "place-boyls","place-armnl", "place-coecl", "place-hymnl", "place-kencl","place-bland", "place-buest", "place-bucen", "place-amory", "place-babck", "place-brico", "place-harvd", "place-grigg", "place-alsgr", "place-wrnst", "place-wascm","place-sthld", "place-chswk","place-chill", "place-sougr", "place-lake"];
G1.stop_names = ["Government Center","Park Street", "Boylston", "Arlington", "Copley", "Hynes Convention Center", "Kenmore", "Blandford Street", "Boston Univ. East", "Boston Univ. Central", "Amory Street", "Babcock Street", "Packards Corner", "Harvard Ave.", "Griggs Street", "Allston Street", "Warren Street", "Washington Street", "Sutherland Road", "Chiswick Road", "Chestnut Hill Ave.", "South Street","Boston College"];
addRouteToTService(G1);


var G2 = new TRoute("G2", "Green Line C");
G2.common_name = "Green Line C";
G2.routem = "Green-C";
//G2.frequency = 15; // minutes
G2.transfers = "place-kencl,place-coecl,place-gover,place-pktrm";
G2.stop_ids = ["place-gover", "place-pktrm", "place-boyls","place-armnl", "place-coecl", "place-hymnl", "place-kencl","place-smary", "place-hwsst", "place-kntst", "place-stpul", "place-cool", "place-sumav", "place-bndhl", "place-fbkst","place-bcnwa","place-tapst", "place-denrd","place-engav","place-clmnl"];
G2.stop_names = ["Government Center", "Park Street", "Boylston", "Arlington", "Copley", "Hynes Convention Center", "Kenmore","Saint Marys Street", "Hawes Street", "Kent Street", "Saint Paul Street", "Coolidge Corner", "Summit Ave.", "Brandon Hall", "Fairbanks Street", "Washington Square", "Tappen Street", "Dean Road", "Englewood Ave.", "Cleveland Circle"];
addRouteToTService(G2);

var G3 = new TRoute("G3", "Green Line D");
G3.common_name = "Green Line D";
G3.routem = "Green-D";
//G3.frequency = 15; // minutes
G3.transfers = "place-kencl,place-coecl,place-gover,place-pktrm, place-north";
G3.stop_ids = [
"place-unsqu","place-lech", "place-spmnl","place-north", "place-haecl",
"place-gover", "place-pktrm", "place-boyls","place-armnl", "place-coecl", "place-hymnl", "place-kencl", "place-fenwy", "place-longw", "place-bvmnl", "place-brkhl", 
"place-bcnfd", "place-rsmnl", "place-chhil", "place-newto", "place-newtn", "place-eliot", "place-waban", "place-woodl","place-river"];
G3.stop_names = ["Union Square","Lechmere", "Science Park","North Station", "Haymarket", "Government Center", "Park Street", "Boylston", "Arlington", "Copley", "Hynes Convention Center", "Kenmore","Fenway", "Longwood", "Brookline Village", "Brookline Hills", "Beaconsfield", "Reservoir", "Chestnut Hill", "Newton Centre", "Newton Highlands", "Eliot", "Waban", "Woodland", "Riverside"];
addRouteToTService(G3);

var G4 = new TRoute("G4", "Green Line E");
G4.common_name = "Green Line E";
G4.routem = "Green-E";
//G4.frequency = 15; // minutes
G4.transfers = "place-pktrm,place-coecl,place-gover,place-north";
G4.stop_ids = [
"place-mdftf","place-balsq","place-mgngl","place-gilmn","place-esomr",
"place-unsqu","place-lech", "place-spmnl","place-north", "place-haecl",
"place-gover", "place-pktrm", "place-boyls","place-armnl", "place-coecl","place-prmnl", "place-symcl", "place-nuniv","place-mfa", "place-lngmd", "place-brmnl", "place-fenwd", "place-mispk", "place-rvrwy", "place-bckhl","place-hsmnl"];
G4.stop_names = ["Medford / Tufts","Ball Square","Magoun Square","Gilman Square","East Somerville",
"Union Square","Lechmere", "Science Park", "North Station", "Haymarket", "Government Center", "Park Street", "Boylston", "Arlington", "Copley", "Prudential", "Symphony", "Northeastern University", "Museum of Fine Arts", "Longwood Medical Area", "Brigham Circle", "Fenwood Road", "Mission Park", "Riverway", "Back of the Hill", "Heath Street"];
addRouteToTService(G4);

