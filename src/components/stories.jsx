import React from "react";

export const Stories = () => (
  <div id="stories">
    <div className="precis">
      <h4>The Facebook Political Ad Collector is back up and running!</h4>
      <p>Quartz, an online news organization focused on the global economy, is taking over stewardship of the project which was previously maintained by The Globe and Mail and before that, by ProPublica.</p>
      <p>We&rsquo;ve updated the extension to keep pace with Facebook modifications to their website’s code--either their improvements or their efforts to block the ad collector. ProPublica, The Globe and Mail and all other publication partners will continue to have access to the ads submitted through this extension, the privacy rules around the project and extension have not changed, and, same as ProPublica and The Globe and Mail, we will never collect your personal information during this project.</p>
      <p>We anticipate soon adding some exciting new features to the ad collector, in conjunction with researchers at the Algorithmic Transparency Institute and New York University. Stay tuned.</p>
      <p>Thank you again for your continued support. To learn more about the extension and how Quartz is using the data you contribute to cover online political influence and disinformation, check out the stories below.</p>
    </div>
    <ul>
      <li>
        <p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://qz.com/?p=1818398"
          >Help us monitor political ads on Facebook &nbsp;→</a>
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
      <p>If you have any questions about Quartz’s Facebook political ads collector, send us an email at <a target="_blank"
      rel="noopener noreferrer" href="mailto:investigations@qz.com?subject=Feedback%20on%20extension">investigations@qz.com</a>.</p>
    </div>
  </div>
);