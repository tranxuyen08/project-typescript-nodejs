import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

function RequiredAdmin() {
    const [hasToken, setHasToken] = useState(localStorage.getItem("accessToken"));

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setHasToken(token);
    }, []); // Chỉ chạy một lần sau khi component được tạo

    return (
        (hasToken && hasToken !== "") ? <Outlet /> : <Navigate to="/Login" replace />
    )
}

export default RequiredAdmin;
