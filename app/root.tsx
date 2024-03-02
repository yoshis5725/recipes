import styles from './tailwind.css';
import type {LinksFunction, MetaFunction} from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    NavLink,
    Outlet,
    Scripts,
    ScrollRestoration,
    useNavigation,
    useResolvedPath
} from "@remix-run/react";
import {DiscoverIcon, HomeIcon, RecipeBookIcon, SettingsIcon} from "../components/icons";
import cls from 'classnames';
import React from "react";


export const meta: MetaFunction = () => {
    return [
        {title: "Recipe App"},
        {name: "description", content: "Welcome to the Recipes app!"},
    ];
};

export const links: LinksFunction = () => {
    return [
        {rel: "stylesheet", href: styles},
    ];
};


interface AppNavLinkProps {
    to: string;
    children: React.ReactNode;
}

function AppNavLink({to, children}: AppNavLinkProps) {
    const path = useResolvedPath(to);
    const navigation = useNavigation();

    const isLoading = navigation.state === 'loading' && navigation.location.pathname === path.pathname;

    return (
        <li className={'w-16'}>
            <NavLink to={to}>
                {
                    ({isActive}) => (
                        <div className={
                            cls('p-4 flex justify-center hover:bg-primary-light',
                                isActive ? 'bg-primary-light' : '',
                                isLoading ? 'animate-pulse bg-primary-light' : ''
                            )
                        }>
                            {children}
                        </div>
                    )
                }
            </NavLink>
        </li>
    );
} // end AppNavLink


// ####################################### JSX  #######################################


export default function App() {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            <Links/>
            <title></title>
        </head>
        <body className={'md:flex md:h-screen'}>
        <nav className={'bg-primary text-white'}>
            <ul className={'flex md:flex-col'}>
                <AppNavLink to={'/'}>
                    <HomeIcon/>
                </AppNavLink>

                <AppNavLink to={'app'}>
                    <RecipeBookIcon/>
                </AppNavLink>

                <AppNavLink to={'discover'}>
                    <DiscoverIcon/>
                </AppNavLink>

                <AppNavLink to={'settings'}>
                    <SettingsIcon/>
                </AppNavLink>
            </ul>
        </nav>
        <div className={'p-4'}>
            <Outlet/>
        </div>
        <ScrollRestoration/>
        <Scripts/>
        <LiveReload/>
        </body>
        </html>
    );
}
