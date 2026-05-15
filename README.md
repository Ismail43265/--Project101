# Money Contry Web Application

Money Contry is a full-stack expense management and money-splitting web application built for students, bachelors, PG roommates, flatmates, and friend groups.

The application allows users to record shared expenses, track individual payments, split expenses among group members, and calculate the final amount each person 
needs to pay or receive. It is especially useful for managing daily shared expenses, flat/PG costs, and trip expenses in a simple and seamless way.

## Key Features

- Group Creation: Users can create separate groups for trips, PG expenses, flat expenses, events, or other shared activities.
- Authentication: Users can create their profile using Google login or standard email/password signup.
- Real-Time User Search: Users can search for other registered users in real time and add them as friends.
- Friend and Member Management: Users can add friends or other users to expense groups using their names.
- Bill Management: Users can add bills inside a group and split them among selected members.
- Expense Calculation: The application automatically calculates total group expenses and individual balances.
- Payable and Receivable Tracking: Users can see how much money they need to pay or receive after splitting expenses.
- Member Bill Visibility: Users can view bills paid by other group members.
- Contribution Tracking: Users can track who contributed to each split.
- Payment Settlement: Users can settle payments through UPI or cash.
- Auto Settlement Update: The application automatically updates payment status after settlement.

  ## Tech Stack

  ### Frontend
  - React.js
  - JavaScript
  - HTML5
  - CSS3
  - Tailwind CSS

  ### Backend
  - Node.js
  - Express.js
 
  ### Database
  - MongoDB
 
  ### Authentication
  - Google OAuth
  - Email/Password Authentication
  - JWT
 
  ### Other Tools and Libraries
  - Socket.io
  - Mongoose
  - Axios
  - bcrypt.js
  - Git
  - GitHub
  - Postman
 
  ## Screenshots

  Screenshots will be added soon.

 ## Installation and Setup

Follow the steps below to run this project locally.

### 1. Clone the repository

```bash
git clone https://github.com/Ismail43265/--Project101.git
```

### 2. Navigate to the project folder

```bash
cd --Project101
```

### 3. Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Frontend will run on:

```txt
http://localhost:5173
```

### 4. Backend Setup

Open a new terminal and run:

```bash
cd --Project101
cd Backend
npm install
```

### 5. Create `.env` file in the Backend folder

Create a `.env` file inside the `Backend` folder and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 6. Start the backend server

```bash
npx nodemon server.js
```

Backend will run on:

```txt
http://localhost:5000
```

## How It Works

1. User creates an account using Google login or email/password signup.
2. User creates a group for a trip, PG, flat, event, or any shared expense.
3. User searches and adds friends or other users to the group.
4. Any group member can add a bill and select the members involved in the split.
5. The application automatically splits the amount among selected members.
6. The system calculates the total group expenses.
7. The system shows how much each member has to pay or receive.
8. Users can view bills paid by other members.
9. Users can settle payments through UPI or cash.
10. After settlement, the payment status is updated automatically.

## Project Structure

```bash
--Project101/
│
├── Backend/
│   ├── controllers/
│   ├── DB/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   ├── server.js
│   ├── Socket.js
│   ├── package.json
│   ├── package-lock.json
│   └── .gitignore
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── socket.js
│   ├── index.html
│   ├── eslint.config.js
│   ├── vite.config.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .gitignore
│   └── README.md
│
└── README.md
```

## Future Improvements

- Add email notifications for pending payments.
- Add expense categories for better tracking.
- Add monthly expense reports.
- Add charts and analytics for expense visualization.
- Add PDF export for group expense summaries.
- Add dark mode.
- Add advanced search and filters.
- Add reminder notifications for unsettled payments.
- Improve mobile responsiveness.
- Deploy the application online.

## Author

**Mohammad Ismail Alam**

- GitHub: https://github.com/Ismail43265
- LinkedIn: [https://linkedin.com/in/your-linkedin-profile](https://www.linkedin.com/in/mohammad-ismail-alam-0b8953289/)
