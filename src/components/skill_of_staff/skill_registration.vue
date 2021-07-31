<template>
    <!-- // Le_Van_Son -->
  <div class="container">
    <div class="row">
       <div class="">
          <h1> Đăng ký kỹ năng </h1>
          <form action="" method="" @submit.prevent="create()">
              <div class="mess">
                  Thêm đầy đủ thông tin bên dưới!
              </div>
              <hr style="color: green;">
              <input :value="user.id" id="id_user" class="form-control" type="text" name="id_user" readonly style="display:none">
              <div class="form-group">
                  <label for="username">Tên Nhân Viên</label>
                  <input :value="user.name" id="username" class="form-control" type="text" name="username" readonly> 
              </div>
              <div class="form-group">
                  <label for="sdt">SĐT Nhân Viên</label>
                  <input :value="user.phone_number" class="form-control" type="text" readonly>
              </div>
              <div class="form-group">
                  <label for="email">Email Nhân Viên</label>
                  <input :value="user.email"  class="form-control" type="text" readonly>
              </div>              

            <div class="form-group">
              <label for="programming_skills">Kỹ Năng Lập Trình</label> <br>
              <select class="custom-select" @change="onchangeSelect($event)">
                  <option selected>Chọn...</option>
                  <option v-for="(dataPS, i) in PS" :value="dataPS.id" :key="i" >{{dataPS.namePS}}</option>
              </select>
              <div class="form-check">
                <table>
                  <tr v-for="(dataPS, i) in PS" :key="i" :id="dataPS.id" style="display:none">
                    <td>
                      <input @change="onChangeCheckbox($event)" class="form-check-input" type="checkbox" name="SkillLT" v-model="skillForm.programming_skills" :id="dataPS.namePS+dataPS.id" :value="dataPS.namePS">
                      <label class="form-check-label" for=""> {{dataPS.namePS}} </label> &emsp;&emsp;
                    </td>
                    <td :id="dataPS.namePS+dataPS.id+'radio'" >
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
      user:[],
      skillForm:{
        id_user:'',
        programming_skills:[], 
        level: {},      
        language_skills:[],
        degree: '',
      },
      PS:[],
      LS:[],
      
    }
  },

  mounted(){
    this.checklogin();
  },
  
  methods:{
    checklogin: function(){
        this.user = JSON.parse(localStorage.getItem('user')).user;
        this.skillForm.id_user = this.user.id;
        axios.get('http://127.0.0.1:8000/api/createSkill', { params: { id_user: this.user.id } })
        .then( (res) => {
            
            if((res.data[0].id_user == this.user.id)){              
              console.log('id: ',res.data[0].id);
              alert('Bạn đã đăng ký, vui lòng cập nhật lại thông tin nếu cần!');  
              window.location.href = 'http://localhost:8080/editSkill/'+res.data[0].id;
            }
            else{
              this.PS = res.data[0];
              this.LS = res.data[1];
            }
        })
        .catch( () => {
          console.log("lỗi rồi!");
        });
           
    },

    create: function(){      
      // console.log('DL SKILL = ',this.skillForm);
      // console.log('sdcs :',(this.skillForm.level));
      axios.post('http://127.0.0.1:8000/api/storeSkill',
               this.skillForm
        )
        .then( (res) => {
            console.log('thnhcong :', res.data);
            alert('Đã Lưu Thành Công');
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
      var temp = $event.target.id;
      var mangTemp = document.getElementsByClassName('mucdo'+$event.target.value);
      if(document.getElementById(temp).checked == true){
        document.getElementById(temp+'radio').style.display = 'table-row'; 
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


  }

})
</script>


