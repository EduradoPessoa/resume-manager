#!/bin/bash

# Configurações
PROJECT_ID="677fe6d200040222b560"
API_KEY="standard_a1efc72a7f37e3f0097b11e2af983b796a1425a43430c3257ab794137e7d55780af8c5edc7ff46e3d45c83b6ac92ade2cbfbdb6c9119bb74f46ae91940b3c9dd06bffe8ac2712c9ef1caffe1e4dba3bb343e9114eff0d10593834212f2532062046d7497024247efed81b5f1edfc985114b148f114cd975a71cc0bc1fa1c039f"
ENDPOINT="https://cloud.appwrite.io/v1"

# Função para fazer requisições HTTP
make_request() {
    local method=$1
    local path=$2
    local data=$3

    curl -X $method \
        -H "Content-Type: application/json" \
        -H "X-Appwrite-Project: $PROJECT_ID" \
        -H "X-Appwrite-Key: $API_KEY" \
        -d "$data" \
        "$ENDPOINT$path"
}

# Listar bancos de dados existentes
echo "Listando bancos de dados..."
DATABASES=$(make_request "GET" "/databases")
DATABASE_ID=$(echo $DATABASES | jq -r '.databases[0].$id')

if [ -z "$DATABASE_ID" ]; then
    echo "Nenhum banco de dados encontrado. Criando um novo..."
    DATABASE_RESPONSE=$(make_request "POST" "/databases" '{
        "databaseId": "resume_manager",
        "name": "Resume Manager"
    }')
    DATABASE_ID=$(echo $DATABASE_RESPONSE | jq -r '.$id')
fi

echo "Usando banco de dados: $DATABASE_ID"

# Criar coleção users
echo "Criando coleção users..."
make_request "POST" "/databases/$DATABASE_ID/collections" '{
    "collectionId": "users",
    "name": "Users",
    "documentSecurity": true,
    "permissions": ["read(\"any\")", "create(\"any\")", "update(\"any\")", "delete(\"any\")"]
}'

# Adicionar atributos para users
make_request "POST" "/databases/$DATABASE_ID/collections/users/attributes/string" '{
    "key": "email",
    "size": 255,
    "required": true
}'

make_request "POST" "/databases/$DATABASE_ID/collections/users/attributes/string" '{
    "key": "name",
    "size": 255,
    "required": true
}'

make_request "POST" "/databases/$DATABASE_ID/collections/users/attributes/string" '{
    "key": "phone",
    "size": 50,
    "required": false
}'

make_request "POST" "/databases/$DATABASE_ID/collections/users/attributes/boolean" '{
    "key": "isAdmin",
    "required": true,
    "default": false
}'

make_request "POST" "/databases/$DATABASE_ID/collections/users/attributes/boolean" '{
    "key": "isBlocked",
    "required": true,
    "default": false
}'

make_request "POST" "/databases/$DATABASE_ID/collections/users/attributes/boolean" '{
    "key": "isPremium",
    "required": true,
    "default": false
}'

# Criar índices para users
make_request "POST" "/databases/$DATABASE_ID/collections/users/indexes" '{
    "key": "email",
    "type": "key",
    "attributes": ["email"],
    "orders": ["ASC"]
}'

make_request "POST" "/databases/$DATABASE_ID/collections/users/indexes" '{
    "key": "isAdmin",
    "type": "key",
    "attributes": ["isAdmin"],
    "orders": ["ASC"]
}'

# Criar coleção resumes
echo "Criando coleção resumes..."
make_request "POST" "/databases/$DATABASE_ID/collections" '{
    "collectionId": "resumes",
    "name": "Resumes",
    "documentSecurity": true,
    "permissions": ["read(\"any\")", "create(\"any\")", "update(\"any\")", "delete(\"any\")"]
}'

# Adicionar atributos para resumes
make_request "POST" "/databases/$DATABASE_ID/collections/resumes/attributes/string" '{
    "key": "userId",
    "size": 255,
    "required": true
}'

make_request "POST" "/databases/$DATABASE_ID/collections/resumes/attributes/string" '{
    "key": "title",
    "size": 255,
    "required": true
}'

make_request "POST" "/databases/$DATABASE_ID/collections/resumes/attributes/enum" '{
    "key": "template",
    "elements": ["minimalist", "modern"],
    "required": true
}'

make_request "POST" "/databases/$DATABASE_ID/collections/resumes/attributes/boolean" '{
    "key": "isPublic",
    "required": true,
    "default": false
}'

# Criar índices para resumes
make_request "POST" "/databases/$DATABASE_ID/collections/resumes/indexes" '{
    "key": "userId",
    "type": "key",
    "attributes": ["userId"],
    "orders": ["ASC"]
}'

make_request "POST" "/databases/$DATABASE_ID/collections/resumes/indexes" '{
    "key": "isPublic",
    "type": "key",
    "attributes": ["isPublic"],
    "orders": ["ASC"]
}'

# Criar usuário admin
echo "Criando usuário admin..."
ADMIN_RESPONSE=$(make_request "POST" "/users" '{
    "userId": "unique()",
    "email": "admin@phoenyx.com.br",
    "password": "Admin@123",
    "name": "Admin"
}')

ADMIN_ID=$(echo $ADMIN_RESPONSE | jq -r '.$id')

# Atualizar usuário admin para ter privilégios
make_request "PATCH" "/databases/$DATABASE_ID/collections/users/documents/$ADMIN_ID" '{
    "isAdmin": true,
    "isPremium": true
}'

echo "Configuração concluída!"
