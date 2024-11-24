"use client";

import { Toaster } from 'react-hot-toast';

const ToasterContext = () => {
    return (
        <div className="border-2 border-black z-50">
            <Toaster />
        </div>
    )
}

export default ToasterContext;