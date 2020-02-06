import React, { useState, useEffect} from 'react';
import Pagination from "./Pagination"
import axios from 'axios'
const Test = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(res.data);
            setLoading(false)

        }
        fetchPosts();
    }, []);

    //Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return loading ? (<div>Loading...</div>) : (
        <div>
            <ul className="list-group mb-4">
                {
                    currentPosts.map(post => (
                        <li key={post.id} className='list-group-item'>
                            {post.title}
                        </li>
                    ))
                }
            </ul>
            <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
        </div>


    )
}

export default Test;
