import {PrismaClient} from "@prisma/client";


const db = new PrismaClient()


function getShelves() {
    return [
        {
            name: 'Dairy',
            items: {
                create: [{name: 'Milk'}, {name: 'Cheese'}, {name: 'Yogurt'}]
            }
        },
        {
            name: 'Produce',
            items: {
                create: [{name: 'Apples'}, {name: 'Bananas'}, {name: 'Carrots'}]
            }
        },
        {
            name: 'Meat',
            items: {
                create: [{name: 'Chicken'}, {name: 'Beef'}, {name: 'Pork'}]
            }
        },
        {
            name: 'Bread',
            items: {
                create: [{name: 'White'}, {name: 'Wheat'}, {name: 'Rye'}]
            }
        }
    ]
}


async function seed() {
    await Promise.all(
        getShelves().map(shelf => db.pantryShelf.create({data: shelf}))
    )
}


seed().then(result => console.log(result, 'Created the seed data!')).catch(e => console.error(e))