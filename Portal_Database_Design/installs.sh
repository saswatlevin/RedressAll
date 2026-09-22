#!/bin/bash

# Update all repositories
sudo apt update

# =========INSTALL NODEJS========= #
echo "Installing cURL"
sudo apt install curl

echo "Adding the NodeJS 22 Reporsitory"
curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh
sudo -E bash nodesource_setup.sh

echo "Installing NodeJS"
sudo apt install nodejs

echo "Checking the NodeJS Version"
node -v

echo "Checking the NPM Version"
npm -v

# To compile native addons from npm packages, install the build tools
echo "Installing the Build Tools"
sudo apt install build-essential

# =========INSTALL NESTJS========= #
echo "# =========INSTALLING NESTJS========= #"
sudo npm install -g @nestjs/cli

echo "Checking the NestJS Version"
nest -v

# =========INSTALL POSTGRESQL========= #
echo "Installing CA Certificates"
sudo apt install ca-certificates

echo "Installing the PostgreSQL Global Development Group"
sudo install -d /usr/share/postgresql-common/pgdg

echo "Immporting the PostgreSQL Signing Key"
curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo gpg --dearmor -o /usr/share/postgresql-common/pgdg/apt.postgresql.org.asc

echo "Adding the Official PostgreSQL Repository to APT"
echo "deb [signed-by=/usr/share/postgresql-common/pgdg/apt.postgresql.org.asc] https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" | sudo tee /etc/apt/sources.list.d/pgdg.list > /dev/null


echo "Updating all APT Repositories"
sudo apt update

echo "Installing PostgreSQL 17"
sudo apt install postgresq-18

echo "Installing PostgreSQL Client 17"
sudo apt install postgresql-client-18

echo "Verifying Postgres Version"
psql --version

echo "Checking if Postgres Service is Running"
sudo systemctl status postgresql

echo "Enabling Postgres"
sudo systemctl enable postgresql

echo "Starting Postgres"
sudo systemctl start postgresql

# =========CONFIGURE POSTGRESQL========= #
# Connect to Postgres w/o a Password
sudo -u postgres psql
# Set the Postges Admin Password to demoPassword
ALTER USER postgres PASSWORD 'demoPassword';
# Command to Create a Database
CREATE DATABASE my_database;
# Connect to "my_database"
\connect my_database
# See all tables in "my_database"
\dt *.*
# See all tables in the "public" schema
\dt public.*
# Quit
\q
# Reconnect to Postgres to see if the Password has been set
psql -h localhost -U postgres

# Connect to postgres to a particular database
psql -h localhost -U postgres -d my_database

# =========CONFIGURE POSTGRES TO ACCEPT REMOTE CONNECTION========== #
# PostgreSQL reads its configuration from the postgresql.conf file which is located in the /etc/postgresql/<version>/main/ directory
sudo vi /etc/postgresql/17/main/postgresql.conf

# Now, open the postgresql.conf file in a text editor, uncomment the line that starts with the listen_addresses, and replace ‘localhost’ with ‘*’.
# This setting is located under the CONNECTIONS AND AUTHENTICATION section
# Set the listen_addresses = "*"

# Check postgres logs
sudo tail -f /var/log/postgresql/postgresql-17-main.log

# =========INSTALL VISUAL STUDIO CODE========== #
echo "Updating All Repositories"
sudo apt update

echo "Installing wget"
sudo apt install wget

echo "Installing gpg"
sudo apt install gpg

echo "Getting the Key"
wget -qO- https://packages.microsoft.com/keys/microsoft.asc \
  | gpg --dearmor \
  | sudo tee /usr/share/keyrings/packages.microsoft.gpg > /dev/null

echo "Adding the repository" 
echo "deb [arch=amd64,arm64,armhf signed-by=/usr/share/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" \
  | sudo tee /etc/apt/sources.list.d/vscode.list

echo "Updating All Repositories"
sudo apt update

echo "Installing VS Code"
sudo apt install code

# =========INSTALL GITHUB DESKTOP========== #
## Direct copy-paste from official instrubtions
## Github Desktop for Ubuntu
## Get the @shiftkey package feed
sudo apt update
sudo apt install gnupg
sudo mkdir -p /etc/apt/keyrings
wget -qO- https://mirror.mwt.me/shiftkey-desktop/gpgkey | gpg --dearmor | sudo tee /etc/apt/keyrings/mwt-desktop.gpg > /dev/null
echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/mwt-desktop.gpg] https://mirror.mwt.me/shiftkey-desktop/deb/ any main" | sudo tee /etc/apt/sources.list.d/mwt-desktop.list
## Install Github Desktop for Ubuntu
sudo apt update 
sudo apt install github-desktop

# =========INSTALL TYPESCRIPT AND JEST========== #
sudo npm install -g typescript@5

npx jest chains.service.spec.ts --watch
npm test -- chains.service.spec.ts

# Stray Commands
SELECT MAX(chain_id) FROM chains;
SELECT last_value FROM chains_chain_id_seq;
# If last_value is lower than the maximum chain_id, reset the sequence:
SELECT setval('chains_chain_id_seq', (SELECT MAX(chain_id) FROM chains));

SELECT MAX(outlet_id) FROM outlets;
SELECT last_value FROM outlets_outlet_id_seq;
SELECT setval('outlets_outlet_id_seq', (SELECT MAX(outlet_id) FROM outlets));

SELECT MAX(post_id) FROM posts;
SELECT last_value FROM posts_post_id_seq;
SELECT setval('posts_post_id_seq', (SELECT MAX(post_id) FROM posts));

SELECT MAX(comment_id) FROM comments;
SELECT last_value FROM comments_comment_id_seq;
SELECT setval('comments_comment_id_seq', (SELECT MAX(comment_id) FROM comments));

npm test -- chains.service.spec.ts --detectOpenHandles
npm test -- outlets.service.spec.ts --detectOpenHandles
npm test -- posts.service.spec.ts --detectOpenHandles
npm test -- comments.service.spec.ts --detectOpenHandles

# Do a Prisma migration
# npx prisma migrate dev --name <name_of_migration>
npx prisma migrate dev --name add_post_title

# After that, mandatorily run "npx prisma generate" to generate the new Prisma Client.
npx prisma generate  

# Check the prisma migration status using "npx prisma migrate status"
npx prisma migrate status

# Creating an empty migration in Prisma
npx prisma migrate dev --create-only --name remove_deleted_comment_content_trigger

# We then add the necessary SQL statements inside the empty migration.sql file and execute the migration using
npx prisma migrate dev  

# Creating a shared uniqueness constraint between comment_id and reply_id in the Comments table
npx prisma migrate dev --name add_comment_reply_unique_constraint
npx prisma generate

# Removing the uniqueness constraint on comment_id and reply_id
# Renaming reply_id to parent_comment_id
# Already manually deleted all comments from the comments table in the database
npx prisma migrate dev --name remove_comment_reply_unique_constraint_rename_reply_id_to_parent_comment_id
npx prisma generate

# Rename the parent_comment_id to parent_id
npx prisma migrate dev --name rename_parent_comment_id_to_parent_id
npx prisma generate

# Add chain_manager to UserRole
npx prisma migrate dev --name add_chain_manager_to_user_role_enum
npx prisma generate

# Create an enum for countries
npx prisma migrate dev --create-only --name add_country_check_constraint
npx prisma migrate dev
npx prisma generate