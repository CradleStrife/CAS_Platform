<template>
  <div class="login-page">
    <!-- 背景 -->
    <div class="login-background"></div>

    <!-- 登录面板 -->
    <div class="login-panel">
      <h1 class="login-title">Log in</h1>
      <form @submit.prevent="handleLogin">
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
        <div class="input-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" class="submit-button">Log in</button>
      </form>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <div class="links">
        <span class="link" @click="handleForgotPassword">Forgot Password?</span>
        <span class="link" @click="handleSignUp">Sign Up</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"; // Vue 的响应式变量
import { useRouter } from "vue-router"; // 引入路由实例
import axios from "axios"; // 引入 axios

const router = useRouter(); // 创建路由实例

// 定义表单数据和错误信息
const formData = ref({
  username: "",
  password: "",
});
const errorMessage = ref("");

// 登录处理函数
const handleLogin = async () => {
  try {
    // 调用后端 API 进行登录验证
    const response = await axios.post("http://127.0.0.1:5000/api/login", {
      username: formData.value.username,
      password: formData.value.password,
    });

    if (response.data.message === "Login successful!") {
      console.log("Login successful");
      sessionStorage.setItem("username", formData.value.username); // 保存登录状态
      router.push("/home"); // 跳转到主页
    } else {
      errorMessage.value = response.data.message; // 显示后端返回的错误信息
    }
  } catch (error) {
    // 捕获错误并处理
    if (error.response && error.response.data) {
      errorMessage.value = error.response.data.message; // 后端返回的错误信息
    } else {
      errorMessage.value = "Unable to connect to the server."; // 连接失败
    }
  }
};

// 忘记密码处理函数
const handleForgotPassword = () => {
  router.push('/forgot-password');
  console.log("Forgot password clicked");
};

// 跳转到注册页面
const handleSignUp = () => {
  router.push("/register");
};
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
  color: #0e0a0a;
}

.input-group {
  margin-bottom: 20px;
}

.input-group input {
  width: 100%;
  height: 50px;
  padding: 10px;
  background-color: #f8fafb;
  border: 1px solid #050404;
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

.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
}
</style>
