import Vue from "vue";
import Vuex from "vuex";
import api from "../services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activities: [], // List of activities
  },
  mutations: {
    setActivities(state, activities) {
      state.activities = activities;
    },
    addActivity(state, activity) {
      state.activities.push(activity);
    },
    updateActivity(state, updatedActivity) {
      const index = state.activities.findIndex(
        (a) => a.id === updatedActivity.id
      );
      if (index !== -1) {
        state.activities[index] = updatedActivity;
      }
    },
    deleteActivity(state, activityId) {
      state.activities = state.activities.filter((a) => a.id !== activityId);
    },
  },
  actions: {
    async fetchActivities({ commit }) {
      const activities = await api.getActivities();
      commit("setActivities", activities);
    },
    async addActivity({ commit }, activity) {
      const addedActivity = await api.addActivity(activity);
      commit("addActivity", addedActivity);
    },
    async updateActivity({ commit }, activity) {
      const updatedActivity = await api.updateActivity(activity);
      commit("updateActivity", updatedActivity);
    },
    async deleteActivity({ commit }, activityId) {
      await api.deleteActivity(activityId);
      commit("deleteActivity", activityId);
    },
  },
  getters: {
    allActivities: (state) => state.activities,
  },
});
