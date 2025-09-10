import React, { useState, useEffect } from 'react';
import './Header-General.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="header">
      <a className="neve-skip-link show-on-focus" href="#content">
        Skip to content
      </a>
      
      <div className="elementor elementor-1855 elementor-location-header">
        <div className="elementor-section-wrap">
          {/* Header Desktop */}
          <section className="elementor-section elementor-top-section elementor-element elementor-element-4d6be2d7 elementor-hidden-tablet elementor-hidden-mobile elementor-section-full_width elementor-section-height-default elementor-section-height-default wpr-particle-no wpr-jarallax-no wpr-parallax-no" 
            id="header-scroll" data-settings='{"background_background":"classic","sticky":"top","animation":"none","sticky_on":["desktop","tablet","mobile"],"sticky_offset":0,"sticky_effects_offset":0}'>
            
            <div className="elementor-container elementor-column-gap-default">
              <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-5ff90e21" 
                data-id="5ff90e21" data-element_type="column" data-settings='{"background_background":"gradient"}'>
                
                <div className="elementor-widget-wrap elementor-element-populated">
                  <section className="elementor-section elementor-inner-section elementor-element elementor-element-4ac77ff elementor-section-full_width elementor-section-height-default elementor-section-height-default wpr-particle-no wpr-jarallax-no wpr-parallax-no wpr-sticky-section-no">
                    
                    <div className="elementor-container elementor-column-gap-default">
                      {/* Menú lateral */}
                      <div className="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-5d37f28" data-id="5d37f28" data-element_type="column">
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div className="elementor-element elementor-element-670b429 eael-hamburger--desktop eael-simple-menu-hamburger-align-center elementor-widget__width-initial eael_simple_menu_hamburger_disable_selected_menu_no elementor-widget elementor-widget-eael-simple-menu" 
                            id="menu-lateral" data-widget_type="eael-simple-menu.default">
                            
                            <div className="elementor-widget-container">
                              <style dangerouslySetInnerHTML={{__html: `
                                @media screen and (max-width: 2399px) {
                                  .eael-hamburger--desktop {
                                    .eael-simple-menu-horizontal,
                                    .eael-simple-menu-vertical {
                                      display: none;
                                    }
                                  }
                                  .eael-hamburger--desktop {
                                    .eael-simple-menu-container .eael-simple-menu-toggle {
                                      display: block;
                                    }
                                  }
                                }
                              `}} />
                              
                              <div className="eael-simple-menu-container eael-simple-menu-align-center eael-simple-menu-dropdown-align-left preset-1" 
                                data-hamburger-breakpoints='{"mobile":"Móvil vertical (> 767px)","tablet":"Tableta vertical (> 1024px)","desktop":"Desktop (> 2400px)","none":"None"}' 
                                data-hamburger-device="desktop">
                                
                                <ul id="menu-menu" className="eael-simple-menu eael-simple-menu-dropdown-animate-to-top eael-simple-menu-indicator eael-simple-menu-vertical">
                                  <li id="menu-item-234" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-234">
                                    <a href="https://almargen-media.com/quienes-somos/">¿Quiénes somos?</a>
                                  </li>
                                  <li id="menu-item-233" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-233">
                                    <a href="https://almargen-media.com/contacto/">Contacto</a>
                                  </li>
                                  <li id="menu-item-530" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-530">
                                    <a href="https://almargen-media.com/suscripcion/">Suscripción</a>
                                  </li>
                                </ul>
                                
                                <button className="eael-simple-menu-toggle">
                                  <span className="sr-only">Hamburger Toggle Menu</span>
                                  <i aria-hidden="true" className="fas fa-bars"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Logo */}
                      <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-fbe26c7" 
                        id="imagen-logo" data-id="fbe26c7" data-element_type="column">
                        
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div className="elementor-element elementor-element-3423262 elementor-widget elementor-widget-image" 
                            data-id="3423262" data-element_type="widget" data-widget_type="image.default">
                            
                            <div className="elementor-widget-container">
                              <a href="https://almargen-media.com/">
                                <img 
                                  fetchPriority="high" 
                                  width="1024" 
                                  height="454" 
                                  src={isScrolled 
                                    ? "https://almargen-media.com/wp-content/uploads/2025/05/LOGO_RGB_1-1024x454.webp" 
                                    : "https://almargen-media.com/wp-content/uploads/2025/04/LOGO_RGB_2-1024x454.webp"} 
                                  className="attachment-large size-large wp-image-2786" 
                                  alt="Almargen" 
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Redes Sociales */}
                      <div className="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-38987e0" 
                        data-id="38987e0" data-element_type="column">
                        
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div className="elementor-element elementor-element-c246cf3 elementor-shape-square e-grid-align-left elementor-grid-0 elementor-widget elementor-widget-social-icons" 
                            id="menu-sociales" data-widget_type="social-icons.default">
                            
                            <div className="elementor-widget-container">
                              <div className="elementor-social-icons-wrapper elementor-grid" role="list">
                                <span className="elementor-grid-item" role="listitem">
                                  <a className="elementor-icon elementor-social-icon elementor-social-icon-instagram elementor-repeater-item-db5d6d3" 
                                    href="https://www.instagram.com/almargen_periodismo/" target="_blank" rel="noopener noreferrer">
                                    <span className="elementor-screen-only">Instagram</span>
                                    <i className="fab fa-instagram"></i>
                                  </a>
                                </span>
                                <span className="elementor-grid-item" role="listitem">
                                  <a className="elementor-icon elementor-social-icon elementor-social-icon-tiktok elementor-repeater-item-d418518" 
                                    href="https://www.tiktok.com/@almargen_periodismo" target="_blank" rel="noopener noreferrer">
                                    <span className="elementor-screen-only">Tiktok</span>
                                    <i className="fab fa-tiktok"></i>
                                  </a>
                                </span>
                                <span className="elementor-grid-item" role="listitem">
                                  <a className="elementor-icon elementor-social-icon elementor-social-icon-x-twitter elementor-repeater-item-d314a4d" 
                                    href="https://x.com/almargen_pe" target="_blank" rel="noopener noreferrer">
                                    <span className="elementor-screen-only">X-twitter</span>
                                    <i className="fab fa-x-twitter"></i>
                                  </a>
                                </span>
                                <span className="elementor-grid-item" role="listitem">
                                  <a className="elementor-icon elementor-social-icon elementor-social-icon-facebook elementor-repeater-item-bbfba2a" 
                                    href="https://www.facebook.com/people/Al-Margen-Periodismo/61566487709727/" target="_blank" rel="noopener noreferrer">
                                    <span className="elementor-screen-only">Facebook</span>
                                    <i className="fab fa-facebook"></i>
                                  </a>
                                </span>
                                <span className="elementor-grid-item" role="listitem">
                                  <a className="elementor-icon elementor-social-icon elementor-social-icon-youtube elementor-repeater-item-806d7e8" 
                                    target="_blank" rel="noopener noreferrer">
                                    <span className="elementor-screen-only">Youtube</span>
                                    <i className="fab fa-youtube"></i>
                                  </a>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Navegación principal */}
                  <div className="elementor-element elementor-element-50f7f4e8 elementor-nav-menu__align-center elementor-widget__width-initial elementor-nav-menu--dropdown-mobile elementor-nav-menu__text-align-aside elementor-nav-menu--toggle elementor-nav-menu--burger elementor-widget elementor-widget-nav-menu" 
                    id="mi-navegador" data-settings='{"layout":"horizontal","submenu_icon":{"value":"<i class=\"fas fa-caret-down\"><\/i>","library":"fa-solid"},"toggle":"burger"}' 
                    data-widget_type="nav-menu.default">
                    
                    <div className="elementor-widget-container">
                      <nav migration_allowed="1" migrated="0" role="navigation" className="elementor-nav-menu--main elementor-nav-menu__container elementor-nav-menu--layout-horizontal e--pointer-underline e--animation-fade">
                        <ul id="menu-1-50f7f4e8" className="elementor-nav-menu">
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1053">
                            <a href="https://almargen-media.com/seguridad/" className="elementor-item">Seguridad</a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1052">
                            <a href="https://almargen-media.com/delitos-ambientales/" className="elementor-item">Delitos ambientales</a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1051">
                            <a href="https://almargen-media.com/sin-evidencia/" className="elementor-item">Sin Evidencia</a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1968">
                            <a href="https://almargen-media.com/especiales/" className="elementor-item">Especiales</a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-895">
                            <a href="https://almargen-media.com/opinion/" className="elementor-item">Opinión</a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1506">
                            <a href="https://almargen-media.com/quienes-somos/" className="elementor-item">¿Quiénes somos?</a>
                          </li>
                        </ul>
                      </nav>
                      
                      <div className="elementor-menu-toggle" role="button" tabIndex="0" aria-label="Menu Toggle" aria-expanded="false">
                        <i aria-hidden="true" role="presentation" className="elementor-menu-toggle__icon--open eicon-menu-bar"></i>
                        <i aria-hidden="true" role="presentation" className="elementor-menu-toggle__icon--close eicon-close"></i>
                        <span className="elementor-screen-only">Menu</span>
                      </div>
                      
                      <nav className="elementor-nav-menu--dropdown elementor-nav-menu__container" role="navigation" aria-hidden="true">
                        <ul id="menu-2-50f7f4e8" className="elementor-nav-menu">
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1053">
                            <a href="https://almargen-media.com/seguridad/" className="elementor-item" tabIndex="-1">Seguridad</a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1052">
                            <a href="https://almargen-media.com/delitos-ambientales/" className="elementor-item" tabIndex="-1">Delitos ambientales</a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1051">
                            <a href="https://almargen-media.com/sin-evidencia/" className="elementor-item" tabIndex="-1">Sin Evidencia</a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1968">
                            <a href="https://almargen-media.com/especiales/" className="elementor-item" tabIndex="-1">Especiales</a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-895">
                            <a href="https://almargen-media.com/opinion/" className="elementor-item" tabIndex="-1">Opinión</a>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1506">
                            <a href="https://almargen-media.com/quienes-somos/" className="elementor-item" tabIndex="-1">¿Quiénes somos?</a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>

                  {/* Menú secundario */}
                  <section className="elementor-section elementor-inner-section elementor-element elementor-element-0556281 elementor-section-boxed elementor-section-height-default elementor-section-height-default wpr-particle-no wpr-jarallax-no wpr-parallax-no wpr-sticky-section-no" 
                    id="menu-extra" data-id="0556281" data-element_type="section">
                    
                    <div className="elementor-container elementor-column-gap-default">
                      <div className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-c563224" 
                        data-id="c563224" data-element_type="column">
                        
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div className="elementor-element elementor-element-ccef1fb elementor-nav-menu__align-left elementor-nav-menu--dropdown-tablet elementor-nav-menu__text-align-aside elementor-nav-menu--toggle elementor-nav-menu--burger elementor-widget elementor-widget-nav-menu" 
                            id="#menu-secundario" data-settings='{"layout":"horizontal","submenu_icon":{"value":"<i class=\"fas fa-caret-down\"><\/i>","library":"fa-solid"},"toggle":"burger"}' 
                            data-widget_type="nav-menu.default">
                            
                            <div className="elementor-widget-container">
                              <nav migration_allowed="1" migrated="0" role="navigation" className="elementor-nav-menu--main elementor-nav-menu__container elementor-nav-menu--layout-horizontal e--pointer-underline e--animation-fade">
                                <ul id="menu-1-ccef1fb" className="elementor-nav-menu">
                                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-234">
                                    <a href="https://almargen-media.com/quienes-somos/" className="elementor-item">¿Quiénes somos?</a>
                                  </li>
                                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-233">
                                    <a href="https://almargen-media.com/contacto/" className="elementor-item">Contacto</a>
                                  </li>
                                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-530">
                                    <a href="https://almargen-media.com/suscripcion/" className="elementor-item">Suscripción</a>
                                  </li>
                                </ul>
                              </nav>
                              
                              <div className="elementor-menu-toggle" role="button" tabIndex="0" aria-label="Menu Toggle" aria-expanded="false">
                                <i aria-hidden="true" role="presentation" className="elementor-menu-toggle__icon--open eicon-menu-bar"></i>
                                <i aria-hidden="true" role="presentation" className="elementor-menu-toggle__icon--close eicon-close"></i>
                                <span className="elementor-screen-only">Menu</span>
                              </div>
                              
                              <nav className="elementor-nav-menu--dropdown elementor-nav-menu__container" role="navigation" aria-hidden="true">
                                <ul id="menu-2-ccef1fb" className="elementor-nav-menu">
                                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-234">
                                    <a href="https://almargen-media.com/quienes-somos/" className="elementor-item" tabIndex="-1">¿Quiénes somos?</a>
                                  </li>
                                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-233">
                                    <a href="https://almargen-media.com/contacto/" className="elementor-item" tabIndex="-1">Contacto</a>
                                  </li>
                                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-530">
                                    <a href="https://almargen-media.com/suscripcion/" className="elementor-item" tabIndex="-1">Suscripción</a>
                                  </li>
                                </ul>
                              </nav>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <div className="elementor-element elementor-element-f94229c elementor-widget-divider--view-line elementor-widget elementor-widget-divider" 
                    data-id="f94229c" data-element_type="widget" data-widget_type="divider.default">
                    
                    <div className="elementor-widget-container">
                      <div className="elementor-divider">
                        <span className="elementor-divider-separator"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Header Mobile - Oculto en desktop */}
          <section className="elementor-section elementor-top-section elementor-element elementor-element-13e5de4 elementor-hidden-desktop elementor-section-full_width elementor-section-height-default elementor-section-height-default wpr-particle-no wpr-jarallax-no wpr-parallax-no wpr-sticky-section-no" 
            data-settings='{"background_background":"classic","sticky":"top","sticky_on":["desktop","tablet","mobile"],"sticky_offset":0,"sticky_effects_offset":0}'>
            
            {/* Contenido móvil - simplificado para React */}
            <div className="elementor-container elementor-column-gap-default">
              <div className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-b90dd2f" data-id="b90dd2f" data-element_type="column">
                <div className="elementor-widget-wrap elementor-element-populated">
                  {/* Menú móvil */}
                </div>
              </div>
              <div className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-d79211c" data-id="d79211c" data-element_type="column">
                <div className="elementor-widget-wrap elementor-element-populated">
                  {/* Logo móvil */}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </header>
  );
};

export default Header;