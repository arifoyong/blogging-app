export const menuItems = [
  {
    id: 'home',
    label: 'Home',
    path: '/'
  },
  {
    id: 'category',
    label: 'Category',
    path: '/category'
  },
  {
    id: 'blogs',
    label: 'Blogs',
    path: '/blogs'
  },
  {
    id: 'search',
    label: 'Search',
    path: '/search'
  },
]


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyD7PufWEdyHx2_NWku-uWA2-GBt3Lu-TmI",
  authDomain: "blogging-app-5e4f6.firebaseapp.com",
  projectId: "blogging-app-5e4f6",
  storageBucket: "blogging-app-5e4f6.appspot.com",
  messagingSenderId: "1012042249444",
  appId: "1:1012042249444:web:c5dabbc6b98bcd6462a8f1",
  measurementId: "G-NBWWJSBLVR"
};

export const initialBlogFormData = {
  title: '', 
  description: '',
  imageUrl: '',
  category: ''
}