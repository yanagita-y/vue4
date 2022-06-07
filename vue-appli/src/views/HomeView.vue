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
        if(this.name && this.mailaddress && this.password){
          console.log("legs");
          this.$store.dispatch('sendAuth', { userName: this.name, userMailaddress: this.mailaddress, userPassword: this.password });
        }
      }
    }
  }
</script>