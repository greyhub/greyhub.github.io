class MyBlog extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div id="blog" class="blog-area section-spacing">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-10 col-lg-8 m-auto">
                    <div class="section-inner-content text-center">
                        <div class="section-title">
                            <h2 class="wow animate fadeInUp" data-wow-duration="900ms" data-wow-delay="0s">Latest
                                <span>Posts</span>
                            </h2>
                            <span class=" wow animate fadeInUp" data-wow-duration="1200ms"
                                data-wow-delay="0s"></span>
                        </div>
                        <h6 class="sub-title wow animate fadeInUp" data-wow-duration="1400ms" data-wow-delay="0s">
                            TIPS, INSIGHTS, AND BEST PRACTICES ABOUT WEB DESIGN AND DEVELOPPMENT
                        </h6>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-sm-8 col-md-6 col-lg-4 m-auto">
                    <div class="blog-box wow animate fadeInUp" data-wow-duration="600ms" data-wow-delay="0s">
                        <div class="blog-img">
                            <a href="#">
                                <img class="img-fluid" src="./assets/images/blog_img1.png" alt="img">
                            </a>
                        </div>
                        <div class="blog-content bg-active">
                            <a href="#">
                                <h4>Why you should hire UI/UX Guy Before work </h4>
                            </a>
                            <p> There are many variations of passages available, but the majority have suffered
                                alteration in some form, by .</p>
                            <a href="#" class="btn readMore_btn">Read More</a>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-8 col-md-6 col-lg-4 m-auto">
                    <div class="blog-box wow animate fadeInUp" data-wow-duration="900ms" data-wow-delay="0s">
                        <div class="blog-img">
                            <a href="#">
                                <img class="img-fluid" src="./assets/images/blog_img2.png" alt="img">
                            </a>
                        </div>
                        <div class="blog-content bg-active">
                            <a href="#">
                                <h4>A good website starts with a good idea.</h4>
                            </a>
                            <p> There are many variations of passages available, but the majority have suffered
                                alteration in some form, by .</p>
                            <a href="#" class="btn readMore_btn">Read More</a>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-8 col-md-6 col-lg-4 m-auto">
                    <div class="blog-box wow animate fadeInUp" data-wow-duration="1200ms" data-wow-delay="0s">
                        <div class="blog-img">
                            <a href="#">
                                <img class="img-fluid" src="./assets/images/blog_img3.png" alt="img">
                            </a>
                        </div>
                        <div class="blog-content bg-active">
                            <a href="#">
                                <h4>Why you should hire UI/UX Guy Before work </h4>
                            </a>
                            <p> There are many variations of passages available, but the majority have suffered
                                alteration in some form, by .</p>
                            <a href="#" class="btn readMore_btn">Read More</a>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
        `;
    }
}

customElements.define('my-blog', MyBlog);