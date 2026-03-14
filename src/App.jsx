import HtmlModule from "./components/HtmlModule";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc
} from "firebase/firestore";
import {
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
  onAuthStateChanged
} from "firebase/auth";
import {
  Search,
  Anchor,
  Medal,
  Globe,
  Lock
} from "lucide-react";

/* ================================
   ADMIN KEY
================================ */

const ADMIN_KEY = "HENM2025";

/* ================================
   FIREBASE CONFIG
================================ */

const firebaseConfig = {
  apiKey: "AIzaSyDG6dggOtqIkNXnbvLhzyLl_hJvpbQjhNk",
  authDomain: "henm-command.firebaseapp.com",
  projectId: "henm-command",
  storageBucket: "henm-command.appspot.com",
  messagingSenderId: "228056995538",
  appId: "1:228056995538:web:2b19485661e9f47b693f0b",
  measurementId: "G-0X0Z1851D7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const appId = "henm-elite-naval-academy-secure";

/* ================================
   MAIN APP
================================ */

export default function App() {

  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [module, setModule] = useState(null);

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [key, setKey] = useState("");

  /* ================================
     TRAINING DOCK MODULES
  =================================*/

  const trainingDocks = [

    {
      title: "VOCAB 2ND-3RD YEAR",
      desc: "NATO, FLAG, RENT A HOUSE",
      file: "modules/nato-flag.html"
    },

    {
      title: "TECH VOCAB 3RD YEAR",
      desc: "SEARCH-RESCUE",
      file: "modules/search-rescue.html"
    },
    
{
  title: "SPEAK LIKE A PRO",
  desc: "B2 ALMOST-INTERMEDIATE...",
  file: "modules/speak-pro.html"
},
    {
      title: "COMING SOON",
      desc: "Unblock 3rd Evaluation",
      file: "modules/listening.html"
    },

    {
      title: "COMING SOON",
      desc: "Unblock 3rd Evaluation",
      file: "modules/interview.html"
    },

  ];

  /* ================================
     AUTH
  =================================*/

  useEffect(() => {

    const initAuth = async () => {

      try {

        if (typeof __initial_auth_token !== "undefined") {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }

      } catch (e) {

        console.error(e);

      }

    };

    initAuth();

    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    return () => unsub();

  }, []);

  /* ================================
     UI
  =================================*/

  return (

<div className="min-h-screen bg-[#0a1a2f] text-white">

{/* NAVBAR */}

<div className="flex items-center justify-between px-10 py-5 border-b border-[#c5a059]">

<div className="flex items-center gap-3">

<Medal className="text-[#c5a059]" />

<h1 className="text-xl font-bold tracking-widest">
HENM COMMAND
</h1>

</div>

<div className="flex items-center gap-3 bg-[#122843] px-4 py-2 rounded">

<Search size={18}/>

<input
placeholder="Search tactical assets..."
className="bg-transparent outline-none"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</div>

</div>

{/* HERO */}

<div className="text-center mt-5">

<h1 className="text-6xl font-black tracking-widest">
HENM ELITE NAVAL
</h1>

<h2 className="text-6xl font-black text-[#c5a059]">
ACADEMY
</h2>

<div className="mt-6 text-sm tracking-[6px] border border-[#c5a059] inline-block px-6 py-2">
LEVEL 16-18 • ADVANCED DEPLOYMENT
</div>

</div>

{/* TRAINING DOCK */}

<div className="max-w-6xl mx-auto mt-9 px-6">

<div className="border border-[#c5a059] p-10 rounded mb-10">

<h2 className="text-3xl font-bold text-center mb-8">
TRAINING DOCK
</h2>

{/* MODULE GRID */}

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">

{trainingDocks.map((dock,i)=>(

<div
key={i}
className="bg-[#122843] border border-[#c5a059] aspect-square flex flex-col items-center justify-center text-center cursor-pointer hover:scale-105 transition p-2"
onClick={()=>setModule(dock.file)}
>

<h3 className="text-sm md:text-lg lg:text-xl font-bold text-[#c5a059] mb-1 break-words">
{dock.title}
</h3>

<p className="opacity-60 text-xs md:text-sm break-words">
{dock.desc}
</p>

</div>

))}

</div>

{/* MODULE CONTENT */}

{module ? (
  <div key={module} className="mt-3">
    <HtmlModule file={module} />
  </div>
) : (
  <div className="text-center mt-10 opacity-50">
    Select a training module
  </div>
)}

</div>

</div>

{/* ADD FORM */}

<div className="max-w-4xl mx-auto mt-12 p-10 border border-[#c5a059] rounded">

<h2 className="text-xl font-bold mb-6 flex items-center gap-2">

<Lock size={18}/>
Enlist Asset

</h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<input
placeholder="Name"
className="p-3 bg-[#122843] rounded"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="URL"
className="p-3 bg-[#122843] rounded"
value={url}
onChange={(e)=>setUrl(e.target.value)}
/>

<input
placeholder="Description"
className="p-3 bg-[#122843] rounded col-span-2"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<input
placeholder="Security Key"
className="p-3 bg-[#122843] rounded"
value={key}
onChange={(e)=>setKey(e.target.value)}
/>

<button
className="bg-[#c5a059] text-black font-bold rounded"
>
Deploy
</button>

</div>

</div>

{/* FOOTER */}

<div className="text-center mt-7 py-10 border-t border-[#c5a059]">

<div className="flex justify-center gap-6 mb-4">


<Anchor className="text-red-400 w-6 h-6" strokeWidth={2.5} />

</div>

<p className="font-bold tracking-wider text-green-500 animate-pulse">
  STOW NETWORK • ACTIVE
</p>

<p className="opacity-30 text-sm mt-2">
© 2026 HENM ELITE NAVAL ACADEMY
</p>

</div>

</div>

);

}