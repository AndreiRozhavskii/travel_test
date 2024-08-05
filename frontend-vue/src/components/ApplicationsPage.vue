<template>
  <div>
    <h1>Applications</h1>
    <ul>
      <li v-for="app in applications" :key="app">{{ app }}
        
        <button @click="downloadTranslations(app)">Download XLSX</button>
        <button @click="deployTranslations(app)">Deploy</button>
      </li>
      
    </ul>
    <input v-model="newAppName" placeholder="Enter new application name" />
    <button @click="addApplication">Add Application</button>
    <button @click="navigateToAddTranslationKeyPage">Add Translation Key</button>
  </div>
</template>


<script>

import axios from 'axios';


export default {
  
  name: 'ApplicationsPage',

  data() {
    return {
      applications: [],
      newAppName: '',
      showAddDialog: false
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
      }

       catch (error) {
        console.error('Error fetching applications:', error);
      }
    },

    

    async addApplication() {

      try {
        await axios.post('http://localhost:3001/api/applications', { name: this.newAppName });
        this.newAppName = '';
        this.showAddDialog = false;
        this.fetchApplications();
      } 
      
      catch (error) {
        console.error('Error adding application:', error);
      }
    },

    async downloadTranslations(appName) {

      console.log(appName);

      try {
        const response = await axios.get(`http://localhost:3001/api/applications/translations/${appName}`, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${appName}_translations.xlsx`);
        document.body.appendChild(link);
        link.click();
      }
       catch (error) {
        console.error('Error downloading translations:', error);
      }
    },

    async deployTranslations(appName) {
      
      try {
        await axios.post(`http://localhost:3001/api/applications/deploy/${appName}`);
        alert('Translations deployed');
      } 
      catch (error) {
        console.error('Error deploying translations:', error);
      }
    },

    navigateToAddTranslationKeyPage() {
      this.$router.push('/add-translation-key');
    }
  }
};


</script>

<style>

button {
  margin: 0.5em;
}


</style>
