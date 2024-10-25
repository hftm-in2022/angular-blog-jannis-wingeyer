# SETUP.md

## Einleitung

In diesem Dokument wird der Prozess zur Einrichtung der Entwicklungsumgebung für ein neues Angular-Projekt beschrieben. Ziel ist es, alle technischen Voraussetzungen zu schaffen, um effizient und sicher arbeiten zu können. Die Schritte umfassen die Erstellung des Projekts, das Einrichten eines Git-Repositories, die Konfiguration von Code-Qualitätstools, das Einrichten einer CI/CD-Pipeline mit automatisiertem Deployment auf Azure sowie Sicherheitsüberprüfungen und Abhängigkeitsmanagement.

## Voraussetzungen

- **Node.js** und **npm** installiert
- **Angular CLI** installiert (`npm install -g @angular/cli`)
- **Git** installiert und konfiguriert
- Zugang zu [GitHub der HFTM](https://github.com/hftm-in2022)
- **Azure-Konto** für das Deployment

---

## 1. Neues Angular-Projekt aufsetzen

Erstelle ein neues Angular-Projekt mit SCSS als CSS-Präprozessor:

```bash
ng new <projektname> --style=scss
```

Ersetze `<projektname>` durch den Namen deines Projekts.

Beispiel:

```bash
ng new blog-app --style=scss
```

---

## 2. Einrichten eines Git-Repositories

### Repository auf GitHub erstellen

1. Melde dich bei GitHub an und navigiere zu [https://github.com/hftm-in2022](https://github.com/hftm-in2022).
2. Erstelle ein neues Repository mit dem Namen:

   ```
   angular-<projektname>-<Vorname>-<Nachname>
   ```

   Beispiel:

   ```
   angular-blog-app-max-mustermann
   ```

3. Stelle sicher, dass das Repository **öffentlich zugänglich** ist, sofern nicht anders gefordert.
4. Füge eine aussagekräftige **README.md** hinzu, die einen Überblick über das Projekt bietet.

### Lokales Repository initialisieren und mit Remote verbinden

Wechsle in das Projektverzeichnis und initialisiere Git:

```bash
cd <projektname>
git init
```

Füge die Remote-Repository-URL hinzu:

```bash
git remote add origin https://github.com/hftm-in2022/angular-<projektname>-<Vorname>-<Nachname>.git
```

### Projekt zum Repository hinzufügen und pushen

```bash
git add .
git commit -m "Initial commit"
git push -u origin main
```

---

## 3. Einrichtung von Code-Qualitätstools

### ESLint installieren

Angular verwendet seit Version 12 ESLint für die statische Codeanalyse.

```bash
ng add @angular-eslint/schematics
```

### Prettier installieren und konfigurieren

Installiere Prettier und die zugehörigen ESLint-Pakete:

```bash
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

Erstelle eine `.prettierrc`-Datei im Stammverzeichnis mit deinen gewünschten Einstellungen, z.B.:

```json
{
  "singleQuote": true,
  "printWidth": 80
}
```

Aktualisiere die `.eslintrc.json`, um Prettier einzubinden:

```json
{
  "extends": [
    "plugin:@angular-eslint/recommended",
    "prettier"
  ],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

### CommitLint installieren

Installiere CommitLint und die konventionelle Konfiguration:

```bash
npm install --save-dev @commitlint/{config-conventional,cli}
```

Erstelle eine `commitlint.config.js` im Stammverzeichnis:

```javascript
module.exports = { extends: ['@commitlint/config-conventional'] };
```

### Husky und Lint-Staged einrichten

Installiere Husky und Lint-Staged:

```bash
npm install --save-dev husky lint-staged
```

Aktiviere Husky:

```bash
npx husky install
```

Füge Husky-Hooks hinzu:

```bash
npx husky add .husky/pre-commit "npx lint-staged"
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

Konfiguriere Lint-Staged in der `package.json`:

```json
{
  "lint-staged": {
    "*.{ts,html,scss}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ]
  }
}
```

---

## 4. Automatisiertes Deployment auf Azure

### Azure Static Web App erstellen

1. Melde dich im [Azure-Portal](https://portal.azure.com/) an.
2. Erstelle eine neue **Static Web App**:
   - Wähle den **Free-Plan** (falls verfügbar).
   - Verbinde das GitHub-Repository während der Einrichtung.
   - Konfiguriere den Build entsprechend deinem Projektverzeichnis (z.B. `dist/<projektname>`).

### GitHub Actions Workflow anpassen

Bei der Erstellung der Static Web App wird automatisch ein GitHub Actions Workflow im Repository hinzugefügt (`.github/workflows/azure-static-web-apps-<hash>.yml`).

Überprüfe den Workflow und passe bei Bedarf die Build- und Output-Optionen an.

---

## 5. CI/CD-Pipeline einrichten

Erweitere den vorhandenen GitHub Actions Workflow oder erstelle eine neue Workflow-Datei `.github/workflows/ci.yml`.

### Build und Tests hinzufügen

```yaml
name: CI Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js 18.x
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install Dependencies
        run: npm install

      - name: Lint Code
        run: npm run lint

      - name: Run Unit Tests
        run: npm run test -- --watch=false --no-progress --browsers=ChromeHeadless

      - name: Build Project
        run: npm run build -- --prod
```

### Automatisiertes ng update

Füge einen separaten Workflow hinzu, der regelmässig ausgeführt wird, z.B. wöchentlich, um Abhängigkeiten zu aktualisieren:

```yaml
name: Dependency Update

on:
  schedule:
    - cron: '0 0 * * 0' # Jeden Sonntag um Mitternacht

jobs:
  ng-update:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js 18.x
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install Dependencies
        run: npm install

      - name: Update Angular Dependencies
        run: npx ng update

      - name: Commit and Push Changes
        run: |
          git config user.name 'GitHub Actions'
          git config user.email 'actions@github.com'
          git add .
          git commit -m 'chore: update dependencies'
          git push
```

**Hinweis**: Automatische Updates können Risiken bergen. Überprüfe die Änderungen regelmässig.

---

## 6. Sicherheitsüberprüfung und Abhängigkeitsmanagement

### Sicherheitsüberprüfungen in die Pipeline integrieren

Füge `npm audit` in die CI-Pipeline ein:

```yaml
- name: Run Security Audit
  run: npm audit --production --audit-level=moderate
```

Alternativ kannst du `snyk` verwenden:

```yaml
- name: Snyk Security Scan
  uses: snyk/actions/node@master
  with:
    args: test
  env:
    SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

### Abhängigkeitsmanagement sicherstellen

Stelle sicher, dass immer die neuesten stabilen Versionen der Pakete installiert werden:

```yaml
- name: Install Dependencies
  run: npm install
```

Füge `npm outdated` hinzu, um veraltete Pakete zu identifizieren:

```yaml
- name: Check for Outdated Packages
  run: npm outdated || true
```

---

## Zusammenfassung

Durch die oben beschriebenen Schritte ist das Angular-Projekt nun vollständig eingerichtet:

- **Neues Angular-Projekt** mit SCSS als Präprozessor
- **Git-Repository** auf GitHub mit aussagekräftiger `README.md`
- **Code-Qualitätstools**: ESLint, Prettier, CommitLint, Husky und Lint-Staged
- **CI/CD-Pipeline** mit GitHub Actions:
  - Automatisierter Build und Tests bei jedem Commit
  - Automatisiertes Deployment auf Azure bei Änderungen im `main`-Branch
  - Regelmässige Updates der Abhängigkeiten
- **Sicherheitsüberprüfungen** in der Pipeline integriert
- **Aktuelles Abhängigkeitsmanagement** durch regelmässige Updates und Prüfungen

---

## Weiterführende Schritte

- Überprüfe regelmässig die Ergebnisse der CI/CD-Pipeline und behebe eventuelle Fehler.
- Passe die Konfigurationen der Tools an die spezifischen Anforderungen deines Projekts an.
- Dokumentiere weitere projektspezifische Einstellungen und Besonderheiten in der `README.md` oder in separaten Dokumenten.

---

## Ressourcen

- [Angular CLI Dokumentation](https://angular.io/cli)
- [ESLint für Angular](https://github.com/angular-eslint/angular-eslint)
- [Prettier Dokumentation](https://prettier.io/docs/en/index.html)
- [CommitLint Dokumentation](https://commitlint.js.org/#/)
- [Husky Dokumentation](https://typicode.github.io/husky/#/)
- [GitHub Actions Dokumentation](https://docs.github.com/en/actions)
- [Azure Static Web Apps Dokumentation](https://docs.microsoft.com/de-de/azure/static-web-apps/)

---
