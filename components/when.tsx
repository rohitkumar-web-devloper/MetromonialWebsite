import React from 'react'

const When = ({ children, isHide }: { children: React.ReactNode, isHide: booleanl }) => {
    return !isHide ? children : null
}
export { When }
