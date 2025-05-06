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

const test = [
    {
        id: 1,
        testName: "Toán học cơ bản",
        categoryId: 3,
        playTime: 5,
        playAmount: 30,
        image: "../../assets/imgs/quizz-forge.png",
        imageName: "Default Image",
        questions: [
            {
                content: "1 + 1 = ?",
                answers: [
                    { content: "2", isCorrect: true },
                    { content: "3", isCorrect: false },
                    { content: "4", isCorrect: false },
                    { content: "5", isCorrect: false }
                ]
            },
            {
                content: "2 + 3 = ?",
                answers: [
                    { content: "5", isCorrect: true },
                    { content: "4", isCorrect: false },
                    { content: "6", isCorrect: false },
                    { content: "7", isCorrect: false }
                ]
            },
            {
                content: "5 - 2 = ?",
                answers: [
                    { content: "3", isCorrect: true },
                    { content: "2", isCorrect: false },
                    { content: "4", isCorrect: false },
                    { content: "1", isCorrect: false }
                ]
            },
            {
                content: "6 - 4 = ?",
                answers: [
                    { content: "2", isCorrect: true },
                    { content: "3", isCorrect: false },
                    { content: "1", isCorrect: false },
                    { content: "4", isCorrect: false }
                ]
            },
            {
                content: "3 × 4 = ?",
                answers: [
                    { content: "12", isCorrect: true },
                    { content: "7", isCorrect: false },
                    { content: "9", isCorrect: false },
                    { content: "14", isCorrect: false }
                ]
            },
            {
                content: "5 × 6 = ?",
                answers: [
                    { content: "30", isCorrect: true },
                    { content: "28", isCorrect: false },
                    { content: "35", isCorrect: false },
                    { content: "32", isCorrect: false }
                ]
            },
            {
                content: "8 ÷ 2 = ?",
                answers: [
                    { content: "4", isCorrect: true },
                    { content: "6", isCorrect: false },
                    { content: "2", isCorrect: false },
                    { content: "3", isCorrect: false }
                ]
            },
            {
                content: "9 ÷ 3 = ?",
                answers: [
                    { content: "3", isCorrect: true },
                    { content: "2", isCorrect: false },
                    { content: "4", isCorrect: false },
                    { content: "1", isCorrect: false }
                ]
            },
            {
                content: "2³ = ?",
                answers: [
                    { content: "8", isCorrect: true },
                    { content: "6", isCorrect: false },
                    { content: "4", isCorrect: false },
                    { content: "16", isCorrect: false }
                ]
            },
            {
                content: "3² = ?",
                answers: [
                    { content: "9", isCorrect: true },
                    { content: "6", isCorrect: false },
                    { content: "12", isCorrect: false },
                    { content: "8", isCorrect: false }
                ]
            },
            {
                content: "√16 = ?",
                answers: [
                    { content: "4", isCorrect: true },
                    { content: "2", isCorrect: false },
                    { content: "8", isCorrect: false },
                    { content: "16", isCorrect: false }
                ]
            },
            {
                content: "√81 = ?",
                answers: [
                    { content: "9", isCorrect: true },
                    { content: "3", isCorrect: false },
                    { content: "18", isCorrect: false },
                    { content: "27", isCorrect: false }
                ]
            },
            {
                content: "10% của 200 = ?",
                answers: [
                    { content: "20", isCorrect: true },
                    { content: "10", isCorrect: false },
                    { content: "2", isCorrect: false },
                    { content: "200", isCorrect: false }
                ]
            },
            {
                content: "25% của 80 = ?",
                answers: [
                    { content: "20", isCorrect: true },
                    { content: "10", isCorrect: false },
                    { content: "40", isCorrect: false },
                    { content: "16", isCorrect: false }
                ]
            },
            {
                content: "5/8 + 3/8 = ?",
                answers: [
                    { content: "1", isCorrect: true },
                    { content: "1/2", isCorrect: false },
                    { content: "8/8", isCorrect: false },
                    { content: "3/4", isCorrect: false }
                ]
            },
            {
                content: "1/2 + 1/4 = ?",
                answers: [
                    { content: "3/4", isCorrect: true },
                    { content: "1/2", isCorrect: false },
                    { content: "2/3", isCorrect: false },
                    { content: "1", isCorrect: false }
                ]
            },
            {
                content: "0.5 + 0.25 = ?",
                answers: [
                    { content: "0.75", isCorrect: true },
                    { content: "0.5", isCorrect: false },
                    { content: "0.25", isCorrect: false },
                    { content: "1", isCorrect: false }
                ]
            },
            {
                content: "1.2 × 3 = ?",
                answers: [
                    { content: "3.6", isCorrect: true },
                    { content: "4.2", isCorrect: false },
                    { content: "3", isCorrect: false },
                    { content: "6", isCorrect: false }
                ]
            },
            {
                content: "15% của 60 = ?",
                answers: [
                    { content: "9", isCorrect: true },
                    { content: "6", isCorrect: false },
                    { content: "15", isCorrect: false },
                    { content: "12", isCorrect: false }
                ]
            },
            {
                content: "LCM của 4 và 6 là bao nhiêu?",
                answers: [
                    { content: "12", isCorrect: true },
                    { content: "8", isCorrect: false },
                    { content: "24", isCorrect: false },
                    { content: "10", isCorrect: false }
                ]
            },
            {
                content: "GCD của 8 và 12 là bao nhiêu?",
                answers: [
                    { content: "4", isCorrect: true },
                    { content: "2", isCorrect: false },
                    { content: "6", isCorrect: false },
                    { content: "8", isCorrect: false }
                ]
            },
            {
                content: "Giá trị của x trong phương trình 2x + 3 = 7 là bao nhiêu?",
                answers: [
                    { content: "2", isCorrect: true },
                    { content: "1", isCorrect: false },
                    { content: "3", isCorrect: false },
                    { content: "4", isCorrect: false }
                ]
            },
            {
                content: "Giải phương trình x² = 9, x = ?",
                answers: [
                    { content: "3 hoặc -3", isCorrect: true },
                    { content: "3", isCorrect: false },
                    { content: "-3", isCorrect: false },
                    { content: "0", isCorrect: false }
                ]
            },
            {
                content: "Số nguyên tố tiếp theo sau 7 là số nào?",
                answers: [
                    { content: "11", isCorrect: true },
                    { content: "9", isCorrect: false },
                    { content: "10", isCorrect: false },
                    { content: "13", isCorrect: false }
                ]
            },
            {
                content: "Tổng các góc trong tam giác là bao nhiêu độ?",
                answers: [
                    { content: "180", isCorrect: true },
                    { content: "360", isCorrect: false },
                    { content: "90", isCorrect: false },
                    { content: "270", isCorrect: false }
                ]
            },
            {
                content: "Diện tích hình chữ nhật có chiều dài 5 và rộng 3 là bao nhiêu?",
                answers: [
                    { content: "15", isCorrect: true },
                    { content: "8", isCorrect: false },
                    { content: "10", isCorrect: false },
                    { content: "20", isCorrect: false }
                ]
            },
            {
                content: "Chu vi hình vuông cạnh 4 là bao nhiêu?",
                answers: [
                    { content: "16", isCorrect: true },
                    { content: "8", isCorrect: false },
                    { content: "12", isCorrect: false },
                    { content: "20", isCorrect: false }
                ]
            },
            {
                content: "Số thập phân 0.2 bằng phân số nào?",
                answers: [
                    { content: "1/5", isCorrect: true },
                    { content: "2/5", isCorrect: false },
                    { content: "1/2", isCorrect: false },
                    { content: "2", isCorrect: false }
                ]
            },
            {
                content: "0.75 = phân số nào?",
                answers: [
                    { content: "3/4", isCorrect: true },
                    { content: "1/4", isCorrect: false },
                    { content: "75/100", isCorrect: false },
                    { content: "4/3", isCorrect: false }
                ]
            },
            {
                content: "log₁₀(1000) bằng bao nhiêu?",
                answers: [
                    { content: "3", isCorrect: true },
                    { content: "2", isCorrect: false },
                    { content: "10", isCorrect: false },
                    { content: "100", isCorrect: false }
                ]
            }]
    },
    {
        id: 2,
        testName: "Toán học nâng cao",
        categoryId: 3,
        playTime: 5,
        playAmount: 1,
        image: "../../assets/imgs/quizz-forge.png",
        imageName: "Default Image",
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
                        isCorrect: false
                    },
                    {
                        content: "4",
                        isCorrect: false
                    },
                    {
                        content: "5",
                        isCorrect: false
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        testName: "Toán học siêu cấp nâng cao",
        categoryId: 3,
        playTime: 5,
        playAmount: 1,
        image: "../../assets/imgs/quizz-forge.png",
        imageName: "Default Image",
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
                        isCorrect: false
                    },
                    {
                        content: "4",
                        isCorrect: false
                    },
                    {
                        content: "5",
                        isCorrect: false
                    }
                ]
            }
        ]
    },
    {
        id: 4,
        testName: "Đời sống 1",
        categoryId: 1,
        playTime: 5,
        playAmount: 5,
        image: "../../assets/imgs/quizz-forge.png",
        imageName: "Default Image",
        questions: [
            {
                content: "Tết nguyên đán thường diễn ra vào tháng mấy?",
                answers: [
                    { content: "Tháng 1 hoặc 2", isCorrect: true },
                    { content: "Tháng 3", isCorrect: false },
                    { content: "Tháng 12", isCorrect: false },
                    { content: "Tháng 4", isCorrect: false }
                ]
            }
        ]
    },
    {
        id: 5,
        testName: "Thể thao 2",
        categoryId: 2,
        playTime: 5,
        playAmount: 7,
        image: "../../assets/imgs/quizz-forge.png",
        imageName: "Default Image",
        questions: [
            {
                content: "Môn thể thao nào sử dụng bóng và gậy?",
                answers: [
                    { content: "Golf", isCorrect: true },
                    { content: "Bóng chuyền", isCorrect: false },
                    { content: "Bóng đá", isCorrect: false },
                    { content: "Bóng rổ", isCorrect: false }
                ]
            },
            {
                content: "Sân bóng đá tiêu chuẩn dài bao nhiêu mét?",
                answers: [
                    { content: "100–110m", isCorrect: true },
                    { content: "50m", isCorrect: false },
                    { content: "150m", isCorrect: false },
                    { content: "80m", isCorrect: false }
                ]
            }
        ]
    },
    {
        id: 6,
        testName: "Toán học 3",
        categoryId: 3,
        playTime: 5,
        playAmount: 8,
        image: "../../assets/imgs/quizz-forge.png",
        imageName: "Default Image",
        questions: [
            {
                content: "7 + 8 = ?",
                answers: [
                    { content: "15", isCorrect: true },
                    { content: "14", isCorrect: false },
                    { content: "16", isCorrect: false },
                    { content: "13", isCorrect: false }
                ]
            },
            {
                content: "9 x 9 = ?",
                answers: [
                    { content: "81", isCorrect: true },
                    { content: "72", isCorrect: false },
                    { content: "99", isCorrect: false },
                    { content: "89", isCorrect: false }
                ]
            },
            {
                content: "25 : 5 = ?",
                answers: [
                    { content: "5", isCorrect: true },
                    { content: "6", isCorrect: false },
                    { content: "4", isCorrect: false },
                    { content: "3", isCorrect: false }
                ]
            }
        ]
    },
    {
        id: 7,
        testName: "Công nghệ 4",
        categoryId: 4,
        playTime: 5,
        playAmount: 12,
        image: "../../assets/imgs/quizz-forge.png",
        imageName: "Default Image",
        questions: [
            {
                content: "Hệ điều hành phổ biến nhất trên máy tính là gì?",
                answers: [
                    { content: "Windows", isCorrect: true },
                    { content: "Linux", isCorrect: false },
                    { content: "macOS", isCorrect: false },
                    { content: "Android", isCorrect: false }
                ]
            },
            {
                content: "Thiết bị nào sau đây là thiết bị nhập?",
                answers: [
                    { content: "Bàn phím", isCorrect: true },
                    { content: "Màn hình", isCorrect: false },
                    { content: "Loa", isCorrect: false },
                    { content: "Máy in", isCorrect: false }
                ]
            },
            {
                content: "Facebook được tạo bởi ai?",
                answers: [
                    { content: "Mark Zuckerberg", isCorrect: true },
                    { content: "Bill Gates", isCorrect: false },
                    { content: "Steve Jobs", isCorrect: false },
                    { content: "Elon Musk", isCorrect: false }
                ]
            },
            {
                content: "RAM là gì?",
                answers: [
                    { content: "Bộ nhớ tạm", isCorrect: true },
                    { content: "Ổ cứng", isCorrect: false },
                    { content: "Bộ xử lý", isCorrect: false },
                    { content: "Mạng không dây", isCorrect: false }
                ]
            }
        ]
    },
    {
        id: 8,
        testName: "Khoa học 1",
        categoryId: 5,
        playTime: 5,
        playAmount: 3,
        image: "../../assets/imgs/quizz-forge.png",
        imageName: "Default Image",
        questions: [
            {
                content: "Trái Đất nằm trong hệ gì?",
                answers: [
                    { content: "Hệ Mặt Trời", isCorrect: true },
                    { content: "Hệ Alpha Centauri", isCorrect: false },
                    { content: "Hệ Sao Bắc Cực", isCorrect: false },
                    { content: "Hệ Mặt Trăng", isCorrect: false }
                ]
            }
        ]
    },
    {
        id: 9,
        testName: "Đời sống 2",
        categoryId: 1,
        playTime: 5,
        playAmount: 4,
        image: "../../assets/imgs/quizz-forge.png",
        imageName: "Default Image",
        questions: [
            {
                content: "Trang phục truyền thống của Việt Nam là?",
                answers: [
                    { content: "Áo dài", isCorrect: true },
                    { content: "Kimono", isCorrect: false },
                    { content: "Hanbok", isCorrect: false },
                    { content: "Sari", isCorrect: false }
                ]
            },
            {
                content: "Người Việt ăn gì sáng?",
                answers: [
                    { content: "Bún bò", isCorrect: true },
                    { content: "Hamburger", isCorrect: false },
                    { content: "Pizza", isCorrect: false },
                    { content: "Cơm tấm", isCorrect: false }
                ]
            }
        ]
    },
    {
        id: 10,
        testName: "Thể thao 3",
        categoryId: 2,
        playTime: 5,
        playAmount: 5,
        image: "../../assets/imgs/quizz-forge.png",
        imageName: "Default Image",
        questions: [
            {
                content: "Olympic tổ chức mấy năm 1 lần?",
                answers: [
                    { content: "4 năm", isCorrect: true },
                    { content: "2 năm", isCorrect: false },
                    { content: "3 năm", isCorrect: false },
                    { content: "5 năm", isCorrect: false }
                ]
            },
            {
                content: "Cầu thủ nào nổi tiếng với biệt danh CR7?",
                answers: [
                    { content: "Cristiano Ronaldo", isCorrect: true },
                    { content: "Messi", isCorrect: false },
                    { content: "Neymar", isCorrect: false },
                    { content: "Mbappé", isCorrect: false }
                ]
            },
            {
                content: "Bóng chuyền có bao nhiêu người trên sân mỗi đội?",
                answers: [
                    { content: "6", isCorrect: true },
                    { content: "5", isCorrect: false },
                    { content: "7", isCorrect: false },
                    { content: "8", isCorrect: false }
                ]
            }
        ]
    },
    {
        id: 11,
        testName: "Toán học 4",
        categoryId: 3,
        playTime: 5,
        playAmount: 9,
        image: "../../assets/imgs/quizz-forge.png",
        imageName: "Default Image",
        questions: [
            {
                content: "50 x 2 = ?",
                answers: [
                    { content: "100", isCorrect: true },
                    { content: "90", isCorrect: false },
                    { content: "80", isCorrect: false },
                    { content: "110", isCorrect: false }
                ]
            },
            {
                content: "Căn bậc hai của 64 là?",
                answers: [
                    { content: "8", isCorrect: true },
                    { content: "6", isCorrect: false },
                    { content: "7", isCorrect: false },
                    { content: "9", isCorrect: false }
                ]
            },
            {
                content: "Tổng 1 đến 10 là?",
                answers: [
                    { content: "55", isCorrect: true },
                    { content: "50", isCorrect: false },
                    { content: "60", isCorrect: false },
                    { content: "45", isCorrect: false }
                ]
            },
            {
                content: "Pi xấp xỉ bao nhiêu?",
                answers: [
                    { content: "3.14", isCorrect: true },
                    { content: "2.71", isCorrect: false },
                    { content: "3.41", isCorrect: false },
                    { content: "3.00", isCorrect: false }
                ]
            }
        ]
    }
];


localStorage.setItem('users', JSON.stringify(userFake));
localStorage.setItem('category', JSON.stringify(categoryFake));
localStorage.setItem('test', JSON.stringify(test));

