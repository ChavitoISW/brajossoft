# Etapa 1: Dependencias
FROM node:20-alpine 

RUN mkdir -p /app/brajossoft

WORKDIR /app/brajossoft

# Copiar archivos de dependencias
COPY package*.json ./
COPY next.config.js ./

RUN npm install && \
    npm cache clean --force

# Copiar código fuente
COPY app/ ./app/
COPY components/ ./components/
COPY public/ ./public/
COPY styles/ ./styles/

# Construir la aplicación Next.js
RUN npm run build

# Establecer variables de entorno
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3001 \
    HOSTNAME=0.0.0.0 \
    TZ=America/Costa_Rica    

EXPOSE 3001

CMD ["npm", "start"]
