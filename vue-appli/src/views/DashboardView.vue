<template>
  <div class="signup">
    <h1>{{this.$store.getters.user.name}}さんようこそ！！</h1>
    <h1>残高は{{this.$store.getters.user.wallet}}です。</h1>
    <button @click="logOut">ログアウト</button>
  </div>
</template>

<script>
import router from '@/router';

export default {
  data(){
    return {
      name: '',
      mailaddress: '',
      password: '',
      flag: false
    }
  },
  created: function(){
    if(!this.$store.getters.user){
      console.log(this.$store.getters.user);
      router.push('/');
    }
  },
  methods: {
    logOut: function () {
      this.$store.dispatch('signOut');
    }
  }
}
</script>
