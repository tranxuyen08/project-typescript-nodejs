import React from 'react'
import { Link } from 'react-router-dom'
import "./ExpNotify.css"
const ExpNotify: React.FC = () => {
  return (
    <div className='wrapper-exp'>
        <section className='modal-exp'>
            <h2>Phiên đăng nhập đã hết,vui lòng đăng nhập lại</h2>
            <Link to="/login">Đăng nhập</Link>
        </section>
    </div>
  )
}

export default ExpNotify