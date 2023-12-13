import "./style.css";
import * as GlobalConst from "./constants/global_constants";
import { routes } from "./routes";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<header>
<a href="#">
<img src="${GlobalConst.logo}" class="logo" alt="Boomconsole logo" />
</a>
  <nav>
    <ul>
      <li>
        <a routerLink="/">Home</a>
      </li>
      <li>
        <a routerLink="/resume">Resume</a>
      </li>
      <li>
        <a routerLink="/contact">Contact</a>
      </li>
    </ul>
  </nav>
</header>
  <div id="${GlobalConst.globalPrefix}content"></div>
`;
// Routing

// Load Content based on route data
const contentDiv = document.querySelectorAll<HTMLElement>(
  `#${GlobalConst.globalPrefix}content`
)[0];

const routerLinks = document.querySelectorAll("[routerLink]");
routerLinks.forEach((router: any) => {
  router.addEventListener("click", (e: any) => {
    let pathname = e.target.getAttribute("routerLink");
    window.history.pushState({}, pathname, window.location.origin + pathname);
    let newPage = new routes[window.location.pathname]();
    contentDiv.innerHTML = newPage.html;
    return false;
  });
});

window.onpopstate = () => {
  let newPage = new routes[window.location.pathname]();
  contentDiv.innerHTML = newPage.html;
};
