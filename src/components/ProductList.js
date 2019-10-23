import React from 'react'
import { Table } from '@material-ui/core/'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles'
import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import BlockIcon from '@material-ui/icons/Block'

import io from 'socket.io-client'
let socket
function AvailableIcon (props) {
  const isAvailable = props.available
  if (isAvailable) {
    return <EventAvailableIcon fontSize="large" />
  }
  return <BlockIcon fontSize="large" />
}
class ProductList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      products: [],
      response: {}
    }
    socket = io.connect('http://localhost:3033')
    socket.on('NotifyToDelete', (id) => {
      this.setState({
        products: this.state.products.filter((product) => product._id !== id)
      })
    })
    socket.on('NotifyToUpdate', (productup) => {
       
      const clonedProduct = this.state.products.slice(0)
      var f=false
     //if update
      for (const p in clonedProduct) {
        if (clonedProduct[p]._id === productup._id) {
          clonedProduct[p] = productup
          f=true
        }
      }

    //if add
    if(!f){
        clonedProduct.push(productup)
    }

      this.setState({
        products: clonedProduct
      })
    })
  }

  componentDidMount () {
    const apiUrl = 'http://localhost:3023/produits'

    fetch(apiUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            products: result
          })
        },
        (error) => {
          this.setState({ error })
        }
      )
  }

  deleteProduct (productId) {
    const { products } = this.state
    // alert(productId)
    const apiUrl = 'http://localhost:3023/produits/' + productId

    const options = {
      method: 'DELETE'
    }

    fetch(apiUrl, options)
      .then((res) => res.json())
      .then(
        (result) => {
          socket = io.connect('http://localhost:3033')
          socket.emit('DeleteProduct', productId)
          this.setState({
            response: result,
            products: products.filter((product) => product._id !== productId)
          })
        },
        (error) => {
          this.setState({ error })
        }
      )
  }

  render () {
    const { error, products } = this.state
    const classes = makeStyles({
      root: {
        width: '100%',
        overflowX: 'auto'
      },
      table: {
        minWidth: 650
      }
    })
    if (error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else {
      return (

        <div>
          <h2>Product List</h2>
          <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><h3>Name</h3></TableCell>
                  <TableCell ><h3>Type</h3></TableCell>
                  <TableCell ><h3>Price</h3></TableCell>
                  <TableCell ><h3>Rating </h3></TableCell>
                  <TableCell ><h3>Warranty_years</h3></TableCell>
                  <TableCell ><h3>Available</h3></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>

                    <TableCell ><h4>  {product.name}</h4></TableCell>
                    <TableCell ><h4>{product.type}</h4></TableCell>
                    <TableCell ><h4>{product.price}</h4></TableCell>
                    <TableCell ><h4>{product.rating}</h4></TableCell>
                    <TableCell ><h4>{product.warranty_years}</h4></TableCell>
                    <TableCell >

                      <AvailableIcon available={product.available}/>

                    </TableCell>
                    <TableCell align="right"> <Fab onClick={() => this.props.editProduct(product._id)}> <EditIcon /></Fab>
                                            &nbsp; <Fab color="secondary" aria-label="edit" onClick={() => this.deleteProduct(product._id)}>
                        <DeleteIcon />
                      </Fab>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      )
    }
  }
}

export default ProductList
