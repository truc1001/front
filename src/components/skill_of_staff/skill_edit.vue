<template>
    <!-- // Le_Van_Son -->
  <div class="container">
    <div class="row">
       <div class="">
          <h1> Cập nhật kỹ năng </h1>
          <form action="" method="" @submit.prevent="update()">
              <div class="mess">
                  Thêm đầy đủ thông tin bên dưới!
              </div>

              <hr style="color: green;">
              <input :value="skillForm.id_user" id="id_user" class="form-control" type="text" name="id_user" readonly style="display:">
              <div class="form-group">
                  <label for="username">Tên Nhân Viên</label>
                  <input :value="skillForm.name" id="username" class="form-control" type="text" name="username" readonly> 
              </div>
              <div class="form-group">
                  <label for="sdt">SĐT Nhân Viên</label>
                  <input :value="skillForm.phone_number" class="form-control" type="text" readonly>
              </div>
              <div class="form-group">
                  <label for="email">Email Nhân Viên</label>
                  <input :value="skillForm.email"  class="form-control" type="text" readonly>
              </div>              

            <div class="form-group">
              
              <label for="programming_skills">Kỹ Năng Lập Trình</label> &nbsp;
              <a class="btn btn-outline-warning btn-sm" @click="show()" >Show <i class="fas fa-arrow-down"></i></a> <br>
              <select class="custom-select" @change="onchangeSelect($event)">
                  <option selected>Chọn...</option>
                  <option v-for="(dataPS, i) in PS" :value="'tr'+dataPS.namePS" :key="i" >{{dataPS.namePS}}</option>
              </select>
          
              <div class="form-check">
                <table>
                  <tr v-for="(dataPS, i) in PS" :key="i" :id="'tr'+dataPS.namePS" style="display: none">
                    <td>
                      <input @change="onChangeCheckbox($event)" class="form-check-input" type="checkbox" name="SkillLT" v-model="skillForm.programming_skills" :id="'checkbox'+dataPS.namePS" :value="dataPS.namePS">
                      <label class="form-check-label" for=""> {{dataPS.namePS}} </label> &emsp;&emsp;
                    </td>
                    <td :id="'td'+dataPS.namePS" >
                      <strong> Mức Độ: </strong> &ensp; 
                      <input v-model="skillForm.level[dataPS.namePS]" type="radio" :class="'mucdo'+dataPS.namePS" :name="'mucdo'+dataPS.namePS" value="Có thể code và chỉ người khác" disabled> A                
                      <input v-model="skillForm.level[dataPS.namePS]" type="radio" :class="'mucdo'+dataPS.namePS" :name="'mucdo'+dataPS.namePS" value="Có thể code độc lập" disabled> B                
                      <input v-model="skillForm.level[dataPS.namePS]" type="radio" :class="'mucdo'+dataPS.namePS" :name="'mucdo'+dataPS.namePS" value="Code nhưng cần sự hỗ trợ" disabled> C
                    </td>
                  </tr>
                </table>
              </div>
            </div>

            <div class="form-group">
              <label for="language_skills">Kỹ Năng Ngôn Ngữ</label> <br>
              <div id="SkillNN" class="form-check" v-for="(dataLS, i) in LS" :key="i">
                <input class="form-check-input" type="checkbox" name="SkillNN" v-model="skillForm.language_skills" :id="dataLS.nameLS+dataLS.i" :value="dataLS.nameLS">
                <label class="form-check-label" for=""> {{dataLS.nameLS}} </label> &emsp;&emsp;
              </div>
            </div>

            <div class="form-group">
                <label for="degree">Bằng Cấp Hiện Có</label> <br>
                <p><em>Thêm các bằng cấp hiện có vào đây!</em> <br> <em>Cách thêm như sau: mỗi bằng cấp được phân cách nhau bởi dấu ';'</em></p>
                <textarea v-model="skillForm.degree" name="degree" id="degree" class="form-control" cols="50" rows="5" placeholder="Ví dụ: Bằng tốt nghiệp; Bằng tiếng nhật">
                </textarea>
            </div>

            <br><br>
            <div class="form-group" style="">             
                <strong> ***<u>Chú thích: </u> </strong> <br>
                &emsp; A: <em>Có thể code và chỉ người khác</em> <br>
                &emsp; B: <em>Có thể code độc lập</em> <br>
                &emsp; C: <em>Code nhưng cần sự hỗ trợ</em> <br>              
            </div>              

              <div class="text-center">
                <a href="" @click="click_reset()" class="btn btn-primary">Reset</a>
                <button type="submit" class="btn btn-success">Submit</button>
              </div>
              <br>
          </form>
        </div>
      </div>
  </div>
