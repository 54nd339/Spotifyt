import { defineStore } from 'pinia'
// import list from '../songList.json'

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
    "audio_tracks": podcasts.filter(podcast => podcast.type === 'audio'),
    "video_tracks": podcasts.filter(podcast => podcast.type === 'video')
}

export const useSongStore = defineStore('song', {
  state: () => ({
    isPlaying: false,
    audio: null,
    currentList: null,
    currentTrack: null,
  }),
  actions: {
    loadSong(list, track) {
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

    playOrPauseSong() {
        if (this.audio.paused) {
            this.isPlaying = true
            this.audio.play()
        } else {
            this.isPlaying = false
            this.audio.pause()
        }
    },

    playOrPauseThisSong(list, track) {
        if (!this.audio || !this.audio.src || (this.currentTrack.id !== track.id)) {
            this.loadSong(list, track)
            return
        }

        this.playOrPauseSong()
    },

    prevSong(currentTrack) {
        let index = list.audio_tracks.findIndex(track => track.id === currentTrack.id)
        let track = list.audio_tracks[index - 1]
        this.loadSong(list, track)
    },

    nextSong(currentTrack) {
        let index = list.audio_tracks.findIndex(track => track.id === currentTrack.id)
        if (index === list.audio_tracks.length - 1) {
            let track = list.audio_tracks[0]
            this.loadSong(list, track)
        } else {
            let track = list.audio_tracks[index + 1]
            this.loadSong(list, track)
        }
    },

    playFromFirst() {
        this.resetState()
        let track = list.audio_tracks[0]
        this.loadSong(list, track)
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
