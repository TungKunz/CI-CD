pipeline {
    agent any

    environment {
        BACKEND_IMAGE  = 'kafka-demo-backend'
        FRONTEND_IMAGE = 'kafka-demo-frontend'
        TAG            = "${env.BUILD_ID}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo '📥 Checking out source code...'
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                echo '☕ Building Spring Boot application with Maven...'
                dir('backend') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                echo '⚛️  Building React application with npm...'
                dir('frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                echo '🐳 Building Docker images...'
                bat "docker build -t ${BACKEND_IMAGE}:latest  -t ${BACKEND_IMAGE}:${TAG}  ./backend"
                bat "docker build -t ${FRONTEND_IMAGE}:latest -t ${FRONTEND_IMAGE}:${TAG} ./frontend"
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                echo '🚀 Deploying all services with Docker Compose...'
                bat 'docker-compose down'
                bat 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            echo '📋 Pipeline finished.'
        }
        success {
            echo '✅ Deployment successful!'
            echo '   Frontend: http://localhost:3000'
            echo '   Backend:  http://localhost:8080'
        }
        failure {
            echo '❌ Pipeline failed. Check the logs above for details.'
        }
    }
}
