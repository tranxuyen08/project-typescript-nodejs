import { useEffect, useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom'
import ExpNotify from "../ExpNotify/ExpNotify";
import jwtDecode from 'jwt-decode'

interface DecodedToken {
    exp: number;
  }
function RequiredAuth() {
    const token:any = localStorage.getItem("accessToken")  // lấy token từ localStorage về JSON.parse(...)
    const [exp, setExp] = useState(false) //set trạng thái để hiện popup hết phiên đăng nhập
    const navigate = useNavigate()
    useEffect(() => {
        try {
            let date = new Date()
            let decode = jwtDecode<DecodedToken>(token)
            if (decode && decode.exp > date.getTime() / 1000) {
                //néu token còn hạng thì chỉ chuyển hướng trang vào outlet
                setExp(false)
                console.log(1111, decode);
            } else {
                // nếu hết hạng thì hiện popup thông báo hết phiên
                setExp(true)
                console.log(1111, "Hết hạn");
            }
        } catch (error) {
            // nếu cố ý nhập bậy token thì cho về login
            navigate("/login")
            console.log(error, "Token bậy")
        }
    }, [])
     return (
        <>
        {exp && <ExpNotify />}
        <Outlet />
    </>
        // (hasToken && hasToken !== "" && hasToken !== null) ? <Outlet /> : <Navigate to="/Login" replace />
    )
}

export default RequiredAuth;