import { useState, useEffect } from 'react';
import { FileButton } from './fileContainerComponents/FileButton';
import { UploadComponent } from './fileContainerComponents/UploadComponent';
import { server } from '../App';

/**
 * FileList is a wrapper class to enforce type of object recieved from
 * the proxy server. FileList has the following structure:
 * 
 * { file_list: 
 *  { <document-name-1> : [doc_id-1, doc_id-2, ...],
 *    <document-name-2> : [doc_id-3, doc_id-4, ...],
 *    ...
 *  }
 * }
 */
class FileList {
    file_list: Map<string, Array<string>> = new Map()
}

/**
 * FileContainer is the react component that generates the file panel.
 * It refreshes on updates to the file list (through uploading or deleting files).
 * @returns HTML render of the file panel
 */
export function FileContainer() {

    const [currFileList, setFileList] = useState<FileList>(new FileList())

    // Allows file updates and deletions to re-render the file list
    const [state, setState] = useState({});
    useEffect(() => {
      fetch(server + "/get-file-list", {method: "GET"})
      .then(response => response.json())
      .then(json => Object.assign(new FileList(), json))
      .then(x => setFileList(x))
      .catch(error => console.error(error));
    }, [state])

    return (
        <div className='filecontainer'>
            <div className='fileheader'>
                Ingested Files
                <button 
                 className='deleteallbutton'
                 onClick={() => deleteAllFiles(currFileList).then(() => setState({}))}>
                    Delete All
                </button>
            </div>
            <div className='filelist'>
                {
                    handleFiles(currFileList, setState)
                }
            </div>
            <div>
                <UploadComponent setState={setState}></UploadComponent>
            </div>
        </div>
    )
}

/**
 * Takes in a FileList instance and maps each file name to a button component.
 * @param currFileList is a FileList containing currently ingested files.
 * @param setStateFn is a state-setting function to pass the setState hook to Filebutton.
 * @returns 
 */
function handleFiles(currFileList: FileList, setStateFn: React.Dispatch<React.SetStateAction<{}>>) {
    return Object.keys(currFileList.file_list).map(
        x => FileButton({filename: x, doc_id: (currFileList.file_list! as any)[x], setState: setStateFn})
    )
}

/**
 * Takes in a FileList instance and extracts all document ids for deletion.
 * @param currFileList is a FileList containing currently ingested files.
 */
async function deleteAllFiles(currFileList: FileList) {
    return Object.values(currFileList)
                 .map(documents => Object.values(documents))                 // get array of document_id_objects
                 .map(doc_id_objects => doc_id_objects                       // for each doc_id_object
                     .map(doc_id_object => (doc_id_object as Array<string>)  // cast each object as its own array of doc_ids
                         .map(doc_id => deleteHelper(doc_id))))              // apply deleteHelper to each doc_id
}

/**
 * Takes in a document id and deletes the associated document fragment.
 * @param doc_id is a string that uniquely identifies a document fragment.
 */
export function deleteHelper(doc_id: string) {
    const obj = {"doc_id": doc_id}

    fetch(server + "/delete/",
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
        }
    )
    .then(response => response.json())
    .catch(error => console.error(error));
}
