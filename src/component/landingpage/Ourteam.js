import React from 'react'

function OurTeam() {
    return (
      <div>
      <Navbar />
      <div >
      <div className='container'>
      <nav class="navbar navbar-expand-lg navbar-light  ">
   
        <a class="navbar-brand" href="#">
          <img src={require("../src/images/LOGO 4.png")} alt="" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav main_menu mx-auto ">
            <li class="nav-item ">
              <a class="nav-link" href="#">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                About Us
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Features
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Pricing
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Support
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Sign in
              </a>
            </li>
          </ul>
          <div>
            <button class="btn btn_color" type="submit">
              <span>Book A Demo</span>
            </button>
          </div>
        </div>
      </nav>
      
      <div className='teamsimg'>
              
              <h3>
              Meet our team
              </h3>
              <h4>Star in intelligent search</h4>
              <div className='row'>
                  <div className='col-7'>
              <p> Your customers are your most important source of feedback.
                   Their ratings and reviews impact how search engines and other customers make
                    decisions about your brand everyday. If you don’t pay attention to this important 
                  source of customer feedback, you could be leaving revenue on the table. </p>
                  </div>
                  </div>
          </div>
       <div className='headteam '>
           <h2>OUR TEAM</h2>
       </div>
       
          
           <div className='row teamim mt-5'>
            <div className='col-md-2 teimg'> 
            <img src={require("../src/images/Rectangle 273.png")} alt="" /> </div>
            <div className='col-md-2 teimg'><img src={require("../src/images/Rectangle 273.png")} alt="" /></div>
            <div className='col-md-2 teimg'><img src={require("../src/images/Rectangle 273.png")} alt="" /></div>
            <div className='col-md-2 teimg'> <img src={require("../src/images/Rectangle 273.png")} alt="" /></div>
            <div className='col-md-2 teimg'> <img src={require("../src/images/Rectangle 273.png")} alt="" /></div>
        </div>
        <div className='row teamim mt-5'>
            <div className='col-md-2 teimg'> 
            <img src={require("../src/images/Rectangle 273.png")} alt="" /> </div>
            <div className='col-md-2 teimg'><img src={require("../src/images/Rectangle 273.png")} alt="" /></div>
            <div className='col-md-2 teimg'><img src={require("../src/images/Rectangle 273.png")} alt="" /></div>
            <div className='col-md-2 teimg'> <img src={require("../src/images/Rectangle 273.png")} alt="" /></div>
            <div className='col-md-2 teimg'> <img src={require("../src/images/Rectangle 273.png")} alt="" /></div>
        </div>
        <div className='row text-center mt-5'>
            <div className='col-md-6 lastcardteam'>
            <img src={require("../src/images/Rectangle 273.png")} alt="" />
            <h3 className='mt-2'>Lorem ipsum dolor</h3>
            <p> Your customers are your most important source of feedback</p>
            <button type="button" class="btn btn-ourtem ">Learn more </button>
            </div>
            <div className='col-md-6 lastcardteam'>
            <img src={require("../src/images/Rectangle 273.png")} alt="" />
            <h3 className='mt-2'>Lorem ipsum dolor</h3>
            <p> Your customers are your most important source of feedback</p>
            <button type="button" class="btn btn-ourtem ">Learn more </button>
            </div>
         
        </div>
      </div>

      <footer class="foot_color">
        <div class="row">
          <div class=" col-md-3 imgalign">
          <img src={require("../src/images/dasify.png")} alt="" /> 
          </div>
          <div class="col-md-3 about_us">
            <ul class="list-unstyled text-small ">
              <li>
                <a class="text-muted" href="#">
                  About us
                </a>
              </li>
              <li>
                <a class="text-muted" href="#">
                  How we work
                </a>
              </li>
              <li>
                <a class="text-muted" href="#">
                  Our team
                </a>
              </li>
              <li>
                <a class="text-muted" href="#">
                  Our customers{" "}
                </a>
              </li>
              <li>
                <a class="text-muted" href="#">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div class="col-md-3  about_us">
            <ul class="list-unstyled text-small">
              <li>
                <a class="text-muted" href="#">
                  Our App
                </a>
              </li>
              <li>
                <a class="text-muted" href="#">
                  Listings Management
                </a>
              </li>
              <li>
                <a class="text-muted" href="#">
                  Review Management
                </a>
              </li>
              <li>
                <a class="text-muted" href="#">
                  Analytics
                </a>
              </li>
              <li>
                <a class="text-muted" href="#">
                  Сomments and reviews
                </a>
              </li>
              <li>
                <a class="text-muted" href="#">
                  Features
                </a>
              </li>
            </ul>
          </div>
          <div class="col-md-3  about_us">
            <ul class="list-unstyled text-small">
              <li>
                <a class="text-muted" href="#">
                  Pricing
                </a>
              </li>
              <li>
                <a class="text-muted" href="#">
                  Support
                </a>
              </li>
              <li>
                <a class="text-muted" href="#">
                  Log in
                </a>
              </li>
              <li>
                <a class="text-muted" href="#">
                  Contact us
                </a>
              </li>
              <button type="button" class="btn btn-demo ">
                <a href="">Book A Demo</a>
              </button>
            </ul>
          </div>
        </div>
      </footer>

<div className="all_right">
      <p>©Dashify | All Rights Reserved</p>
    </div>
      </div>
      <Footer />
    </div>
    )
}

export default OurTeam
