
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Administration:React.FC = () => {
    const navigate = useNavigate();


    function handleLogout(){
        localStorage.removeItem("token");

        navigate("/signin")
    }

    useEffect(() =>{

        const statusLogado = localStorage.getItem("token");

        if(!statusLogado){
            navigate("/signin");
        }
    })

    return (
        <div>
            <h1>adm</h1>
            <button type="button" onClick={handleLogout}>logout</button>
        </div>
    )
}

export default Administration;