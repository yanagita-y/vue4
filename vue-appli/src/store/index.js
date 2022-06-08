import Vue from 'vue'
import Vuex from 'vuex'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../main";
import { collection,addDoc } from "firebase/firestore";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        users: []
    },
    getters: {
    },
    mutations: {
        setUser: function( state, value){
            state.users.push(value);
        }
    },
    actions: {
        sendAuth: function({commit}, {userName, userMailaddress, userPassword}){
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, userMailaddress, userPassword)
            .then(() => {
                const user = {
                    name: userName,
                    mailaddress: userMailaddress,
                    password: userPassword
                };
                addDoc(collection(db, 'users'), user);
                commit('setUser', user)
            })
            .catch(() => {
            });
        }
    }
})
