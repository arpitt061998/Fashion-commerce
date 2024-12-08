
export const stories = [
    {
        id: 'look1',
        mediaItems: [
        {
            type: 'image',
            url: 'assets/photos/img1',
            id: "storyId1",
            products: [
                { 
                    id: 'prod1', 
                    name: 'Summer Dress', 
                    price: 79.99, 
                    imageCoords: { x: 50, y: 70 } 
                },
                { 
                    id: 'prod2', 
                    name: 'Sandals', 
                    price: 49.99, 
                    imageCoords: { x: 30, y: 90 } 
                }
            ]
        },
        {
            type: 'image',
            url: 'assets/photos/img4',
            id: "storyId2",
            products: [
                { 
                    id: 'prod3', 
                    name: 'Beach Outfit', 
                    price: 129.99, 
                    imageCoords: { x: 60, y: 80 } 
                }
            ]
        }
        ]
    },
    {
        id: 'look2',
        mediaItems: [
        {
            type: 'image',
            url: '/assets/photos/img2',
            id: "storyId1",
            products: [
            { 
                id: 'prod4', 
                name: 'Winter Coat', 
                price: 199.99, 
                imageCoords: { x: 40, y: 60 } 
            }
            ]
        }
        ]
    }
]