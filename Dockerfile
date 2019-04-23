FROM nginx:alpine
LABEL maintainer="https://github.com/n4bb12/celeste-search"
COPY dist/celeste-search /usr/share/nginx/html
