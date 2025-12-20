import React from 'react'

function Shake({ children }) {
    return <div className="hover:animate-ping">{children}</div>
}

export default Shake
