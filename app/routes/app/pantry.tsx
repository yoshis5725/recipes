import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {getAllShelves} from "~/models/pantry-shelf.server";
import cls from "classnames";


export const loader = async () => {
    const shelves = await getAllShelves();
    return json({shelves});
};


const Pantry = () => {
    const data = useLoaderData<typeof loader>();
    return (
        <div>
            <ul className={cls('flex gap-8 overflow-x-auto', 'snap-x snap-mandatory', 'md:snap-none')}>
                {
                    // retrieving the shelves from the loader data and map over them to render each shelf
                    data.shelves.map(shelf => (
                        <li
                            key={shelf.id}
                            className={
                                cls(
                                    'border-2 border-primary rounded-md p-4',
                                    'w-[calc(100vw-2rem)] flex-none snap-center h-fit',
                                    'md:w-96'
                                )
                            }
                        >
                            <h1 className={'text-2xl font-extrabold mb-2'}>{shelf.name}</h1>
                            <ul>
                                {
                                    // retrieving the items from the shelf and map over them to render each item
                                    shelf.items.map(item => (
                                        <li key={item.id} className={'py-2'}>
                                            {item.name}
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Pantry;