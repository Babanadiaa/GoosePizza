import { useState, useEffect } from 'react';
import Navbar from './sections/Navbar';
import './App.css';
import Home from './sections/Home';
import Constructor from './sections/Constructor';
import Menu from './sections/Menu';
import Cart from './sections/Cart';
import MenuCard from './UI/MenuCard';
import Footer from './sections/Footer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]); // Стан для корзини
  const [animateCart, setAnimateCart] = useState(false); // Стан для анімації лічильника

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsCartOpen(false); // Закриваємо корзину
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown); // Очищення обробника
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto'; // Відновити скрол при розмонтуванні
    };
  }, [isCartOpen]);

  // Функція для додавання піци до корзини
  const addToCart = (pizza) => {
    setCart((prevCart) => {
      // Перевіряємо, чи є піца з такими ж добавками в корзині
      const existingPizza = prevCart.find(
        (item) =>
          item.name === pizza.name &&
          JSON.stringify(item.addons || {}) === JSON.stringify(pizza.addons || {})
      );

      if (existingPizza) {
        // Якщо піца з такими ж добавками вже є, збільшуємо її кількість
        return prevCart.map((item) =>
          item.name === pizza.name &&
            JSON.stringify(item.addons || {}) === JSON.stringify(pizza.addons || {})
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        // Якщо піци з такими добавками немає, додаємо її як новий елемент
        return [...prevCart, { ...pizza, quantity: 1 }];
      }
    });

    // Запускаємо анімацію
    setAnimateCart(true);
    setTimeout(() => setAnimateCart(false), 300); // Зупиняємо анімацію через 300 мс
  };

  return (
    <>
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart} // Передаємо cart в Navbar
        animateCart={animateCart} // Передаємо стан анімації
      />

      <Home />
      <Menu addToCart={addToCart} /> {/* Передаємо функцію в Menu */}
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} cart={cart} setCart={setCart} />
      <Footer />
    </>
  );
}

export default App;
