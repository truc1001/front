<template>
    <div class="container">
  
<div class="">
    <!-- Content Header (Page header) -->
  
    <!-- Main content -->
    <form class="needs-validation" @submit.prevent="editDayOff();" >
    <section class="content">
      <div class="row">
        <div class="col-md-6">
          <div class="card card-primary">
            <div class="card-header">
              <h2 class="card-title">Chỉnh sửa thông tin nghỉ phép</h2>

              <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
             
                  <i class="fas fa-minus"></i>
                </button>
              </div>
            </div>
            <div class="card-body">
                <input v-model="day_off.user_id" type="text" id="txtUserid" name="user_id" class="form-control" readonly style="display: none">
              <div class="form-group">
                <label for="name">Họ Tên</label>
                <input v-model="day_off.name" type="text" id="txtName" name="name" class="form-control" readonly >
              </div>
             <div class="form-group">
                <label for="email">Email</label>
                <input v-model="day_off.email" type="text" id="txtEmail" name="email" class="form-control" readonly >
              </div>
               <div class="form-group">
                <label for="phone_number">Số điện thoại</label>
                <input v-model="day_off.phone_number" type="text" id="txtSdt" name="phone_number" class="form-control" readonly >
              </div>
              <div class="form-group">
                <label for="start_off">Ngày bắt đầu</label>
                <input v-model="day_off.start_off" @change.prevent="thongbao()" type="date" id="dateStart" name="start_off" class="form-control">
                <p id="thongbao">Ngày bắt đầu chưa hợp lệ! Vui lòng chọn lại.</p>
              </div>
              <div class="form-group">
                <label for="num_off">Thời gian nghỉ (Ngày)</label>
                <input v-model="day_off.num_off" type="number" id="txtNum" name="num_off" class="form-control" min='1' max='14'>
              </div>
              <div class="form-group">
                <label for="off_reason">Lý do nghỉ</label>
                <textarea v-model="day_off.off_reason" id="txtReason" name="off_reason" class="form-control" rows="4"></textarea>
              </div>
              <div class="col-12" style="margin-left:130px;">
                <!-- <a href="#" class="btn btn-secondary">Cancel</a> -->
                <input type="submit" value="Update" class="btn btn-success float-left">&nbsp;
                <button class="btn btn-warning" type="reset">Reset</button>&nbsp;
                <a class="btn btn-danger" href="javascript:history.back()">Cancel</a>
              </div>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.card -->
        </div>
      </div>
      
    </section>
    </form>
    <!-- /.content -->
  </div>
              
    </div>
</template>

<script>
  
    const axios = require('axios');
    export default ({
       data() {
    return{
      id_url:'',
      day_off:{
        user_id: '',
        name:'',
        email:'',
        phone_number:'',
        off_reason:'',
        start_off: '',
        num_off: '',
      },
      errors: {}
    }
  },

  mounted(){
    this.id_url = this.$route.params.id;
    this.checklogin(this.id_url);
  },

  methods:{   
    checklogin: function(id){
      axios.get('http://127.0.0.1:8000/api/dayoff-edit/'+id, {
      })
      .then( response => {
        this.day_off = response.data[0];       
        this.day_off.start_off = response.data[0].start_off.slice(0, 10);

      })
      .catch( errors => {
        console.log(errors);
      })
    },    

    editDayOff: function(){        
      const newDate = new Date().toISOString().slice(0,10);
      if(newDate <= this.day_off.start_off){
        axios.post('http://127.0.0.1:8000/api/dayoff-update/'+this.id_url,
            this.day_off
        )
        .then( () => {
          alert("Đã cập nhật thành công!");
          window.location.reload()

        })
        .catch( errors => {
          console.log("Đã xảy ra lỗi!");
          console.log(errors);
        });
      }
      else{
        alert('Thông tin chỉnh sửa chưa hợp lệ!');
      }
    },
    thongbao: function(){
      const newDate = new Date().toISOString().slice(0,10);
      if(newDate <= this.day_off.start_off){
        document.getElementById('thongbao').style.display = 'none';
      }
      else{
        document.getElementById('thongbao').style.display = 'inline';
      }
    }

  }

    })
</script>
<style>
#thongbao{
    color: red;
    text-align: center;
    display: none;
  }
</style>


