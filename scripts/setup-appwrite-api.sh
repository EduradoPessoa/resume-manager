#!/bin/bash

# Configurações
PROJECT_ID="677fe6d200040222b560"
ENDPOINT="https://cloud.appwrite.io/v1"
API_KEY="standard_a1efc72a7f37e3f0097b11e2af983b796a1425a43430c3257ab794137e7d55780af8c5edc7ff46e3d45c83b6ac92ade2cbfbdb6c9119bb74f46ae91940b3c9dd06bffe8ac2712c9ef1caffe1e4dba3bb343e9114eff0d10593834212f2532062046d7497024247efed81b5f1edfc985114b148f114cd975a71cc0bc1fa1c039f"

# Função para fazer requisições HTTP
make_request() {
    local method=$1
    local endpoint=$2
    local data=$3

    curl -X $method \
        -H "Content-Type: application/json" \
        -H "X-Appwrite-Project: $PROJECT_ID" \
        -H "X-Appwrite-Key: $API_KEY" \
        -d "$data" \
        "$ENDPOINT$endpoint"
}

# Criar banco de dados
echo "Criando banco de dados..."
DB_RESPONSE=$(make_request "POST" "/databases" '{
    "databaseId": "default",
    "name": "Resume Manager"
}')

# Criar coleção users
echo "Criando coleção users..."
USERS_RESPONSE=$(make_request "POST" "/databases/default/collections" '{
    "collectionId": "users",
    "name": "Users",
    "permissions": ["read(\"user:{{user.$id}}\")"],
    "documentSecurity": true
}')

# Adicionar atributos para users
make_request "POST" "/databases/default/collections/users/attributes/string" '{
    "key": "email",
    "size": 255,
    "required": true
}'

make_request "POST" "/databases/default/collections/users/attributes/string" '{
    "key": "name",
    "size": 255,
    "required": true
}'

make_request "POST" "/databases/default/collections/users/attributes/string" '{
    "key": "phone",
    "size": 50,
    "required": false
}'

make_request "POST" "/databases/default/collections/users/attributes/boolean" '{
    "key": "isAdmin",
    "required": true,
    "default": false
}'

make_request "POST" "/databases/default/collections/users/attributes/boolean" '{
    "key": "isBlocked",
    "required": true,
    "default": false
}'

make_request "POST" "/databases/default/collections/users/attributes/boolean" '{
    "key": "isPremium",
    "required": true,
    "default": false
}'

# Criar índices para users
make_request "POST" "/databases/default/collections/users/indexes" '{
    "key": "email",
    "type": "key",
    "attributes": ["email"],
    "orders": ["ASC"]
}'

make_request "POST" "/databases/default/collections/users/indexes" '{
    "key": "isAdmin",
    "type": "key",
    "attributes": ["isAdmin"],
    "orders": ["ASC"]
}'

# Criar coleção resumes
echo "Criando coleção resumes..."
RESUMES_RESPONSE=$(make_request "POST" "/databases/default/collections" '{
    "collectionId": "resumes",
    "name": "Resumes",
    "permissions": ["read(\"user:{{user.$id}}\")"],
    "documentSecurity": true
}')

# Adicionar atributos para resumes
make_request "POST" "/databases/default/collections/resumes/attributes/string" '{
    "key": "userId",
    "size": 255,
    "required": true
}'

make_request "POST" "/databases/default/collections/resumes/attributes/string" '{
    "key": "title",
    "size": 255,
    "required": true
}'

make_request "POST" "/databases/default/collections/resumes/attributes/enum" '{
    "key": "template",
    "elements": ["minimalist", "modern"],
    "required": true
}'

make_request "POST" "/databases/default/collections/resumes/attributes/boolean" '{
    "key": "isPublic",
    "required": true,
    "default": false
}'

# Criar índices para resumes
make_request "POST" "/databases/default/collections/resumes/indexes" '{
    "key": "userId",
    "type": "key",
    "attributes": ["userId"],
    "orders": ["ASC"]
}'

make_request "POST" "/databases/default/collections/resumes/indexes" '{
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

# Atualizar usuário admin para ter privilégios
ADMIN_ID=$(echo $ADMIN_RESPONSE | jq -r '.$id')
make_request "PATCH" "/databases/default/collections/users/documents/$ADMIN_ID" '{
    "isAdmin": true,
    "isPremium": true
}'

echo "Configuração concluída!"
