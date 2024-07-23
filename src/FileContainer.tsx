import { useState, useEffect } from 'react';
import { FileButton } from './fileContainerComponents/FileButton';
import { UploadComponent } from './fileContainerComponents/UploadComponent';
import { server } from './App';

// let server = "http://localhost:8001"

export function FileContainer() {
    // using timer because not sure how to link refresh to delete 
    const [state, setState] = useState({num: 0});
    // useEffect(() => {
    //     const timer = setTimeout(() => setState({ num: state.num + 1 }), 1000);
    //     return () => clearTimeout(timer);
    //   }, [state]);
    // to refactor

    // TODO: Change endpoint to point towards proxy server
    const [currDocList, setDocList] = useState([])
    useEffect(() => {
      fetch(server + "/get-file-list", {method: "GET"})
      .then(response => response.json())
      .then(json => setDocList(json["doc_list"]))
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
                    currDocList.map(x => FileButton({filename: x, doc_id: "123"}))
                    // getFilenames(currDocList).map(x => FileButton({filename: x, doc_id: getIDs(currDocList, x)}))
                }
            </div>
            <div>
                <UploadComponent></UploadComponent>
            </div>
        </div>
    )
}

// TODO: extract all these logic into proxy server

function getFilenames(obj: Object) {
    if (Array.isArray(obj) && obj.length === 0) {
        return []
    } else {
        let nestedArr : Array<Object | string> = Object.values(Object.values(obj).map(x => x["doc_metadata"]["file_name"]))
                                            .reduce((init, next) => Array.isArray(init) 
                                                                    ? init.includes(next) 
                                                                        ? init 
                                                                        : [init, next]
                                                                    : init === next 
                                                                        ? [init] 
                                                                        : [init, next])
        return unpackHelper(nestedArr, [])
    }
}
  
function unpackHelper(pair: Array<Object | string> | string, empty: Array<string>): Array<string> {
    if (typeof pair === "string") {
        return [pair]
    }
    if (typeof pair[1] == "string") {
        empty.push(pair[1])
    } 
    if (typeof pair[0] === "string") {
        empty.push(pair[0])
    } else if (Array.isArray(pair[0])) {
        return unpackHelper(pair[0],empty)
    }
    return empty
}

function getIDs(obj: Object, name: string) {
    let out = Object.values(obj).filter(x => x["doc_metadata"]["file_name"] as string === name).map(y => y["doc_id"])
    // console.log(out)
    return out
}

function deleteAllDocuments(obj: Object) {
    let out = Object.values(obj).map(y => deleteHelper(y["doc_id"]))
}

// TODO: Change endpoint to point towards proxy server (can remain for now because it is dead simple)
export function deleteHelper(doc_id: string) {
    // fetch("http://localhost:8001/v1/ingest/" + doc_id, {method: "DELETE"})
    // .then(response => console.log(response))
    // .catch(error => console.error(error));
    const obj = {"doc_name": "doc_id"}

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
