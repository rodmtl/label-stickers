# SchoolStickerApp

Application web moderne pour créer, personnaliser et imprimer des feuilles d'étiquettes autocollantes adaptées aux besoins scolaires. Interface élégante avec design glassmorphism et fonctionnalités avancées.

## 🎯 Fonctionnalités

### Création d'étiquettes intelligente
- **Grille optimisée** : 14 lignes × 6 colonnes (84 étiquettes par feuille)
- **Dimensions précises** : 3cm × 1cm par étiquette, feuille 19.2cm × 15.7cm
- **Layout perfectionné** : Icône à gauche, texte sur 1-2 lignes à droite
- **Ajustement automatique** : Police 6-24px adaptée au contenu

### Interface utilisateur moderne
- **Design glassmorphism** : Interface élégante avec effets de transparence et gradients
- **Sélection d'icônes avancée** : Plus de 150 émojis dans popup organisé par catégories
  - 😀 Visages (30+ emojis)
  - 🐶 Animaux (30+ emojis) 
  - 🌸 Nature (30+ emojis)
  - 🍎 Nourriture (30+ emojis)
  - ⚽ Objets (30+ emojis)
  - ❤️ Symboles (30+ emojis)
- **Prévisualisation optimale** : Zoom fixé à 80% pour meilleure visualisation
- **Animations fluides** : Transitions et effets hover professionnels

### Fonctionnalités de remplissage avancées
- **Édition individuelle** : Clic sur sticker pour personnalisation complète
- **Emoji global** : Sélection d'emoji par défaut pour tous les remplissages
- **Remplir tous** : Application du même nom à tous les stickers en un clic
- **Remplissage en masse** : 
  - Saisie manuelle (un nom par ligne)
  - Import de fichiers .txt/.csv
  - Application automatique de l'emoji sélectionné

### Export et impression professionnels
- **Export PDF avancé** : A4, A3, Letter, Legal + **Taille originale (19.2×15.7cm)**
- **Orientation configurable** : Portrait/Paysage (sauf taille originale en paysage fixe)
- **Impression directe** : Optimisée sans bordures ni guides
- **Prévisualisation WYSIWYG** : Ce que vous voyez = ce qui sera imprimé

## 🚀 Installation et démarrage

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone <repository-url>
cd school-sticker-app

# Installer les dépendances
npm install

# Démarrer en développement
npm run dev
```

L'application sera accessible à l'adresse `http://localhost:3000`

### Commandes disponibles
```bash
npm run dev      # Démarrage en mode développement
npm run build    # Build de production
npm run start    # Démarrage en mode production
npm run lint     # Vérification du code
```

## 🏗️ Architecture technique

### Stack technologique
- **Framework** : Next.js 15 (App Router) avec Turbopack
- **Langage** : TypeScript en mode strict
- **Styles** : Tailwind CSS v3 avec composants personnalisés
- **Export PDF** : jsPDF + html2canvas pour haute qualité
- **Icônes** : 150+ émojis natifs organisés par catégories
- **Animations** : CSS pures avec classes Tailwind optimisées

### Structure du projet
```
src/
├── app/                    # Pages Next.js (App Router)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   └── globals.css        # Styles globaux
├── components/            # Composants React
│   ├── Sticker.tsx       # Composant étiquette individuelle
│   ├── StickerSheet.tsx  # Grille d'étiquettes
│   ├── StickerEditor.tsx # Éditeur d'étiquette
│   ├── IconSelector.tsx  # Sélecteur d'icônes
│   └── ControlPanel.tsx  # Panneau de contrôle
├── hooks/                # Hooks personnalisés
│   ├── useStickerApp.ts  # Gestion d'état global
│   └── useExport.ts      # Fonctionnalités d'export
├── types/                # Définitions TypeScript
│   └── index.ts          # Types globaux
└── constants/            # Constantes de l'application
    └── index.ts          # Configuration et données
```

### Principes de développement

#### SOLID
- **Single Responsibility** : Chaque composant a une responsabilité unique
- **Open/Closed** : Extensions possibles sans modification du code existant
- **Liskov Substitution** : Les composants sont interchangeables
- **Interface Segregation** : Interfaces spécifiques et ciblées
- **Dependency Inversion** : Dépendances via l'injection

#### DRY (Don't Repeat Yourself)
- Hooks personnalisés pour la logique réutilisable
- Composants modulaires et réutilisables
- Constantes centralisées
- Types TypeScript partagés

## 📋 Guide d'utilisation

### 1. Configuration initiale
1. **Définir l'emoji par défaut** : Cliquez sur le bouton emoji dans "Emoji par défaut"
2. **Ajuster la police** : Utilisez le slider pour la taille par défaut (8-24px)
3. **Prévisualisation optimale** : Zoom automatique à 80% pour meilleure visualisation

