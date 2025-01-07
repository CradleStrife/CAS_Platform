<template>
  <div class="success-container">
    <div class="success-card">
      <h1>Success!</h1>
      <button @click="$router.push('/login')">Go to log in</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterSuccess',
};
</script>

<style scoped>
.success-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #36d1dc, #5b86e5);
}

.success-card {
  background-color: #f8f6fc;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 350px;
}

h1 {
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
}

button {
  width: 100%;
  padding: 12px;
  background: linear-gradient(to right, #36d1dc, #5b86e5);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background: linear-gradient(to right, #5b86e5, #36d1dc);
}
</style>
