#!/bin/bash

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting automated git push process...${NC}"

# Ensure we're in the git repository
cd "$(git rev-parse --show-toplevel)"

# Get current timestamp for commit messages
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

# Function to generate professional commit message based on file type
generate_commit_message() {
    local file_path="$1"
    local file_name=$(basename "$file_path")
    local extension="${file_name##*.}"
    local dir_name=$(dirname "$file_path")
    
    case "$file_name" in
        package.json)
            echo "chore: update package.json dependencies and scripts

- Add/modify project dependencies
- Update npm/pnpm scripts configuration
- Ensure consistent package management"
            ;;
        *.lock.yaml|*.lock.json|yarn.lock|package-lock.json)
            echo "chore: update dependency lockfile

- Sync lockfile with package.json changes
- Ensure reproducible dependency installation
- Update to latest compatible versions"
            ;;
        *.env|*.env.*)
            echo "chore: update environment configuration

- Modify environment variables
- Update configuration settings
- Ensure proper environment setup"
            ;;
        server.js|app.js|index.js)
            echo "feat: enhance server configuration and setup

- Update server initialization and middleware
- Improve application entry point
- Optimize server performance and routing"
            ;;
        *.js)
            if [[ "$dir_name" == *"controller"* ]]; then
                echo "feat: implement controller logic and handlers

- Add/update request controllers
- Improve business logic implementation
- Enhance request/response handling"
            elif [[ "$dir_name" == *"model"* ]]; then
                echo "feat: update data models and schemas

- Modify data structure definitions
- Improve model validation and relationships
- Enhance database interaction layer"
            elif [[ "$dir_name" == *"middleware"* ]]; then
                echo "feat: implement middleware functionality

- Add request/response middleware
- Improve error handling and validation
- Enhance security and processing layers"
            elif [[ "$dir_name" == *"route"* || "$dir_name" == *"router"* ]]; then
                echo "feat: update API routing configuration

- Modify route definitions and handlers
- Improve API endpoint structure
- Enhance routing logic and middleware integration"
            elif [[ "$dir_name" == *"service"* ]]; then
                echo "feat: implement service layer functionality

- Add business service implementations
- Improve service logic and data processing
- Enhance service integration patterns"
            elif [[ "$dir_name" == *"util"* || "$dir_name" == *"helper"* ]]; then
                echo "feat: update utility functions and helpers

- Add/modify utility functions
- Improve helper implementations
- Enhance code reusability and maintenance"
            else
                echo "feat: enhance JavaScript functionality

- Update module implementation
- Improve code structure and logic
- Add new features and optimizations"
            fi
            ;;
        *.md)
            echo "docs: update documentation and guides

- Modify project documentation
- Improve README and guide files
- Enhance project information and usage instructions"
            ;;
        *.json)
            if [[ "$file_name" == *"config"* ]]; then
                echo "chore: update configuration settings

- Modify application configuration
- Improve setup and environment settings
- Enhance configuration management"
            else
                echo "chore: update JSON configuration files

- Modify data configuration files
- Improve JSON structure and validation
- Enhance configuration management"
            fi
            ;;
        *.gitkeep)
            echo "chore: add directory structure placeholder

- Ensure empty directories are tracked
- Maintain project folder structure
- Support future file organization"
            ;;
        *)
            echo "feat: update project files and configuration

- Modify project structure and files
- Improve code organization and implementation
- Enhance overall project functionality"
            ;;
    esac
}

# Function to commit files with professional messages
commit_files() {
    local files=("$@")
    
    if [ ${#files[@]} -eq 0 ]; then
        echo -e "${BLUE}No files to commit.${NC}"
        return
    fi
    
    echo -e "${YELLOW}Found ${#files[@]} file(s) to commit...${NC}"
    
    for file in "${files[@]}"; do
        echo -e "${YELLOW}  - Committing: $file${NC}"
        git add "$file"
        
        # Generate professional commit message
        commit_message=$(generate_commit_message "$file")
        
        # Commit with generated message
        git commit -m "$commit_message"
        
        echo -e "${GREEN}    ✓ Committed successfully${NC}"
    done
}

# Get all untracked and modified files
echo -e "${YELLOW}Scanning for untracked and modified files...${NC}"

# Get untracked files (excluding .git directory)
untracked_files=$(git ls-files --others --exclude-standard | grep -v "^\.git/" || true)

# Get modified files
modified_files=$(git diff --name-only | grep -v "^\.git/" || true)

# Combine all files
all_files=""
if [ -n "$untracked_files" ]; then
    all_files="$untracked_files"
fi
if [ -n "$modified_files" ]; then
    if [ -n "$all_files" ]; then
        all_files="$all_files"$'\n'"$modified_files"
    else
        all_files="$modified_files"
    fi
fi

# Convert to array
if [ -n "$all_files" ]; then
    readarray -t files_array <<< "$all_files"
    
    # Commit all files with professional messages
    commit_files "${files_array[@]}"
else
    echo -e "${BLUE}No untracked or modified files found.${NC}"
fi

# Push all commits to remote
echo -e "${YELLOW}Pushing all commits to remote repository...${NC}"
git push origin main

echo -e "${GREEN}All files committed and pushed successfully!${NC}"
echo -e "${BLUE}Process completed at: $TIMESTAMP${NC}"
