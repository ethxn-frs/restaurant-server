pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ethxn-frs/restaurant-server.git'
            }
        }

        stage('Install NodeJS') {
            steps {
                tool name: 'NodeJs 18', type: 'nodejs'
                // Ajoute le chemin de NodeJS dans le PATH
                script {
                    env.PATH = "${tool name: 'NodeJs 18', type: 'nodejs'}/bin:${env.PATH}"
                }
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