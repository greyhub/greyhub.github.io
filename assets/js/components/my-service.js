class MyService extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div id="service" class="services-area section-spacing">
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-md-10 col-lg-8 m-auto">
                            <div class="section-inner-content text-center">
                                <div class="section-title">
                                    <h2 class="wow animate fadeInUp" data-wow-duration="900ms" data-wow-delay="0s">Latest
                                        Digital <span>services</span> </h2>
                                    <span class=" wow animate fadeInUp" data-wow-duration="1200ms"
                                        data-wow-delay="0s"></span>
                                </div>
                                <h6 class="sub-title wow animate fadeInUp" data-wow-duration="1500ms" data-wow-delay="0s">
                                    I provide worldwide range of digital services
                                </h6>
                            </div>
                        </div>
                    </div>

                    <div class="service-items bg-active">
                        <div class="row">

                            <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-8 col-12 text-center m-auto">
                                <div class="service-item text-center bg-active wow animate fadeInUp"
                                    data-wow-duration="900ms" data-wow-delay="0s">
                                    <div class="box_innerIcon">
                                        <i class="flaticon-web-design"></i>
                                    </div>

                                    <div class="box_innerContent text-center">
                                        <h3><a href="#">UI/UX Design</a> </h3>
                                        <p>There are many Ipsum variations of passages of Lorem Ipsum available.</p>

                                        <a href="#" class="btn btn-link btn_learnMore">Learn More <i
                                                class="flaticon-right-arrow-1"></i></a>

                                    </div>
                                </div>
                            </div>
                            <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-8 col-12 text-center m-auto">
                                <div class="service-item text-center bg-active wow animate fadeInUp"
                                    data-wow-duration="1200ms" data-wow-delay="0s">
                                    <div class="box_innerIcon">
                                        <i class="flaticon-web-programming"></i>
                                    </div>
                                    <div class="box_innerContent text-center">
                                        <h3><a href="#">Web Development</a> </h3>
                                        <p>There are many Ipsum variations of passages of Lorem Ipsum available.</p>
                                        <a href="#" class="btn btn-link btn_learnMore">Learn More <i
                                                class="flaticon-right-arrow-1"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-8 col-12 text-center m-auto">
                                <div class="service-item text-center bg-active wow animate fadeInUp"
                                    data-wow-duration="1400ms" data-wow-delay="0s">
                                    <div class="box_innerIcon">
                                        <i class="flaticon-technical-support"></i>
                                    </div>

                                    <div class="box_innerContent text-center">
                                        <h3><a href="#">Digital Marketing</a> </h3>
                                        <p>There are many Ipsum variations of passages of Lorem Ipsum available.</p>
                                        <a href="#" class="btn btn-link btn_learnMore">Learn More <i
                                                class="flaticon-right-arrow-1"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-8 col-12 text-center m-auto">
                                <div class="service-item text-center bg-active wow animate fadeInUp"
                                    data-wow-duration="1600ms" data-wow-delay="0s">
                                    <div class="box_innerIcon">
                                        <i class="flaticon-website-1"></i>
                                    </div>

                                    <div class="box_innerContent text-center">
                                        <h3><a href="#">Graphic Design</a> </h3>
                                        <p>There are many Ipsum variations of passages of Lorem Ipsum available.</p>
                                        <a href="#" class="btn btn-link btn_learnMore">Learn More <i
                                                class="flaticon-right-arrow-1"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-8 col-12 text-center m-auto">
                                <div class="service-item text-center bg-active wow animate fadeInUp"
                                    data-wow-duration="1800ms" data-wow-delay="0s">
                                    <div class="box_innerIcon">
                                        <i class="flaticon-smartphone"></i>
                                    </div>

                                    <div class="box_innerContent text-center">
                                        <h3><a href="#">App Development</a> </h3>
                                        <p>There are many Ipsum variations of passages of Lorem Ipsum available.</p>
                                        <a href="#" class="btn btn-link btn_learnMore">Learn More <i
                                                class="flaticon-right-arrow-1"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-8 col-12 text-center m-auto">
                                <div class="service-item text-center bg-active wow animate fadeInUp"
                                    data-wow-duration="2000ms" data-wow-delay="0s">
                                    <div class="box_innerIcon">
                                        <i class="flaticon-computer"></i>
                                    </div>

                                    <div class="box_innerContent text-center">
                                        <h3><a href="#">Web Design</a> </h3>
                                        <p>There are many Ipsum variations of passages of Lorem Ipsum available.</p>
                                        <a href="#" class="btn btn-link btn_learnMore">Learn More <i
                                                class="flaticon-right-arrow-1"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    }
}

customElements.define('my-service', MyService);