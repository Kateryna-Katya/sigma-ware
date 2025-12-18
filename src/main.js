document.addEventListener('DOMContentLoaded', () => {
    // 1. ИНИЦИАЛИЗАЦИЯ ИКОНОК
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. МОБИЛЬНОЕ МЕНЮ
    const burger = document.querySelector('.header__burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu__link, .mobile-menu .btn');

    const toggleMenu = () => {
        burger.classList.toggle('header__burger--active');
        mobileMenu.classList.toggle('mobile-menu--active');
        document.body.classList.toggle('no-scroll');
    };

    if (burger) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('mobile-menu--active')) {
                toggleMenu();
            }
        });
    });

    // 3. FAQ АККОРДЕОН
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('faq-item--active');
            faqItems.forEach(el => el.classList.remove('faq-item--active'));
            if (!isActive) {
                item.classList.add('faq-item--active');
            }
        });
    });

    // 4. ГЕНЕРАЦИЯ КАПЧИ
    const captchaText = document.getElementById('captchaQuestion');
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const captchaSum = num1 + num2;
    
    if (captchaText) {
        captchaText.innerText = `${num1} + ${num2} = `;
    }

    // 5. ВАЛИДАЦИЯ ТЕЛЕФОНА (Только цифры и +)
    const phoneInput = document.getElementById('phoneInput');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^\d+]/g, '');
        });
    }

    // 6. ОБРАБОТКА ФОРМЫ (ИСПРАВЛЕНО)
    const contactForm = document.getElementById('contactForm');
    const successMsg = document.getElementById('successMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const userCaptcha = document.getElementById('captchaInput').value;
            
            // Проверка капчи
            if (parseInt(userCaptcha) !== captchaSum) {
                alert('Ошибка в капче! Пожалуйста, решите пример правильно.');
                return;
            }

            // Имитация отправки (AJAX)
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            
            submitBtn.innerText = 'Отправка...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Скрываем форму и показываем успех
                contactForm.style.display = 'none';
                successMsg.style.display = 'block';
                
                // Плавное появление сообщения об успехе
                if (typeof gsap !== 'undefined') {
                    gsap.from(successMsg, { 
                        opacity: 0, 
                        y: 20, 
                        duration: 0.6,
                        ease: "power2.out"
                    });
                }
            }, 1500);
        });
    }

    // 7. COOKIE POPUP
    const cookiePopup = document.getElementById('cookiePopup');
    const acceptBtn = document.getElementById('acceptCookies');

    if (cookiePopup && !localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookiePopup.classList.add('cookie-popup--active');
        }, 2000);
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookiePopup.classList.remove('cookie-popup--active');
        });
    }

    // 8. АНИМАЦИИ ПРИ СКРОЛЛЕ
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Анимация текста Hero (SplitType)
        if (typeof SplitType !== 'undefined') {
            const heroTitle = new SplitType('.hero__title', { types: 'words, chars' });
            gsap.from(heroTitle.chars, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.02,
                ease: "power4.out"
            });
        }

        // Появление секций
        document.querySelectorAll('.section').forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                },
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "power2.out"
            });
        });
    }
    // --- ЛОГИКА МОДАЛЬНОГО ОКНА ---
const modal = document.getElementById('marketingModal');
const closeModal = document.getElementById('closeModal');
const modalForm = document.getElementById('modalForm');

// Функция открытия
const openMarketingModal = () => {
    if (!localStorage.getItem('modalShown')) {
        modal.classList.add('modal--active');
        document.body.classList.add('no-scroll');
    }
};

// 1. Показать через 10 секунд
setTimeout(openMarketingModal, 10000);

// 2. Показать при попытке уйти (exit intent)
document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 0) {
        openMarketingModal();
    }
});

// Закрытие
const closeAllModals = () => {
    modal.classList.remove('modal--active');
    document.body.classList.remove('no-scroll');
    localStorage.setItem('modalShown', 'true'); // Больше не показываем
};

closeModal.addEventListener('click', closeAllModals);
modal.querySelector('.modal__overlay').addEventListener('click', closeAllModals);

// Обработка формы в модалке
if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = modalForm.querySelector('button');
        btn.innerText = 'Отправлено!';
        setTimeout(closeAllModals, 1500);
    });
    }
    // --- COOKIE CONSENT LOGIC ---
const initCookieConsent = () => {
    const cookieBar = document.getElementById('cookieConsent');
    const acceptBtn = document.getElementById('cookieAccept');
    const declineBtn = document.getElementById('cookieDecline');

    // Если решение еще не принято
    if (!localStorage.getItem('sigma_cookie_status')) {
        setTimeout(() => {
            cookieBar.classList.add('cookie-bar--active');
        }, 2000); // Показываем через 2 сек после загрузки
    }

    const saveChoice = (choice) => {
        localStorage.setItem('sigma_cookie_status', choice);
        cookieBar.classList.remove('cookie-bar--active');
    };

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => saveChoice('accepted'));
    }

    if (declineBtn) {
        declineBtn.addEventListener('click', () => saveChoice('declined'));
    }
};

// Вызовите эту функцию внутри вашего основного обработчика DOMContentLoaded
initCookieConsent();
});