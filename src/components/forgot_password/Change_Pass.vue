<template>
  <div class="hold-transition login-page">
    <div class="login-box">
      <div class="card card-outline card-primary">
        <div class="card-header text-center">
          <h2><b>Forgot Password</b></h2>
        </div>
        <div class="card-body">
          <p class="login-box-msg">Enter your new password which you want!</p>
          <form @submit.prevent="Change_Pass">
            <div class="input-group mb-3">
              <input type="password" class="form-control" placeholder="Enter your new password" v-model="password" name="password">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input type="password" class="form-control" placeholder="Enter your password confirm" v-model="password_confirm" name="password_confirm">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <button type="submit" @click="Change_Pass()" class="btn btn-primary btn-block">Update Password</button>
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
export default {
  name: 'Change_Pass',
  data () {
    return {
      password_confirm: '',
      password: ''
    }
  },
  methods: {
    Change_Pass: function(){
      let email = localStorage.getItem('email');
      console.log("email", email);
      axios.post('http://127.0.0.1:8000/api/change-password', {
        password: this.password,
        password_confirm: this.password_confirm,
        email: email
      })
      .then( (res) => {
          if(res.status == 201){
            alert("Change password successfully!");
            this.$router.push({ name: 'Login' }) 
          } else {
            alert("Two passwords are not the same!");
          }     
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>