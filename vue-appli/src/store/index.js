import Vue from 'vue'
import Vuex from 'vuex'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../main";
import { collection,addDoc } from "firebase/firestore";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        values: []
    },
    getters: {
    },
    mutations: {
        IDvalue: function( state, IDmutation){
            state.values = IDmutation;
        }
    },
    actions: {
        sendAuth: function({commit}, {userName, userMailaddress, userPassword}){
            console.log("tooth");
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, userMailaddress, userPassword)
            .then(() => {
            })
            .catch(() => {
            });
            const IDdata = {
                name: userName,
                mailaddress: userMailaddress,
                password: userPassword
            };
            addDoc(collection(db, 'users'), IDdata);
            commit('IDvalue', IDdata)
        }
    }
})
