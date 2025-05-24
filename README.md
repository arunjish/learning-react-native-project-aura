# React Native Expo App - React Native Learning Project

A mobile app built as part of my React Native learning journey, following JavaScript Mastery's tutorial.

## 📚 Tutorial Source

Video: [React Native Full Course for Beginners - Build a Full Stack React Native App](https://www.youtube.com/watch?v=ZBCUegTZF7M&t&ab_channel=JavaScriptMastery) by @JavaScriptMastery

## 🎯 Learning Focus

- React Native fundamentals and components
- Expo development workflow
- Mobile app navigation
- State management and props
- Mobile UI/UX principles
- Cross-platform development

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

**Important:** This app requires Appwrite configuration through environment variables.

1. Copy the environment template:

```bash
cp .env.example .env
```

2. Update `.env` with your actual Appwrite credentials:

```bash
# Open .env and replace the placeholder values with your actual Appwrite config
EXPO_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
EXPO_PUBLIC_APPWRITE_PLATFORM=your_platform_id
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID=your_user_collection_id
EXPO_PUBLIC_APPWRITE_VIDEO_COLLECTION_ID=your_video_collection_id
EXPO_PUBLIC_APPWRITE_STORAGE_ID=your_storage_id
```

### 3. Start the Development Server

```bash
npx expo start
```

Open the Expo Go app on your phone and scan the QR code to view the project.

## 🔧 Configuration Notes

- **Environment Variables:** All Appwrite credentials are stored in environment variables for security
- **Template File:** Use `.env.example` as a reference for required environment variables
- **Security:** The `.env` file is git-ignored to prevent credential exposure

## 🙏 Acknowledgments

Thanks to JavaScript Mastery for the excellent React Native tutorial!
