import React from 'react'
import { Button, FormControl, FormGroup, TextField } from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
class AddProduct extends React.Component {
  constructor (props) {
    super(props)

    this.initialState = {
      _id: '',
      name: '',
      type: '',
      price: '',
      rating: '',
      warranty_years: 2,
      available: ''

    }

    if (props.product) {
      this.state = props.product
       
    } else {
      this.state = this.initialState
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleChange (event) {
    const name = event.target.name
    const value = event.target.value
    if (name === 'available') {
      this.setState({
        [name]: event.target.checked
      })
    } else {
      this.setState({
        [name]: value
      })
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.onFormSubmit(this.state)
    this.setState(this.initialState)

  }

  handleCancel (event) {
    event.preventDefault()
    this.props.onFormSubmit(null)
    this.setState(this.initialState)
  }

  render () {
    let pageTitle
    if (this.state._id) {
      this.initialState = this.state
      pageTitle = <h2>Edit Product</h2>
       
    } else {
      pageTitle = <h2>Add Product</h2>
    }

    return (
      <div>

        {pageTitle}
        <br/>
        <br />
        <br />
        <Grid container spacing={20} >
          <form onSubmit={this.handleSubmit} >

            <Grid container spacing={20} >
              <Grid item xs={12} sm={6} >
                <TextField
                  required
                  type="text"
                  label="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  variant="outlined"
                  placeholder="name of product"

                  fullWidth
                  style={{ margin: 8 }}

                />
              </Grid>

              <Grid item xs={12} sm={6} >
                <TextField
                  required
                  type="text"
                  label="Type"
                  name="type"
                  value={this.state.type}
                  onChange={this.handleChange}
                  variant="outlined"

                  placeholder="type of product"

                  fullWidth
                  style={{ margin: 8 }}
                />
              </Grid>
              <Grid item xs={12} sm={6} >
                <TextField
                  required
                  type="number"
                  label="price"
                  name="price"
                  value={this.state.price}
                  onChange={this.handleChange}
                  variant="outlined"

                  placeholder="price of product"

                  fullWidth
                  style={{ margin: 8 }}

                />
              </Grid>
              <Grid item xs={12} sm={6} >
                <TextField
                  required
                  type="number"
                  label="rating"
                  name="rating"
                  value={this.state.rating}
                  onChange={this.handleChange}
                  variant="outlined"

                  placeholder="rating of product"

                  fullWidth
                  style={{ margin: 8 }}

                />
              </Grid>
              <Grid item xs={12} sm={6} >
                <TextField
                  required
                  type="number"
                  label="warranty_years"
                  name="warranty_years"
                  onChange={this.handleChange}
                  value={this.state.warranty_years}
                  variant="outlined"

                  placeholder="warranty_years of product "

                  fullWidth
                  style={{ margin: 8 }}
                />
              </Grid>

              <Grid item xs={12} sm={3} >
                <FormControlLabel
                  fullWidth
                  value="available"

                  label="availablaty of product"
                  style={{ margin: 8 }}
                  control= { <Checkbox
                    checked={this.state.available}
                    onChange={this.handleChange}
                    name="available"
                    inputProps={{
                      'aria-label': 'primary checkbox'
                    }}

                  />}
                />
              </Grid>

              <Grid item xs={5} sm={1} >

                <FormGroup style={{ margin: 8 }}>
                  <FormControl type="hidden" name="id" value={this.state._id} />
                  <Button variant="outlined" color="primary" type="submit">Save</Button>

                </FormGroup>
              </Grid>
              <Grid item xs={5} sm={1} style={{ margin: 8 }} >
                <Button variant="outlined" color="primary" type="cancel" onClick={this.handleCancel}>Cancel</Button>
              </Grid>
            </Grid>
          </form>

        </Grid>

      </div>
    )
  }
}

export default AddProduct
