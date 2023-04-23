import { ref } from 'vue'
import { auth } from '@/db/config'
import { createUserWithEmailAndPassword, updateProfile,
        signInWithEmailAndPassword, signOut,
        sendPasswordResetEmail, setPersistence,
        browserSessionPersistence } from 'firebase/auth'

const useAuth = () => {
    const error = ref(null)
    const isPending = ref(false)

    const signup = async (email, password, displayName) => {
        isPending.value = true

        return await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            await updateProfile(userCredential.user, { displayName })
            isPending.value = false
            return userCredential.user
        }).catch((err) => {
            console.log(err.message)
            error.value = 'Could not create account'
            isPending.value = false
        })
    }

    const login = async (email, password) => {
        isPending.value = true

        return await setPersistence(auth, browserSessionPersistence)
        .then(async() => {
            return await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                isPending.value = false
                return userCredential.user
            }).catch((err) => {
                console.log(err.message)
                error.value = 'Incorrect login credentials'
                isPending.value = false
            }) 
        }).catch((err) => {
            console.log(err.message)
            error.value = 'Could not log in'
            isPending.value = false
        })
    }

    const logout = async () => {
        isPending.value = true

        return await signOut(auth).then(() => {
            isPending.value = false
        }).catch((err) => {
            console.log(err.message)
            error.value = err.message
            isPending.value = false
        })
    }

    const passwordReset = async (email) => {
        isPending.value = true

        return await sendPasswordResetEmail(auth, email)
        .then(() => {
            isPending.value = false
        }).catch((err) => {
            console.log(err.message)
            error.value = 'Could not reset password'
            isPending.value = false
        })
    }
    return { error, signup, login, logout, passwordReset, isPending }
}

export default useAuth