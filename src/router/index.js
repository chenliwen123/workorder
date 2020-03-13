import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import login from '@/components/login'
import  daijieshou from '@/components/daijieshou'
import  gongzuozhong from '@/components/gongzuozhong'
import  daidashang from '@/components/daidashang'
import  yiwancheng from '@/components/yiwancheng'
import  article_article from '@/components/article_article'
import  tijiao from '@/components/tijiao'
import  FTPsearch from '@/components/FTPsearch'
import  FTParticle from '@/components/FTParticle'
import  addFTP from '@/components/addFTP'
import  wotijiao from '@/components/wotijiao'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children:[
        {
          path:'/',
          name:'daijieshou',
          component:daijieshou,
        },
        {
          path:'/daijieshou',
          name:'daijieshou',
          component:daijieshou,
        },
        {
          path:'/gongzuozhong',
          name:'gongzuozhong',
          component:gongzuozhong,
        },
        {
          path:'/daidashang',
          name:'daidashang',
          component:daidashang,
        },
        {
          path:'/yiwancheng',
          name:'yiwancheng',
          component:yiwancheng,
        },
        {
          path:'/article_article/:id',
          name:'article_article',
          component:article_article,
        },
        {
          path:'/tijiao',
          name:'tijiao',
          component:tijiao,
        },
        {
          path:'/FTPsearch',
          name:'FTPsearch',
          component:FTPsearch,
        },
        {
          path:'/FTParticle/:id',
          name:'FTParticle',
          component:FTParticle,
        },
        {
          path:'/addFTP',
          name:'addFTP',
          component:addFTP,
        },
        {
          path:'/wotijiao',
          name:'wotijiao',
          component:wotijiao,
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    }
  ]
})
