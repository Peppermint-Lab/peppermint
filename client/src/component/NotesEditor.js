import React, {useEffect, useState } from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import { config } from '../utils';

const TextEditor = ({ onSubmit }) => {
    const [body, setBody] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({ body })
    }

    ClassicEditor.defaultConfig = config

    return (
        <form onSubmit={handleSubmit}>
            <CKEditor
                
                onChange={(event, editor) => {
                    const data = editor.getData()
                    setBody(data)
                }}
            />
            <button type='submit'>Submit</button>
        </form>
    )
}

export default TextEditor
