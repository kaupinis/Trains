

let MN1 = new TRoute("MN1", "MN1");
MN1.common_name = "Metro North Hudson Line";
//MN1.frequency = 30;
MN1.stop_ids = ["Poughkeepsie-NY","MNR_49","MNR_46","MNR_44","MNR_43","MNR_42", "MNR_40", "MNR_39","MNR_37",
"Croton-Harmon-NY","MNR_31","MNR_30","MNR_29","MNR_27","MNR_25","MNR_24", "MNR_23","MNR_22", "MNR_20","MNR_19","Yonkers-NY","MNR_17","MNR_16","MNR_14","MNR_11","MNR_10","MNR_9","MNR_184", "MNR_622", "MNR_4","NewYork-Grand-Central-NY"];
MN1.stop_names = ["Poughkeepsie-NY", "New Hamburg-NY", "Beacon-NY", "Breakneck Ridge-NY","Cold Spring-NY", "Garrison-NY", "Manitou-NY","Peekskill-NY", "Cortlandt-NY", "Croton-Harmon-NY", "Ossining-NY", "Scarborough-NY", "Philipse Manor-NY", "Tarrytown-NY", "Irvington-NY", "Ardsley-on-Hudson-NY", "Dobbs Ferry-NY", "Hastings-on-Hudson-NY", "Greystone-NY", "Glenwood-NY", "Yonkers-NY", "Ludlow-NY", "Riverdale-NY", "Spuyten Duyvil-NY", "Marble Hill-NY", "University Heights-NY", "Morris Heights-NY", "Highbridge Yard","Yankees-E 153rd Street-NY","Harlem-125th St.-NY", "New York-Grand-Central-NY"
];
MNR.addRoute(MN1);



let MN2 = new TRoute("MN2", "MN2");
MN2.common_name = "Metro North Harlem Line";
//MN2.frequency = 30;
MN2.stop_ids = ["MNR_177","MNR_176","MNR_101","MNR_100","MNR_99","MNR_98","MNR_97","MNR_94","MNR_91", "MNR_90","MNR_89","MNR_88","MNR_86","MNR_85","MNR_84","MNR_83","MNR_81","MNR_80", "MNR_79", "MNR_78", "MNR_76","MNR_74","MNR_72","MNR_71","MNR_68","MNR_66","MNR_65","MNR_64","MNR_62","MNR_61", "MNR_59","MNR_58","MNR_57","MNR_56","MNR_55","MNR_54","MNR_4", "NewYork-Grand-Central-NY" ];
MN2.stop_names = [ "Wassaic-NY", "Tenmile River-NY", "Dover Plains-NY", "Harlem Valley-Wingdale-NY", "Appalachian Trail", "Pawling-NY", "Patterson-NY", "Southeast-NY", "Brewster-NY", "Croton Falls-NY", "Purdys-NY", "Goldens Bridge-NY", "Katonah-NY", "Bedford Hills-NY", "Mount Kisco-NY", "Chappaqua-NY", "Pleasantville-NY", "Hawthorne-NY", "Mount Pleasant-NY", "Valhalla-NY", "North White Plains-NY", "White Plains-NY", "Hartsdale-NY", "Scarsdale-NY", "Crestwood-NY", "Tuckahoe-NY", "Bronxville-NY", "Fleetwood-NY", "Mt Vernon West-NY", "Wakefield-NY", "Woodlawn-NY", "Williams Bridge-NY", "Botanical Garden-NY", "Fordham-NY", "Tremont-NY", "Melrose-NY", "Harlem-125th St.-NY", "New York-Grand-Central-NY"
];
MNR.addRoute(MN2);


