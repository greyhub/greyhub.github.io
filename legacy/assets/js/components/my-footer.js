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
                                <a href="https://www.linkedin.com/in/greyng/" class="social-button"><i class='bx bxl-linkedin'></i></a>
                            </li>
                            <li class="wow animate fadeInLeft" data-wow-duration="1100ms" data-wow-delay="0s">
                                <div class="cs-tooltip">Facebook</div>
                                <a href="https://www.facebook.com/luongnv.grey/" class="social-button"><i class="bx bxl-facebook"></i></a>
                            </li>
                            <li class="wow animate fadeInLeft" data-wow-duration="1600ms" data-wow-delay="0s">
                                <div class="cs-tooltip">Github</div>
                                <a href="https://github.com/greyhub" class="social-button"><i class="bx bxl-github"></i></a>
                            </li>
                            <li class="wow animate fadeInLeft" data-wow-duration="2100ms" data-wow-delay="0s">
                                <div class="cs-tooltip">Youtube</div>
                                <a href="https://www.youtube.com/@luong5933" class="social-button"><i class="bx bxl-youtube"></i></a>
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