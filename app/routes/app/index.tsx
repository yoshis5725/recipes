import {LoaderFunction, redirect} from "@remix-run/node";


/**
 * @function loader
 * @description this is a resource component used to redirect users that try to access
 * localhost:3000/app to localhost:3000/app/pantry
 * @return {Response}
 */


export const loader: LoaderFunction = function (): Response {
    return redirect('/app/pantry');
};