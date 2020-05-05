import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import signin from '@/components/signin'
import allGroup from '@/components/allGroup'
import signup from '@/components/signup'
import meeting from '@/components/meeting'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: allGroup
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/signin',
      name: 'signin',
      component: signin
    },
    {
      path: '/allGroup',
      name: 'allGroup',
      component: allGroup
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path: '/meeting/:id',
      name: 'meeting',
      component: meeting
    },
  ],

})
router.beforeEach((to, from, next)=>{
  switch(to.fullPath){
  case '/signin':
    {
      if(localStorage.token != undefined)
      next('/')
    else 
      next();
      break;
    };
  case '/signup':
      {
        if(localStorage.token != undefined)
       {   alert('vui lòng đăng xuất trước');
          next('/')
      }
      else 
        next();
        break;
      };
      default: {
        if(localStorage.token != undefined)
        next()
        else
        next('/signin')
        break;
      }
  }})
  export default router;