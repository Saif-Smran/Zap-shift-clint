# Firebase Setup Guide

## Prerequisites
- A Firebase project (create one at https://console.firebase.google.com/)
- Node.js and npm installed

## Firebase Configuration

1. **Create a Firebase Project:**
   - Go to https://console.firebase.google.com/
   - Click "Create a project" or select an existing project
   - Follow the setup wizard

2. **Enable Authentication:**
   - In your Firebase console, go to "Authentication" in the left sidebar
   - Click "Get started"
   - Enable "Email/Password" authentication
   - Enable "Google" authentication (optional, for Google login)

3. **Get Your Firebase Config:**
   - In your Firebase console, click the gear icon (⚙️) next to "Project Overview"
   - Select "Project settings"
   - Scroll down to "Your apps" section
   - Click the web icon (</>)
   - Register your app with a nickname
   - Copy the firebaseConfig object

4. **Create Environment Variables:**
   - Create a `.env` file in the root directory of your project
   - Add the following variables with your Firebase config values:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

5. **Install Dependencies:**
   ```bash
   npm install
   ```

6. **Start the Development Server:**
   ```bash
   npm run dev
   ```

## Features Added

### Login Page (`/auth/login`)
- ✅ Email/password authentication
- ✅ Google authentication
- ✅ Form validation with react-hook-form
- ✅ Sweet alerts for success/error messages
- ✅ Loading states
- ✅ Error handling for various Firebase auth errors
- ✅ Navigation to home page after successful login

### Register Page (`/auth/register`)
- ✅ Email/password registration
- ✅ Google registration
- ✅ Profile photo upload with validation
- ✅ Form validation with react-hook-form
- ✅ Sweet alerts for success/error messages
- ✅ Loading states
- ✅ Error handling for various Firebase auth errors
- ✅ Navigation to home page after successful registration

### Sweet Alerts
- Success messages for successful login/registration
- Error messages with specific Firebase error codes
- File validation for photo uploads
- Auto-dismissing success alerts

### UI Improvements
- Loading spinners during authentication
- Disabled form inputs during loading
- Proper navigation between login and register pages
- Responsive design with DaisyUI components

## Troubleshooting

### Common Issues:

1. **"Firebase: Error (auth/invalid-api-key)"**
   - Check that your Firebase API key is correct in the .env file
   - Make sure the .env file is in the root directory

2. **"Firebase: Error (auth/operation-not-allowed)"**
   - Enable Email/Password authentication in your Firebase console
   - Go to Authentication > Sign-in method > Email/Password

3. **"Firebase: Error (auth/unauthorized-domain)"**
   - Add your domain to authorized domains in Firebase console
   - Go to Authentication > Settings > Authorized domains

4. **Google Login Not Working**
   - Enable Google authentication in Firebase console
   - Go to Authentication > Sign-in method > Google
   - Add your authorized domain

## File Structure

```
src/
├── Pages/
│   └── Auth/
│       ├── LoginPage.jsx (Updated with authentication)
│       └── Register.jsx (Updated with authentication)
├── Hooks/
│   └── UseAuth.jsx (Authentication hook)
├── Provider/
│   ├── AuthProvider.jsx (Firebase auth context)
│   └── firebase.init.js (Firebase configuration)
└── Routes/
    └── Route.jsx (Routing configuration)
```

## Dependencies Added

- `sweetalert2`: For beautiful alert messages
- `firebase`: For authentication (already installed)
- `react-hook-form`: For form handling (already installed)
- `react-router-dom`: For navigation (already installed) 