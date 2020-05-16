import React, { Component, Fragment } from 'react';
import Particles from 'react-particles-js';
// import Clarifai from 'clarifai'; --move this to backend

import { Navigation, Logo, ImageLinkForm, Rank, FaceRecognition, SignIn, Register } from './components';

import './scss/base.scss';


// const app = new Clarifai.App({
//       apiKey: "5fa67e236d0948e0b77d88f58803f100",
// })

const particlesOptions = {
  particle: {
    numer: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin', // keeps track on where we are on the page
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  // constructor(){
  //   super();
  //   this.state = {
  //     input: '',
  //     imageUrl: '',
  //     box: {},
  //     route: 'signin', // keeps track on where we are on the page
  //     isSignedIn: false,
  //     user: {
  //       id: '',
  //       name: '',
  //       email: '',
  //       entries: 0,
  //       joined: ''
  //     }
  //   }
  // }

  constructor(){
    super();
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }

  // get to the server -- also this is just a test if the api is working
  // componentDidMount(){
  //   fetch('http://localhost:8080')
  //     .then(response => response.json())
  //     .then(console.log)
  // }

  calculateFaceLocation = (data) => { // the argument to this is the responce from the api
    // const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const clarifaiFace = data.outputs[0].data.regions
    // console.log (data.outputs);
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(width, height);
    // console.log(clarifaiFace.right_col + " " + clarifaiFace.left_col)
    clarifaiFace.map(region => {
      let coordinates = region.region_info.bounding_box
      console.log(coordinates)
    })
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  // get the face coordinates
  displayFaceBox = (box) => { // the argument to this is calculateFaceLocation() function
    // console.log(box);
    this.setState({box: box})
  }

  onInputChange = (e) => {
    this.setState({input: e.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})

    // fetch api call from backend

    // a403429f2ddf4b49b307e318f00e528b npm install clarifai
    // app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input) --move this to backend
    // from backend
    fetch('http://localhost:8080/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input,
            })
        })
      .then(response => response.json())
      
      .then((response) => {
        // console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
        // this.calculateFaceLocation(response)

        if(response){
          fetch('http://localhost:8080/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id,
            })
        })
          .then(response => response.json())
          // .then(count => this.setState({ user: {entries: count} }))
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count })) // use Object.assign() to only update the specific state.
            // console.log(count);
          })
          .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      }).catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      // this.setState({ isSignedIn: false })
      this.setState(initialState)
    }else if(route === 'home'){
      this.setState({ isSignedIn: true })
    }
    this.setState({route: route})
  }


  render(){
    const { isSignedIn, imageUrl, route, box, user:{ name, entries} } = this.state;
    // console.log("from render()", name)
    return (
      <Fragment>
        <Particles params={particlesOptions} className="particles" />
        <div className="main">
          <header>
            <Logo />
            <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
          </header>
          { route === "home" ?
            <div className="container" >
              <Rank name={name} entries={entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition imageUrl={imageUrl} box={box} />
            </div>
          : (
            route === "signin" ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />  :
            <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} /> 
            )
          }
        </div>
      </Fragment>
    );
  }
}

export default App;
