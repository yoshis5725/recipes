import {ActionFunction, json, LoaderFunction} from "@remix-run/node";
import {Form, useLoaderData, useNavigation, useSearchParams} from "@remix-run/react";
import {createShelf, deleteShelf, getAllShelves} from "~/models/pantry-shelf.server";
import cls from "classnames";
import {PlusIcon, SearchIcon} from "../../../components/icons";
import {DeleteButton, PrimaryButton} from "../../../components/forms";


interface LoaderData {
    shelves: Awaited<ReturnType<typeof getAllShelves>>
}

export const loader: LoaderFunction = async ({request}) => {
    const url = new URL(request.url);
    const q = url.searchParams.get('q');
    const shelves = await getAllShelves(q);
    return json({shelves});
};

export const action: ActionFunction = async ({request}) => {
    const formData = await request.formData();
    switch (formData.get('_action')) {
        case 'createShelf':
            return createShelf();
        case 'deleteShelf': {
            const shelfId = formData.get('shelfId');
            if (typeof shelfId !== 'string') {
                return json({errors: 'Shelf ID must be a string'})
            }
            return deleteShelf(shelfId)
        }
        default:
            return null;
    }
}


// ################################################# JSX #################################################


const Pantry = () => {
    const data = useLoaderData() as unknown as LoaderData;
    const [searchParams] = useSearchParams();
    const navigation = useNavigation();
    const isSearching = navigation.formData?.has('q')
    const isCreatingShelf = navigation.formData?.get('_action') === 'createShelf';

    return (
        <div>
            {/*search*/}
            <Form className={cls(
                'flex border-2 border-gray-300 rounded-md',
                'focus-within:border-green-600', isSearching ? 'animate-pulse' : '')}>
                <button className={'w-10 px-2'}>
                    <SearchIcon/>
                </button>
                <input
                    defaultValue={searchParams.get('q') || ''}
                    type="text"
                    name="q"
                    autoComplete="off"
                    placeholder="Search for an item"
                    className={'w-full py-3 px-2 outline-none'}
                />
            </Form>

            {/*create shelf*/}
            <Form method={'POST'} action={''}>
                <PrimaryButton
                    name={'_action'}
                    value={'createShelf'}
                    className={cls('mt-4 w-full md:w-fit')}
                    isLoading={isCreatingShelf}
                >
                    <div className={'w-8'}>
                        <PlusIcon/>
                    </div>
                    <div className={'pt-1 p-2'}>
                        <span>{isCreatingShelf ? 'Creating the Shelf' : 'Create Shelf'}</span>
                    </div>
                </PrimaryButton>
            </Form>

            {/*shelves*/}
            <ul className={cls('flex gap-8 overflow-x-auto', 'snap-x snap-mandatory', 'md:snap-none mt-4 pb-4')}>
                {
                    // retrieving the shelves from the loader data
                    data.shelves.map(shelf => {
                        const isDeletingShelf = navigation.formData?.get('shelfId') === shelf.id &&
                            navigation.formData?.get('_action') === 'deleteShelf';
                        return (
                            <li
                                key={shelf.id}
                                className={
                                    cls(
                                        'border-2 border-green-600 rounded-md p-4',
                                        'w-[calc(100vw-2rem)] flex-none snap-center h-fit',
                                        'md:w-96'
                                    )
                                }
                            >
                                <h1 className={'text-2xl font-extrabold mb-2'}>{shelf.name}</h1>
                                <ul>
                                    {
                                        // retrieving the items from the shelf
                                        shelf.items.map(item => (
                                            <li key={item.id} className={'py-2'}>
                                                {item.name}
                                            </li>
                                        ))
                                    }
                                </ul>

                                {/*delete shelf*/}
                                <Form method={'POST'} className={'pt-8'}>
                                    <input type="hidden" name={'shelfId'} value={shelf.id}/>
                                    <DeleteButton
                                        name='_action'
                                        value={'deleteShelf'}
                                        className={'w-full border-2 border-red-400 hover:text-white hover:bg-red-400'}
                                        isLoading={isDeletingShelf}
                                    >
                                        {isDeletingShelf ? 'Deleting the Shelf' : 'Delete Shelf'}
                                    </DeleteButton>
                                </Form>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
};

export default Pantry;