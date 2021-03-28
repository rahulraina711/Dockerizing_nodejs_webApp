# Dockerizing_nodejs_webApp
Using Docker to create an ubuntu image . Then using PM2 and NginX for reverse proxy.

# Getting Started (for a linux system)

1. Open terminal and create a new directory
```
mkdir myapp
```
2. Initialize an empty git repo in the "myapp" directory
```
git init
```
3. Pull the repo using terminal
```
git pull https://github.com/rahulraina711/Dockerizing_nodejs_webApp.git
```
4. Create a file named .env in the myapp folder and open it <br>```touch .env && nano .env```</br>
5. Add the following in the .env file
6. Create a file named .dockerignore in the myapp folder and open it
7. Add the following in the file
8. Open Dockerfile and in front of EXPOSE write the port number your express-app listens to, in my case its 3100
9. Enter the following command in terminal 
```
docker build -t node-web-app .
```
10. Now run the image using the below command
```
docker run -p 49160:3100 -d node-web-app
```
### Now if you go in your browser and type http://localhost:49160 you should se your apps home page.
