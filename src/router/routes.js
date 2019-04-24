
const routes = [
    {
        path: '/',
        component: () => import( 'layouts/public.vue' ),
        children: [
            {
                path: '',
                component: () => import( 'pages/home.vue' )
            }
        ]
    }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
