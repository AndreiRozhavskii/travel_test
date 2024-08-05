<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #f4f4f4;
}

#app {
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}


button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5em 1em;
  margin: 0.5em 0;
  cursor: pointer;
  border-radius: 4px;
  font-size: 1em;
}

button:hover {
  background-color: #0056b3;
}


input, select {
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  width: 100%;
  box-sizing: border-box;
}


form {
  max-width: 400px;
  margin: 0 auto;
  text-align: left;
}

form input, form select, form button {
  display: block;
  width: 100%;
  margin-bottom: 1em;
}
</style>
