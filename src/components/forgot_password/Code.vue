<template>
  <div class="hold-transition login-page">
    <div class="login-box">
      <div class="card card-outline card-primary">
        <div class="card-header text-center">
          <h2><b>Forgot Password</b></h2>
        </div>
        <div class="card-body">
          <p class="login-box-msg">Enter your code which you was received.</p>
          <form @submit.prevent="Code()">
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Enter your code" v-model="code" name="code">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <button type="submit" @click="Code()" class="btn btn-primary btn-block">Submit</button>
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
  name: 'Code',
  data () {
    return {
      datapasswordreset:[],
      code: ''
    }
  },
  methods: {
    Code: function(){
        axios.post('http://127.0.0.1:8000/api/check-code', {'code':this.code})
      .then( (res) => {
          if(res.status == 201){
            alert("Xác thực thành công!");
            this.$router.push("/Change_Pass").catch(()=>{});
          } else {
            alert("Xác thực thất bại!");
          }     
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>