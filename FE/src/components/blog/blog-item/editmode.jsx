
import { Form } from 'react-bootstrap';
import Rate from './Rate';


export default function EditMode({review, setRating}){
    return (
        <>
        <Form.Group className='p-2' controlId="exampleForm.ControlTextarea1">
            <Form.Label>Edit your comment</Form.Label>
            <Form.Control as="textarea" rows={3} defaultValue={review.comment} />
        </Form.Group>
        <div className='mt-2 p-3 d-flex flex-column align-items-center ' >
            <Rate rating={review.rate} setRating={setRating} />
        </div>
        </>
    )
}