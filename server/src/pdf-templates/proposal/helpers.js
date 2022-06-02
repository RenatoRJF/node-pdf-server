const systemsContent = (systems) => {
  return systems
    .map((system, index) => {
      const {
        price_incl_vat,
        note_title,
        note_description,
        name,
        products_description,
      } = system;

      const whatIsInTheBoxTitle = `What's in the box?`;
      const whatIsInTheBoxContent = `<ul class="what-is-in-the-box"><li>${name}</li></ul>`;
      const prod_description = `<p class="paragraph">${products_description}</p>`;
      const noteDescription = `<p class="paragraph">${note_description}</p>`;

      const section = (sectionTitle, sectionContent) => {
        return `
          <h4 class="system-block-title">${sectionTitle}</h4>
          ${sectionContent}
        `;
      };

      return `
      <li class="system">
        <div class="system-header">
          <h3 class="system-name">${name}</h3>
          <span class="system-price">€${price_incl_vat},-</span>
        </div>

        ${products_description ? prod_description : ``}
        ${index < 2 ? section(whatIsInTheBoxTitle, whatIsInTheBoxContent) : ``}
        ${note_title ? section(note_title, noteDescription) : ``}
      </li>
    `;
    })
    .join("\n");
};

const summaryContent = (systems) => {
  const summaryObj = {
    total: {
      title: "Total ammount",
      description: "Including VAT and installation",
      value: 0,
    },
    subsidy: {
      title: "Subsidy",
      description:
        "Some products have an ISDE subsidy that depends on the brand and type of device. The subsidy amount stated here therefore applies to this combination of products. You must apply for the ISDE subsidy yourself after we have carried out and invoiced the installation.",
      value: 0,
    },
    net_investiment: {
      title: "Net Investiment",
      description: "After subsidy and / or VAT deduction",
      value: 0,
    },
  };

  const summary = systems.reduce((summaryObj, system) => {
    const total = summaryObj.total.value + system.price_incl_vat;
    const subsidy = summaryObj.subsidy.value + system.subsidy;

    return {
      ...summaryObj,
      total: { ...summaryObj.total, value: total },
      subsidy: { ...summaryObj.subsidy, value: subsidy },
      net_investiment: {
        ...summaryObj.net_investiment,
        value: total - subsidy,
      },
    };
  }, summaryObj);

  const content = Object.keys(summary).map((key) => {
    const { title, description, value } = summary[key];

    return `
      <div class="summary-header">
        <h3 class="summary-title">${title}</h3>
        <span class="summary-price">${value}</span>
      </div>

      <p class="paragraph summary-description">${description}</p>
    `;
  });

  return content.join("\n");
};

module.exports = {
  summaryContent,
  systemsContent,
};
