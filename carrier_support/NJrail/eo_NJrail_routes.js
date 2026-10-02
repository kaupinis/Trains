// eo_NJrail_routes.js

let NJR1 = new TRoute("NJR1","New Jersey Transit River Line");
NJR1.common_name = "NJ River Line";
NJR1.cal = NJ_Cal;
NJR1.mode = "18";
NJR1.transfers = "place-wrtcn,place-trenton";
NJR1.stop_ids = ["NJ40303", "NJ38304", "NJ43541", "NJ28857", "NJ43565", "NJ42132"];
NJ.addRoute(NJR1);


let NJRATLC = new TRoute("NJRATLC","ATLC New Jersey Transit Atlantic City Rail Line");
NJRATLC.common_name = "NJ Atlantic City Rail Line";
NJRATLC.cal = NJ_Cal;
NJRATLC.mode = "16";
NJRATLC.short = "ATLC";
NJRATLC.code = "AC";
NJRATLC.transfers = "place-PA,place-pensk";
NJRATLC.stop_ids = ["NJ10", "NJ2", "NJ39", "NJ55", "NJ9", "NJ71", "NJ28", "NJ43298", "NJ1"];
NJ.addRoute(NJRATLC);


let NJRBMGM = new TRoute("NJRBMGM","New Jersey Transit Meadowlands Rail Line");
NJRBMGM.common_name = "NJ Meadowlands Rail Line";
NJRBMGM.cal = NJ_Cal;
NJRBMGM.mode = "17";
NJRBMGM.short = "MRL";
NJRBMGM.code = "SL";
NJRBMGM.transfers = "place-hoboken";
NJRBMGM.stop_ids = ["NJ40570", "NJ38174", "NJ63"];
NJ.addRoute(NJRBMGM);


let NJRBNTN = new TRoute("NJRBNTN","BNTN New Jersey Transit Montclair-Boonton Line");
NJRBNTN.common_name = "NJ Montclair-Boonton Line";
NJRBNTN.cal = NJ_Cal;
NJRBNTN.mode = "16";
NJRBNTN.short = "BNTN";
NJRBNTN.code = "MC";
NJRBNTN.transfers = "place-newbr,place-hoboken";
NJRBNTN.stop_ids = ["NJ54", "NJ93", "NJ101", "NJ67", "NJ39472", "NJ35", "NJ34", "NJ96", "NJ20", "NJ147", "NJ69", "NJ98", "NJ39635", "NJ72", "NJ38081", "NJ89", "NJ95", "NJ150", "NJ153", "NJ152", "NJ14", "NJ50", "NJ19", "NJ154", "NJ106", "NJ63"];
NJ.addRoute(NJRBNTN);

let NJRBNTNM = new TRoute("NJRBNTNM","BNTNM New Jersey Transit Montclair-Boonton Line");
NJRBNTNM.common_name = "NJ Montclair-Boonton Line";
NJRBNTNM.cal = NJ_Cal;
NJRBNTNM.mode = "16";
NJRBNTNM.short = "BNTNM";
NJRBNTNM.code = "MC";
NJRBNTNM.transfers = "place-newbr,place-secaucus,place-nyc";
NJRBNTNM.stop_ids = ["NJ38081", "NJ89", "NJ95", "NJ150", "NJ153", "NJ152", "NJ14", "NJ50", "NJ19", "NJ154", "NJ106", "NJ63", "NJ38187", "NJ105"];
NJ.addRoute(NJRBNTNM);

let NJRHBLR = new TRoute("NJRHBLR","HBLR New Jersey Transit Hudson-Bergen Light Rail");
NJRHBLR.common_name = "NJ Hudson-Bergen Light Rail";
NJRHBLR.cal = NJ_Cal;
NJRHBLR.mode = "16";
NJRHBLR.short= "HBLR";
NJRHBLR.transfers = "place-hoboken";
NJRHBLR.stop_ids = ["NJ42673", "NJ37000", "NJ38229", "NJ37002", "NJ36999", "NJ37005", "NJ37004", "NJ37005", "NJ36998", "NJ37003", "NJ37004", "NJ36997", "NJ37002", "NJ37001", "NJ36997", "NJ37000", "NJ36996", "NJ36999", "NJ36996", "NJ36995", "NJ36994", "NJ36998", "NJ36994", "NJ36997", "NJ36996", "NJ37376", "NJ36996", "NJ36995", "NJ37377", "NJ36994", "NJ37378", "NJ37376", "NJ37377", "NJ39348", "NJ38441", "NJ37377", "NJ37378", "NJ38442", "NJ17699", "NJ37378", "NJ9878", "NJ38441", "NJ38578", "NJ38442", "NJ38579", "NJ17699", "NJ9878", "NJ38578", "NJ38579", "NJ39348"];
NJ.addRoute(NJRHBLR);

