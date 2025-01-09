#!/bin/bash

# Configurar variáveis
PROJECT_ID="677fe6d200040222b560"
ENDPOINT="https://cloud.appwrite.io/v1"

# Instalar Appwrite CLI se não estiver instalada
if ! command -v appwrite &> /dev/null; then
    curl -sL https://appwrite.io/cli/install.sh | bash
fi

# Login no Appwrite (você precisa fazer login manualmente primeiro)
echo "Por favor, faça login no Appwrite CLI usando 'appwrite login' antes de continuar"
read -p "Pressione Enter para continuar..."

# Criar coleções
echo "Criando coleção users..."
appwrite databases create \
    --databaseId "default" \
    --name "Users" \
    --collectionId "users" \
    --documentSecurity true

# Adicionar atributos para users
appwrite databases createStringAttribute \
    --databaseId "default" \
    --collectionId "users" \
    --key "email" \
    --size 255 \
    --required true

appwrite databases createStringAttribute \
    --databaseId "default" \
    --collectionId "users" \
    --key "name" \
    --size 255 \
    --required true

appwrite databases createStringAttribute \
    --databaseId "default" \
    --collectionId "users" \
    --key "phone" \
    --size 50

appwrite databases createBooleanAttribute \
    --databaseId "default" \
    --collectionId "users" \
    --key "isAdmin" \
    --required true \
    --default false

appwrite databases createBooleanAttribute \
    --databaseId "default" \
    --collectionId "users" \
    --key "isBlocked" \
    --required true \
    --default false

appwrite databases createBooleanAttribute \
    --databaseId "default" \
    --collectionId "users" \
    --key "isPremium" \
    --required true \
    --default false

appwrite databases createDatetimeAttribute \
    --databaseId "default" \
    --collectionId "users" \
    --key "createdAt" \
    --required true

appwrite databases createDatetimeAttribute \
    --databaseId "default" \
    --collectionId "users" \
    --key "updatedAt" \
    --required true

# Criar índices para users
appwrite databases createIndex \
    --databaseId "default" \
    --collectionId "users" \
    --key "email" \
    --type "key" \
    --attributes '["email"]' \
    --orders '["ASC"]'

appwrite databases createIndex \
    --databaseId "default" \
    --collectionId "users" \
    --key "isAdmin" \
    --type "key" \
    --attributes '["isAdmin"]' \
    --orders '["ASC"]'

# Criar coleção resumes
echo "Criando coleção resumes..."
appwrite databases create \
    --databaseId "default" \
    --name "Resumes" \
    --collectionId "resumes" \
    --documentSecurity true

# Adicionar atributos para resumes
appwrite databases createStringAttribute \
    --databaseId "default" \
    --collectionId "resumes" \
    --key "userId" \
    --size 255 \
    --required true

appwrite databases createStringAttribute \
    --databaseId "default" \
    --collectionId "resumes" \
    --key "title" \
    --size 255 \
    --required true

appwrite databases createEnumAttribute \
    --databaseId "default" \
    --collectionId "resumes" \
    --key "template" \
    --elements '["minimalist","modern"]' \
    --required true

appwrite databases createJsonAttribute \
    --databaseId "default" \
    --collectionId "resumes" \
    --key "personalInfo" \
    --required true

appwrite databases createJsonAttribute \
    --databaseId "default" \
    --collectionId "resumes" \
    --key "experience" \
    --required true

appwrite databases createJsonAttribute \
    --databaseId "default" \
    --collectionId "resumes" \
    --key "education" \
    --required true

appwrite databases createJsonAttribute \
    --databaseId "default" \
    --collectionId "resumes" \
    --key "skills" \
    --required true

appwrite databases createBooleanAttribute \
    --databaseId "default" \
    --collectionId "resumes" \
    --key "isPublic" \
    --required true \
    --default false

appwrite databases createDatetimeAttribute \
    --databaseId "default" \
    --collectionId "resumes" \
    --key "createdAt" \
    --required true

