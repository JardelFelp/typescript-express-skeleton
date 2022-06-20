
FROM node:16
ADD src /src
ADD env /env
COPY /package.json /


ENV PORT 8080
ENV HOST 0.0.0.0
ENV TZ=America/Recife


RUN yarn && npm install -g pm2 nodemon
RUN yarn build

RUN sed -i 's/DEFAULT\@SECLEVEL\=2/DEFAULT\@SECLEVEL\=1/' /etc/ssl/openssl.cnf

# CMD pm2-runtime start dist/server.js -i 1 --no-daemon
CMD node dist/server.js

EXPOSE 80
EXPOSE 8080