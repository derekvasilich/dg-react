import { http, getHeaders } from "@/services/http-common";

const query = `{ 
    allVehicles { 
        id 
        vin 
        name 
        price 
    } 
}`

const queryWithDescriptions = `{ 
    allVehicles { 
        id 
        vin 
        name 
        price 
        description { 
            id 
            description 
        } 
    } 
}`

class VehicleDataService {
  getAll() {
//    return http.get("/vehicles/all", {
    return http.post("/graphql", { query }, {
        headers: getHeaders()
    });
  }

  get(id) {
    return http.get(`/vehicles/${id}`, {
        headers: getHeaders()
    });
  }

  create(data) {
    return http.post("/vehicles", data, {
        headers: getHeaders()
    });
  }

  update(id, data) {
    return http.put(`/vehicles/${id}`, data, {
        headers: getHeaders()
    });
  }

  delete(id) {
    return http.delete(`/vehicles/${id}`, {
        headers: getHeaders()
    });
  }
}

const vehicleDataServiceInstance = new VehicleDataService();
export default vehicleDataServiceInstance