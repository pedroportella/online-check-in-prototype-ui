const Footer = () => (
  <footer className="qld__footer qld__footer--dark-alt" role="contentinfo">
    <div className="container-fluid">
      <div className="row qld__footer__row">
        <div className="col-xs-12 qld__footer__column">
          <div className="qld__footer__title">
            <h4 className="qld__footer__heading">Virgin Australia</h4>
          </div>
        </div>
      </div>
    </div>

    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-12 col-lg-3 qld__footer__column">
          <div className="container-fluid">
            <div className="row qld__footer-contact">
              <div className="col-xs-12 col-sm-8 col-lg-12">
                <h4 className="qld__footer__heading">Contact Us</h4>
                <p className="qld__footer__cta-content">For general enquiries, feedback, complaints and compliments:</p>
                <p className="qld__footer__cta-content">
                  <i className="qld__footer__cta__icon fa-light fa-phone" aria-hidden="true"></i>
                  13 QGOV (<a href="tel:137468">11 11 11</a>)<br />
                </p>
              </div>
              <div className="col-xs-12 col-sm-4 col-lg-12">
                <a href="http://qhscb.squiz.cloud/contact-us" className="qld__btn qld__btn--secondary">
                  Feedback
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xs-12 col-lg-2 qld__footer__column">
          <nav className="qld__footer__navigation" aria-label="footer">
            <ul className="qld__link-list">
              <li>
                <a
                  className="qld__footer__clickable__link"
                  href="#copyright">
                  Copyright
                </a>
              </li>
              <li>
                <a className="qld__footer__clickable__link" href="#disclaimer">
                  Disclaimer
                </a>
              </li>
              <li>
                <a className="qld__footer__clickable__link" href="#privacy">
                  Privacy
                </a>
              </li>
              <li>
                <a
                  className="qld__footer__clickable__link"
                  href="access-info">
                  Right to information
                </a>
              </li>
              <li>
                <a className="qld__footer__clickable__link" href="https://www.qld.gov.au/help/accessibility/">
                  Accessibility
                </a>
              </li>
              <li>
                <a className="qld__footer__clickable__link" href="#languages">
                  Other languages
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="col-xs-12 col-lg-2 qld__footer__column">
          <div className="">
            <h3 className="qld__footer__heading">Acknowledgements</h3>

            <p className="qld__footer__acknowledgements">
              In the spirit of reconciliation Virgin Australia acknowledges the traditional custodians of country throughout Australia and their connections to land, sea, sky and community. We pay our respect to their Elders past and present and extend that respect to all Aboriginal and Torres Strait Islander peoples today.
            </p>

            <p className="qld__footer__copyrightMessage">© Virgin Australia Airlines Pty Ltd ABN 36 090 670 965</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
