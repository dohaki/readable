import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Header, Label, Grid, Statistic, Button } from 'semantic-ui-react'
import dateformat from 'dateformat'

import MenuInverted from './MenuInverted'
import {
  fetchCategories,
  fetchPosts,
  getUsername,
  votePost
} from '../actions'
import { getColor } from '../utils/category'
import './App.css'

class PostDetail extends Component {

  componentDidMount() {
    this.props.fetchCategories()
    this.props.fetchPosts()
    this.props.getUsername()
  }

  handleVote = (e, { icon }) => {
    const { post, votePost, selectedCategory } = this.props
    if (icon === 'thumbs down') {
      votePost(post, 'downVote', selectedCategory)
    } else {
      votePost(post, 'upVote', selectedCategory)
    }
  }

  render() {
    const { posts, match } = this.props
    const post = posts ? posts.filter(p => p.id === match.params.id)[0] : null
    return (
      <div className="App">
        <MenuInverted isDetail={true} />
        {
          post ?
          <Container>
            <Grid>
              <Grid.Column width={3} textAlign='center'>
                <Grid.Column width={1} className='no-padding-bottom' textAlign='center'>
                  <Statistic size='small'>
                    <Statistic.Value>{post.voteScore}</Statistic.Value>
                  </Statistic>
                </Grid.Column>
                <Grid.Column width={1} textAlign='right' className='no-padding-top'>
                  <Button inverted color='red' icon='thumbs down'
                    onClick={this.handleVote}/>
                </Grid.Column>
                <Grid.Column>
                  <Button inverted color='green' icon='thumbs up'
                    onClick={this.handleVote}/>
                </Grid.Column>
              </Grid.Column>
              <Grid.Column width={13}>
                <Header as='h1'>{post.title}</Header>
                <Header.Subheader>
                  posted by <strong>{post.author}</strong>&nbsp;
                  on <strong>{dateformat(post.timestamp)}</strong>&nbsp;
                  in <Label as='a' tag color={getColor(post.category)}>{post.category}</Label>
                </Header.Subheader>
                <p style={{fontSize: '18px', marginTop: '10px'}}>{post.body}</p>
              </Grid.Column>
            </Grid>
          </Container> :
          <div>Loading...</div>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ categoriesReducer, postsReducer }) => ({
  posts: postsReducer.posts,
  fetching: postsReducer.fetching
})

const mapDispatchToProps = dispatch =>  ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchPosts: () => dispatch(fetchPosts()),
  getUsername: () => dispatch(getUsername()),
  votePost: (post, vote, category) => dispatch(votePost(post, vote, category))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)
