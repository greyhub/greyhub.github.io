class MyContact extends HTMLElement {
connectedCallback() {
this.innerHTML = `
<div id="contact" class="contact-area section-spacing">
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-10 col-lg-8 m-auto">
                <div class="section-inner-content text-center">
                    <div class="section-title">
                        <h2 class="wow animate fadeInUp" data-wow-duration="900ms" data-wow-delay="0s">Get in
                            <span>touch</span>
                        </h2>
                        <span class=" wow animate fadeInUp" data-wow-duration="1200ms" data-wow-delay="0s"></span>
                    </div>
                    <h6 class="sub-title wow animate fadeInUp" data-wow-duration="1400ms" data-wow-delay="0s">
                        Feel free to get in touch with me. I am always open to discussing new projects, creative
                        ideas or opportunities to be part of your visions.
                    </h6>
                </div>
            </div>
        </div>

        <div class="row align-items-center">
            <div class="col-12 col-md-4 col-lg-4">
                <div class="contact-lines">
                    <div class="single-contact-box text-left wow animate fadeInUp" data-wow-duration="600ms"
                        data-wow-delay="0s">
                        <h6 class="phone pc">
                            <i class="flaticon-phone-call-1"></i>
                            <span>Phone :</span>
                        </h6>
                        <p>
                            <a href="tel:+84962037205"> <span id='phone-number'></span> </a> <br>
                        </p>
                    </div>

                    <div class="single-contact-box text-left wow animate fadeInUp" data-wow-duration="900ms"
                        data-wow-delay="0s">
                        <h6 class="email pc">
                            <i class="flaticon-black-back-closed-envelope-shape"></i>
                            <span>Email :</span>
                        </h6>
                        <p>
                            <a href="mailto:luongnv.grey@gmail.com">luongnv.grey@gmail.com</a> <br>
                            <a href="mailto:nvluonglol@gmail.com">nvluonglol@gmail.com</a>
                        </p>
                    </div>

                    <div class="single-contact-box text-left wow animate fadeInUp" data-wow-duration="1200ms"
                        data-wow-delay="0s">
                        <h6 class="address pc">
                            <i class="flaticon-maps-and-flags"></i>
                            <span>Address :</span>
                        </h6>
                        <p>Nguyen An Ninh, Ha Noi <br> Dong Tan, Thanh Hoa </p>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-8 col-lg-8">
                <!-- RD Mailform-->
                <form class="contact-mailform text-left" data-form-output="form-output-global" data-form-type="contact"
                    method="post" action="./assets/bat/rd-mailform.php">
                    <p>If you have any suggestion, project or even you want to say Hello.. please fill out the
                        form below and I will reply you shortly.</p>

                    <div class="form-wrap input_area wow animate fadeInUp" data-wow-duration="600ms"
                        data-wow-delay="0s">
                        <input class="form-input form-control" id="contact-name" type="text" name="name"
                            placeholder="Your name" required>
                    </div>

                    <div class="form-wrap input_area wow animate fadeInUp" data-wow-duration="800ms"
                        data-wow-delay="0s">
                        <input class="form-input form-control" id="contact-email" type="email" name="email"
                            placeholder="Your Email" required>
                    </div>

                    <div class="form-wrap input_area wow animate fadeInUp" data-wow-duration="1000ms"
                        data-wow-delay="0s">
                        <input class="form-input form-control" id="contact-phone" type="text" name="phone"
                            placeholder="Your Phone" autocomplete="on" required>
                    </div>

                    <div class="form-wrap input_area wow animate fadeInUp" data-wow-duration="1200ms"
                        data-wow-delay="0s">
                        <textarea class="form-input" id="contact-message" name="message" placeholder="Your Message"
                            rows="4" required></textarea>
                    </div>

                    <div class="form-button animated-btn group-sm text-left">
                        <div class="pikachu">
                            <img src="./assets/images/pikachu3.gif" class="img-fluid" alt="animate img">
                        </div>

                        <button type="submit" class="btn btn-submit">Send Message</button>
                    </div>
                </form>
            </div>

            <div class="col-12">
                <!-- GOOGLE MAP  -->
                <div class="google_map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.019957631573!2d105.8420902143678!3d20.991837094414986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac6edcf4e1db%3A0x36aeb2b402553be7!2zMTQ0IFAuIE5ndXnhu4VuIEFuIE5pbmgsIFTGsMahbmcgTWFpLCBIb8OgbmcgTWFpLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1671954903937!5m2!1svi!2s"
                        height="350" style="border:0; width: 100%;" allowfullscreen="" loading="lazy"> </iframe>
                </div>
            </div>
        </div>
    </div>
</div>
`;
}
}

customElements.define('my-contact', MyContact);