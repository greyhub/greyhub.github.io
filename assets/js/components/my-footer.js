class MyFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="footer-area bg-active">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="social-area text-center">
                        <ul class="social-links d-flex align-items-center justify-content-center">
                            <li class="wow animate fadeInLeft" data-wow-duration="600ms" data-wow-delay="0s">
                                <div class="cs-tooltip">LinkedIn</div>
                                <a href="#" class="social-button"><i class='bx bxl-linkedin'></i></a>
                            </li>
                            <li class="wow animate fadeInLeft" data-wow-duration="1100ms" data-wow-delay="0s">
                                <div class="cs-tooltip">Facebook</div>
                                <a href="#" class="social-button"><i class="bx bxl-facebook"></i></a>
                            </li>
                            <li class="wow animate fadeInLeft" data-wow-duration="1600ms" data-wow-delay="0s">
                                <div class="cs-tooltip">Twitter</div>
                                <a href="#" class="social-button"><i class="bx bxl-twitter"></i></a>
                            </li>
                            <li class="wow animate fadeInLeft" data-wow-duration="2100ms" data-wow-delay="0s">
                                <div class="cs-tooltip">Pinterest</div>
                                <a href="#" class="social-button"><i class="bx bxl-pinterest-alt"></i></a>
                            </li>
                            <li class="wow animate fadeInLeft" data-wow-duration="2600ms" data-wow-delay="0s">
                                <div class="cs-tooltip">Dribbble</div>
                                <a href="#" class="social-button"><i class="bx bxl-dribbble"></i></a>
                            </li>
                            <li class="wow animate fadeInLeft" data-wow-duration="3000ms" data-wow-delay="0s">
                                <div class="cs-tooltip">Github</div>
                                <a href="#" class="social-button"><i class='bx bxl-github'></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-12 copy-right text-center">
                    <p>Copyright ©2022| Owner By <a href="#"> <strong>Grey</strong>.</a></p>
                </div>
            </div>

        </div>
    </footer>
        `;
    }
}

customElements.define('my-footer', MyFooter);