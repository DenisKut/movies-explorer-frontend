import Intro from "./Intro";
import AboutProject from "./AboutProject";
import Technologies from "./Technologies";
import Student from "./Student";
import Portfolio from "./Portfolio";

function Main() {
  return(
    <main className="main">
      <Intro />
      <AboutProject />
      <Technologies />
      <Student />
      <Portfolio />
    </main>
  )
}
export default Main;