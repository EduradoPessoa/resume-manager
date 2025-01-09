#!/bin/bash

PROJECT_ID="677fe6d200040222b560"
DATABASE_ID="default"
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
        ${data:+-d "$data"} \
        "$ENDPOINT$path"
}

# Criar coleção users
echo "Criando coleção users..."
make_request "POST" "/databases/$DATABASE_ID/collections" '{
    "collectionId": "users",
    "name": "Users",
    "documentSecurity": true,
    "permissions": ["read(\"any\")", "create(\"any\")", "update(\"any\")", "delete(\"any\")"]
}'

sleep 2

# Adicionar atributos para users
echo "Adicionando atributos para users..."
make_request "POST" "/databases/$DATABASE_ID/collections/users/attributes/string" '{
    "key": "email",
    "size": 255,
    "required": true
}'

sleep 2

make_request "POST" "/databases/$DATABASE_ID/collections/users/attributes/string" '{
    "key": "name",
    "size": 255,
    "required": true
}'

sleep 2

make_request "POST" "/databases/$DATABASE_ID/collections/users/attributes/string" '{
    "key": "phone",
    "size": 50,
    "required": false
}'

sleep 2

make_request "POST" "/databases/$DATABASE_ID/collections/users/attributes/boolean" '{
    "key": "isAdmin",
    "required": true,
    "default": false
}'

sleep 2

make_request "POST" "/databases/$DATABASE_ID/collections/users/attributes/boolean" '{
    "key": "isBlocked",
    "required": true,
    "default": false
}'

sleep 2

make_request "POST" "/databases/$DATABASE_ID/collections/users/attributes/boolean" '{
    "key": "isPremium",
    "required": true,
    "default": false
}'

sleep 2

# Criar índices para users
echo "Criando índices para users..."
make_request "POST" "/databases/$DATABASE_ID/collections/users/indexes" '{
    "key": "email_index",
    "type": "key",
    "attributes": ["email"],
    "orders": ["ASC"]
}'

sleep 2

make_request "POST" "/databases/$DATABASE_ID/collections/users/indexes" '{
    "key": "isadmin_index",
    "type": "key",
    "attributes": ["isAdmin"],
    "orders": ["ASC"]
}'

sleep 2

# Criar coleção resumes
echo "Criando coleção resumes..."
make_request "POST" "/databases/$DATABASE_ID/collections" '{
    "collectionId": "resumes",
    "name": "Resumes",
    "documentSecurity": true,
    "permissions": ["read(\"any\")", "create(\"any\")", "update(\"any\")", "delete(\"any\")"]
}'

sleep 2

# Adicionar atributos para resumes
echo "Adicionando atributos para resumes..."
make_request "POST" "/databases/$DATABASE_ID/collections/resumes/attributes/string" '{
    "key": "userId",
    "size": 255,
    "required": true
}'

sleep 2

make_request "POST" "/databases/$DATABASE_ID/collections/resumes/attributes/string" '{
    "key": "title",
    "size": 255,
    "required": true
}'

sleep 2

make_request "POST" "/databases/$DATABASE_ID/collections/resumes/attributes/enum" '{
    "key": "template",
    "elements": ["minimalist", "modern"],
    "required": true
}'

sleep 2

make_request "POST" "/databases/$DATABASE_ID/collections/resumes/attributes/boolean" '{
    "key": "isPublic",
    "required": true,
    "default": false
}'

sleep 2

# Criar índices para resumes
echo "Criando índices para resumes..."
make_request "POST" "/databases/$DATABASE_ID/collections/resumes/indexes" '{
    "key": "userid_index",
    "type": "key",
    "attributes": ["userId"],
    "orders": ["ASC"]
}'

sleep 2

make_request "POST" "/databases/$DATABASE_ID/collections/resumes/indexes" '{
    "key": "ispublic_index",
    "type": "key",
    "attributes": ["isPublic"],
    "orders": ["ASC"]
}'

echo "Configuração das coleções concluída!"
