<!-- views/auth/ForgotPassword.vue -->
<template>
    <div class="forgot-password-page">
      <div class="forgot-password-background"></div>
      
      <div class="forgot-password-panel">
        <h1 class="panel-title">Forgot Password</h1>
        
        <!-- 步骤 1: 输入用户名 -->
        <form v-if="currentStep === 1" @submit.prevent="checkUsername">
          <div class="input-group">
            <label for="username">Username:</label>
            <input
              type="text"
              id="username"
              v-model="formData.username"
              placeholder="Enter your username"
              required
            />
          </div>
          <button type="submit" class="submit-button">Continue</button>
          <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
        </form>
  
        <!-- 步骤 2: 验证原密码 -->
        <form v-if="currentStep === 2" @submit.prevent="verifyPassword">
          <div class="input-group">
            <label for="oldPassword">Current Password:</label>
            <input
              type="password"
              id="oldPassword"
              v-model="formData.oldPassword"
              placeholder="Enter your current password"
              required
            />
          </div>
          <button type="submit" class="submit-button">Verify</button>
          <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
        </form>
  
        <!-- 步骤 3: 设置新密码 -->
        <form v-if="currentStep === 3" @submit.prevent="updatePassword">
          <div class="input-group">
            <label for="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              v-model="formData.newPassword"
              placeholder="Enter new password"
              required
            />
          </div>
          <div class="input-group">
            <label for="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="formData.confirmPassword"
              placeholder="Confirm new password"
              required
            />
          </div>
          <button type="submit" class="submit-button">Update Password</button>
          <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
          <div v-if="successMessage" class="success">{{ successMessage }}</div>
        </form>
  
        <div class="links">
          <span class="link" @click="goBack">Back to Login</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const router = useRouter();
  
  // 当前步骤：1-输入用户名, 2-验证原密码, 3-设置新密码
  const currentStep = ref(1);
  
  const formData = ref({
    username: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const errorMessage = ref('');
  const successMessage = ref('');
  
  // 第一步：检查用户名是否存在
  const checkUsername = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/check-username', {
        username: formData.value.username
      });
  
      if (response.data.exists) {
        // 用户名存在，进入下一步
        currentStep.value = 2;
        errorMessage.value = '';
      }
    } catch (error) {
      if (error.response && error.response.data) {
        errorMessage.value = error.response.data.message;
      } else {
        errorMessage.value = 'Failed to connect to the server.';
      }
    }
  };
  
  // 第二步：验证原密码
  const verifyPassword = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/verify-password', {
        username: formData.value.username,
        password: formData.value.oldPassword
      });
  
      if (response.data.valid) {
        // 密码正确，进入下一步
        currentStep.value = 3;
        errorMessage.value = '';
      }
    } catch (error) {
      if (error.response && error.response.data) {
        errorMessage.value = error.response.data.message;
      } else {
        errorMessage.value = 'Failed to connect to the server.';
      }
    }
  };
  
  // 第三步：更新密码
  const updatePassword = async () => {
    // 先验证两次输入的密码是否一致
    if (formData.value.newPassword !== formData.value.confirmPassword) {
      errorMessage.value = 'Passwords do not match!';
      return;
    }
  
    // 验证新密码不能与旧密码相同
    if (formData.value.newPassword === formData.value.oldPassword) {
      errorMessage.value = 'New password cannot be the same as current password!';
      return;
    }
  
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/update-password', {
        username: formData.value.username,
        newPassword: formData.value.newPassword
      });
  
      if (response.data.success) {
        successMessage.value = 'Password updated successfully! Redirecting to login...';
        errorMessage.value = '';
        
        // 2秒后跳转到登录页
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        errorMessage.value = error.response.data.message;
      } else {
        errorMessage.value = 'Failed to connect to the server.';
      }
    }
  };
  
  // 返回登录页
  const goBack = () => {
    router.push('/login');
  };
  </script>
  
  <style scoped>
  .forgot-password-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    position: relative;
    background-color: #ffffff;
  }
  
  .forgot-password-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background-color: #4cb5ab;
    z-index: 1;
  }
  
  .forgot-password-panel {
    background: #f8fafb;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 10;
    width: 400px;
    position: relative;
  }
  
  .panel-title {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #333;
  }
  
  .input-group {
    margin-bottom: 20px;
  }
  
  .input-group label {
    display: block;
    margin-bottom: 8px;
    color: #333;
    font-weight: 500;
  }
  
  .input-group input {
    width: 100%;
    height: 50px;
    padding: 10px;
    background-color: #ffffff;
    border: 1px solid #dcdcdc;
    border-radius: 25px;
    outline: none;
    transition: border-color 0.3s ease;
    box-sizing: border-box;
  }
  
  .input-group input:focus {
    border-color: #4cb5ab;
  }
  
  .submit-button {
    height: 50px;
    width: 100%;
    background: linear-gradient(to right, #4cb5ab, #45a89e);
    color: #ffffff;
    font-weight: bold;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: opacity 0.3s ease;
    margin-top: 20px;
  }
  
  .submit-button:hover {
    opacity: 0.9;
  }
  
  .links {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    font-size: 14px;
  }
  
  .link {
    color: #4cb5ab;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.3s ease;
  }
  
  .link:hover {
    color: #45a89e;
    text-decoration: underline;
  }
  
  .error {
    color: #e74c3c;
    font-size: 14px;
    margin-top: 10px;
    text-align: center;
  }
  
  .success {
    color: #27ae60;
    font-size: 14px;
    margin-top: 10px;
    text-align: center;
  }
  </style>