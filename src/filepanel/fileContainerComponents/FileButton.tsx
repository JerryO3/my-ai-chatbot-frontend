import { deleteHelper } from '../FileContainer'

export function FileButton(props: {filename: string, doc_id: Array<string> | undefined, setState: React.Dispatch<React.SetStateAction<{}>>}) {
    return (
        <div id={props.filename} className='filebutton'>
            <div className='namebox'>
                {props.filename}
            </div>
            <button 
                className='deletebutton'
                onClick={() => {
                    deleteDocument(props.doc_id).then(x => props.setState({x})); 
                }}>
                Delete
            </button>
        </div>
    )
}

async function deleteDocument(doc_id: Array<string> | undefined) {
    return Array.isArray(doc_id) ? doc_id.forEach(x => deleteHelper(x)) : null
}



