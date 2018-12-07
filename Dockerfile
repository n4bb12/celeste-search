FROM nginx:alpine
LABEL maintainer="https://github.com/n4bb12/celeste-items"
COPY dist/celeste-items /usr/share/nginx/html
