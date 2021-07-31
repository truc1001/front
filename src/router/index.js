import Vue from 'vue'
import VueRouter from 'vue-router'

//login---phuong.nguyen
import Login from '../components/Login.vue' //login
import admin from '../components/admin.vue' //logout
//import RegisterPage from '../components/pages/RegisterPage.vue'//dang ki tai khoan
import Forgot_Password from '@/components/forgot_password/Forgot_Password.vue'
import Code from '@/components/forgot_password/Code.vue'
import Change_Pass from '../components/forgot_password/Change_Pass.vue'

//check_in-check_out---hieu.tran
import CheckTimePage from '../components/pages/workingtime/CheckTimePage.vue' //form check_in
import HistoryCheckTime from '@/components/pages/workingtime/HistoryCheckTime.vue' //form check_out
import CheckOut from '@/components/pages/workingtime/CheckOut.vue' //lich su check_in check_out
import AdminManagerCheckTime from '@/components/pages/workingtime/AdminManagerCheckTime.vue'
import CheckTimeManager from '@/components/pages/workingtime/CheckTimeManager.vue'//quan ly check time
//Ot---son.le
import createOT from '@/components/pages/overtime/createOT.vue' //dang ki Ot
import EditOvertime from '@/components/pages/overtime/editOT.vue' //sua Ot
import getdata0 from '@/components/pages/overtime/getdata0.vue' //form ot cho duyet
import getdata1 from '@/components/pages/overtime/getdata1.vue' //form ot da duyet
import report from '@/components/pages/overtime/report.vue' //bao cao tong hop
import showOTofuser from '@/components/pages/overtime/showOTofuser.vue' // form ot cua user

//day_off---truc.ho
import DayOffPage from '../components/pages/dayoff/Day_off.vue' // Quan ly nghi phep
import RegisterPage from '../components/pages/dayoff/Dayoff_register.vue' // Dang ky nghi phep
import DayOffTrackingPage from '../components/pages/dayoff/Dayoff_tracking.vue' // Theo doi nghi phep da duyet cua admin
import DayOffEditPage from '../components/pages/dayoff/Dayoff_edit.vue' // Sua thong tin nghi phep
import DayOffApprovedPage from '../components/pages/dayoff/Dayoff_approved.vue' // Quan ly yeu cau da gui cua nhan vien

//report project hieu.tran & phuong.nguyen
import FormReportProject from '@/components/pages/reportproject/FormReportProject.vue'
import HistoryReportProject from '@/components/pages/reportproject/HistoryReportProject.vue'
import UpdateReportProject from '@/components/pages/reportproject/UpdateReportProject.vue'
import ReportProjectManager from '@/components/pages/reportproject/ReportProjectManager.vue'
import AdminReportManager from '@/components/pages/reportproject/AdminReportManager.vue'

import FinishedProject from '@/components/pages/project/FinishedProject.vue'
import ShowProject from '@/components/pages/project/ShowProject.vue'
import CreateProject from '@/components/pages/project/CreateProject.vue'
import UpdateProject from '@/components/pages/project/UpdateProject.vue'

// Skill  --son.le & truc.ho--
import skillRegistration from '../components/skill_of_staff/skill_registration.vue';
import showdataSkill from '../components/skill_of_staff/showdataSkill.vue';
import skillEdit from '../components/skill_of_staff/skill_edit.vue';
//end

Vue.use(VueRouter)

