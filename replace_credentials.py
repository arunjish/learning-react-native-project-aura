#!/usr/bin/env python3
import re
import sys

# Patterns to find and replace hardcoded credentials
replacements = [
    (r'projectId: "[^"]*"', 'projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID'),
    (r'databaseId: "[^"]*"', 'databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID'),
    (r'userCollectionId: "[^"]*"', 'userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID'),
    (r'videoCollectionId: "[^"]*"', 'videoCollectionId: process.env.EXPO_PUBLIC_APPWRITE_VIDEO_COLLECTION_ID'),
    (r'storageId: "[^"]*"', 'storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID'),
    (r'platform: "[^"]*"', 'platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM'),
    (r'endpoint: "[^"]*"', 'endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT'),
]

content = sys.stdin.read()
for pattern, replacement in replacements:
    content = re.sub(pattern, replacement, content)
sys.stdout.write(content) 