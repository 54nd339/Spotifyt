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
    "audio_tracks": podcasts.filter(podcast => podcast.type === 'audio'),
    "video_tracks": podcasts.filter(podcast => podcast.type === 'video')
}

export const useSongStore = defineStore('song', {
  state: () => ({
    isAudioPlaying: false,
    audio: null,
    currentList: null,
    currentAudioTrack: null,
  }),
  actions: {
    loadSong(list, track) {
        // useVideo.resetState()
        this.currentList = list
        this.currentAudioTrack = track

        if (this.audio && this.audio.src) {
            this.audio.pause()
            this.isAudioPlaying = false
            this.audio.src = ''
        }

        this.audio = new Audio()
        this.audio.src = track.url

        setTimeout(() => {
            this.isAudioPlaying = true
            this.audio.play()
        }, 200)
    },

    playOrPauseSong() {
        if (this.audio.paused) {
            this.isAudioPlaying = true
            this.audio.play()
        } else {
            this.isAudioPlaying = false
            this.audio.pause()
        }
    },

    playOrPauseThisSong(list, track) {
        if (!this.audio || !this.audio.src || (this.currentAudioTrack.id !== track.id)) {
            this.loadSong(list, track)
            return
        }

        this.playOrPauseSong()
    },

    prevSong(currentAudioTrack) {
        let index = list.audio_tracks.findIndex(track => track.id === currentAudioTrack.id)
        let track = list.audio_tracks[index - 1]
        this.loadSong(list, track)
    },

    nextSong(currentAudioTrack) {
        let index = list.audio_tracks.findIndex(track => track.id === currentAudioTrack.id)
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
        this.isAudioPlaying = false
        this.audio = null
        this.currentList = null
        this.currentAudioTrack = null
    }
  },
  persist: true
})

export const useVideoStore = defineStore('song', {
    state: () => ({
      isVideoPlaying: false,
      video: null,
      currentList: null,
      currentVideoTrack: null,
    }),
    actions: {
      loadVideo(list, track) {
          useSongStore().resetState()
          this.currentList = list
          this.currentVideoTrack = track
  
          if (this.video && this.video.src) {
              this.video.pause()
              this.isVideoPlaying = false
              this.video.src = ''
          }
  
          this.video = document.createElement('video')
          this.video.src = track.url
  
          setTimeout(() => {
              this.isVideoPlaying = true
              this.video.play()
          }, 200)
      },
  
      playOrPauseVideo() {
          if (this.video.paused) {
              this.isVideoPlaying = true
              this.video.play()
          } else {
              this.isVideoPlaying = false
              this.video.pause()
          }
      },
  
      playOrPauseThisVideo(list, track) {
          if (!this.video || !this.video.src || (this.currentVideoTrack.id !== track.id)) {
              this.loadVideo(list, track)
              return
          }
  
          this.playOrPauseVideo()
      },
  
      prevVideo(currentVideoTrack) {
          let index = list.video_tracks.findIndex(track => track.id === currentVideoTrack.id)
          let track = list.video_tracks[index - 1]
          this.loadVideo(list, track)
      },
  
      nextVideo(currentVideoTrack) {
          let index = list.video_tracks.findIndex(track => track.id === currentVideoTrack.id)
          if (index === list.video_tracks.length - 1) {
              let track = list.video_tracks[0]
              this.loadVideo(list, track)
          } else {
              let track = list.video_tracks[index + 1]
              this.loadVideo(list, track)
          }
      },
  
      playFromFirst() {
          this.resetState()
          let track = list.video_tracks[0]
          this.loadVideo(list, track)
      },
  
      resetState() {
          this.isVideoPlaying = false
          this.video = null
          this.currentList = null
          this.currentVideoTrack = null
      }
    },
    persist: true
  })
  