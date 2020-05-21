import React,{ useEffect } from "react";
import {Row,Col,Container} from "react-bootstrap"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { ACTIONS } from "redux/actions/types"
import Location from "components/shared/Location"
const Order  = (props) => {
  useEffect(() => {
    window.scrollTo(0,0)
    document.title = "JohanDeMeij.com | Music"
   props.actions.mainAction(ACTIONS.LOAD_ORDER_LOCATIONS,{})
   // eslint-disable-next-line react-hooks/exhaustive-deps
},[])
    return (<>
    <section className="order">
    
    <Container>
         <Row>
         <Col >
         <h5 style={{marginTop:"50px",fontSize: "1.5rem", textTransform: "uppercase", color: "rgb(0, 0, 0)", textAlign:"center"}}>ORDER AMSTEL MUSIC PRODUCTS</h5>
             <p>For your convenience, here is the complete list of all exclusive distributors for the Amstel Music Catalogue per territory.</p>
            
        </Col>
        </Row>
        <Row>
          {Object.values(props.catalogue).map(location => {
            return  <Col lg={{span:6}}><Location {...location} /></Col>
          })}
        </Row>
    </Container>
    </section> 
    {/* <section class="order"><div class="container"><div class="row"><div class="col"><h5 style={{marginTop:"50px",fontSize: "1.5rem", textTransform: "uppercase", color: "rgb(0, 0, 0)", textAlign:"center"}}>ORDER AMSTEL MUSIC PRODUCTS</h5><p>For your convenience, here is the complete list of all exclusive distributors for the Amstel Music Catalogue per territory.</p></div></div><div class="row"><div class="col-lg-6"><section class="location"><ul><li class="country">USA &amp; Canada</li><li class="company">Hal Leonard Corporation</li><li class="address">7777 West Bluemound Road</li><li class="fulladdress">Milwaukee,, Wisconsin 94102 USA</li><li class="tel">Tel.[1] 414 -774 3630</li><li class="fax">Fax.[1] 414 -774 3259 </li><li class="email">E-mail: <a href="&quot;mailto:info@halleonard.com&quot;">info@halleonard.com</a></li><li class="website">website: <a href="www.halleonard.com">www.halleonard.com</a></li></ul></section></div><div class="col-lg-6"><section class="location"><ul><li class="country">Belgium/Belgique </li><li class="company">Hal Leonard MGB BVBA</li><li class="address">Montfortstraat 1 </li><li class="fulladdress">B-2550 Kontich, ,   Belgium/Belgique </li><li class="tel">Tel.[32] 3 888 49 89</li><li class="fax">Fax.[32] 3 888 62 16   </li><li class="email">E-mail: <a href="&quot;mailto:sales@halleonardmgb.be	&quot;">sales@halleonardmgb.be	</a></li><li>&nbsp;</li></ul></section></div><div class="col-lg-6"><section class="location"><ul><li class="country">Switzerland / Schweiz / Suisse </li><li class="company">Hal Leonard MGB GmbH (CH)</li><li class="address">Postfach 2635 </li><li class="fulladdress">CH-4002 Basel,,   Switzerland</li><li class="tel">Tel.[41] 41784 3084</li><li class="fax">Fax.[41] 41784 3080     </li><li class="email">E-mail: <a href="&quot;mailto:verkauf@halleonardmgb.de&quot;">verkauf@halleonardmgb.de</a></li><li>&nbsp;</li></ul></section></div><div class="col-lg-6"><section class="location"><ul><li class="country">England </li><li class="company">Hal Leonard MGB Ltd. </li><li class="address">48 Broadley Terrace Marylebone </li><li class="fulladdress">London NW1 6LG,   England </li><li class="tel">Tel.[44] 207 395 0382</li><li class="fax">Fax.[44] 207 900 1812          </li><li class="email">E-mail: <a href="&quot;mailto:sales@halleonardmgb.co.uk&quot;">sales@halleonardmgb.co.uk</a></li><li class="website">website: <a href="MusicShopEurope.com">MusicShopEurope.com</a></li></ul></section></div><div class="col-lg-6"><section class="location"><ul><li class="country">All other countries:</li><li class="company">Hal Leonard MGB Distribution BV </li><li class="address">Business Park Friesland West 15</li><li class="fulladdress">NL-8447 SL Heerenveen,   The Netherlands</li><li class="tel">Tel.[31] 513 653 053</li><li class="fax">Fax.[31] 513 653 291        </li><li class="email">E-mail: <a href="&quot;mailto:intsales@halleonardmgb.com&quot;">intsales@halleonardmgb.com</a></li><li>&nbsp;</li></ul></section></div><div class="col-lg-6"><section class="location"><ul><li class="country">Exclusive Distributor for the Amstel Music Rental Catalogue:</li><li class="company">Hal Leonard MGB Distribution BV </li><li class="address">Business Park Friesland West 15</li><li class="fulladdress">NL-8447 SL Heerenveen,   </li><li class="tel">Tel.+31 513 653053</li><li class="fax">Fax.          </li><li class="email">E-mail: <a href="&quot;mailto:rental@halleonardmgb.nl&quot;">rental@halleonardmgb.nl</a></li><li class="website">website: <a href="www.johandemeij.com">www.johandemeij.com</a></li></ul></section></div><div class="col-lg-6"><section class="location"><ul><li class="country">Australia &amp; New Zealand</li><li class="company">Hal Leonard Australia Pty Ltd.</li><li class="address">4 Lentara Court,</li><li class="fulladdress">Cheltenham , Victoria,   Australia</li><li class="tel">Tel.[61] 3 9585 3300</li><li class="fax">Fax.[61] 3 9585 3399     </li><li class="email">E-mail: <a href="&quot;mailto:&quot;"></a></li><li class="website">website: <a href="www.halleonard.com.au  ">www.halleonard.com.au  </a></li></ul></section></div><div class="col-lg-6"><section class="location"><ul><li class="country">Italy</li><li class="company">Hal Leonard MGB Srl</li><li class="address">Via Liguria No. 4 Frazione Sesto Ulteriano</li><li class="fulladdress">I-20098 San Giuliano Milanos,   Italy </li><li class="tel">Tel.[39] 02 98813-1</li><li class="fax">Fax. --- </li><li class="email">E-mail: <a href="&quot;mailto:sales@halleonardmgb.it&quot;">sales@halleonardmgb.it</a></li><li>&nbsp;</li></ul></section></div><div class="col-lg-6"><section class="location"><ul><li class="country">France</li><li class="company">Hal Leonard MGB </li><li class="address">Sarl BoÃ®te Postale 11 </li><li class="fulladdress">F-68740 Fessenheim, (Alsace)  France </li><li class="tel">Tel.[33] 389 212 060</li><li class="fax">Fax.[33] 389 212 065      </li><li class="email">E-mail: <a href="&quot;mailto:musique@halleonardmgb.fr&quot;">musique@halleonardmgb.fr</a></li><li>&nbsp;</li></ul></section></div><div class="col-lg-6"><section class="location"><ul><li class="country">Germany</li><li class="company">Hal Leonard MGB GmbH </li><li class="address">Rotlaubstr. 6</li><li class="fulladdress">D-79427 Eschbach,   Germany</li><li class="tel">Tel.[49] 7634 550-0</li><li class="fax">Fax.[49] 7634 550-155  </li><li class="email">E-mail: <a href="&quot;mailto:verkauf@halleonardmgb.de&quot;">verkauf@halleonardmgb.de</a></li><li>&nbsp;</li></ul></section></div><div class="col-lg-6"><section class="location"><ul><li class="country">The Netherlands </li><li class="company">Hal Leonard MGB Distribution BV</li><li class="address">Business Park Friesland West 15   </li><li class="fulladdress">NL-8447 SL Heerenveen,   The Netherlands </li><li class="tel">Tel.[31] 513 653 053 </li><li class="fax">Fax.[31] 513 618 016        </li><li class="email">E-mail: <a href="&quot;mailto:intsales@halleonardmgb.com&quot;">intsales@halleonardmgb.com</a></li><li>&nbsp;</li></ul></section></div></div></div></section> */}
    </>)
}
function mapStateToProps(state) {
    return {
        catalogue:state.orderReducer,
        
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(
        {
            mainAction
        },
        dispatch
      )
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Order);
