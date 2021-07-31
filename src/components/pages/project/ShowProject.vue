<template>
    <div class="container">
        <h1>Project Manager</h1>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Staff Name</th>
                        <th>Project</th>
                        <th>status</th>
                        <th>receipt_date</th>
                        <th>finish_data</th>
                        <th>detail</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>                    
                    <tr v-for="(data, i) in dataProject" :key="i"> 
                        <td>{{data.id}}</td>
                        <td>{{data.name}}</td>
                        <td>{{data.project_name}}</td>
                        <td>{{data.status}}</td>
                        <td>{{data.receipt_date}}</td>
                        <td>{{data.finish_data}}</td>
                        <td>{{data.detail}}</td>
                        <td>
                          <a :href="'http://127.0.0.1:8080/UpdateProject/'+ data.id"  class='btn btn-warning' > Update </a>
                        </td>
                        <td>
                          <a class='btn btn-success' @click.prevent="click_finish(data.id)"> Finished </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

const axios = require('axios');

export default ({
    name: "HistoryCheckTime",
    data() {
        return{
            dataProject:[]
        }
    },

  mounted(){
    this.checklogin();
  },
  methods:{
    checklogin: function(){
      axios.get('http://127.0.0.1:8000/api/showProject',{
      })
      .then(response => {
        this.dataProject = response.data;
        console.log(this.dataProject);

      })
      .catch(() => {
        console.log('loi roi');
      })
    },

    click_finish: function(id){
        axios.post('http://127.0.0.1:8000/api/finishProject/'+id,
            this.user_localstore
        )
        .then( () => {
          alert("Đã hoàn thành dự án!");
          window.location.reload();        
        })
        .catch( () => {
          console.log('loi roi');
        })
    },

  }

})
</script>
<style scoped>
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