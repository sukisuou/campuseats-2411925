const vendors = [
    {
        id: 'sec-rec',
        name: 'Secret Recipe',
        location: 'Mahallah Uthman, Block E',
        openHours: '8:00 am - 10:00 pm',
        isOpen: true,
        menu: [
            { id: 'cake-1', name: 'Fish Cupcake', description: 'cupcake made with 101% authentic fish', 
                price: 100, category: 'cake', available: true },
            { id: 'cake-2', name: 'Carrot Cake', description: 'yummy carrot cake', 
                price: 24.5, category: 'cake', available: true },
            { id: 'bev-1', name: 'Tiramisu Milkshake', description: 'blended tiramisu abomination', 
                price: 9.5, category: 'drinks', available: false },
        ],
    },
    {
        id: 'kafe-aminah',
        name: 'Kafe Mahallah Aminah',
        location: 'Mahallah Aminah, Ground Floor',
        openHours: '8:00 am - 9:00 pm',
        isOpen: true,
        menu: [
            { id: 'ami-1', name: 'Nasi Ayam Penyet', description: 'Smashed fried chicken with sambal and rice', 
                price: 9, category: 'Rice', available: true },
            { id: 'ami-2', name: 'Air Bandung', description: 'Rose syrup with milk', 
                price: 3, category: 'Drinks', available: true },
        ],
    },
]

export default vendors