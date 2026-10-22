class MyAbout extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div id="about" class="about-area section-top-spacing">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-10 col-lg-8 m-auto">
                    <div class="section-inner-content text-center">
                        <div class="section-title">
                            <h2 class="wow animate fadeInUp" data-wow-duration="900ms" data-wow-delay="0s">About
                                <span>me</span>
                            </h2>
                            <span class="wow animate fadeInUp" data-wow-duration="900ms" data-wow-delay="0s"></span>
                        </div>
                        <h6 class="sub-title wow animate fadeInUp" data-wow-duration="1200ms" data-wow-delay="0s"> Thinking outside the box.</h6>
                    </div>
                </div>

                <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 ">
                    <div class="img-box">
                        <img src="./assets/images/banner-img.png" class="img-fluid" alt="about">
                    </div>
                </div>

                <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 ">
                    <div class="content-area">
                        <div class="inner-tile">
                            <h3 class="inner-content-title wow animate fadeInUp" data-wow-duration="900ms"
                                data-wow-delay="0s"> I'm Luong Nguyen </h3>
                            <p class="wow animate fadeInUp" data-wow-duration="1200ms" data-wow-delay="0s">A Junior <span>Developer</span> based in <span>Hanoi.</span></p>
                        </div>
                        <div class="inner-text wow animate fadeInUp" data-wow-duration="1500ms" data-wow-delay="0s">
                            <p> ...</p>
                        </div>
                        <hr>
                        <div class="personal-info">
                            <h4 class="wow animate fadeInLeft" data-wow-duration="900ms" data-wow-delay="0s">
                                personal info</h4>
                            <div class="info-list d-flex justify-content-between align-items-center">
                                <ul>
                                    <li class="wow animate fadeInUp" data-wow-duration="900ms" data-wow-delay="0s">
                                        <p><span>Name: </span> Luong Nguyen</p>
                                    </li>
                                    <li class="wow animate fadeInUp" data-wow-duration="1200ms" data-wow-delay="0s">
                                        <p><span>age: </span> 23 years</p>
                                    </li>
                                    <li class="wow animate fadeInUp" data-wow-duration="1500ms" data-wow-delay="0s">
                                        <p><span>nationality: </span> Vietnam</p>
                                    </li>
                                    <li class="wow animate fadeInUp" data-wow-duration="1800ms" data-wow-delay="0s">
                                        <p><span> languages: </span> Vietnamese, English</p>
                                    </li>
                                </ul>

                                <ul>
                                    <li class="wow animate fadeInUp" data-wow-duration="900ms" data-wow-delay="0s">
                                        <p><span>Address: </span> 144 Nguyen An Ninh</p>
                                    </li>
                                    <li class="wow animate fadeInUp" data-wow-duration="1200ms" data-wow-delay="0s">
                                        <p><span>Phone: </span><a href="tel:+84962037205"> <span id="phone-number"></span></a></p>
                                    </li>
                                    <li class="wow animate fadeInUp" data-wow-duration="1500ms" data-wow-delay="0s">
                                        <p><span>Email: </span> <a href="mailto:luongnv.grey@gmail.com" style="text-transform: lowercase;">luongnv.grey@gmail.com</a></p>
                                    </li>
                                    <li class="wow animate fadeInUp" data-wow-duration="1800ms" data-wow-delay="0s">
                                        <p><span> Freelance: </span> Available</p>
                                    </li>
                                </ul>
                            </div>
                            <a href="https://drive.google.com/file/d/1vobpnTDLNa6sBEm5SKkHt5iBgseTXZoe/view?usp=sharing" download class="btn download-btn wow animate fadeInUp"
                                data-wow-duration="2000ms" data-wow-delay="0s"> Download CV <i
                                    class="bi bi-download"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
    }
}

customElements.define('my-about', MyAbout);
