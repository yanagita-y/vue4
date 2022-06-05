<template>
  <div class="signup">
    <h1>新規登録画面</h1>
    <table>
        <tr>
          <td>名前：</td><td><input type="txt" v-model="name"></td>
        </tr>
        <tr>
          <td>メールアドレス：</td><td><input type="email" v-model="mailaddress"></td>
        </tr>
        <tr>
          <td>パスワード：</td><td><input type="password" v-model="password"></td>
        </tr>
      </table>
      <button @click="signs">新規登録</button>
      <br>
      <router-link to="/">ログインはこちらから</router-link>
  </div>
</template>

<script>
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import { db } from "../main";
  import { collection,addDoc } from "firebase/firestore";
  export default {
    data(){
      return {
        name: '',
        mailaddress: '',
        password: ''
      }
    },
    methods: {
      signs: function () {
        if(this.name  &&  this.mailaddress && this.password){
          const auth = getAuth();
          createUserWithEmailAndPassword(auth, this.mailaddress, this.password)
          .then(() => {
            alert('登録に成功しました');
        })
          .catch(() => {
            alert('登録に失敗しました');
        });
          addDoc(collection(db, 'users'),{
            name: this.name,
            mailaddress: this.mailaddress,
            password: this.password
          });
        }else{
          alert('入力が足りていません');
        }
      }
    }
  }
</script>