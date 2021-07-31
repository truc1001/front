<template>
  <div class="body">
    <h1>Create project</h1>
    <div class= "form-check-in">
      <form action="" method="" @submit.prevent="submitproject()">
        <input v-model="projects.id_user" id="id_user" class="form-control" type="text" name="id_user" readonly style="display: none">
        <input v-model="projects.status" id="status" class="form-control" type="text" name="status" readonly style="display: none">
        <div class="form-group">
          <label for="username">Name:</label>
          <input v-model="projects.name" id="username" class="form-control" type="text" name="username" readonly> 
        </div>
        <div class="form-group">
          <label for="project_name">Project name:</label>
          <input v-model="projects.project_name" id="project_name" class="form-control" type="text" name="project_name" required> 
        </div>  
        <div class="form-group">
          <label for="receipt_date" >Receipt Date:</label>
          <input  v-model="projects.receipt_date" id="receipt_date" class="form-control" type="date" name="receipt_date" required> 
        </div>

        <div class="form-group">
          <label for="note">Detail of Project:</label>
          <textarea class="picker" v-model="projects.detail" name="detail" id="detail" placeholder="Add your project detail"></textarea>
        </div>

        <button type ="submit" class="btn">Add Project</button>
        <button @click="click_reset()" class="btn">Reset</button>
      </form>
    </div>
  </div>
</template>
  
<script>

const axios = require('axios');

export default (  {
  name: "CreateProject",
  data(){
    return{
      dataProject:[],
      projects:{
        project_name:'',
        detail:'',
        status:'0',
        receipt_date:'',
        finish_data:'',
        id_user:'',
      },
      errors:{}
    }
  },

  mounted(){
    this.checklogin();
  },
  
  methods: {
    checklogin: function(){
      var a1 = JSON.parse(localStorage.getItem('user'));
      this.projects.id_user = a1.user.id;
      this.projects.name = a1.user.name;    
    },
    click_reset: function(){
          window.location.reload();
    },

    submitproject: function(){        
      axios.post('http://127.0.0.1:8000/api/storeProject', this.projects)
      
      .then( () => {
        alert("Thêm dự án thành công!");
        window.location.reload();
      })

      .catch( () => {
        console.log("lỗi rồi!");
      });
    },
  }
  
})
</script>

<style scoped>
  .body{
    padding: 10px;
    float: left;
    width: 100%;
  }

  h1 {
    background-clip: border-box;
    background:  #4CAF50;
    border-radius: 8px 8px 0px 0px;
    color: white;
    text-align: center;
    font-family: Tahoma, Verdana, sans-serif;
    font-size: 30px;
    padding: 5px;
    width: 50%;
    float: left ;
    overflow: auto;
  }
  
  .picker  {
    width: 100%;
    padding: 12px 20px;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .form-check-in {
    width: 50%;
    border-radius: 0px 0px 8px 8px;
    background-color: #f2f2f2;
    padding :20px;
    float: left ;
    overflow: auto;
    margin-right:20px ;
  }
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
    Width: 40%;
  }

  .btn {
    width: 100%;
    background-color: #4CAF50;
    color: white;
    margin-bottom: 5px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .btn:hover {
    background-color: #3e8e41;
  }

</style>
