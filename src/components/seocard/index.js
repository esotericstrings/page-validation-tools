import React from 'react';
import {PropTypes} from 'prop-types';
import './index.scss';
import cheerio from "cheerio";
import 'react-app-polyfill/stable';

class SEOCard extends React.Component {
  static propTypes = {
     url: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {data: ''};
    this.getSiteData = this.getSiteData.bind(this)
    this.getBaseUrl = this.getBaseUrl.bind(this)
    this.getFullBaseUrl = this.getFullBaseUrl.bind(this)
    this.loadMetadata = this.loadMetadata.bind(this)
  }

  getBaseUrl(url) {
    return url.replace(/(http(s)?:\/\/)|(\/.*){1}/g, '').replace("www.", '')
  }

  getFullBaseUrl(url) {
    return url.replace(/(http(s)?:\/\/)|(\/.*){1}/g, '')
  }

  getSiteData(url) {
    const axios = require('axios');
    axios.get("https://secret-ocean-49799.herokuapp.com/"+this.props.url)
    .then((response) => {
      this.setState({data: response.data});
      this.loadMetadata();
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  loadMetadata() {
    const $ = cheerio.load(this.state.data);
    // cheerio
    let ogUrl = $('meta[property="og:url"]').attr('content');
    let title = $('head title').text();
    // let keywords  = $('meta[name="keywords"]').attr('content');
    // let siteName = $('meta[property="og:site_name"]').attr('content');
    let ogTitle = $('meta[property="og:title"]').attr('content');
    let desc  = $('meta[name="description"]').attr('content');
    let ogImage = $('meta[property="og:image"]').attr('content');
    let robots = $('meta[name="robots"]').attr('content');
    let twitterCard = $('meta[name="twitter:card"]').attr('content');
    let twitterSite = $('meta[name="twitter:site"]').attr('content');
    let twitterTitle = $('meta[name="twitter:title"]').attr('content');
    // let twitterCreator = $('meta[name="twitter:creator"]').attr('content');
    let twitterPlayer = $('meta[name="twitter:player"]').attr('content');
    let twitterPlayerWidth = $('meta[name="twitter:player:width"]').attr('content');
    let twitterPlayerHeight = $('meta[name="twitter:player:height"]').attr('content');
    let twitterDescription = $('meta[name="twitter:description"]').attr('content');
    let twitterImage = $('meta[name="twitter:image"]').attr('content');
    // let locale = $('meta[property="og:locale"]').attr('content');
    // let images = $('img');
    // console.log(images);
    let twitter = {}
    if (twitterCard === 'player') {
      twitter = {twitterPlayer, twitterPlayerWidth, twitterPlayerHeight, twitterSite};
    }
    else {
      twitter = {twitterSite}
    }
    this.setState({
      ogUrl: ogUrl,
      ogTitle: ogTitle,
      title: title,
      description: desc,
      ogImage: ogImage,
      fullBaseUrl: this.getFullBaseUrl(this.props.url),
      baseUrl: this.getBaseUrl(this.props.url),
      robots: robots,
      twitterCard: twitterCard,
      twitterTitle: twitterTitle,
      twitterDescription: twitterDescription,
      twitterImage: twitterImage,
      twitter: twitter
      // ogLocale: locale
      // site: siteName,
      // keywords: keywords,    
    })
    let missingTags = [];
    let missingTwitTags = [];
    for (var item in this.state) {
      if (!this.state[item]) {
        item.toString().includes("twitter") ? missingTwitTags.push(item) : missingTags.push(item)
      } 
    }
    this.setState({
      missingTags : missingTags.join(", "),
      missingTwitTags : missingTwitTags.join(", ")
    })
    if (this.state.ogImage && this.state.ogImage.toString().startsWith("/")) {
      this.setState ({
        fullImage: "https://"+this.state.fullBaseUrl+this.state.ogImage
      })
    }
  }

  componentDidMount() {
    this.getSiteData(this.props.url)
  }

  render() {       
    return (
      <div className="page-report">
      {
        this.state.ogTitle|| this.state.title ?
        <h2>Page: {this.state.ogTitle ? this.state.ogTitle : this.state.title}</h2>
        :
        <></>
      }
      {
        this.state.robots ?
        <div className="robots-text">
          <p>
          🤖 Robots: {this.state.robots}
          </p>
          <p className="learn-more">
            <span>Learn more about valid robots tags from <a href="https://developers.google.com/search/reference/robots_meta_tag" target="_blank" rel="noopener noreferrer">Google</a> or <a href="https://yoast.com/robots-meta-tags/" target="_blank" rel="noopener noreferrer">Yoast</a></span>
          </p>
        </div>
        :
        <></>
      }
      {
        this.state.missingTags ?
        <div className="tag-errors">
          <p> ❌ Missing tags: {this.state.missingTags}</p>
        </div>
        :
        <></>
      }
      {
        this.state.missingTwitTags ?
        <div className="tag-errors">
          <p> ❌ Missing Twitter card tags: {this.state.missingTwitTags}</p>
        </div>
        :
        <></>
      }
      <ul className="social-cards">
        <li className="facebook-card">
          <h3>Facebook</h3>
          <div className="_2syv">
              <div className="unclickable">
                <div id="u_0_3" className="_6m2 _1zpr clearfix _dcs _4_w4 _41u- _59ap _2bf7 _64lx _3eqz _20pq _3eqw _2rk1 _3n1j _5qqr" data-ft="{&quot;tn&quot;:&quot;H&quot;}">
                  <div className="clearfix _2r3x">
                    <div className="lfloat _ohe"> 
                      <span className="_3m6-">
                      {this.state.fullImage || this.state.ogImage ?
                        <div className="_6ks">
                          <a 
                          href={"https://l.facebook.com/l.php?u="+this.state.url} 
                          aria-describedby="u_0_5" 
                          aria-label={this.state.ogTitle} 
                          tabIndex="-1" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          data-lynx-mode="asynclazy">
                            <div className="accessible_elem inlineBlock" id="u_0_5">
                              {this.state.ogTitle}
                            </div>
                            <div className="_6l- __c_">
                              <div className="uiScaledImageContainer _6m5 fbStoryAttachmentImage" 
                              style={{width:'524px', height:'273.64444444444px'}}
                              >
                                <img className="scaledImageFitWidth img" 
                                src={this.state.fullImage ? this.state.fullImage : this.state.ogImage}
                                data-src={this.state.fullImage ? this.state.fullImage : this.state.ogImage}
                                style={{top:'0px'}}
                                alt="" width="524" height="274" caption=""
                                />
                              </div>
                            </div>
                          </a>
                          </div>
                          : <></>
                          }
                          
                        <div className="_3ekx _29_4">
                          <div className="_6m3 _--6">
                            <div className="_59tj _2iau"><div>
                              <div className="_6lz _6mb _1t62 ellipsis">{this.state.baseUrl}</div>
                            </div></div>
                                    
                            <div className="_3n1k">
                              <div className="mbs _6m6 _2cnj _5s6c">
                                <a href={"https://l.facebook.com/l.php?u="+this.props.url}
                                rel="noopener noreferrer" target="_blank" data-lynx-mode="asynclazy">{this.state.ogTitle ? this.state.ogTitle : this.state.title}</a>
                              </div>
                              <div className="_6m7 _3bt9">{this.state.description}</div>
                            </div>
                          </div>

                            <a href={"https://l.facebook.com/l.php?u="+this.props.url} 
                            aria-label={this.state.ogTitle} aria-describedby="u_0_4" rel="noopener noreferrer" 
                            tabIndex="-1" target="_blank" className="_52c6" data-lynx-mode="asynclazy">
                              <div className="accessible_elem" id="u_0_4">{this.state.ogTitle ? this.state.ogTitle : this.state.title}</div>
                            </a>

                          </div>
                        </span> 
                      </div>
                    </div>
                </div>
            <div className="unclickableMask"></div>
          </div>
        </div>
      </li>

      <li className="twitter-card">
        <h3>Twitter</h3>

          {this.state.twitterCard === 'summary_large_image' &&
            <div className="TwitterCardsGrid TwitterCard TwitterCard--animation">
              <div className="TwitterCardsGrid-col--12 TwitterCardsGrid-col--spacerBottom CardContent">
                <a className="js-openLink u-block TwitterCardsGrid-col--12 TwitterCard-container TwitterCard-container--clickable SummaryCard--large" 
                href={this.props.url} 
                target="_blank"
                rel="noreferrer noopener" data-card-breakpoints="w400 w350 w300 w250 w200 w150 w100 w50 ">
                  <div className="SummaryCard-image TwitterCardsGrid-col--12">
                    <div className="tcu-imageContainer tcu-imageAspect--2to1">
                      <div className="tcu-imageWrapper" 
                      style={{opacity: 1, backgroundImage: `url( `+(this.state.twitterImage ? this.state.twitterImage : this.state.ogImage)+`)`, backgroundSize: "cover"}} 
                      data-style={{backgroundImage: `url( `+ (this.state.twitterImage ? this.state.twitterImage : this.state.ogImage)+`)`, backgroundSize: "cover"}}> 
                        <img className="u-block" data-src={this.state.twitterImage ? this.state.twitterImage : this.state.ogImage} alt="" src={this.state.twitterImage ? this.state.twitterImage : this.state.ogImage} /> 
                      </div>
                    </div>
                  </div>

                  <div className="SummaryCard-contentContainer TwitterCardsGrid-col--12">
                    <div className="SummaryCard-content TwitterCardsGrid-ltr">
                      <h2 className="TwitterCard-title js-cardClick tcu-textEllipse--multiline" dir="ltr">{this.state.ogTitle ? this.state.ogTitle : this.state.title}</h2>
                      <p className="tcu-resetMargin u-block TwitterCardsGrid-col--spacerTop tcu-textEllipse--multiline" dir="ltr">{this.state.twitterDescription ? this.state.twitterDescription : this.state.description}</p> 
                      <span className="u-block TwitterCardsGrid-col--spacerTop SummaryCard-destination" dir="ltr">{this.state.baseUrl}</span> 
                    </div>
                  </div>
                </a>
              </div>
            </div>
          }

          {this.state.twitterCard === 'summary' &&
          <div class="TwitterCardsGrid TwitterCard TwitterCard--animation">
            <div class="TwitterCardsGrid-col--12 TwitterCardsGrid-col--spacerBottom CardContent">
              <a class="js-openLink u-block TwitterCardsGrid-col--12 TwitterCard-container TwitterCard-container--clickable SummaryCard--small" 
              href={this.props.url} rel="noopener" data-card-breakpoints="w400 w350 w300 w250 w200 w150 w100 w50 ">
            <div class="SummaryCard-image TwitterCardsGrid-float--prev">
              <div class="tcu-imageContainer tcu-imageAspect--1to1">
            <div class="tcu-imageWrapper" 
              style={{opacity: 1, backgroundImage: `url( `+ (this.state.twitterImage ? this.state.twitterImage : this.state.ogImage)+`)`, backgroundSize: "cover"}} 
              data-style={{backgroundImage: `url( `+ (this.state.twitterImage ? this.state.twitterImage : this.state.ogImage)+`)`, backgroundSize: "cover"}}>
              <img class="u-block" 
                data-src={this.state.twitterImage ? this.state.twitterImage : this.state.ogImage} alt="" 
                src={this.state.twitterImage ? this.state.twitterImage : this.state.ogImage}/>
            </div>
            </div>
            </div>
            <div class="SummaryCard-contentContainer TwitterCardsGrid-float--prev">
              <div class="SummaryCard-content TwitterCardsGrid-ltr">
            <h2 class="TwitterCard-title js-cardClick tcu-textEllipse--multiline" dir="ltr">{this.state.ogTitle ? this.state.ogTitle : this.state.title}</h2>
            <p class="tcu-resetMargin u-block TwitterCardsGrid-col--spacerTop tcu-textEllipse--multiline" dir="ltr">{this.state.twitterDescription ? this.state.twitterDescription : this.state.description}</p>
            <span class="u-block TwitterCardsGrid-col--spacerTop SummaryCard-destination" dir="ltr">{this.state.baseUrl}</span>
            </div>
            </div>
            </a>
            </div>
            </div>
          }

          {this.state.twitterCard === 'player' &&
            <div class="TwitterCardsGrid TwitterCard TwitterCard--animation">
              <div class="TwitterCardsGrid-col--12 TwitterCardsGrid-col--spacerBottom CardContent">
                <div class="TwitterCardsGrid-col--12 TwitterCard-container TwitterCard-container--clickable SummaryCard--small PlayerCard--preview" data-card-breakpoints="w400 w350 w300 w250 w200 w150 w100 w50 ">
                  <div class="SummaryCard-image TwitterCardsGrid-float--prev">
                    <div class="tcu-imageContainer tcu-imageAspect--1to1">
                      <div class="tcu-imageWrapper" 
                      style={{opacity: 1, backgroundImage: `url( `+ (this.state.twitterImage ? this.state.twitterImage : this.state.ogImage)+`)`, backgroundSize: "cover"}} 
                      data-style={{backgroundImage: `url( `+ (this.state.twitterImage ? this.state.twitterImage : this.state.ogImage)+`)`, backgroundSize: "cover"}}>
                        <img class="u-block" 
                        data-src={this.state.twitterImage ? this.state.twitterImage : this.state.ogImage} 
                        alt="" 
                        src={this.state.twitterImage ? this.state.twitterImage : this.state.ogImage}/>
                      </div>
                    </div>
                    <div class="PlayerCard-playButton"></div>
                  </div>

                  <div class="SummaryCard-contentContainer TwitterCardsGrid-float--prev">
                    <div class="SummaryCard-content TwitterCardsGrid-ltr">
                      <h2 class="TwitterCard-title js-cardClick tcu-textEllipse--multiline" dir="ltr">{this.state.ogTitle ? this.state.ogTitle : this.state.title}</h2>
                      <p class="tcu-resetMargin u-block TwitterCardsGrid-col--spacerTop tcu-textEllipse--multiline" dir="ltr">
                        {this.state.twitterDescription ? this.state.twitterDescription : this.state.description}
                      </p>
                      <span class="u-block TwitterCardsGrid-col--spacerTop SummaryCard-destination" dir="ltr">{this.state.baseUrl}</span>
                    </div>
                  </div>
                </div>

                <div class="TwitterCardsGrid-col--12 TwitterCard-container TwitterCard-container--clickable SummaryCard--large PlayerCard--video PlayerCard--clickToLoad">
                  <div class="TwitterCardsGrid-col--12 PlayerCard-videoContainer">
                    <div class="TwitterCardsGrid-col--12 TwitterCardsGrid-col--spacerBottom">
                      <div id="ExternalIframeContainer" class="FlexEmbed" data-iframe-aspect-ratio-numerator={this.state.twitter.twitterPlayerHeight} data-iframe-aspect-ratio-denominator={this.state.twitter.twitterPlayerWidth}>
                        <iframe title="twitter-player" data-src={this.state.twitter.twitterPlayer+"?autoplay=1&amp;auto_play=true"} frameborder="0" scrolling="no" allowtransparency="true" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
                      </div>
                    </div>
                  </div>

                  <a class="js-openLink u-block SummaryCard-contentContainer TwitterCard-container--clickable TwitterCardsGrid-col--12" href={this.props.url} rel="noopener">
                    <div class="SummaryCard-content TwitterCardsGrid-ltr">
                      <h2 class="TwitterCard-title js-cardClick tcu-textEllipse--multiline" dir="ltr">{this.state.ogTitle ? this.state.ogTitle : this.state.title}</h2>
                      <p class="tcu-resetMargin u-block TwitterCardsGrid-col--spacerTop tcu-textEllipse--multiline" dir="ltr">{this.state.twitterDescription ? this.state.twitterDescription : this.state.description}</p>
                      <span class="u-block TwitterCardsGrid-col--spacerTop SummaryCard-destination" dir="ltr">{this.state.baseUrl}</span>
                    </div>
                  </a>
                </div>

              </div>
            </div>
          }

          { !this.state.twitterCard && <p>❌ No card data found</p> }
        </li>

      </ul>
    </div>
    );
  }
}
export default SEOCard