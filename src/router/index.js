import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminLogin from '../components/adminlogin.vue'
import LandingPage from '../components/landingpage.vue'
import AddFood from '../components/addfood.vue'
import FoodMenu from '../components/foodmenu.vue'
import EditFood from '../components/editfood.vue'
import UserSignin from '../components/usersignin.vue'
import UserLogin from '../components/userlogin.vue'
import Cart from '../components/cart.vue'
import ConfirmUser from '../components/confirmuser.vue'
import UserAccount from '../components/useracct.vue'
import AdminSide from '../components/adminside.vue'
import UserLists from '../components/userlists.vue'
import UserTrans from '../components/usertrans.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
  {
    path: '/foodmenu',
    name: 'FoodMenu',
    component: FoodMenu
  },
  {
    path: '/usersignin',
    name: 'UserSignin',
    component: UserSignin
  },
  {
    path: '/userlogin',
    name: 'UserLogin',
    component: UserLogin
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/confirmuser',
    name: 'ConfirmUser',
    component: ConfirmUser
  },
  {
    path: '/useracct/:name',
    name: 'UserAccount',
    component: UserAccount
  },
  {
    path: '/adminside/',
    name: 'AdminSide',
    component: AdminSide,
    children: [
      {path: '/', name: 'AdminLogin', component: AdminLogin},
      {path: 'addfood', name: 'AddFood', component: AddFood},
      {path: 'editfood', name: 'EditFood', component: EditFood},
      {path: 'userlists', name: 'UserLists', component: UserLists},
      {path: 'usertrans', name: 'UserTrans', component: UserTrans}
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
