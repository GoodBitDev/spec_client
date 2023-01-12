import instance from "shared/config/instance";

export const MapApi = {
  getMapPoints: (token: string) => {
    return instance.get("/api/v1/events/graph/regions")
  },
  getP: () => {
    return instance.get("/api/v1/events/graph/regions")
  },
  getFilters: () => {
    return instance.get("/api/v1/events/filters/")
  }
}
