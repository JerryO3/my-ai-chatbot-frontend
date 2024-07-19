import { deleteHelper } from '../FileContainer'

export function FileButton(props: {filename: string, doc_id: Object}) {
    return (
        <div id={props.filename} className='filebutton'>
            <div className='namebox'>
                {props.filename}
            </div>
            <button 
                className='deletebutton'
                onClick={() => {deleteDocument(props.doc_id); 
                }}>
                Delete
            </button>
        </div>
    )
}

function deleteDocument(doc_id: Object) {
    return Array.isArray(doc_id) ? doc_id.forEach(x => deleteHelper(x)) : null
}



