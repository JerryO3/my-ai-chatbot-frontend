import { useState, useEffect } from 'react';
import { FileButton } from './fileContainerComponents/FileButton';
import { UploadComponent } from './fileContainerComponents/UploadComponent';
import { server } from '../App';

export function FileContainer() {
    const [state, setState] = useState({});

    const [currDocList, setDocList] = useState({})

    /**
     * 
     */
    useEffect(() => {
      fetch(server + "/get-file-list", {method: "GET"})
      .then(response => response.json())
      .then(json => setDocList(json))
      .catch(error => console.error(error));
    }, [state])

    return (
        <div className='filecontainer'>
            <div className='fileheader'>
                Ingested Files
                <button 
                 className='deleteallbutton'
                 onClick={() => deleteAllDocuments(currDocList)}>
                    Delete All
                </button>
            </div>
            <div className='filelist'>
                {
                    handleDocuments(currDocList, setState)
                }
            </div>
            <div>
                <UploadComponent setState={setState}></UploadComponent>
            </div>
        </div>
    )
}

/**
 * 
 * @param currDocList 
 * @param setStateFn 
 * @returns 
 */
function handleDocuments(currDocList: Object, setStateFn: React.Dispatch<React.SetStateAction<{}>>) {
    if (currDocList.hasOwnProperty("doc_list")) {
        return Object.keys((currDocList as any)["doc_list"]).map(
            x => FileButton({filename: x, doc_id: (currDocList as any)["doc_list"][x], setState: setStateFn})
        )
    }
}

/**
 * 
 * @param obj 
 */
function deleteAllDocuments(obj: Object) {
    if (obj.hasOwnProperty("doc_list")) {
        Object.values(obj)
            .map(documents => Object.values(documents))                 // get array of document_id_objects
            .map(doc_id_objects => doc_id_objects                       // for each doc_id_object
                .map(doc_id_object => (doc_id_object as Array<string>)  // cast each object as its own array of doc_ids
                    .map(doc_id => deleteHelper(doc_id))))              // apply deleteHelper to each doc_id
    }
}

/**
 * 
 * @param doc_id 
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
