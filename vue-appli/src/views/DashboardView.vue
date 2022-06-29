<template>
  <div class="signup">
    <h1>{{$store.getters.user.name}}さんようこそ！！</h1>
    <h1>残高は{{$store.getters.user.wallet}}です。</h1>
    <tr>
      <th>ユーザー名</th>
    </tr>
    <template v-for="userData in listsUp">
      <tr v-if="userData.UID !== $store.getters.user.UID" :key="userData.index">
        <td>{{userData.name}}</td>
        <td><button @click='getWallet(userData.UID)'>walletを見る</button></td>
        <td><button @click='sendDollar(userData.UID)'>送る</button></td>
      </tr>
    </template>
    <button @click="logOut">ログアウト</button>
    <div v-if="targetWallet">{{this.targetName}}さんの残高：{{this.targetWallet}}</div>
    <td v-if="sendFlag"><input type="number" v-model.number="sendValue"></td>
     <!-- max="$store.getters.user.wallet" min="0" -->
    <td v-if="sendFlag"><button @click='execDollar()'>送る</button></td>
  </div>
</template>

<script>
// import router from '@/router';
import { db } from "../main";
import { doc, getDocs, getDoc, collection } from "firebase/firestore";

export default {
  data(){
    return {
      listsUp: [],
      targetWallet: null,
      targetName: null,
      sendFlag: false,
      toTarget: null,
      sendValue: null
    }
  },
  methods: {
    logOut: function () {
      this.$store.dispatch('signOut');
    },
    getWallet: async function (uid) {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.targetWallet = docSnap.data().wallet;
        this.targetName = docSnap.data().name;
      } else {
        console.log('No such document!');
      }
    },
    sendDollar: function (UID) {
      //入力するところを作る
      this.toTarget = UID;
      this.sendFlag = true;
    },
    execDollar: function () {
      //inputbox内に入力された数値を、ログインユーザーの残高から指定ユーザーに送る
      console.log(this.toTarget);
      if(this.sendValue){
        this.$store.dispatch('updateWallet', { getValue: this.sendValue , toUID: this.toTarget});
      }
    },
      //更新する
    updateWallet: async function (uid) {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.targetWallet = docSnap.data().wallet;
        this.targetName = docSnap.data().name;
      } else {
        console.log('No such document!');
      }
    },
},
  created: async function () {
    const querySnapshot = await getDocs(collection(db, 'users'));
    querySnapshot.forEach((doc) => {
      const userData = {
        //スプレッド構文
          ...doc.data(),
          UID: doc.id
        };
      this.listsUp.push(userData);
    });
    console.log(this.listsUp);
  }
}
</script>
