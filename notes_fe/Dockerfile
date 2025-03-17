FROM node:18-alpine
WORKDIR /notes_fe/
COPY public/ /notes_fe/public
COPY src/ /notes_fe/src
COPY package.json /notes_fe/
RUN npm install
CMD ["npm", "run", "dev"]