#!/bin/bash

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting automated git push process...${NC}"

# Ensure we're in the git repository
cd "$(git rev-parse --show-toplevel)"

# 1. Handle deleted file: node-js-course.pdf
echo -e "${YELLOW}Committing deletion: removed node-js-course.pdf...${NC}"
git add node-js-course.pdf
git commit -m "chore: remove node-js-course.pdf from repository"

# 3. Handle day-03-clean-architecture files individually
echo -e "${YELLOW}Committing day-03-clean-architecture files individually...${NC}"

# 3a. package.json
echo -e "${YELLOW}  - package.json...${NC}"
git add day-03-clean-architecture/package.json
git commit -m "chore: add package.json for day-03 clean architecture

- Configure Express 5.2.1 dependency
- Set up nodemon dev scripts
- Define CommonJS module type"

# 3b. server.js
echo -e "${YELLOW}  - server.js...${NC}"
git add day-03-clean-architecture/server.js
git commit -m "feat: add Express server entry point

- Initialize Express app with JSON middleware
- Mount notes router at /api/v1/routes
- Configure server on port 5000"

# 3c. routes/router.js
echo -e "${YELLOW}  - routes/router.js...${NC}"
git add day-03-clean-architecture/routes/router.js
git commit -m "feat: add Express router for notes API endpoints

- Define GET and POST routes for /notes
- Wire controller methods to routes
- Export configured router for server integration"

# 3d. controllers/controllers.js
echo -e "${YELLOW}  - controllers/controllers.js...${NC}"
git add day-03-clean-architecture/controllers/controllers.js
git commit -m "feat: add notes controller with CRUD operations

- Implement getNotes controller to fetch all notes
- Implement createNotes controller with validation
- Add in-memory notes array for data storage
- Handle missing field errors with 400 status"

# 3e. pnpm-lock.yaml
echo -e "${YELLOW}  - pnpm-lock.yaml...${NC}"
git add day-03-clean-architecture/pnpm-lock.yaml
git commit -m "chore: add pnpm lockfile for dependency tracking"

# Push all commits to remote
echo -e "${YELLOW}Pushing all commits to GitHub...${NC}"
git push origin main

echo -e "${GREEN}All files committed and pushed successfully!${NC}"
