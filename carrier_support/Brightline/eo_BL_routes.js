// eo_BL_routes.js

var BL1 = new TRoute("BL1","BL1");
BL1.common_name = "Brightline Miami / West Palm Beach / Orlando";
BL1.cal = BL_Cal;
//BL1.stop_ids = ["BL1","BL10","BL7","BL11","BL3","BL12"];
BL1.stop_ids = ["BL_EKW","BL_AVE","BL_FBT","BL_RRN","BL_WPT","BL_MCO"];
addRouteToService(BL1);
