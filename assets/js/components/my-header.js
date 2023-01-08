class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header class="header-area">
        <div class="container">
            <div class="d-flex align-items-center justify-content-between">
                <div class="site-wrapper">
                    <a href="#" class="navbar-brand"><span>G</span>REY</a>
                </div>
                <nav class="main-nav me-auto">
                    <ul class="primary-menu">
                        <li class="has-child-menu">
                            <a href="javascript:void(0)">Home</a>
                            <i class="fl flaticon-plus">+</i>
                            <ul class="sub-menu bg-active">
                                <li><a href="index.html" class="nav-link">All-in</a></li>
                            </ul>
                        </li>
                        <li><a href="#about" class="nav-link">About </a></li>
                        <li><a href="#service" class="nav-link">Project</a></li>
                    </ul>

                    <div class="sidebar-support d-block d-md-none">
                        <div class="header-btn d-md-none d-block">
                            <a class="btn primary-btn" href="#contact">Contact Me</a>
                        </div>
                        <ul class="navbar-support screen-xl d-flex align-items-center">
                            <li> <a href="tel:+84962037205"><i class="flaticon-call"></i> <span id="phone-number"></span> </a>
                            </li>
                        </ul>
                        <ul class="navbar-social-icon d-flex justify-content-start">
                            <li>
                                <div class="cs-tooltip">LinkedIn</div>
                                <a href="https://www.linkedin.com/in/greyng/" class="social-button"><i class='bx bxl-linkedin'></i></a>
                            </li>
                            <li>
                                <div class="cs-tooltip">Facebook</div>
                                <a href="https://www.facebook.com/luongnv.grey/" class="social-button"><i class="bx bxl-facebook"></i></a>
                            </li>
                            <li>
                                <div class="cs-tooltip">Github</div>
                                <a href="https://github.com/greyhub" class="social-button"><i class="bx bxl-github"></i></a>
                            </li>
                            <li>
                                <div class="cs-tooltip">Youtube</div>
                                <a href="https://www.youtube.com/@luong5933" class="social-button"><i class='bx bxl-youtube'></i></a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div class="header-btn d-none d-lg-block">
                    <a class="btn primary-btn" href="#contact">Contact Me</a>
                </div>
                <div class="nav-right d-flex justify-content-end align-items-center">
                    <!-- Screen color Mood  -->
                    <div id="toggle" class="active">
                        <div class="switch"></div>
                    </div>
                    <!-- Mobile menu  -->
                    <div class="mobile-menu">
                        <a href="javascript:void(0)" class="hamburger d-block d-md-none">
                            <span class="h-top"></span>
                            <span class="h-middle"></span>
                            <span class="h-bottom"></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </header>
        `;
    }
}

customElements.define('my-header', MyHeader);