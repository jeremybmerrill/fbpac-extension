import React from "react";

export const Stories = () => (
  <div id="stories">
    <div className="precis">
      <h4>The Facebook Political Ad Collector has a new name: Ad Observer</h4>
      <p>The <a href="https://engineering.nyu.edu/research/online-political-ads-transparency">Online Political Ads Transparency Project</a> at New York University is taking over stewardship of the project which was previously maintained by Quartz, The Globe and Mail and before that, by ProPublica.</p>
      <p>We&rsquo;ve updated the extension to keep pace with Facebook modifications to their website’s code--either their improvements or their efforts to block the ad collector. ProPublica, The Globe and Mail and all other publication partners will continue to have access to the ads submitted through this extension, the privacy rules around the project and extension have not changed, and, same as ProPublica and The Globe and Mail, we will never collect your personal information during this project.</p>
      <p>We anticipate soon adding some exciting new features to the ad collector, in conjunction with researchers at the Algorithmic Transparency Institute and New York University. Stay tuned.</p>
      <p>Thank you again for your continued support. To learn more about the extension and how the data you contribute helps research and reporting on online political influence and disinformation, check out the links below.</p>
    </div>
    <ul>
      <li>
        <p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://onlinepoliticaltransparencyproject.org/"
          >Online Political Ads Transparency Project &nbsp;→</a>
        </p>
      </li>
      <li>
        <p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://qz.com/1749695/facebook-ads-targeted-fox-news-fans-for-shady-silver-coin-scheme/"
          >A precious-metals scheme used fear and Facebook to trick older conservatives out of their savings &nbsp;→</a>
        </p>
      </li>
      <li>
        <p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://qz.com/1733345/the-fight-against-discriminatory-financial-ads-on-facebook/"
          >The fight against financial advertisers using Facebook for digital redlining &nbsp;→</a>
        </p>
      </li>

    </ul>
    <div className="postcis">
      <p>If you have any questions about the Ad Observer project, send us an email at <a target="_blank"
      rel="noopener noreferrer" href="mailto:Developers@adobserver.org?subject=Feedback%20on%20extension">Developers@adobserver.org</a>.</p>
    </div>
  </div>
);