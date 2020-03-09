import React from 'react';

const withClass = (WrappedComponent, className) => {
  return (props) => {
    return (
      <div className={className}>
        {/* passing unknown props */}
        <WrappedComponent {...props} />
      </div>
    )
  }
}

export default withClass;