# Peppermint API Documentation

## Base URL
```
http://localhost:5003
```

## Authentication

Peppermint uses JWT Bearer token authentication. After logging in, include the token in all API requests:

```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### Authentication

#### Login
```http
POST /api/v1/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "your-password"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name",
    "isAdmin": false
  }
}
```

#### Register User (Admin only)
```http
POST /api/v1/auth/user/register
```

**Headers:**
```
Authorization: Bearer <admin-jwt-token>
```

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "secure-password",
  "name": "New User",
  "admin": false
}
```

#### Forgot Password
```http
POST /api/v1/auth/forgot-password
```

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

#### Reset Password
```http
POST /api/v1/auth/reset-password
```

**Request Body:**
```json
{
  "token": "reset-token",
  "password": "new-password"
}
```

### Tickets

#### Create Ticket
```http
POST /api/v1/ticket/create
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "title": "Ticket Title",
  "detail": "Ticket description",
  "priority": "low|medium|high",
  "type": "bug|feature|question",
  "clientId": "optional-client-id"
}
```

#### Get All Tickets
```http
GET /api/v1/tickets
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**
- `status`: Filter by status (open, closed, pending)
- `priority`: Filter by priority (low, medium, high)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

#### Get Single Ticket
```http
GET /api/v1/ticket/:id
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

#### Update Ticket
```http
PUT /api/v1/ticket/:id
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "detail": "Updated description",
  "priority": "high",
  "status": "closed"
}
```

#### Delete Ticket
```http
DELETE /api/v1/ticket/:id
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

#### Public Ticket Creation
```http
POST /api/v1/ticket/public/create
```

**Note:** No authentication required

**Request Body:**
```json
{
  "email": "customer@example.com",
  "name": "Customer Name",
  "title": "Issue Title",
  "detail": "Issue description"
}
```

### Users

#### Get All Users (Admin only)
```http
GET /api/v1/users
```

**Headers:**
```
Authorization: Bearer <admin-jwt-token>
```

#### Get User Profile
```http
GET /api/v1/user/profile
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

#### Update User Profile
```http
PUT /api/v1/user/profile
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "name": "Updated Name",
  "email": "newemail@example.com"
}
```

#### Delete User (Admin only)
```http
DELETE /api/v1/user/:id
```

**Headers:**
```
Authorization: Bearer <admin-jwt-token>
```

### Clients

#### Create Client
```http
POST /api/v1/client/create
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "name": "Client Name",
  "email": "client@example.com",
  "phone": "1234567890",
  "address": "Client Address"
}
```

#### Get All Clients
```http
GET /api/v1/clients
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

#### Update Client
```http
PUT /api/v1/client/:id
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

#### Delete Client
```http
DELETE /api/v1/client/:id
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

### Webhooks

#### Create Webhook
```http
POST /api/v1/webhook/create
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "name": "Webhook Name",
  "url": "https://your-webhook-url.com",
  "type": "ticket.created|ticket.updated|ticket.closed",
  "active": true
}
```

#### Get All Webhooks
```http
GET /api/v1/webhooks
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

### Email Queue

#### Get Email Queue Status
```http
GET /api/v1/email-queue/status
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

### Health Check

#### Health Status
```http
GET /
```

**No authentication required**

**Response:**
```json
{
  "healthy": true
}
```

## Error Responses

All API errors follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (only in development mode)"
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (invalid input)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `429` - Too Many Requests (rate limited)
- `500` - Internal Server Error

## Rate Limiting

API endpoints are rate-limited to prevent abuse:

- Authentication endpoints: 5 requests per minute
- General endpoints: 100 requests per minute per user
- Public endpoints: 20 requests per minute per IP

## Security Notes

1. Always use HTTPS in production
2. Keep your JWT tokens secure and never expose them in client-side code
3. Tokens expire after 24 hours by default
4. Use strong passwords and enable 2FA when available
5. Sanitize all user inputs to prevent XSS attacks
6. Use environment variables for sensitive configuration

## Environment Variables

Required environment variables for API operation:

```bash
# Database
DB_USERNAME=peppermint
DB_PASSWORD=your-secure-password
DB_HOST=peppermint_postgres
DB_NAME=peppermint

# Security
SECRET=base64-encoded-secret-key

# Optional
NODE_ENV=production
API_PORT=5003
```