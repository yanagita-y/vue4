<template>
  <div class="signup">
    <h1>{{this.$store.getters.user.name}}さんようこそ！！</h1>
    <h1>残高は{{this.$store.getters.user.wallet}}です。</h1>
  </div>
</template>

<!-- <script>
  export default {
    data(){
      return {
        name: '',
        mailaddress: '',
        password: '',
        flag: false
      }
    },
    // computed: {
    //   const newTasks = this.$store.getters.Tasks;
    // },
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
</script> -->
