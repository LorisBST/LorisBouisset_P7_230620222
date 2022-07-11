import { createStore } from "vuex"
import { useStorage } from "@vueuse/core"

export const mainStore = createStore({
    state: { userId: useStorage("userId", "") },
    getters: {
        getUserId(state) {
            return state.userId
        }
    },
    mutations: {
        setUserId(state, payload) {
            state.userId = payload
        },
        clearUserId(state) {
            state.userId = ""
        }
    },
})

