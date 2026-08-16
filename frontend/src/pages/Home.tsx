import Nav from "../components/Nav";
import Hero from "../components/Hero";
import About from "../components/About";
import Activities from "../components/Activities";
import Outlets from "../components/Outlets";
import Connect from "../components/Connect";
import RequirementForm from "../components/RequirementForm";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      <Nav />

      <main>
        <Hero />

        <About />

        <Activities />

        <Outlets />

        <Connect />

        <RequirementForm />
      </main>

      <Footer />
    </div>
  );
}