import React, { Component } from "react";
import axios from 'axios';
import "./App.css";

const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() { // call server when component mounts
    // Promise: pending > resolved (success) || rejected (failure)
    const { data: posts } = await axios.get(apiEndpoint); // send http request, get data
    this.setState({ posts }); // update our posts
  }

  handleAdd = async () => {
    const obj = { title: 'a', body: 'b' };
    const { data: post } = await axios.post(apiEndpoint, obj); // send object/post to the server

    const posts = [post, ...this.state.posts]; // clone posts array with new post
    this.setState({ posts });
  };

  handleUpdate = async post => {
    post.title = "UPDATED";
    await axios.put(`${apiEndpoint}/${post.id}`, post); // send update to server
   
    const posts = [...this.state.posts];  // clone posts array
    const index = posts.indexOf(post);  // find index of this specific post
    posts[index] = { ...post }; // create an object with the updated post
    this.setState({ posts });
  };

  handleDelete = post => {
    console.log("Delete", post);
  };

  render() {
    return (
      <React.Fragment>
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
