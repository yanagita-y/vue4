import Vue from 'vue'
import Vuex from 'vuex'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { db } from "../main";
import { runTransaction, setDoc, doc, getDoc, increment } from "firebase/firestore";
import router from '@/router';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null
        // myUID: null
    },
    getters: {
        user: function(state){
          return state.user;
        }
    },
    mutations: {
        setUser: function( state, value ){
            state.user = value;
        },
        updateUser: function( state, value ){
            //サーバからちゃんと持って来て処理しないと怖い・・けどわからないので暫定
            state.user.wallet = state.user.wallet - value;
        }
    },
    actions: {
        sendAuth: function({commit},{userName, userMailaddress, userPassword}){
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, userMailaddress, userPassword)
            .then((response) => {
                const user = {
                    name: userName,
                    mailaddress: userMailaddress,
                    wallet: 500
                };
                console.log(response.user.uid);
                const docRef = doc(db ,'users' ,response.user.uid );
                setDoc(docRef, user);
                user.push({"UID": response.user.uid});
                commit('setUser', user);
                console.log("登録成功")
            })
            .catch(() => {
                console.log("登録失敗")
            });
        },
        signIn:function({commit}, {userMailaddress, userPassword}){
            const auth = getAuth();
            signInWithEmailAndPassword(auth, userMailaddress, userPassword)
            .then((response) => {
                const getFireStoreData = async function(){                    
                    const docRef = doc(db, "users", response.user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        console.log("Document data:", docSnap.data());
                        const user={...docSnap.data(), 'UID':response.user.uid};
                        commit('setUser', user);
                    } else {
                        console.log("No such document!");
                    }
                    //ダッシュボードに移動
                    router.push('/dashboard');
                };
                getFireStoreData(response.user.uid);
            })
            .catch(() => {
            });
        },
        signOut:function({commit}){
            const auth = getAuth();
            signOut(auth).then(() => {
                // Sign-out successful.
                commit('setUser', null);
                router.push('/');
            }).catch((error) => {
                console.log(error);
                // An error happened.
            });
        },
        updateWallet:async function({commit},{getValue, toUID}){
            try {
                await runTransaction(db, async (transaction) => {
                    const sfDocRef = doc(db, "users", this.getters.user.UID);
                    const sfDoc = await transaction.get(sfDocRef);
                    const toDocRef = doc(db, "users", toUID);
                    const toDoc = await transaction.get(toDocRef);
                    if (!sfDoc.exists() || !toDoc.exists ) {
                        throw "Document does not exist!";
                    }
                    transaction.update(sfDocRef, {wallet: increment(-getValue)});
                    transaction.update(toDocRef, {wallet: increment(getValue)});
                });
                console.log("Transaction successfully committed!");
                commit('updateUser', getValue);
            } catch (e) {
                console.log("Transaction failed: ", e);
            }
        }
    }
})
