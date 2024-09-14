pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ethxn-frs/restaurant-server.git', credentialsId: '5de0e5af-c4af-45cf-8a7a-b20a599baf8a'
            }
        }

        stage('Install NodeJS') {
            steps {
                tool name: 'NodeJs 22', type: 'nodejs'
                script {
                    env.PATH = "${tool name: 'NodeJs 22', type: 'nodejs'}/bin:${env.PATH}"
                }
            }
        }

        stage('Check Node and NPM Versions') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'npx tsc -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Install Types') {
            steps {
                sh 'npm install --save-dev @types/jsonwebtoken @types/nodemailer @types/bcrypt @types/express @types/cors'
                sh 'npm list --depth=0'
            }
        }

        stage('Clean and Reinstall Dependencies') {
            steps {
                sh 'npm cache clean --force'
                sh 'rm -rf node_modules'
                sh 'npm install'
                sh 'npm install --save-dev @types/jsonwebtoken @types/nodemailer @types/bcrypt @types/express @types/cors'
            }
        }

        stage('Deploy') {
            steps {
                sh 'npm run start'
            }
        }
    }

    post {
        failure {
            echo 'Deployment failed.'
        }
        success {
            echo 'Deployment succeeded.'
        }
    }
}