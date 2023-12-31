import { useState, useEffect } from "react"
import { postComment, getComments } from "../../../utils/backend"
import Comment from "../Comment"

export default function commentSection({ episodeId }) {
    // Save comments queried from the database in state
    const [comments, setComments] = useState([])
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [createFormData, setCreateFormData] = useState({
        name: '',
        content: ''
    })

    // Query the database for all comments that pertain to this artwork
    useEffect(() => {
        getComments(episodeId)
            .then(comments => setComments(comments))
    }, [])


    // Update the form fields as the user types
    function handleInputChange(event) {
        setCreateFormData({
            ...createFormData,
            [event.target.name]: event.target.value
        })
    }

    // Render a form that allows a user to create a comment on submit
    function toggleCreateForm() {
        setShowCreateForm(!showCreateForm)
    }

    // Update the comments in the comment section after a 
    // database transaction.
    function refreshComments() {
        getComments(episodeId)
            .then(newCommentData => setComments(newCommentData))
    }

    // Execute form submission logic
    function handleSubmit(event) {
        // prevent the page from reloading
        event.preventDefault()
        // clear the form
        setCreateFormData({
            name: '',
            content: ''
        })
        // close the form
        setShowCreateForm(false)
        // create the comment in the backend
        postComment({ ...createFormData, episodeId: episodeId })
            .then(() => refreshComments())
    }


    // conditionally render comments
    let commentElements = [<p key='0' className='text-center'>No comments yet. Be the first to love this episode!</p>]
    if (comments.length > 0) {
        commentElements = comments.map(comment => {
            return <Comment
                key={comment._id}
                data={comment}
                refreshComments={refreshComments}
            />
        })
    }

    // conditionally display the text of the create form button
    let btnText = 'Create'
    if (showCreateForm) {
        btnText = 'Close'
    }

    return (
        <div className='comment-section bg-sky-200 rounded-lg p-4 pb-10 mt-4 space-y-4 relative'>
            <h1 className='text-xl font-bold'>Viewer Love</h1>
            <button
                onClick={toggleCreateForm}
                className="top-0 right-5 absolute text-slate-200 hover:bg-indigo-700 font-bold py-2 px-4 bg-indigo-800 rounded cursor-pointer mr-2"
            >
                {btnText}
            </button>
            {
                showCreateForm && <form
                    onSubmit={handleSubmit}
                    className="max-w-[60vw] bg-slate-100 rounded-lg p-4 my-4 border-gray-700 border-2 w-[80vw] mx-auto text-right">
                    <input
                        name="name"
                        className="px-2 py-1 w-full bg-gray-100"
                        placeholder="Your name"
                        value={createFormData.name}
                        onChange={handleInputChange}
                    />
                    <br />
                    <textarea
                        name="content"
                        className="p-2 my-2 h-[100px] w-full bg-gray-100"
                        placeholder="Share your Trek Love!"
                        value={createFormData.content}
                        onChange={handleInputChange}
                    />
                    <button
                        type="submit"
                        className="text-slate-200 hover:bg-indigo-400 font-bold py-2 px-4 bg-indigo-500 rounded cursor-pointer mr-2">
                        Post
                    </button>
                </form>
            }
            {commentElements}
        </div>
    )
}
