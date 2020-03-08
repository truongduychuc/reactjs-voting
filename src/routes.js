// for sidebar
import Dashboard from "./app/dashboard/Dashboard";
import UserProfile from "./app/user-profile/UserProfile";
import UserList from "./app/users/UserList";

export const routes = [
    {
        component: Dashboard,
        icon: 'design_app',
        layout: '/admin',
        name: 'Dashboard',
        path: '/dashboard',
        haveLinks: {
          sidebar: true
        }
    },
    {
        component: UserProfile,
        icon: 'users_single-02',
        layout: '/admin',
        name: 'User Profile',
        path: '/user-profile',
        haveLinks: {
            sidebar: false
        },
    },
    {
        component: UserList,
        icon: 'design_bullet-list-67',
        layout: '/admin',
        name: 'User List',
        path: '/list',
        haveLinks: {
            sidebar: true
        },
    }
];

export const rootRoutes = [];
