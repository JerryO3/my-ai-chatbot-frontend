import { deleteHelper } from '../FileContainer'

/**
 * FileButton generates the buttons on the file panel. It comprises the name of the file and
 * a delete button.
 * @param props.filename is the name of the file represented by the button.
 * @param props.doc_id is the array of string document ids that uniquely identify documents.
 * Each file may be broken down into one or more documents associated for parsing by the server.
 * @param props.setState is the state-setting function passed by FileContainer
 * to update the docList reactive component to refresh the files ingested on the UI.
 * @returns HTML render of file buttons on the file panel.
 */
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

/**
 * Given a list of doc_ids, applies deleteHelper to delete them.
 * The function is asynchronous so that upon completion the FileContainer
 * can be triggered to re-render the UI to display the updated list
 * of ingested files.
 * @param doc_id is a string that uniquely identifies a document fragment.
 * @returns 
 */

async function deleteDocument(doc_id: Array<string> | undefined) {
    return Array.isArray(doc_id) ? doc_id.forEach(x => deleteHelper(x)) : null
}



