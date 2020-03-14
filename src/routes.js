// for sidebar
import Dashboard from "./app/dashboard/Dashboard";
import UserProfile from "./app/user-profile/UserProfile";
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
        component: UserProfile,
        icon: 'users_single-02',
        layout: '/vt',
        name: 'User Profile',
        path: '/user-profile',
        haveLinks: {
            sidebar: false
        },
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
        name: 'User Detail',
        path: ['/users/:id', '/profile'],
        haveLinks: {
            sidebar: false
        },
    },

];

export const rootRoutes = [];
