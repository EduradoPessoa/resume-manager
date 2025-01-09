# Appwrite Collections

## Users Collection
- **Collection ID**: `users`
- **Attributes**:
  - `email` (string, required, unique)
  - `name` (string, required)
  - `phone` (string)
  - `isAdmin` (boolean, default: false)
  - `isBlocked` (boolean, default: false)
  - `isPremium` (boolean, default: false)
  - `createdAt` (datetime)
  - `updatedAt` (datetime)

## Resumes Collection
- **Collection ID**: `resumes`
- **Attributes**:
  - `userId` (string, required)
  - `title` (string, required)
  - `template` (string, enum: ['minimalist', 'modern'])
  - `personalInfo` (object)
    - `fullName` (string)
    - `email` (string)
    - `phone` (string)
    - `location` (string)
    - `summary` (string)
    - `linkedin` (string)
    - `github` (string)
    - `website` (string)
    - `portfolio` (string)
    - `about` (string)
  - `experience` (array)
    - `company` (string)
    - `position` (string)
    - `location` (string)
    - `startDate` (string)
    - `endDate` (string)
    - `current` (boolean)
    - `description` (string)
    - `achievements` (array)
  - `education` (array)
    - `institution` (string)
    - `degree` (string)
    - `field` (string)
    - `location` (string)
    - `startDate` (string)
    - `endDate` (string)
    - `current` (boolean)
    - `description` (string)
  - `skills` (array)
    - `name` (string)
    - `level` (number)
    - `category` (string)
  - `isPublic` (boolean, default: false)
  - `createdAt` (datetime)
  - `updatedAt` (datetime)

## Messages Collection
- **Collection ID**: `messages`
- **Attributes**:
  - `userId` (string, required)
  - `adminId` (string, required)
  - `subject` (string, required)
  - `content` (string, required)
  - `type` (string, enum: ['email', 'whatsapp'])
  - `status` (string, enum: ['pending', 'sent', 'failed'])
  - `createdAt` (datetime)

## User Consents Collection
- **Collection ID**: `user_consents`
- **Attributes**:
  - `userId` (string, required)
  - `type` (string, enum: ['terms', 'privacy'])
  - `granted` (boolean, required)
  - `version` (string, required)
  - `grantedAt` (datetime)

## Indexes e Permissões

### Users Collection
- Index por `email` (unique)
- Index por `isAdmin`
- Permissões:
  - Leitura: usuário autenticado
  - Escrita: apenas admin

### Resumes Collection
- Index por `userId`
- Index por `isPublic`
- Permissões:
  - Leitura: dono do documento ou admin
  - Escrita: dono do documento

### Messages Collection
- Index por `userId`
- Index por `adminId`
- Index por `status`
- Permissões:
  - Leitura: dono da mensagem ou admin
  - Escrita: apenas admin

### User Consents Collection
- Index por `userId`
- Index por `type`
- Permissões:
  - Leitura: dono do consentimento ou admin
  - Escrita: usuário autenticado
