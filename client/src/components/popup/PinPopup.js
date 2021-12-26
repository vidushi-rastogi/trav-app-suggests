import React, { useRef } from 'react';
import { Popup } from 'react-map-gl';
import { Star, Delete, Edit } from '@material-ui/icons';
import { Popover, Button, Modal, Box } from '@material-ui/core';
import { format } from 'timeago.js';
import { Rating }  from 'react-simple-star-rating';
import axios from 'axios';
import './popup.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 1.5,
  borderRadius: '10px'
};

const PinPopup = ({pin, setPins, setCurrentLoc, currentUser}) => {

  const formRef = useRef();
  const [rating, setRating] = React.useState(pin.rating);

  const handleRating = (rate) => {
    setRating(rate);
    
  }

  const [anchorEl, setAnchorEl] = React.useState(null); //anchor for delete icon

  //states for edit icon
  const [openEdit, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete("/api/pins/pin?id="+id);
      const allpins = await axios.get("/api/pins");
      setPins(allpins.data)
      console.log(res); 
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    console.log(id);
    console.log(rating);

    var obj = {
      title: formRef.current.title.value,
      desc: formRef.current.desc.value,
      rating: rating
    }
    const config = { headers: {'Content-Type': 'application/json'} };
    const res = await axios.put("/api/pins/pin?id="+id, obj, config);
    const allpins = await axios.get("/api/pins");
    setPins(allpins.data)
    console.log(res);
    setOpen(false);
  }

  const openDelete = Boolean(anchorEl);
  const id = openDelete ? 'simple-popover' : undefined;

    return (
        <Popup
                latitude={pin.latitude}
                longitude={pin.longitude}
                closeButton={true}
                closeOnClick={false}
                anchor="left"
                onClose={() => setCurrentLoc(null)} 
                >
                {pin.username === currentUser ? 
                  <div className="info-card">
                  <label>Place</label>
                  <h4 className="place">{pin.title}</h4>
                  <label>Review</label>
                  <p className="review">{pin.desc}</p>
                  <label>Rating</label>
                  <div className="rating">
                    {Array(pin.rating).fill(<Star className="star" />)}
                  </div>
                  <label>Information</label>
                  <span className="username">Created by <b>{pin.username}</b></span>
                  <span className="time">Posted {format(pin.createdAt)}</span>
                  {pin.updatedAt != pin.createdAt && <span className="time">Updated {format(pin.updatedAt)}</span>}
                  <Delete 
                    className="delete pin-icon" 
                    aria-describedby={id} 
                    variant="contained" 
                    onClick={handleDeleteClick}
                  />
                  <Popover
                    id={id}
                    open={openDelete}
                    anchorEl={anchorEl}
                    onClose={handleDeleteClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                  <div className='popconfirm'>
                    <p>Do you want to delete this pin?</p>
                    <Button variant="contained" onClick={() => handleDelete(pin._id)}>Yes</Button>
                  </div>
                </Popover>
                <Edit className="edit pin-icon" onClick={handleOpen}/>
                <Modal
                  open={openEdit}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <h4 id="modal-modal-title" variant="h6" component="h2">
                      Edit Pin
                    </h4>
                    <p id="modal-modal-description" sx={{ mt: 2 }}>
                      Please enter updated values
                    </p>
                    <div>
                      <form ref={formRef} onSubmit={(e) => handleEditSubmit(e,pin._id)}>
                        <label>Title</label>
                        <input name='title' defaultValue={pin.title}/>
                        <label>Review</label>
                        <textarea rows='5' name='desc' defaultValue={pin.desc}/>
                        <label>Rating</label>
                        {/* <select name='rating' defaultValue={pin.rating}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select> */}
                        <Rating
                          onClick={handleRating}
                          ratingValue={rating}
                          size={20}
                          label
                          transition
                          fillColor='orange'
                          emptyColor='gray'
                        />
                        <button className="submitForm" type="submit">Update pindown</button>
                      </form>
                    </div>
                  </Box>
                </Modal>
                </div>
                :
                <div className="info-card">
                  <label>Place</label>
                  <h4 style={{paddingBottom: '10px'}} className="place">{pin.title}</h4>
                  <label>Review</label>
                  <p style={{paddingBottom: '10px'}} className="review">{pin.desc}</p>
                  <label>Rating</label>
                  <div style={{paddingBottom: '10px'}} className="rating">
                    {Array(pin.rating).fill(<Star className="star" />)}
                  </div>
                  <label>Information</label>
                  <span className="username">Created by <b>{pin.username}</b></span>
                  <span className="time">Posted {format(pin.createdAt)}</span>
                  {pin.updatedAt != pin.createdAt && <span className="time">Updated {format(pin.updatedAt)}</span>}
                </div>
                  
                }
                
        </Popup>
    )
}

export default PinPopup;