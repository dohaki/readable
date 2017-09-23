import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Label } from 'semantic-ui-react'

import { fetchPosts } from '../actions'

const labelColors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown']

class Categories extends Component {
  state = {
    active: 'all'
  }

  handleCategoryClick = (e, { children }) => {
    console.log(children)
    this.setState({active: children})
  }

  render() {
    const { categories } = this.props
    return (
      <div>
        <Label size='large' as='a' tag
          active={this.state.active === 'all'}
          color='black'
          onClick={this.handleCategoryClick}
        >
          all
        </Label>
        {categories && categories.map((category, i) => (
          <Label size='large' as='a' tag key={i}
            active={this.state.active === category.name}
            color={labelColors[i]}
            onClick={this.handleCategoryClick}
          >
            {category.name}
          </Label>
          )
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ categoriesReducer }) => ({
  categories: categoriesReducer.categories
})

const mapDispatchToProps = dispatch =>  ({
  fetchPosts: category => dispatch(fetchPosts(category))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)