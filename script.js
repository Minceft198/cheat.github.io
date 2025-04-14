const users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;

document.getElementById('loginBtn').onclick = function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        currentUser = user;
        document.getElementById('authSection').style.display = 'none';
        document.getElementById('productsSection').style.display = 'block';
        displayProducts();
    } else {
        alert('Неверный логин или пароль.');
    }
};

document.getElementById('registerBtn').onclick = function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (users.find(u => u.username === username)) {
        alert('Такой пользователь уже существует.');
    } else {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Регистрация прошла успешно.');
    }
};

function displayProducts() {
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = '';
    const products = [
        { name: 'Продукт 1', duration: '7 дней' },
        { name: 'Продукт 2', duration: '20 дней' },
        { name: 'Продукт 3', duration: 'Навсегда' }
    ];
    
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `${product.name} - ${product.duration} 
            <button onclick="buyProduct('${product.name}')">Купить</button>`;
        productsDiv.appendChild(productDiv);
    });
}

function buyProduct(productName) {
    if (!currentUser) {
        alert('Сначала войдите в аккаунт.');
        return;
    }
    alert(`Вы купили ${productName}`);
}
