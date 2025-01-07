<template>
    <div class="welcome">
      <h1>Welcome to the Application</h1>
      <p>Select a menu item to get started.</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "Welcome",
  };
  </script>
  
  <style scoped>
  .welcome {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
    background-color: #f5f5f5;
  }
  
  h1 {
    color: #45485e;
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  p {
    color: #6e7189;
    font-size: 18px;
  }
  </style>
  