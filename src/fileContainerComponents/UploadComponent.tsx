import { server } from "../App";

export function UploadComponent() {

    return (
        <div className='uploadcomponent'>
            <input
                id="pathbox"
                type='file'
                multiple
                className='pathbox'
            >
            </input>
            <div className='buttonholder'>
                <button 
                    className='sendpathbutton'
                    onClick={() => uploadDocuments((document.getElementById("pathbox") as HTMLInputElement))}
                >
                    Upload Files
                </button>
            </div>
        </div>
    )
}

// TODO: Change endpoint to point towards proxy server (can maintain for now because it is dead simple)

function uploadDocuments(fileList: HTMLInputElement) {
    if (typeof fileList.files == "undefined" || fileList.files!.length > 0) {
        // guard clause
    }
    Array.from(fileList.files!).forEach(file => 
        {
            // Create a FormData to store the file
            const myData = new FormData();

            // Add file in the FormData
            myData.append("file", file);

            fetch(server + "/upload-document/", {
                // POST request with Fetch API
                method: "POST", 
                // Adding FormData to the request
                body: myData
             })
             .then((obj) => {let data = obj.json(); 
                console.log(data); 
                data.then(x => console.log(x))
             })
        }
    )
}
