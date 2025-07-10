import { useContext } from "react";
import { SessionContext } from "../contexts/sessionContext";

const useSession = () => {
    const data = useContext(SessionContext)

    return data
}

export default useSession