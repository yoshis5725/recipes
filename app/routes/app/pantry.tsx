import {PantryShelf, PrismaClient} from "@prisma/client";
import {json, LoaderFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";


export const loader: LoaderFunction = async () => {
    const db = new PrismaClient();
    const shelves = await db.pantryShelf.findMany();
    return json({shelves});
};


const Pantry = () => {
    const data = useLoaderData<{shelves: PantryShelf[]}>();
    return (
        <div>
            <h1>Welcome to the pantry</h1>
            <ul>
                {
                    data.shelves.map(shelf => (
                        <li key={shelf.id}>{shelf.name}</li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Pantry;