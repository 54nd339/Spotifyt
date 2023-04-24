<script setup>
import { ref, toRefs, onMounted } from 'vue'
import Heart from 'vue-material-design-icons/Heart.vue';
import Play from 'vue-material-design-icons/Play.vue';
import Pause from 'vue-material-design-icons/Pause.vue';

import { useVideoStore } from '../stores/'
import { storeToRefs } from 'pinia';
const useVideo = useVideoStore()
const { isVideoPlaying, currentVideoTrack } = storeToRefs(useVideo)

let isHover = ref(false)
let isTrackTime = ref(null)

const props = defineProps({
    track: Object,
    artist: Object,
    index: Number,
})

const { track, artist, index } = toRefs(props)

onMounted(() => {
    const video = document.createElement('video');
    video.src = track.value.url;
    video.addEventListener('loadedmetadata', () => {
        const duration = video.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        isTrackTime.value = minutes+':'+seconds.toString().padStart(2, '0')
    });
})
</script>

<template>
    <li
        class="flex items-center justify-between rounded-md hover:bg-[#2A2929]"
        @mouseenter="isHover = true"
        @mouseleave="isHover = false"
    >
        <div class="flex items-center w-full py-1.5">
            <div v-if="isHover" class="w-[40px] ml-[14px] mr-[6px] cursor-pointer">
                <Play
                    v-if="!isVideoPlaying"
                    fillColor="#FFFFFF"
                    :size="25"
                    @click="useVideo.playOrPauseThisSong(artist, track)"
                />
                <Play
                    v-else-if="isVideoPlaying && currentVideoTrack.name !== track.name"
                    fillColor="#FFFFFF"
                    :size="25"
                    @click="useVideo.loadSong(artist, track)"
                />

                <Pause v-else fillColor="#FFFFFF" :size="25" @click="useVideo.playOrPauseVideo()"/>
            </div>
            <div v-else class="text-white font-semibold w-[40px] ml-5">
                <span :class="{'text-green-500': currentVideoTrack && currentVideoTrack.name === track.name}">
                    {{ index }}
                </span>
            </div>
            <div>
                <div
                    :class="{'text-green-500': currentVideoTrack && currentVideoTrack.name === track.name}"
                    class="text-white font-semibold"
                >
                    {{ track.name }}
                </div>
                <div class="text-sm font-semibold text-gray-400">{{ artist.name }}</div>
            </div>
        </div>
        <div class="flex items-center">
            <button type="button" v-if="isHover">
                <Heart fillColor="#1BD760" :size="22"/>
            </button>
            <div
                v-if="isTrackTime"
                class="text-xs mx-5 text-gray-400"
            >
                {{ isTrackTime }}
            </div>
        </div>
    </li>
</template>
