document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен');
    
    // Получаем все пакеты
    const packages = document.querySelectorAll('.complex-package');
    const discountPackages = document.querySelectorAll('.discount-package');
    
    console.log('Найдено комплексных пакетов:', packages.length);
    console.log('Найдено пакетов со скидками:', discountPackages.length);
    
    // Модальное окно для пакетов
    const packageModal = document.getElementById('packageModal');
    console.log('Модальное окно найдено:', !!packageModal);
    const packageModalCloseBtn = packageModal?.querySelector('.modal__close');
    
    // Функция для открытия модального окна
    function openPackageModal(packageTitle) {
        try {
            if (!packageModal) {
                console.error('Модальное окно не найдено');
                return;
            }
            const modalTitle = packageModal.querySelector('.modal__title');
            if (modalTitle) {
                modalTitle.textContent = `Заказать пакет: ${packageTitle}`;
            }
            packageModal.classList.add('modal--active');
            document.body.style.overflow = 'hidden';
        } catch (error) {
            console.error('Ошибка при открытии модального окна:', error);
        }
    }
    
    // Обработчики для комплексных пакетов
    packages.forEach(package => {
        try {
            // При наведении на пакет
            package.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            });

            // При уходе курсора с пакета
            package.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        } catch (error) {
            console.error('Ошибка при обработке комплексного пакета:', error);
        }
    });

    // Обработчики для пакетов со скидками
    discountPackages.forEach(package => {
        try {
            // При наведении на пакет
            package.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            });

            // При уходе курсора с пакета
            package.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        } catch (error) {
            console.error('Ошибка при обработке пакета со скидкой:', error);
        }
    });

    // Закрытие модального окна пакетов
    if (packageModalCloseBtn) {
        packageModalCloseBtn.addEventListener('click', () => {
            packageModal.classList.remove('modal--active');
            document.body.style.overflow = '';
        });
    }

    if (packageModal) {
        packageModal.addEventListener('click', (e) => {
            if (e.target === packageModal) {
                packageModal.classList.remove('modal--active');
                document.body.style.overflow = '';
            }
        });
    }

    // Обработка отправки формы заказа пакета
    const packageModalForm = packageModal.querySelector('.modal__form');
    if (packageModalForm) {
        packageModalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Здесь можно добавить отправку данных на сервер
            alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
            packageModal.classList.remove('modal--active');
            document.body.style.overflow = '';
            packageModalForm.reset();
        });
    }

    // Анимация появления элементов при скролле
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Наблюдаем за всеми пакетами
    packages.forEach(package => {
        package.style.opacity = '0';
        package.style.transform = 'translateY(20px)';
        package.style.transition = 'all 0.5s ease';
        observer.observe(package);
    });

    // Модальное окно
    const modal = document.getElementById('callbackModal');
    const modalOpenBtn = document.querySelector('.btn--outline');
    const modalCloseBtn = document.querySelector('.modal__close');
    
    console.log('Modal:', modal);
    console.log('Open button:', modalOpenBtn);
    console.log('Close button:', modalCloseBtn);

    if (modalOpenBtn) {
        modalOpenBtn.addEventListener('click', () => {
            console.log('Кнопка нажата');
            modal.classList.add('modal--active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            modal.classList.remove('modal--active');
            document.body.style.overflow = '';
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('modal--active');
                document.body.style.overflow = '';
            }
        });
    }

    // Обработка плавающих подписей
    const inputs = document.querySelectorAll('.input-wrapper input, .input-wrapper textarea');
    
    inputs.forEach(input => {
        // Установка placeholder для работы с :placeholder-shown
        input.setAttribute('placeholder', ' ');
        
        // Инициализация состояния при загрузке
        if (input.value.trim() !== '') {
            input.classList.add('has-value');
        }
        
        // Обработка фокуса и ввода
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            if (input.value.trim() === '') {
                input.classList.remove('has-value');
            }
        });
        
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
    });

    // Маска для телефона
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            e.target.value = !x[2] ? x[1] : '+7 (' + x[2] + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
            
            if (e.target.value.trim() !== '') {
                e.target.classList.add('has-value');
            } else {
                e.target.classList.remove('has-value');
            }
        });
    });

    // Анимация кнопки отправки
    const submitButtons = document.querySelectorAll('.btn--black');
    submitButtons.forEach(button => {
        button.addEventListener('mouseover', () => {
            const icon = button.querySelector('.btn-icon');
            if (icon) {
                icon.style.transform = 'translateX(5px)';
            }
        });
        
        button.addEventListener('mouseout', () => {
            const icon = button.querySelector('.btn-icon');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
    });

    // Обработка отправки формы
    const contactForm = document.querySelector('.contacts__form .form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const button = contactForm.querySelector('.btn--black');
            const buttonText = button.querySelector('.btn-text');
            const buttonIcon = button.querySelector('.btn-icon');
            
            // Анимация отправки
            button.style.width = button.offsetWidth + 'px';
            buttonText.textContent = 'Отправка...';
            buttonIcon.style.opacity = '0';
            button.disabled = true;
            
            try {
                // Здесь будет логика отправки формы
                await new Promise(resolve => setTimeout(resolve, 1500)); // Имитация отправки
                
                // Успешная отправка
                buttonText.textContent = 'Отправлено!';
                button.style.backgroundColor = '#4CAF50';
                
                // Сброс формы
                setTimeout(() => {
                    contactForm.reset();
                    buttonText.textContent = 'Отправить';
                    buttonIcon.style.opacity = '1';
                    button.style.backgroundColor = '';
                    button.disabled = false;
                    button.style.width = '';
                    
                    // Сброс состояния полей
                    inputs.forEach(input => {
                        input.parentElement.classList.remove('has-value', 'focused');
                    });
                }, 2000);
                
            } catch (error) {
                // Обработка ошибки
                buttonText.textContent = 'Ошибка';
                button.style.backgroundColor = '#f44336';
                
                setTimeout(() => {
                    buttonText.textContent = 'Отправить';
                    buttonIcon.style.opacity = '1';
                    button.style.backgroundColor = '';
                    button.disabled = false;
                    button.style.width = '';
                }, 2000);
            }
        });
    }

    // Обработка кнопки "Обсудить проект"
    const discussButton = document.querySelector('.producing__button');
    if (discussButton) {
        discussButton.addEventListener('click', () => {
            const contactsSection = document.querySelector('.contacts');
            if (contactsSection) {
                contactsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Обработка кнопок в шапке
    const headerLinks = document.querySelectorAll('.nav__list a');
    headerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile Menu
    const burger = document.querySelector('.header__burger');
    const nav = document.querySelector('.nav');

    burger.addEventListener('click', () => {
        burger.classList.toggle('header__burger--active');
        nav.classList.toggle('nav--active');
        document.body.classList.toggle('no-scroll');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav__list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('header__burger--active');
            nav.classList.remove('nav--active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('nav--active')) {
            burger.classList.remove('header__burger--active');
            nav.classList.remove('nav--active');
            document.body.classList.remove('no-scroll');
        }
    });

    // Функция для загрузки видео через blob URL
    async function loadVideoAsBlob(videoElement) {
        const source = videoElement.querySelector('source');
        if (!source) return;

        try {
            // Проверяем, является ли URL уже blob URL
            if (source.src.startsWith('blob:')) {
                return source.src;
            }

            const response = await fetch(source.src, {
                method: 'GET',
                mode: 'cors',
                credentials: 'same-origin'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            
            // Создаем новый source элемент
            const newSource = document.createElement('source');
            newSource.src = blobUrl;
            newSource.type = 'video/mp4';
            
            // Заменяем старый source
            videoElement.removeChild(source);
            videoElement.appendChild(newSource);
            
            // Загружаем видео
            await videoElement.load();
            
            return blobUrl;
        } catch (error) {
            console.error('Ошибка при загрузке видео:', error);
            // В случае ошибки возвращаем оригинальный URL
            return source.src;
        }
    }

    // Функция для безопасного воспроизведения видео
    async function safePlayVideo(video) {
        return new Promise((resolve, reject) => {
            let playAttempts = 0;
            const maxAttempts = 3;

            function attemptPlay() {
                if (playAttempts >= maxAttempts) {
                    reject(new Error('Превышено максимальное количество попыток воспроизведения'));
                    return;
                }

                playAttempts++;
                
                // Проверяем готовность видео
                if (video.readyState >= 2) {
                    video.play()
                        .then(() => {
                            console.log('Видео успешно воспроизведено');
                            resolve();
                        })
                        .catch(error => {
                            console.log(`Попытка ${playAttempts} не удалась:`, error);
                            // Пробуем еще раз через небольшую задержку
                            setTimeout(attemptPlay, 500);
                        });
                } else {
                    // Если видео еще не готово, ждем события loadeddata
                    video.addEventListener('loadeddata', attemptPlay, { once: true });
                }
            }

            // Начинаем попытки воспроизведения
            requestAnimationFrame(attemptPlay);
        });
    }

    // Инициализация видео
    async function initVideos() {
        const videos = document.querySelectorAll('.video-player');
        
        // Создаем IntersectionObserver для отслеживания видимости видео
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    // Видео видимо, пытаемся воспроизвести
                    if (video.paused) {
                        safePlayVideo(video).catch(error => {
                            console.log('Не удалось воспроизвести видео:', error);
                        });
                    }
                } else {
                    // Видео не видимо, останавливаем
                    if (!video.paused) {
                        video.pause();
                    }
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '50px'
        });
        
        for (const video of videos) {
            try {
                // Устанавливаем атрибуты для надежного воспроизведения
                video.muted = true;
                video.playsInline = true;
                video.preload = 'auto';
                
                // Добавляем обработчики событий
                video.addEventListener('error', (e) => {
                    console.error('Ошибка воспроизведения видео:', e);
                });

                video.addEventListener('loadeddata', () => {
                    observer.observe(video);
                });

                // Загружаем видео через blob URL
                await loadVideoAsBlob(video);
            } catch (error) {
                console.error('Ошибка при инициализации видео:', error);
            }
        }
    }

    // Инициализация карусели видео
    async function initVideoCarousels() {
        const carousels = document.querySelectorAll('.service-card__video-carousel');
        
        for (const carousel of carousels) {
            const wrappers = carousel.querySelectorAll('.service-card__video-wrapper');
            const dots = carousel.querySelectorAll('.service-card__video-dot');
            const prevBtn = carousel.querySelector('.service-card__video-nav-btn--prev');
            const nextBtn = carousel.querySelector('.service-card__video-nav-btn--next');
            let currentIndex = 0;

            async function showSlide(index) {
                wrappers.forEach(wrapper => wrapper.style.display = 'none');
                dots.forEach(dot => dot.classList.remove('service-card__video-dot--active'));
                
                wrappers[index].style.display = 'block';
                dots[index].classList.add('service-card__video-dot--active');
                
                // Останавливаем все видео
                wrappers.forEach(wrapper => {
                    const video = wrapper.querySelector('video');
                    if (video) {
                        video.pause();
                    }
                });
                
                // Запускаем текущее видео
                const currentVideo = wrappers[index].querySelector('video');
                if (currentVideo) {
                    try {
                        // Загружаем видео через blob URL
                        await loadVideoAsBlob(currentVideo);
                        // Пытаемся воспроизвести видео
                        await safePlayVideo(currentVideo);
                    } catch (error) {
                        console.log('Не удалось воспроизвести видео в карусели:', error);
                    }
                }
                
                currentIndex = index;
            }

            // Обработчики для точек
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => showSlide(index));
            });

            // Обработчики для кнопок навигации
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    const newIndex = (currentIndex - 1 + wrappers.length) % wrappers.length;
                    showSlide(newIndex);
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    const newIndex = (currentIndex + 1) % wrappers.length;
                    showSlide(newIndex);
                });
            }

            // Инициализация первого слайда
            await showSlide(0);
        }
    }

    // Вызываем инициализацию при загрузке страницы
    document.addEventListener('DOMContentLoaded', async () => {
        await initVideos();
        await initVideoCarousels();
    });

    // Автоматическое воспроизведение видео
    const videoWrappers = document.querySelectorAll('.service-card__video-wrapper');
    
    videoWrappers.forEach(wrapper => {
        const video = wrapper.querySelector('video');
        if (video) {
            video.muted = true;
            video.play().catch(error => {
                console.log('Автовоспроизведение не удалось:', error);
            });
        }
    });

    // Управление звуком видео
    const carousels = document.querySelectorAll('.service-card__video-carousel');
    
    carousels.forEach(carousel => {
        const wrappers = carousel.querySelectorAll('.service-card__video-wrapper');
        const dots = carousel.querySelectorAll('.service-card__video-dot');
        const prevBtn = carousel.querySelector('.service-card__video-nav-btn--prev');
        const nextBtn = carousel.querySelector('.service-card__video-nav-btn--next');
        let currentIndex = 0;
        
        // Сохраняем состояние звука для каждого видео
        const soundStates = new Map();
        
        function showSlide(index) {
            wrappers.forEach(wrapper => wrapper.style.display = 'none');
            dots.forEach(dot => dot.classList.remove('service-card__video-dot--active'));
            
            wrappers[index].style.display = 'block';
            dots[index].classList.add('service-card__video-dot--active');
            
            // Останавливаем все видео
            wrappers.forEach(wrapper => {
                const video = wrapper.querySelector('video');
                if (video) {
                    video.pause();
                    // Сохраняем состояние звука перед остановкой
                    soundStates.set(wrapper, video.muted);
                }
            });
            
            // Запускаем текущее видео
            const currentVideo = wrappers[index].querySelector('video');
            if (currentVideo) {
                currentVideo.muted = soundStates.get(wrappers[index]) ?? true; // По умолчанию muted
                currentVideo.play().catch(error => {
                    console.log('Автовоспроизведение не удалось:', error);
                });
                
                // Обновляем состояние кнопки звука
                const soundButton = wrappers[index].querySelector('.sound-button');
                if (soundButton) {
                    if (!currentVideo.muted) {
                        soundButton.classList.add('sound-button--unmuted');
                    } else {
                        soundButton.classList.remove('sound-button--unmuted');
                    }
                }
            }
            
            currentIndex = index;
        }
        
        // Обработчики для точек
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });
        
        // Обработчики для кнопок
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const newIndex = (currentIndex - 1 + wrappers.length) % wrappers.length;
                showSlide(newIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const newIndex = (currentIndex + 1) % wrappers.length;
                showSlide(newIndex);
            });
        }
        
        // Управление звуком
        const soundButtons = carousel.querySelectorAll('.sound-button');
        
        soundButtons.forEach(button => {
            const wrapper = button.closest('.service-card__video-wrapper');
            const video = wrapper.querySelector('video');
            
            button.addEventListener('click', () => {
                if (video.muted) {
                    video.muted = false;
                    button.classList.add('sound-button--unmuted');
                } else {
                    video.muted = true;
                    button.classList.remove('sound-button--unmuted');
                }
                // Сохраняем новое состояние звука
                soundStates.set(wrapper, video.muted);
            });
        });
        
        // Инициализация первого слайда
        showSlide(0);
    });
}); 