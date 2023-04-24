<template>
  <!-- Center the promt with a button for user to login/register -->
  <div class="flex items-center justify-center h-screen">
    <h1 class="text-white text-[30px] font-semibold">
      Please login or register to continue
    </h1><br>
    <button @click="openModal" class="bg-black hover:bg-[#1DB954] rounded-full p-0.5 ml-8 mt-0.5 cursor-pointer">
      <div class="flex items-center">
        <div class="text-white text-[14px] mx-1 font-semibold">
          Login/Register
        </div>
      </div>
    </button>
  </div>
</template>
<script setup>
const openModal = () => {
  const elem = document.getElementById("loginbtn");
  elem.click();
}
</script>

<style>

</style>