import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'OA审批',
    component: () =>
      import('../views/index.vue'),
  },
  {
    path:'/form/:id',
    name:'Form',
    component:()=>
    import('../views/form.vue'),
  },
  {
    path: '/question',
    name: '问卷调查',
    component: () =>
      import('../views/question.vue'),
  },
  {
    path: '/apply/:processTemplateId',
    name: 'Apply',
    component: () =>
      import('../views/apply.vue'),
  },
  {
    path: '/list/:activeIndex',
    name: '审批列表',
    component: () =>
      import('../views/list.vue'),
  },
  {
    path: '/show/:id/:taskId',
    name: '审批详情',
    component: () =>
      import('../views/show.vue'),
  },
  {
    path: '/user',
    name: '基本信息',
    component: () =>
      import('../views/user.vue'),
  },
  {
    path: '/about',
    name: '关于我们',
    component: () =>
      import('../views/about.vue'),
  },
  {
    path: '/test',
    name: '测试',
    component: () =>
      import('../views/test.vue'),
  },
  {
    path:"/fileManager/list",
    name:'文件目录',
    component: () =>
      import('../views/fileManager/list/list.vue')
  },
  {
    path:"/fileManager/uploadfile",
    name:'文件上传',
    component: () =>
      import('../views/fileManager/uploadfile/uploadfile.vue')
  }
];

const router = new VueRouter({
  routes,
});

export default router;
