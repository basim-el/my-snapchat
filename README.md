# My-Snapchat 📸

## Sommaire

- [Aperçu](#aperçu)
- [Caractéristiques principales](#caractéristiques-principales)
- [Pré-requis](#pré-requis)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [À propos de l'auteur](#à-propos-de-lauteur)

## Aperçu

**My-Snapchat** est une application mobile créée avec **React Native**, reproduisant les fonctionnalités de base de Snapchat. Les utilisateurs peuvent prendre des photos, les envoyer à leurs amis, voir les snaps reçus, et accéder à une interface simple et conviviale pour interagir avec leurs contacts. Ce projet met en avant des concepts tels que la gestion des médias, la caméra en temps réel, et la messagerie instantanée.

## Caractéristiques principales

- **Capturer des photos** : Les utilisateurs peuvent prendre des photos en temps réel via la caméra intégrée de l'appareil.
- **Envoyer des snaps** : Les photos prises peuvent être envoyées à des amis enregistrés dans l'application.
- **Recevoir et voir des snaps** : Les utilisateurs peuvent visualiser les snaps reçus avant qu'ils ne disparaissent après la lecture.
- **Messagerie instantanée** : Communication via des messages textes et des snaps entre utilisateurs.
- **Interface utilisateur fluide** : Conception d'une interface intuitive et responsive inspirée de l'expérience utilisateur de Snapchat.

## Pré-requis

- **React Native** installé globalement sur votre machine
- **Node.js** (version 14 ou supérieure recommandée)
- **npm** ou **yarn**
- Un **émulateur Android ou iOS**, ou un appareil physique pour tester l'application
- **Expo CLI** (si vous utilisez Expo pour faciliter le développement)

## Installation

1. Clonez le dépôt GitHub du projet :

    ```bash
    git clone https://github.com/basim-el/my-snapchat.git
    ```

2. Accédez au répertoire du projet :

    ```bash
    cd my-snapchat
    ```

3. Installez les dépendances avec npm ou yarn :

    ```bash
    npm install
    ```

    ou

    ```bash
    yarn install
    ```

4. Si vous utilisez **Expo**, assurez-vous qu'Expo CLI est installé :

    ```bash
    npm install -g expo-cli
    ```

5. Lancez l'application :

    - Si vous utilisez **Expo** :

        ```bash
        expo start
        ```

    - Pour les utilisateurs de **React Native CLI** :

        ```bash
        npx react-native run-android
        ```

        ou

        ```bash
        npx react-native run-ios
        ```

6. Ouvrez l'application sur l'émulateur ou scannez le QR code avec l'application Expo sur votre téléphone pour commencer à l'utiliser.

## Utilisation

### Fonctions principales

- **Prendre un snap** : Ouvrez l'application et accédez à l'écran principal pour prendre une photo via la caméra intégrée.
- **Envoyer un snap** : Sélectionnez un contact à qui envoyer le snap une fois la photo prise.
- **Voir un snap** : Consultez les snaps envoyés par vos amis dans la section dédiée avant qu'ils ne disparaissent.
- **Discussions** : Utilisez la messagerie intégrée pour échanger des messages rapides et des photos.

## Déploiement

Pour déployer l'application sur un store mobile (App Store ou Google Play Store), suivez les étapes nécessaires pour créer des builds de production adaptés à chaque plateforme :

- **Pour iOS** : Suivez les instructions de déploiement iOS de React Native ou Expo.
- **Pour Android** : Utilisez Android Studio pour générer un APK ou un AAB à soumettre sur le Play Store.

## À propos de l'auteur

👤 **Basim El Sayed**

- [Portfolio](https://www.eldev.fr/)
- [LinkedIn](https://www.linkedin.com/in/basim-el-sayed/)
