// for sidebar
import Dashboard from "./app/dashboard/Dashboard";
import UserProfile from "./app/user-profile/UserProfile";

export const routes = [
    {
        component: Dashboard,
        icon: 'design_app',
        layout: '/admin',
        name: 'Dashboard',
        path: '/dashboard'
    },
    {
        component: UserProfile,
        icon: 'users_single-02',
        layout: '/admin',
        name: 'User Profile',
        path: '/user-profile'
    }
];

export const rootRoutes = [];
