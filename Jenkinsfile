pipeline {
    agent any

    triggers {
        cron('H 8 * * *')
    }

    environment {
        TEST_ENV = 'test'
    }

    stages {
        stage('Setup Environment') {
            steps {
                script {
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
                    if (isUnix()) {
                        if (env.TEST_ENV == 'test') {
                            sh 'npm run test:test-env'
                        } else if (env.TEST_ENV == 'production') {
                            sh 'npm run test:prod-env'
                        }
                    } else {
                        if (env.TEST_ENV == 'test') {
                            bat 'npm run test:test-env'
                        } else if (env.TEST_ENV == 'production') {
                            bat 'npm run test:prod-env'
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/test-results/**/*.xml', allowEmptyArchive: true
            archiveArtifacts artifacts: '**/screenshots/**/*.png', allowEmptyArchive: true
            junit '**/test-results/**/*.xml'
        }
    }
}
