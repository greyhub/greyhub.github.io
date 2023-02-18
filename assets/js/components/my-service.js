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
                                        Digital <span>projects</span> </h2>
                                    <span class=" wow animate fadeInUp" data-wow-duration="1200ms"
                                        data-wow-delay="0s"></span>
                                </div>
                                <h6 class="sub-title wow animate fadeInUp" data-wow-duration="1500ms" data-wow-delay="0s">
                                    ...
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
                                        <h3><a href="https://youtu.be/tqruNwggo-4">Virtual Office</a> </h3>
                                        <p>Metaverse web2d application in the workplace interactive environment.</p>

                                        <a href="https://youtu.be/tqruNwggo-4" class="btn btn-link btn_learnMore">Learn More <i
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
                                        <h3><a href="#">Launch</a> </h3>
                                        <p>Dashboard about milestones of many products.</p>
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
                                        <h3><a href="https://youtu.be/d80FFCd5vts">HORA</a> </h3>
                                        <p>Mobile App and Data Science for hotel service.</p>
                                        <a href="https://youtu.be/d80FFCd5vts" class="btn btn-link btn_learnMore">Learn More <i
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
                                        <h3><a href="https://youtu.be/jTytTRI4Uss">Calendar Management</a> </h3>
                                        <p>Time Management System integrated Google Calendar.</p>
                                        <a href="https://youtu.be/jTytTRI4Uss" class="btn btn-link btn_learnMore">Learn More <i
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
                                        <h3><a href="https://github.com/greyhub/job_center">Job Center</a> </h3>
                                        <p>Crawl, matching and explore data about jobs in Viet Nam.</p>
                                        <a href="https://drive.google.com/file/d/1ZRzUxh9BZwOSm_VnFfh-369YSLNUiNlU/view?usp=share_link" class="btn btn-link btn_learnMore">Learn More <i
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
                                        <h3><a href="https://trek.fund/">TREK Landing page</a> </h3>
                                        <p>The next gen of IPO powered by web3 technology and metaverse platform.</p>
                                        <a href="https://trek.fund/" class="btn btn-link btn_learnMore">Learn More <i
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
