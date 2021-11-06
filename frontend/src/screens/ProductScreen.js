import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'

const ProductScreen = ({ match }) => {
  // const product = products.find((p) => p._id === match.params.id) // match params checks id using Array,prototype.find() in JS
  const [product, setProduct] = useState({})

  useEffect(() => {
    axios
      .get(`/api/products/${match.params.id}`)
      .then((res) => {
        setProduct(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [match])

  return (
    <>
      <LinkContainer to='/'>
        <Button className='my-3 user-select-auto'>Go Back</Button>
      </LinkContainer>
      <Row>
        <Col md={6}>
          <Image
            className='image'
            src={product.image}
            alt={product.name}
            fluid
          />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={product.numReviews}
                reviews
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Price: </strong>₹{product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>About the Product:</strong> {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>₹ {product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className='d-grid gap-2'>
                <Button
                  className='my-2'
                  variant='secondary'
                  size='md'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
