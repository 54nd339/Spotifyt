import { defineStore } from 'pinia'
import list from '../songList.json'

export const useSongStore = defineStore('song', {
  state: () => ({
    isPlaying: false,
    audio: null,
    currentList: null,
    currentTrack: null
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
        this.audio.src = track.path

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
        let track = list.tracks[currentTrack.id - 2]
        this.loadSong(list, track)
    },

    nextSong(currentTrack) {
        if (currentTrack.id === list.tracks.length) {
            let track = list.tracks[0]
            this.loadSong(list, track)
        } else {
            let track = list.tracks[currentTrack.id]
            this.loadSong(list, track)
        }
    },

    playFromFirst() {
        this.resetState()
        let track = list.tracks[0]
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
