import { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthors } from '../../redux/reducers/PostSlice';




export default function PaginationPosts() {
  const [page, setPage] = useState(1);
  const pagination = useSelector((state) => state.author.totalPage);
  const dispatch = useDispatch();

  const clickHandler = (e) => {
    setPage(Number(e.target.text));
  };

  useEffect(() => {
    if (page < 1){
        setPage(1);
    }else if(page > pagination){
        setPage(pagination);
    }
    dispatch(fetchAuthors(page));
  }, [page, dispatch, pagination]);



  return (
    <Pagination>
      <Pagination.Prev onClick={()=> setPage(page-1)} />

      {Array.from({ length: pagination }, (_, i) => (
        <Pagination.Item key={i} active={i + 1 === page} onClick={clickHandler}>
            {i + 1}
        </Pagination.Item>
        ))}

      <Pagination.Next onClick={()=> setPage(page+1)} />
    </Pagination>
  );
}
