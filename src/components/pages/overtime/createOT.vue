<template>
<!-- // Le_Van_Son -->
  <div class="container">
    <div class="row">
       <div class="col-6 formOT">
          <h1>Đăng Ký Làm Thêm</h1>
          <form action="" method="" @submit.prevent="createOT()">
              <div class="mess">
                  Điền đầy đủ thông tin bên dưới!
              </div>

              <hr style="color: green;">
              <input v-model="overtime.id_user" id="id_user" class="form-control" type="text" name="id_user" readonly style="display: none"> 
              
              <div class="form-group">
                  <label for="username">Tên Nhân Viên</label>
                  <input v-model="overtime.name" id="username" class="form-control" type="text" name="username" readonly> 
              </div>

              <div class="form-group">
                  <label for="sdt">SĐT Nhân Viên</label>
                  <input v-model="overtime.phone_number" id="sdt" class="form-control" type="text"  name="sdt" readonly>
              </div>

              <div class="form-group">
                  <label for="email">Email Nhân Viên</label>
                  <input v-model="overtime.email" id="email" class="form-control" type="text" name="email" readonly>
              </div>

              <div class="form-group">
                  <label for="ngay">Ngày đăng ký</label>
                  <input @change.prevent="thongbao()" v-model="overtime.ngayDK" id="ngayDK" class="form-control" type="date" name="ngayDK" required>
                  <p id="thongbao">Ngày đăng ký chưa hợp lệ! Xin chọn lại</p>
              </div>

              <div class="form-group">
                  <label for="soh">Số giờ đăng ký</label>
                  <input  v-model="overtime.number" id="soh" class="form-control" type="number" name="number" min='1' max='10' >
              </div>

              <div class="form-group">
                  <label for="lydo">Lý do đăng ký</label> <br>
                  <textarea  v-model="overtime.reason" name="reason" class="form-control" id="lydo" cols="60" rows="5" placeholder="Reason"></textarea>
              </div>

              <div class="btnabc">
                <a href="" @click="click_reset()" class="btn btn-primary">Reset</a>
                <button type="submit" class="btn btn-success">Submit</button>
                <a href="#" class="btn btn-danger">Cancel</a>
              </div>

          </form>
        </div>
      </div>
  </div>
</template>

<style >
  h1{ 
    color: green;
    text-align: center;
  }
  .mess{
    color:red;
    text-align: center;
  }
  .formOT{
    border: green 1px solid;
  }
  .btnabc{
    margin-left: 15%;
  }
  .btnabc button,a{
    margin: 0px 5px 0px 0px;
  }
  #thongbao{
    color: red;
    text-align: center;
    display: none;
  }

</style>

<script>

const axios = require('axios');

export default ({
  data() {
    return{
      overtime:{
        id_user: '',
        name:'',
        email:'',
        phone_number:'',
        reason:'',
        number:'1',
        ngayDK: '',
      },
      errors: {}
    }
  },

  mounted(){
    this.checklogin();
  },
  
  methods:{
    checklogin: function(){
        var a1 = JSON.parse(localStorage.getItem('user'));
        // console.log('a1 = ',a1.user);
        this.overtime.id_user = a1.user.id;
        this.overtime.name = a1.user.name;
        this.overtime.email = a1.user.email;
        this.overtime.phone_number = a1.user.phone_number;
        this.overtime.ngayDK = new Date().toISOString().slice(0, 10);

        // console.log(this.overtime.ngayDK);      
    },
    
    click_reset: function(){
          window.location.reload();
        },

    createOT: function(){   
      const newDate = new Date().toISOString().slice(0, 10);

      if(this.overtime.ngayDK >= newDate){
        axios.post('http://127.0.0.1:8000/api/storeOT',
            this.overtime
          )
        .then( () => {
          alert("Đã đăng ký thành công!");
          window.location.reload();
        })
        .catch( () => {
          console.log("lỗi rồi!");
        });
      }
      else{
        alert('Chọn ngày đăng ký chưa hợp lý! Xin chọn lại');
      }
    },

    thongbao: function(){
      const newDate = new Date().toISOString().slice(0,10);
      if(newDate <= this.overtime.ngayDK){
        document.getElementById('thongbao').style.display = 'none';
      }
      else{
        document.getElementById('thongbao').style.display = 'inline';
      }
    }


  }

})
</script>
