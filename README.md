# Cloak Service 🕵️‍♂️

**Cloak Service** is a RESTful API that determines whether a user is a **bot or a real human**, based on their IP address, User-Agent, and other metadata. The goal is to filter out bot traffic before serving sensitive or ad-related content.

This tool is commonly used in traffic filtering for marketing or advertising systems.

---

## 🚀 Technologies

- [NestJS](https://nestjs.com/) – backend framework
- TypeScript
- REST API (JSON)
- Docker & docker-compose
- VPN detection API ([vpnapi.io](https://vpnapi.io/))

---

## 🔍 Bot Detection Logic

The service analyzes the incoming request using the following criteria:

- ✅ **User-Agent**: suspicious keywords like `curl`, `python`, `java`, or missing UA
- ✅ **Accept-Language**: missing or non-human-like values
- ✅ **Referer**: missing or set to localhost/IP
- ✅ **IP address**: private, local, or invalid ranges (e.g. `127.0.0.1`, `192.168.*`)
- ✅ **Connection header**: e.g. `connection: close` may indicate a bot
- ✅ **Browser-only headers**: absence of headers like `sec-fetch-site`, `sec-fetch-user`, `sec-fetch-mode`
- ✅ **Content-Type**: unexpected values such as `text/plain` or `application/json` in a browser flow
- ✅ **Rate limit**: too many requests from the same IP in a short period

If multiple indicators are triggered, the service flags the request as `bot`.

---

## ✅ MVP Features

- NestJS project with clean modular structure
- REST API: POST /check
- Integration with external IP check API
- Docker + docker-compose
- Environment configuration - .env
- Basic error handling
- Swagger documentation
- Unit tests for cloak.service.ts
- ESLint + Prettier + Husky
- Rate limiting
- Caching for repeat IPs (by Redis)

---

## 🛠 Implementation Plan

- Initialize NestJS project and Git repository
- Setup ESLint, Prettier, and Husky for code quality
- Dockerize the application with Dockerfile and docker-compose.yml
- Create basic project structure: cloak module, controller, service
- Define DTOs and request validation
- Integrate with external VPN detection API (e.g. vpnapi.io)
- Implement core logic: analyze IP and User-Agent, return bot status
- Add error handling and structured responses
- Add Redis caching for repeated IP lookups
- Setup Swagger for API documentation
- Configure environment variables via .env
- Write unit tests for core service logic
- Implement rate limiting
