import React from "react";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialLinkedin,
  TiSocialInstagram,
  TiSocialGithub,
} from "react-icons/ti"

import {FaPlus} from "react-icons/fa6";

const Team = () => {
  return(
     <section className="team pos-rel" id="team">
        <div className="container">
          <div className="sec-title text-center mb-70">
             <h5 className="sec-title__subtitle">Our Team</h5>
             <h2 className="sec-title__title">Meet Our Skill Team</h2>
          </div>

          <div className="team__wrap ul_li">
            <div className="team__item">
              <div className="avatar">
                <img src="assets/img/team/img_01.png"/>
              </div>
              <div className="team__info text-center mb-30">
                  <h3>Saket Bhatnagar</h3>
                  <span>Developer</span>
              </div>
              <div className="team__social ul_li_center">
                <ul className="team__social-link link-left ul_li">
                  <li><a href="#"><TiSocialFacebook/></a></li>
                  <li><a href="#"><TiSocialGithub/></a></li>
                  <li><a href="#"><TiSocialInstagram/></a></li>
                  <li><a href="#"><TiSocialLinkedin/></a></li>
                  <li><a href="#"><TiSocialTwitter/></a></li>
                </ul>
              </div>
            </div>
            <div className="team__item">
              <div className="avatar">
                <img src="assets/img/team/img_02.png"/>
              </div>
              <div className="team__info text-center mb-30">
                  <h3>Saket Bhatnagar</h3>
                  <span>Developer</span>
              </div>
              <div className="team__social ul_li_center">
                <ul className="team__social-link link-left ul_li">
                  <li><a href="#"><TiSocialFacebook/></a></li>
                  <li><a href="#"><TiSocialGithub/></a></li>
                  <li><a href="#"><TiSocialInstagram/></a></li>
                  <li><a href="#"><TiSocialLinkedin/></a></li>
                  <li><a href="#"><TiSocialTwitter/></a></li>
                </ul>
              </div>
            </div>

            <div className="team__item">
              <div className="avatar">
                <img src="assets/img/team/img_03.png"/>
              </div>
              <div className="team__info text-center mb-30">
                  <h3>Saket Bhatnagar</h3>
                  <span>Developer</span>
              </div>
              <div className="team__social ul_li_center">
                <ul className="team__social-link link-left ul_li">
                  <li><a href="#"><TiSocialFacebook/></a></li>
                  <li><a href="#"><TiSocialGithub/></a></li>
                  <li><a href="#"><TiSocialInstagram/></a></li>
                  <li><a href="#"><TiSocialLinkedin/></a></li>
                  <li><a href="#"><TiSocialTwitter/></a></li>
                </ul>
              </div>
            </div>

            <div className="team__item">
              <div className="avatar">
                <img src="assets/img/team/img_04.png"/>
              </div>
              <div className="team__info text-center mb-30">
                  <h3>Saket Bhatnagar</h3>
                  <span>Developer</span>
              </div>
              <div className="team__social ul_li_center">
                <ul className="team__social-link link-left ul_li">
                  <li><a href="#"><TiSocialFacebook/></a></li>
                  <li><a href="#"><TiSocialGithub/></a></li>
                  <li><a href="#"><TiSocialInstagram/></a></li>
                  <li><a href="#"><TiSocialLinkedin/></a></li>
                  <li><a href="#"><TiSocialTwitter/></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
     </section>
  )
};

export default Team;
