import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={styles.page}>
      {/* =====================================================
          HEADER
      ====================================================== */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <Link to="/" style={styles.logoLink}>
            <img
              src="/logo.png"
              alt="BS4G Dairy FPO"
              style={styles.logo}
            />

            <div>
              <div style={styles.logoMain}>BS4G</div>
              <div style={styles.logoSub}>Dairy FPO</div>
            </div>
          </Link>

          <nav style={styles.nav}>
            <a href="#about" style={styles.navLink}>
              About
            </a>

            <a href="#activities" style={styles.navLink}>
              Activities
            </a>

            <a href="#outlets" style={styles.navLink}>
              Outlets
            </a>

            <a href="#connect" style={styles.navLink}>
              Connect
            </a>

            <Link
              to="/customer/login"
              style={styles.customerLoginButton}
            >
              Customer Login
            </Link>

            <Link
              to="/team/login"
              style={styles.teamButton}
            >
              FPO Team
            </Link>
          </nav>
        </div>
      </header>

      {/* =====================================================
          HERO
      ====================================================== */}
      <main>
        <section style={styles.hero}>
          <div style={styles.heroInner}>
            <div style={styles.heroLeft}>
              <div style={styles.locationBadge}>
                Ghatboral · Humnabad · Bidar
              </div>

              <h1 style={styles.heroTitle}>
                Milk procurement,
                <br />
                <span style={styles.heroAccent}>
                  rooted in our farmers.
                </span>
              </h1>

              <p style={styles.heroText}>
                BS4G Dairy FPO works with dairy farmers around
                Bidar, procuring approximately 3,500 litres of
                buffalo milk every day and connecting local
                production with customer needs.
              </p>

              <div style={styles.heroButtons}>
                <Link
                  to="/customer/login"
                  style={styles.primaryButton}
                >
                  Request milk
                  <span>→</span>
                </Link>

                <a
                  href="#about"
                  style={styles.secondaryButton}
                >
                  Our story
                </a>
              </div>
            </div>

            <div style={styles.heroCard}>
              <div style={styles.ledgerHeader}>
                <span style={styles.ledgerDot} />
                <span>Daily procurement ledger</span>
                <span style={styles.activeBadge}>Active</span>
              </div>

              <div style={styles.bigNumber}>
                3,500 L
              </div>

              <div style={styles.ledgerLabel}>
                Milk procured / day
              </div>

              <div style={styles.ledgerDivider} />

              <div style={styles.statGrid}>
                <div>
                  <div style={styles.statNumber}>7</div>
                  <div style={styles.statLabel}>
                    Outlets around Bidar
                  </div>
                </div>

                <div>
                  <div style={styles.statNumber}>8</div>
                  <div style={styles.statLabel}>
                    Board members
                  </div>
                </div>
              </div>

              <div style={styles.fpoBadge}>
                <strong>FPO</strong>
                <span>Farmer producer organization</span>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            ABOUT
        ====================================================== */}
        <section
          id="about"
          style={styles.section}
        >
          <div style={styles.sectionInner}>
            <div style={styles.sectionNumber}>
              01 · About BS4G
            </div>

            <div style={styles.aboutGrid}>
              <div>
                <h2 style={styles.sectionTitle}>
                  A farmer-owned organization
                  <br />
                  <span>with a local purpose.</span>
                </h2>
              </div>

              <div>
                <p style={styles.bodyText}>
                  BS4G Dairy FPO is a Farmer Producer
                  Organization based at Ghatboral, near
                  Humnabad in Bidar District, Karnataka. The
                  organization works with dairy farmers and
                  primarily focuses on buffalo milk procurement.
                </p>

                <p style={styles.bodyText}>
                  With approximately 3,500 litres of milk
                  procured every day and a presence through
                  seven outlets around Bidar, BS4G connects
                  local dairy production with the communities
                  it serves.
                </p>
              </div>
            </div>

            <div style={styles.infoGrid}>
              <div style={styles.infoCard}>
                <span style={styles.infoLabel}>Leadership</span>
                <strong>8 Directors</strong>
              </div>

              <div style={styles.infoCard}>
                <span style={styles.infoLabel}>Focus</span>
                <strong>Buffalo milk</strong>
              </div>

              <div style={styles.infoCard}>
                <span style={styles.infoLabel}>President</span>
                <strong>Shashanka Salunkai</strong>
              </div>

              <div style={styles.infoCard}>
                <span style={styles.infoLabel}>
                  Procurement record
                </span>
                <strong>BS4G / 001</strong>
              </div>

              <div style={styles.infoCard}>
                <span style={styles.infoLabel}>
                  Daily volume
                </span>
                <strong>3,500 L</strong>
              </div>

              <div style={styles.infoCard}>
                <span style={styles.infoLabel}>Location</span>
                <strong>GHATBORAL</strong>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            ACTIVITIES
        ====================================================== */}
        <section
          id="activities"
          style={{
            ...styles.section,
            ...styles.lightSection,
          }}
        >
          <div style={styles.sectionInner}>
            <div style={styles.sectionNumber}>
              02 · What we do
            </div>

            <div style={styles.activitiesHeader}>
              <h2 style={styles.sectionTitle}>
                From farm
                <br />
                <span>to community.</span>
              </h2>

              <p style={styles.bodyText}>
                BS4G's work is built around a straightforward
                local procurement chain — connecting farmers,
                milk handling and distribution.
              </p>
            </div>

            <div style={styles.activityGrid}>
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

        {/* =====================================================
            OUTLETS
        ====================================================== */}
        <section
          id="outlets"
          style={styles.section}
        >
          <div style={styles.sectionInner}>
            <div style={styles.sectionNumber}>
              03 · Local presence
            </div>

            <div style={styles.outletHeader}>
              <h2 style={styles.sectionTitle}>
                Seven points
                <br />
                <span>around Bidar.</span>
              </h2>

              <p style={styles.bodyText}>
                BS4G currently has seven outlets around Bidar
                supporting its milk-related activities.
              </p>
            </div>

            <div style={styles.notice}>
              <strong>
                Outlet details to be confirmed by BS4G
              </strong>

              <span>
                Outlet names and exact locations are placeholders
                pending confirmation from the BS4G Dairy FPO
                team.
              </span>
            </div>

            <div style={styles.outletGrid}>
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
                  key={number}
                  style={styles.outletCard}
                >
                  <span style={styles.outletNumber}>
                    {number}
                  </span>

                  <div>
                    <strong>BS4G Outlet</strong>
                    
                  </div>
                </div>
              ))}
            </div>

            <p style={styles.disclaimer}>
              NOTE · Outlet names and exact locations are
              placeholders pending confirmation from the BS4G
              Dairy FPO team. No unverified location information
              is being represented as official.
            </p>
          </div>
        </section>

        {/* =====================================================
            CONNECT
        ====================================================== */}
        <section
          id="connect"
          style={{
            ...styles.section,
            ...styles.darkSection,
          }}
        >
          <div style={styles.sectionInner}>
            <div style={styles.sectionNumberDark}>
              04 · Connect
            </div>

            <div style={styles.connectGrid}>
              <div>
                <h2 style={styles.darkTitle}>
                  Start a
                  <br />
                  conversation.
                </h2>

                <p style={styles.darkText}>
                  Looking for a regular milk supply? Send your
                  requirement and the BS4G team can follow up
                  with you.
                </p>

                <Link
                  to="/customer/login"
                  style={styles.lightButton}
                >
                  Request milk
                  <span>→</span>
                </Link>
              </div>

              <div style={styles.contactPanel}>
                <div style={styles.contactBlock}>
                  <span>Head office</span>
                  <strong>Ghatboral</strong>
                  <p>
                    Near Humnabad, Bidar District, Karnataka.
                  </p>

                  <span style={styles.locationLink}>
                    View location
                  </span>
                </div>

                <div style={styles.contactBlock}>
                  <span>Leadership</span>
                  <strong>
                    Mr. Shashank Salunkai
                  </strong>
                  <p>
                    President · Board of Directors: 8 members.
                  </p>

                  <span style={styles.locationLink}>
                    About the team
                  </span>
                </div>

                <div style={styles.contactBlock}>
                  <span>Phone / WhatsApp</span>
                  <strong>Contact details</strong>
                  <p>
                    Phone and WhatsApp number to be added by
                    BS4G.
                  </p>

                  <span style={styles.pendingText}>
                    Number pending
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            MILK REQUIREMENT
        ====================================================== */}
        <section style={styles.requirementSection}>
          <div style={styles.sectionInner}>
            <div style={styles.sectionNumber}>
              05 · Milk requirement
            </div>

            <div style={styles.requirementGrid}>
              <div>
                <h2 style={styles.sectionTitle}>
                  Tell us what
                  <br />
                  <span>you need.</span>
                </h2>

                <p style={styles.bodyText}>
                  Your requirement goes into the BS4G
                  procurement follow-up register so the team can
                  review it and contact you.
                </p>

                <div style={styles.requirementTags}>
                  <span>Regular supply</span>
                  <span>Buffalo milk</span>
                  <span>Delivery</span>
                </div>
              </div>

              <div style={styles.requirementCard}>
                <div style={styles.loginPrompt}>
                  <div>
                    <strong>Ready to request milk?</strong>
                    <span>
                      Login as a customer to submit and track
                      your requirement.
                    </span>
                  </div>

                  <Link
                    to="/customer/login"
                    style={styles.primaryButton}
                  >
                    Customer Login
                    <span>→</span>
                  </Link>
                </div>

                <div style={styles.registerPrompt}>
                  <span>
                    Don't have a customer account?
                  </span>

                  <Link
                    to="/customer/register"
                    style={styles.registerLink}
                  >
                    Create an account
                  </Link>
                </div>

                <div style={styles.formPreview}>
                  <FormPreviewRow
                    label="Your name *"
                    placeholder="Enter your name"
                  />

                  <FormPreviewRow
                    label="Phone / WhatsApp *"
                    placeholder="98765 43210"
                  />

                  <FormPreviewRow
                    label="Required quantity *"
                    placeholder="5"
                    suffix="litres / day"
                  />

                  <FormPreviewRow
                    label="Delivery location *"
                    placeholder="Area / town / village"
                  />

                  <div style={styles.previewField}>
                    <label>Additional note</label>
                    <div style={styles.textareaPreview}>
                      Anything else the team should know?
                    </div>
                  </div>
                </div>

                <p style={styles.privacyText}>
                  By submitting this form, you are sharing your
                  contact details with BS4G Dairy FPO for the
                  purpose of following up on your milk
                  requirement.
                </p>

                <Link
                  to="/customer/login"
                  style={styles.formButton}
                >
                  Submit requirement
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerBrand}>
            <Link to="/" style={styles.footerLogo}>
              <img
                src="/logo.png"
                alt="BS4G Dairy FPO"
                style={styles.footerLogoImage}
              />

              <div>
                <strong>BS4G</strong>
                <span>Dairy FPO</span>
              </div>
            </Link>

            <p>
              A dairy Farmer Producer Organization based at
              Ghatboral, near Humnabad, Bidar District,
              Karnataka.
            </p>
          </div>

          <div style={styles.footerColumn}>
            <h4>Navigate</h4>

            <a href="#about">About</a>
            <a href="#activities">Activities</a>
            <a href="#outlets">Outlets</a>
            <a href="#connect">Connect</a>
          </div>

          <div style={styles.footerColumn}>
            <h4>Contact</h4>

            <a href="#connect">Milk requirement</a>

            <Link to="/team/login">
              FPO Team
            </Link>
          </div>

          <div style={styles.footerColumn}>
            <h4>At a glance</h4>

            <span>3,500 L / DAY</span>
            <span>7 OUTLETS</span>
            <span>8 DIRECTORS</span>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <span>© 2026 BS4G Dairy FPO</span>
          <span>Ghatboral · Bidar · Karnataka</span>
        </div>
      </footer>
    </div>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

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
    <div style={styles.activityCard}>
      <span style={styles.activityNumber}>{number}</span>

      <h3>{title}</h3>

      <p>{text}</p>
    </div>
  );
}

