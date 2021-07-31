<template>
    <div class="container">
        <h1>Check Time Mangement</h1>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th><div class="dropdown">
                                <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Staff ID
                                    <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu">
                                    <li v-for="(data, i) in dataUser" :key="i"><a :href="'http://127.0.0.1:8080/CheckTimeManager/'+ data.id">ID staff: {{data.id}}</a></li>
                                </ul>
                            </div>
                        </th>
                        <th>ID</th>
                        <th>Staff Name</th>
                        <th>ID Project</th>
                        <th>Work Today</th>
                        <th>Note</th>
                        <th>Check_in At</th>
                        <th>Check_out At</th>
                        <th>Create_at</th>
                        <th>Update_at</th>
                    </tr>
                </thead>
                <tbody>                    
                    <tr v-for="(data, i) in dataworkingtime" :key="i"> 
                        <td>{{data.id_user}}</td>
                        <td>{{data.id}}</td>
                        <td>{{data.name}}</td>
                        <td>{{data.project_name}}</td>
                        <td>{{data.work}}</td>
                        <td>{{data.note}}</td>
                        <td>{{data.check_in}}</td>
                        <td>{{data.check_out}}</td>
                        <td>{{data.created_at}}</td>
                        <td>{{data.updated_at}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<script>

const axios = require('axios');

export default ({
    name: "CheckTimeManager",
    data() {
        return{
            dataworkingtime: [],
            dataUser: []
        }
    },

  mounted(){
    this.id_url = this.$route.params.id;
    this.checklogin(this.id_url);
    this.checkuser();
  },
  methods:{
    checklogin: function(id){
      axios.get('http://127.0.0.1:8000/api/getManagerWorkingtime/'+ id,{
      })
      .then(response => {
         this.dataworkingtime = response.data; 
        console.log(this.dataworkingtime);

      })
      .catch(() => {
        console.log('loi roi');
      })
    },

    checkuser: function(){
      axios.get('http://127.0.0.1:8000/api/getUser',{
      })
      .then(response => {
        this.dataUser = response.data;
        console.log(this.dataUser);

      })
      .catch(() => {
        console.log('loi roi');
      })
    },

  }

})
</script>
<style scoped>
   
    .btn-primary{
        background-color: #4CAF50;
        border-color:rgb(112, 240, 53);
        box-shadow:#0a700d;
    }
    .btn-primary:hover{
        background-color: #0a700d;
        border-color:rgb(6, 116, 6);
        box-shadow:#0a700d;
    }
    a:link {
        text-decoration: none;
        
    }
    a:visited{
        color: #4CAF50;
    }
    a:hover{
        color:rgb(6, 116, 6);
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
        width: 100%;
        float: left ;
        overflow: auto;
    }
  </style>