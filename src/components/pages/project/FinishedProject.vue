<template>
    <div class="container">
        <h1>Finished Project Manager</h1>
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
                            <a href="" class='btn btn-danger' @click.prevent="click_detroy(data.id)" > Delete </a>
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
      axios.get('http://127.0.0.1:8000/api/showFinishedProject',{
      })
      .then(response => {
        this.dataProject = response.data;
        console.log(this.dataProject);

      })
      .catch(() => {
        console.log('loi roi');
      })
    },
    click_detroy: function(id){
        axios.get('http://127.0.0.1:8000/api/destroyProject/'+id,{
            
        })
        .then( res => {
          alert("Đã xóa thành công!");
          console.log(res.data);
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