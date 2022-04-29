FROM node:lts-alpine AS builder
COPY memento-front /
RUN npm i
RUN npm run build

FROM nginx
COPY memento-back /memento/back
COPY --from=builder /build /memento/front/
RUN chmod -Rf 777 /memento/back
