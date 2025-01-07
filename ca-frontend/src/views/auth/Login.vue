<template>
  <div class="login-page">
    <!-- 背景 -->
    <div class="login-background"></div>

    <!-- 登录面板 -->
    <div class="login-panel">
      <h1 class="login-title">Log in</h1>
      <LoginForm @submit="handleLogin" @forgot-password="handleForgotPassword" @sign-up="handleSignUp" />
    </div>
  </div>
</template>

<script setup>
import LoginForm from '@/components/auth/LoginForm.vue'
import { useRouter } from 'vue-router' // 引入 useRouter

const router = useRouter() // 创建路由实例

const handleLogin = (formData) => {
  if (formData.username === 'user' && formData.password === 'password123') {
    console.log('Login successful')
    router.push('/home') // 跳转到首页
  } else {
    alert('Invalid username or password')
  }
}

const handleForgotPassword = () => {
  console.log('Forgot password clicked')
}

const handleSignUp = () => {
  router.push('/register') // 跳转到注册页面
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  background-color: #ffffff;
}

.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ffffff;
  position: relative;
}

.login-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background-color: #4cb5ab;
  z-index: 1;
}

.login-panel {
  background: #f8fafb;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 400px;
}

.login-title {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.input-group {
  margin-bottom: 20px;
}

.input-group input {
  width: 100%;
  height: 50px;
  padding: 10px;
  background-color: #f8fafb;
  border: 1px solid #dcdcdc;
  border-radius: 25px;
  outline: none;
  transition: border-color 0.3s ease;
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
  justify-content: space-between;
  margin-top: 10px;
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
}
</style>
