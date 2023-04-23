import { ref } from 'vue'
import { db } from '@/db/config'
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore'

const useDocument = async (collectionId, docId) => {
    let error = ref(null)
    let isPending = ref(false)
    let docRef = doc(db, collectionId, docId)

    const getDetail = async () => {
        return await getDoc(docRef).then((doc) => {
            if (doc.exists()) {
                return { ...doc.data(), id: doc.id }
            } else {
                error.value = 'Document does not exist'
            }
        }).catch((err) => {
            console.log(err.message)
            error.value = 'Could not fetch data'
        })
    }

    const delDoc = async () => {
        isPending.value = true

        return await deleteDoc(docRef).then(() => {
            isPending.value = false
        }).catch((err) => {
            console.log(err.message)
            error.value = 'Could not delete document'
            isPending.value = false
        })
    }

    const updateDocs = async (updates) => {
        isPending.value = true
        
        return await updateDoc(docRef, updates).then(() => {
            isPending.value = false
        }).catch((err) => {
            console.log(err.message)
            error.value = 'Could not update document'
            isPending.value = false
        })
    }

    return { error, getDetail, delDoc, updateDocs, isPending }
}

export default useDocument