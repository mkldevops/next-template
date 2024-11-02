include .env
ifneq ("$(wildcard .env.local)","")
	include .env.local
endif

PACKAGE_MANAGER ?= bun
X_MANAGER ?= bunx
NEXT_PORT ?= 3000

.DEFAULT_GOAL := dev


## —— React Makefile ———————————————————————————————————
help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z0-9_-]+:.*?## .*$$)|(^## )' Makefile | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

## —— Npm server ———————————————————————————————————
sync: clean
	$(MAKE) docker-destroy
	$(MAKE) install
	$(MAKE) docker-up
	sleep 2
	$(MAKE) prisma-migrate
	$(MAKE) prisma-seed
	$(MAKE) dev

clean:
	@rm -rf node_modules .next yarn.lock bun.lockb pnpm-lock.yaml package-lock.json

install: ## Install dependencies
	@test -f .env.local || cp .env .env.local
	$(PACKAGE_MANAGER) install

dev: ## Run the development server
	$(PACKAGE_MANAGER) dev -p $(NEXT_PORT)

build: install ## Build the application
	$(PACKAGE_MANAGER) run build

## —— Prisma ———————————————————————————————————
prisma: ## Generate prisma client
	$(X_MANAGER) prisma generate

prisma-seed: ## Generate prisma client
	$(X_MANAGER) prisma:seed

prisma-migrate: ## Migrate prisma
	$(X_MANAGER) prisma migrate dev --preview-feature

prisma-studio: ## Migrate prisma
	$(X_MANAGER) prisma studio

prisma-reset: ## Reset prisma
	$(X_MANAGER) prisma migrate reset
	$(X_MANAGER) prisma migrate dev

## —— Linters ———————————————————————————————————
lint: ## Run all linters
	bx biome check --write
	$(PACKAGE_MANAGER) run prisma validate
	$(PACKAGE_MANAGER) run prisma format

analyze: lint build ## Run all linters and tests

## —— Git ———————————————————————————————————
git-clean-branches: ## Clean merged branches
	@git remote prune origin
	(git branch --merged | egrep -v "(^\*|main|master|dev)" | xargs git branch -d) || true

git-rebase: ## Rebase current branch
	git pull --rebase origin main

message ?= $(shell git branch --show-current | sed -E 's/^([0-9]+)-([^-]+)-(.+)/\2: \#\1 \3/' | sed "s/-/ /g")
auto-commit: ## Auto commit
	@git add .
	@git commit -m "${message}" || true

current_branch=$(shell git rev-parse --abbrev-ref HEAD)
push: ## Push current branch
	@git push origin "$(current_branch)" --force-with-lease


commit: analyze prisma-migrate auto-commit git-rebase push ## Commit and push

## —— Docker ———————————————————————————————————
docker-up: ## Start docker
	@docker compose up -d --wait

docker-destroy: ## Destroy docker
	@docker compose down --remove-orphans --volumes --rmi all

docker-down: ## Stop docker
	@docker compose down --remove-orphans

docker-db:
	@docker compose exec -ti database psql app password

docker-logs:
	@docker compose logs -f $(c)

docker-ps:
	@docker compose ps -a