let MN3 = new TRoute("MN3", "MN3");
MN3.common_name = "Metro North New Haven Line";
//MN3.frequency = 30;
MN3.stop_ids = ["MNR_151","MNR_149","MNR_190","MNR_145","MNR_143","MNR_140","MNR_188","MNR_138", "MNR_137","MNR_136","MNR_134","MNR_133","MNR_131","MNR_129","MNR_128","MNR_127","MNR_124", "MNR_121","MNR_120","MNR_118","MNR_116","MNR_115","MNR_114","MNR_112","MNR_111","MNR_110", "MNR_108","MNR_106","MNR_105","MNR_56","MNR_4","MNR_1"];
MN3.stop_ids = ["NewHaven_StateSt-CT","NewHaven-CT","WestHaven-CT","Milford-CT","Stratford-CT","Bridgeport-CT","MNR_188","MNR_138", "MNR_137","MNR_136","MNR_134","MNR_133","SouthNorwalk-CT","MNR_129","MNR_128","MNR_127","Stamford-CT", "MNR_121","MNR_120","MNR_118","Greenwich-CT","MNR_115","MNR_114","MNR_112","MNR_111","MNR_110", "NewRochelle-NY","MNR_106","MNR_105","MNR_56","MNR_622","MNR_4","NewYork-Grand-Central-NY"];
MN3.stop_names = ["NewHaven_StateSt-CT","NewHaven-CT", "WestHaven-CT", "Milford-CT", "Stratford-CT", "Bridgeport-CT", "Fairfield Metro-CT", "Fairfield-CT", "Southport-CT","Green's Farms-CT","Westport-CT", "East Norwalk-CT", "SouthNorwalk-CT","Rowayton-CT","Darien-CT","Noroton Heights-CT", "Stamford-CT",
"Old Greenwich-CT", "Riverside-CT", "Cos Cob-CT", "Greenwich-CT", "Port Chester-NY",  "Rye-NY", "Harrison-NY", "Mamaroneck-NY", "Larchmont-NY", "NewRochelle-NY", "Pelham-NY", "Mt Vernon East-NY","Fordham-NY","Yankees-E153 St.","Harlem-125th St.-NY","New York-Grand-Central-NY"];
MNR.addRoute(MN3);


let MN4 = new TRoute("MN4", "MN4");
MN4.common_name = "Metro North New Caanan Line";
//MN4.frequency = 60;
MN4.stop_ids = ["MNR_157","MNR_155","MNR_154","MNR_153",
"Stamford-CT", "MNR_121","MNR_120","MNR_118","Greenwich-CT","MNR_115","MNR_114","MNR_112","MNR_111","MNR_110", "NewRochelle-NY","MNR_106","MNR_105","MNR_56","MNR_4","NewYork-Grand-Central-NY"];
MN4.stop_names = ["New Canaan-CT", "Talmadge Hill-CT", "Springdale-CT", "Glenbrook-CT", 
"Stamford-CT", "Old Greenwich-CT", "Riverside-CT", "Cos Cob-CT", "Greenwich-CT", "Port Chester-NY",  "Rye-NY", "Harrison-NY", "Mamaroneck-NY", "Larchmont-NY", "NewRochelle-NY", "Pelham-NY", "Mt Vernon East-NY","Fordham-NY","Harlem-125th St.-NY","New York-Grand-Central-NY"];
MNR.addRoute(MN4);


let MN5 = new TRoute("MN5", "MN5");
MN5.common_name = "Metro North Danbury Line";
//MN5.frequency = 60;
MN5.stop_ids = ["MNR_165","MNR_164","MNR_163","MNR_162","MNR_161","MNR_160","MNR_158",
"SouthNorwalk-CT","MNR_129","MNR_128","MNR_127",
"Stamford-CT", "Greenwich-CT","MNR_4","NewYork-Grand-Central-NY"];
MN5.stop_names = ["Danbury-CT", "Bethel-CT", "Redding-CT", "Branchville-CT", "Cannondale-CT", "Wilton-CT", "Merritt 7-CT",
"SouthNorwalk-CT","Rowayton","Darien","Noroton Heights",
"Stamford-CT","Greenwich-CT","Harlem-125th St.-NY","New York-Grand-Central-NY"
];
MNR.addRoute(MN5);



let MN6 = new TRoute("MN6", "MN6");
MN6.common_name = "Metro North Waterbury Line";
//MN6.frequency = 60;
MN6.stop_ids = ["MNR_172","MNR_171","MNR_170","MNR_169","MNR_168","MNR_167",
"Stratford-CT", "Bridgeport-CT","SouthNorwalk-CT","Stamford-CT", "MNR_4","NewYork-Grand-Central-NY"];
MN6.stop_names = ["Waterbury-CT", "Naugatuck-CT", "Beacon Falls-CT", "Seymour-CT", "Ansonia-CT", "Derby-Shelton-CT",
"Stratford-CT", "Bridgeport-CT", "SouthNorwalk-CT","Stamford-CT","Harlem-125th St.-NY", "New York-Grand-Central-NY"
];
MNR.addRoute(MN6);


