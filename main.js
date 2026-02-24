document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('main-header');
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const fullscreenMenu = document.getElementById('fullscreen-menu');
    
    const settingsPanel = document.getElementById('settings-panel');
    
    const settingsBackBtn = document.getElementById('settings-back-btn');
    const specialFeaturesBtn = document.getElementById('special-features-btn');

    const tabItems = document.querySelectorAll('.nav-item');
    const tabViews = document.querySelectorAll('.tab-view');
    const navIndicator = document.querySelector('.nav-indicator');

    // --- DRAG WINDOW LOGIC ---
    let zIndexCounter = 3001;
    
    function makeDraggable(panel) {
        const header = panel.querySelector('.drag-handle');
        if(!header) return;

        let isDragging = false;
        let offsetX, offsetY;

        header.addEventListener('mousedown', (e) => {
            // Yalnız desktopda işləsin
            if(window.innerWidth < 768) return;

            isDragging = true;
            panel.style.zIndex = ++zIndexCounter; // Önə gətir
            
            // Transformu ləğv etmək üçün class əlavə et
            panel.classList.add('dragging');

            // Cari pozisiyanı hesabla (transform: none olduqda left/top işləyir)
            const rect = panel.getBoundingClientRect();
            
            // İlk sürükləmədə (əgər hələ positionlanmayıbsa)
            if (!panel.style.left) {
                panel.style.left = rect.left + 'px';
                panel.style.top = rect.top + 'px';
                // Transformu vizual olaraq sıfırla ki, tullanma olmasın
                panel.style.transform = 'none';
            }

            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        function onMouseMove(e) {
            if (!isDragging) return;
            let x = e.clientX - offsetX;
            let y = e.clientY - offsetY;
            
            // Ekran kənarlarına çıxmağın qarşısını almaq (optional)
            if(y < 0) y = 0;
            
            panel.style.left = x + 'px';
            panel.style.top = y + 'px';
        }

        function onMouseUp() {
            isDragging = false;
            panel.classList.remove('dragging');
            panel.classList.add('positioned'); // Artıq koordinatları var
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    }

    // Pəncərə funksiyaları (Windows stilində)
    function setupWindowControls(panel) {
        const closeBtn = panel.querySelector('.close-btn');
        const maxBtn = panel.querySelector('.max-btn');
        const minBtn = panel.querySelector('.min-btn');

        // Pəncərəni açanda mərkəzləşdir (reset)
        panel.resetPosition = function() {
            panel.style.left = '';
            panel.style.top = '';
            panel.style.transform = ''; // CSS-ə qayıt
            panel.classList.remove('positioned');
            panel.classList.remove('maximized');
            panel.style.zIndex = ++zIndexCounter;
        };

        // Clickləyəndə önə gətir
        panel.addEventListener('mousedown', () => {
            panel.style.zIndex = ++zIndexCounter;
        });

        if(closeBtn) closeBtn.addEventListener('click', () => {
            panel.classList.remove('active');
        });

        if(minBtn) minBtn.addEventListener('click', () => {
            // Minimize hələlik bağlamaq kimi işləsin (Taskbar yoxdur)
            panel.classList.remove('active');
        });

        if(maxBtn) maxBtn.addEventListener('click', () => {
            panel.classList.toggle('maximized');
        });
        
        makeDraggable(panel);
    }

    setupWindowControls(settingsPanel);

    // --- MENU LINKS ---
    function openPanel(panel) {
        fullscreenMenu.classList.remove('active');
        if(window.innerWidth >= 768) {
            if(panel.resetPosition) panel.resetPosition();
        }
        setTimeout(() => { panel.classList.add('active'); }, 100);
    }

    document.querySelector('a[href="#settings"]').addEventListener('click', (e) => {
        e.preventDefault(); openPanel(settingsPanel);
    });
    
    // Mobil Geri düymələri
    settingsBackBtn.addEventListener('click', () => { settingsPanel.classList.remove('active'); });


    // --- STANDARD JS (Scroll, Tabs, Theme, etc.) ---
    window.addEventListener('scroll', () => { header.classList.toggle('scrolled', window.scrollY > 50); });
    menuToggle.addEventListener('click', () => fullscreenMenu.classList.add('active'));
    menuClose.addEventListener('click', () => fullscreenMenu.classList.remove('active'));
    
    specialFeaturesBtn.addEventListener('click', () => { alert("Special Features tezliklə!"); });

    function updateIndicator() {
        const activeTab = document.querySelector('.nav-item.active');
        if (activeTab && navIndicator) {
            if (window.innerWidth >= 768) {
                navIndicator.style.top = activeTab.offsetTop + 'px';
                navIndicator.style.left = '10px';
                navIndicator.style.width = '60px'; navIndicator.style.height = '60px';
                navIndicator.style.borderRadius = '50%';
            } else {
                navIndicator.style.left = activeTab.offsetLeft + 'px';
                navIndicator.style.width = activeTab.offsetWidth + 'px';
                navIndicator.style.top = '0'; navIndicator.style.height = '100%';
                navIndicator.style.borderRadius = '20px';
            }
        }
    }
    tabItems.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            tabItems.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            updateIndicator();
            tabViews.forEach(view => view.classList.remove('active'));
            document.getElementById('view-' + target).classList.add('active');
            window.scrollTo(0, 0);
        });
    });
    window.addEventListener('resize', updateIndicator);
    setTimeout(updateIndicator, 100);

    // Settings Logic
    const themeLightBtn = document.getElementById('theme-light');
    const themeDarkBtn = document.getElementById('theme-dark');
    const themeSystemBtn = document.getElementById('theme-system');
    const textNormalBtn = document.getElementById('text-normal');
    const textLargeBtn = document.getElementById('text-large');
    const animOnBtn = document.getElementById('anim-on');
    const animOffBtn = document.getElementById('anim-off');
    const colorBtns = document.querySelectorAll('.color-btn');
    const langBtns = document.querySelectorAll('.lang-btn');
    const customColorBtn = document.getElementById('custom-color-btn');
    const customColorInput = document.getElementById('custom-color-input');

    customColorBtn.addEventListener('click', () => { customColorInput.click(); });
    customColorInput.addEventListener('input', (e) => { applyColor(e.target.value); });

     const translations = {
        az: {
            brand: "Taryel Hüseynzadə", 
            linkAbout: "Haqqında", linkLicense: "Açıq mənbə lisenziyası", linkHelp: "Kömək & Dəstək", linkSettings: "Ayarlar", 
            settingsTitle: "Ayarlar", aboutTitle: "Haqqında", langTitle: "Dil (Language)", accessTitle: "Xüsusi İmkanlar", labelText: "Mətn Ölçüsü", labelAnim: "Animasiyalar", textNorm: "Normal", textLarge: "Böyük", animOn: "Aktiv", animOff: "Dayandır", themeTitle: "Tema", themeLight: "İşıqlı", themeDark: "Qaranlıq", themeSystem: "Sistem", colorTitle: "Rəng Palitrası", welcome: "Xoş Gəlmisiniz!", welcomeDesc: "Səhifəni aşağı sürüşdürərək kəşf edin", 
            ytTitle: "YouTube Kanalım", ytDesc: "Videolarımı izləmək və yeniliklərdən xəbərdar olmaq üçün kanalıma abunə olun.", ytBtn: "Kanalı Ziyarət Et",
            videosViewTitle: "Videolar Bölməsi", articlesViewTitle: "Məqalələr Bölməsi",
            articlesTitle: "Məqalələr", articlesDesc: "Texnologiya və proqramlaşdırma haqqında yazılarım.", articlesBtn: "Oxu",
            tabHome: "Ev", tabVideos: "Videolar", tabArticles: "Məqalələr",
            watchText: "İzlə",
            video1Title: "Paketlənmiş məhsulların zərərləri", video1Date: "2 aprel 2023",
            video2Title: "Bayatı kürd muğamı", video2Date: "12 aprel 2024",
            customColor: "Fərdi"
        },
        en: {
            brand: "Taryel Huseynzade", 
            linkAbout: "About", linkLicense: "Open Source License", linkHelp: "Help & Support", linkSettings: "Settings", 
            settingsTitle: "Settings", aboutTitle: "About", langTitle: "Language", accessTitle: "Accessibility", labelText: "Text Size", labelAnim: "Animations", textNorm: "Normal", textLarge: "Large", animOn: "On", animOff: "Off", themeTitle: "Theme", themeLight: "Light", themeDark: "Dark", themeSystem: "System", colorTitle: "Color Palette", welcome: "Welcome!", welcomeDesc: "Scroll down to discover", 
            ytTitle: "My YouTube Channel", ytDesc: "Subscribe to my channel to watch videos and stay updated.", ytBtn: "Visit Channel",
            videosViewTitle: "Videos Section", articlesViewTitle: "Articles Section",
            articlesTitle: "Articles", articlesDesc: "My writings about technology and programming.", articlesBtn: "Read",
            tabHome: "Home", tabVideos: "Videos", tabArticles: "Articles",
            watchText: "Watch",
            video1Title: "Harms of packaged products", video1Date: "April 2, 2023",
            video2Title: "Bayati Kurd Mugham", video2Date: "April 12, 2024",
            customColor: "Custom"
        },
        ru: {
            brand: "Тариэль Гусейнзаде", 
            linkAbout: "О нас", linkLicense: "Лицензия Open Source", linkHelp: "Помощь и поддержка", linkSettings: "Настройки", 
            settingsTitle: "Настройки", aboutTitle: "О нас", langTitle: "Язык (Language)", accessTitle: "Спец. возможности", labelText: "Размер текста", labelAnim: "Анимации", textNorm: "Норма", textLarge: "Крупный", animOn: "Вкл", animOff: "Выкл", themeTitle: "Тема", themeLight: "Светлая", themeDark: "Тёмная", themeSystem: "Системная", colorTitle: "Цветовая палитра", welcome: "Добро пожаловать!", welcomeDesc: "Прокрутите вниз, чтобы узнать больше", 
            ytTitle: "Мой YouTube канал", ytDesc: "Подпишитесь на мой канал, чтобы смотреть видео и быть в курсе новостей.", ytBtn: "Посетить канал",
            videosViewTitle: "Раздел Видео", articlesViewTitle: "Раздел Статьи",
            articlesTitle: "Статьи", articlesDesc: "Мои статьи о технологиях и программировании.", articlesBtn: "Читать",
            tabHome: "Главная", tabVideos: "Видео", tabArticles: "Статьи",
            watchText: "Смотреть",
            video1Title: "Вред упакованных продуктов", video1Date: "2 апреля 2023",
            video2Title: "Мугам Баяты-Кюрд", video2Date: "12 апреля 2024",
            customColor: "Свой"
        }
    };

    function applyLanguage(lang) {
        langBtns.forEach(btn => { btn.classList.remove('active'); if(btn.dataset.lang === lang) btn.classList.add('active'); });
        const t = translations[lang];
        document.getElementById('txt-brand').textContent = t.brand;
        document.getElementById('link-about').textContent = t.linkAbout;
        document.getElementById('link-license').textContent = t.linkLicense;
        document.getElementById('link-help').textContent = t.linkHelp;
        document.getElementById('link-settings').textContent = t.linkSettings;
        
        document.getElementById('txt-settings-title').textContent = t.settingsTitle;
        document.getElementById('txt-lang-title').textContent = t.langTitle;
        document.getElementById('txt-access-title').textContent = t.accessTitle;
        document.getElementById('txt-label-text').textContent = t.labelText;
        document.getElementById('txt-label-anim').textContent = t.labelAnim;
        document.getElementById('text-normal').textContent = t.textNorm;
        document.getElementById('text-large').textContent = t.textLarge;
        document.getElementById('anim-on').textContent = t.animOn;
        document.getElementById('anim-off').textContent = t.animOff;
        document.getElementById('txt-theme-title').textContent = t.themeTitle;
        document.getElementById('theme-light').textContent = t.themeLight;
        document.getElementById('theme-dark').textContent = t.themeDark;
        document.getElementById('theme-system').textContent = t.themeSystem;
        document.getElementById('txt-color-title').textContent = t.colorTitle;
        document.getElementById('txt-welcome').textContent = t.welcome;
        document.getElementById('txt-welcome-desc').textContent = t.welcomeDesc;
        document.getElementById('txt-yt-title').textContent = t.ytTitle;
        document.getElementById('txt-yt-desc').textContent = t.ytDesc;
        document.getElementById('txt-yt-btn').textContent = t.ytBtn;
        
        document.getElementById('txt-videos-view-title').textContent = t.videosViewTitle;
        document.getElementById('txt-articles-view-title').textContent = t.articlesViewTitle;
        
        document.getElementById('txt-articles-title').textContent = t.articlesTitle;
        document.getElementById('txt-articles-desc').textContent = t.articlesDesc;
        document.getElementById('txt-articles-btn').textContent = t.articlesBtn;

        document.getElementById('txt-tab-home').textContent = t.tabHome;
        document.getElementById('txt-tab-videos').textContent = t.tabVideos;
        document.getElementById('txt-tab-articles').textContent = t.tabArticles;
        
        document.getElementById('txt-video-1-title').textContent = t.video1Title;
        document.getElementById('txt-video-1-date').textContent = t.video1Date;
        document.getElementById('txt-watch-1').innerHTML = t.watchText + ' &rarr;';
        
        document.getElementById('txt-video-2-title').textContent = t.video2Title;
        document.getElementById('txt-video-2-date').textContent = t.video2Date;
        document.getElementById('txt-watch-2').innerHTML = t.watchText + ' &rarr;';

        document.querySelector('.nav-item[data-target="home"]').setAttribute('data-text', t.tabHome);
        document.querySelector('.nav-item[data-target="videos"]').setAttribute('data-text', t.tabVideos);
        document.querySelector('.nav-item[data-target="articles"]').setAttribute('data-text', t.tabArticles);
        customColorBtn.setAttribute('title', t.customColor);
        localStorage.setItem('lang', lang);
    }
    langBtns.forEach(btn => btn.addEventListener('click', () => applyLanguage(btn.dataset.lang)));

    function setTextSize(size) { if(size==='large'){document.documentElement.classList.add('large-text'); textLargeBtn.classList.add('active'); textNormalBtn.classList.remove('active');}else{document.documentElement.classList.remove('large-text'); textNormalBtn.classList.add('active'); textLargeBtn.classList.remove('active');} localStorage.setItem('textSize', size); }
    function setAnimation(state) { if(state==='off'){document.documentElement.classList.add('no-anim'); animOffBtn.classList.add('active'); animOnBtn.classList.remove('active');}else{document.documentElement.classList.remove('no-anim'); animOnBtn.classList.add('active'); animOffBtn.classList.remove('active');} localStorage.setItem('animation', state); }
    textNormalBtn.addEventListener('click', () => setTextSize('normal')); textLargeBtn.addEventListener('click', () => setTextSize('large')); animOnBtn.addEventListener('click', () => setAnimation('on')); animOffBtn.addEventListener('click', () => setAnimation('off'));
    
    let rainbowInterval;
    function startRainbow() { let hue = 0; if (rainbowInterval) clearInterval(rainbowInterval); rainbowInterval = setInterval(() => { hue = (hue + 1) % 360; document.documentElement.style.setProperty('--primary-color', `hsl(${hue}, 100%, 50%)`); }, 50); }
    function stopRainbow() { if (rainbowInterval) { clearInterval(rainbowInterval); rainbowInterval = null; } }

    function applyColor(color) {
        if (color === 'rainbow') {
            startRainbow();
            document.body.classList.add('rainbow-mode');
            localStorage.setItem('primaryColor', 'rainbow');
        } else {
            stopRainbow();
            document.body.classList.remove('rainbow-mode');
            document.documentElement.style.setProperty('--primary-color', color);
            localStorage.setItem('primaryColor', color);
            if (!color.startsWith('#007bff') && !color.startsWith('#e74c3c') && !color.startsWith('#28a745') && !color.startsWith('#ffc107') && !color.startsWith('#9b59b6')) { customColorBtn.style.background = color; }
        }
        colorBtns.forEach(btn => { btn.classList.remove('active'); if (btn.getAttribute('data-color') === color) { btn.classList.add('active'); } else if (color !== 'rainbow' && !btn.getAttribute('data-color') && btn.id === 'custom-color-btn') { btn.classList.add('active'); } });
    }
    colorBtns.forEach(btn => { btn.addEventListener('click', () => { const color = btn.getAttribute('data-color'); if (color) applyColor(color); }); });

    function applyTheme(n){themeLightBtn.classList.remove('active');themeDarkBtn.classList.remove('active');themeSystemBtn.classList.remove('active');if(n==='light')themeLightBtn.classList.add('active');else if(n==='dark')themeDarkBtn.classList.add('active');else themeSystemBtn.classList.add('active');localStorage.setItem('theme',n);let e=n;if(n==='system')e=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';if(e==='dark')document.body.classList.add('dark-theme');else document.body.classList.remove('dark-theme');}
    themeLightBtn.addEventListener('click',()=>applyTheme('light'));themeDarkBtn.addEventListener('click',()=>applyTheme('dark'));themeSystemBtn.addEventListener('click',()=>applyTheme('system'));window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',e=>{if(localStorage.getItem('theme')==='system')applyTheme('system');});

    applyTheme(localStorage.getItem('theme') || 'system');
    const savedColor = localStorage.getItem('primaryColor') || 'rainbow'; 
    applyColor(savedColor);
    applyLanguage(localStorage.getItem('lang') || 'az');
    setTextSize(localStorage.getItem('textSize') || 'normal');
    setAnimation(localStorage.getItem('animation') || 'on');
});