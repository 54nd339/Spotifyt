<script setup>
import { ref, onMounted } from 'vue'
import SongRow from '../components/SongRow.vue'
import VideoRow from '../components/VideoRow.vue'
import Play from 'vue-material-design-icons/Play.vue';
import Pause from 'vue-material-design-icons/Pause.vue';
import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue';
import Heart from 'vue-material-design-icons/Heart.vue';
import ClockTimeThreeOutline from 'vue-material-design-icons/ClockTimeThreeOutline.vue';
// import artist from '../songList.json'

import { useSongStore } from '../stores/'
import { storeToRefs } from 'pinia';
const useSong = useSongStore()
const { isPlaying, currentTrack, currentList } = storeToRefs(useSong)

const playFunc = () => {
    if (currentTrack.value) {
        useSong.playOrPauseThisSong(currentList.value, currentTrack.value)
        return
    } 
    useSong.playFromFirst()
}

import getCollection from '@/db/getCollection'
const podcasts = ref([])
const loadData = async () => {
    await (await getCollection('podcasts'))
    .getDocuments().then(res => {
        podcasts.value = res
        // filter ref
    }).catch(err => {
        console.log(err)
    })
}
const artist = ref({
    "name": "Diaries Of A Hero",
    "albumCover": "/images/albumCovers/DiariesOfAHero.png",
    "releaseYear": "0",
    "audio_tracks": [],
    "video_tracks": []
})

loadData().then(() => {
    artist.value = {
        "name": "Diaries Of A Hero",
        "albumCover": "/images/albumCovers/DiariesOfAHero.png",
        "releaseYear": "2023",
        "audio_tracks": podcasts.value.filter(podcast => podcast.type === 'audio'),
        "video_tracks": podcasts.value.filter(podcast => podcast.type === 'video')
    }
}).catch(err => {
    console.log(err)
})

</script>

<template>
    <div class="p-8 overflow-x-hidden">
        <button
            type="button"
            class="text-white text-2xl font-semibold hover:underline cursor-pointer"
        >
            {{ artist.name }}
        </button>

        <div class="py-1.5"></div>
        <div class="flex items-center w-full relative h-full">
            <img width="140" :src="artist.albumCover">

            <div class="w-full ml-5">

                <div
                    style="font-size: 33px;"
                    class="text-white absolute w-full hover:underline cursor-pointer top-0 font-bosemiboldld"
                >
                    {{ artist.name }}
                </div>

                <div class="text-gray-300 text-[13px] flex">
                    <div class="flex">Album</div>
                    <div class="ml-2 flex">
                        <div class="circle mt-2 mr-2" />
                        <span class="-ml-0.5">{{ artist.releaseYear }}</span>
                    </div>
                    <div class="ml-2 flex">
                        <div class="circle mt-2 mr-2" />
                        <span class="-ml-0.5">{{ artist.audio_tracks.length }} songs</span>
                    </div>
                    <div class="ml-2 flex">
                        <div class="circle mt-2 mr-2" />
                        <span class="-ml-0.5">{{ artist.video_tracks.length }} videos</span>
                    </div>
                </div>

                <div class="absolute flex gap-4 items-center justify-start bottom-0 mb-1.5">
                    <button class="p-1 rounded-full bg-white" @click="playFunc()">
                        <Play v-if="!isPlaying" fillColor="#181818" :size="25"/>
                        <Pause v-else fillColor="#181818" :size="25"/>
                    </button>
                    <button type="button">
                        <Heart fillColor="#1BD760" :size="30"/>
                    </button>
                    <button type="button">
                        <DotsHorizontal fillColor="#FFFFFF" :size="25"/>
                    </button>
                </div>
            </div>
        </div>

        <div class="mt-6"></div>
        <div class="flex items-center justify-between px-5 pt-2">
            <div class="flex items-center justify-between text-gray-400">
                <div class="mr-7">#</div>
                <div class="text-sm">Title</div>
            </div>
            <div><ClockTimeThreeOutline fillColor="#FFFFFF" :size="18"/></div>
        </div>
        <div class="border-b border-b-[#2A2A2A] mt-2"></div>
        <div class="mb-4"></div>
        <h1 class="text-white text-xl font-semibold">Songs</h1>
        <ul class="w-full" v-for="track, index in artist.audio_tracks" :key="track">
            <SongRow :artist="artist" :track="track" :index="++index"/>
        </ul>
        <div class="mb-4"></div>
        <h1 class="text-white text-xl font-semibold">Videos</h1>
        <ul class="w-full" v-for="track, index in artist.video_tracks" :key="track">
            <VideoRow :artist="artist" :track="track" :index="++index"/>
        </ul>
    </div>
</template>

<style scoped>
    .circle {
        width: 4px;
        height: 4px;
        background-color: rgb(189, 189, 189);
        border-radius: 100%;
    }
</style>
