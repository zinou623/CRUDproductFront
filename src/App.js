import NavBar from './components/NavBar'
import React, { Component } from 'react';
import './App.css';
import { Container, Button } from '@material-ui/core/';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import io from "socket.io-client"

let socket

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddProduct: false,
      error: null,
      response: {},
      product: {},
      isEditProduct: false
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
  
  }

  onCreate() {
    this.setState({ isAddProduct: true });
  }

  onFormSubmit(data) {
    this.setState({
      product: {}
    })
   if(data==null){
     this.setState({
    
       isAddProduct: false,
       isEditProduct: false
     })
     return
   }
    let apiUrl= 'http://localhost:3023/produits'
    let options
    let myHeaders = new Headers()
    myHeaders.append("Content-Type","application/json")
    if (this.state.isEditProduct) {
      apiUrl +='/'+data._id
      options = {
        method: 'PUT', 
        headers: myHeaders,
        body: JSON.stringify(data),
      };
    } else {
     
      options = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
       
      };
    }

   

  

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(result => {
        socket = io.connect("http://localhost:3033")
        socket.emit('UpdateProduct', result)

        this.setState({
          //response: result,
          isAddProduct: false,
          isEditProduct: false
        })

      },
        (error) => {
          this.setState({ error });
        }
      )
  }

   editProduct = productId => {

    const apiUrl = 'http://localhost:3023/produits/' + productId
   

    const options = {
      method: 'GET'

    }

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            product: result,
            isEditProduct: true,
            isAddProduct: true
          })
          
          

        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  render() {

    let productForm;
    if (this.state.isAddProduct || this.state.isEditProduct) {
      productForm = <AddProduct onFormSubmit={this.onFormSubmit} product={this.state.product} />
   
     
    }
    

    return (
      <div className="App">
        <Container>
     
          <NavBar/>
          {!this.state.isAddProduct && <Fab color="primary" onClick={() => this.onCreate()} aria-label="add" >
            <AddIcon />
          </Fab>}
          {this.state.response.status === 'success' && <div><br /><Button variant="info">{this.state.response.message}</Button></div>}
          {!this.state.isAddProduct && <ProductList editProduct={this.editProduct} />}
          {productForm}
          {this.state.error && <div>Error: {this.state.error.message}</div>}
        </Container>
      </div>
    );
  }
}

export default App;