appwrite databases createDatetimeAttribute \
    --databaseId "default" \
    --collectionId "resumes" \
    --key "updatedAt" \
    --required true

# Criar índices para resumes
appwrite databases createIndex \
    --databaseId "default" \
    --collectionId "resumes" \
    --key "userId" \
    --type "key" \
    --attributes '["userId"]' \
    --orders '["ASC"]'

appwrite databases createIndex \
    --databaseId "default" \
    --collectionId "resumes" \
    --key "isPublic" \
    --type "key" \
    --attributes '["isPublic"]' \
    --orders '["ASC"]'

# Criar coleção messages
echo "Criando coleção messages..."
appwrite databases create \
    --databaseId "default" \
    --name "Messages" \
    --collectionId "messages" \
    --documentSecurity true

# Adicionar atributos para messages
appwrite databases createStringAttribute \
    --databaseId "default" \
    --collectionId "messages" \
    --key "userId" \
    --size 255 \
    --required true

appwrite databases createStringAttribute \
    --databaseId "default" \
    --collectionId "messages" \
    --key "adminId" \
    --size 255 \
    --required true

appwrite databases createStringAttribute \
    --databaseId "default" \
    --collectionId "messages" \
    --key "subject" \
    --size 255 \
    --required true

appwrite databases createStringAttribute \
    --databaseId "default" \
    --collectionId "messages" \
    --key "content" \
    --size 65535 \
    --required true

appwrite databases createEnumAttribute \
    --databaseId "default" \
    --collectionId "messages" \
    --key "type" \
    --elements '["email","whatsapp"]' \
    --required true

appwrite databases createEnumAttribute \
    --databaseId "default" \
    --collectionId "messages" \
    --key "status" \
    --elements '["pending","sent","failed"]' \
    --required true

appwrite databases createDatetimeAttribute \
    --databaseId "default" \
    --collectionId "messages" \
    --key "createdAt" \
    --required true

# Criar índices para messages
appwrite databases createIndex \
    --databaseId "default" \
    --collectionId "messages" \
    --key "userId" \
    --type "key" \
    --attributes '["userId"]' \
    --orders '["ASC"]'

appwrite databases createIndex \
    --databaseId "default" \
    --collectionId "messages" \
    --key "adminId" \
    --type "key" \
    --attributes '["adminId"]' \
    --orders '["ASC"]'

appwrite databases createIndex \
    --databaseId "default" \
    --collectionId "messages" \
    --key "status" \
    --type "key" \
    --attributes '["status"]' \
    --orders '["ASC"]'

# Criar coleção user_consents
echo "Criando coleção user_consents..."
appwrite databases create \
    --databaseId "default" \
    --name "User Consents" \
    --collectionId "user_consents" \
    --documentSecurity true

# Adicionar atributos para user_consents
appwrite databases createStringAttribute \
    --databaseId "default" \
    --collectionId "user_consents" \
    --key "userId" \
    --size 255 \
    --required true

appwrite databases createEnumAttribute \
    --databaseId "default" \
    --collectionId "user_consents" \
    --key "type" \
    --elements '["terms","privacy"]' \
    --required true

appwrite databases createBooleanAttribute \
    --databaseId "default" \
    --collectionId "user_consents" \
    --key "granted" \
    --required true

appwrite databases createStringAttribute \
    --databaseId "default" \
    --collectionId "user_consents" \
    --key "version" \
    --size 50 \
    --required true

appwrite databases createDatetimeAttribute \
    --databaseId "default" \
    --collectionId "user_consents" \
    --key "grantedAt" \
    --required true

# Criar índices para user_consents
appwrite databases createIndex \
    --databaseId "default" \
    --collectionId "user_consents" \
    --key "userId" \
    --type "key" \
    --attributes '["userId"]' \
    --orders '["ASC"]'

appwrite databases createIndex \
    --databaseId "default" \
    --collectionId "user_consents" \
    --key "type" \
    --type "key" \
    --attributes '["type"]' \
    --orders '["ASC"]'

echo "Configuração do banco de dados concluída!"
