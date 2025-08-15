# SchoolStickerApp

Application web moderne pour créer, personnaliser et imprimer des feuilles d'étiquettes autocollantes adaptées aux besoins scolaires.

## 🎯 Fonctionnalités

### Création d'étiquettes
- **Grille configurée** : 14 lignes × 6 colonnes (84 étiquettes par feuille)
- **Dimensions précises** : 3cm × 1cm par étiquette
- **Format de feuille** : 19.2cm × 15.7cm
- **Personnalisation complète** : Texte et icônes personnalisables

### Interface utilisateur
- **Sélection d'icônes** : Plus de 150 émojis organisés par catégories
- **Ajustement automatique** : Taille de police adaptative selon le contenu
- **Prévisualisation en temps réel** : Voir le résultat avant impression
- **Design responsive** : Compatible desktop, tablette et mobile

### Fonctionnalités avancées
- **Remplissage en masse** : Import de listes de noms
- **Export PDF** : Formats A4, A3, Letter, Legal
- **Impression directe** : Optimisée pour l'impression
- **Échelle ajustable** : Zoom de prévisualisation de 30% à 120%

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
- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **Styles** : Tailwind CSS
- **Export PDF** : jsPDF + html2canvas
- **Icônes** : React Icons + Émojis natifs

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

### 1. Créer des étiquettes individuelles
1. Cliquez sur une case vide dans la grille
2. Saisissez le nom souhaité
3. Sélectionnez une icône dans le catalogue
4. Ajustez la taille de police si nécessaire
5. Sauvegardez

### 2. Remplissage en masse
1. Utilisez le champ "Ajouter des noms en masse"
2. Entrez un nom par ligne
3. Ou importez un fichier .txt/.csv
4. Cliquez sur "Appliquer"

### 3. Export et impression
1. Configurez le format de page (A4, A3, etc.)
2. Choisissez l'orientation (Portrait/Paysage)
3. **Export PDF** : Télécharge un fichier PDF
4. **Impression directe** : Ouvre la boîte de dialogue d'impression

### 4. Personnalisation avancée
- **Échelle de prévisualisation** : Ajustez le zoom (30-120%)
- **Taille de police globale** : Définit la taille par défaut
- **Effacer tout** : Remet à zéro toutes les étiquettes

## 🎨 Spécifications techniques des étiquettes

### Dimensions physiques
- **Étiquette individuelle** : 30mm × 10mm
- **Feuille complète** : 192mm × 157mm
- **Grille** : 14 lignes × 6 colonnes
- **Total** : 84 étiquettes par feuille

### Contraintes d'affichage
- **Zone de texte** : 85% de la largeur de l'étiquette
- **Zone d'icône** : 50% de la hauteur de l'étiquette
- **Taille de police** : Auto-ajustement de 8px à 24px
- **Espacement** : Calculé automatiquement pour centrage parfait

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
- ESLint configuration stricte
- Prettier pour le formatage
- TypeScript strict mode
- Tests unitaires avec Jest (à venir)

## 📞 Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Consultez la documentation en ligne
- Contactez l'équipe de développement

---

**SchoolStickerApp** - Simplifiez la création d'étiquettes scolaires ! 🎓✨