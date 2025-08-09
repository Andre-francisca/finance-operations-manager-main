FROM node
RUN mkdir next
COPY . var/next
WORKDIR /var/next
EXPOSE 3000
CMD [ "npm", "run", "start" ]