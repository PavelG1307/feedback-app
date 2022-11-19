run:
    docker run -d -p 3000:3000 --rm --name reviews-app reviews-app\:latest

stop:
    docker stop reviews-app

build:
    docker build -t reviews-app\:latest .