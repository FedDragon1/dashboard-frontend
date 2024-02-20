import { defineStore } from "pinia";

export const useUser = defineStore('userInfo', {
    state: () => ({
        instructor: null,
        admin: null
    }),
    actions: {
        setInstructor(newInstructor) {
            this.instructor = newInstructor;
        },
        setAdmin(newAdmin) {
            this.admin = newAdmin;
        }
    }
})

