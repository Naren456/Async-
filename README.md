# ASync MERN Project 📚

## Description

**ASync** is a mobile application built with React Native (Expo) and a Node.js backend. It's designed to help college students manage their academic resources, track assignments, view deadlines, and access course notes. The application features role-based access for students and teachers (admins), with a dedicated admin panel for managing content and users.

---

## ✨ Features

* **User Authentication:** Secure sign-up and sign-in using email/password, managed with JWT.
* **Role-Based Access:** Distinct interfaces and capabilities for `STUDENT` and `TEACHER` roles.
* **Student Dashboard:** Displays user stats like total subjects, assignments, and upcoming deadlines.
* **Assignment Tracking:**
    * Students view assignments relevant to their cohort, grouped by due date, with links to assignment details.
    * Teachers manage assignments (create, edit, delete) via an admin form.
* **Coursera Integration:** Fetches assignment data from Coursera ICS calendar URLs based on cohort. Includes backend jobs for syncing assignments.
* **Subject & Notes Management:**
    * Teachers manage subjects (CRUD) and can upload PDF notes associated with subjects. PDFs are stored using Cloudinary.
    * Students can filter subjects by semester/term and view associated notes.
    * Integrated PDF viewer for notes.tsx].
* **Profile Management:** Users can view and update their name and email.
* **Admin Panel:** Teachers have access to a dashboard with overall statistics and quick actions to manage assignments, subjects, users, and analytics.
* **Scheduled Jobs:** Backend includes cron jobs for cleaning up old assignments and syncing Coursera data.
* **Push Notifications:** Includes setup for requesting permissions and scheduling local notifications using `expo-notifications`.

---

## 💻 Tech Stack

* **Frontend:**
    * React Native
    * Expo SDK
    * Expo Router (File-based routing)
    * Redux & React-Redux (State Management)
    * NativeWind (Tailwind CSS for React Native)
    * Axios (HTTP client)
    * Formik & Yup (Form handling and validation)
    * Lucide Icons
    * `react-native-pdf` (PDF Viewing).tsx]
    * `expo-notifications`
* **Backend:**
    * Node.js
    * Express
    * Prisma (ORM for PostgreSQL)
    * PostgreSQL (Database)
    * JWT (JSON Web Tokens for Auth)
    * Cloudinary (Cloud storage for PDF uploads)
    * Multer (Middleware for handling `multipart/form-data`, used for uploads)
    * Node Cron (Task scheduling)
    * `ical.js` / `ical` (Parsing ICS calendar files)
    * Bcryptjs (Password hashing)

---

## 📁 Project Structure

```
.
├── Backend/
│   ├── config/         # Database, Cloudinary, JWT config
│   ├── controllers/    # Request handling logic
│   ├── jobs/           # Scheduled tasks (cron jobs)
│   ├── middleware/     # Auth, upload middleware
│   ├── prisma/         # Prisma schema and migrations
│   ├── routes/         # API endpoint definitions
│   ├── utils/          # Helper functions (ICS parser, etc.)
│   ├── index.js        # Main server entry point
│   ├── package.json
│   └── ...
├── Frontend/
│   ├── api/            # Functions for calling the backend API
│   ├── app/            # Expo Router screens and layouts
│   ├── assets/         # Images, fonts
│   ├── components/     # Reusable UI components
│   ├── store/          # Redux state management
│   ├── utils/          # Utility functions (e.g., notifications)
│   ├── app.json        # Expo config
│   ├── eas.json        # EAS Build config
│   ├── metro.config.js # Metro bundler config
│   ├── tailwind.config.js # Tailwind CSS config
│   ├── package.json
│   └── ...
└── .gitignore          # Project root gitignore

```


## 🚀 Getting Started

1.  **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd async
    ```

2.  **Backend Setup:**
    ```bash
    cd Backend
    npm install
    ```
    * Create a `.env` file based on `.env.example` (if available) or configure the following environment variables:
        * `DATABASE_URL`: Your PostgreSQL connection string.
        * `JWT_SECRET`: A secret key for signing JWTs.
        * `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: Credentials for your Cloudinary account.
    * Apply database migrations:
        ```bash
        npx prisma migrate dev
        ```
    * (Optional) Seed the database if seed scripts are available:
        ```bash
        npx prisma db seed
        ```
    * Start the development server:
        ```bash
        npm run dev
        ```

3.  **Frontend Setup:**
    ```bash
    cd ../Frontend
    npm install
    ```
    * Configure the backend API URL in `Frontend/api/config.js` or via environment variables if set up that way.
    * Start the Expo development server:
        ```bash
        npx expo start
        ```
    * Follow the instructions in the terminal to run the app on an emulator, simulator, or physical device using the Expo Go app or a development build.

---

## 🛠️ Building for Production (Android APK)

**Using EAS Build (Recommended):**

1.  Install EAS CLI: `npm install -g eas-cli`
2.  Login: `eas login`
3.  Configure `eas.json` and `app.json` (especially `android.package` and build profiles).
4.  Start build: `cd Frontend && eas build -p android --profile production`
5.  Follow prompts (especially for Keystore setup).
6.  Download the APK from the EAS build details page.

**Building Locally:**

1.  **Prerequisites:** Android Studio, SDK, JDK, Android Keystore.
2.  Generate native project: `cd Frontend && npx expo prebuild --platform android --clean`
3.  Configure signing in `Frontend/android/gradle.properties` and potentially `Frontend/android/app/build.gradle`.
4.  Build: `cd android && ./gradlew assembleRelease` (use `gradlew.bat` on Windows).
5.  Find APK in `Frontend/android/app/build/outputs/apk/release/`.

# Screenshots
## User Dashboard



# Demo 
🎥 [Watch Demo Video on Google Drive](https://drive.google.com/file/d/1DWEfB8W5igEUpIqNDGv97bxKVqlaRhlA/view?usp=sharing)
