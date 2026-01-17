class SiteFooter extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      const year = new Date().getFullYear();
      const template = document.createElement('template');
      template.innerHTML = `
        <style>
          :host {
            display: block;
            width: 100%;
          }
          footer {
            box-sizing: border-box;
            width: 100%;
            padding: 1rem 0;
            border-top: 1px solid var(--button-border-color, #333);
            margin-top: 2rem;
            text-align: center;
            color: var(--text-color, #e0e0e0);
            font-family: sans-serif;
          }
          .social-links-container {
              background-color: #ffffff;
              padding: 15px;
              border-radius: 8px;
              display: inline-block;
              margin-bottom: 1rem;
          }
          .social-links a {
            margin: 0 0.5rem;
            display: inline-block;
            transition: transform 0.2s;
          }
          .social-links a:hover {
            transform: scale(1.1);
          }
          .social-links img {
            width: 24px;
            height: 24px;
          }
        </style>
        <footer>
          <div class="social-links-container">
            <div class="social-links">
              <a href="https://www.reddit.com" aria-label="Reddit">
                <img src="images/icons/reddit.png" alt="Reddit"> 
              </a>
              <a href="https://www.instagram.com" aria-label="Instagram">
                <img src="images/icons/instagram.png" alt="Instagram">
              </a>
              <a href="https://www.twitter.com" aria-label="X">
                <img src="images/icons/twitter.png" alt="Twitter">
              </a>
              <a href="https://www.patreon.com" aria-label="Patreon">
                <img src="images/icons/patreon.png" alt="Patreon">
              </a>
            </div>
          </div>
          <p>&copy; ${year} Vanderjahre</p>
        </footer>
      `;
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }
  
  customElements.define('site-footer', SiteFooter);