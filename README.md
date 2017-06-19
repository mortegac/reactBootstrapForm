This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

INSTALAR CREATE-REACT-APP:
```
npm install -g create-react-app
```
Crear la App:
```
create-react-app app
cd Myapp
npm start
```
### INSTALACION REACTSTRAP (BOOSTRAP-REACT):
```
npm install bootstrap@4.0.0-alpha.6 --save
npm install --save reactstrap react-transition-group react react-dom
```
## Agregar en el archivo src/index.js
```
import React from 'react'; 
import ReactDOM from 'react-dom'; 
import injectTapEventPlugin from 'react-tap-event-plugin';  
import App from './App'; 
import './index.css';  

injectTapEventPlugin();  

ReactDOM.render(   
                  <App />,   
                  document.getElementById('root') 
);
```
## Agregar en el archivo src/App.js
```
import React, { Component } from 'react'; 
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'reactstrap';
import {  Card, CardImg, CardText,  CardTitle, CardImgOverlay,
          Button, FormGroup, Input, FormText } from 'reactstrap';

class App extends Component {    
        render() {     
            return (     
                <Container>
                  <Row>
                    <Col md="3" sm="1"><h1>BOOTSTRAP</h1></Col>
                  </Row>
                </Container>
                   );   
                } 
         }  

export default App;
```