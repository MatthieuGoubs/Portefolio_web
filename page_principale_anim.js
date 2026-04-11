document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================================================
    // 1. SÉLECTION DES ÉLÉMENTS & VARIABLES GLOBALES
    // ==========================================================================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const langToggle = document.getElementById('lang-toggle'); // Nouveau
    const langText = document.getElementById('lang-text');     // Nouveau
    const body = document.body;
    const menuToggle = document.getElementById('menu-toggle');
    const navRight = document.querySelector('.nav-right');
    const navLinks = document.querySelectorAll('.nav-links a');
    const heroSection = document.querySelector('.hero-section');

    // État de la langue
    let currentLang = localStorage.getItem('language') || 'fr';

    // ==========================================================================
    // 2. DICTIONNAIRE DE TRADUCTION
    // ==========================================================================
    const translations = {
        'fr': {
            'nav_name': 'Matthieu Goubert - ', 'nav_job': 'Géomaticien & Développeur SIG Webmapping',
            'nav_home': 'Accueil', 'nav_about': 'À propos', 'nav_skills': 'Compétences', 'nav_projects': 'Projets', 'nav_contact': 'Contact',
            'hero_h2': 'Ingénieur Géomaticien | Développeur SIG Webmapping Full-stack',
            'hero_subtitle': 'Analyse et valorisation des données territoriales à travers des applications cartographiques interactives.',
            'hero_tagline': 'De la donnée à la décision : conception d’outils SIG pour comprendre les territoires.',
            'hero_btn_projects': '→ Voir mes projets', 'hero_btn_portal': '→ Explorer le portail',
            'about_title': 'À propos',
            'about_lead': 'Ingénieur géomaticien de formation, j\'ai choisi de spécialiser mon approche sur la <strong>maîtrise du flux de données spatiales</strong>.',
            'about_p2': 'Mon métier consiste à orchestrer le parcours de l\'information géographique : depuis son extraction et son traitement <span class="tech-tag">(Python, R, PostGIS, ... )</span> jusqu\'à sa valorisation dans des interfaces web interactives <strong>cross-platform</strong> <span class="tech-tag">(Leaflet, React, Cesium, ... )</span>.',
            'about_p3': 'Je conçois des outils interactifs optimisés pour le <strong>terrain et la mobilité</strong>, garantissant un accès fluide à la donnée complexe, que ce soit sur poste fixe ou smartphone.',
            'about_goal': 'Mon objectif : garantir la continuité et l\'intégrité de la donnée pour offrir une expérience de visualisation qui serve réellement la prise de décision.',
            'about_history': 'Géomaticien de formation, j’ai débuté chez <strong>MENARD Terrassements</strong> sur des études de Défense Extérieure Contre les Incendies, ce qui m’a, par la suite, amené à m’orienter vers le <strong>développement SIG web</strong>. J’ai ensuite approfondi ces domaines en <strong>Master SIGMA</strong> à Toulouse, en alternance au <strong>Conservatoire d\'Espaces Naturels Pays de la Loire</strong>.',
            'journey_title': 'Mon Parcours',
            'time_sigma_app': 'Master SIGMA & Alternance', 'time_sigma_app_loc': '<strong>Toulouse INP - ENSAT</strong> / <strong>CEN Nantes</strong>',
            'time_sigma_app_desc': 'Analyse des ressources territoriales. Étude des écosystèmes et gestion de bases de données foncières.',
            'time_sigma_edu': 'Master SIGMA (Formation)', 'time_sigma_edu_desc': 'Sciences Géomatiques en Environnement et Aménagement du Territoire. Spécialisation en programmation informatique.',
            'time_menard': 'Chargé d\'études SIG', 'time_menard_desc': 'Gestion et expertise de données DECI et déploiement de SIG opérationnels pour les collectivités.',
            'time_licence': 'Licence Pro SIG DAT', 'time_licence_desc': 'Diagnostic territorial, aménagement et maîtrise des outils fondamentaux (QGIS, ArcGIS, SQL).',
            'time_bac': 'Baccalauréat Scientifique', 'time_bac_desc': 'Option Sciences de la Vie et de la Terre.',
            'outside_title': 'Et en dehors de la géomatique ...',
            'int_tennis': 'Tennis', 'int_tennis_tip': 'Compétition & Loisir',
            'int_metal': 'Metal', 'int_metal_tip': 'Concerts & Festivals',
            'int_reading': 'Lecture', 'int_reading_tip': 'Histoire & BD',
            'int_tech': 'Veille tech', 'int_tech_tip': 'Innovations Web & SIG',
            'skills_title': 'COMPÉTENCES', 'sk_acq': 'Acquisition de données', 'sk_field': 'Collecte terrain (QField)',
            'sk_proc': 'Traitement & Préparation', 'sk_auto': 'Automatisation (Python, PyQGIS)',
            'sk_stats': 'Analyse & Statistique', 'sk_ml': 'Machine learning appliqué',
            'sk_viz': 'Restitution', 'sk_infra': 'Infrastructure',
            'proj_title': 'Projets', 'proj_map': 'Carte interactive', 'proj_dash': 'Dashboard', 'proj_soon': 'A venir [...]', 'proj_link_soon': 'Bientôt disponible',
            'contact_title': 'Contact', 'contact_send': 'Envoyer'
        },
        'en': {
            'nav_name': 'Matthieu Goubert - ', 'nav_job': 'Geomatics Specialist & Web Mapping GIS Developer',
            'nav_home': 'Home', 'nav_about': 'About', 'nav_skills': 'Skills', 'nav_projects': 'Projects', 'nav_contact': 'Contact',
            'hero_h2': 'Geospatial Engineer | Full-stack GIS Webmapping Developer',
            'hero_subtitle': 'Analysis and enhancement of territorial data through interactive mapping applications.',
            'hero_tagline': 'From data to decision: designing GIS tools to understand territories.',
            'hero_btn_projects': '→ View my projects', 'hero_btn_portal': '→ Explore the portal',
            'about_title': 'About Me',
            'about_lead': 'A GIS engineer by training, I have focused my expertise on <strong>mastering the geospatial data flow</strong>.',
            'about_p2': 'My job consists of orchestrating the journey of geographic information: from extraction and processing <span class="tech-tag">(Python, R, PostGIS, ... )</span> to its enhancement in <strong>cross-platform</strong> interactive web interfaces <span class="tech-tag">(Leaflet, React, Cesium, ... )</span>.',
            'about_p3': 'I design interactive tools optimized for <strong>fieldwork and mobility</strong>, ensuring fluid access to complex data, whether on a workstation or a smartphone.',
            'about_goal': 'My goal: ensure data continuity and integrity to provide a visualization experience that truly serves decision-making.',
            'about_history': 'Starting my career at <strong>MENARD Terrassements</strong> working on Fire Protection studies, I naturally transitioned towards <strong>Web GIS development</strong>. I further deepened these skills through the <strong>SIGMA Master’s degree</strong> in Toulouse, while working as an apprentice at the <strong>CEN Pays de la Loire</strong>.',
            'journey_title': 'My Journey',
            'time_sigma_app': 'SIGMA Master & Apprenticeship', 'time_sigma_app_loc': '<strong>Toulouse INP - ENSAT</strong> / <strong>CEN Nantes</strong>',
            'time_sigma_app_desc': 'Analysis of territorial resources. Study of ecosystems and management of land tenure databases.',
            'time_sigma_edu': 'SIGMA Master (Education)', 'time_sigma_edu_desc': 'Geomatic Sciences in Environment and Territorial Planning. Specialization in computer programming.',
            'time_menard': 'GIS Specialist', 'time_menard_desc': 'Management and expertise of DECI data and deployment of operational GIS for local authorities.',
            'time_licence': 'Professional Bachelor’s in GIS', 'time_licence_desc': 'Territorial diagnostics, planning, and mastery of fundamental tools (QGIS, ArcGIS, SQL).',
            'time_bac': 'Scientific Baccalaureate', 'time_bac_desc': 'Life and Earth Sciences specialty.',
            'outside_title': 'Outside of Geomatics...',
            'int_tennis': 'Tennis', 'int_tennis_tip': 'Competition & Leisure',
            'int_metal': 'Metal', 'int_metal_tip': 'Concerts & Festivals',
            'int_reading': 'Reading', 'int_reading_tip': 'History & Comics',
            'int_tech': 'Tech Watch', 'int_tech_tip': 'Web & GIS Innovations',
            'skills_title': 'SKILLS', 'sk_acq': 'Data Acquisition', 'sk_field': 'Field Collection (QField)',
            'sk_proc': 'Processing & Preparation', 'sk_auto': 'Automation (Python, PyQGIS)',
            'sk_stats': 'Analysis & Statistics', 'sk_ml': 'Applied Machine Learning',
            'sk_viz': 'Visualization', 'sk_infra': 'Infrastructure',
            'proj_title': 'Projects', 'proj_map': 'Interactive Map', 'proj_dash': 'Dashboard', 'proj_soon': 'Coming soon [...]', 'proj_link_soon': 'Available soon',
            'contact_title': 'Contact', 'contact_send': 'Send'
        }
    };

    // ==========================================================================
    // 3. FONCTION DE TRADUCTION
    // ==========================================================================
    function updateContent() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                // Utilisation de innerHTML pour conserver les balises <strong> et <span class="tech-tag">
                el.innerHTML = translations[currentLang][key];
            }
        });

        // Mise à jour des placeholders du formulaire
        const nameInput = document.querySelector('input[name="name"]');
        const emailInput = document.querySelector('input[name="email"]');
        const msgInput = document.querySelector('textarea[name="message"]');
        
        if (currentLang === 'en') {
            if(nameInput) nameInput.placeholder = "Name";
            if(emailInput) emailInput.placeholder = "Email";
            if(msgInput) msgInput.placeholder = "Your message";
            if(langText) langText.innerText = "FR";
        } else {
            if(nameInput) nameInput.placeholder = "Nom";
            if(emailInput) emailInput.placeholder = "Email";
            if(msgInput) msgInput.placeholder = "Votre message";
            if(langText) langText.innerText = "EN";
        }
    }

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'fr' ? 'en' : 'fr';
            localStorage.setItem('language', currentLang);
            updateContent();
        });
    }

    // Initialisation du contenu
    updateContent();

    // ==========================================================================
    // 4. GESTION DU MENU MOBILE (BURGER LOGIC)
    // ==========================================================================
    if (menuToggle && navRight) {
        menuToggle.addEventListener('change', () => {
            navRight.style.right = menuToggle.checked ? "0" : "-100%";
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.checked = false;
                navRight.style.right = "-100%";
            });
        });

        document.addEventListener('click', (e) => {
            const burgerLabel = document.querySelector('.menu-burger');
            if (menuToggle.checked && !navRight.contains(e.target) && !burgerLabel.contains(e.target) && e.target !== menuToggle) {
                menuToggle.checked = false;
                navRight.style.right = "-100%";
            }
        });
    }

    // ==========================================================================
    // 5. CONFIGURATION DE LA CARTE (LEAFLET)
    // ==========================================================================
    const franceBounds = L.latLngBounds(L.latLng(41.0, -5.5), L.latLng(51.5, 10.0));
    
    const map = L.map('map', {
        center: [47.5, -0.5],
        zoom: 7,
        minZoom: 5,
        maxZoom: 18,
        maxBounds: franceBounds,
        maxBoundsViscosity: 1.0,
        tap: false
    });

    function updateMapLayer(isDark) {
        map.eachLayer(layer => { if (layer instanceof L.TileLayer) map.removeLayer(layer); });

        const newUrl = isDark 
            ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' 
            : 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';

        const attribution = isDark ? '© CartoDB' : '© OpenStreetMap';

        L.tileLayer(newUrl, { attribution: attribution, maxZoom: 18 }).addTo(map);
    }

    // ==========================================================================
    // 6. GESTION DU THÈME (JOUR / NUIT)
    // ==========================================================================
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            if (themeIcon) {
                themeIcon.classList.toggle('fa-moon', !isDark);
                themeIcon.classList.toggle('fa-sun', isDark);
            }
            updateMapLayer(isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    updateMapLayer(body.classList.contains('dark-mode'));

    // ==========================================================================
    // 7. DONNÉES & MARQUEURS (SIG)
    // ==========================================================================
    const points = [
        { coords: [49.305080, -1.238937], title: "Lycée Sivard de Beaulieu", type: 'education', icon: 'fa-graduation-cap' },
        { coords: [49.192914, -0.363068], title: "Université de Caen Normandie", type: 'education', icon: 'fa-university' },
        { coords: [49.305895, -1.092138], title: "Menard Terrassements", type: 'work', icon: 'fa-briefcase' },
        { coords: [43.5283, 1.4880], title: "Toulouse INP - ENSAT", type: 'education', icon: 'fa-user-graduate' },
        { coords: [47.207175, -1.562269], title: "CEN Pays de la Loire", type: 'work', icon: 'fa-seedling' }
    ];

    function createCustomIcon(pointData) {
        const typeClass = pointData.type === 'work' ? 'marker-work' : 'marker-education';
        return L.divIcon({
            html: `<div class="custom-marker ${typeClass}"><i class="fas ${pointData.icon}"></i></div>`,
            className: '', 
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
        });
    }

    const markers = points.map(pt => {
        return L.marker(pt.coords, { icon: createCustomIcon(pt) })
                .addTo(map)
                .bindPopup(`<b>${pt.title}</b>`);
    });

    // Interaction Timeline -> Carte
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item) => {
        item.addEventListener('click', function() {
            const idx = parseInt(this.getAttribute('data-index')) - 1; 
            const target = points[idx];
            if (target) {
                map.flyTo(target.coords, 14, { animate: true, duration: 1.5 });
                setTimeout(() => { markers[idx].openPopup(); }, 1500);
            }
        });
    });

    if (markers.length > 0) {
        const group = new L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.1));
    }

    // ==========================================================================
    // 8. EFFET NAVBAR AU SCROLL
    // ==========================================================================
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            body.classList.toggle('scrolled', !entry.isIntersecting);
        });
    }, { threshold: 0.1 });

    if (heroSection) navObserver.observe(heroSection);
});