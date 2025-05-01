let userFake = JSON.parse(localStorage.getItem('users')) || [
    {
        id: 1,
        username: "Lê Phú Thịnh",
        email: "lptAdmin@gmail.com",
        password: "123456",
        role: "admin",
    },

    {
        id: 2,
        username: "Lê Phú Thịnh",
        email: "lptUser@gmail.com",
        password: "123456",
        role: "user",
    },
];

let categoryFake = JSON.parse(localStorage.getItem('category')) || [
    {
        id: 1,
        categoryName: "Đời sống",
        categoryEmoji: "🏠"
    },

    {
        id: 2,
        categoryName: "Thể thao",
        categoryEmoji: "🏐"
    },

    {
        id: 3,
        categoryName: "Toán học",
        categoryEmoji: "🔢"
    },

    {
        id: 4,
        categoryName: "Công nghệ",
        categoryEmoji: "📺"
    },

    {
        id: 5,
        categoryName: "Khoa học",
        categoryEmoji: "🧪"
    }
]

let test = [
    {
        id: 1,
        testName: "Toán học cơ bản",
        categoryId: 3,
        playTime: 5,
        playAmount: 1,
        questions: [
            {
                content: "1+1 = ?",
                answers: [
                    {
                        content: "2",
                        isCorrect: true
                    },
                    {
                        content: "3",
                    },
                    {
                        content: "4",
                    },
                    {
                        content: "5",
                    }
                ]
            }
        ]
    }
]

localStorage.setItem('users', JSON.stringify(userFake));
localStorage.setItem('category', JSON.stringify(categoryFake));
localStorage.setItem('test', JSON.stringify(test));

