# Usa Node 22 como imagen base
FROM node:22.0.0

# Crea directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto por defecto de Vite
EXPOSE 5173

# Ejecuta Vite en modo desarrollo
CMD ["npm", "run", "dev", "--", "--host"]
