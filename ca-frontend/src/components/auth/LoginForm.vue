<template>
  <form @submit.prevent="handleSubmit" class="form">
    <!-- 用户名输入框 -->
    <div class="input-group">
      <input
        type="text"
        v-model="formData.username"
        placeholder="Username"
        maxlength="20"
        class="input"
      />
    </div>

    <!-- 密码输入框 -->
    <div class="input-group">
      <input
        type="password"
        v-model="formData.password"
        placeholder="Password"
        maxlength="20"
        class="input"
      />
    </div>

    <!-- 错误提示 -->
    <div v-if="error" class="error-message">{{ error }}</div>

    <!-- 提交按钮 -->
    <button type="submit" class="submit-button">Log in</button>

    <!-- 链接 -->
    <div class="links">
      <a @click.prevent="$emit('forgot-password')" class="link">Forgot password?</a>
      <a @click.prevent="$emit('sign-up')" class="link">Sign up</a>
    </div>
  </form>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

// 使用 defineEmits 定义 emit 事件
const emit = defineEmits(['submit', 'forgot-password', 'sign-up'])

const formData = ref({
  username: '',
  password: '',
})

const error = ref('')

const handleSubmit = () => {
  if (!formData.value.username || !formData.value.password) {
    error.value = 'Please fill in all fields.'
    return
  }

  if (formData.value.password.length < 6) {
    error.value = 'Password must be at least 6 characters long.'
    return
  }

  // 触发提交事件并传递表单数据
  emit('submit', formData.value)
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group {
  position: relative;
}

.input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}

.error-message {
  color: red;
  font-size: 0.875rem;
}

.submit-button {
  padding: 0.75rem;
  background-color: #4cb5ab;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.links {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
}

.link {
  color: #4cb5ab;
  cursor: pointer;
}
</style>
