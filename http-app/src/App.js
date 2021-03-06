import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import http from "./services/httpService";
import config from "./config.json";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() { // call server when component mounts
    // Promise: pending > resolved (success) || rejected (failure)
    const { data: posts } = await http.get(config.apiEndpoint); // send http request, get data
    this.setState({ posts }); // update our posts
  }

  handleAdd = async () => {
    const obj = { title: 'a', body: 'b' };
    const { data: post } = await http.post(config.apiEndpoint, obj); // send object/post to the server

    const posts = [post, ...this.state.posts]; // clone posts array with new post
    this.setState({ posts });
  };

  handleUpdate = async post => {
    post.title = "UPDATED";
    await http.put(`${config.apiEndpoint}/${post.id}`, post); // send update to server
   
    const posts = [...this.state.posts];  // clone posts array
    const index = posts.indexOf(post);  // find index of this specific post
    posts[index] = { ...post }; // create an object with the updated post
    this.setState({ posts });
  };

  handleDelete = async post => {  // optimistic update (await is after the setState)
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter(p => p.id !== post.id); // save all posts except one that is being deleted
    this.setState({ posts });

    try {
      await http.delete(`${config.apiEndpoint}/${post.id}`);
      // await http.delete("s" + apiEndpoint + post.id);
    }
    catch (ex) {  // if delete fails, set state to original posts
      if (ex.response && ex.response.status === 404)
        alert('This post doesn\'t exist or has already been deleted.');
      
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
