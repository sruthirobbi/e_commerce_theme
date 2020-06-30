import React,{Fragment} from 'react';



function Footer(){

    const footer={
        position: 'fixed',
        right: '0',
        bottom: '0',
        left: '0',
        backgroundColor: '#fffff',
        textAlign: 'center'
    }

    return(
        <Fragment>
            <footer style={footer}>
                <i className ="far fa-copyright"></i>2020 | All Rights Reseverd. 
            </footer>
            
        </Fragment>
    )
}

export default Footer;