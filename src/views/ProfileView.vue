<template>
  <!-- Spotify type UI using tailwind for editing profile and uploading songs -->
  <div class="bg-gray-900 min-h-screen">
    <div class="max-w-3xl mx-auto p-4">
      <h1 class="text-4xl font-bold text-white mb-4">Edit Profile</h1>
      <form class="max-w-lg" @submit.prevent="onSubmit" >
        <div class="mb-4">
          <label class="block text-gray-500 font-bold mb-2" for="name">Name</label>
          <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            id="name" type="text" v-model="name"
          >
        </div>
        <div class="mb-4">
          <label class="block text-gray-500 font-bold mb-2" for="email">Email</label>
          <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            id="email" type="email" v-model="email"
          >
        </div>
        <div class="mb-4">
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit" @click="resetPassword"
          >
            Reset Password
          </button>
        </div>
        <div class="mb-4">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit" @click="updateProfile"
          >
            Save Changes
          </button>
        </div>
        <div class="text-red-500 text-center mb-4" v-if="updateError">
          {{ updateError }}
        </div>
      </form>
    </div>
    <div class="max-w-3xl mx-auto p-4">
      <h1 class="text-4xl font-bold text-white mb-4">Upload Song</h1>
      <form class="max-w-lg" @submit.prevent="onSubmit">
        <div class="mb-4">
          <label class="block text-gray-500 font-bold mb-2" for="name">Name</label>
          <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            id="name" type="text" v-model="songname" required
          >
        </div>
        <div class="mb-4">
          <label class="block text-gray-500 font-bold mb-2" for="artist">Artist</label>
          <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            id="artist" type="text" v-model="artist" required
          >
        </div>
        <div class="mb-4">
          <label class="block text-gray-500 font-bold mb-2" for="album">Album</label>
          <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            id="album" type="text" v-model="album" required
          >
        </div>
        <div class="mb-4">
          <label class="block text-gray-500 font-bold mb-2" for="genre">Genre</label>
          <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            id="genre" type="text" v-model="genre" required
          >
        </div>
        <div class="mb-4">
          <label class="block text-gray-500 font-bold mb-2" for="year">Year</label>
          <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            id="year" type="text" v-model="year" required
          >
        </div>
        <div class="mb-4">
          <label class="block text-gray-500 font-bold mb-2" for="file">File</label>
          <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            id="file" type="file" :name="file1" @change="onFileChange" required
          >
        </div>
        <div class="mb-4">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit" @click="uploadSong"
          >
            {{ UploadText }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import addCollection from '@/db/addDocument'
import getCollection from '@/db/getCollection'
import useAuth from '@/db/useAuth'
import useDocument from '@/db/useDocument'
import useStorage from '@/db/useStorage'
import { auth } from '@/db/config'

const user = ref({
  displayName: '',
  email: '',
  uid: ''
})
const currentUser = ref(auth.currentUser ? auth.currentUser : null)
if(currentUser) {
  user.value.displayName = currentUser.value.displayName
  user.value.uid = currentUser.value.uid
}

const name = ref(user.value.displayName)
const id = ref(user.value.uid)

auth.onAuthStateChanged((user) => {
  if (user) {
    name.value = user.displayName
    id.value = user.uid
  }
})

const email = ref('')
const doc = ref(null)

const loadData = async() => await (await useDocument('users', id.value))
.getDetail().then((res) => {
  email.value = res.email
  doc.value = res
}).then(() => {
  // console.log(doc.value)
}).catch((err) => {
  console.log(err)
})

const updateError = ref(false)
const updateProfile = async() => {
  if(!name.value.trim()) {
    updateError.value = 'Name is required'
    return
  }
  if(!email.value.trim()) {
    updateError.value = 'Email is required'
    return
  }

  await (await useDocument('users', id.value)).updateDocs({
    name: name.value,
    email: email.value
  }).then(() => {
    console.log('success')
    updateError.value = false
  }).catch((err) => {
    console.log(err)
    updateError.value = err.message
  })
}

const resetPassword = async() => {
  await (await useAuth()).resetPassword(email.value).then(() => {
    updateError.value = false
  }).catch((err) => {
    updateError.value = err.message
  })
}

const songname = ref('')
const artist = ref('')
const album = ref('')
const genre = ref('')
const year = ref('')
const file1 = ref(null)
const onFileChange = (e) => {
  file1.value = e.target.files[0]
}
const UploadText = ref('Upload')

const uploadSong = async() => {
  let file = file1.value
  let path = `songs/${file.name}`
  UploadText.value = 'Uploading...'

  await useStorage().uploadFile(file, path)
  .then(async(fileRef) => {
    if(fileRef) {
      console.log(fileRef)
      const newSong = {
        name: songname.value,
        artist: artist.value,
        album: album.value,
        genre: genre.value,
        year: year.value,
        url: fileRef.url,
        path: fileRef.snapshot.metadata.fullPath,
        date: fileRef.snapshot.metadata.timeCreated
      }

      await (await addCollection('podcasts')).addDocument('', newSong).then((uid) => {
        songname.value = ''
        artist.value = ''
        album.value = ''
        genre.value = ''
        year.value = ''
        file1.value = null
        UploadText.value = 'Upload'
      }).catch((err) => {
        console.log(err)
      })
    }
    else
      console.log('File not uploaded')
  }).catch((err) => {
    console.log(err)
  })
}

loadData()
</script>

<style>

</style>