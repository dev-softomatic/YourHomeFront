import React from "react";
import './style.css'
import {Link} from 'react-router-dom'

const Pagination = ({ documentsCount }) => {
    const pageSize = 10;
    const numberOfPages = Math.ceil(documentsCount / pageSize);
  return (
    <div className="row justify-content-center mr-3">
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          {new Array(numberOfPages).fill(0).map((en, pg) => (
            <li className="page-item" key={pg}>
              <Link className="page-link" to={`/properties?page=${pg+1}`}>
                {pg+1}
              </Link>
            </li>
          ))}
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
