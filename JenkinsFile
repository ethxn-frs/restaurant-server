pipeline {
    agent any

    tools {
        nodejs 'NodeJS 18'
    }

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout') {
            steps {
                // Clone le dépôt GitHub
                git branch: 'main', url: 'https://github.com/username/restaurant-server.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Installe les dépendances
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                // Compile le projet
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                // Démarre l'application (ou toute autre commande de déploiement)
                sh 'npm run start'
            }
        }
    }

    post {
        always {
            // Nettoie les fichiers temporaires, ferme les services, etc.
            sh 'npm run clean'
        }
        failure {
            // Notifie en cas d'échec
            echo 'Deployment failed.'
        }
        success {
            // Notifie en cas de succès
            echo 'Deployment succeeded.'
        }
    }
}