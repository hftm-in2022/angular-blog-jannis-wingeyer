# angular-blog-jannis-wingeyer

An Angular application serving as the frontend for the Quarkus Blog API. This project provides a user-friendly interface for interacting with the blog API, allowing users to read, create, update, and delete blog posts.

## Inhaltsverzeichnis

- [Demo](#demo)
- [Features](#features)
- [Vorbereitung](#vorbereitung)
  - [Voraussetzungen](#voraussetzungen)
  - [Installation](#installation)
- [Entwicklung](#entwicklung)
  - [Code-Qualitätstools](#code-qualitätstools)
  - [Anwendung starten](#anwendung-starten)
  - [Tests ausführen](#tests-ausführen)
- [Continuous Integration und Deployment](#continuous-integration-und-deployment)
- [Sicherheit](#sicherheit)
- [Beitragen](#beitragen)
- [Lizenz](#lizenz)
- [Kontakt](#kontakt)

## Demo

[Live Demo auf Azure](https://hftm-blog-api.internal.icybush-570f5437.eastus.azurecontainerapps.io/)

## Features

- Anzeige einer Liste von Blogbeiträgen über die Quarkus Blog API
- Detailansicht einzelner Blogbeiträge
- Erstellung neuer Blogbeiträge
- Bearbeitung bestehender Blogbeiträge
- Löschen von Blogbeiträgen
- Responsives Design mit Angular Material

## Vorbereitung

### Voraussetzungen

- **Node.js** (Version 14.x oder 16.x)
- **npm** (wird mit Node.js installiert)
- **Angular CLI** global installiert:

  ```bash
  npm install -g @angular/cli
  ```

- **Git** installiert und konfiguriert
- Zugriff auf die [Quarkus Blog API](#) *(API-URL oder Anweisungen zur lokalen Ausführung)*

### Installation

1. **Repository klonen**

   ```bash
   git clone https://github.com/hftm-in2022/angular-blog-jannis-wingeyer.git
   cd angular-blog-jannis-wingeyer
   ```

2. **Abhängigkeiten installieren**

   ```bash
   npm install
   ```

## Entwicklung

### Code-Qualitätstools

Dieses Projekt verwendet mehrere Tools zur Sicherstellung der Codequalität:

- **ESLint** für statische Codeanalyse von TypeScript- und HTML-Dateien.
- **Prettier** für automatische Codeformatierung.
- **CommitLint** zur Prüfung von Commit-Nachrichten nach konventionellen Standards.
- **Husky** und **Lint-Staged** zum Ausführen von Lintern und Formatierern vor jedem Commit.

Diese Tools sind so konfiguriert, dass sie automatisch im Entwicklungsprozess ausgeführt werden.

### Anwendung starten

Um den Entwicklungsserver zu starten, führen Sie aus:

```bash
ng serve
```

Öffnen Sie `http://localhost:4200/` in Ihrem Browser. Die Anwendung wird automatisch neu geladen, wenn Sie Änderungen an den Quelldateien vornehmen.

### Tests ausführen

Um die Unit-Tests über [Karma](https://karma-runner.github.io) auszuführen:

```bash
ng test
```

## Continuous Integration und Deployment

Das Projekt verwendet **GitHub Actions** für Continuous Integration und Deployment:

- **CI-Pipeline**: Bei jedem Push oder Pull Request auf den `main`-Branch führt die Pipeline folgende Schritte aus:
  - Installieren der Abhängigkeiten
  - Codeanalyse mit ESLint
  - Ausführen der Unit-Tests
  - Build der Anwendung

- **Automatisiertes Deployment**: Änderungen im `main`-Branch werden automatisch auf **Azure Static Web Apps** bereitgestellt.

- **Automatisierte Updates**: Ein geplanter Workflow läuft wöchentlich, um Abhängigkeiten mit `ng update` zu aktualisieren.

## Sicherheit

Sicherheitsüberprüfungen sind in die CI-Pipeline integriert mittels `npm audit`. Die Pipeline prüft auf Schwachstellen in Produktionsabhängigkeiten und berichtet über gefundene Probleme.

## Beitragen

Beiträge sind willkommen! Bitte folgen Sie diesen Schritten:

1. **Forken Sie das Repository**
2. **Erstellen Sie einen neuen Branch** für Ihr Feature oder Ihren Bugfix:

   ```bash
   git checkout -b feature/neues-feature
   ```

3. **Committen Sie Ihre Änderungen** unter Beachtung der [Conventional Commits](https://www.conventionalcommits.org/de/v1.0.0/)-Richtlinien.
4. **Pushen Sie zu Ihrem Fork** und öffnen Sie eine **Pull Request**.

### Commit-Nachrichten

Dieses Projekt verwendet CommitLint, um konventionelle Commit-Nachrichten sicherzustellen. Beispiele:

- `feat: neues Authentifizierungsmodul hinzugefügt`
- `fix: API-Endpunkt in Service korrigiert`
- `docs: README mit neuen Anweisungen aktualisiert`
