import addDocument from "./addDocument"
import { ref } from "vue"

export default async function test() {
    const course = ['ICSE', 'CBSE', 'CHSE']

    course.forEach(async (item) => {
        for(let i = 5; i <= 12; i++) {
            (await addDocument('schedule'))
            .addDocument(item+'_'+i, {
                mon: {periods: ['default', 'default', 'default'], start: 4, end: 7},
                tue: {periods: ['default', 'default', 'default'], start: 4, end: 7},
                wed: {periods: ['default', 'default', 'default'], start: 4, end: 7},
                thu: {periods: ['default', 'default', 'default'], start: 4, end: 7},
                fri: {periods: ['default', 'default', 'default'], start: 4, end: 7},
                sat: {periods: ['default', 'default', 'default'], start: 4, end: 7},
            }).then((res) => console.log(res))
        }
    })
}