import { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthors } from '../../redux/reducers/PostSlice';

export default function PaginationPosts() {
  const [currentPage, setCurrentPage] = useState(1);
  const pagination = useSelector((state) => state.author.totalPage);
  const dispatch = useDispatch();

  const clickHandler = (e) => {
    setCurrentPage(Number(e.target.text));
  };

  useEffect(() => {
    if (currentPage < 1) {
      setCurrentPage(1);
    } else if (currentPage > pagination) {
      setCurrentPage(pagination);
    } else {
      dispatch(fetchAuthors(currentPage));
    }
  }, [dispatch, currentPage, pagination]);

  return (
    <Pagination>
      <Pagination.Prev onClick={() => setCurrentPage((prevPage) => prevPage - 1)} />

      {Array.from({ length: pagination }, (_, i) => (
        <Pagination.Item key={i} active={i + 1 === currentPage} onClick={clickHandler}>
          {i + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next onClick={() => setCurrentPage((prevPage) => prevPage + 1)} />
    </Pagination>
  );
}
