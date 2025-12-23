# 1️⃣ Use official Node image
FROM node:18-alpine

# 2️⃣ Create app directory inside container
WORKDIR /app

# 3️⃣ Copy package files first (for caching)
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install --production

# 5️⃣ Copy rest of the source code
COPY . .

# 6️⃣ Expose backend port
EXPOSE 8000

# 7️⃣ Start server
CMD ["node", "server.js"]
