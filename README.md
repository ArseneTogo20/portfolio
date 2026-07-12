# Cyber-Portfolio | Data Scientist & Analyste Géospatial

Ce dépôt contient le code source de mon portfolio professionnel. Conçu sous la forme d'un tableau de bord de commande spatial/cyberpunk, il combine une esthétique premium avec une architecture statique hautement optimisée.

## 🚀 Fonctionnalités Clés

* **Design Expert & Cyberpunk** : Une interface immersive sur le thème de la console, développée avec des animations géométriques interactives et du CSS moderne et fluide.
* **Terminal de Commande Interactif** : Un simulateur de terminal Linux dans le footer permettant aux visiteurs d'exécuter des commandes :
  * `--help` / `help` : Affiche la liste des commandes disponibles.
  * `--list-skills` / `skills` : Synthétise la stack technique (SIG, BI, Pipelines de données).
  * `--list-projects` / `projects` : Affiche les archives de projets interactifs.
  * `locate` : Renvoie les coordonnées géographiques spatiales du nœud (Lomé, Togo).
  * `contact` : Affiche les canaux sécurisés de communication.
  * `clear` : Nettoie l'écran du terminal.
* **Panneau d'Administration en Direct** : Un système autonome et sécurisé permettant de modifier le contenu textuel et d'importer des images en Base64 sans nécessiter de base de données.
* **Exportateur Statique Autonome** : L'outil d'exportation génère une version épurée du code HTML de production en retirant proprement tous les composants de l'interface d'administration.

---

## 🛠️ Stack Technique

* **Structure & Sémantique** : HTML5 sémantique et respectueux du SEO.
* **Mise en page & Design** : CSS3 Vanilla (Responsive Design, Flexbox, CSS Grid, variables personnalisées, et animations fluides).
* **Logique & Interactivité** : JavaScript ES6 (manipulation dynamique du DOM, simulation de terminal).
* **Base de données / Asset Storage** : 100% statique (stockage local ou encodage Base64 des médias pour une portabilité totale).

---

## 💻 Installation & Lancement Local

Aucune dépendance lourde n'est requise. Vous pouvez lancer le site localement en clonant le dépôt :

```bash
# Cloner le dépôt
git clone https://github.com/ArseneTogo20/portfolio.git

# Accéder au dossier
cd portfolio
```

Puis, ouvrez simplement le fichier `index.html` dans votre navigateur ou lancez un serveur de développement léger :

```bash
# Avec Python
python -m http.server 8000
```
Accédez ensuite à l'adresse `http://localhost:8000`.

---

## ⚙️ Utilisation du Mode Administration Local

Le portfolio intègre un mode éditeur en direct pour mettre à jour vos données en local de manière autonome :

1. Faites défiler la page jusqu'au footer (droite du copyright).
2. **Double-cliquez** sur le texte `[MODE: SECURE_STATIC]`.
3. Entrez la clé d'accès configurée dans vos fichiers sources (définie par la constante `PASSWORD_ADMIN` dans `app.js`).
4. Vous pouvez désormais éditer n'importe quel texte directement à l'écran et modifier les images (profil, projets) via les boutons de survol.
5. Une fois terminé, cliquez sur **Exporter en Statique** dans le volet d'administration supérieur pour télécharger le fichier `index.html` propre, prêt pour la production.

> [!IMPORTANT]
> **Règle de Cybersécurité** : Pour empêcher les visiteurs d'activer ce panneau d'édition sur votre version publique en ligne, modifiez la valeur de `PASSWORD_ADMIN` dans `app.js` avec votre propre clé secrète personnelle avant de pousser vos modifications sur GitHub.
