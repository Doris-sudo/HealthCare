import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { OrdersProvider } from './context/OrdersContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

// Pages
import { Home } from './pages/Home';
import { Medicines } from './pages/Medicines';
import { MedicineDetails } from './pages/MedicineDetails';
import { Categories } from './pages/Categories';
import { Services } from './pages/Services';
import { AboutUs } from './pages/AboutUs';
import { Contact } from './pages/Contact';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { UserAccount } from './pages/UserAccount';
import { OrderTracking } from './pages/OrderTracking';

// Styles
import './styles/components.css';
import './styles/pages.css';

// Automatically scroll window to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <OrdersProvider>
          <CartProvider>
            <ScrollToTop />
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />
              <main style={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/medicines" element={<Medicines />} />
                  <Route path="/medicines/:id" element={<MedicineDetails />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/account" element={<UserAccount />} />
                  <Route path="/track-order" element={<OrderTracking />} />
                  {/* Catch-all */}
                  <Route path="*" element={<Home />} />
                </Routes>
              </main>
              <Footer />
              <Toast />
            </div>
          </CartProvider>
        </OrdersProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
