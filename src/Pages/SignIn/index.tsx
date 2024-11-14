import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, getDoc, setDoc, doc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import './style.scss';
import { useEffect, useState } from "react";



const SignIn: React.FC = () => {
    const [statusLogin, setStatusLogin] = useState<string | null>(null);
    const navigate = useNavigate();
    const db = getFirestore();

    async function criarDocumentoComIdEspecifico(id: string) {
        try {
            await setDoc(doc(db, "users", id), {
                name: "Teste",
                type: "undefined" // ou defina um valor padrão se necessário
            });
            console.log("Documento criado com ID específico:", id);
        } catch (error) {
            console.error("Erro ao criar documento:", error);
        }
    }

    async function verificarDocumento(email: string) {
        try {
            const consultaDoc = await getDoc(doc(db, "users", email));
            if (consultaDoc.exists()) {
                const comercioDb = consultaDoc.data();
                if (comercioDb.type === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/comercio");
                }
            } else {
                // Criar um documento com o email
                await criarDocumentoComIdEspecifico(email);
                navigate("/comercio"); // Navega após a criação do documento
            }
        } catch (error) {
            console.error("Erro ao verificar documento:", error);
        }
    }

    function handleGoogleSignIn() {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                localStorage.setItem("token", JSON.stringify(result));
                const userEmail = result.user.email;
                console.log(userEmail);
                if (userEmail) {
                    verificarDocumento(userEmail);
                } else {
                    console.error("O e-mail do usuário é nulo.");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        setStatusLogin(token);

        if (token) {
            navigate("/admin");
        }
    }, [statusLogin, navigate]); // Adiciona `navigate` e `statusLogin` como dependências

    return (
        <section className='container'>
            <div className='signInCard'>
                <h2>Entrar</h2>
                <span>Acesse sua conta por uma das opções abaixo.</span>
                <button type="button" onClick={handleGoogleSignIn}>
                    <FaGoogle className="icon" /> Conta Google
                </button>
            </div>
        </section>
    );
};

export default SignIn;
