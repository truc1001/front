<template>
    <!-- // Le_Van_Son -->
    <div class="container">
        <h1>Kỹ năng của nhân viên</h1><br>
        <div class="row">

            <div class="col-sm">
                <a href="http://localhost:8080/showdataSkill" class="btn btn-warning">Reset</a>
            </div>

            <div class="col-sm">
                <nav class="navbar navbar-light bg-light">
                    <form class="form-inline" @submit.prevent="getResults()">
                        <input @change="KT()" class="form-control mr-sm-1" type="text" name="keyword" v-model="keyword"
                            placeholder="Search">
                        <button class="btn btn-success my-2 my-sm-0" type="submit">Search</button>
                    </form>                    
                </nav>
                <p id="thongbaoInput">Chưa chọn option để lọc!</p>
            </div>

            <div class="col-sm">
              <nav class="navbar navbar-light bg-light">
                <div class="input-group">
                  
                  <select class="custom-select" id="Skill_Type" @change="onSkill_Type($event)">
                    <option selected>Chọn Loại Skill...</option>
                    <option value="PS">Skill lập trình</option>
                    <option value="LS">Skill ngoại ngữ</option>
                  </select>
                  <select @change="KT()" id="select_skill"  class="custom-select" name="keyword">
                    <option value="" selected>Chọn Skill...</option>
                    <option v-for="(d, i) in temp" :value="d.name" :key="i">{{d.name}}</option>
                  </select>
                  <div class="input-group-append">
                     <button class="btn btn-success" type="button" @click.prevent="Loc()">Lọc</button>
                  </div>
                </div>
              </nav>
              <p id="thongbaoSelect">Chưa chọn option để lọc!</p>
            </div>

                    <div class="table-responsive">
                        <p>Tổng Số Lượng Là: {{dataShow.length}}</p>
                        <table class="table table-hover table-striped" align="center">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên Nhân Viên</th>
                                    <th>Thao tác</th>
                                  
                                </tr>
                            </thead>
                            <tbody v-if="dataShow.length > 0">
                                <tr v-for="(data, i) in dataShow" :key="i">
                                    <td v-text="i+1"> </td>
                                    <td>{{data.name}}</td>
                                    <td>
                                    <button @click.prevent="showDetail(data.id)"  class="btn btn-primary btn-sm" data-toggle="modal"  data-target=".bd-example-modal-lg"><i class="fas fa-eye"></i> Detail </button> &nbsp;
                                    <button href="" class="btn btn-danger btn-sm" @click.prevent="click_detroy(data.id)" ><i class="fas fa-trash"></i> Delete </button>
                            </td>
                          
                        </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <th colspan="5" style="color:red; text-align: center;">Kết quả không tìm thấy</th>
                      </tr>
                    </tbody>
                </table>
            </div>

                      <!-- Modal -->
                                  <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-lg">
                                      <div class="modal-content">
                                        <div class="modal-header">
                                          <h5 class="modal-title" id="myLargeModalLabel">Xem chi tiết</h5>
                                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                          </button>
                                        </div>
                                        <div class="modal-body">
                                          
                                          <div class="table-responsive">
                                        <table class="table table-hover table-striped">
                                            <thead>
                                                <tr>                                                  
                                                    <th>Tên Nhân Viên</th>
                                                    <th>Kỹ Năng Lập Trình</th>
                                                    <th>Kỹ Năng Ngoại Ngữ</th>
                                                    <th>Bằng Cấp</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-if="dataShowModal">
                                                    <td>{{dataShowModal.name}}</td>
                                                    <td>
                                                       <div v-for="(p,i) in dataShowModal.programming_skills.split(';')" :key="i">
                                                            <p>{{i+1}}. {{p.replace('/',' - Mức độ: ')}}</p>
                                                        </div> 
                                                       
                                                       
                                                    </td>
                                                    <td> 
                                                       <div v-for="(l,j) in dataShowModal.language_skills.split(';')" :key="j">
                                                            <p>{{j+1}}. {{l}}</p>
                                                        </div>
                                                        
                                                    </td>
                                                    <td v-if="dataShowModal.degree"> 
                                                       <div v-for="(d,z) in dataShowModal.degree.split(';')" :key="z">
                                                            <p>{{z+1}}. {{d}}</p>
                                                        </div>
                                                       
                                                    </td>
                                                    <td v-else>Chưa Có</td>
                                                </tr>
                                            </tbody>
                                            
                                        </table>
                                    </div>

                                </div>
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                  
                                </div>
                              </div>
                            </div>
                          </div>

        </div>
    </div>
</template>

<style>
  #thongbaoSelect, #thongbaoInput{
    text-align: center;
    color: red;
    display: none;
  }
</style>

<script>
    const axios = require('axios');

    export default ({
        data() {
            return {
                dataShow: [],
                keyword: '',
                dataPS: [],
                dataLS: [],
                temp:[],
                dataShowModal:'',
            }
        },

        mounted() {
              this.checklogin();
        },

        methods: {
            checklogin: function () {
                axios.get('http://127.0.0.1:8000/api/showSkill', {
                })
                    .then(response => {
                        this.dataShow = response.data[0];
                        this.dataPS = response.data[1];
                        this.dataLS = response.data[2];
                    })
                    .catch(() => {
                        console.log('loi roi');
                    })
            },

            getResults: function () {
              if(this.keyword){
                this.KT();
                axios.get('http://127.0.0.1:8000/api/livesearch', { params: { keyword: this.keyword } })
                    .then(res => {
                        this.dataShow = res.data[0];
                        this.dataPS = res.data[1];
                        this.dataLS = res.data[2];
                    })
                    .catch(() => { });
              }
              else{
                document.getElementById('thongbaoInput').style.display = 'block';
              }
            },

            onSkill_Type($event){
                var val = 'op'+$event.target.value;
                if(val == 'opPS'){
                  this.temp = this.dataPS;
                }
                else if(val == 'opLS'){
                  this.temp = this.dataLS;
                }
                  else{
                    this.temp = [];
                  }
                // console.log('x: ',val);
            },

            Loc(){
              var key = document.getElementById('select_skill').value;
              if(key){
                this.KT();
                axios.get('http://127.0.0.1:8000/api/livesearch', { params: { keyword: key } })
                    .then(res => {
                        this.dataShow = res.data[0];
                        this.dataPS = res.data[1];
                        this.dataLS = res.data[2];
                    })
                    .catch(() => { });
                }
                else{
                  document.getElementById('thongbaoSelect').style.display = 'block';
                }            
            },

            KT(){
              document.getElementById('thongbaoSelect').style.display = 'none';
              document.getElementById('thongbaoInput').style.display = 'none';
            },
              showDetail: function (id) {
                for(var i=0; i<this.dataShow.length;i++){
                  if(this.dataShow[i].id==id){
                    this.dataShowModal = (this.dataShow[i]);
                    // console.log('abcxbc:',this.dataShowModal.programming_skills.split(';'));
                  }
                  //  return (this.dataShowModal || "").split(";");
                }
                
            },
            
                click_detroy: function(id){
                    axios.get('http://127.0.0.1:8000/api/getDelete/'+id,{
                        
                    })
                    .then( res => {
                      alert("Đã xóa thành công!");
                      console.log(res.data);
                      window.location.reload();
                    })
                    .catch( () => {
                      console.log('Đã xảy ra lỗi');
                    })
                },

        }

    })
    
</script>