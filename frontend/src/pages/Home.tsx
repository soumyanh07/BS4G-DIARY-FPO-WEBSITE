import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Activities", href: "#activities" },
  { label: "Outlets", href: "#outlets" },
  { label: "Connect", href: "#connect" },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="home-page">
      {/* ================= HEADER ================= */}
      <header className="home-header">
        <div className="home-header-inner">
          <Link to="/" className="home-logo">
            <img src="/logo.png" alt="BS4G Dairy FPO" />

            <div>
              <div className="home-logo-main">BS4G</div>
              <div className="home-logo-sub">Dairy FPO</div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="home-desktop-nav">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}

            <Link
              to="/customer/login"
              className="home-customer-button"
            >
              Customer Login
            </Link>

            <Link
              to="/team/login"
              className="home-team-button"
            >
              FPO Team
            </Link>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            className="home-mobile-menu-button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>

        {/* MOBILE NAV */}
        {mobileMenuOpen && (
          <div className="home-mobile-menu">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}

            <Link
              to="/customer/login"
              onClick={closeMenu}
              className="home-mobile-customer"
            >
              Customer Login
            </Link>

            <Link
              to="/team/login"
              onClick={closeMenu}
              className="home-mobile-team"
            >
              FPO Team
            </Link>
          </div>
        )}
      </header>

      <main>
        {/* ================= HERO ================= */}
        <section className="home-hero">
          <div className="home-container home-hero-grid">
            <div className="home-hero-content">
              <div className="home-location">
                GHATBORAL · HUMNABAD · BIDAR
              </div>

              <h1>
                Milk procurement,
                <br />
                <span>rooted in our farmers.</span>
              </h1>

              <p>
                BS4G Dairy FPO works with dairy farmers
                around Bidar, procuring approximately
                3,500 litres of buffalo milk every day
                and connecting local production with
                customer needs.
              </p>

              <div className="home-hero-buttons">
                <Link
                  to="/customer/login"
                  className="home-primary-button"
                >
                  Request milk
                  <ArrowUpRight size={15} />
                </Link>

                <a
                  href="#about"
                  className="home-secondary-button"
                >
                  Our story
                </a>
              </div>
            </div>

            {/* PROCUREMENT CARD */}
            <div className="home-ledger-card">
              <div className="home-ledger-header">
                <span className="home-ledger-dot" />

                <span>Daily procurement ledger</span>

                <span className="home-active-badge">
                  Active
                </span>
              </div>

              <div className="home-big-number">
                3,500 L
              </div>

              <div className="home-ledger-label">
                Milk procured / day
              </div>

              <div className="home-divider" />

              <div className="home-stat-grid">
                <div>
                  <strong>7</strong>

                  <span>
                    Outlets around Bidar
                  </span>
                </div>

                <div>
                  <strong>8</strong>

                  <span>
                    Board members
                  </span>
                </div>
              </div>

              <div className="home-fpo-badge">
                <strong>FPO</strong>

                <span>
                  Farmer producer organization
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ABOUT ================= */}
        <section
          id="about"
          className="home-section"
        >
          <div className="home-container">
            <div className="home-section-number">
              01 · ABOUT BS4G
            </div>

            <div className="home-two-column">
              <h2 className="home-section-title">
                A farmer-owned organization
                <br />
                <span>with a local purpose.</span>
              </h2>

              <div>
                <p className="home-body-text">
                  BS4G Dairy FPO is a Farmer Producer
                  Organization based at Ghatboral,
                  near Humnabad in Bidar District,
                  Karnataka. The organization works
                  with dairy farmers and primarily
                  focuses on buffalo milk procurement.
                </p>

                <p className="home-body-text">
                  With approximately 3,500 litres of
                  milk procured every day and a presence
                  through seven outlets around Bidar,
                  BS4G connects local dairy production
                  with the communities it serves.
                </p>
              </div>
            </div>

            <div className="home-info-grid">
              <InfoCard
                label="Leadership"
                value="8 Directors"
              />

              <InfoCard
                label="Focus"
                value="Buffalo milk"
              />

              <InfoCard
                label="President"
                value="Shashanka Salunkai"
              />

              <InfoCard
                label="Procurement record"
                value="BS4G / 001"
              />

              <InfoCard
                label="Daily volume"
                value="3,500 L"
              />

              <InfoCard
                label="Location"
                value="GHATBORAL"
              />
            </div>
          </div>
        </section>

        {/* ================= ACTIVITIES ================= */}
        <section
          id="activities"
          className="home-section home-light-section"
        >
          <div className="home-container">
            <div className="home-section-number">
              02 · WHAT WE DO
            </div>

            <div className="home-two-column">
              <h2 className="home-section-title">
                From farm
                <br />
                <span>to community.</span>
              </h2>

              <p className="home-body-text">
                BS4G's work is built around a
                straightforward local procurement chain
                — connecting farmers, milk handling and
                distribution.
              </p>
            </div>

            <div className="home-activity-grid">
              <ActivityCard
                number="01"
                title="Collection"
                text="Milk is collected through the local farmer network."
              />

              <ActivityCard
                number="02"
                title="Testing"
                text="Milk is checked as part of the procurement process."
              />

              <ActivityCard
                number="03"
                title="Chilling"
                text="Milk is handled and preserved under controlled conditions."
              />

              <ActivityCard
                number="04"
                title="Distribution"
                text="Milk moves through BS4G outlets toward customers."
              />
            </div>
          </div>
        </section>

        {/* ================= OUTLETS ================= */}
        <section
          id="outlets"
          className="home-section"
        >
          <div className="home-container">
            <div className="home-section-number">
              03 · LOCAL PRESENCE
            </div>

            <div className="home-two-column">
              <h2 className="home-section-title">
                Seven points
                <br />
                <span>around Bidar.</span>
              </h2>

              <p className="home-body-text">
                BS4G currently has seven outlets around
                Bidar supporting its milk-related
                activities.
              </p>
            </div>

            <div className="home-notice">
              <strong>
                Outlet details to be confirmed by BS4G
              </strong>

              <span>
                Outlet names and exact locations are
                placeholders pending confirmation from
                the BS4G Dairy FPO team.
              </span>
            </div>

            <div className="home-outlet-grid">
              {[
                "01",
                "02",
                "03",
                "04",
                "05",
                "06",
                "07",
              ].map((number) => (
                <div
                  className="home-outlet-card"
                  key={number}
                >
                  <span>{number}</span>

                  <strong>BS4G Outlet</strong>
                </div>
              ))}
            </div>

            <p className="home-disclaimer">
              NOTE · Outlet names and exact locations
              are placeholders pending confirmation from
              the BS4G Dairy FPO team. No unverified
              location information is being represented
              as official.
            </p>
          </div>
        </section>

        {/* ================= CONNECT ================= */}
        <section
          id="connect"
          className="home-section home-dark-section"
        >
          <div className="home-container">
            <div className="home-section-number home-dark-number">
              04 · CONNECT
            </div>

            <div className="home-connect-grid">
              <div>
                <h2 className="home-dark-title">
                  Start a
                  <br />
                  conversation.
                </h2>

                <p className="home-dark-text">
                  Looking for a regular milk supply?
                  Send your requirement and the BS4G
                  team can follow up with you.
                </p>

                <Link
                  to="/customer/login"
                  className="home-light-button"
                >
                  Request milk
                  <ArrowUpRight size={15} />
                </Link>
              </div>

              <div className="home-contact-panel">
                <ContactBlock
                  title="Head office"
                  heading="Ghatboral"
                  text="Near Humnabad, Bidar District, Karnataka."
                  link="View location"
                />

                <ContactBlock
                  title="Leadership"
                  heading="Mr. Shashank Salunkai"
                  text="President · Board of Directors: 8 members."
                  link="About the team"
                />

                <ContactBlock
                  title="Phone / WhatsApp"
                  heading="Contact details"
                  text="Phone and WhatsApp number to be added by BS4G."
                  link="Number pending"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= REQUIREMENT ================= */}
        <section
          id="requirement"
          className="home-section home-light-section"
        >
          <div className="home-container">
            <div className="home-section-number">
              05 · MILK REQUIREMENT
            </div>

            <div className="home-requirement-grid">
              <div>
                <h2 className="home-section-title">
                  Tell us what
                  <br />
                  <span>you need.</span>
                </h2>

                <p className="home-body-text">
                  Your requirement goes into the BS4G
                  procurement follow-up register so the
                  team can review it and contact you.
                </p>

                <div className="home-tags">
                  <span>Regular supply</span>
                  <span>Buffalo milk</span>
                  <span>Delivery</span>
                </div>
              </div>

              <div className="home-requirement-card">
                <div className="home-login-prompt">
                  <div>
                    <strong>
                      Ready to request milk?
                    </strong>

                    <span>
                      Login as a customer to submit and
                      track your requirement.
                    </span>
                  </div>

                  <Link
                    to="/customer/login"
                    className="home-primary-button"
                  >
                    Customer Login
                    <ArrowUpRight size={15} />
                  </Link>
                </div>

                <div className="home-register-prompt">
                  <span>
                    Don't have a customer account?
                  </span>

                  <Link
                    to="/customer/register"
                    className="home-register-link"
                  >
                    Create an account
                  </Link>
                </div>

                <div className="home-form-preview">
                  <PreviewField
                    label="Your name *"
                    placeholder="Enter your name"
                  />

                  <PreviewField
                    label="Phone / WhatsApp *"
                    placeholder="98765 43210"
                  />

                  <PreviewField
                    label="Required quantity *"
                    placeholder="5"
                    suffix="litres / day"
                  />

                  <PreviewField
                    label="Delivery location *"
                    placeholder="Area / town / village"
                  />

                  <div className="home-preview-field home-preview-full">
                    <label>Additional note</label>

                    <div className="home-textarea-preview">
                      Anything else the team should know?
                    </div>
                  </div>
                </div>

                <p className="home-privacy">
                  By submitting this form, you are sharing
                  your contact details with BS4G Dairy FPO
                  for the purpose of following up on your
                  milk requirement.
                </p>

                <Link
                  to="/customer/login"
                  className="home-form-button"
                >
                  Submit requirement
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="home-footer">
        <div className="home-container home-footer-grid">
          <div className="home-footer-brand">
            <Link
              to="/"
              className="home-footer-logo"
            >
              <img
                src="/logo.png"
                alt="BS4G Dairy FPO"
              />

              <div>
                <strong>BS4G</strong>
                <span>Dairy FPO</span>
              </div>
            </Link>

            <p>
              A dairy Farmer Producer Organization based
              at Ghatboral, near Humnabad, Bidar
              District, Karnataka.
            </p>
          </div>

          <div className="home-footer-column">
            <h4>Navigate</h4>

            <a href="#about">About</a>
            <a href="#activities">Activities</a>
            <a href="#outlets">Outlets</a>
            <a href="#connect">Connect</a>
          </div>

          <div className="home-footer-column">
            <h4>Contact</h4>

            <a href="#requirement">
              Milk requirement
            </a>

            <Link to="/team/login">
              FPO Team
            </Link>
          </div>

          <div className="home-footer-column">
            <h4>At a glance</h4>

            <span>3,500 L / DAY</span>
            <span>7 OUTLETS</span>
            <span>8 DIRECTORS</span>
          </div>
        </div>

        <div className="home-footer-bottom">
          <span>© 2026 BS4G Dairy FPO</span>

          <span>
            Ghatboral · Bidar · Karnataka
          </span>
        </div>
      </footer>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="home-info-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ActivityCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="home-activity-card">
      <span>{number}</span>

      <h3>{title}</h3>

      <p>{text}</p>
    </div>
  );
}

function ContactBlock({
  title,
  heading,
  text,
  link,
}: {
  title: string;
  heading: string;
  text: string;
  link: string;
}) {
  return (
    <div className="home-contact-block">
      <span>{title}</span>

      <strong>{heading}</strong>

      <p>{text}</p>

      <small>{link}</small>
    </div>
  );
}

function PreviewField({
  label,
  placeholder,
  suffix,
}: {
  label: string;
  placeholder: string;
  suffix?: string;
}) {
  return (
    <div className="home-preview-field">
      <label>{label}</label>

      <div className="home-input-preview">
        <span>{placeholder}</span>

        {suffix && <small>{suffix}</small>}
      </div>
    </div>
  );
}