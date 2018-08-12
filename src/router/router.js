import main from '@/views/main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

// export const page404 = {
//     path: '/*',
//     name: 'error-404',
//     meta: {
//         title: '404-页面不存在'
//     },
//     component: () => import('@/views/error-page/404.vue')
// };

// export const page403 = {
//     path: '/403',
//     meta: {
//         title: '403-权限不足'
//     },
//     name: 'error-403',
//     component: () => import('@//views/error-page/403.vue')
// };

// export const page500 = {
//     path: '/500',
//     meta: {
//         title: '500-服务端错误'
//     },
//     name: 'error-500',
//     component: () => import('@/views/error-page/500.vue')
// };

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home', component: () => import('@/views/home/home.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace', component: () => import('@/views/own-space/own-space.vue') },
        { path: 'index', title: '设备曲线列表', name:'deviceChart', component: () => import('@/views/device/deviceChart.vue') }

    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/device',
        icon: 'key',
        name: 'device',
        title: '设备列表',
        component: main,
        children: [
            { path: 'index', title: '设备列表', name:'device', component: () => import('@/views/device/device.vue') }
        ]
    },
    {
        path: '/warning',
        icon: 'lock-combination',
        title: '报警信息',
        name: 'warning',
        component: main,
        children: [
            { path: 'index', title: '报警信息', name: 'warning', component: () => import('@/views/warning/warning.vue') }
        ]
    },
        {
        path: '/maintain',
        icon: 'earth',
        title: '保养信息',
        name: 'maintain',
        component: main,
        children: [
            { path: 'index', title: '保养信息', name: 'maintain', component: () => import('@/views/maintain/maintain.vue') }
        ]
    }
    // {
    //     path: '/error-page',
    //     icon: 'android-sad',
    //     title: '错误页面',
    //     name: 'errorpage',
    //     component: main,
    //     children: [
    //         { path: 'index', title: '错误页面', name: 'errorpage_index', component: () => import('@/views/error-page/error-page.vue') }
    //     ]
    // }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    ...appRouter
];