function FormPreviewRow({
  label,
  placeholder,
  suffix,
}: {
  label: string;
  placeholder: string;
  suffix?: string;
}) {
  return (
    <div style={styles.previewField}>
      <label>{label}</label>

      <div style={styles.inputPreview}>
        <span>{placeholder}</span>

        {suffix && (
          <small>{suffix}</small>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   STYLES
========================================================= */

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f8faf8",
    color: "#19352b",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  header: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(255,255,255,0.96)",
    borderBottom: "1px solid #e7ece8",
    backdropFilter: "blur(12px)",
  },

  headerInner: {
    maxWidth: "1180px",
    margin: "0 auto",
    minHeight: "76px",
    padding: "0 28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "24px",
    boxSizing: "border-box",
  },

  logoLink: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
    color: "#173b68",
  },

  logo: {
    width: "46px",
    height: "46px",
    objectFit: "contain",
  },

  logoMain: {
    fontSize: "18px",
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: "0.5px",
  },

  logoSub: {
    fontSize: "10px",
    color: "#5f6f68",
    marginTop: "4px",
    letterSpacing: "1.5px",
  },

  nav: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  navLink: {
    textDecoration: "none",
    color: "#53635c",
    fontSize: "12px",
    fontWeight: 600,
  },

  customerLoginButton: {
    textDecoration: "none",
    background: "#087c43",
    color: "#fff",
    padding: "11px 17px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },

  teamButton: {
    textDecoration: "none",
    color: "#173b68",
    border: "1px solid #cad7df",
    padding: "10px 16px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },

  hero: {
    background:
      "linear-gradient(135deg, #f1f8f3 0%, #ffffff 55%, #edf5fb 100%)",
    borderBottom: "1px solid #e5ece8",
  },

  heroInner: {
    maxWidth: "1180px",
    margin: "0 auto",
    padding: "90px 28px 85px",
    display: "grid",
    gridTemplateColumns:
      "minmax(0, 1.25fr) minmax(330px, 0.75fr)",
    alignItems: "center",
    gap: "70px",
    boxSizing: "border-box",
  },

  heroLeft: {
    maxWidth: "680px",
  },

  locationBadge: {
    display: "inline-block",
    color: "#16864a",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "1.2px",
    textTransform: "uppercase",
    marginBottom: "22px",
  },

  heroTitle: {
    margin: 0,
    color: "#173b68",
    fontSize: "58px",
    lineHeight: 1.03,
    letterSpacing: "-2.5px",
    fontWeight: 750,
  },

  heroAccent: {
    color: "#087c43",
  },

  heroText: {
    maxWidth: "610px",
    margin: "25px 0 0",
    color: "#617068",
    fontSize: "16px",
    lineHeight: 1.75,
  },

  heroButtons: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "30px",
  },

  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "13px",
    minHeight: "48px",
    padding: "0 21px",
    boxSizing: "border-box",
    background: "#087c43",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 700,
    boxShadow: "0 8px 20px rgba(8,124,67,0.18)",
  },

  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "48px",
    padding: "0 21px",
    boxSizing: "border-box",
    border: "1px solid #cbd9d1",
    background: "#fff",
    color: "#344c42",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 700,
  },

  heroCard: {
    background: "#fff",
    border: "1px solid #e0e9e3",
    borderRadius: "18px",
    padding: "28px",
    boxShadow: "0 18px 50px rgba(28,65,49,0.08)",
  },

  ledgerHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#596a62",
    fontSize: "11px",
    fontWeight: 600,
  },

  ledgerDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#16864a",
  },

  activeBadge: {
    marginLeft: "auto",
    color: "#16864a",
    background: "#eaf7ef",
    borderRadius: "20px",
    padding: "5px 9px",
    fontSize: "9px",
    fontWeight: 700,
  },

  bigNumber: {
    color: "#173b68",
    fontSize: "52px",
    lineHeight: 1,
    fontWeight: 750,
    marginTop: "35px",
    letterSpacing: "-2px",
  },

  ledgerLabel: {
    color: "#7a8881",
    fontSize: "11px",
    marginTop: "8px",
  },

  ledgerDivider: {
    height: "1px",
    background: "#edf0ee",
    margin: "28px 0",
  },

  statGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },

  statNumber: {
    color: "#087c43",
    fontSize: "30px",
    fontWeight: 750,
  },

  statLabel: {
    color: "#6c7973",
    fontSize: "10px",
    lineHeight: 1.4,
    marginTop: "3px",
  },

  fpoBadge: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    marginTop: "27px",
    paddingTop: "18px",
    borderTop: "1px solid #edf0ee",
  },

  fpoBadgeStrong: {},

  section: {
    padding: "90px 28px",
    background: "#fff",
  },

  sectionInner: {
    maxWidth: "1180px",
    margin: "0 auto",
  },

  sectionNumber: {
    color: "#16864a",
    fontSize: "10px",
    fontWeight: 800,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    marginBottom: "28px",
  },

  sectionTitle: {
    margin: 0,
    color: "#173b68",
    fontSize: "43px",
    lineHeight: 1.08,
    letterSpacing: "-1.6px",
    fontWeight: 750,
  },

  aboutGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "80px",
    alignItems: "start",
  },

  sectionTitleSpan: {},

  bodyText: {
    margin: "0 0 18px",
    color: "#66756e",
    fontSize: "14px",
    lineHeight: 1.8,
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: "1px",
    background: "#dfe8e2",
    marginTop: "65px",
    border: "1px solid #dfe8e2",
  },

  infoCard: {
    background: "#fff",
    padding: "23px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  infoLabel: {
    color: "#7a8881",
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },

  lightSection: {
    background: "#f5f8f6",
  },

  activitiesHeader: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "80px",
    alignItems: "end",
  },

  activityGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4, minmax(0, 1fr))",
    gap: "16px",
    marginTop: "55px",
  },

  activityCard: {
    background: "#fff",
    border: "1px solid #e0e8e3",
    borderRadius: "13px",
    padding: "25px",
    minHeight: "210px",
    boxSizing: "border-box",
  },

  activityNumber: {
    color: "#16864a",
    fontSize: "11px",
    fontWeight: 800,
  },

  outletHeader: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "80px",
    alignItems: "end",
  },

  notice: {
    marginTop: "45px",
    padding: "16px 18px",
    background: "#f5f8f6",
    border: "1px solid #e1e9e4",
    borderRadius: "9px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    color: "#617068",
    fontSize: "11px",
    lineHeight: 1.5,
  },

  outletGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4, minmax(0, 1fr))",
    gap: "12px",
    marginTop: "22px",
  },

  outletCard: {
    minHeight: "105px",
    border: "1px solid #e0e8e3",
    borderRadius: "10px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    background: "#fff",
    boxSizing: "border-box",
  },

  outletNumber: {
    color: "#16864a",
    fontSize: "10px",
    fontWeight: 800,
  },

  disclaimer: {
    marginTop: "20px",
    color: "#87938d",
    fontSize: "10px",
    lineHeight: 1.6,
  },

  darkSection: {
    background: "#173b68",
    color: "#fff",
  },

  sectionNumberDark: {
    color: "#8ed0aa",
    fontSize: "10px",
    fontWeight: 800,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    marginBottom: "28px",
  },

  connectGrid: {
    display: "grid",
    gridTemplateColumns: "0.9fr 1.1fr",
    gap: "100px",
  },

  darkTitle: {
    margin: "0 0 25px",
    color: "#fff",
    fontSize: "52px",
    lineHeight: 1.05,
    letterSpacing: "-2px",
  },

  darkText: {
    color: "#c7d7d0",
    fontSize: "14px",
    lineHeight: 1.8,
    maxWidth: "470px",
    marginBottom: "30px",
  },

  lightButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "13px",
    minHeight: "48px",
    padding: "0 20px",
    background: "#fff",
    color: "#173b68",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 700,
  },

  contactPanel: {
    borderTop: "1px solid rgba(255,255,255,0.2)",
  },

  contactBlock: {
    padding: "22px 0",
    borderBottom: "1px solid rgba(255,255,255,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },

  contactBlockSpan: {},

  locationLink: {
    color: "#8ed0aa",
    fontSize: "11px",
    fontWeight: 700,
    marginTop: "5px",
  },

  pendingText: {
    color: "#f3d18b",
    fontSize: "10px",
    fontWeight: 700,
    marginTop: "5px",
  },

  requirementSection: {
    padding: "90px 28px",
    background: "#f5f8f6",
  },

  requirementGrid: {
    display: "grid",
    gridTemplateColumns: "0.75fr 1.25fr",
    gap: "75px",
    alignItems: "start",
  },

  requirementTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "28px",
  },

  requirementTag: {},

  requirementCard: {
    background: "#fff",
    border: "1px solid #dfe8e3",
    borderRadius: "16px",
    padding: "27px",
    boxShadow: "0 15px 40px rgba(30,60,45,0.06)",
  },

  loginPrompt: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    paddingBottom: "22px",
    borderBottom: "1px solid #e8edea",
  },

  registerPrompt: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    marginTop: "14px",
    color: "#78857f",
    fontSize: "11px",
  },

  registerLink: {
    color: "#1269b0",
    textDecoration: "none",
    fontWeight: 700,
  },

  formPreview: {
    marginTop: "25px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },

  previewField: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
  },

  previewFieldLabel: {},

  inputPreview: {
    minHeight: "44px",
    border: "1px solid #dbe4df",
    borderRadius: "7px",
    padding: "0 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxSizing: "border-box",
    color: "#a1aaa6",
    fontSize: "11px",
  },

  textareaPreview: {
    minHeight: "76px",
    border: "1px solid #dbe4df",
    borderRadius: "7px",
    padding: "12px",
    boxSizing: "border-box",
    color: "#a1aaa6",
    fontSize: "11px",
  },

  privacyText: {
    color: "#8a9690",
    fontSize: "9px",
    lineHeight: 1.6,
    margin: "20px 0",
  },

  formButton: {
    width: "100%",
    minHeight: "46px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#087c43",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "12px",
    fontWeight: 700,
    boxSizing: "border-box",
  },

  footer: {
    background: "#102f3d",
    color: "#fff",
    padding: "60px 28px 0",
  },

  footerInner: {
    maxWidth: "1180px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns:
      "1.6fr 0.8fr 0.8fr 0.8fr",
    gap: "60px",
    paddingBottom: "50px",
  },

  footerBrand: {
    maxWidth: "350px",
  },

  footerLogo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
    color: "#fff",
  },

  footerLogoImage: {
    width: "43px",
    height: "43px",
    objectFit: "contain",
  },

  footerBrandP: {},

  footerColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "11px",
  },

  footerBottom: {
    maxWidth: "1180px",
    margin: "0 auto",
    padding: "20px 0",
    borderTop: "1px solid rgba(255,255,255,0.12)",
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    color: "#a8b9b8",
    fontSize: "10px",
  },
};