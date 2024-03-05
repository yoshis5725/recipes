import db from "~/db.server";


interface ShelfType {
    name: string;
}


export function getAllShelves(query: string|null) {
    return db.pantryShelf.findMany({
        where: {
            name: {
                contains: query ?? '',
                mode: 'insensitive'
            }
        },
        include: {
            items: {
                orderBy: {
                    name: 'asc'
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
}

export async function createShelf(): Promise<ShelfType> {
    return db.pantryShelf.create({
        data: {
            name: 'New Shelf',
        }
    });
}

export async function deleteShelf(shelfId: string) {
    return db.pantryShelf.delete({
        where: {
            id: shelfId
        }
    });
}