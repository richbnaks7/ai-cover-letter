"use client"
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

export default function UploadResume(props) {

    return (
        <div>
            <FilePond
                name="resume"
                labelIdle='Drag & Drop your resume or <span class="filepond--label-action">Browse</span>'
                server={{
                    process: {
                        url: '/api/upload',
                        onload: (response) => {
                            props.func(response);
                        }
                    },
                    fetch: null,
                    revert: null,
                }}
            />
        </div>
    );
}