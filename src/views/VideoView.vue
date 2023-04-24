<template>
  <video id="my-video" :src=urlref></video>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  videoURL: {
    type: String,
    required: true
  }
})

const { urlref } = ref(props.videoURL)

</script>

<style>

</style>