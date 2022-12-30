import React, { useState } from 'react';
import "./CustomerDetails.css";

function CustomerDetails(props) {
    let customersList = [...props.customersInfoCopy];
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(14);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = customersList.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(customersList.length / postsPerPage); i++) {
        pageNumbers.push(i);
      }

  return (
    <div>
        
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>WEB</th>
                </tr>
            </thead>
            <tbody>
                {currentPosts.map((items) => {
                    return(<tr key={items.id}>
                        <td>{items.first_name}</td>
                        <td>{items.last_name}</td>
                        <td>{items.age}</td>
                        <td>{items.email}</td>
                        <td>{items.web}</td>
                    </tr>)
                })}
            </tbody>
        </table>
        <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} href='!#'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CustomerDetails