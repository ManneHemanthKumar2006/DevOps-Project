pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t devops-project .'
            }
        }

        stage('Run Docker Container') {
            steps {
                bat 'docker stop devops-project-ci || exit 0'
                bat 'docker rm devops-project-ci || exit 0'
                bat 'docker run -d --name devops-project-ci -p 3001:3000 devops-project'
            }
        }

        stage('Test Application') {
            steps {
                bat 'curl http://localhost:3001'
            }
        }
    }
}