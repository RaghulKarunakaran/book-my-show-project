import { Modal, Button, message } from 'antd';
import {deleteMovie} from "../../api/movies"
function DeleteMovieModal({ isDeleteModalOpen, setIsDeleteModalOpen, deleteSelectedMovie}) {
    const handleCancel = () => {
        setIsDeleteModalOpen(false);
    };
    const handleDelete = async () => {
        deleteSelectedMovie.movieId = deleteSelectedMovie._id
        const response = await deleteMovie(deleteSelectedMovie);
        if(response.success) {
            message.success(response.message);
        } else {
            message.error(response.message);
        }
        setIsDeleteModalOpen(false);
    }

    return (
    <Modal
      open={isDeleteModalOpen}
      onCancel={handleCancel}
      footer={null}
      centered
      width={400}
    >
      <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>Are you sure you want to delete this item?</p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
        <Button onClick={handleCancel}>No</Button>
        <Button type="primary" danger onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}

export default DeleteMovieModal