<script setup>
import CategorySelect from '../components/CategorySelect.vue';
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/satellite-min.css';

import { useSongStore } from '../stores/song'
import { storeToRefs } from 'pinia';
import getCollection from '@/db/getCollection'

const searchClient = algoliasearch(
    'ANI8PD12T5',
    "b7bc84937f5ff914b760b3a1763e7c3b"
)
const useSong = useSongStore()
const { isPlaying, currentTrack } = storeToRefs(useSong)

let podcasts = []
await (await getCollection('podcasts'))
.getDocuments().then(res => {
    podcasts = res
}).catch(err => {
    console.log(err)
})
let list = {
    "name": "Diaries Of A Hero",
    "albumCover": "/images/albumCovers/DiariesOfAHero.png",
    "releaseYear": "2023",
    "audio_tracks": podcasts.filter(podcast => podcast.type === 'audio'),
    "video_tracks": podcasts.filter(podcast => podcast.type === 'video')
}

const setCurrentTrack = (item) => {
    const track_tobeset = list.audio_tracks.forEach(track => {
        if (track.name === item.name) {
            useSong.loadSong(list, track)
        }
    })
}
</script>

<template>
    <div class="p-8">
        <ais-instant-search :search-client="searchClient" index-name="flipr">
            <ais-search-box />
            <ais-hits>
                <template v-slot:item="{ item }">
                    <h2 @click="setCurrentTrack(item)">{{ item.name }}</h2>
                </template>
            </ais-hits>
        </ais-instant-search>
        <button
            type="button"
            class="text-white text-2xl font-semibold hover:underline cursor-pointer"
        >
            Browse all
        </button>

        <div class="py-1.5"></div>
        <ais-instant-search :search-client="searchClient" index-name="spotify_clone_songs">
    <ais-search-box />
    <ais-hits>
      <template v-slot:item="{ item }">
        <h2>{{ item.name }}</h2>
      </template>
    </ais-hits>
  </ais-instant-search>

        <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
            <CategorySelect category="Podcasts" image="https://picsum.photos/id/40/300/300"/>
            <CategorySelect category="Audiobooks" image="https://picsum.photos/id/45/300/300"/>
            <CategorySelect category="Made For You" image="https://picsum.photos/id/76/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/56/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/25/300/300"/>
            <CategorySelect category="Podcasts" image="https://picsum.photos/id/103/300/300"/>
            <CategorySelect category="Audiobooks" image="https://picsum.photos/id/244/300/300"/>
            <CategorySelect category="Made For You" image="https://picsum.photos/id/202/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/101/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/120/300/300"/>
            <CategorySelect category="Podcasts" image="https://picsum.photos/id/40/300/300"/>
            <CategorySelect category="Audiobooks" image="https://picsum.photos/id/45/300/300"/>
            <CategorySelect category="Made For You" image="https://picsum.photos/id/76/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/56/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/25/300/300"/>
            <CategorySelect category="Podcasts" image="https://picsum.photos/id/103/300/300"/>
            <CategorySelect category="Audiobooks" image="https://picsum.photos/id/244/300/300"/>
            <CategorySelect category="Made For You" image="https://picsum.photos/id/202/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/101/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/120/300/300"/>
            <CategorySelect category="Podcasts" image="https://picsum.photos/id/40/300/300"/>
            <CategorySelect category="Audiobooks" image="https://picsum.photos/id/45/300/300"/>
            <CategorySelect category="Made For You" image="https://picsum.photos/id/76/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/56/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/25/300/300"/>
            <CategorySelect category="Podcasts" image="https://picsum.photos/id/103/300/300"/>
            <CategorySelect category="Audiobooks" image="https://picsum.photos/id/244/300/300"/>
            <CategorySelect category="Made For You" image="https://picsum.photos/id/202/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/101/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/120/300/300"/>
            <CategorySelect category="Podcasts" image="https://picsum.photos/id/40/300/300"/>
            <CategorySelect category="Audiobooks" image="https://picsum.photos/id/45/300/300"/>
            <CategorySelect category="Made For You" image="https://picsum.photos/id/76/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/56/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/25/300/300"/>
            <CategorySelect category="Podcasts" image="https://picsum.photos/id/103/300/300"/>
            <CategorySelect category="Audiobooks" image="https://picsum.photos/id/244/300/300"/>
            <CategorySelect category="Made For You" image="https://picsum.photos/id/202/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/101/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/120/300/300"/>
        </div>
    </div>
</template>
