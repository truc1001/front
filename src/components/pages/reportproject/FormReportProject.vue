<template>
    <div class="body">
        <h1>Project's Report form</h1>
        <div class= "form-check-in">
            <form action="" method="" @submit.prevent="submitreportproject()">
                <input v-model="reports.id_user" id="id_user" class="form-control" type="text" name="id_user" readonly style="display: none">
                <input v-model="reports.id_project" id="id_project" class="form-control" type="text" name="id_project" readonly style="display: none">
        
                <div class="form-group">
                    <label for="name">Report By:</label>
                    <input v-model="reports.name" id="name" class="form-control" type="text" name="name" readonly> 
                </div>

                <div>
                  <label for="name">Report Name:</label>
                  <select class="form-control" v-model="reports.id_project">
                    <option :value="data.id" v-for="(data, i) in dataProject" :key="i">{{data.project_name}}</option>
                  </select>
                </div>

                <div class="form-group">
                    <label for="name_project">Enter Your Project:</label>
                    <b-form-input v-model="reports.name_project" id="name_project" class="picker"  name = "name_project" placeholder="Enter your project"></b-form-input>  
                </div>

                <div class="group1">
                    <div class="form-group">
                        <label for="time_for_project">Enter Time For Project (H:m:s):</label>
                        <b-form-input v-model="reports.time_for_project" id="time_for_projectt" class="picker"  name = "time_for_project" placeholder="Enter your time for project"></b-form-input>  
                    </div>
                    
                    <div class="form-group">
                        <label for="status">Status:</label>
                        <textarea class="picker" v-model="reports.status" name="status" id="status" placeholder="status of project"></textarea>
                    </div>

                    <div class="form-group">
                        <label for="reason">Reason For Delay Progress:</label>
                        <textarea class="picker" v-model="reports.reason" name="reason" id="reason" placeholder="Add your Reason"></textarea>
                    </div>

                    <div class="form-group">
                        <label for="advantage">Advantage:</label>
                        <textarea class="picker" v-model="reports.advantage" name="advantage" id="advantage" placeholder="Add your advantage"></textarea>
                    </div>
                </div>

                <div class="group2">
                    <div class="form-group">
                        <label for="rate_of_process" >Rate Of Project (%):</label>
                        <input  v-model="reports.rate_of_process" id="rate_of_process" class="form-control" type="text" name="rate_of_project" required placeholder="Rate Of Project (%)"> 
                    </div>

                    <div class="form-group">
                        <label for="disadvantage">Disadvantage:</label>
                        <textarea class="picker" v-model="reports.disadvantage" name="disadvantage" id="disadvantage" placeholder="Add your rate of project"></textarea>
                    </div>

                    <div class="form-group">
                        <label for="suggestion">Suggestion:</label>
                        <textarea class="picker" v-model="reports.suggestion" name="suggestion" id="suggestion" placeholder="Add your rate of project"></textarea>
                    </div>

                    <div class="form-group">
                        <label for="plan_for_next_day">Plan For Next Day:</label>
                        <textarea class="picker" v-model="reports.plan_for_next_day" name="plan_for_next_day" id="plan_for_next_day" placeholder="Add your rate of project"></textarea>
                    </div>
                </div>

                <button type ="submit" class="btn">Submit Your Report</button>
                <button @click="click_reset()" class="btn">Reset</button>
            </form>
        </div>
    </div>
</template>
<script>

const axios = require('axios');

export default ({
  name: "FormReportProject",
  data(){
    return{
      dataProject:[],
      dataReportProject:[],
      reports:{
        name_project:'',
        time_for_project:'',
        rate_of_process:'',
        status:'',
        reason:'',
        advantage:'',
        disadvantage:'',
        suggestion:'',
        plan_for_next_day:'',
        id_user:'',  
        id_project:'',    
      },
      errors:{}
    }
  },

  mounted(){
    this.checklogin();
    this.checkproject();
  },
  
  methods: {
    checklogin: function(){
      var a1 = JSON.parse(localStorage.getItem('user'));
      this.reports.id_user = a1.user.id;
      this.reports.name = a1.user.name;    
    },
    click_reset: function(){
          window.location.reload();
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
    submitreportproject: function(){        
      axios.post('http://127.0.0.1:8000/api/storeReportProject', this.reports)
      
      .then( () => {
        alert("Đã báo cáo thành công!");
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
    padding-left:70px;
    width: 100%;
  }


.group1{
    width:48%;
    float:left;
    overflow: auto;
    margin-left: 13px;
}
.group2{
    width: 48%;
    float:right;
    overflow: auto;
}
  h1 {
    background-clip: border-box;
    background:  #4CAF50;
    border-radius: 8px 8px 0px 0px;
    color: white;
    text-align: left;
    font-family: Tahoma, Verdana, sans-serif;
    font-size: 30px;
    padding: 5px;
    width: 70%;
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
    width: 70%;
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
