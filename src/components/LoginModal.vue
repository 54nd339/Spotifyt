<template>
  <div class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
    <div class="modal-overlay absolute w-full h-full bg-black opacity-50"></div>

    <div class="modal-container bg-white w-11/12 md:max-w-2xl mx-auto rounded shadow-lg z-50 overflow-y-auto">
      <div class="modal-header border-b border-gray-300 px-6 py-4 flex justify-between items-center">
        <h3 class="text-lg font-bold">{{ formType === 'login' ? 'Log in' : 'Sign up' }}</h3>
        <button id="close-login-modal" class="modal-close px-2 py-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-200 focus:outline-none focus:shadow-outline" @click="$emit('close')">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10.707 9.293a1 1 0 00-1.414 0L8 10.586 6.707 9.293a1 1 0 10-1.414 1.414L6.586 12l-1.293 1.293a1 1 0 000 1.414 1 1 0 001.414 0L8 13.414l1.293 1.293a1 1 0 001.414-1.414L9.414 12l1.293-1.293a1 1 0 000-1.414z"/>
          </svg>
        </button>
      </div>

      <div class="modal-body px-6 py-4">
        <div class="mb-4" v-if="formType === 'register'">
          <label class="block text-white font-bold mb-2" for="name">
            Name
          </label>
          <input v-model="username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="John Doe">
        </div>

        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="email">
            Email
          </label>
          <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="John@doe.com">
        </div>

        <div class="mb-6">
          <label class="block text-white font-bold mb-2" for="password">
            Password
          </label>
          <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password">
        </div>

        <div class="text-red-500 text-center mb-4" v-if="error">
          {{ error }}
        </div>
        
        <div class="flex items-center justify-between">
          <button @click="handleSubmit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            {{ formType === 'login' ? 'Log in' : 'Sign up' }}
          </button>
          <a class="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800" href="#" @click="toggleForm">
            {{ formType === 'login' ? 'Create an account' : 'Already have an account?' }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue" 
import { useRouter } from "vue-router"
import useAuth from "@/db/useAuth"
import addCollection from "@/db/addDocument"

const router = useRouter()
const emit = defineEmits(['close'])
const username = ref('')
const email = ref('')
const password = ref('')
const formType = ref('login')
const error = ref('')

const handleSubmit = async() => {

  // validate username
  username.value = username.value.trim()
  if (!username.value && formType.value === 'register') {
    error.value = 'Username is required'
    return
  }

  // validate email using regex
  email.value = email.value.trim()
  if (!email.value && formType.value === 'register') {
    error.value = 'Email is required'
    return
  }
  if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && formType.value === 'register') {
    error.value = 'Email is invalid'
    return
  }
  
  // validate password
  password.value = password.value.trim()
  if (!password.value) {
    error.value = 'Password is required'
    return
  }

  if (formType.value === 'login') {
    await useAuth().login(email.value, password.value)
      .then((res) => {
        emit('close', res)
      })
      .catch(err => {
        error.value = err.message
      })
  } else {
    await useAuth().signup(email.value, password.value, username.value)
      .then(async(res) => {
        await (await addCollection('users'))
        .addDocument(res.uid, {
          name: username.value,
          email: email.value,
          createdAt: new Date(),
          favs: [],
          created: []
        }).then(() => {
          emit('close', res)
        }).catch(err => {
          error.value = err.message
        })
      })
      .catch(err => {
        error.value = err.message
      })
  }
}
const toggleForm = () => {
    formType.value = formType.value === 'login' ? 'register' : 'login';
    email.value = '';
    username.value = '';
    password.value = '';
}
</script>
  
<style>
.modal-overlay {
  z-index: 10;
}

.modal-container {
  max-height: 60%;
}

.modal-header {
  background-color: #1DB954;
  color: white;
}

.modal-close {
  background-color: #1DB954;
}

.modal-body {
  background-color: #282828;
}
</style>