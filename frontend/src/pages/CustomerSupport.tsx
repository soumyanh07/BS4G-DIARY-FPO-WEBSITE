import { useState } from "react";

export default function CustomerSupport() {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    setSubmitted(true);
    setMessage("");
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.icon}>?</div>

        <h1 style={styles.title}>
          Help & Support
        </h1>

        <p style={styles.subtitle}>
          We're here to help you with your milk
          requirements.
        </p>

        <div style={styles.contactCard}>
          <strong>BS4G Dairy FPO</strong>

          <p>
            For milk requirements, delivery questions,
            or account assistance, contact the team.
          </p>

          <p>
            📞 Phone: Contact your BS4G FPO team
          </p>

          <p>
            ✉ Email: support@bs4gdairyfpo.com
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >
          <label style={styles.label}>
            How can we help?

            <textarea
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              placeholder="Describe your issue..."
              style={styles.textarea}
            />
          </label>

          <button
            type="submit"
            style={styles.button}
          >
            Send Message
          </button>
        </form>

        {submitted && (
          <div style={styles.success}>
            Your support request has been received.
            The team will contact you soon.
          </div>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f7fafc",
    padding: "40px 20px",
    boxSizing: "border-box",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  card: {
    maxWidth: "600px",
    margin: "0 auto",
    background: "#fff",
    borderRadius: "16px",
    padding: "30px",
    border: "1px solid #e5eaf0",
  },

  icon: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    background: "#e8f2fc",
    color: "#173b68",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "22px",
  },

  title: {
    color: "#173b68",
    marginBottom: "5px",
  },

  subtitle: {
    color: "#667085",
    fontSize: "13px",
  },

  contactCard: {
    background: "#f5f9fc",
    padding: "18px",
    borderRadius: "10px",
    margin: "25px 0",
    color: "#344054",
    fontSize: "13px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  label: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    color: "#344054",
    fontWeight: 600,
    fontSize: "13px",
  },

  textarea: {
    minHeight: "120px",
    border: "1px solid #d8e1e8",
    borderRadius: "8px",
    padding: "12px",
    fontFamily: "inherit",
    resize: "vertical",
  },

  button: {
    height: "45px",
    border: "none",
    borderRadius: "8px",
    background: "#087c43",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },

  success: {
    marginTop: "18px",
    padding: "12px",
    background: "#e7f8ed",
    color: "#16864a",
    borderRadius: "8px",
    fontSize: "13px",
  },
};