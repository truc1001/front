<template>
    <div class="container">
        <h1>Report Project Manager</h1>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th>ID Report</th>
                        <th>Staff Name</th>
                        <th>ID Project</th>
                        <th>Work Today</th>
                        <th>Time/Day for Project</th>
                        <th>Rate of Project (%)</th>
                        <th>Status of Project</th>
                        <th>Advantage</th>
                        <th>Disadvantage</th>
                        <th>Suggestion</th>
                        <th>Plan For Next Day</th> 
                    </tr>
                </thead>
                <tbody>                    
                    <tr v-for="(data, i) in dataReportProject" :key="i"> 
                        <td>
                          <a :href="'http://127.0.0.1:8080/UpdateReportProject/'+ data.id_report"  class='btn btn-warning' > Update </a>
                        </td>
                        <td>{{data.id_report}}</td>
                        <td>{{data.name}}</td>
                        <td>{{data.id_project}}</td>
                        <td>{{data.name_project}}</td>
                        <td>{{data.time_for_project}}</td>
                        <td>{{data.rate_of_process}}</td>
                        <td>{{data.status}}</td>
                        <td>{{data.advantage}}</td>
                        <td>{{data.disadvantage}}</td>
                        <td>{{data.suggestion}}</td>
                        <td>{{data.plan_for_next_day}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>

const axios = require('axios');

export default ({
    name: "HistoryReportProject",
    data() {
        return{
            dataProject:[],
            dataReportProject: []
        }
    },

  mounted(){
    this.checklogin();
    this.checkproject();
  },
  methods:{
    checklogin: function(){
      axios.get('http://127.0.0.1:8000/api/showReportProject',{
      })
      .then(response => {
        this.dataReportProject = response.data;
        console.log(this.dataReportProject);

      })
      .catch(() => {
        console.log('loi roi');
      })
    },
    checkproject: function(){
      axios.get('http://127.0.0.1:8000/api/getProject',{
      })
      .then(response => {
        this.dataProject = response.data;
        this.reports.id_project = response.data.id;
        console.log(this.dataProject);

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