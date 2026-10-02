let Routes = [];

let stops_LAMetro = [];

class Carrier {
    id = null;
    calendar = null;
    routes = [];
    
    constructor(id) {
        this.id = id;
    }
    
    setCalendar(cal) {
        this.calendar = cal;
    }
    
    addRouteToService(r) {
        this.routes.push(r);
        addRouteToService(r);
    }
    
    addRoute(r) {
        this.routes.push(r);
        addRouteToService(r);
    }
    addStops(a) {
        
    }
    
    setStops(a) {
        
    }
   
}

class Carriers {
    static Carriers = [];
    static addCarrier(c) {
        Carriers.Carriers.push(c);
    }
}

