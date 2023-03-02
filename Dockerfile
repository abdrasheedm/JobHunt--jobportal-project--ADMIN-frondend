FROM node:14

WORKDIR /usr/src/react

# COPY package*.json ./
COPY . .

WORKDIR /usr/src/react/clint

RUN npm install

WORKDIR /usr/src/react/server


EXPOSE 3000

CMD ["npm", "start"]



# sudo docker run -p 3000:3000 -d jbhunt-admin-image
#sudo docker build -t jbhunt-admin-image .