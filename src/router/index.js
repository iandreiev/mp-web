import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/index"

let isAuth = store.state.auth


Vue.use(VueRouter)

const routes = [
  {
    path:'*',
    name:'UnknownPage',
    component: ()=>import('../views/ErrorPage.vue')
  },
  {
    path:'/test',
    name:'Test',
    component: ()=>import('../views/Test.vue')
  },
  {
    path:'/payout/payId_:id',
    name:'Payout',
    component: ()=>import('../views/PaymentProceed.vue'),
    props: true
  },
  {
    path:'/payout/topup/payId_:id',
    name:'TopUp',
    component: ()=>import('../views/PaymentTopUp.vue'),
    props: true
  },
  {
    path:'/redirect',
    name:'Redirect',
    component: ()=>import('../views/Redirect.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: ()=>import('../views/ErrorPage.vue'),
    //only temporary purposes
    // component: ()=>import('../views/ErrorPage.vue')
  },
  {
    path:'/emailVerification/:encodedEmail',
    name: 'EmailVerification',
    component: ()=>import('../views/EmailVerification.vue'),
    props:true
  },
  {
    path:'/resetPassword/:encodedEmail',
    name: 'resetPass',
    component: ()=>import('../views/PassReset.vue'),
    props:true
  },
  {
    path: '/project/:id',
    name: 'ProjectItem',
    component: ()=>import('../views/PageProjectItem.vue'),
    props: true
  },
  {
    path: '/framework',
    name: 'DesignSystem',
    component: ()=>import('../views/Test.vue')
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: ()=>import('../views/Contacts.vue')
  },
  {
    path: '/category/:id',
    props: true,
    name: 'CategoryPageProjects',
    component: ()=>import('../views/CategoryProjects.vue')
  },
  {
    path: '/projects',
    name: 'Projects',
    component: ()=>import('../views/Catalogue.vue')
  },
  {
    path: '/changelog',
    name: 'Changelog',
    component: ()=>import('../views/Changelog.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/me',
    redirect: '/me/profile',
    name: 'UserWrapper',
    component: ()=>import('../views/Panel/Wrapper.vue'),
    props: true,  
    beforeEnter(to,from,next){
      if(isAuth == true){
        next()
      }
      else{
        next({
          name: 'Home'
        })
      }
    },
    meta: {
      requiresAuth: true
  },
    children:[
      {
        path: 'profile',
        component: ()=>import('../views/Panel/Profile.vue'),
        props: true,
        name: 'Profile',
        meta: {
          requiresAuth: true
      }
      },
      {
        path: 'bidding',
        component: ()=>import('../views/Panel/Bidding.vue'),
        props: true,
        name: 'Bidding',
        meta: {
          requiresAuth: true
      }

      },
      {
        path: 'bidding/create',
        name: 'CreateBid',
        component: ()=>import('../views/Panel/CreateBid.vue'),
        props:true,
        // name: 'BiddingCreate',
        meta: {
          requiresAuth: true
      }

      },
      {
        path: 'bidding/bid/:id',
        name: 'BidIntro',
        component: ()=>import('../views/Panel/BidIntro.vue'),
        props:true,
        meta: {
          requiresAuth: true
      }
      },
      {
        path: 'projects',
        component: ()=>import('../views/Panel/MyProjects.vue'),
        props: true,
        name: 'UserProjects',
        meta: {
          requiresAuth: true
      }
      },
      {
        path: 'history',
        component: ()=>import('../views/Panel/History.vue'),
        props: true,
        name: 'History',
        meta: {
          requiresAuth: true
      }
      },
      {
        path: 'history/:id',
        component: ()=>import('../views/Panel/HistoryItem.vue'),
        props: true,
        name: 'HistoryItem',
        meta: {
          requiresAuth: true
      }
      },
      {
        path: 'messages',
        component: ()=>import('../views/Panel/Messages.vue'),
        props: true,
        name: 'Messages'
      },
      {
        path: 'messages/create',
        component: ()=>import('../views/Panel/CreateMessage.vue'),
        props: true,
        name: 'CreateMessage'
      },
      {
        path: 'messages/:id',
        component: ()=>import('../views/Panel/MessageItem.vue'),
        props: true,
        name: 'MessageItem'
      },
      {
        path: 'settings',
        component: ()=>import('../views/Panel/Settings.vue'),
        props: true,
        name: 'Settings'
        
      },
      {
        path: 'affilate',
        component: ()=>import('../views/Panel/Affilate.vue'),
        props: true,
        name: 'Affilate'

      },
      {
        path: 'wallet',
        component: ()=>import('../views/Panel/Wallet.vue'),
        name: 'Wallet',
        props: true,
      },
      {
        path: 'logout',
        component: ()=>import('../views/Panel/Logout.vue'),
        props: true,
        name: 'Logout'

      },
    ]
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } 
      return { x: 0, y: 0 }
  }
})

export default router
