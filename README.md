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
4. Create a file named .env in the myapp folder and open it
```
touch .env && nano .env
```
5. Add the following in the .env file and save it
```
MDB_CONNECT_STRING= "your mongoDB connect link"
JWT_KEY=kjandcoiadakocna738732r8u9hr34r98rhr78g4r028rfhbf72f239hf29f
PORT = 3100
```
6. Create a file named .dockerignore in the myapp folder and open it
```
touch .dockerignore && nano .dockerignore
```
7. Add the following in the file
```
node_modules
npm-debug.log
```
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
### To use reverse prozy check out <a href="https://github.com/rahulraina711/Nginx-express.git" >this link</a> (skip the PM2 part).
