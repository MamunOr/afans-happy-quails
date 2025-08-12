import React, { useEffect, useState } from 'react';
import {
  Feather,
  LogOut,
  ShoppingCart,
} from 'react-feather';

import { CartProvider } from './context/CartContext';
import CartModal from './components/CartModal';

import Dashboard from './pages/Dashboard';
import QuailBatchesPage from './pages/QuailBatchesPage';
import BatchDetailPage from './pages/BatchDetailPage';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import QuailDetailModal from './components/QuailDetailModal';

import {
  OWNER_EMAIL,
  initialQuailBatches,
} from './data';

import { auth } from './firebaseConfig';
import {
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  updatePassword,
} from 'firebase/auth';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);

  // Quail management state
  const [activeBatchId, setActiveBatchId] = useState(null);
  const [selectedQuail, setSelectedQuail] = useState(null);
  const [quailBatches, setQuailBatches] = useState(initialQuailBatches);

  // Cart modal open state
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Password reset feedback
  const [resetMessage, setResetMessage] = useState('');
  const [resetError, setResetError] = useState('');

  // Listen for Firebase Auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          email: user.email,
          name: user.displayName || '',
          role: user.email === OWNER_EMAIL ? 'owner' : 'user',
          uid: user.uid,
        });
        // If user logged in and on login page, redirect home
        if (activePage === 'login') setActivePage('home');
      } else {
        setCurrentUser(null);
        // Don’t force navigation here — allow public pages to show
      }
    });
    return () => unsubscribe();
  }, [activePage]);

  // Logout handler
  const handleLogout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setActivePage('home');
  };

  // Update user profile name
  const handleUpdateUser = async (updatedUser) => {
    if (auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, { displayName: updatedUser.name });
        setCurrentUser((prev) => ({ ...prev, name: updatedUser.name }));
      } catch (error) {
        console.error('Failed to update profile:', error);
      }
    }
  };

  // Password reset handler
  const handleResetPassword = async (email) => {
    setResetMessage('');
    setResetError('');
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage('If the email is registered, a reset link has been sent.');
    } catch (error) {
      setResetError(error.message);
    }
  };

  const handleChangePassword = async (newPassword) => {
    setResetMessage('');
    setResetError('');
    try {
      if (!auth.currentUser) throw new Error("No user logged in");
      await updatePassword(auth.currentUser, newPassword);
      setResetMessage("Password changed successfully.");
    } catch (error) {
      setResetError(error.message);
    }
  };

  // Page renderer with route protection for profile/dashboard/batches
  const renderPage = () => {
    if (activePage === 'dashboard' || activePage === 'batches' || activePage === 'batchDetail') {
      if (!currentUser || currentUser.role !== 'owner') {
        // If not owner, deny access, redirect to home
        return <Home />;
      }
      if (activePage === 'dashboard') return <Dashboard setActivePage={setActivePage} />;
      if (activePage === 'batches')
        return (
          <QuailBatchesPage
            setActivePage={setActivePage}
            setActiveBatchId={setActiveBatchId}
          />
        );
      if (activePage === 'batchDetail') {
        const batch = quailBatches.find((b) => b.batchId === activeBatchId);
        return (
          <BatchDetailPage
            batch={batch}
            setActivePage={setActivePage}
            onSelectQuail={setSelectedQuail}
          />
        );
      }
    }

    if (activePage === 'profile') {
      if (!currentUser) {
        // Not logged in — show login page here
        return (
          <LoginPage
            onForgotPassword={handleResetPassword}
            resetMessage={resetMessage}
            resetError={resetError}
            setActivePage={setActivePage}
          />
        );
      }
      return (
        <ProfilePage
          user={currentUser}
          onUpdateUser={handleUpdateUser}
          onChangePassword={handleChangePassword}
          resetMessage={resetMessage}
          resetError={resetError}
        />
      );
    }

    if (activePage === 'login') {
      return (
        <LoginPage
          onForgotPassword={handleResetPassword}
          resetMessage={resetMessage}
          resetError={resetError}
          setActivePage={setActivePage}
        />
      );
    }

    // Public pages:
    if (activePage === 'home') return <Home />;
    if (activePage === 'shop') return <Shop />;

    // Fallback to home:
    return <Home />;
  };

  const NavLink = ({ page, children }) => (
    <button
      onClick={() => setActivePage(page)}
      className={`py-2 px-4 rounded-md text-sm sm:text-base font-medium transition-colors ${
        activePage === page
          ? 'bg-green-700 text-white'
          : 'text-gray-600 hover:bg-green-100'
      }`}
    >
      {children}
    </button>
  );

  return (
    <CartProvider>
      <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
        <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setActivePage('home')}
                role="button"
                tabIndex={0}
              >
                <Feather className="text-green-800" />
                <span className="text-xl font-bold text-green-800">
                  Afan's Happy Quails
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <NavLink page="home">Home & Blog</NavLink>
                <NavLink page="shop">Shop</NavLink>
                {currentUser?.role === 'owner' && (
                  <NavLink page="dashboard">My Dashboard</NavLink>
                )}
                {currentUser?.role === 'user' && (
                  <NavLink page="profile">My Profile</NavLink>
                )}
                {!currentUser && <NavLink page="login">Login</NavLink>}

                {/* Cart button */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="p-2 text-green-700 hover:bg-green-100 rounded-md transition"
                  aria-label="Open shopping cart"
                >
                  <ShoppingCart size={20} />
                </button>

                {currentUser && (
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-600 hover:bg-red-100 hover:text-red-600 rounded-full transition-colors"
                    aria-label="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow">{renderPage()}</main>

        {selectedQuail && (
          <QuailDetailModal
            quail={selectedQuail}
            batch={quailBatches.find(
              (b) => b.batchId === selectedQuail.id.split('-')[0]
            )}
            onClose={() => setSelectedQuail(null)}
          />
        )}

        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        <footer className="bg-green-900 text-white py-8 mt-auto">
          <div className="container mx-auto px-4 text-center">
            <p>
              &copy; {new Date().getFullYear()} Afan's Happy Quails. All Rights
              Reserved.
            </p>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}
