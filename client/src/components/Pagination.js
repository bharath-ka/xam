import React from 'react';
import PropTypes from 'prop-types'

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(num => (
                    <li key={num} className="page-item">
                        <div  onClick={() => paginate(num)} className="page-link">
                            {num}
                        </div>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

Pagination.propTypes = {
    postsPerPage: PropTypes.number,
    totalPosts:PropTypes.number,
    paginate:PropTypes.func.isRequired,
}

export default Pagination
