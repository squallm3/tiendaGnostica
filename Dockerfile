FROM node:24-alpine

WORKDIR /app

# Copiamos primero solo las dependencias
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Ahora copiamos el proyecto
COPY . .

# Construimos Next
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]