let NJRMNBN = new TRoute("NJRMNBN","MNBN New Jersey Transit Main/Bergen County Line");
NJRMNBN.common_name = "NJ Main/Bergen County Line";
NJRMNBN.cal = NJ_Cal;
NJRMNBN.mode = "16";
NJRMNBN.short = "MNBN";
NJRMNBN.code = "ML";
NJRMNBN.transfers = "NJ43599,place-hoboken";
NJRMNBN.stop_ids = ["NJ144", "NJ78", "NJ38417", "NJ128", "NJ3", "NJ151", "NJ64", "NJ131", "NJ51", "NJ126", "NJ25", "NJ121", "NJ46", "NJ43599", "NJ134", "NJ52", "NJ58", "NJ116", "NJ29", "NJ115", "NJ33", "NJ75", "NJ66", "NJ38174", "NJ63"];
NJ.addRoute(NJRMNBN);

let NJRMNBNP = new TRoute("NJRMNBNP","MNBNP New Jersey Transit Port Jervis Line");
NJRMNBNP.common_name = "NJ Port Jervis Line";
NJRMNBNP.cal = NJ_Cal;
NJRMNBNP.mode = "16";
NJRMNBNP.short = "MNBNP";
NJRMNBNP.transfers = "place-secaucus,place-hoboken";
NJRMNBNP.stop_ids = ["NJ123", "NJ113", "NJ86", "NJ26", "NJ135", "NJ57", "NJ149", "NJ137", "NJ144", "NJ78", "NJ38417", "NJ128", "NJ3", "NJ151", "NJ64", "NJ131", "NJ51", "NJ52", "NJ58", "NJ116", "NJ29", "NJ115", "NJ33", "NJ75", "NJ66", "NJ126", "NJ25", "NJ121", "NJ46", "NJ43599", "NJ134", "NJ38174", "NJ63"];
NJ.addRoute(NJRMNBNP);

let NJRMNE = new TRoute("NJRMNE","MNE New Jersey Transit Morris & Essex Line");
NJRMNE.common_name = "NJ Morris & Essex Line";
NJRMNE.cal = NJ_Cal;
NJRMNE.mode = "16";
NJRMNE.short = "MNE";
NJRMNE.code = "ME";
NJRMNE.transfers = "place-secaucus,place-newbr,place-nyc,place-hoboken";
NJRMNE.stop_ids = ["NJ54", "NJ93", "NJ101", "NJ67", "NJ39472", "NJ35", "NJ34", "NJ94", "NJ91", "NJ92", "NJ30", "NJ77", "NJ27", "NJ145", "NJ136", "NJ87", "NJ81", "NJ140", "NJ97", "NJ61", "NJ112", "NJ23", "NJ37", "NJ106", "NJ38187", "NJ63", "NJ105"];
NJ.addRoute(NJRMNE);

let NJRMNEG = new TRoute("NJRMNEG","MNEG New Jersey Transit Gladstone Branch");
NJRMNEG.common_name = "NJ Gladstone Branch";
NJRMNEG.cal = NJ_Cal;
NJRMNEG.mode = "16";
NJRMNEG.short = "MNEG";
NJRMNEG.code = "GS";
NJRMNEG.transfers = "place-newbr,place-nyc,place-hoboken";
NJRMNEG.stop_ids = ["NJ49", "NJ117", "NJ45", "NJ18", "NJ12", "NJ76", "NJ88", "NJ143", "NJ48", "NJ17", "NJ99", "NJ104", "NJ145", "NJ136", "NJ87", "NJ81", "NJ140", "NJ97", "NJ61", "NJ112", "NJ23", "NJ37", "NJ106", "NJ63", "NJ38187", "NJ105"];
NJ.addRoute(NJRMNEG);

let NJRNEC = new TRoute("NJRNEC","NEC New Jersey Transit Northeast Corridor");
NJRNEC.common_name = "NJ Northeast Corridor";
NJRNEC.cal = NJ_Cal;
NJRNEC.mode = "16";
NJRNEC.short = "NEC";
NJRNEC.code = "NE";
NJRNEC.transfers = "place-newark,place-secaucus,place-trenton,place-nyc,place-newarkair";
NJRNEC.stop_ids = ["NJ148", "NJ32905", "NJ125", "NJ32906", "NJ103", "NJ38", "NJ84", "NJ83", "NJ127", "NJ70", "NJ41", "NJ109", "NJ37953", "NJ107", "NJ38187", "NJ105"];
NJ.addRoute(NJRNEC);

let NJRNJCL = new TRoute("NJRNJCL","NJCL New Jersey Transit North Jersey Coast Line");
NJRNJCL.common_name = "NJ North Jersey Coast Line";
NJRNJCL.cal = NJ_Cal;
NJRNJCL.mode = "16";
NJRNJCL.short = "NJCL";
NJRNJCL.code = "NC";
NJRNJCL.transfers = "place-newark,place-secaucus,place-nyc,NJ74,place-newarkair";
NJRNJCL.stop_ids = ["NJ13", "NJ122", "NJ79", "NJ141", "NJ15", "NJ22", "NJ8", "NJ4", "NJ40", "NJ74", "NJ31696", "NJ73", "NJ130", "NJ85", "NJ59", "NJ37169", "NJ139", "NJ119", "NJ158", "NJ11", "NJ127", "NJ70", "NJ41", "NJ109", "NJ37953", "NJ107", "NJ63", "NJ38187", "NJ105"];
NJ.addRoute(NJRNJCL);

