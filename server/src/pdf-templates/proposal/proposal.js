const proposalStyle = require("./proposal.style");
const { summaryContent, systemsContent } = require("./helpers");

module.exports = (data) => {
  const { intro, description, systems, valid_until, user_data } = data;

  const {
    first_name,
    address,
    house_type,
    year_of_construction,
    floor_area,
    energy_label,
  } = user_data;

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Proposal</title>
        <style>${proposalStyle}</style/>
      </head>
      <body>
        <main>
          <h1 class="intro-title">Dear ${first_name},</h1>

          <p class="paragraph paragraph-intro">${intro}</p>

          <div class="user-data">
            <span class="user-data__detail">
              <strong>Addresss:</strong> ${address}
            </span>
            <span class="user-data__detail">
              <strong>House type:</strong> ${house_type}
            </span>
            <span class="user-data__detail">
              <strong>Year of construction:</strong> ${year_of_construction}
            </span>
            <span class="user-data__detail">
              <strong>Floor area:</strong> ${floor_area}
            </span>
            <span class="user-data__detail">
              <strong>Energy label:</strong> ${energy_label}
            </span>
          </div>

          <p class="paragraph">
            ${description}
          </p>

          <p class="paragraph">
            Below you will find our proposal, including a price for delivery and installation. You can open the blocks for more information.
          </p>

          <p class="paragraph">
            This proposal is valid until <strong>${valid_until}</strong>.
          </p>

          <h2 class="proposal-title">Proposal</h2>

          <ul class="proposals-systems">
            ${systemsContent(systems)}
          </ul>

          <div class="summary">
            ${summaryContent(systems)}
          </div>
        </main>
      </body>
    </html>
  `;
};
