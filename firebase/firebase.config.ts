import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCsyZvpsvjN7hR8VzMRplApXNllTl_lDDw",
  authDomain: "booknab-cd7ec.firebaseapp.com",
  projectId: "booknab-cd7ec",
  storageBucket: "booknab-cd7ec.appspot.com",
  messagingSenderId: "162176290757",
  appId: "1:162176290757:web:e965f38af589894865c5ac",
  measurementId: "G-S6R3RLT4BM"
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
auth.useDeviceLanguage()
auth.config.apiKey = "AIzaSyCsyZvpsvjN7hR8VzMRplApXNllTl_lDDw"
export default auth
