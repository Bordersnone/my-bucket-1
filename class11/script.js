document.addEventListener("DOMContentLoaded", () => {

  /*
   * ============================
   * NAVIGATION
   * ============================
   */

  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach(item => {

    item.addEventListener("click", event => {

      event.preventDefault();

      navItems.forEach(nav => {
        nav.classList.remove("active");
      });

      item.classList.add("active");

      const page = item.dataset.page;

      if (page) {
        console.log(`Current page: ${page}`);
      }

    });

  });


  /*
   * ============================
   * PERIOD SWITCHER
   * ============================
   */

  const periods = document.querySelectorAll(".period");

  periods.forEach(period => {

    period.addEventListener("click", () => {

      periods.forEach(button => {
        button.classList.remove("active");
      });

      period.classList.add("active");

      updateChart(period.textContent);

    });

  });


  /*
   * ============================
   * CHART
   * ============================
   */

  const chartLine = document.querySelector(".chart-line");
  const chartArea = document.querySelector(".chart-area");
  const chartCircle = document.querySelector(".main-chart circle");

  const chartData = {

    "1Y": {
      path: `
        M0 230
        C55 220 70 215 120 210
        C170 200 185 190 230 195
        C280 200 300 175 345 170
        C395 160 420 168 455 145
        C505 112 520 135 565 118
        C610 100 635 110 675 82
        C725 52 745 78 785 62
        C825 47 850 35 900 20
      `,
      value: "$12.84M",
      growth: "+8.42%"
    },

    "3Y": {
      path: `
        M0 270
        C55 255 80 245 125 248
        C175 250 190 218 240 225
        C290 232 320 190 360 198
        C405 205 425 172 470 178
        C520 182 540 135 585 145
        C635 150 665 115 700 125
        C750 115 775 70 820 82
        C855 70 875 43 900 30
      `,
      value: "$12.84M",
      growth: "+18.7%"
    },

    "5Y": {
      path: `
        M0 285
        C60 280 95 260 135 265
        C185 270 210 240 260 248
        C310 255 335 215 380 220
        C425 225 450 185 500 192
        C550 198 570 150 620 160
        C665 165 690 115 735 125
        C785 125 815 75 850 85
        C875 65 890 45 900 22
      `,
      value: "$12.84M",
      growth: "+34.2%"
    },

    "All": {
      path: `
        M0 300
        C60 295 95 275 135 280
        C185 285 220 250 265 260
        C315 265 350 220 395 230
        C440 235 475 195 515 205
        C565 210 605 160 650 175
        C695 175 730 120 770 135
        C815 130 845 80 875 95
        C890 70 895 40 900 18
      `,
      value: "$12.84M",
      growth: "+62.4%"
    }

  };


  function updateChart(period) {

    const data = chartData[period];

    if (!data) return;

    chartLine.setAttribute("d", data.path);

    chartArea.setAttribute(
      "d",
      `${data.path} L900 320 L0 320 Z`
    );

    const summaryValue =
      document.querySelector(".chart-summary strong");

    const summaryGrowth =
      document.querySelector(".chart-summary span");

    if (summaryValue) {
      summaryValue.textContent = data.value;
    }

    if (summaryGrowth) {
      summaryGrowth.textContent = data.growth;
    }

  }


  /*
   * ============================
   * ADD PROPERTY MODAL
   * ============================
   */

  const modal = document.getElementById("propertyModal");
  const openModal = document.querySelector(".add-property");
  const closeModal = document.getElementById("closeModal");

  function showModal() {
    modal.classList.add("open");
  }

  function hideModal() {
    modal.classList.remove("open");
  }

  openModal.addEventListener("click", showModal);
  closeModal.addEventListener("click", hideModal);

  modal.addEventListener("click", event => {

    if (event.target === modal) {
      hideModal();
    }

  });


  /*
   * ============================
   * ADD PROPERTY
   * ============================
   */

  const propertyForm =
    document.getElementById("propertyForm");

  propertyForm.addEventListener("submit", event => {

    event.preventDefault();

    const name =
      document.getElementById("propertyName").value;

    const location =
      document.getElementById("propertyLocation").value;

    const value =
      document.getElementById("propertyValue").value;

    const roi =
      document.getElementById("propertyROI").value;

    addPropertyToTable(
      name,
      location,
      value,
      roi
    );

    propertyForm.reset();

    hideModal();

  });


  function addPropertyToTable(
    name,
    location,
    value,
    roi
  ) {

    const tbody = document.querySelector("tbody");

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>
        <div class="property-name">
          <div class="property-image house-one"></div>

          <div>
            <strong>${escapeHTML(name)}</strong>
            <span>Residential</span>
          </div>
        </div>
      </td>

      <td>${escapeHTML(location)}</td>

      <td>${escapeHTML(value)}</td>

      <td>
        <div class="occupancy-value">
          <span>100%</span>
          <div>
            <i style="width:100%"></i>
          </div>
        </div>
      </td>

      <td>
        <strong class="roi">
          ${escapeHTML(roi)}
        </strong>
      </td>

      <td>
        <span class="status occupied-status">
          Occupied
        </span>
      </td>

      <td>
        <button class="row-more">
          •••
        </button>
      </td>
    `;

    tbody.prepend(row);

  }


  /*
   * ============================
   * SECURITY
   * ============================
   */

  function escapeHTML(value) {

    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  }


  /*
   * ============================
   * ROW ACTIONS
   * ============================
   */

  document.addEventListener("click", event => {

    const button =
      event.target.closest(".row-more");

    if (!button) return;

    const row = button.closest("tr");

    const property =
      row.querySelector(".property-name strong");

    if (property) {
      alert(
        `Property: ${property.textContent}`
      );
    }

  });


  /*
   * ============================
   * VIEW ALL
   * ============================
   */

  const viewAll =
    document.querySelector(".view-all");

  viewAll.addEventListener("click", () => {

    alert(
      "Properties page would open here."
    );

  });

});
