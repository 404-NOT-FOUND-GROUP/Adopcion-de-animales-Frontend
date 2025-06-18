import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';
import Logo from '../assets/Logo.png';

const NavLogo = () => (
  <div className="d-flex align-items-center gap-2">
    <img className="nav-logo" src={Logo} alt="Logo De Mascotas" />
    <h3 className="nav-title mb-0">404-ADOPTION</h3>
  </div>
);

const EmojiAnimal = ({ emoji, label }) => (
  <div className="emoji-animal" role="img" aria-label={label}>
    {emoji}
  </div>
);

const AnimalParade = () => (
  <div className="emoji-parade-container">
    <div className="emoji-parade">
      <span className="emoji-paw">🐾</span>
      <span className="emoji-paw">🐾</span>
      <EmojiAnimal emoji="🐶" label="Perro" />
      <span className="emoji-paw">🐾</span>
      <EmojiAnimal emoji="🐱" label="Gato" />
      <span className="emoji-paw">🐾</span>
      <EmojiAnimal emoji="🐕" label="Perro 2" />
      <span className="emoji-paw">🐾</span>
      <EmojiAnimal emoji="🐈" label="Gato 2" />
      <span className="emoji-paw">🐾</span>
      <span className="emoji-paw">🐾</span>
    </div>
  </div>
);

export const Navbar = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setShowMenu(false);
    navigate('/');
  };

  const handleNavigate = (path) => {
    navigate(path);
    setShowMenu(false);
  };

  return (
    <>
      <nav className="custom-navbar full-width-navbar d-flex flex-column">
        <div className="navbar-top d-flex align-items-center w-100">
          <div className="navbar-section left">
            <NavLogo />
          </div>

          <div className="navbar-section center d-flex justify-content-start">
            <AnimalParade />
          </div>

          <div className="navbar-section right d-flex align-items-center position-relative">
            <div
              className="user-icon-container"
              onClick={() => setShowMenu(!showMenu)}
              ref={menuRef}
              role="button"
              tabIndex={0}
              aria-haspopup="true"
              aria-expanded={showMenu}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setShowMenu(!showMenu);
                }
              }}
            >
              <div className="user-icon-placeholder" title="Menú de usuario">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#0077cc"
                  width="29px"
                  height="29px"
                >
                  <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                </svg>
              </div>

              {showMenu && (
                <div className="user-menu" role="menu">
                  {!isLoggedIn ? (
                    <>
                      <button onClick={() => handleNavigate('/login')} role="menuitem">
                        🔐 Iniciar sesión
                      </button>
                      <button onClick={() => handleNavigate('/register')} role="menuitem">
                        📝 Registrarse
                      </button>
                    </>
                  ) : (
                    <button onClick={handleLogout} role="menuitem">
                      🚪 Cerrar sesión
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="navbar-divider-horizontal my-2"></div>
      </nav>

      <div className="navbar-buttons-bar">
        <button
        className="navbar-link-btn"
        onClick={() => handleNavigate('/ayuda')}
        aria-label="Ayuda"
        type="button"
      >
        ❓ Ayuda
      </button> 

        <button
          className="navbar-link-btn"
          onClick={() => handleNavigate('/quienes-somos')}
          aria-label="Quiénes somos"
          type="button"
        >
          🏠 Quiénes somos
        </button>
      </div>
    </>
  );
};
