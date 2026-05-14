FROM node:20.19-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/check-in/package.json apps/check-in/package.json
COPY packages/services-check-in/package.json packages/services-check-in/package.json
COPY packages/ui-assets/package.json packages/ui-assets/package.json
COPY packages/ui-library/package.json packages/ui-library/package.json
COPY packages/ui-tokens/package.json packages/ui-tokens/package.json
COPY packages/utils/package.json packages/utils/package.json
RUN pnpm install --frozen-lockfile=false
COPY . .
ARG VITE_CHECK_IN_API_BASE=http://localhost:7003
ENV VITE_CHECK_IN_API_BASE=${VITE_CHECK_IN_API_BASE}
RUN pnpm build

FROM nginx:1.27-alpine AS runtime
COPY --from=build /app/apps/check-in/dist /usr/share/nginx/html
EXPOSE 80
