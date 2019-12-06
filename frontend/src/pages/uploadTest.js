import React from 'react';
// import { withRouter } from 'react-router';

import { Route , Switch } from 'react-router-dom';
// components


class ReactUploadImage extends React.Component {

    state = {
        file: null
    }

    onFormSubmit = async (ev) => {
        ev.preventDefault();
        const formData = new FormData();
        formData.append('fotoSubir',this.state.file);
        const config = {
            method: 'POST',
            body: formData,
            headers: {
                'x-access-token': sessionStorage.getItem("token")
            }
        };

        let response = await fetch('/api/admin/upload', config);
        let text = await response.text();
        console.log(text);

    }

    onChange = (ev) => {
        this.setState({file:ev.target.files[0]});
    }



    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" name="fotoSubir" onChange= {this.onChange} />
                <button type="submit">Upload</button>
            </form>
        )
    }
}


function Upload(){


    return(
            <div className="admin-page-super-container">
                <div className="admin-content-container">
                	<Switch>                       
                		<Route exact path="/subir" component={ReactUploadImage} />
                     </Switch>
                </div>
            </div>
            
        
    )
}

export default Upload;