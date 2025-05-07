<template>
  <div class="register-container">
    <div class="register-card">
      <p class="back-link" @click="$router.push('/login')">Back</p>
      <h1>Sign Up</h1>
      <div class="form-group">
        <input
          type="text"
          v-model="username"
          placeholder="Username"
          required
        />
        <span class="icon">&#x1F464;</span>
        <span class="clear-icon" v-if="username" @click="username = ''">✖</span>
      </div>
      <div class="form-group">
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
        />
        <span class="icon">&#x1F512;</span>
        <span class="clear-icon" v-if="password" @click="password = ''">✖</span>
      </div>
      <div class="form-group">
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="Password Again"
          required
        />
        <span class="icon">&#x1F512;</span>
        <span
          class="clear-icon"
          v-if="confirmPassword"
          @click="confirmPassword = ''"
        >✖</span>
      </div>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <button @click="handleRegister">Continue</button>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // 引入 Axios 以发送 HTTP 请求

export default {
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
    };
  },
  mounted() {
    console.log("RegisterForm mounted");
    console.log("Current route:", this.$route.path);
    console.log("Router instance:", this.$router);
  },
  methods: {
    async handleRegister() {
      console.log("=== Register Process Started ===");
      
      // 表单验证
      if (!this.username || !this.username.trim()) {
        this.errorMessage = "Username cannot be empty.";
        return;
      }
      if (!this.password || !this.password.trim()) {
        this.errorMessage = "Password cannot be empty.";
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Passwords do not match.";
        return;
      }

      try {
        console.log("Sending data to backend:", {
          username: this.username,
          password: "***",
        });

        // 调用后端 API 完成注册
        const response = await axios.post("http://localhost:5000/api/register", {
          username: this.username.trim(),
          password: this.password.trim(),
        });

        console.log("Full response:", response);
        console.log("Response data:", response.data);
        console.log("Response message:", response.data.message);

        // 注册成功
        if (response.data.message === "User registered successfully!") {
          console.log("Registration successful!");
          // 设置注册状态，解决路由守卫的问题
          sessionStorage.setItem('registered', 'true');
          console.log("Session storage set, registered:", sessionStorage.getItem('registered'));
          console.log("Attempting to navigate to /login");
          
          // 添加一个小延迟以确保路由系统准备就绪
          console.log("Current URL before navigation:", window.location.href);
          console.log("Available routes:", this.$router.getRoutes());
          
          setTimeout(() => {
            console.log("Executing navigation...");
            console.log("Router instance exists:", !!this.$router);
            console.log("Target route exists:", !!this.$router.resolve('/login').route);
            
            // 注册成功后跳转到登录页面
            this.$router.push("/login")
              .then(() => {
                console.log("Navigation successful");
                console.log("Current URL after navigation:", window.location.href);
                console.log("Current route:", this.$route.path);
              })
              .catch((error) => {
                console.error("Navigation error:", error);
                console.log("Trying replace method...");
                this.$router.replace("/login")
                  .then(() => {
                    console.log("Replace successful");
                  })
                  .catch((replaceError) => {
                    console.error("Replace also failed:", replaceError);
                    console.log("Falling back to window.location");
                    window.location.href = "/login";
                  });
              });
          }, 100);
        } else {
          console.log("Unexpected response message:", response.data.message);
          this.errorMessage = "Unexpected response from server";
        }
      } catch (error) {
        // 错误处理
        console.error("Full error object:", error);
        console.error("Error from backend:", error.response ? error.response.data : error.message);
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.message; // 显示后端返回的错误信息
        } else {
          this.errorMessage = "Failed to connect to the server."; // 网络或服务器错误
        }
      }
      
      console.log("=== Register Process Ended ===");
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.register-card {
  background-color: #f8f6fc;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
}

.form-group {
  position: relative;
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px 40px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input:focus {
  outline: none;
  border-color: #42b983;
}

.icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
}

.clear-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #888;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #369d75;
}

.back-link {
  display: block;
  text-align: left;
  color: #3498db;
  margin-bottom: 15px;
  cursor: pointer;
}

.back-link:hover {
  text-decoration: underline;
}

.error-message {
  color: red;
  margin-bottom: 15px;
  font-size: 14px;
}
</style>