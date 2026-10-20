const vendors = [
    {
        id: 'sec-rec',
        name: 'Secret Recipe',
        location: 'Mahallah Uthman, Block E',
        openHours: '8:00 am - 10:00 pm',
        isOpen: true,
        menu: [
            { id: 'sc-cake-1', name: 'Fish Cupcake', description: 'cupcake made with 101% authentic fish', 
                price: 100, category: 'cake', available: true },
            { id: 'sc-cake-2', name: 'Carrot Cake', description: 'yummy carrot cake', 
                price: 24.5, category: 'cake', available: true },
            { id: 'sc-bev-1', name: 'Tiramisu Milkshake', description: 'blended tiramisu abomination', 
                price: 9.5, category: 'drinks', available: false },
        ],
    },
    {
        id: 'cat-kafe',
        name: 'Catfe',
        location: 'Mahallah Siddiq, Block C',
        openHours: '8:00 am - 9:00 pm',
        isOpen: true,
        menu: [
            { id: 'cf-cake-1', name: 'Cat Cupcake', description: 'cupcake made with... just cat-shaped', 
                price: 9, category: 'cake', available: true },
            { id: 'cf-bev-1', name: 'Banana Milkshake', description: 'blended banana and milk', 
                price: 3.5, category: 'drinks', available: true },
        ],
    },
]

export default vendors