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
    <div v-if="targetWallet" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <section class="modal-card-body">
          <p class="modal-card-title">{{this.targetName}}さんの残高</p>
          <div class="content">
            <h1>{{this.targetWallet}}</h1>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button @click="targetWallet=null" class="button is-link">Close</button>
        </footer>
      </div>
    </div>

    <div v-if="sendFlag" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <section class="modal-card-body">
          <div class="content">
            <p class="modal-card-title">あなたの残高：{{$store.getters.user.wallet}}
              <br>送る金額
            </p>
            <div><input class="input" type="number" v-model.number="sendValue"></div>
             <!-- max="$store.getters.user.wallet" min="0" -->
            <h1>{{this.targetWallet}}</h1>
            <p>&nbsp;<span v-if="errorMessage">{{this.errorMessage}}</span></p>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button @click="sendFlag=false" class="button is-link">Close</button>
          <button v-if="errorMessage||!sendValue" class="button" disabled>送る</button>
          <button v-else class="button" @click='execDollar()'>送る</button>
        </footer>
      </div>
    </div>
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
      sendValue: null,
      errorMessage: null
    }
  },
  watch: {
    sendValue:function(newValue,oldValue){
      console.log(newValue, oldValue);
      if(newValue>this.$store.getters.user.wallet){
        this.errorMessage="所持金以下の金額を入力してください。"        
      }else if(newValue<0){
        this.errorMessage="1以上の金額を入力してください。"
      }else{
        this.errorMessage=null;
      }
      console.log(this.errorMessage);
      // this.sendValue=oldValue;
      // if(newValue>this.$store.getters.user.wallet || newValue<0){
      //   this.sendValue=oldValue;
      // }
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
        this.sendFlag=false;
        this.sendValue=null;
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
