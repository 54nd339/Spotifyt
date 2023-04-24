<script setup>
import { ref, watch, onMounted } from 'vue'
import PlayerVolume from './PlayerVolume.vue'
import Heart from 'vue-material-design-icons/Heart.vue';
import PictureInPictureBottomRight from 'vue-material-design-icons/PictureInPictureBottomRight.vue';
import Play from 'vue-material-design-icons/Play.vue';
import Pause from 'vue-material-design-icons/Pause.vue';
import SkipBackward from 'vue-material-design-icons/SkipBackward.vue';
import SkipForward from 'vue-material-design-icons/SkipForward.vue';

import { useVideoStore } from '../stores/'
import { storeToRefs } from 'pinia';
const useSong = useVideoStore()
const { isVideoPlaying, video, currentList, currentVideoTrack } = storeToRefs(useSong)

let isHover = ref(false)
let isTrackTimeCurrent = ref(null)
let isTrackTimeTotal = ref(null)
let seeker = ref(null)
let seekerContainer = ref(null)
let range = ref(0)

onMounted(() => {

    if (video.value) {
        setTimeout(() => {
            timeupdate()
            loadmetadata()
        }, 300)
    }

    if (currentVideoTrack.value) { 
        seeker.value.addEventListener("change", () => {
            const time = video.value.duration * (seeker.value.value / 100);
            video.value.currentTime = time;
        });

        seeker.value.addEventListener("mousedown", () => {
            video.value.pause();
            isVideoPlaying.value = false
        });

        seeker.value.addEventListener("mouseup", () => {
            video.value.play();
            isVideoPlaying.value = true
        });

        seekerContainer.value.addEventListener("click", (e) => {
            const clickPosition = (e.pageX - seekerContainer.value.offsetLeft) / seekerContainer.value.offsetWidth;
            const time = video.value.duration * clickPosition;
            video.value.currentTime = time;
            seeker.value.value = (100 / video.value.duration) * video.value.currentTime;
        });
    }
})

const timeupdate = () => {
    video.value.addEventListener("timeupdate", () => {
        var minutes = Math.floor(video.value.currentTime / 60);
        var seconds = Math.floor(video.value.currentTime - minutes * 60);
        isTrackTimeCurrent.value = minutes+':'+seconds.toString().padStart(2, '0')
        const value = (100 / video.value.duration) * video.value.currentTime;
        range.value = value
        seeker.value.value = value;
    });
}

const loadmetadata = () => {
    video.value.addEventListener('loadedmetadata', () => {
        const duration = video.value.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        isTrackTimeTotal.value = minutes+':'+seconds.toString().padStart(2, '0')
    });
}

watch(() => video.value, () => {
    timeupdate()
    loadmetadata()
})

watch(() => isTrackTimeCurrent.value, (time) => {
    if (time && time == isTrackTimeTotal.value) {
        useSong.nextSong(currentVideoTrack.value)
    }
})

</script>

<template>
    <div
        id="MusicPlayer"
        v-if="video"
        class="
            fixed
            flex
            items-center
            justify-between
            bottom-0
            w-full
            z-50
            h-[90px]
            bg-[#181818]
            border-t
            border-t-[#272727]
        "
    >
        <div class="flex items-center w-1/4">
            <div class="flex items-center ml-4">
                <img class="rounded-sm shadow-2xl" width="55" :src="currentList.albumCover">
                <div class="ml-4">
                    <div class="text-[14px] text-white hover:underline cursor-pointer">
                        {{ currentVideoTrack.name }}
                    </div>
                    <div class="text-[11px] text-gray-500 hover:underline hover:text-white cursor-pointer">
                        {{ currentList.name }}
                    </div>
                </div>
            </div>
            <div class="flex items-center ml-8">
                <Heart fillColor="#1BD760" :size="20" />
                <PictureInPictureBottomRight class="ml-4" fillColor="#FFFFFF" :size="18" />
            </div>
        </div>

        <div class="max-w-[35%] mx-auto w-2/4 mb-3">
            <div class="flex-col items-center justify-center">
                <div class="buttons flex items-center justify-center h-[30px]">
                    <button class="mx-2">
                        <SkipBackward fillColor="#FFFFFF" :size="25" @click="useSong.prevSong(currentVideoTrack)"/>
                    </button>
                    <button class="p-1 rounded-full mx-3 bg-white" @click="useSong.playOrPauseThisSong(currentList, currentVideoTrack)">
                        <Play v-if="!isVideoPlaying" fillColor="#181818" :size="25" />
                        <Pause v-else fillColor="#181818" :size="25" />
                    </button>
                    <button class="mx-2">
                        <SkipForward fillColor="#FFFFFF" :size="25" @click="useSong.nextSong(currentVideoTrack)"/>
                    </button>
                </div>


                <div class="flex items-center h-[25px]">
                    <div v-if="isTrackTimeCurrent" class="text-white text-[12px] pr-2 pt-[11px]">{{ isTrackTimeCurrent }}</div>
                    <div
                        ref="seekerContainer"
                        class="w-full relative mt-2 mb-3"
                        @mouseenter="isHover = true"
                        @mouseleave="isHover = false"
                    >
                        <input
                            v-model="range"
                            ref="seeker"
                            type="range"
                            class="
                                absolute
                                rounded-full
                                my-2
                                w-full
                                h-0
                                z-40
                                appearance-none
                                bg-opacity-100
                                focus:outline-none
                                accent-white
                            "
                            :class="{ 'rangeDotHidden': !isHover }"
                        >
                        <div
                            class="pointer-events-none mt-[6px] absolute h-[4px] z-10 inset-y-0 left-0 w-0"
                            :style="`width: ${range}%;`"
                            :class="isHover ? 'bg-green-500' : 'bg-white'"
                        />
                        <div class="absolute h-[4px] z-[-0] mt-[6px] inset-y-0 left-0 w-full bg-gray-500 rounded-full" />

                    </div>
                    <div v-if="isTrackTimeTotal" class="text-white text-[12px] pl-2 pt-[11px]">{{ isTrackTimeTotal }}</div>
                </div>
            </div>
        </div>

        <div class="flex items-center w-1/4 justify-end pr-10">
            <PlayerVolume />
        </div>
    </div>
</template>

<style>
.rangeDotHidden[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0;
    height: 0;
}
</style>
