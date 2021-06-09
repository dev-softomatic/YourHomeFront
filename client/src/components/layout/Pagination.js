import React from "react";
import './style.css'
import {Link} from 'react-router-dom'

const Pagination = ({ documentsCount, page, onPage }) => {
    const pageSize = 20;
    const numberOfPages = Math.ceil(documentsCount / pageSize);
    console.log(documentsCount);
    const next = () => onPage(page+1)
    const prev = () => onPage(page-1)

  return (
    <div className="row justify-content-center mr-3">
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
            <button onClick={prev} className="page-link"  aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </button>
          </li>
          {new Array(numberOfPages).fill(0).map((en, pg) => (
            <li className="page-item" key={pg}>
              <button className={`page-link ${pg+1 === page ? 'active' : ''}`} onClick={e => onPage(pg+1)}>
                {pg+1}
              </button>
            </li>
          ))}
          <li className={`page-item ${page === numberOfPages ? 'disabled' : ''}`}>
            <button onClick={next} className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
