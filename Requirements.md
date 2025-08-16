# SchoolStickerApp

## App requirements

Application web moderne pour la création, personnalisation et impression de feuilles d'étiquettes autocollantes adaptées aux besoins scolaires.

### Spécifications des étiquettes
- **Grille** : 14 lignes × 6 colonnes (84 étiquettes par feuille)
- **Dimensions sticker** : 3 cm de longueur × 1 cm de hauteur
- **Dimensions feuille** : 19.2 cm de largeur × 15.7 cm de hauteur
- **Layout sticker** : Icône positionnée à gauche, texte sur 1-2 lignes à droite

### Fonctionnalités principales
- **Sélection d'icônes** : Popup avec plus de 150 émojis organisés par catégories (Visages, Animaux, Nature, Nourriture, Objets, Symboles)
- **Personnalisation** : Ajustement automatique de la taille de police (6px-24px) selon le contenu
- **Prévisualisation** : Aperçu en temps réel de la feuille avec zoom optimal fixé à 80%
- **Remplissage intelligent** :
  - Édition individuelle par clic sur sticker
  - Remplissage en masse via texte ou import de fichier
  - Application d'un même nom à tous les stickers
  - Sélection d'emoji global par défaut
- **Export & Impression** :
  - Export PDF avec formats configurables (A4, A3, Letter, Legal, Taille originale)
  - Impression directe optimisée
  - Orientation configurable (Portrait/Paysage)

### Interface utilisateur moderne
- **Design élégant** : Interface glassmorphism avec gradients colorés
- **Animations fluides** : Transitions et effets hover professionnels
- **Responsive design** : Compatible desktop, tablette et mobile
- **Organisation intuitive** : Sections colorées thématiques dans le panneau de contrôle
- **Feedback visuel** : États hover, focus et sélection clairs

## Software design requirements

### Stack technique
- **Framework** : Next.js 15 avec App Router et TypeScript
- **Styles** : Tailwind CSS v3 pour un design moderne
- **Export PDF** : jsPDF + html2canvas pour génération PDF haute qualité
- **Architecture** : Composants modulaires avec hooks personnalisés

### Principes de développement
- **SOLID et DRY** : Architecture modulaire et réutilisable
- **Best practices Next.js** : App Router, TypeScript strict, optimisations performances
- **Librairies à jour** : Dépendances récentes sans warnings ni packages dépréciés
- **Documentation complète** : README.md détaillé avec architecture et guide d'utilisation

### Déploiement et compatibilité
- **Responsive design** : Interface adaptative sur tous les écrans
- **Optimisé Vercel** : Configuration déploiement automatique
- **Performance** : Build optimisé, lazy loading, compression assets
- **Licence MIT** : Code open source

### Améliorations implémentées
- **Interface moderne** : Design professionnel avec glassmorphism et gradients
- **UX optimisée** : Workflow intuitif, feedback visuel, animations
- **Fonctionnalités avancées** : Remplissage intelligent, export multiple formats
- **Architecture robuste** : Gestion d'état centralisée, composants réutilisables
- **Accessibilité** : Navigation clavier, contrastes optimisés, states clairs