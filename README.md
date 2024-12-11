# Grocery Management API

## **Features**

- **User Authentication**: Signup, Login with JWT.
- **Admin Management**: Admins can add groceries, manage stock levels etc.
- **Order Management**: Users can place orders and view their order history.

---

## **API Endpoints**

### **Auth APIs**
1. **Signup**
   - `POST /auth/signup`
   - **Payload**:
     ```json
     {
       "username": "string",
       "password": "string",
       "role": "admin | user"
     }
     ```
   - **Response**: Created user details.

2. **Login**
   - `POST /auth/login`
   - **Payload**:
     ```json
     {
       "username": "string",
       "password": "string"
     }
     ```
   - **Response**: JWT Token.

---

### **User APIs**
1. **View Groceries**
   - `GET /user/grocery`
   - **Response**: List of all available groceries.

2. **Create Order**
   - `POST /user/order`
   - **Payload**:
     ```json
     {
       "items": [
         { "id": "grocery_id", "quantity": number }
       ]
     }
     ```
   - **Response**: Order details including total amount.

3. **View User Orders**
   - `GET /user/orders`
   - **Response**: List of all orders placed by the user.

---

### **Admin APIs**
1. **Add Grocery**
   - `POST /admin/grocery`
   - **Payload**:
     ```json
     {
       "name": "string",
       "price": number,
       "stock": number,
       "description: "string
     }
     ```
   - **Response**: Added grocery details.

2. **Update Grocery**
   - `PUT /admin/grocery/:id`
   - **Payload**:
     ```json
     {
       "name": "string",
       "price": number,
       "stock": number,
       "description: "string
     }
     ```
   - **Response**: Updated grocery details.

3. **Delete Grocery**
   - `DELETE /admin/grocery/:id`
   - **Response**: Confirmation of deletion.

4. **Manage Inventory Levels**
   - `PUT /admin/inventory`
   - **Payload**:
     ```json
     {
       "id": "grocery_id"
       "stock": number
     }
     ```
   - **Response**: Updated stock levels.

5. **View Groceries**
   - `GET /admin/grocery`
   - **Response**: List of all groceries.

---

## **Setup Instructions**

### **1. Prerequisites**
- Node.js
- Docker (optional for containerized setup)
- PostgreSQL Database

---

### **2. Environment Variables**
Create a `.env` file in the `src` folder with the following:
```plaintext
PORT=3000
DB_URL=