</template>

<style>
    .btnabc{
        text-align: center;
    }
    #SkillNN{
      display: inline;
    }
        
</style>

<script>

const axios = require('axios');

export default ({
  data() {
    return{
      skillForm:{
        id_user:'',
        name:'',
        phome_number:'',
        email:'',
        programming_skills:[], 
        level: {},      
        language_skills:[],
        degree: '',
      },
      dataResult:'',
      PS:[],
      LS:[],
      error:{},
    }
  },

  mounted(){
    this.checklogin();
  },
  
  methods:{
    checklogin: function(){
        axios.get('http://127.0.0.1:8000/api/editSkill/'+this.$route.params.id,)
        .then( (res) => {
            this.dataResult = res.data[0];
            this.PS = res.data[1];
            this.LS = res.data[2];
          // Gán DL cho skillForm
            this.skillForm.id_user = this.dataResult[0].id_user;
            this.skillForm.name = this.dataResult[0].name;
            this.skillForm.email = this.dataResult[0].email;
            this.skillForm.phone_number = this.dataResult[0].phone_number;
            this.skillForm.degree = this.dataResult[0].degree;
            this.skillForm.language_skills = this.dataResult[0].language_skills.split(';');
            var temp = this.dataResult[0].programming_skills.split(';');
            for(var i = 0; i < temp.length; i++){
                var mang = temp[i].split('/');
                this.skillForm.programming_skills.push(mang[0]);
                this.skillForm.level[mang[0]] = mang[1];
            }
   
        })
        .catch( error => {
          console.log("lỗi rồi!", error);
        });

    },

    show: function(){
      // Show giá trị ra màn hình
      var mangPS = this.skillForm.programming_skills;
      for(var j = 0; j < mangPS.length; j++){
        document.getElementById('tr'+mangPS[j]).style.display = 'table-row';
        document.getElementById('td'+mangPS[j]).style.display = 'table-row';
        var mangMD = document.getElementsByClassName('mucdo'+mangPS[j])
        for(var z=0 ; z<mangMD.length; z++){
          mangMD[z].disabled = false;
        }
      }
    },

    update: function(){      
      console.log('DL SKILL = ',this.skillForm);
      axios.post('http://127.0.0.1:8000/api/updateSkill/'+this.$route.params.id,
               this.skillForm
        )
        .then( (res) => {
            console.log('thnhcong :', res.data);
            alert('Đã Cập Nhật Thành Công');
            window.location.reload();
        })
        .catch( () => {
          alert('Đã Xảy Ra Lỗi Xin Coi Lại!');
          console.log("lỗi rồi!");
        });

    },

    click_reset: function(){
          window.location.reload();
    },

    onchangeSelect: function($event){
      var id = $event.target.value;
      document.getElementById(id).style.display = 'table-row';      
    },

    onChangeCheckbox: function($event){
      var temp = $event.target.value;
      var mangTemp = document.getElementsByClassName('mucdo'+$event.target.value);
      if(document.getElementById('checkbox'+temp).checked == true)
      {
        document.getElementById('td'+temp).style.display = 'table-row'; 
        mangTemp[0].checked = true;
        this.skillForm.level[$event.target.value] = mangTemp[0].value;  
        for(var i=0 ; i<mangTemp.length; i++) 
        {
          mangTemp[i].disabled = false;
        }        
      }
      else{ 
        this.skillForm.level[$event.target.value] = '';
        for(var j=0 ; j<mangTemp.length; j++) 
        {
          mangTemp[j].disabled = true;
        }
      }
    }


  },


})
</script>


