import React, { Component } from 'react'
// import logo from './logo.svg'
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'reactstrap';
import {  Card, CardImg, CardText,  CardTitle, CardImgOverlay,
          Button, FormGroup, Input, FormText } from 'reactstrap';
//CardBlock,CardSubtitle, Form, Label, 
// import { Button } from 'reactstrap';
// import './App.css'
import './Style.css'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nombre: '',
      apellido: '',
      correo: '',
      preferences: [],
      loading: false,
      submitted: false,
      errors: {},
    }
    
  }

  valida(campo) {
    return (valor) => {
      this.setState({
        [campo]: valor.target.value,
      })
    }
  }

  checkGender(gender) {
    this.setState({ gender })
  }

  checkPreference(preference) {
    const p = this.state.preferences.slice()
    const idx = this.state.preferences.indexOf(preference)
    const x = idx > -1 ? p.slice(idx, 1) : p.push(preference)
    this.setState({ preferences: p })
  }

  validaLongitud(campo, valor, long, errors) {
    errors[campo] = valor.length < long
      ? `Su ${campo} debe ser de mínimo ${long} caracteres de longitud`
      : null
    if(errors[campo] == null) {
      delete errors[campo]
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const errors = {}
    this.validaLongitud('nombre', this.state.nombre, 3, errors)
    this.validaLongitud('apellido', this.state.apellido, 4, errors)
    this.validaLongitud('correo', this.state.correo, 5, errors)
    if (this.state.preferences.length == 0)
      errors.preferences = 'Debes seleccionar al menos una preferencia'

    if (!this.state.gender)
      errors.gender = 'Debes seleccionar tu género'

    this.setState({ errors })
    if (Object.keys(errors).length) return

    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ loading: false, submitted: true })
    }, 1000)

  }

  render() {
    return (
      <div className="App">
        <Formulario
          submitted={this.state.submitted}
          errors={this.state.errors}
          handleSubmit={this.handleSubmit.bind(this)}
          checked={this.state.gender}
          valida={this.valida.bind(this)}
          checkGender={this.checkGender.bind(this)}
          checkPreference={this.checkPreference.bind(this)}
          preferences={this.state.preferences}
          loading={this.state.loading} />
      </div>
    )
  }
}


/*
https://www.pubnub.com/wp-content/uploads/2016/06/ReactJS-Infinite-Scroll.jpg
http://nochesdecode.com.ar/wp-content/uploads/2016/03/maxresdefault-1.jpg
https://programarivm.com/wp-content/uploads/2016/06/productividad.jpg
*/
class Formulario extends Component {
  render() {
    const { valida, checkGender, checked, checkPreference, preferences, handleSubmit, errors, loading, submitted } = this.props

    return (
      <div>
       <Container>
        <br/>
        <Row>
          <Col md="3" sm="1"></Col>
          <Col md="6" sm="10" xs="12">
            <Card>
              <CardImg top width="100%" src="https://www.pubnub.com/wp-content/uploads/2016/06/ReactJS-Infinite-Scroll.jpg" alt="Contact Form" />
              <CardImgOverlay>
                <CardTitle className="txtBlanco">FORMULARIO DE CONTACTO</CardTitle>
                <CardText>
                </CardText>
              </CardImgOverlay>
              <Card>
                <CardTitle className="txtSubTitulo">Ingrese sus datos</CardTitle>
                
                  <form onSubmit={handleSubmit}>
                  <Col md="12">
                    
                    <FormGroup>
                      <Input placeholder="Nombre" onChange={valida('nombre')} />
                        {errors.nombre ? <p className="txtLabel">{errors.nombre}</p> : null}
                    </FormGroup>
                    <FormGroup>
                      <Input placeholder="Apellido" onChange={valida('apellido')} />
                      {errors.apellido ? <p className="txtLabel">{errors.apellido}</p> : null}
                    </FormGroup>
                    <FormGroup>
                      <Input placeholder="Correo" onChange={valida('correo')} type="email"/>
                      {errors.correo ? <p className="txtLabel">{errors.correo}</p> : null}
                    </FormGroup>

                    <FormGroup>
                    <b>Género</b>
                    <br />
                    {errors.gender ? <p className="txtLabel">{errors.gender}</p> : null}
                    <input onClick={() => checkGender('hombre')} type="radio" name="genero" value="hombre" checked={checked === 'hombre'} /> Hombre<br />
                    <input onClick={() => checkGender('mujer')} type="radio" name="genero" value="mujer" checked={checked === 'mujer'} /> Mujer<br />
                    </FormGroup>
                    <FormGroup>
                    <b>Preferencias</b>
                    <br />
                    {errors.preferences ? <p className="txtLabel">{errors.preferences}</p> : null}
                    <input onClick={() => checkPreference('cine')} type="checkbox" name="preferencia" value="cine" checked={preferences.indexOf('cine') > -1} /> Cine<br />
                    <input onClick={() => checkPreference('musica')} type="checkbox" name="preferencia" value="musica" checked={preferences.indexOf('musica') > -1} /> Musica<br />
                    </FormGroup>
                  </Col>
                  </form>
                  {!submitted ? <Button onClick={handleSubmit} color="primary" disabled={loading}>{loading ? 'Cargando...' : 'Enviar'}</Button>: <p>Formulario enviado con éxito</p>}
                </Card>
            </Card>
         
          </Col>
          <Col md="3" sm="1"></Col>
       </Row>
      </Container>
      </div>
    )
  }
}

export default App