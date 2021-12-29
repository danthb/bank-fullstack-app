import React from 'react';
export const UserContext = React.createContext(null);

export function Card(props){
    function classes() {
        const bg = props.bgcolor ? 'bg-' + props.bgcolor : ' ';
        const txt = props.txtcolor ? 'text-' + props.txtcolor : 'text-white';
        return 'card mb-3' + bg + txt;
    }

    return (
        <UserContext.Provider >
            
            <div className={classes()} style={{ maxWidth: '16rem', marginLeft: 'auto', marginRight: 'auto', marginTop: '20px', borderRadius: '20px' }}>
                <div className='card-header'><h4>{props.header}</h4></div>
                <div className='card-body'>
                    {props.title && (<h5 className='card-title'>{props.title}</h5>)}
                    {props.text && (<p className='card-text'>{props.text}</p>)}
                    {props.body}
                    {props.status && (<div id='createStatus'>{ props.status}</div>)}
                </div>
            </div>
        </UserContext.Provider> 
    )
}