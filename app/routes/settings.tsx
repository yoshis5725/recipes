import {Link, Outlet} from "@remix-run/react";


const Settings = () => {
    return (
        <div>
            <h1>This is the Settings page</h1>
            <p>This is the Settings page content</p>
            <nav>
                <Link to="app">App</Link>
                <Link to="profile">Profile</Link>
            </nav>
            <Outlet />
        </div>
    );
};

export default Settings;