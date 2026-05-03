import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getDatabase, ref, push, query, orderByChild, limitToLast, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemo-VoteWiseAI",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "votewise-ai.firebaseapp.com",
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://votewise-ai-default-rtdb.firebaseio.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "votewise-ai",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "votewise-ai.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef123456",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-XXXXXXXXXX",
};

let app, analytics, database;
try {
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    database = getDatabase(app);
} catch (error) {
    console.warn("Firebase initialization failed - offline mode:", error.message);
}

export const logAnalyticsEvent = (eventName, params = {}) => {
    try { if (analytics) logEvent(analytics, eventName, params); }
    catch (error) { console.warn("Analytics skipped:", eventName); }
};

export const submitScore = async (name, score, level) => {
    try {
          if (!database) return;
          await push(ref(database, "leaderboard"), { name: name || "Anonymous", score, level, timestamp: Date.now() });
          logAnalyticsEvent("quiz_score_submitted", { score, level });
    } catch (error) { console.warn("Score submission skipped:", error.message); }
};

export const getTopScores = (callback) => {
    try {
          if (!database) { callback([]); return () => {}; }
          const topScoresQuery = query(ref(database, "leaderboard"), orderByChild("score"), limitToLast(10));
          const unsubscribe = onValue(topScoresQuery, (snapshot) => {
                  const scores = [];
                  snapshot.forEach((child) => scores.push({ id: child.key, ...child.val() }));
                  callback(scores.reverse());
          });
          return unsubscribe;
    } catch (error) { callback([]); return () => {}; }
};

export const trackPageView = (viewName) => {
    logAnalyticsEvent("page_view", { page_title: "VoteWise AI - " + viewName });
};

export default app;
