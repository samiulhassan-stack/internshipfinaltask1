# Contributing to TaskFlow

Thank you for considering contributing to TaskFlow! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help create a welcoming environment for all contributors

## How to Contribute

### Reporting Bugs

1. Check existing issues to avoid duplicates
2. Use the bug report template
3. Include:
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node version)

### Suggesting Features

1. Check existing feature requests
2. Describe the problem you're trying to solve
3. Explain your proposed solution
4. Consider alternatives you've thought about

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/taskflow-app.git
   cd taskflow-app
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow existing code style
   - Add tests for new features
   - Update documentation as needed

3. **Test your changes**
   ```bash
   # Backend tests
   cd backend && npm test
   
   # Frontend tests
   cd frontend && npm test
   
   # Lint
   npm run lint
   ```

4. **Commit with clear messages**
   ```bash
   git commit -m "feat: add task filtering by priority"
   git commit -m "fix: resolve WebSocket connection issue"
   git commit -m "docs: update deployment guide"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then open a PR on GitHub with a clear description.

## Development Setup

See [QUICKSTART.md](./QUICKSTART.md) for detailed setup instructions.

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Avoid `any` types
- Add proper interfaces for API responses

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks

### Backend Routes

- Validate all inputs with Zod schemas
- Use appropriate HTTP status codes
- Return consistent error response format

### Testing

- Write tests for new features
- Aim for >70% code coverage
- Test edge cases and error scenarios

### Git Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Formatting, missing semicolons, etc.
- `refactor:` - Code change that neither fixes a bug nor adds a feature
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## Project Structure

```
taskflow-app/
├── backend/           # Node.js + Express backend
│   ├── src/
│   │   ├── routes/   # API endpoints
│   │   ├── middleware/ # Auth, error handling
│   │   ├── websocket/ # Socket.io logic
│   │   └── lib/      # Utilities
│   ├── prisma/       # Database schema & migrations
│   └── __tests__/    # Backend tests
│
├── frontend/         # React + TypeScript frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/    # Page components
│   │   ├── context/  # React context providers
│   │   ├── lib/      # Utilities, API client
│   │   └── __tests__/ # Frontend tests
│   └── public/       # Static assets
│
└── docs/            # Additional documentation
```

## Questions?

Feel free to open a discussion or issue on GitHub!

---

Thank you for contributing to TaskFlow! 🚀
