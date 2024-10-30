import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../../firebaseConfig";

import './style.scss'
import { useEffect, useState } from "react";

const SignIn:React.FC = () =>{
    const [statusLogin, setStatusLogin] = useState<String | null>("");
    const navigate = useNavigate();

    function handleGoogleSignIn(){
        const provider = new GoogleAuthProvider();

        signInWithPopup( auth, provider)
        .then((result) =>{

            localStorage.setItem("token", JSON.stringify(result));

            navigate("/admin");
            console.log(result);    

        }).catch((error) =>{
            console.log(error);
        })
    }

    useEffect(() => {
        setStatusLogin(localStorage.getItem("token"));

        if(statusLogin){
            navigate("/admin");
        }
        
    })

   return(
    <section className='container'>
        <div className='signInCard'>
            <h2>Entrar</h2>
            <span>
                Acesse sua conta por uma das opções abaixo.
            </span>
            <button type="button" onClick={handleGoogleSignIn}><FaGoogle className="icon"/>Conta google</button>
        </div>
    </section>
   ) 
}

export default SignIn;