// import { changeDirection } from "./changeDirection";

const markup = {
  alert: `<div class="container py-5">
  <h3>Alert Examples</h3>
  <div id="alertDemo" class="alert alert-warning alert-dismissible fade show" data-test="alert" role="alert">
    <button type="button" class="btn-close" data-bs-target="alertDemo" data-bs-dismiss="alert" aria-label="Close"></button>
    <b>Holy guacamole!</b> Best check yo self, you're not looking too good.
  </div>
</div>`,
  button: `<div class="container py-5">
  <h3>Button Example</h3>
  <button type="button" class="btn btn-primary" data-bs-toggle="button" data-test="button" aria-pressed="false">Toggle button</button>
</div>`,
  carousel: `<div class="container" style="padding: 3rem 0">
  <h3>Carousel Example</h3>

  <div id="myCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="7000" data-bs-pause="hover" data-bs-keyboard="true" data-test="carousel">
    <div class="carousel-indicators">
      <button aria-label="Carousel Slide 1" data-bs-target="#myCarousel" data-bs-slide-to="0"></button>
      <button aria-label="Carousel Slide 2" data-bs-target="#myCarousel" data-bs-slide-to="1"></button>
      <button aria-label="Carousel Slide 3" data-bs-target="#myCarousel" data-bs-slide-to="2"></button>
    </div>
    <div class="carousel-inner" role="listbox">
      <div class="carousel-item rounded">
        <div class="item-bg bg-warning position-absolute inset-0 w-100 h-100"></div>
        <div class="container d-flex align-items-end h-100">
          <div class="position-relative text-dark text-left mb-5">
            <h1>Slide 1 Title Should Be A Little Longer</h1>
            <p class="lead">Slide 1 Text Should Be A Little Longer.</p>
            <p>In incididunt echo park, officia deserunt mcsweeney's proident master cleanse thundercats sapiente veniam.
              Excepteur VHS elit, proident shoreditch +1 biodiesel laborum craft beer. Single-origin coffee wayfarers
              irure four loko, cupidatat terry richardson master cleanse.</p>
          </div>
        </div>
      </div>
      <div class="carousel-item rounded">
        <div class="item-bg bg-info position-absolute inset-0 w-100 h-100"></div>
        <div class="container d-flex align-items-end h-100">
          <div class="position-relative text-dark w-100 mb-5">
            <h1>Slide 2 Title Should Be A Little Longer</h1>
            <p class="lead">Slide 2 Text Should Be A Little Longer.</p>
            <p>Assumenda you probably haven't heard of them
              art party fanny pack, tattooed nulla cardigan tempor ad. Proident wolf nesciunt sartorial keffiyeh eu banh
              mi sustainable. Elit wolf voluptate, lo-fi ea portland before they sold out four loko. Locavore enim nostrud
              mlkshk brooklyn nesciunt.</p>
          </div>
        </div>
      </div>
      <div class="carousel-item rounded">
        <div class="item-bg bg-danger position-absolute inset-0 w-100 h-100"></div>
        <div class="container d-flex align-items-end h-100">
          <div class="position-relative text-white text-right w-100 mb-5">
            <h1>Slide 3 Title Should Be A Little Longer</h1>
            <p class="lead">Slide 3 Text Should Be A Little Longer.</p>
            <p>Excepteur VHS elit, proident shoreditch +1 biodiesel laborum craft beer. Single-origin coffee wayfarers
              irure four loko, cupidatat terry richardson master cleanse. Elit wolf voluptate, lo-fi ea portland before
              they sold out four loko</p>
          </div>
        </div>
      </div>
    </div>
    <a class="carousel-control-prev" href="#myCarousel" role="button" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </a>
    <a class="carousel-control-next" href="#myCarousel" role="button" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </a>
  </div>
  <button class="btn btn-outline-secondary mt-3 me-2" data-bs-target="#myCarousel" data-bs-slide="prev">PREV</button>
  <button class="btn btn-outline-secondary mt-3 me-2" data-bs-target="#myCarousel" data-bs-slide="next">NEXT</button>
  <button class="btn btn-outline-secondary mt-3 me-2 active" data-bs-target="#myCarousel" data-bs-slide-to="0">0</button>
  <button class="btn btn-outline-secondary mt-3 me-2" data-bs-target="#myCarousel" data-bs-slide-to="1">1</button>
  <button class="btn btn-outline-secondary mt-3 me-2" data-bs-target="#myCarousel" data-bs-slide-to="2">2</button>
</div>
`,
  collapse: `<div class="container py-5">
    <h3>Collapse Example</h3>
    <p>
      <span class="btn-group">
        <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" aria-expanded="true" aria-controls="collapseExample">
          HREF
        </a>
        <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="true" aria-controls="collapseExample">data-bs-target</button>
      </span>
    </p>
    <div class="collapse" id="collapseExample">
      <div class="card card-body mb-3">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim
        keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
      </div>
    </div>
    <h3>Accordion Example</h3>
    <div class="accordion mb-3" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
            Accordion Item #1
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent=".accordion">
          <div class="accordion-body">
            <strong>This is the first item's accordion body.</strong> It is hidden by default, until the collapse plugin adds
              the appropriate classes that we use to style each element. These classes control the overall appearance, as well
              as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables.
              It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            Accordion Item #2
          </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent=".accordion">
          <div class="accordion-body">
            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate
            classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS
            transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about
            any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            Accordion Item #3
          </button>
        </h2>
        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent=".accordion">
          <div class="accordion-body">
            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate
            classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS
            transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about
            any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
        </div>
      </div>
    </div>
  </div>`,
  dropdown: `<div class="container" style="padding: 3rem">
    <h3>Dropdown Examples</h3>
    <div class="btn-toolbar mb-3">
      <div class="btn-group dropdown me-2">
        <a class="btn btn-secondary dropdown-toggle" href="#" id="dropdownButton4" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Form
        </a>
        <form class="px-3 dropdown-menu form-vertical" aria-expanded="false" aria-labelledby="dropdownButton4">
          <div class="mb-3">
            <label for="inputEmail3" class="control-label">Email</label>
            <div class=""><input type="email" class="form-control" id="inputEmail3" placeholder="Email" autocomplete="email"></div>
          </div>
          <div class="mb-3">
            <label for="inputPassword3" class="control-label">Password</label>
            <div class=""><input type="password" class="form-control" id="inputPassword3" placeholder="Password" autocomplete="current-password"></div>
          </div>
          <div class="mb-3">
            <div class="">
              <div class="checkbox"><label><input type="checkbox"> Remember me</label></div>
            </div>
          </div>
          <div class="mb-3">
            <div class="btn-group"><button type="submit" class="btn btn-secondary">Sign in</button></div>
          </div>
        </form>
      </div>
      <div class="btn-group dropup me-2">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                   
          Dropup
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">First Action</a>
          <a class="dropdown-item" href="#">Second Action</a>
          <a class="dropdown-item" href="#">Third Action</a>
          <a class="dropdown-item" href="#">Another Action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </div>
      <div class="btn-group dropstart me-2">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                    
          Menu Start
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </div>
      <div class="btn-group dropend">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Menu End
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </div>
    </div>
  </div>`,
  modal: `<div>
    <header class="navbar navbar-dark bg-secondary position-sticky top-0">
      <span>Native JavaScript for Bootstrap</span>
    </header>
    <div class="container" style="padding: 5rem 3rem 100vh 3rem">
      <h3>Modal Examples</h3>
      <a href="#myModal" id="myModalButton" class="btn btn-warning btn-lg" data-bs-toggle="modal">
        Launch simple modal
      </a>
      <div id="myModal" class="modal fade" tabindex="-1" role="dialog" data-test="modal" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header"> 
              <h4 class="modal-title" id="myModalLabel">Modal with animation</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <h4>Text in a modal</h4>
              <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
              
              <h4>Open modal from modal</h4>
              <p>Click <a data-bs-toggle="modal" href="#anotherModal">here</a> to open another modal.</p>
              <h4>Dismissing the modal is prevented!</h4>
              <p>Try selecting this text then click outside the modal dialog, the modal dismissal will be prevented.</p>
              <p><button class="btn btn-success btn-lg" data-bs-title="Tooltip Inside Modal" data-bs-toggle="tooltip">Tooltip Inside Modal</button></p>

              <h4>Overflowing text to show scroll behavior</h4>
              <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
              Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>

              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet
                rutrum faucibus dolor auctor.</p>
              
              <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
              
              <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
              
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum
                faucibus dolor auctor.</p>
              
              <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
              
              <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
              
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet
                rutrum faucibus dolor auctor.</p>
              
              <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            </div>
            <div class="modal-footer">
              <button id="anotherModalButton" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#anotherModal">Next</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="anotherModal" class="modal" data-test="modal" tabindex="-1" role="dialog" aria-labelledby="anotherModalLabel" aria-hidden="true" data-bs-backdrop="false">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header"> 
              <h4 class="modal-title" id="anotherModalLabel">Scrollable Not Animated Modal</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <h4>Linked Modal</h4>
              <p class="lead">This modal was opened from another modal</p>
              <p>This <b>Modal</b> uses <code>data-bs-backdrop="false"</code> intentionally to test the option independently for each instance.</p>
              <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
                quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
              <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
              <p><button class="btn btn-success btn-lg" data-bs-title="Tooltip Inside Modal" data-bs-toggle="tooltip">Tooltip Inside Modal</button></p>
            </div>
            <div class="modal-footer">
              <button data-bs-toggle="modal" data-bs-target="#myModal" type="button" class="btn btn-primary">Back</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`,
  offcanvas: `<div class="container" style="padding: 3rem 3rem 100vh 3rem">
    <h3>Offcanvas Examples</h3>
    <div class="btn-toolbar">
      <a class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
        Link with href
      </a>
      <button class="btn btn-primary ms-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNoBackdrop" aria-controls="offcanvasNoBackdrop">
        Button with data
      </button>
    </div>

    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" aria-hidden="true" aria-modal="true" role="dialog" data-test="offcanvas">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <p>This <b>Offcanvas</b> instance is a demo.</p>
        <p>Opening another <b>Offcanvas</b> instance will close this <b>Offcanvas</b> instance.</p>
        <p><button class="btn btn-success btn-lg" data-bs-title="Tooltip Inside Offcanvas" data-bs-toggle="tooltip">Tooltip Inside Offcanvas</button></p>
      </div>
    </div>

    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNoBackdrop" aria-labelledby="offcanvasNoBackdropLabel" data-bs-backdrop="false"  aria-hidden="true" aria-modal="true" role="dialog" data-test="offcanvas">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasNoBackdropLabel">Offcanvas End</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <p>This <b>Offcanvas</b> uses <code>data-bs-backdrop="false"</code> intentionally to test the option independently for each instance.</p>
      </div>
    </div>
  </div>`,
  popover: `<div class="container">
    <h3>Popover Example</h3>
    <div class="btn-toolbar mb-3">
      <button type="button" class="btn btn-success" data-bs-toggle="popover" data-test="popover" data-bs-placement="left" data-bs-dismissible="true" data-bs-title="Dismissible Popover" data-bs-content="Here we add more content for testing. Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.">
        Popover
      </button>    
    </div>
  </div>`,
  scrollspy: `<div class="container p-5">
      <h3>ScrollSpy Examples</h3>
      <div class="row">
        <div class="col-md-8">
          <nav class="navbar navbar-dark navbar-expand-md bg-dark px-3">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#scrollSpy-nav" aria-controls="scrollSpy-nav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div id="scrollSpy-nav" class="collapse navbar-collapse">
              <ul id="navbar-example" class="navbar-nav nav-pills">
                <li class="nav-item"><a class="nav-link active" href="#first">Tumblr farm</a></li>
                <li class="nav-item"><a class="nav-link" href="#second">Carles aesthetic</a></li>
                <li class="nav-item dropdown show">
                  <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">More Items <span class="caret"></span></a>
                  <div class="dropdown-menu show" role="menu">
                    <a class="dropdown-item" href="#one">one</a>
                    <a class="dropdown-item" href="#two">two</a>
                    <a class="dropdown-item" href="#three">three</a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          <div data-bs-spy="scroll" data-bs-target="#navbar-example" class="scrollspy-example position-relative overflow-auto border py-1 px-3 mb-3" style="height:150px">
            <h4 id="first">Tumblr farm</h4>
            <p>Ad leggings keytar, brunch id art party dolor labore. Pitchfork yr enim lo-fi before they sold out qui. Tumblr
              farm-to-table bicycle rights whatever. Anim keffiyeh carles cardigan. Velit seitan mcsweeney's photo booth 3
              wolf moon irure. Cosby sweater lomo jean shorts, williamsburg hoodie minim qui you probably haven't heard of
              them et cardigan trust fund culpa biodiesel wes anderson aesthetic. Nihil tattooed accusamus, cred irony
              biodiesel keffiyeh artisan ullamco consequat.</p>
      
            <h4 id="second">Carles aesthetic</h4>
            <p>Veniam marfa mustache skateboard, adipisicing fugiat velit pitchfork beard. Freegan beard aliqua cupidatat
              mcsweeney's vero. Cupidatat four loko nisi, ea helvetica nulla carles. Tattooed cosby sweater food truck,
              mcsweeney's quis non freegan vinyl. Lo-fi wes anderson +1 sartorial. Carles non aesthetic exercitation quis
              gentrify. Brooklyn adipisicing craft beer vice keytar deserunt.</p>
      
            <h5 id="one">one</h5>
            <p>Occaecat commodo aliqua delectus. Fap craft beer deserunt skateboard ea. Lomo bicycle rights adipisicing banh
              mi, velit ea sunt next level locavore single-origin coffee in magna veniam. High life id vinyl, echo park
              consequat quis aliquip banh mi pitchfork. Vero VHS est adipisicing. Consectetur nisi DIY minim messenger bag.
              Cred ex in, sustainable delectus consectetur fanny pack iphone.</p>
      
            <h5 id="two">two</h5>
            <p>In incididunt echo park, officia deserunt mcsweeney's proident master cleanse thundercats sapiente veniam.
              Excepteur VHS elit, proident shoreditch +1 biodiesel laborum craft beer. Single-origin coffee wayfarers irure
              four loko, cupidatat terry richardson master cleanse. Assumenda you probably haven't heard of them art party
              fanny pack, tattooed nulla cardigan tempor ad. Proident wolf nesciunt sartorial keffiyeh eu banh mi sustainable.
              Elit wolf voluptate, lo-fi ea portland before they sold out four loko. Locavore enim nostrud mlkshk brooklyn
              nesciunt.</p>
      
            <h5 id="three">three</h5>
            <p>Ad leggings keytar, brunch id art party dolor labore. Pitchfork yr enim lo-fi before they sold out qui. Tumblr
              farm-to-table bicycle rights whatever. Anim keffiyeh carles cardigan. Elit wolf voluptate, lo-fi ea portland
              before they sold out four loko. Locavore enim nostrud mlkshk brooklyn nesciunt.</p>
          </div>
        </div>
        <div class="col-md-4">
          <h3>Navbar</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8">
          <div class="row">
            <div class="col-4">
              <nav id="navbar-example3" class="navbar navbar-light bg-light flex-column">
                <a class="navbar-brand active" href="#">Navbar</a>
                <nav class="nav nav-pills flex-column w-100 px-2">
                  <a class="nav-link active" href="#item-1">Item 1</a>
                  <nav class="nav nav-pills flex-column">
                    <a class="nav-link ms-3 my-1 active" href="#item-1-1">Item 1-1</a>
                    <a class="nav-link ms-3 my-1" href="#item-1-2">Item 1-2</a>
                  </nav>
                  <a class="nav-link" href="#item-2">Item 2</a>
                  <a class="nav-link" href="#item-3">Item 3</a>
                </nav>
              </nav>
            </div>
            <div class="col-8">
              <div id="disposableSpy" class="position-relative overflow-auto" data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-offset="0" tabindex="0" style="height: 270px">
                <h4 class="pt-3" id="item-1">Item 1</h4>
                <p>Ex consequat commodo adipisicing exercitation aute excepteur occaecat ullamco duis aliqua id magna ullamco eu. 
                  Do aute ipsum ipsum ullamco cillum consectetur ut et aute consectetur labore. Fugiat laborum incididunt tempor 
                  eu consequat enim dolore proident. Qui laborum do non excepteur nulla magna eiusmod consectetur in. Aliqua 
                  et aliqua officia quis et incididunt voluptate non anim reprehenderit adipisicing dolore ut consequat deserunt 
                  mollit dolore. Aliquip nulla enim veniam non fugiat id cupidatat nulla elit cupidatat commodo velit ut 
                  eiusmod cupidatat elit dolore.</p>
                <h5 id="item-1-1">Item 1-1</h5>
                <p>Amet tempor mollit aliquip pariatur excepteur commodo do ea cillum commodo Lorem et occaecat elit qui et. 
                  Aliquip labore ex ex esse voluptate occaecat Lorem ullamco deserunt. Aliqua cillum excepteur irure consequat 
                  id quis ea. Sit proident ullamco aute magna pariatur nostrud labore. Reprehenderit aliqua commodo eiusmod 
                  aliquip est do duis amet proident magna consectetur consequat eu commodo fugiat non quis. Enim aliquip 
                  exercitation ullamco adipisicing voluptate excepteur minim exercitation minim minim commodo adipisicing 
                  exercitation officia nisi adipisicing. Anim id duis qui consequat labore adipisicing sint dolor elit 
                  cillum anim et fugiat.</p>
                <h5 id="item-1-2">Item 1-2</h5>
                <p>Cillum nisi deserunt magna eiusmod qui eiusmod velit voluptate pariatur laborum sunt enim. Irure laboris mollit 
                  consequat incididunt sint et culpa culpa incididunt adipisicing magna magna occaecat. Nulla ipsum cillum eiusmod 
                  sint elit excepteur ea labore enim consectetur in labore anim. Proident ullamco ipsum esse elit ut Lorem eiusmod 
                  dolor et eiusmod. Anim occaecat nulla in non consequat eiusmod velit incididunt.</p>
                <h4 id="item-2">Item 2</h4>
                <p>Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor. Laborum consequat non elit enim 
                  exercitation cillum aliqua consequat id aliqua. Esse ex consectetur mollit voluptate est in duis laboris ad sit 
                  ipsum anim Lorem. Incididunt veniam velit elit elit veniam Lorem aliqua quis ullamco deserunt sit enim elit 
                  aliqua esse irure. Laborum nisi sit est tempor laborum mollit labore officia laborum excepteur commodo non 
                  commodo dolor excepteur commodo. Ipsum fugiat ex est consectetur ipsum commodo tempor sunt in proident.</p>
                <h4 id="item-3">Item 3</h4>
                <p>Quis anim sit do amet fugiat dolor velit sit ea ea do reprehenderit culpa duis. Nostrud aliqua ipsum fugiat minim 
                  proident occaecat excepteur aliquip culpa aute tempor reprehenderit. Deserunt tempor mollit elit ex pariatur dolore 
                  velit fugiat mollit culpa irure ullamco est ex ullamco excepteur.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <h3>Regular Nav</h3>
        </div>
      </div>
    </div>`,
  tab: `<div class="container p-5">
      <div class="row">
        <div class="col">
          <h3>Tab Examples</h3>

          <ul id="myTab" class="nav nav-tabs mb-2" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" href="#home" id="home-tab" role="tab" data-height="true" data-bs-toggle="tab" aria-controls="home" aria-expanded="true" aria-selected="true">
                Home
              </a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="myTabDrop1" data-bs-toggle="dropdown" aria-controls="myTabDrop1-contents" aria-expanded="false">Dropdown <span class="caret"></span>
              </a>
              <div class="dropdown-menu" role="menu" aria-labelledby="myTabDrop1" id="myTabDrop1-contents">
                <a class="dropdown-item" href="#dropdown1" role="tab" id="dropdown1-tab" data-bs-toggle="tab" aria-controls="dropdown1" aria-expanded="false" aria-selected="false">Some tab</a>
                <a class="dropdown-item" id="tabEventsExample" href="#dropdown2" role="tab" data-bs-toggle="tab" aria-controls="dropdown2" aria-expanded="false">Events</a>
              </div>
            </li>
          </ul>
          <div id="myTabContent" class="tab-content mb-2">
            <div role="tabpanel" class="tab-pane fade active show" id="home" aria-labelledby="home-tab">
              <p><b class="text-info">These tabs have no active tab on initialization.</b> Nesciunt tofu stumptown aliqua, retro synth
                master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Messenger bag gentrify pitchfork tattooed
                craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings
                gentrify squid 8-bit cred pitchfork.</p>
            </div>
            <div role="tabpanel" class="tab-pane fade" id="dropdown1" aria-labelledby="dropdown1-tab">
              <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny
                pack lo-fi farm-to-table. </p>
            </div>
            <div role="tabpanel" class="tab-pane fade" id="dropdown2" aria-labelledby="tabEventsExample">
              <p>Wolf viral, mustache readymade thundercats keffiyeh craft beer marfa ethical. Wolf salvia freegan, sartorial
                keffiyeh echo park vegan.</p>
            </div>
          </div>

          <ul id="myTab1" class="nav nav-pills mb-2" role="tablist">
            <li class="nav-item">
              <a class="nav-link" href="#home1" id="home1-tab" role="tab" data-bs-toggle="tab" aria-controls="home1" aria-expanded="true" aria-selected="true">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link d-flex flex-row align-items-center" href="#profile" role="tab" id="profile-tab" data-bs-toggle="tab" aria-controls="profile1" aria-selected="false">Profile</a>
            </li>
          </ul>
          <div id="myTabContent1" class="tab-content">
            <div role="tabpanel" class="tab-pane" id="home1" aria-labelledby="home1-tab">
              <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth
                master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica.</p>
            </div>
            <div role="tabpanel" class="tab-pane" id="profile" aria-labelledby="profile-tab">
              <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1
                labore velit, blog sartorial PBR leggings next level wes anderson artisan four.</p>
            </div>
          </div>
        </div>
      </div>
    </div>`,
  toast: `<div class="container py-5">
      <h3>Toast Example</h3>
      <div class="btn-toolbar">
        <button class="btn btn-outline-secondary me-1" data-bs-toggle="toast" data-bs-target="#liveToast1">Show Toast 1</button>
        <a href="#liveToast2" class="btn btn-outline-secondary" data-bs-toggle="toast">Show Toast 2</a>
      </div>
      <div class="position-fixed top-0 end-0 p-3" style="z-index: 11">
        <div id="liveToast1" class="toast mb-1 fade hide" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true" data-bs-animation="true">
          <div class="toast-header">
            <svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
              <rect fill="#007aff" width="100%" height="100%"></rect>
            </svg>
            <strong class="me-auto">BSN</strong>
            <small>11 mins ago</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body">
            Hello, world! This is a toast message.
          </div>
        </div>
        <div id="liveToast2" class="toast mb-1 fade hide" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true" data-bs-animation="true">
          <div class="toast-header">
            <svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
              <rect fill="#007aff" width="100%" height="100%"></rect>
            </svg>
            <strong class="me-auto">BSN</strong>
            <small>12 mins ago</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body">
            Hello, there! This is another toast message.
          </div>
        </div>
      </div>
    </div>`,
  tooltip: `<div class="container" style="padding: 3rem">
      <h3>Tooltip Example</h3>
      <div class="btn-toolbar mb-3">
        <button id="tooltipElementContent" type="button" class="btn btn-primary me-1 mb-1" data-test="tooltip" data-bs-placement="left">Left</button>
        <a href="#" id="tooltipWithEvents" class="btn btn-dark me-1 mb-1" data-test="tooltip" data-bs-toggle="tooltip" data-bs-placement="top" title="<b>Tooltip on top</b><br>This tooltip example has all events attached">Events</a>
        <button type="button" class="btn btn-secondary me-1 mb-1" data-test="tooltip" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="<b>Tooltip on bottom with <code>focus</code> event</b><br>Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.">Bottom</button>
        <button type="button" class="btn btn-success me-1 mb-1" data-test="tooltip" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="<b>Tooltip on right</b><br>Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.">Right</button>
        <button type="button" class="btn btn-warning me-1 mb-1" data-test="tooltip" data-bs-toggle="tooltip" data-bs-trigger="click" data-bs-title="<b>Tooltip only on click</b> <span class='badge bg-success'>NEW</span><br>Perhaps adding even more content would make the job more difficult? Nope, same as if this was a very very short tooltip. Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.">Click</button>
        <button id="tooltipTemplateExample" type="button" class="btn btn-danger me-1 mb-1" data-test="tooltip" data-bs-title="<b>Top TEMPLATE</b> <span class='badge bg-danger'>HOT</span><br>This tooltip will be added to a position: relative container. Check out the <code>scripts.js</code> file for this template example sample code. Perhaps adding even more content would make the job more difficult? Nope, same as if this was a very very short tooltip.">Template</button>
        <button type="button" class="btn btn-outline-secondary position-absolute me-1 mb-1 d-none" data-test="tooltip" style="top:0; right: 0;" data-bs-toggle="tooltip" data-bs-placement="left" data-container="#tooltipExamples" data-bs-title="Tooltip on absolute position element. This requires a position: relative container.">Absolute</button>
        <input style="max-width: 100px; display: inline; vertical-align: bottom;" data-test="tooltip" type="text" value="" class="form-control me-1 mb-1" placeholder="Focus me" data-bs-toggle="tooltip" data-bs-title="Tooltip only on focus" data-bs-trigger="focus">
        <div class="position-static d-flex" id="staticContainer">
          <button type="button" class="btn btn-info me-1 mb-1" data-test="tooltip" data-bs-toggle="tooltip" data-bs-container="#staticContainer" data-bs-title="<b>Tooltip in static container</b><br>This tooltip is added to a position: static container. If the configured container belongs to parent with position: relative, the component will bypass the configuration.">Static</button>
        </div>
        <svg viewBox="0 0 80 43" width="80" height="43" xmlns="http://www.w3.org/2000/svg" class="me-1 mb-1" data-test="tooltip" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="<b>Demo Tooltip for </b> <span class='badge bg-success'>SVG</span><br>Perhaps adding even more content would make the job more difficult? Nope, same as if this was a very very short tooltip. Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.">
          <rect fill="rgba(0,0,0,0.01)" stroke="#ccc" stroke-width="1" width="100%" height="100%" rx="5"></rect>
          <text direction="ltr" fill="#333" x="25" y="25" font-size="14">SVG</text>
        </svg>
        <img class="me-1 mb-1" data-test="tooltip" data-bs-toggle="tooltip" data-bs-placement="top" alt="Demo Tooltip for IMG" src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgODAgNDMiIHdpZHRoPSI4MCIgaGVpZ2h0PSI0MyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgICAgICAgICAgICAgICAgIDxyZWN0IGZpbGw9IndoaXRlIiBzdHJva2U9IiNjY2MiIHN0cm9rZS13aWR0aD0iMSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgcng9IjUiPjwvcmVjdD4NCiAgICAgICAgICAgICAgICAgIDx0ZXh0IGRpcmVjdGlvbj0ibHRyIiBmaWxsPSIjMzMzIiB4PSIyNSIgeT0iMjUiIGZvbnQtc2l6ZT0iMTQiPklNRzwvdGV4dD4NCiAgICAgICAgICAgICAgICA8L3N2Zz4=" title="<b>Demo Tooltip for </b> <span class='badge bg-info'>IMG</span><br>Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.">
      </div>
    </div>`,
};

export default (component: keyof typeof markup) => {
  const domParser = new DOMParser();
  let tempDocument = domParser.parseFromString(markup[component], "text/html");
  const container = tempDocument.querySelector("div")!;

  return container;
};
