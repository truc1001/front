<template>
<!-- // Le_Van_Son -->
    <div class="container">
        <h1>Quản lý đơn đã duyệt của nhân viên</h1>
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên Nhân Viên</th>
                        <th>Số Giờ</th>
                        <th>Lý Do Làm Thêm</th>
                        <th>Ngày Đăng Ký</th>
                        <th>Người Duyệt</th>
                        <th>Thời Gian Duyệt</th>
                        <th>Trạng Thái</th>
                    </tr>
                </thead>
                <tbody>                    
                    <tr v-for="(data, i) in dataOvertime" :key="i"> 
                        <td v-text="i+1"></td>
                        <td>{{data.name_user}}</td>
                        <td>{{data.number}}</td>
                        <td>{{data.reason}}</td>
                        <td>{{data.ngayDK}}</td>
                        <td>{{data.name_admin}}</td>
                        <td>{{data.approved_time}}</td>
                        <td><span class="badge badge-success">Đã duyệt</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

const axios = require('axios');

export default ({
   data() {
    return{
      dataOvertime: [],
    }
    },

  mounted(){
    this.checklogin();
  },

  methods:{
    checklogin: function(){
      axios.get('http://127.0.0.1:8000/api/getdata1',{
      })
      .then(response => {
        this.dataOvertime = response.data;
      })
      .catch(() => {
        console.log('loi roi');
      })
    },

  }

})
</script>
