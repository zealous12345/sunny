import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Cars from './pages/Cars';
import Services from './pages/Services';
import Contact from './pages/Contact';
import CarDetail from './pages/CarDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AddCarImages from './pages/AddCarImages';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';
import Wishlist from './pages/Wishlist';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import { WishlistProvider } from './contexts/WishlistContext';

function App() {
  return (
    <WishlistProvider>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        <Navbar />
        <main className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cars/:id" element={<CarDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-car-images"
              element={
                <ProtectedRoute requireAdmin>
                  <AddCarImages />
                </ProtectedRoute>
              }
            />

            {/* 404 Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </WishlistProvider>
  );
}

export default App;
