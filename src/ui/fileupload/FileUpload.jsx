import React, {useRef} from 'react';
import cl from './FileUpload.module.css'

const FileUpload = ({callback, state}) => {

    const dropZoneElement = useRef()
    const inputElement = useRef()

    const update = (el, file) => {
        callback(file)
        let thumbnailElement = el.querySelector('.dropZoneThumb');
        console.log(thumbnailElement);
        // First time - remove the prompt
        if (el.querySelector('.dropZonePrompt')) {
            el.querySelector('.dropZonePrompt').remove();
        }
        // First time - there is no thumbnail element, so lets create it
        if (!el.querySelector('.dropZoneThumb')) {
            thumbnailElement = document.createElement("div");
            thumbnailElement.classList.add('dropZoneThumb');
            el.appendChild(thumbnailElement);
        }
        thumbnailElement.dataset.label = file.name;
        // Show thumbnail for image files
        if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
            };
        } else {
            thumbnailElement.style.backgroundImage = null;
        }
    }

    const clickUpload = () => {
        inputElement.current.click()
    }

    const changeUpload = () => {
        if (inputElement.current.files.length) {
            update(dropZoneElement.current, inputElement.current.files[0]);
        }
    }

    const dragoverUpload = (e) => {
        e.preventDefault();
        dropZoneElement.current.classList.add(cl.dropZoneOver);
    }

    const dragLeaveEnd = () => {
        dropZoneElement.current.classList.remove(cl.dropZoneOver);
    }

    const dropUpload = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files.length) {
            inputElement.current.files = e.dataTransfer.files;
            update(dropZoneElement.current, e.dataTransfer.files[0]);
        }
        dropZoneElement.current.classList.remove(cl.dropZoneOver);
    }

    return (
        <div
            className={cl.dropZone}
            onClick={clickUpload}
            onDragOver={(e) => dragoverUpload(e)}
            onDragLeave={dragLeaveEnd}
            onDragEnd={dragLeaveEnd}
            onDrop={(e) => dropUpload(e)}
            ref={dropZoneElement}>
            <span
                className={'dropZonePrompt'}
            >Перетащите файл или кликните для выбора</span>
            <input
                ref={inputElement}
                className={cl.dropZoneInput}
                type="file"
                name="file"
                onChange={(e) => {
                    changeUpload()
                    callback(e.target.files[0])
                }}
            />
        </div>
    );
};

export default FileUpload;