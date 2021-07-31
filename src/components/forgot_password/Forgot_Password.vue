<template>
  <div class="hold-transition login-page">
    <div class="login-box">
      <div class="card card-outline card-primary">
        <div class="card-header text-center">
          <h2><b>Forgot Password</b></h2>
        </div>
        <div class="card-body">
          <p class="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>
          <form @submit.prevent="forgot()">
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Enter your email" v-model="password_resets.email" name="email">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <button type="submit" @click="forgot()" class="btn btn-primary btn-block">Submit</button>
              </div>
              <!-- /.col -->
            </div>
          </form>       
        </div>
        <!-- /.login-card-body -->
      </div>
    </div>
    <!-- /.login-box -->
  </div>
</template>

<script>
const axios = require('axios');
//import Code from '@/components/forgot_password/Code.vue';
export default {
  name: 'Forgot_Password',
  data () {
    return {
      datapasswordreset:[],
      password_resets:{
        email: '',
      }
    }
  },

  methods: {
    forgot: function(){        
      axios.post('http://127.0.0.1:8000/api/forget-password', this.password_resets)
      .then( () => {
        console.log(this.password_resets.email)
        localStorage.setItem('email', this.password_resets.email )
        
        alert("Code đã gửi đến mail của bạn. Vui lòng check mail nhé!");
        this.$router.push("/Code").catch(()=>{});
      })
      .catch( () => {
        console.log("lỗi rồi!");
      }); 
    },
    created_fp () {
      const userInfoMail = localStorage.getItem('email')
      if (userInfoMail) {
        const userData = JSON.parse(userInfoMail) 
        this.$store.commit('setUserDataMail', userData)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>