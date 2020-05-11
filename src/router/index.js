import Vue from 'vue'
import Router from 'vue-router'
import chat from '@/components/chat'
import signin from '@/components/signin'
import allGroup from '@/components/allGroup'
import signup from '@/components/signup'
import file from '@/components/file'
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
      path: '/chat',
      name: 'chat',
      component: chat
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
      path: '/file',
      name: 'file',
      component: file
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