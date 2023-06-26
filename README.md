# Spotifyt

Spotifyt aims to combine the best of Spotify and YouTube into one app. It allows users to search for songs, create playlists, and play music. It also allows users to watch music videos for the songs they are listening to.

## Technologies Used

- [Vue.js](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)

## Features

- Search for songs/videos
- Upload songs/videos
- Interactive music player
- User authentication

## App Setup

1. Create a new Firebase project
2. Enable the following Firebase services:
   - Authentication
   - Cloud Firestore
   - Cloud Storage
   - Hosting
3. Create a new web app
4. Copy the Firebase config object into `src/firebase.js`
5. Clone this repository
```bash
git clone https://github.com/54nd339/Spotifyt.git
```
6. Install dependencies
```bash
npm install
```
7. Run the app
```bash
npm run serve
```
8. Deploy the app
```bash
npm run build
firebase deploy
```
## To-Do

- [ ] Create a video player
- [ ] Enable Playlist functionality
- [ ] Enable Like/Dislike functionality