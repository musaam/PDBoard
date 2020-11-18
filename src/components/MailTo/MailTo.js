import React from 'react';

const MailTo = (props) => {
    
        let params = props.subject || props.body ? '?' : '';
        if (props.subject) params += `subject=${encodeURIComponent(props.subject)}`;
        if (props.body) params += `${props.subject ? '&' : ''}body=${encodeURIComponent(props.body)}`;
      
        return <a style={{ textDecoration: "none"}} href={`mailto:${props.email}${params}`}>{props.children}</a>;      
}

export default MailTo;
