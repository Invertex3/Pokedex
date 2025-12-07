import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="page-btn"
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>

      {startPage > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="page-btn" aria-label="Page 1">1</button>
          {startPage > 2 && <span aria-hidden className="px-2">…</span>}
        </>
      )}

      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          aria-current={currentPage === page ? 'true' : 'false'}
          className={`page-btn ${currentPage === page ? 'active' : ''}`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span aria-hidden className="px-2">…</span>}
          <button onClick={() => onPageChange(totalPages)} className="page-btn" aria-label={`Page ${totalPages}`}>{totalPages}</button>
        </>
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="page-btn"
      >
        <FiChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
};

export default Pagination;
