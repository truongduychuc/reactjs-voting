// for sidebar
import Dashboard from "./app/dashboard/Dashboard";
import UserList from "./app/users/UserList";
import UserDetail from "./app/users/UserDetail";

export const routes = [
    {
        component: Dashboard,
        icon: 'design_app',
        layout: '/vt',
        name: 'Dashboard',
        path: '/dashboard',
        haveLinks: {
            sidebar: true
        }
    },
    {
        component: UserList,
        icon: 'design_bullet-list-67',
        layout: '/vt',
        name: 'User List',
        path: '/users',
        haveLinks: {
            sidebar: true
        },
    },
    {
        component: UserDetail,
        layout: '/vt',
        icon: 'shopping_credit-card',
        name: 'My Profile',
        path: '/user-profile',
        haveLinks: {
            sidebar: true
        },
    },

];

export const rootRoutes = [];
