import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
// import { useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from './styles';
import { connect } from "react-redux";
import {getPosts} from "../actions/posts";

const Posts = (props) => {
  const { setCurrentId } = props;
  // const posts = useSelector((state) => state.posts);
  React.useEffect(()=>{
    props.getPosts();
  },[props.reload]);
  const classes = useStyles();

  return (
    !props.posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {props.posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

const mapStateToProps = ({posts}) => {
  return {
    posts: posts.posts,
    reload: posts.reload,
  }
};

const mapDispatchToProps = {
  getPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);