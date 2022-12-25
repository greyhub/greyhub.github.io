class MyExperiences extends HTMLElement {
connectedCallback() {
this.innerHTML = `
<div id="experiences" class="experience-area section-spacing">
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-10 col-lg-8 m-auto">
                <div class="section-inner-content text-center">
                    <div class="section-title">
                        <h2 class="wow animate fadeInUp" data-wow-duration="900ms" data-wow-delay="0s">Education
                            & <span>Experiences</span></h2>
                        <span class="wow animate fadeInUp" data-wow-duration="1200ms" data-wow-delay="0s"></span>
                    </div>
                    <h6 class="sub-title wow animate fadeInUp" data-wow-duration="1500ms" data-wow-delay="0s">...</h6>
                </div>
            </div>

            <div class="col-12">
                <ul class="nav__menu nav nav-pills mb-3 justify-content-center" id="pills-tab" role="tablist">
                    <li class="nav-item wow animate fadeInLeft" data-wow-duration="900ms" data-wow-delay="0s"
                        role="presentation">
                        <button class="btn nav-link menu-item active" id="pills-home-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                            aria-selected="true">Education</button>
                    </li>
                    <li class="nav-item wow animate fadeInLeft" data-wow-duration="1400ms" data-wow-delay="0s"
                        role="presentation">
                        <button class="nav-link menu-item btn" id="pills-skills-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-skills" type="button" role="tab" aria-controls="pills-skills"
                            aria-selected="false">Skills</button>
                    </li>
                    <li class="nav-item wow animate fadeInLeft" data-wow-duration="1800ms" data-wow-delay="0s"
                        role="presentation">
                        <button class="nav-link menu-item btn" id="pills-experience-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-experience" type="button" role="tab" aria-controls="pills-experience"
                            aria-selected="false">Experience</button>
                    </li>
                </ul>

                <div class="tab-content tab-item" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel"
                        aria-labelledby="pills-home-tab">
                        <div class="row">
                            <div class="col-12">
                                <div class="education-part ex bg-active">
                                    <div class="edu-list">
                                        <h4>
                                            <label class="bg-active wow animate fadeInUp" data-wow-duration="900ms"
                                                data-wow-delay="0s">Education</label>
                                        </h4>
                                        <ul class="d-flex justify-content-between">
                                            <li class="bg-active wow animate fadeInLeft" data-wow-duration="900ms"
                                                data-wow-delay="0s">
                                                <span class="year">2017 - 2022</span>
                                                <p>
                                                    <span> <strong>BS in Computer science</strong></span> -<br>
                                                    Hanoi University of Science and Technology.
                                                </p>
                                            </li>
                                            <li class="bg-active wow animate fadeInLeft" data-wow-duration="1400ms"
                                                data-wow-delay="0s">
                                                <span class="year">2020</span>
                                                <p>
                                                    <span> <strong>Artificial Intelligence Foundation</strong></span>
                                                    -<br>
                                                    VTC Academy.
                                                </p>
                                            </li>
                                            <li class="bg-active wow animate fadeInLeft" data-wow-duration="1800ms"
                                                data-wow-delay="0s">
                                                <span class="year">2019</span>
                                                <p>
                                                    <span><strong>Code Intensive</strong></span> -<br>
                                                    MindX Technology School.
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane fade tab-item" id="pills-skills" role="tabpanel"
                        aria-labelledby="pills-skills-tab">
                        <div class="skills-part ex bg-active">
                            <h4>
                                <label class="bg-active wow animate fadeInUp" data-wow-duration="900ms"
                                    data-wow-delay="0s">Skills</label>
                            </h4>
                            <div class="row">
                                <div class="col-12 col-lg-6">
                                    <div class="skills-bar bg-active">

                                        <div class="bar wow animate fadeInUp" data-wow-duration="900ms"
                                            data-wow-delay="0s">
                                            <div class="info">
                                                <span>Python</span>
                                            </div>
                                            <div class="progress-line design"><span></span></div>
                                        </div>
                                        <div class="bar wow animate fadeInUp" data-wow-duration="1200ms"
                                            data-wow-delay="0s">
                                            <div class="info">
                                                <span>UI/UX</span>
                                            </div>
                                            <div class="progress-line development"><span></span></div>
                                        </div>
                                        <div class="bar wow animate fadeInUp" data-wow-duration="1400ms"
                                            data-wow-delay="0s">
                                            <div class="info">
                                                <span>PHP</span>
                                            </div>
                                            <div class="progress-line uiux"><span></span></div>
                                        </div>
                                        <div class="bar wow animate fadeInUp" data-wow-duration="1600ms"
                                            data-wow-delay="0s">
                                            <div class="info">
                                                <span>PowerBI</span>
                                            </div>
                                            <div class="progress-line powerbi"><span></span></div>
                                        </div>
                                        <div class="bar wow animate fadeInUp" data-wow-duration="1800ms"
                                            data-wow-delay="0s">
                                            <div class="info">
                                                <span>SQL</span>
                                            </div>
                                            <div class="progress-line sql"><span></span></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12 col-lg-6">
                                    <div class="skills-bar  bg-active">
                                        <div class="bar wow animate fadeInUp" data-wow-duration="900ms"
                                            data-wow-delay="0s">
                                            <div class="info">
                                                <span>Web Development</span>
                                            </div>
                                            <div class="progress-line html"><span></span></div>
                                        </div>
                                        <div class="bar wow animate fadeInUp" data-wow-duration="1200ms"
                                            data-wow-delay="0s">
                                            <div class="info">
                                                <span>Analysis</span>
                                            </div>
                                            <div class="progress-line css"><span></span></div>
                                        </div>
                                        <div class="bar wow animate fadeInUp" data-wow-duration="1400ms"
                                            data-wow-delay="0s">
                                            <div class="info">
                                                <span>Teaching</span>
                                            </div>
                                            <div class="progress-line javascript"><span></span></div>
                                        </div>
                                        <div class="bar wow animate fadeInUp" data-wow-duration="1600ms"
                                            data-wow-delay="0s">
                                            <div class="info">
                                                <span>Optimization</span>
                                            </div>
                                            <div class="progress-line teaching"><span></span></div>
                                        </div>
                                        <div class="bar wow animate fadeInUp" data-wow-duration="1800ms"
                                            data-wow-delay="0s">
                                            <div class="info">
                                                <span>Leadership</span>
                                            </div>
                                            <div class="progress-line leadership"><span></span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane fade" id="pills-experience" role="tabpanel"
                        aria-labelledby="pills-experience-tab">
                        <div class="row">
                            <div class="experience-part ex bg-active">
                                <div class="edu-list">
                                    <h4>
                                        <label class="bg-active wow animate fadeInUp" data-wow-duration="900ms"
                                            data-wow-delay="0s">Experience</label>
                                    </h4>

                                    <div class="row">
                                        <div class="col-12 col-lg-6">
                                            <ul>
                                                <li class="bg-active wow animate fadeInUp" data-wow-duration="900ms"
                                                    data-wow-delay="0s">
                                                    <h5>Teacher</h5>
                                                    <h6>Part Time</h6>
                                                    <span class="year">Dec 2019 - Present</span>
                                                    <hr>
                                                    <h4>
                                                        <label class="bg-active"> MindX</label>
                                                    </h4>
                                                    <p>MindX School is the leading technology training center system in
                                                        Vietnam today. MindX is the first and only place in Vietnam that
                                                        simulates the high-tech Silicon Valley and has an inter-level
                                                        education route from elementary school to university.</p>
                                                </li>

                                                <li class="bg-active wow animate fadeInUp" data-wow-duration="1200ms"
                                                    data-wow-delay="0s">
                                                    <h5>Product Owner</h5>
                                                    <h6>Full Time | Remote</h6>
                                                    <span class="year">May 2022 - Oct 2022</span>
                                                    <hr>
                                                    <h4>
                                                        <label class="bg-active"> Trek Fund</label>
                                                    </h4>
                                                    <p>TREK (abbreviation of Tomorrow's Entrepreneur's Kapital) is a
                                                        social fund-raising ecosystem for all investors, founders and
                                                        experts to communicate, invest and track, powered by the web3
                                                        technology and metaverse platform.</p>
                                                </li>
                                            </ul>
                                        </div>

                                        <div class="col-12 col-lg-6">
                                            <ul>
                                                <li class="bg-active wow animate fadeInUp" data-wow-duration="900ms"
                                                    data-wow-delay="0s">
                                                    <h5>Research Collaborator</h5>
                                                    <h6>Part Time | Remote</h6>
                                                    <span class="year">Jun 2020 - May 2022</span>
                                                    <hr>
                                                    <h4>
                                                        <label class="bg-active"> VinBigData</label>
                                                    </h4>
                                                    <p>VinBigData Joint Stock Company was established based on Vingroup
                                                        Big Data Institute's scientific achievements in the fields of
                                                        Artificial Intelligence and Data Science (especially in image
                                                        and language processing).</p>
                                                </li>

                                                <li class="bg-active wow animate fadeInUp" data-wow-duration="1200ms"
                                                    data-wow-delay="0s">
                                                    <h5>Research Assistant Intern</h5>
                                                    <h6>Internship</h6>
                                                    <span class="year">Sep 2020 - Jan 2021</span>
                                                    <hr>
                                                    <h4>
                                                        <label class="bg-active"> MSO Lab</label>
                                                    </h4>
                                                    <p>MSO Lab is an in-depth research unit of Optimization. The main
                                                        research areas of MSO Lab include: Artificial Intelligence and
                                                        Machine Learning, Algorithms and Optimization, High Performance
                                                        Computing.</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
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

customElements.define('my-experiences', MyExperiences);