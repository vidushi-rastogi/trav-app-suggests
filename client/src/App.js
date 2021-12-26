import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Room } from '@material-ui/icons';
import axios from 'axios';
import { Rating }  from 'react-simple-star-rating';
import './app.css';
import { Signup } from './components/signup/Signup';
import { Login } from './components/login/Login';
import PinPopup from './components/popup/PinPopup';
import mapboxgl from 'mapbox-gl';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

function App() {

  const localStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("user"));
  const [pins, setPins] = useState([]);
  const [currentLoc, setCurrentLoc] = useState(null);
  const [newPin, setNewPin] = useState(null);
  const [title, setTitle] = useState(null);
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [pinSize, setPinSize] = useState(7);

  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleRating = (rate) => {
    setRating(rate);
  }

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 5
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/api/pins");
        setPins(res.data)
      }
      catch (err) {
        console.log(err)
      }
    }
    getPins();
  }, []);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentLoc(id);
    setViewport({...viewport, latitude: lat, longitude: long});
  }

  const handleMapClick = (e) => {
    console.log(e);
    const [long, lat] = e.lngLat;
    setNewPin({
      lat,
      long
    });
  }

  const handleWheel = (e) => {
    console.log(e.delta);
    if (e.delta > 0) {
      if (pinSize > 4) {
        var size = pinSize - 0.3;
        setPinSize(size);
      } 
      else {
        setPinSize(3);
      }
    }
    else {
      if (pinSize < 6) {
        var size = pinSize + 0.4;
        setPinSize(size);
      }
      else {
        setPinSize(7);
      }
    }
      
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const addPin = {
      username: currentUser,
      title,
      desc: review,
      rating,
      longitude: newPin.long,
      latitude: newPin.lat
    };

    try {
      const res = await axios.post("/api/pins", addPin);
      setPins([...pins, res.data]);
      setNewPin(null);
    }
    catch (err) {

    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  }

  return (
    <div className="App">
      <ReactMapGL
      {...viewport}
      mapboxApiAccessToken='pk.eyJ1IjoidmlkdXJhc3RvZ2kiLCJhIjoiY2t0eHgzaDMxMWcwNDJwbXJvMmdpYjF6biJ9.0L2APBPX6d3vBc0eu48EQQ'
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle="mapbox://styles/vidurastogi/ckvj26q1s8jbj18rshmcgw9a9"
      onDblClick={handleMapClick}
      onWheel={(e) => handleWheel(e)}
      transitionDuration="200"
      >
        {pins && pins.map(pin => (
          <div key={pin._id}>
            <Marker 
            latitude={pin.latitude} 
            longitude={pin.longitude} 
            offsetLeft={-viewport.zoom * 3.5} 
            offsetTop={-viewport.zoom * 7}>
            <Room 
              style={{ fontSize: viewport.zoom * (pinSize), color: pin.username === currentUser ? 'tomato' : 'slateblue' }}
              onClick={() => handleMarkerClick(pin._id, pin.latitude, pin.longitude)}
            />
            </Marker>
            {pin._id === currentLoc &&
              <PinPopup pin={pin} setPins={setPins} setCurrentLoc={setCurrentLoc} currentUser={currentUser}/>
            }
          </div>
        ))}
          {newPin && 
          <Popup
            latitude={newPin.lat}
            longitude={newPin.long}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
            onClose={() => setNewPin(null)} 
          >
            <div className="review-form">
              <form onSubmit={handleFormSubmit}>
                <label>Title</label>
                <input 
                  placeholder="Enter place title" 
                  onChange={(e) => setTitle(e.target.value)}/>
                <label>Review</label>
                <textarea
                  rows='5' 
                  placeholder="Enter your review about the place" 
                  onChange={(e) => setReview(e.target.value)}/>
                <label>Rating</label>
                <Rating
                   onClick={handleRating}
                   ratingValue={rating}
                   size={20}
                   label
                   transition
                   fillColor='orange'
                   emptyColor='gray'
                />
                <button className="submitForm" type="submit">Add pindown</button>
              </form>
            </div>
          </Popup>
          }
        {currentUser ? 
        (<button className="btn logout" onClick={handleLogout}>Log Out</button>) 
        : 
        (
        <div className="btn-login-signin">
          <button className="btn login" onClick={() => setShowLogin(true)}>Log In</button>
          <button className="btn signin" onClick={() => setShowSignup(true)}>Sign Up</button>
        </div>
        )}
        
        {showSignup && <Signup setShowSignup={setShowSignup}/>}
        {showLogin && 
          <Login 
            setShowLogin={setShowLogin} 
            localStorage={localStorage} 
            setCurrentUser={setCurrentUser}
          />}
      </ReactMapGL>
    </div>
  );
}

export default App;
