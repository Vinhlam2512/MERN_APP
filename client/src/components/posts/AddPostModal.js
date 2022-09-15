import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext } from 'react';
import { PostContext } from '../../contexts/PostContext';

const AddPostModal = () => {
    // Contexts
    const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } = useContext(PostContext);

    // State
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN',
    });

    const { title, description, url, status } = newPost;

    const onChangeNewPostForm = event => {
        setNewPost({ ...newPost, [event.target.name]: event.target.value });
    };

    const closeDialog = () => {
        resetAddPostModal();
    };

    const onSubmit = async event => {
        event.preventDefault();
        const { success, message } = await addPost(newPost);
        resetAddPostModal();
        setShowToast({ show: true, message, type: success ? 'success' : 'danger' });
    };

    const resetAddPostModal = () => {
        setNewPost({
            title: '',
            description: '',
            url: '',
            status: 'TO LEARN',
        });
        setShowAddPostModal(false);
    };

    return (
        <Modal show={showAddPostModal} animation={false} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>What do you want to Learn?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type='text'
                            placeholder='Title'
                            name='title'
                            value={title}
                            onChange={onChangeNewPostForm}
                            required
                            aria-describedby='title-help'
                        />
                        <Form.Text id='title-help' muted>
                            Required
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            as='textarea'
                            row={3}
                            placeholder='Description'
                            name='description'
                            value={description}
                            onChange={onChangeNewPostForm}
                        />
                        <Form.Text id='title-help' muted>
                            Required
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type='text'
                            row={3}
                            placeholder='Youte Tutorial URL'
                            name='url'
                            value={url}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button variant='primary' type='submit'>
                        LearnIT
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddPostModal;
