
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAazTU3sUcUMuyLVqLOAWczOdXB8HIetq4",
//   authDomain: "mernai-3c70f.firebaseapp.com",
//   projectId: "mernai-b1525",
//   storageBucket: "mernai-b1525.firebasestorage.app",
//   messagingSenderId: "235206334441",
//   appId: "1:235206334441:web:7116ca0325274d99c01d78",
//   measurementId: "G-W98V3XNVJX"
// };

// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// export { auth, provider };

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfCXGScfzn0zVF4nxj8oiK3umV0QsVJCE",
  authDomain: "mernai-3c70f.firebaseapp.com",
  projectId: "mernai-3c70f",
  storageBucket: "mernai-3c70f.firebasestorage.app",
  messagingSenderId: "126190902730",
  appId: "1:126190902730:web:fc2158013e281dc9240333",
  measurementId: "G-PD60SKNXYE"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };