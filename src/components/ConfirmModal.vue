<template>
    <div class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
      <div class="modal-overlay absolute w-full h-full bg-black opacity-50"></div>
  
      <div class="modal-container bg-white w-11/12 md:max-w-2xl mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div class="modal-header border-b border-gray-300 px-6 py-4 flex justify-between items-center">
          <h3 class="text-lg font-bold">Confirm?</h3>
          <button id="close-login-modal" class="modal-close cursor-pointer z-50" @click="$emit('close')">
            <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-1.151-1.152-1.152 1.152c-0.469 0.469-1.229 0.469-1.697 0s-0.469-1.229 0-1.697l1.152-1.152-1.152-1.151c-0.469-0.469-0.469-1.229 0-1.697s1.229-0.469 1.697 0l1.152 1.152 1.151-1.152c0.469-0.469 1.229-0.469 1.697 0s0.469 1.229 0 1.697l-1.152 1.151 1.152 1.152c0.469 0.469 0.469 1.229 0 1.697z" />
            </svg>
          </button>
        </div>
  
        <div class="modal-body px-6 py-4">
					<p class="text-white-700 text-base">
						{{ message }}
					</p>
  
          <div class="text-red-500 text-center mb-4" v-if="error">
            {{ error }}
          </div>
  
          <div class="flex justify-end pt-2">
						<button class="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2" @click="$emit('close')">Cancel</button>
						<button class="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400" @click="$emit('confirm')">Confirm</button>
					</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'

	const message = ref('Are you sure?')
	const error = ref('')
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