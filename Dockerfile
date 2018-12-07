FROM nginx:alpine
LABEL maintainer="https://github.com/n4bb12/celeste-item-search"
COPY dist/celeste-item-search /usr/share/nginx/html
