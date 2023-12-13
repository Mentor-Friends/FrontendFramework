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
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/resume">Resume</a>
      </li>
      <li>
        <a href="/contact">Contact</a>
      </li>
    </ul>
  </nav>
</header>
  <div id="${GlobalConst.globalPrefix}content"></div>
`;

// Routing
// Load Content based on route data
let contentDiv = document.querySelectorAll<HTMLElement>(
  `#${GlobalConst.globalPrefix}content`
)[0];

let newPage = new routes[window.location.pathname]();
contentDiv.innerHTML = newPage.html;