let NJRNJCLL = new TRoute("NJRNJCLL","NJCLL New Jersey Transit North Jersey Coast Line");
NJRNJCLL.common_name = "NJ North Jersey Coast Line";
NJRNJCLL.cal = NJ_Cal;
NJRNJCLL.mode = "16";
NJRNJCLL.short = "NJCLL";
NJRNJCLL.code = "NC";
NJRNJCLL.transfers = "NJ74";
NJRNJCLL.stop_ids = ["NJ13", "NJ122", "NJ79", "NJ141", "NJ15", "NJ22", "NJ8", "NJ4", "NJ40", "NJ74", "NJ31696", "NJ73", "NJ130", "NJ85", "NJ59", "NJ37169", "NJ139", "NJ119", "NJ158", "NJ11", "NJ127", "NJ70", "NJ41", "NJ109", "NJ37953", "NJ107", "NJ63", "NJ38187", "NJ105"];
NJ.addRoute(NJRNJCLL);

let NJRNLR = new TRoute("NJRNLR","NLR New Jersey Transit Newark Light Rail");
NJRNLR.common_name = "NJ Newark Light Rail";
NJRNLR.cal = NJ_Cal;
NJRNLR.mode = "16";
NJRNLR.short = "NLR";
NJRNLR.transfers = "place-newark";
NJRNLR.stop_ids = ["NJ38065", "NJ38064", "NJ26316", "NJ6907", "NJ14984", "NJ6966", "NJ14986", "NJ6957", "NJ6995", "NJ6997", "NJ6900", "NJ42545", "NJ26326", "NJ39134", "NJ39133", "NJ39132", "NJ39131", "NJ39130"];
NJ.addRoute(NJRNLR);

let NJRPASC = new TRoute("NJRPASC","PASC New Jersey Transit Pascack Valley Line");
NJRPASC.common_name = "NJ Pascack Valley Line";
NJRPASC.cal = NJ_Cal;
NJRPASC.mode = "16";
NJRPASC.short = "PASC";
NJRPASC.code = "PV";
NJRPASC.transfers = "place-secaucus,place-hoboken";
NJRPASC.stop_ids = ["NJ142", "NJ100", "NJ118", "NJ90", "NJ114", "NJ159", "NJ62", "NJ156", "NJ42", "NJ111", "NJ132", "NJ110", "NJ5", "NJ43", "NJ146", "NJ160", "NJ38174", "NJ63"];
NJ.addRoute(NJRPASC);

let NJRPRIN = new TRoute("NJRPRIN","PRIN New Jersey Transit Princeton Shuttle");
NJRPRIN.common_name = "NJ Princeton Shuttle";
NJRPRIN.cal = NJ_Cal;
NJRPRIN.mode = "16";
NJRPRIN.short = "PRIN";
NJRPRIN.code = "PR";
NJRPRIN.transfers = "NJ124,NJ125";
NJRPRIN.stop_ids = ["NJ124", "NJ125"];
NJ.addRoute(NJRPRIN);

let NJRRARV = new TRoute("NJRRARV","RARV New Jersey Transit Raritan Valley Line");
NJRRARV.common_name = "NJ Raritan Valley Line";
NJRRARV.cal = NJ_Cal;
NJRRARV.mode = "16";
NJRRARV.short = "RARV";
NJRRARV.code = "RV";
NJRRARV.transfers = "place-newark";
NJRRARV.stop_ids = ["NJ60", "NJ6", "NJ68", "NJ157", "NJ108", "NJ129", "NJ138", "NJ24", "NJ21", "NJ36", "NJ120", "NJ102", "NJ44", "NJ155", "NJ47", "NJ32", "NJ31", "NJ38105", "NJ107", "NJ63", "NJ38187", "NJ105"];
NJ.addRoute(NJRRARV);

let NJRRVLN = new TRoute("NJRRVLN","RVLN New Jersey Transit Riverline Light Rail");
NJRRVLN.common_name = "NJ Riverline Light Rail";
NJRRVLN.cal = NJ_Cal;
NJRRVLN.mode = "16";
NJRRVLN.short = "RVLN";
NJRRVLN.transfers = "place-trenton,place-pensk";
NJRRVLN.stop_ids = ["NJ38291", "NJ38309", "NJ38292", "NJ38308", "NJ38293", "NJ38307", "NJ38294", "NJ38306", "NJ38295", "NJ43288", "NJ38296", "NJ38305", "NJ38297", "NJ38304", "NJ38298", "NJ38303", "NJ38299", "NJ38302", "NJ38300", "NJ38301", "NJ38301", "NJ38302", "NJ38300", "NJ38303", "NJ38299", "NJ38304", "NJ38298", "NJ38305", "NJ38297", "NJ43288", "NJ38296", "NJ38306", "NJ38295", "NJ38307", "NJ38294", "NJ38308", "NJ38293", "NJ38310", "NJ38309", "NJ38292", "NJ38310"];
NJ.addRoute(NJRRVLN);
