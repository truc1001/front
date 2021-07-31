<template>
    <div class="container">   
    <div class="card">
        <div class="card-header">
          <h3 class="card-title">Thông tin nghỉ phép đã duyệt</h3>

          <div class="card-tools">
            <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
              <i class="fas fa-minus"></i>
            </button>
            <button type="button" class="btn btn-tool" data-card-widget="remove" title="Remove">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="card-body p-0 table-responsive">
          <table class="table table-striped table-hover projects" id="tbldata">
              <thead>
                  <tr>
                      <th>
                          STT
                      </th>
                      <th>
                          Tên nhân viên
                      </th>
                      <th>
                          Ngày xin phép
                      </th>
                      <th>
                          Số ngày nghỉ
                      </th>
                      <th>
                          Lý do nghỉ
                      </th>
                      <th>
                          Người duyệt
                      </th>
                       <th>
                          Ngày duyệt
                      </th>
                      <th>Trạng Thái
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(data, i) in dataDayOff" :key="i">
                      <td v-text="i+1">
                      </td>
                      <td>
                        {{data.name_user}}
                      </td>
                      <td>
                        {{data.start_off}}
                      </td>
                      <td>
                        {{data.num_off}}
                      </td>
                      <td >
                        {{data.off_reason}}
                      </td>
                     <td>
                        {{data.name_admin}}
                     </td>
                    <td>{{data.approved_at}}</td>
                    <td><span class="badge badge-success">Đã duyệt</span></td>
                  </tr>
              </tbody>
          </table>
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->
    </div>
</template>

<script>
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'jquery/dist/jquery.min.js';

//Datatable Modules
// import "../../../plugins/datatables/jquery.dataTables.js"
// import "../../../plugins/datatables/jquery.dataTables.min.js" 
  const axios = require('axios');
export default ({
   data() {
    return{
      dataDayOff: [],
    }
    },

  mounted(){
    this.checklogin();
  },

  methods:{
    checklogin: function(){
      axios.get('http://127.0.0.1:8000/api/approved/',{
      })
      .then(response => {
         this.dataDayOff = response.data;
        //  $('#tbldata').DataTable();
      })
      .catch(() => {
        console.log('Yêu cầu đã xảy ra lỗi');
      })
    },

  }

})
</script>

<style></style>