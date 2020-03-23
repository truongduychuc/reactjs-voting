// for sidebar
import Dashboard from "./app/dashboard/Dashboard";
import UserList from "./app/users/UserList";
import UserDetail from "./app/users/UserDetail";
import { Teams } from "./app/teams/Teams";

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
        icon: 'users_single-02',
        layout: '/vt',
        name: 'Users',
        path: '/users',
        haveLinks: {
            sidebar: true
        },
    },
    {
        component: Teams,
        layout: '/vt',
        icon: 'design_palette',
        name: 'Teams',
        path: '/teams',
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
