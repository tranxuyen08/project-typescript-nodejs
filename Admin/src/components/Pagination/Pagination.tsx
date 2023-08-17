import React, { useState } from "react";
import "./Pagination.css";
import { PaginationData } from "../../types/types";

interface PaginationProps {
  pagination: PaginationData; // Sử dụng kiểu dữ liệu đã định nghĩa
  handleOnPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pagination, handleOnPageChange }) => {
  const [isLoad, setIsLoad] = useState(true);

  const totalPage = Math.ceil(
    Number(pagination._totalMovie) / Number(pagination._limit)
  );

  const handleClick = (newPage: number) => {
    if (handleOnPageChange) {
      handleOnPageChange(newPage);
    }
  };

  return (
    <div className="pagination">
      <button
        disabled={pagination._page <= 1}
        onClick={() => handleClick(pagination._page - 1)}
        className="btn btn-action"
      >
        prev
      </button>
      {Array.from({ length: totalPage }).map((_, index) => (
        <p
          key={index}
          className={`number-pagination ${
            pagination._page === index + 1 ? "active" : ""
          }`}
          onClick={() => handleClick(index + 1)}
        >
          {index + 1}
        </p>
      ))}
      <button
        disabled={pagination._page >= totalPage}
        onClick={() => handleClick(pagination._page + 1)}
        className="btn btn-action"
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
