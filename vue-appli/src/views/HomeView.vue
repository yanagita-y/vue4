<template>
  <div class="signup">
    <h1 v-if="flag" >新規登録画面</h1>
    <h1 v-else>ログイン画面</h1>
    <table>
        <tr v-if="flag">
          <td>ユーザー名：</td><td><input type="txt" v-model="name"></td>
        </tr>
        <tr>
          <td>メールアドレス：</td><td><input type="email" v-model="mailaddress"></td>
        </tr>
        <tr>
          <td>パスワード：</td><td><input type="password" v-model="password"></td>
        </tr>
      </table>
      <template v-if="!flag">
        <button class="button is-primary" @click="login">ログイン</button>
        <p @click="toggleFlag">新規登録はこちらから</p>
      </template>
      <template v-else>
        <button @click="signs">新規登録</button>
        <p @click="toggleFlag">ログインはこちらから</p>
      </template>
      <!-- <router-link to="/">ログインはこちらから</router-link> -->
  </div>
</template>

<script>
  export default {
    data(){
      return {
        name: '',
        mailaddress: '',
        password: '',
        flag: false
      }
    },
    methods: {
      signs: function () {
        if(this.name && this.mailaddress && this.password){
          this.$store.dispatch('sendAuth', { userName: this.name, userMailaddress: this.mailaddress, userPassword: this.password });
        }
      },
      toggleFlag: function () {
        this.flag = !this.flag;
      },
      login: function () {
        this.$store.dispatch('signIn', { userMailaddress: this.mailaddress, userPassword: this.password });
      }
    }
  }
</script>