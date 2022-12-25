class MyPortfolio extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div id="Portfolio" class="portfolio-area section-spacing">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-10 col-lg-8 m-auto">
                    <div class="section-inner-content text-center">
                        <div class="section-title">
                            <h2 class="wow animate fadeInUp" data-wow-duration="900ms" data-wow-delay="0s">My
                                <span>Portfolio</span>
                            </h2>
                            <span class=" wow animate fadeInUp" data-wow-duration="1200ms"
                                data-wow-delay="0s"></span>
                        </div>
                        <h6 class="sub-title wow animate fadeInUp" data-wow-duration="1400ms" data-wow-delay="0s">
                            My Some Recent Work With Full Details
                        </h6>
                    </div>
                </div>
            </div>
        
            <div class="service-items bg-active">
                <div class="portfolio_wrapper">
                    <div class="button-group filters-button-group text-center">
                        <button class="button btn primary-btn active is-checked wow animate fadeInUp"
                            data-wow-duration="600ms" data-wow-delay="0s" data-filter="*">All</button>
                        <button class="button btn primary-btn wow animate fadeInUp" data-wow-duration="800ms"
                            data-wow-delay="0s" data-filter=".branding">Branding</button>
                        <button class="button btn primary-btn wow animate fadeInUp" data-wow-duration="1000ms"
                            data-wow-delay="0s" data-filter=".design">Web Design</button>
                        <button class="button btn primary-btn wow animate fadeInUp" data-wow-duration="1200ms"
                            data-wow-delay="0s" data-filter=".seo">SEO</button>
                        <button class="button btn primary-btn wow animate fadeInUp" data-wow-duration="1400ms"
                            data-wow-delay="0s" data-filter=".development">Web Development</button>
                    </div>
                    <div class="row grid portfolio-item-box">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4 element-item mt-30 branding"
                            data-category="branding">
                            <img class="img-fluid" src="./assets/images/portfolio/work-1.png" alt="img">
                            <div class="caption fade_caption">
                                <h5>Branding</h5>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, rerum! </p>
                                <a href="#" class="btn btn-primary">View Full Project</a>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4 element-item mt-30 branding"
                            data-category="branding">
                            <img class="img-fluid" src="./assets/images/portfolio/work-2.png" alt="img">
                            <div class="caption fade_caption">
                                <h5>Branding</h5>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, rerum! </p>
                                <a href="#" class="btn btn-primary">View Full Project</a>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4 element-item mt-30 seo" data-category="seo">
                            <img class="img-fluid" src="./assets/images/portfolio/work-3.png" alt="img">
                            <div class="caption fade_caption">
                                <h5>SEO</h5>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, rerum! </p>
                                <a href="#" class="btn btn-primary">View Full Project</a>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4 element-item mt-30 design"
                            data-category="design">
                            <img class="img-fluid" src="./assets/images/portfolio/work-4.png" alt="img">
                            <div class="caption fade_caption">
                                <h5>Web Design</h5>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, rerum! </p>
                                <a href="#" class="btn btn-primary">View Full Project</a>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4 element-item mt-30 design"
                            data-category="design">
                            <img class="img-fluid" src="./assets/images/portfolio/work-5.png" alt="img">
                            <div class="caption fade_caption">
                                <h5>Web Design</h5>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, rerum! </p>
                                <a href="#" class="btn btn-primary">View Full Project</a>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4 element-item mt-30 development"
                            data-category="development">
                            <img class="img-fluid" src="./assets/images/portfolio/work-6.png" alt="img">
                            <div class="caption fade_caption">
                                <h5>Web Development</h5>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, rerum! </p>
                                <a href="#" class="btn btn-primary">View Full Project</a>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4 element-item mt-30 design"
                            data-category="design">
                            <img class="img-fluid" src="./assets/images/portfolio/work-7.png" alt="img">
                            <div class="caption fade_caption">
                                <h5>Web Design</h5>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, rerum! </p>
                                <a href="#" class="btn btn-primary">View Full Project</a>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4 element-item mt-30 seo" data-category="seo">
                            <img class="img-fluid" src="./assets/images/portfolio/work-8.png" alt="img">
                            <div class="caption fade_caption">
                                <h5>SEO</h5>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, rerum! </p>
                                <a href="#" class="btn btn-primary">View Full Project</a>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4 element-item mt-30 development"
                            data-category="development">
                            <img class="img-fluid" src="./assets/images/portfolio/work-9.png" alt="img">
                            <div class="caption fade_caption">
                                <h5>Web Development</h5>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, rerum! </p>
                                <a href="#" class="btn btn-primary">View Full Project</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        `;
    }
}

customElements.define('my-portfolio', MyPortfolio);