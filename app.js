document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. MENU RESPONSIVE (HAMBURGER)
    // ==========================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Fermer le menu lors du clic sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // ==========================================
    // 2. SECTIONS ACTIVES AU DEFILEMENT (INTERSECTION OBSERVER)
    // ==========================================
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -70% 0px', // Active la section quand elle est au milieu
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // ==========================================
    // 3. CANVAS INTERACTIF (RÉSEAU SPATIAL / CONSTELLATION)
    // ==========================================
    const canvas = document.getElementById('spatial-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let points = [];
        let numPoints = 85;
        let maxDistance = 120;
        let mouse = { x: null, y: null, radius: 150 };

        // Ajuster la taille du canvas
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Adapter le nombre de points selon la taille de l'écran
            if (canvas.width < 768) {
                numPoints = 35;
                maxDistance = 80;
            } else {
                numPoints = 85;
                maxDistance = 120;
            }
            initPoints();
        }

        class Point {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                // Vitesse modérée pour un rendu calme et organique
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Collision avec les bords
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                // Interaction avec la souris (Répulsion subtile)
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const dist = Math.hypot(dx, dy);
                    
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        // Pousse doucement le point en dehors du champ de la souris
                        this.x += (dx / dist) * force * 0.8;
                        this.y += (dy / dist) * force * 0.8;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = '#00f0ff'; // Cyan
                ctx.fill();
            }
        }

        function initPoints() {
            points = [];
            for (let i = 0; i < numPoints; i++) {
                points.push(new Point());
            }
        }

        function drawLines() {
            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    const dx = points[i].x - points[j].x;
                    const dy = points[i].y - points[j].y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < maxDistance) {
                        // Plus la distance est courte, plus la ligne est opaque
                        const alpha = (1 - (dist / maxDistance)) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(points[i].x, points[i].y);
                        ctx.lineTo(points[j].x, points[j].y);
                        // Gradient entre cyan et vert
                        ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
                        ctx.lineWidth = 0.75;
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            points.forEach(point => {
                point.update();
                point.draw();
            });

            drawLines();
            requestAnimationFrame(animate);
        }

        // Écouteurs d'événements
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Lancement
        resizeCanvas();
        animate();
    }

    // ==========================================
    // 4. TERMINAL INTERACTIF DE CONTACT
    // ==========================================
    const contactTerminal = document.getElementById('contact-terminal');
    const userInputSpan = document.getElementById('terminal-user-input');
    const quickCmdBtns = document.querySelectorAll('.btn-cmd');

    if (contactTerminal && userInputSpan) {
        // Simuler la frappe et l'exécution d'une commande
        function executeTerminalCommand(cmd) {
            userInputSpan.textContent = '';
            let index = 0;
            
            // Effet d'écriture (typewriter)
            const typingInterval = setInterval(() => {
                if (index < cmd.length) {
                    userInputSpan.textContent += cmd[index];
                    index++;
                } else {
                    clearInterval(typingInterval);
                    // Attendre un petit instant et exécuter
                    setTimeout(() => {
                        processCommand(cmd);
                    }, 250);
                }
            }, 55);
        }

        // Logique de traitement des commandes
        function processCommand(cmd) {
            const trimmedCmd = cmd.trim().toLowerCase();
            
            // Créer le conteneur de sortie
            const outputDiv = document.createElement('div');
            outputDiv.className = 'terminal-output';

            // Gérer les différentes commandes
            if (trimmedCmd === 'help' || trimmedCmd === '--help') {
                outputDiv.innerHTML = `
                    Commandes disponibles :<br>
                    - <span class="text-cyan">skills</span> : Affiche les compétences techniques clés.<br>
                    - <span class="text-cyan">projects</span> : Affiche les archives des projets.<br>
                    - <span class="text-cyan">locate</span> : Coordonnées spatiales de Lomé.<br>
                    - <span class="text-cyan">clear</span> : Nettoie l'écran du terminal.<br>
                    - <span class="text-cyan">contact</span> : Affiche les informations de communication sécurisées.
                `;
            } else if (trimmedCmd === 'skills' || trimmedCmd === '--list-skills') {
                outputDiv.innerHTML = `
                    ========================================<br>
                    [SKILLS INDEX - KODJO ARSENE ATTIKPO]<br>
                    ========================================<br>
                    - SIG & Web-Mapping : PostGIS | QGIS | GeoServer | MapStore | GEE<br>
                    - Visualisation & BI : Tableau | Power BI | Grafana | Streamlit<br>
                    - Pipeline de Données : Python (GeoPandas) | Airflow | ETL<br>
                    - Collecte de Données : Web Scraping avancé | APIs<br>
                    - Sécurité des flux  : Cybersécurité & RBAC
                `;
            } else if (trimmedCmd === 'projects' || trimmedCmd === 'projets' || trimmedCmd === '--list-projects') {
                outputDiv.innerHTML = `
                    ========================================<br>
                    [ARCHIVES DES PROJETS - K.A. ATTIKPO]<br>
                    ========================================<br>
                    - <span class="text-cyan">PROJET_01</span> : Cartographie Sociale & Décisionnelle<br>
                      &nbsp;&nbsp;Plateforme d'aide à la décision pour infrastructures (Togo).<br>
                      &nbsp;&nbsp;[Django | PostGIS | Leaflet | GeoPandas]<br>
                    - <span class="text-cyan">PROJET_02</span> : Supervision Spatiale Réseau<br>
                      &nbsp;&nbsp;Dashboard d'observabilité temps réel d'incidents télécom.<br>
                      &nbsp;&nbsp;[Grafana | PostgreSQL | Airflow | Telegraf]
                `;
            } else if (trimmedCmd === 'locate') {
                outputDiv.innerHTML = `
                    LATITUDE : 6.1372° N<br>
                    LONGITUDE: 1.2125° E<br>
                    STATUS   : Lomé, Togo [West Africa Node]
                `;
            } else if (trimmedCmd === 'contact') {
                outputDiv.innerHTML = `
                    EMAIL    : arsene.thedatascientist@gmail.com<br>
                    TEL      : +228 99 59 57 66<br>
                    LINKEDIN : linkedin.com/in/kodjo-arsene-attikpo-963311247/
                `;
            } else if (trimmedCmd === 'clear' || trimmedCmd === '--clear') {
                // Nettoyer toutes les sorties précédentes
                const lines = contactTerminal.querySelectorAll('.terminal-output, .terminal-line:not(.prompt-interactive)');
                lines.forEach(line => line.remove());
                userInputSpan.textContent = '';
                return;
            } else {
                outputDiv.innerHTML = `
                    <span style="color: #ef4444;">[ERROR] Command not found: '${cmd}'.</span><br>
                    Tapez <span class="text-cyan">help</span> pour voir la liste des commandes.
                `;
            }

            // Ré-insérer la ligne de commande validée au-dessus de l'invite interactive
            const validatedLine = document.createElement('div');
            validatedLine.className = 'terminal-line';
            validatedLine.innerHTML = `<span class="terminal-prompt">visitor@attikpo:~$</span> <span class="terminal-cmd">${cmd}</span>`;
            
            // Insérer avant l'invite de commande interactive
            const promptLine = contactTerminal.querySelector('.prompt-interactive');
            contactTerminal.insertBefore(validatedLine, promptLine);
            contactTerminal.insertBefore(outputDiv, promptLine);

            // Réinitialiser le prompt utilisateur
            userInputSpan.textContent = '';
            
            // Scroller vers le bas
            contactTerminal.scrollTop = contactTerminal.scrollHeight;
        }

        // Associer les clics sur les boutons rapides
        quickCmdBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cmd = e.target.getAttribute('data-cmd');
                executeTerminalCommand(cmd);
            });
        });
    }

    // ==========================================
    // 5. MODE ADMINISTRATEUR LOCAL
    // ==========================================
    const modeTrigger = document.getElementById('system-mode-trigger');
    const adminModal = document.getElementById('admin-modal');
    const closeAdminBtn = document.getElementById('close-admin-modal');
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminPasswordInput = document.getElementById('admin-password');
    const loginError = document.getElementById('login-error');
    const adminPanel = document.getElementById('admin-panel');
    const logoutBtn = document.getElementById('admin-logout');
    const exportBtn = document.getElementById('admin-export-html');
    const addExpBtn = document.getElementById('admin-add-exp');
    const addEduBtn = document.getElementById('admin-add-edu');
    const addProjBtn = document.getElementById('admin-add-project');

    const PASSWORD_ADMIN = 'admin'; // Mot de passe admin local

    // Activer le modal de connexion sur double-clic
    if (modeTrigger) {
        modeTrigger.addEventListener('dblclick', () => {
            adminModal.classList.add('open');
            adminPasswordInput.focus();
        });
    }

    // Fermer le modal
    if (closeAdminBtn) {
        closeAdminBtn.addEventListener('click', () => {
            adminModal.classList.remove('open');
            loginError.classList.remove('show');
            adminPasswordInput.value = '';
        });
    }

    // Validation du formulaire de connexion
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (adminPasswordInput.value === PASSWORD_ADMIN) {
                sessionStorage.setItem('portfolio_admin', 'true');
                adminModal.classList.remove('open');
                loginError.classList.remove('show');
                adminPasswordInput.value = '';
                activateAdminMode();
            } else {
                loginError.classList.add('show');
                adminPasswordInput.select();
            }
        });
    }

    // Déconnexion
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('portfolio_admin');
            window.location.reload();
        });
    }

    // Rétablir le mode admin si déjà connecté dans la session
    if (sessionStorage.getItem('portfolio_admin') === 'true') {
        activateAdminMode();
    }

    function activateAdminMode() {
        if (adminPanel) {
            adminPanel.classList.add('open');
        }

        // Rendre les champs de profil textuels modifiables en direct
        const editables = document.querySelectorAll(
            '.hero-title, .hero-bio, .skill-title, .skill-description, ' +
            '.timeline-role, .timeline-company, .timeline-location, .timeline-details li, ' +
            '.card-title-sub, .card-institution, .card-text, .section-title, .copyright, ' +
            '.project-meta, .project-title, .project-description, .project-tags span'
        );

        editables.forEach(elem => {
            elem.setAttribute('contenteditable', 'true');
            elem.classList.add('admin-editable-active');
        });

        // Configurer l'édition d'image pour le profil
        setupProfileImageEditor();

        // Configurer l'édition d'image pour les projets existants
        setupProjectsImageEditors();

        // Rattacher les boutons Supprimer
        attachDeleteButtons();
    }

    function setupProfileImageEditor() {
        const profileContainer = document.querySelector('.hero-profile-container');
        if (profileContainer && !profileContainer.querySelector('.profile-edit-overlay')) {
            profileContainer.classList.add('admin-profile-active');
            
            // Créer l'overlay
            const overlay = document.createElement('div');
            overlay.className = 'profile-edit-overlay';
            overlay.innerHTML = `
                <svg class="edit-overlay-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                </svg>
                <span>Changer la photo</span>
            `;
            
            // Créer le file input
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.style.display = 'none';
            fileInput.id = 'admin-profile-file-input';
            
            // Événement pour ouvrir le sélecteur
            overlay.addEventListener('click', () => {
                fileInput.click();
            });
            
            // Événement quand l'image est sélectionnée
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const img = profileContainer.querySelector('.hero-profile-img');
                        if (img) {
                            img.src = event.target.result;
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
            
            profileContainer.appendChild(overlay);
            profileContainer.appendChild(fileInput);
        }
    }

    function setupProjectsImageEditors() {
        const wrappers = document.querySelectorAll('.project-img-wrapper');
        wrappers.forEach(wrapper => {
            if (!wrapper.querySelector('.project-edit-overlay')) {
                wrapper.classList.add('admin-project-active');
                
                // Créer l'overlay
                const overlay = document.createElement('div');
                overlay.className = 'project-edit-overlay';
                overlay.innerHTML = `
                    <svg class="edit-overlay-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                        <circle cx="12" cy="13" r="4"></circle>
                    </svg>
                    <span>Modifier l'image</span>
                `;
                
                // Créer le file input
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*';
                fileInput.style.display = 'none';
                fileInput.className = 'admin-project-file-input';
                
                // Événement pour ouvrir le sélecteur
                overlay.addEventListener('click', () => {
                    fileInput.click();
                });
                
                // Événement quand l'image est sélectionnée
                fileInput.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            const img = wrapper.querySelector('.project-img');
                            if (img) {
                                img.src = event.target.result;
                            }
                        };
                        reader.readAsDataURL(file);
                    }
                });
                
                wrapper.appendChild(overlay);
                wrapper.appendChild(fileInput);
            }
        });
    }

    function attachDeleteButtons() {
        // Supprimer d'anciens boutons pour éviter les doublons
        document.querySelectorAll('.btn-delete-card').forEach(btn => btn.remove());

        // Ajouter un bouton supprimer sur chaque élément de la timeline
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            const btn = document.createElement('button');
            btn.className = 'btn-delete-card';
            btn.textContent = '❌ Supprimer';
            btn.addEventListener('click', () => {
                if (confirm('Voulez-vous vraiment supprimer cette expérience de la frise ?')) {
                    item.remove();
                }
            });
            item.appendChild(btn);
        });

        // Ajouter un bouton supprimer sur chaque carte formation
        const eduCards = document.querySelectorAll('.edu-card');
        eduCards.forEach(card => {
            const btn = document.createElement('button');
            btn.className = 'btn-delete-card';
            btn.textContent = '❌ Supprimer';
            btn.addEventListener('click', () => {
                if (confirm('Voulez-vous vraiment supprimer cette carte ?')) {
                    card.remove();
                }
            });
            card.appendChild(btn);
        });

        // Ajouter un bouton supprimer sur chaque carte projet
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            const btn = document.createElement('button');
            btn.className = 'btn-delete-card';
            btn.textContent = '❌ Supprimer';
            btn.addEventListener('click', () => {
                if (confirm('Voulez-vous vraiment supprimer ce projet ?')) {
                    card.remove();
                }
            });
            card.appendChild(btn);
        });
    }

    // Ajouter une nouvelle expérience dans la timeline
    if (addExpBtn) {
        addExpBtn.addEventListener('click', () => {
            const timeline = document.querySelector('.timeline');
            if (timeline) {
                const newItem = document.createElement('div');
                newItem.className = 'timeline-item';
                newItem.innerHTML = `
                    <div class="timeline-dot"></div>
                    <div class="timeline-date admin-editable-active" contenteditable="true">Période (ex: Janv. 2026 – En cours)</div>
                    <div class="timeline-content">
                        <div class="timeline-header">
                            <h3 class="timeline-role admin-editable-active" contenteditable="true">Nouveau Poste</h3>
                            <span class="timeline-company admin-editable-active" contenteditable="true">Entreprise / Projet</span>
                        </div>
                        <div class="timeline-location admin-editable-active" contenteditable="true">Lieu (ex: Lomé, Togo)</div>
                        <ul class="timeline-details">
                            <li class="admin-editable-active" contenteditable="true">Description de la réalisation clé (double-cliquez pour éditer).</li>
                        </ul>
                    </div>
                `;
                timeline.insertBefore(newItem, timeline.firstChild);
                attachDeleteButtons();
                newItem.querySelector('.timeline-role').focus();
            }
        });
    }

    // Ajouter un nouvel élément formation ou engagement
    if (addEduBtn) {
        addEduBtn.addEventListener('click', () => {
            const firstColList = document.querySelector('.edu-col:first-of-type .card-list');
            if (firstColList) {
                const newCard = document.createElement('article');
                newCard.className = 'edu-card';
                newCard.innerHTML = `
                    <div class="card-meta admin-editable-active" contenteditable="true">Période / Date</div>
                    <h4 class="card-title-sub admin-editable-active" contenteditable="true">Nouveau Diplôme ou Engagement</h4>
                    <p class="card-institution admin-editable-active" contenteditable="true">Institution ou Organisme</p>
                    <p class="card-text admin-editable-active" contenteditable="true">Description des activités et des apprentissages clés.</p>
                `;
                firstColList.insertBefore(newCard, firstColList.firstChild);
                attachDeleteButtons();
                newCard.querySelector('.card-title-sub').focus();
            }
        });
    }

    // Ajouter un nouveau projet
    if (addProjBtn) {
        addProjBtn.addEventListener('click', () => {
            const grid = document.querySelector('.projects-grid');
            if (grid) {
                const newCard = document.createElement('article');
                newCard.className = 'project-card';
                newCard.innerHTML = `
                    <div class="project-img-wrapper">
                        <img src="https://api.dicebear.com/7.x/identicon/svg?seed=new-project&backgroundColor=070a13" alt="Nouveau Projet" class="project-img">
                    </div>
                    <div class="project-content">
                        <div class="project-meta admin-editable-active" contenteditable="true">PROJET_00 // SIG & DEVELOPPEMENT</div>
                        <h3 class="project-title admin-editable-active" contenteditable="true">Titre du Nouveau Projet</h3>
                        <p class="project-description admin-editable-active" contenteditable="true">
                            Description détaillée du projet (double-cliquez pour éditer).
                        </p>
                        <div class="project-tags">
                            <span class="admin-editable-active" contenteditable="true">Tag1</span>
                            <span class="admin-editable-active" contenteditable="true">Tag2</span>
                        </div>
                        <div class="project-links">
                            <a href="#" class="project-link-btn" target="_blank">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                                Voir le Projet
                            </a>
                        </div>
                    </div>
                `;
                grid.insertBefore(newCard, grid.firstChild);
                setupProjectsImageEditors();
                attachDeleteButtons();
                newCard.querySelector('.project-title').focus();
            }
        });
    }

    // Exporter le document propre sans l'interface d'édition
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            // Cloner le DOM complet
            const clone = document.documentElement.cloneNode(true);

            // Retirer le modal d'authentification
            const adminModalClone = clone.querySelector('#admin-modal');
            if (adminModalClone) adminModalClone.remove();

            // Retirer le panneau de contrôle
            const adminPanelClone = clone.querySelector('#admin-panel');
            if (adminPanelClone) adminPanelClone.remove();

            // Retirer tous les boutons supprimer
            clone.querySelectorAll('.btn-delete-card').forEach(btn => btn.remove());

            // Retirer les overlays d'édition de photo et inputs files de l'admin
            clone.querySelectorAll('.profile-edit-overlay, .project-edit-overlay, #admin-profile-file-input, .admin-project-file-input').forEach(elem => elem.remove());

            // Retirer les classes actives de l'admin sur les conteneurs d'images
            const profileContainerClone = clone.querySelector('.hero-profile-container');
            if (profileContainerClone) {
                profileContainerClone.classList.remove('admin-profile-active');
            }
            clone.querySelectorAll('.project-img-wrapper').forEach(wrapper => {
                wrapper.classList.remove('admin-project-active');
            });

            // Retirer les attributs et classes d'édition de tous les éléments éditables
            const editablesClone = clone.querySelectorAll('[contenteditable]');
            editablesClone.forEach(elem => {
                elem.removeAttribute('contenteditable');
                elem.classList.remove('admin-editable-active');
            });

            // Nettoyer les styles de déclenchement du footer
            const triggerClone = clone.querySelector('#system-mode-trigger');
            if (triggerClone) {
                triggerClone.removeAttribute('style');
                triggerClone.removeAttribute('title');
            }

            // Générer le fichier propre index.html
            const doctype = "<!DOCTYPE html>\n";
            const finalHtml = doctype + clone.outerHTML;

            const blob = new Blob([finalHtml], { type: 'text/html;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = 'index.html';
            document.body.appendChild(link);
            link.click();
            
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        });
    }
});
