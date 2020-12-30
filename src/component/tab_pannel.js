import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import cross_img from "./assets/cross_img.png";
import attach from "./assets/attach.png"
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import {
  location_by_id,
  add_other_images_by_location_id,
  delete_other_images_by_location_id
} from "./apis/location";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        // <Box p={3}>
        //   <Typography>{children}</Typography>
        // </Box>
        <div>{children}</div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          
          <Tab label="Promotional post" {...a11yProps(0)} />
          <Tab label="Post an event" {...a11yProps(1)} />
          <Tab label="Add a CTA" {...a11yProps(2)} />
          <Tab label="Report this post after expairy" {...a11yProps(3)} />
          
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <div >
    <MDBRow>
           <MDBCol md='8' className='ap_subhead1'>
           Write your post
           </MDBCol>
           <MDBCol md='4' className='ap_subhead2'>
           100-150 Characters
           </MDBCol>
         </MDBRow>

         {/* <MDBRow style={{marginTop:'15px'}}> 
           <MDBCol md='8'>
           <MDBRow >
                            <MDBCol md="2" className="ap_image">
                              <span>
                                <i className="zmdi zmdi-plus"></i>
                                <input
                                  type="file"
                                  name="otherImage"
                                  onChange={this.onUploadOtherImage}
                                />
                              </span>
                            </MDBCol>
                            {this.state.otherImages.map((n, i) => (
                              <MDBCol md="2" className="ap_image">
                                <img src={"https://digimonk.net/dashify-ci/assets/upload/images/business-type-image/" +
                                    n.image
                                  }
                                  alt=""
                                  style={{
                                    height: "60px",
                                    width: "60px",
                                    borderRadius: "10px"
                                  }}
                                />

                                <div className="get-image1">
                                  <img
                                    src={cross_img}
                                    alt=""
                                    style={{
                                      height: "10px",
                                      width: "10px",
                                      backgroundColor: "red",
                                      borderRadius: "50%",
                                      padding: "2px",
                                      marginTop: "-3px"
                                    }}
                                    onClick={() =>
                                      this.delete_other_image(n.id)
                                    }
                                  />
                                </div>
                              </MDBCol>
                            ))}
                          </MDBRow>
                         
           </MDBCol>
           <MDBCol md='4' className='ap_contant1'>
             <span><img src={attach} /></span>
           Attatch a document
           </MDBCol>
         </MDBRow>
         */}
         <MDBRow>
         <input   className="promo_input"  placeholder="Offer title " type='text' value={this.state.offer_title}
                          name="offer_title"
                          onChange={this.changeHandler}/>
         </MDBRow>
         <MDBRow>
         <input   className="promo_input"  placeholder="Start date " type='text' />
         </MDBRow>

         <MDBRow>
         <input   className="promo_input"  placeholder="End date " type='text' />
         </MDBRow>
        <div className='ap_subhead1'>Add more details (optional)</div>

         <MDBRow>
         <textarea rows="3"   className="promo_input"  placeholder="Offer details " type='text' />
         </MDBRow>

         <MDBRow>
         <input   className="promo_input"  placeholder="Coupon code (optional) " type='text' />
         </MDBRow>
         <MDBRow>
         <input   className="promo_input"  placeholder="Link to redeem offer (optional) " type='text' />
         </MDBRow>

         <MDBRow>
         <input   className="promo_input"  placeholder="Terms & Conditions  (optional) " type='text' />
         </MDBRow>
    </div>
   
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </div>
  );
}