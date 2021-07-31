<template>
<!-- // Le_Van_Son -->
    <div class="container">
     <div class="card">
     <div class="card-header">
          <!-- <h1 class="card-title">Báo cáo</h1>--> 
              </div>
        <div class="row">
          <div class="">
          <!-- <h1>Báo Cáo Tổng hợp</h1> -->
          <h2 id="tieude">Báo cáo tổng hợp</h2>
            <div class="form-group">
             &ensp;<label for=""> Xuất bảng báo cáo ra tập tin Excel </label>&ensp; 
              <!-- <button @click="click_Dowload()" class="btn btn-warning">Download</button> -->
              <button class="btn btn-success btn-sm" @click="getExcel(dataReport)"><i class="fas fa-arrow-down"></i> Export</button>
             
            </div>
             <div class="table-responsive">
            <table class="table table-striped table-hover" border="0" style="text-align: center;">
              <thead>
                <tr>
                  <!-- <form action="" method="" @submit.prevent="getReport()"> -->
                    <td colspan="3">
                      <div class="form-group">
                        <label for="begin"> Ngày bắt đầu: </label>&ensp; 
                        <input @change.prevent="thongbao1()" v-model="dataInput.DayBegin" type="date" value="" id="begin" name="DayBegin">
                        <br>
                        <p id="thongbao1">Ngày bắt đầu chưa hợp lệ! Xin chọn lại</p>
                      </div>
                    </td>
                    <td colspan="3">
                      <div class="form-group">
                        <label for="end"> Ngày kết thúc: </label>&ensp; 
                        <input @change.prevent="thongbao2()"  v-model="dataInput.DayEnd" type="date" value="" id="end" name="DayEnd">    
                        <br>
                        <p id="thongbao2">Ngày kết thúc chưa hợp lệ! Xin chọn lại</p>
                      </div>
                    </td>
                    <td colspan="2">
                      <div style="display: inline; text-align: center;">
                        <button @click="click_reset()" class="btn btn-warning"><i class="fas fa-sync-alt"></i> Reset</button>
                          &ensp; 
                        <button @click="click_submit()" class="btn btn-primary"><i class="fab fa-sistrix"></i> Search</button>
                      </div>   
                    </td>
                  <!-- </form> -->
                </tr>
                
                <tr>
                  <th rowspan="2">#</th>
                  <th rowspan="2">Tên Nhân Viên</th>
                  <th rowspan="2">Tổng Số Giờ Làm Việc</th>
                  <th colspan="4">Tổng Hợp Số Giờ Làm Thêm</th>
                  <th rowspan="2">Tổng Số Ngày Nghỉ Phép</th>
                </tr>
                <tr>                
                  <th scope="col">Ngày Thường</th>
                  <th scope="col">Thứ 7</th>
                  <th scope="col">Chủ Nhật</th>
                  <th scope="col">Tổng</th>
                </tr>
              </thead>
              <tbody>

                <tr v-for="(data, i) in dataReport" :key="i">
                  <th scope="row" v-text="i+1"></th>
                  <td>{{data.name}}</td>

                  <td v-if="data.TongGio">{{data.TongGio}}</td>
                  <td  v-else>0</td>
                  
                  <td v-if="data.sumT">{{(data.sumT - data.sumT7 - data.sumCN)}}</td>
                  <td  v-else>0</td>

                  <td  v-if="data.sumT7">{{data.sumT7}}</td>
                  <td  v-else>0</td>
                  
                  <td v-if="data.sumCN">{{data.sumCN}}</td>
                  <td  v-else>0</td>
                  
                  <td v-if="data.sumT">{{data.sumT}}</td>
                  <td  v-else>0</td>

                  <td v-if="data.sumOff">{{data.sumOff}}</td>
                  <td  v-else>0</td>
                 
                </tr>
                
              </tbody>
            </table>
             </div>
          </div>
        </div>
     </div>
    </div>
</template>

<style>
  h2{
    text-align: center;
  }
  #thongbao1, #thongbao2{
    color: red;
    text-align: center;
    display: none;
  }
#tieude{ 
  color: red;
    }
</style>

<script>

const axios = require('axios');
// const FileDownload = require('js-file-download');

export default ({
  data() {
    return{
      dataReport: [],  
      dataInput:{
        DayBegin: '',
        DayEnd: '',
      },    
      errors: {}
    }
  },

  mounted(){
    var newDate = new Date();
    this.dataInput.DayEnd = newDate.toISOString().slice(0, 10);
    this.dataInput.DayBegin = new Date( newDate.setDate(1)).toISOString().slice(0, 10);      
    this.checklogin();

  },

  methods:{
    checklogin: function(){
      axios.post('http://127.0.0.1:8000/api/getReport',
        this.dataInput
      )
      .then( response => {
        this.dataReport = response.data;    
         console.log(this.dataReport);

      })
      .catch( error => {
        console.log(error);
      })
    },

    click_reset: function(){
      window.location.reload();
    },

    click_submit: function(){
      if((this.dataInput.DayEnd >= this.dataInput.DayBegin ) && (this.dataInput.DayEnd <= new Date().toISOString().slice(0, 10))){
        
        axios.post('http://127.0.0.1:8000/api/getReport',
            this.dataInput
          )
        .then( (response) => {
          this.dataReport = response.data;
          // console.log(this.dataReport);      
        })
        .catch( () => {
          console.log("lỗi rồi!");
        });
      }
      else {
        alert('Chọn ngày chưa hợp lý');
      }

    },
 
// Export table ---- TRUC
 
    getExcel(res) {
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/excel/Export2Excel.js");
        const tHeader = ["Tên Nhân Viên","Tổng Số Giờ Làm Việc","Tổng Số Giờ OT Vào Ngày thường ","Tổng Số Giờ OT Vào Ngày Thứ 7 ","Tổng Số Giờ OT Vào Ngày Chủ Nhật","Tổng Số Giờ OT","Tổng Số Ngày Nghỉ Phép"];
        const filterVal = ["name","TongGio","sumNT","sumT7","sumCN","sumT","sumOff"];
        const list = res;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "Excel_Report");
      });
      },
        
    formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
    },

    thongbao1: function(){
      if(this.dataInput.DayEnd >= this.dataInput.DayBegin){
        document.getElementById('thongbao1').style.display = 'none';
      }
      else{
        document.getElementById('thongbao1').style.display = 'inline';
      }
    },

    thongbao2: function(){
      if((this.dataInput.DayEnd >= this.dataInput.DayBegin) && (this.dataInput.DayEnd <= new Date().toISOString().slice(0, 10))){
        document.getElementById('thongbao2').style.display = 'none';
      }
      else{
        document.getElementById('thongbao2').style.display = 'inline';
      }
    }


  // click_Dowload: function(){
    //     axios.post('http://127.0.0.1:8000/api/ExportExcel',
    //           this.dataReport
    //       )
    //       .then( ($r) => {
    //           alert('download file thành công!!!');
    //           console.log($r.data);
              
    //           FileDownload($r.data, 'report.csv');
    //       })
    //       .catch( () => {
    //         console.log("lỗi rồi!");
    //       });
    //   },
    
  }

})
</script>
