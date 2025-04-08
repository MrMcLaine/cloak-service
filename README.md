# Cloak Service 🕵️‍♂️

**Cloak Service** is a RESTful API that determines whether a user is a **bot or a real human**, based on their IP
address, User-Agent, and other metadata. The goal is to filter out bot traffic before serving sensitive or ad-related
content.

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
- ✅ **Referer**: missing, set to localhost, or private IPs
- ✅ IP address:
    - Private/local IPs like 127.0.0.1, 192.168.\*
    - Invalid or unknown geolocation
    - Geolocation lacking both city and region
- ✅ **Connection header**: anything other than keep-alive may indicate automation
- ✅ **Content-Type** — unexpected MIME types like text/plain, application/xml (typically not used in browser page loads)
- ✅ **Browser-only headers**: absence of headers like `sec-fetch-site`, `sec-fetch-user`, `sec-fetch-mode`
- ✅ **Geolocation**:
- ✅ **Rate limit**: too many requests from the same IP in a short period
- ✅ VPN/Proxy/Tor Detection: uses `vpnapi.io` to detect anonymized IPs

If one or more indicators are triggered, the request is flagged as `bot`.

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
