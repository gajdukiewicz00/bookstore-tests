pipeline {
  agent any

  tools {
    nodejs 'NodeJS_18'
  }

  environment {
    HOME = "${env.WORKSPACE}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Install Playwright browsers') {
      steps {
        sh 'npx playwright install --with-deps'
      }
    }

    stage('Run Playwright tests') {
      steps {
        sh 'npx playwright test'
      }
    }

    stage('Publish Playwright report') {
      steps {
        sh 'npx playwright show-report --output=playwright-report'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**/*', fingerprint: true
    }
  }
}
