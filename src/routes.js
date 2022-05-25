import {
    ADMIN_ROUTE,
    AUTH_ROUTE,
    ITEM_ROUTE, PROFILE_ROUTE,
    SHOP_ROUTE, SEARCH_ROUTE
} from "./utils/consts";
import Admin from "./components/Admin";
import Shop from "./components/Shop";
import AuthForm from "./components/AuthForm";
import ShopItem from "./components/ShopItem";
import Profile from "./components/Profile";
import Search from "./components/Search";

export const authRoutes = []

export const publicRoutes = [
    {
        path: '/',
        Component: <Shop/>
    },
    {
        path: PROFILE_ROUTE,
        Component: <Profile/>
    },
    {
        path: SEARCH_ROUTE,
        Component: <Search/>
    },
    {
        path: ADMIN_ROUTE,
        Component: <Admin/>
    },
    {
        path: ITEM_ROUTE + '/:id',
        Component: <ShopItem/>
    },
    {
        path: SHOP_ROUTE,
        Component: <Shop/>
    },
    {
        path: AUTH_ROUTE,
        Component: <AuthForm/>
    }
]