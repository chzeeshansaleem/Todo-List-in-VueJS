<template>
    <div>
      <h1>Todo List Soft Square</h1>
      <input
      class="neumorphic-input"
      v-model="newActivity"
      @keyup.enter="addActivity"
      placeholder="Enter an activity"
    />
    <button class="neumorphic-button" @click="addActivity">Add Activity</button>

    <div v-if="activities.length > 0">
      <h2>Activities:</h2>
      <ul>
        <li v-for="(activity, index) in activities" :key="index">
          <input type="checkbox" v-model="activity.completed" />
          <span :class="{ 'completed': activity.completed }" class="neumorphic-activity">
            {{ activity.text }}
          </span>
          <button class="neumorphic-button" @click="deleteActivity(index)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
  </template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      newActivity: "",
      activities: [],
    };
  },
  created() {
    this.loadActivitiesFromStorage();
  },
  beforeUnmount() {
    this.saveActivitiesToStorage();
  },
  computed: {
    ...mapGetters(['allActivities']),
  },
  methods: {
    ...mapActions(['fetchActivities', 'addActivity', 'updateActivity', 'deleteActivity']),
    addActivity() {
      if (this.newActivity.trim() !== "") {
        this.activities.push({ text: this.newActivity, completed: false });
        this.newActivity = ""; // Clear the input field
        this.saveActivitiesToStorage();
      }
    },
    deleteActivity(index) {
      this.activities.splice(index, 1);
      this.saveActivitiesToStorage();
    },
    loadActivitiesFromStorage() {
      const storedActivities = localStorage.getItem("activities");
      if (storedActivities) {
        this.activities = JSON.parse(storedActivities);
      }
    },
    saveActivitiesToStorage() {
      localStorage.setItem("activities", JSON.stringify(this.activities));
    },
  },
};
</script>

<style scoped>
.completed {
  color: #999;
  text-decoration: line-through;
}
.btn{
    margin-left: 10px;
}
li{
    list-style: none;
}
.neumorphic-input,
.neumorphic-button {
  border: none;
  background-color: #f0f0f0;
  box-shadow: 3px 3px 5px rgba(163, 177, 198, 0.6), -3px -3px 5px rgba(255, 255, 255, 0.5);
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  transition: box-shadow 0.3s ease-in-out;
}

.neumorphic-input:focus,
.neumorphic-button:focus {
  box-shadow: 2px 2px 5px rgba(163, 177, 198, 0.6), -2px -2px 5px rgba(255, 255, 255, 0.5);
}
.neumorphic-activity {
  display: inline-block;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 10px;
  box-shadow: 3px 3px 5px rgba(163, 177, 198, 0.6), -3px -3px 5px rgba(255, 255, 255, 0.5);
  transition: box-shadow 0.3s ease-in-out;
}

.neumorphic-activity.completed {
  text-decoration: line-through;
  color: #999;
}
</style>
