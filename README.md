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

## 🔍 Logic
**The service performs the following:**

- Verifies IP address via external API (e.g., vpnapi.io)
- Analyzes the User-Agent string
- Returns a decision: bot or not
- Includes a reason in the response for transparency

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