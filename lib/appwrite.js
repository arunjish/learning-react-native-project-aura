import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";

export const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID,
  videoCollectionId: process.env.EXPO_PUBLIC_APPWRITE_VIDEO_COLLECTION_ID,
  storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID,
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
} = config;
const client = new Client();

// Init your React Native SDK

client.setEndpoint(endpoint).setProject(projectId).setPlatform(platform);

const account = new Account(client);
const database = new Databases(client);
const avatars = new Avatars(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) {
      throw new Error("Failed to create user");
    }
    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);
    const newUser = await database.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    return account.createEmailPasswordSession(email, password);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error();
    const currentUser = await database.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw new Error();
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await database.listDocuments(databaseId, videoCollectionId);
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await database.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt"),
      Query.limit(7),
    ]);
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await database.listDocuments(databaseId, videoCollectionId, [
      Query.search("title", query),
    ]);
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getUserPosts = async (userId) => {
  try {
    const posts = await database.listDocuments(databaseId, videoCollectionId, [
      Query.equal("creator", userId),
    ]);
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signout = async () => {
  try {
    return account.deleteSession("current");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
