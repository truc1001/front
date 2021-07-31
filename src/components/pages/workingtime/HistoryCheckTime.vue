<template>
    <div class="container">
        <h1>Check In History</h1>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Staff Name</th>
                        <th>Project</th>
                        <th>Work</th>
                        <th>Note</th>
                        <th>Check_in At</th>
                        <th>Check_out At</th>
                        <th>Create_at</th>
                        <th>Update_at</th>
                    </tr>
                </thead>
                <tbody>                    
                    <tr v-for="(data, i) in dataworkingtime" :key="i"> 
                        <td>{{data.id}}</td>
                        <td>{{data.name}}</td>
                        <td>{{data.project_name}}</td>
                        <td>{{data.work}}</td>
                        <td>{{data.note}}</td>
                        <td>{{data.check_in}}</td>
                        <td>{{data.check_out}}</td>
                        <td>{{data.created_at}}</td>
                        <td>{{data.updated_at}}</td>
                        <td>
                          <a :href="'http://127.0.0.1:8080/CheckOut/'+ data.id"  class='btn btn-warning' > Check-Out </a>
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
            dataworkingtime: []
        }
    },

  mounted(){
    this.checklogin();
  },
  methods:{
    checklogin: function(){
      axios.get('http://127.0.0.1:8000/api/showWorkingtime',{
      })
      .then(response => {
        this.dataworkingtime = response.data;
        console.log(this.dataworkingtime);

      })
      .catch(() => {
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