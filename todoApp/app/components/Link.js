import React from 'react';

const Link = ({ filter, currentFilter, onClick, children }) => {
  if(filter === currentFilter)
    return <span>{children}</span>;
  else
    return (
      <a href="#"
         onClick={(e) => onClick(filter, e)}>{children}</a>
    );
};

export default Link;
