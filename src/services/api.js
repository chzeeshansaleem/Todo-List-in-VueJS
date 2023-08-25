import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/",
});

export default {
  async getActivities() {
    const response = await instance.get("/activities");
    return response.data;
  },
  async addActivity(activity) {
    const response = await instance.post("/activities", activity);
    return response.data;
  },
  async updateActivity(activity) {
    const response = await instance.put(`/activities/${activity.id}`, activity);
    return response.data;
  },
  async deleteActivity(activityId) {
    await instance.delete(`/activities/${activityId}`);
  },
};
