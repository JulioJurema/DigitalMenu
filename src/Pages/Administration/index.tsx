import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./style.scss";

// Tipos para os dados dos usuários
interface Comercio {
  id: string;
  name: string;
  type: string;
}

interface UserInfo {
  email: string;
  uid: string;
}

const Administration: React.FC = () => {
  const navigate = useNavigate();
  const db = getFirestore();

  // Estado para armazenar a lista de comércios e informações do usuário
  const [listaComercios, setListaComercios] = useState<Comercio[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // Função para fazer logout
  function handleLogout() {
    localStorage.removeItem("token");
    setUserInfo(null);
    navigate("/signin");
  }

  // Função para buscar informações do usuário e a lista de comércios
  useEffect(() => {
    const verificaAuthEBuscaComercios = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }

      try {
        const statusLogado: UserInfo = JSON.parse(token);
        setUserInfo(statusLogado);

        // Buscar todos os documentos da coleção "users"
        const colecaoRef = collection(db, "users");
        const snapshot = await getDocs(colecaoRef);

        // Extrair dados dos documentos
        const auxiliar: Comercio[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Comercio[];

        setListaComercios(auxiliar);
      } catch (error) {
        console.error("Erro ao buscar documentos:", error);
        handleLogout(); // Faz logout se houver um erro
      }
    };

    verificaAuthEBuscaComercios();
  }, [db, navigate]);

  return (
    <section>
      <header className="cabecalho">
        <h1>Administração</h1>
        <nav className="navHeader">
          <h3>Olá, {userInfo?.email ?? "Visitante"}</h3>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>

      <div>
        {listaComercios.length > 0 ? (
          <ul>
            {listaComercios.map((comercio) => (
              <li key={comercio.id}>
                <strong>{comercio.name}</strong>: {comercio.type}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum comércio encontrado.</p>
        )}
      </div>
    </section>
  );
};

export default Administration;
