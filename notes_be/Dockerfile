FROM node:20-alpine
WORKDIR /notes_be
COPY . .
RUN npm install
EXPOSE 5000
CMD ["npm", "run", "dev"]