const routes = [
    //login-logout---phuong.nguyen
    {
      path: '/',
      name: 'Login',
      component:  Login
    },
    {
      path: '/admin',
      name: 'admin',
      meta: {
        auth: true
      },
      component: admin,
    },
    {
      path: '/Forgot_Password',
      name: 'Forgot_Password',
      component: Forgot_Password,
    },    
    {
      path: '/Code',
      name: 'Code',
      component: Code
    },
    {
      path: '/Change_Pass',
      name: 'Change_Pass',
      component: Change_Pass
    },  
    //check_in-check_out---hieu.tran
    {
      path: "/CheckTimePage",
      name: "CheckTimePage",
      meta: {
        auth: true
      },
      components:{
        default: admin,
        'content': CheckTimePage
      }
    },

    {
      path: "/CheckOut/:id",
      name: "CheckOut",
      meta: {
        auth: true
      },
      components:{
        default: admin,
        'content': CheckOut
      }
    },
    
    {
      path: "/HistoryCheckTime",
      name: "HistoryCheckTime",
      meta: {
        auth: true
      },
      components:{
        default: admin,
        'content': HistoryCheckTime
      }
    },
    {
      path: "/AdminManagerCheckTime",
      name: "AdminManagerCheckTime",
      meta: {
        auth: true
      },
      components:{
        default: admin,
        'content': AdminManagerCheckTime
      }
    },
    {
      path: "/CheckTimeManager/:id",
      name: "CheckTimeManager",
      meta: {
        auth: true
      },
      components:{
        default: admin,
        'content': CheckTimeManager
      }
    },
    //day_off--truc.ho
    {
      path: '/Day_off',
      name: 'Day_off',
      meta: {
        auth: true
      },
      components:{
        default: admin,
        'content': DayOffPage
      }
    },

    {
      path: '/Dayoff_register',
      name: 'Dayoff_register',
      meta: {
        auth: true
      },
      components:{
        default: admin,
        'content': RegisterPage
      }
    },

    {
      path: '/Dayoff_tracking',
      name: 'Dayoff_tracking',
      meta: {
        auth: true
      },
      components:{
        default: admin,
        'content': DayOffTrackingPage
      }
    },

    {
      path: '/Dayoff_edit/:id',
      name: 'Dayoff_edit',
      meta: {
        auth: true
      },
      components:{
        default: admin,
        'content': DayOffEditPage
      }
    },

    {
      path: '/Dayoff_approved',
      name: 'Dayoff_approved',
      meta: {
        auth: true
      },
      components:{
        default: admin,
        'content': DayOffApprovedPage
      }
    },

    //OT---son.le
    {
      path: "/FormOvertime",
      name: "FormOvertime",
      meta: {
        auth: true
      },
      components:{
        default: admin,
        'content': createOT
      }
    },

    {
      path: "/EditOvertime/:id",
      name: "EditOvertime",
      meta: {
        auth: true
      },
      components:{
        default: admin,
        'content': EditOvertime
      }
    },

    {
      path: "/GetData0",
      name: "GetData0",
      meta: {
        auth: true
      },
      components:{
        default: admin,
        'content': getdata0
      }
    },

    {
      path: "/GetData1",
      name: "GetData1",
      meta: {
        auth: true
      },
      components:{
        default: admin,
        'content': getdata1
      }
    },

    {
      path: "/Report",
      name: "Report",
      meta: {
        auth: true
      },
      components:{
        default: admin,
        'content': report
      }
    },

    {
      path: "/ShowOTofuser",
      name: "ShowOTofuser",
      meta: {
        auth: true
      },
      components:{
        default: admin,
        'content': showOTofuser
      }
    },

    {
      path: '/FormReportProject',
      name: 'FormReportProject',
      meta: {
        auth: true
      },
      components:{
        default: admin,
        'content': FormReportProject
      }
    },

    {
      path: '/HistoryReportProject',
      name: 'HistoryReportProject',
      meta: {
        auth: true
      },
      components:{
        default: admin,
        'content': HistoryReportProject
      }
    },

    {
      path: '/UpdateReportProject/:id',
      name: 'UpdateReportProject',
      meta: {
        auth: true
      },
      components:{
        default: admin,
        'content': UpdateReportProject
      }
    },
    {
      path: '/ReportProjectManager/:id',
      name: 'ReportProjectManager',
      meta: {
        auth: true
      },
      components:{
        default: admin,
        'content': ReportProjectManager
      }
    },

    {
      path: '/AdminReportManager',
      name: 'AdminReportManager',
      meta: {
        auth: true
      },
      components:{
        default: admin,
        'content': AdminReportManager
      }
    },

    {
      path: '/CreateProject',
      name: 'CreateProject',
      meta: {
        auth: true
      },
      components:{
        default: admin,
        'content': CreateProject
      }
    },

    {
      path: '/UpdateProject/:id',
      name: 'UpdateProject',
      meta: {
        auth: true
      },
      components:{
        default: admin,
        'content': UpdateProject
      }
    },
    
    {
      path: '/FinishedProject',
      name: 'FinishedProject',
      meta: {
        auth: true
      },
      components:{
        default: admin,
        'content': FinishedProject
      }
    },
    {
      path: '/RecentProject',
      name: 'ShowProject',
      meta: {
        auth: true
      },
      components:{
        default: admin,
        'content': ShowProject
      }
    },
    { path: '/skillRegistration', component: skillRegistration, name: 'skillRegistration'  },
    { path: '/showdataSkill', component: showdataSkill, name: 'showdataSkill'  },
    { path: '/editSkill/:id', component: skillEdit, name: 'skillEdit'},


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  
  router.beforeEach((to, from, next) => {
    
    const loggedIn = localStorage.getItem('user')
  
    if (to.matched.some(record => record.meta.auth) && !loggedIn) {
        return next('/')
    }
    next();    
  })
  
  export default router


