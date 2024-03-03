import {PrismaClient} from "@prisma/client";


/**
 *  @description This is a global object that will be available in the global scope of the server.
 *  It will be used to store the PrismaClient instance so that it can be reused across requests.
 *  This is important because creating a new PrismaClient instance for every request is inefficient.
 *  The PrismaClient instance is not meant to be used as a singleton, but it is safe to use it as a singleton in a server environment.
 */


interface CustomNodeJSGlobal extends NodeJS.Global {
    db?: PrismaClient;
}

declare const global: CustomNodeJSGlobal;


const db = global.db || new PrismaClient();

if (process.env.NODE_ENV === "development") {
    global.db = db;
}


export default db;