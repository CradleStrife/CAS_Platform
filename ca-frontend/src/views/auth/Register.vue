<template>
  <div class="register-page">
    <RegisterForm />
    <!-- 添加测试按钮 -->
    <button @click="testNavigation" class="test-button">
      Test Navigation
    </button>
  </div>
</template>

<script>
import RegisterForm from '@/components/auth/RegisterForm.vue';

export default {
  components: {
    RegisterForm,
  },
  methods: {
    testNavigation() {
      console.log('Testing navigation...');
      this.$router.push('/register/success')
        .then(() => {
          console.log('Test navigation successful');
        })
        .catch((error) => {
          console.error('Test navigation failed:', error);
        });
    }
  }
};
</script>

<style scoped>
.register-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #eaf7f6; 
}

.test-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.test-button:hover {
  background-color: #ff5252;
}
</style>