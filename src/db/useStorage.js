import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { storage } from "@/db/config"

const storageRef = ref(storage)
const useStorage = () => {
    const uploadFile = async(file, filePath) => {
        const fileRef = ref(storageRef, filePath) 
        return uploadBytes(fileRef, file).then(async(snapshot) => {
            return getDownloadURL(snapshot.ref).then((url) => {
                return { snapshot, url }
            }).catch((err) => {
                console.log(err.message)
            })
        }).catch((err) => {
            console.log(err.message)
        })
    }
  
    const deleteFile = async(filePath) => {
        const fileRef = ref(storageRef, filePath)
        return deleteObject(fileRef).then(() => {
            return true
        }).catch((error) => {
            console.log(error)
        })
    }

    const downloadFile = async(url, name) => {
        const xhr = new XMLHttpRequest()
        xhr.responseType = 'blob'
        xhr.onload = (event) => {
            const blob = xhr.response
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = name
            link.click()
            link.remove()
        }
        xhr.open('GET', url)
        xhr.send()
    }
    return { uploadFile, deleteFile, downloadFile }
}

export default useStorage