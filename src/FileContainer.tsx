import { useState, useEffect } from 'react';
import { FileButton } from './fileContainerComponents/FileButton';
import { UploadComponent } from './fileContainerComponents/UploadComponent';
import { server } from './App';

export function FileContainer() {
    // using timer because not sure how to link refresh to delete 
    const [state, setState] = useState({num: 0});
    useEffect(() => {
        const timer = setTimeout(() => setState({ num: state.num + 1 }), 1000);
        return () => clearTimeout(timer);
      }, [state]);
    // to refactor

    // TODO: Change endpoint to point towards proxy server
    const [currDocList, setDocList] = useState({})
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
                    handleDocuments(currDocList)
                }
            </div>
            <div>
                <UploadComponent></UploadComponent>
            </div>
        </div>
    )
}

// TODO: extract all these logic into proxy server

function handleDocuments(currDocList: Object) {
    if (currDocList.hasOwnProperty("doc_list")) {
        return Object.keys((currDocList as any)["doc_list"]).map(x => FileButton({filename: x, doc_id: (currDocList as any)["doc_list"][x]}))
    }
}

function deleteAllDocuments(obj: Object) {
    if (obj.hasOwnProperty("doc_list")) {
        Object.values(obj).map(x => Object.values(x)).map(y => y.map(z => (z as Array<string>).map(a => deleteHelper(a))))
    }
}

// TODO: Change endpoint to point towards proxy server (can remain for now because it is dead simple)
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
    .then(json => console.log(json))
    .catch(error => console.error(error));
}
