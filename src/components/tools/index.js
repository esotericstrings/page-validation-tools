import React from 'react';
import {PropTypes} from 'prop-types';

class Tools extends React.Component {
  static propTypes = {
     url: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render() {       
    return (
      <>
      <table>
        <tbody>
            <tr>
              <td>Accessibility</td>
                <td>
                <a 
                  href="https://chrome.google.com/webstore/detail/axe-web-accessibility-tes/lhdoppojpmngadmnindnejefpokejbdd" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  >
                    axe Web Accessibility
                </a>
              </td>
            </tr>
            <tr>
              <td>Accessibility</td>
              <td>
                <a 
                  href="https://wave.webaim.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  >
                  WAVE Accessibility
                </a>
              </td>
              <td>          
                {this.props.url ?
                <a className="wave-report-link"
                  href={"https://wave.webaim.org/report#/"+this.props.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Accessibility Report</a>
                :
                <></>
              }
              </td>
            </tr>
            <tr>
              <td>SEO</td>
              <td>
                <a 
                  href="https://cards-dev.twitter.com/validator" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  >
                  Twitter Card Validator
                </a>
              </td>
              <td>
                {this.props.url ?
                <a className="twitter-share-button"
                    href={"https://twitter.com/intent/tweet?text="+this.props.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    >
                    Tweet</a>
                    :
                    <></>
                }
              </td>
            </tr>
            <tr>
              <td>SEO</td>
              <td>
                {this.props.url ?
                <a className="facebook-share-button"
                  href={"https://developers.facebook.com/tools/debug/?q="+this.props.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                >Facebook Share Validator</a>
                :
                <a 
                href="https://developers.facebook.com/tools/debug/" 
                target="_blank" 
                rel="noopener noreferrer"
                >
                  Facebook Share Validator
                </a>
                }
              </td>
              <td>
                {this.props.url ?
                <a className="facebook-share-button"
                  href={"https://www.facebook.com/sharer/sharer.php?u="+this.props.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  >Share to FB</a>
                :
                <></>
                }
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}
export default Tools