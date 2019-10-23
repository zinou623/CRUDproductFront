export const CREATE = 'Add new Produit'
export const READ = 'fetch all Produits'
export const UPDATE = 'update Produit'
export const DELETE = 'delete Produit'

// dispatched when Produit needs to be created
export const createProduit = (Produit) => ({
  type: CREATE,
  payload: { Produit }
})

// dispatched when all the Produits stored in redux store needs to be read
export const readProduits = () => ({
  type: READ,
  payload: new Promise((resolve, reject) => {
    const url = 'http://localhost:3010/produits'
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        resolve({ data: result }

        )
      })
  })
})

// dispatched when certain Produit needs to be updated
export const updateProduit = (Produit) => ({
  type: UPDATE,
  payload: new Promise((resolve, reject) => {
    let url = 'http://localhost:3010/produits/'
    url += Produit._id
    console.log(Produit)
    fetch(url, {

      method: 'PUT',
      body: JSON.stringify(Produit)

    }).then((response) => response.json())
      .then((result) => {
        resolve({ data: result }

        )
      })
  })

})

// dispatched when certain Produit needs to be removed from redux store
export const deleteProduit = (id) => ({
  type: DELETE,
  payload: { id }
})
