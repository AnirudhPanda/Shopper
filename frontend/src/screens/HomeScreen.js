import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'
const HomeScreen = () => {
  const [products, setProducts] = useState([])
  // useEffect hook to request data from backend and in useEffect whatever we put inside the arrow fn is gonna run as soon as the component loads
  // we use that here bcoz we want the products as soon as our HomeScreen loads
  useEffect(() => {
    axios
      .get('/api/products')
      .then((res) => {
        setProducts(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
