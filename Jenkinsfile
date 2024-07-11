pipeline {
    agent any

    environment {
        // Ustawienie domyślnego środowiska na 'test'
        TEST_ENV = 'test'
    }

    stages {
        stage('Setup Environment') {
            steps {
                script {
                    // Ustawienie zmiennej BASE_URL w zależności od TEST_ENV
                    if (env.TEST_ENV == 'test') {
                        env.BASE_URL = 'https://demo-bank.vercel.app'
                    } else if (env.TEST_ENV == 'production') {
                        env.BASE_URL = 'https://demo-bank.vercel.app.wrongLink'
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                // Instalacja Node.js
                script {
                    def nodeJSHome = tool name: 'NodeJS 14.17.0', type: 'NodeJSInstallation'
                    env.PATH = "${nodeJSHome}/bin:${env.PATH}"
                }

                // Instalacja zależności
                script {
                    if (isUnix()) {
                        sh 'npm install'
                    } else {
                        bat 'npm install'
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Uruchomienie testów z odpowiednim środowiskiem
                    if (isUnix()) {
                        sh 'npm run test:$TEST_ENV'
                    } else {
                        bat "npm run test:$TEST_ENV"
                    }
                }
            }
        }
    }

    post {
        always {
            // Archiwizacja wyników testów i zrzutów ekranu
            archiveArtifacts artifacts: '**/test-results/*.xml', allowEmptyArchive: true
            archiveArtifacts artifacts: '**/screenshots/*.png', allowEmptyArchive: true

            // Publikacja wyników testów
            junit '**/test-results/*.xml'
        }
    }
}
