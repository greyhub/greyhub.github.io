class MySlider extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="slider-area">

        <div class="container">
            <div class="amimation">
                <div class="glowing part-1">
                    <span style="--i:1;"></span>
                    <span style="--i:2;"></span>
                    <span style="--i:3;"></span>
                </div>
                <div class="glowing part-2">
                    <span style="--i:4;"></span>
                    <span style="--i:5;"></span>
                    <span style="--i:6;"></span>
                </div>
                <div class="glowing part-3">
                    <span style="--i:1;"></span>
                    <span style="--i:2;"></span>
                    <span style="--i:3;"></span>
                </div>
                <div class="glowing part-4">
                    <span style="--i:1;"></span>
                    <span style="--i:2;"></span>
                    <span style="--i:3;"></span>
                </div>
                <div class="glowing part-5">
                    <span style="--i:1;"></span>
                    <span style="--i:2;"></span>
                    <span style="--i:3;"></span>
                </div>

            </div>
            <div class="row align-items-center">
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <div class="slider-content">
                        <div class="animated-title">
                            <h1> Hello, I'm Luong</h1>
                            <div class="word"> </div>
                        </div>
                        <p>I am a person with a passion for Creativity and Innovation.<br>
                            I have knowledge about Computer Science, Data, AI.<br>
                            In addition, I also have basic knowledge about game, bioinformatics.</p>
                        <div class="slider-button">
                            <a href="https://drive.google.com/file/d/1vobpnTDLNa6sBEm5SKkHt5iBgseTXZoe/view?usp=sharing" download class="btn banner-btn">Download CV <i
                                    class="bi bi-download"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <div class="slider-img-box d-flex justify-content-end">
                        <img src="./assets/images/banner-img.png" class="img-fluid" alt="banner-img">
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
    }
}

customElements.define('my-slider', MySlider);
