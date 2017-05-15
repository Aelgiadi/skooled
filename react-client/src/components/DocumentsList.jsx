import React from 'react';
import axios from 'axios';
import Document from './Document.jsx';
import CreateDocument from './CreateDocument.jsx';
import { BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class DocumentsList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      documents: [],
    };
    this.reRender = this.reRender.bind(this);
  }

  componentDidMount () {
    let currentToken = window.localStorage.accessToken;

    let config = {
      headers: {'Authorization': currentToken}
    };

    axios.get('/doc/documents', config)
    .then(docs => {
      console.log('Retrieved docs back from GET /documents request.', docs);
      this.setState({
        documents: docs.data
      });
    })
    .catch(error => {
      console.log('Error retrieving docs back from GET /documents request.');
    });
  }


  reRender () {
    let currentToken = window.localStorage.accessToken;

    let config = {
      headers: {'Authorization': currentToken}
    };

    axios.get('/doc/documents', config)
    .then(docs => {
      console.log('Retrieved docs back from GET /documents request.', docs);
      this.setState({
        documents: docs.data
      });
    })
    .catch(error => {
      console.log('Error retrieving docs back from GET /documents request.');
    });
  }

  clickToAdd() {
    this.context.router.push('/createDocument');
  }

  render () {
    if (this.props.userType === 'teacher') {
      return (
        <div>
          <h2>Permission slips</h2>
          <FloatingActionButton style={style} >
            <ContentAdd/>
            {/*<Link to="/createDocument"><ContentAdd/></Link>*/}
          </FloatingActionButton>
          {/*<span className="fab-container">
            <Link to="/createDocument">
              <div className="fab">
              </div>
            </Link>
          </span>*/}
          {this.state.documents.map((doc, index) => 
            <Document document={doc} key={index} userType={this.props.userType} reRender={this.reRender}/>
          )}
        </div>
      )    
    } else {
      return (
        <div>
          <h2>Permission slips</h2>
          {this.state.documents.map((doc, index) => 
            <Document document={doc} key={index}/>
          )}
        </div>
      )    
    }
  }
}

const style = {
  // marginRight: 20,
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
};

export default DocumentsList;