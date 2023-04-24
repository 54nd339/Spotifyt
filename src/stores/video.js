import { defineStore } from 'pinia'

import getCollection from '@/db/getCollection'
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
    "video_index": podcasts.filter(podcast => podcast.type === 'audio'),
    "video_tracks": podcasts.filter(podcast => podcast.type === 'video')
}

export const useVideoStore = defineStore('song', {
  state: () => ({
    isPlaying: false,
    audio: null,
    currentList: null,
    currentTrack: null,
  }),
  actions: {
    loadVideo(list, track) {
        this.currentList = list
        this.currentTrack = track

        if (this.audio && this.audio.src) {
            this.audio.pause()
            this.isPlaying = false
            this.audio.src = ''
        }

        this.audio = new Audio()
        this.audio.src = track.url

        setTimeout(() => {
            this.isPlaying = true
            this.audio.play()
        }, 200)
    },

    playOrPauseVideo() {
        if (this.audio.paused) {
            this.isPlaying = true
            this.audio.play()
        } else {
            this.isPlaying = false
            this.audio.pause()
        }
    },

    playOrPauseThisVideo(list, track) {
        if (!this.audio || !this.audio.src || (this.currentTrack.id !== track.id)) {
            this.loadVideo(list, track)
            return
        }

        this.playOrPauseVideo()
    },

    prevVideo(currentTrack) {
        let index = list.video_index.findIndex(track => track.id === currentTrack.id)
        let track = list.video_index[index - 1]
        this.loadVideo(list, track)
    },

    nextVideo(currentTrack) {
        let index = list.video_index.findIndex(track => track.id === currentTrack.id)
        if (index === list.video_index.length - 1) {
            let track = list.video_index[0]
            this.loadVideo(list, track)
        } else {
            let track = list.video_index[index + 1]
            this.loadVideo(list, track)
        }
    },

    playFromFirst() {
        this.resetState()
        let track = list.video_index[0]
        this.loadVideo(list, track)
    },

    resetState() {
        this.isPlaying = false
        this.audio = null
        this.currentList = null
        this.currentTrack = null
    }
  },
  persist: true
})
