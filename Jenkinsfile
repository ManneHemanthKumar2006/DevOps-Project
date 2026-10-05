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
            sleep 5
            bat 'curl http://localhost:3001'
    }
}

        stage('Selenium Test') {
    steps {
        bat '"C:\\Users\\Hemanth\\AppData\\Local\\Python\\pythoncore-3.14-64\\python.exe" -m pip install selenium'
        bat '"C:\\Users\\Hemanth\\AppData\\Local\\Python\\pythoncore-3.14-64\\python.exe" selenium-tests\\test_registration.py'
    }
}

stage('Deploy to Kubernetes') {
    steps {
        bat 'kubectl apply -f k8s/deployment.yaml'
        bat 'kubectl apply -f k8s/service.yaml'
        bat 'kubectl apply -f k8s/pvc.yaml'
        bat 'kubectl rollout status deployment/college-event-app'
    }
}
    }
}