### 2. Création d'étiquettes
**Édition individuelle :**
1. Cliquez sur un sticker vide dans la grille 14×6
2. Saisissez le nom (max 20 caractères avec compteur)
3. Changez l'emoji si nécessaire via le popup
4. Ajustez la taille de police avec le slider
5. Visualisez l'aperçu en temps réel
6. Sauvegardez vos modifications

**Remplissage rapide :**
- **Tous identiques** : Utilisez "Remplir tous les stickers" pour appliquer le même nom aux 84 stickers
- **En masse** : Collez une liste de noms (un par ligne) dans "Remplissage en masse"
- **Import fichier** : Cliquez "Fichier" pour importer un .txt ou .csv

### 3. Export et impression professionnels
1. **Format de page** : 
   - 📐 **Taille originale (19.2×15.7cm)** - Recommandé pour découpe parfaite
   - 📄 A4, A3, Letter, Legal - Pour impression standard
2. **Orientation** : Portrait/Paysage (auto en paysage pour taille originale)
3. **Export PDF** : Génère un fichier haute qualité
4. **Impression directe** : Impression optimisée sans bordures

### 4. Fonctionnalités avancées
- **Interface moderne** : Sections colorées thématiques pour navigation intuitive
- **Aperçu intelligent** : Layout icône-gauche/texte-droite sur 1-2 lignes
- **Gestion d'état** : Sauvegarde automatique des modifications
- **Responsive design** : Interface adaptée mobile/tablette/desktop

## 🎨 Spécifications techniques des étiquettes

### Dimensions physiques
- **Étiquette individuelle** : 30mm × 10mm (3cm × 1cm)
- **Feuille complète** : 192mm × 157mm (19.2cm × 15.7cm)
- **Grille parfaite** : 14 lignes × 6 colonnes = 84 étiquettes
- **Distribution uniforme** : Calcul automatique des positions

### Layout optimisé icône-texte
- **Zone icône** : 25-30% largeur, positionnée à gauche, taille adaptée à la hauteur
- **Zone texte** : 70-75% largeur restante, 1-2 lignes, alignement vertical centré
- **Police adaptative** : 6px-24px avec ajustement automatique selon contenu
- **Espacement intelligent** : Marges et paddings calculés pour rendu optimal

### Algorithme de placement
- **Grille cellulaire** : `cellWidth = sheetWidth / 6`, `cellHeight = sheetHeight / 14`
- **Centrage automatique** : Chaque sticker centré dans sa cellule
- **Précision mathématique** : Position exacte `x = col * cellWidth + offset`
- **Responsive scaling** : Facteur d'échelle appliqué uniformément

## 🚀 Déploiement

### Vercel (recommandé)
```bash
# Build et déploiement automatique
npm run build
```

L'application est optimisée pour Vercel avec :
- Configuration Next.js adaptée
- Optimisation des images
- Compression gzip automatique
- CDN global

### Autres plateformes
L'application peut être déployée sur toute plateforme supportant Next.js :
- Netlify
- Heroku
- AWS Amplify
- Azure Static Web Apps

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez votre branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add: Amazing Feature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

### Standards de code
- **ESLint configuration stricte** : Règles Next.js + TypeScript
- **TypeScript strict mode** : Types stricts, no-any, exhaustive checks
- **Architecture SOLID** : Single responsibility, modulaire, extensible
- **Hooks personnalisés** : `useStickerApp`, `useExport` pour logique métier
- **Composants réutilisables** : Design system cohérent et maintenable

## 📞 Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Consultez la documentation en ligne
- Contactez l'équipe de développement

---

## 🚀 Nouvelles fonctionnalités v2.0

### Interface modernisée
- **Design glassmorphism** : Effets de transparence et gradients élégants
- **Sections colorées** : Navigation intuitive avec codes couleur thématiques
- **Animations fluides** : Transitions professionnelles, hover effects, scaling
- **Responsive perfectionné** : Optimisé mobile → desktop avec breakpoints intelligents

### Workflow optimisé
- **Emoji global** : Définition d'emoji par défaut pour tous les remplissages
- **Remplir tous** : Application d'un nom à tous les stickers en un clic
- **Zoom optimal fixe** : 80% pour meilleure visualisation, plus de confusion
- **Layout sticker perfectionné** : Icône gauche, texte 1-2 lignes droite

### Export professionnel
- **Taille originale** : Format exact 19.2×15.7cm pour découpe parfaite
- **Qualité haute résolution** : Export PDF avec échelle 2x pour netteté
- **Impression optimisée** : Suppression automatique guides et bordures

---

**SchoolStickerApp v2.0** - Interface moderne, workflow intelligent, qualité professionnelle ! 🎓✨🚀