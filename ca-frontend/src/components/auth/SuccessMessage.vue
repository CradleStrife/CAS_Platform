<template>
    <div class="success-card">
      <h1>Success!</h1>
      <button @click="$router.push('/login')">Go to log in</button>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  .success-card {
    background-color: #f0f0f5;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 400px;
    text-align: center;
  }
  
  button {
    margin-top: 20px;
    padding: 12px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #369d75;
  }
  </style>
  