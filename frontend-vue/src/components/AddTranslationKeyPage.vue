<template>
  <div>
    <h1>Add Translation Key</h1>
    <select v-model="selectedApp">
      <option v-for="app in applications" :key="app" :value="app">{{ app }}</option>
    </select>
    <input v-model="key" placeholder="Enter translation key" />
    <input v-model="value" placeholder="Enter translation value" />
    <button @click="addTranslationKey">Add Translation Key</button>
    <button @click="navigateToApplications">Back to Applications</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  
  name: 'AddTranslationKeyPage',
  data() {
    return {
      applications: [],
      selectedApp: '',
      key: '',
      value: ''
    };
  },
  created() {
    this.fetchApplications();
  },
  methods: {
    async fetchApplications() {
      try {
        const response = await axios.get('http://localhost:3001/api/applications');
        this.applications = response.data;
        if (this.applications.length > 0) {
          this.selectedApp = this.applications[0];
        }
      } 
      catch (error) {
        console.error('Error fetching applications:', error);
      }
    },
    async addTranslationKey() {

      try {
        await axios.post(`http://localhost:3001/api/applications/keys/${this.selectedApp}`, {
          key: this.key,
          value: this.value
        });
        this.key = '';
        this.value = '';
      } 
      catch (error) {
        console.error('Error adding translation key:', error);
      }
    },
    navigateToApplications() {
      this.$router.push('/');
    }
  }
};
</script>
