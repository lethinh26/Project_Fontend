let userFake = JSON.parse(localStorage.getItem('user')) || [
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

localStorage.setItem('user', JSON.stringify(userFake));

