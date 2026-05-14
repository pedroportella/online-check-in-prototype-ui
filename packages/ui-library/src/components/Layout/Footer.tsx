const footerLinkGroups = [
  {
    heading: "Support",
    links: [
      { label: "Help centre", href: "https://www.virginaustralia.com/au/en/help/" },
      {
        label: "Travel Credits information",
        href: "https://www.virginaustralia.com/au/en/book/manage-booking/redeem-travel-credits/",
      },
      { label: "Velocity member support", href: "https://www.velocityfrequentflyer.com/help" },
      { label: "Legal policies", href: "https://www.virginaustralia.com/au/en/about-us/policies/legal/" },
      { label: "Contact us", href: "https://www.virginaustralia.com/au/en/help/contact-us/" },
    ],
  },
  {
    heading: "Get to know us",
    links: [
      { label: "Company", href: "https://www.virginaustralia.com/au/en/about-us/" },
      { label: "Careers", href: "https://www.virginaustralia.com/au/en/about-us/careers/" },
      { label: "Investor Centre", href: "https://www.virginaustralia.com/au/en/about-us/investor-relations/" },
      { label: "Sustainability", href: "https://www.virginaustralia.com/au/en/about-us/sustainability/" },
      { label: "Media", href: "https://www.virginaustralia.com/au/en/newsroom/" },
    ],
  },
  {
    heading: "Other services",
    links: [
      { label: "Cargo services", href: "https://www.virginaustralia.com/au/en/travel-info/flying-with-us/cargo/" },
      { label: "Travel agents", href: "https://www.virginaustralia.com/au/en/travel-info/flying-with-us/agency-hub/" },
      { label: "Group bookings", href: "https://www.virginaustralia.com/au/en/travel-info/specific-travel/group-travel/" },
      { label: "Car hire and hotel deals", href: "https://www.virginaustralia.com/au/en/book/partner-offers/" },
      {
        label: "Travel insurance",
        href: "https://www.virginaustralia.com/au/en/book/partner-offers/travel-insurance-offers/",
      },
    ],
  },
  {
    heading: "Download our app",
    links: [
      { label: "Download on the App Store", href: "https://apps.apple.com/au/app/virgin-australia/id356630302" },
      {
        label: "Get it on Google Play",
        href: "https://play.google.com/store/apps/details?id=com.virginaustralia.vaapp",
      },
    ],
  },
];

const legalLinks = [
  {
    label: "Conditions of carriage",
    href: "https://www.virginaustralia.com/au/en/about-us/policies/legal/conditions-of-carriage/",
  },
  { label: "Privacy", href: "https://www.virginaustralia.com/au/en/about-us/policies/privacy/" },
  { label: "Terms of use", href: "https://www.virginaustralia.com/au/en/about-us/policies/legal/terms-of-use/" },
  { label: "Cookies policy", href: "https://www.virginaustralia.com/au/en/about-us/policies/privacy/cookies-policy/" },
];

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
        {footerLinkGroups.map((group) => (
          <div className="col-xs-12 col-md-6 col-lg-3 qld__footer__column" key={group.heading}>
            <nav className="qld__footer__navigation" aria-label={group.heading}>
              <h3 className="qld__footer__heading">{group.heading}</h3>
              <ul className="qld__link-list">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a className="qld__footer__clickable__link" href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        ))}
      </div>
    </div>

    <div className="container-fluid">
      <div className="row">

        <div className="col-xs-12 col-lg-8 qld__footer__column">
          <h3 className="qld__footer__heading">Acknowledgements</h3>
          <p className="qld__footer__acknowledgements">
            In the spirit of reconciliation Virgin Australia acknowledges the traditional custodians of country
            throughout Australia and their connections to land, sea, sky and community. We pay our respect to their
            Elders past and present and extend that respect to all Aboriginal and Torres Strait Islander peoples today.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
